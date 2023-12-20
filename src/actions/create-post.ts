'use server';
import type { Post } from '@prisma/client';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import paths from '@/paths';
import { isSolutionValid } from '@/utils/tests';


const createPostSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(5).max(800)
});

export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  _formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();

  if (!session || !session.user) {
    return { errors: { _form: ['You must sign in to post a solution'] } };
  }

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const targetProblem = await prisma.problem.findFirst({ where: { slug } });
  if (!targetProblem) {
    return { errors: { _form: ['You are posting to an unexist problem'] } };
  }

  const solutionValid = isSolutionValid(result.data.content);
  if (typeof solutionValid === 'string') {
    return { errors: { _form: [solutionValid] } };
  }

  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        problemId: targetProblem.id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: ['Your code might be invalid',error.message] } };
    }
    return { errors: { _form: ['Unknown error'] } };
  }

  // revalidate problem page
  revalidatePath(paths.problem(slug));
  // revalidate home page or revalidate home page on timebase
  revalidatePath(paths.home());
  // redirect to the created post page
  redirect(paths.post(slug, post.id));
}
