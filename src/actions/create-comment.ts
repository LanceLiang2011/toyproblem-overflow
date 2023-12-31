'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { z } from "zod";
import { auth } from "@/auth";


const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  _formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must sign in to comment."],
      },
    };
  }

  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const problem = await prisma.problem.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!problem) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.post(problem.slug, postId));
  revalidatePath(paths.home());
  return {
    errors: {},
    success: true,
  };
}
