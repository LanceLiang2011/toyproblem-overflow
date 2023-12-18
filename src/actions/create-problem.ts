'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { Problem } from '@prisma/client';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/path';

const createProblemSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z-]+$/, {
      message: 'must be lowercase letters and/or dashes without spaces'
    }),
  description: z.string().min(10).max(500)
});

export interface CreateProblemFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createProblem(
  _formState: CreateProblemFormState,
  formData: FormData
): Promise<CreateProblemFormState> {
  const session = await auth();

  if (!session || !session.user) {
    return { errors: { _form: ['You must be sign in to create a problem'] } };
  }

  const result = createProblemSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let problem: Problem;
  try {
    problem = await prisma.problem.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ['An unknown error occurred'] } };
    }
  }
  // revalidate home page
  revalidatePath(paths.home());
  redirect(paths.problem(problem.slug));
}
