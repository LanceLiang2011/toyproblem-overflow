'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Problem } from '@prisma/client';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';

const createProblemSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z-]+$/, {
      message: 'must be lowercase letters and/or dashes without spaces'
    }),
  description: z.string().min(1).max(500),
  expectedInput: z.string().min(1).max(500),
  expectedOutput: z.string().min(1).max(500)
});

export interface CreateProblemFormState {
  errors: {
    name?: string[];
    description?: string[];
    expectedInput?: string[];
    expectedOutput?: string[];
    _form?: string[];
  };
}

export async function createProblem(
  _formState: CreateProblemFormState,
  formData: FormData
): Promise<CreateProblemFormState> {
  const session = await auth();

  if (!session || !session.user) {
    return { errors: { _form: ['You must sign in to create a problem'] } };
  }

  const result = createProblemSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    expectedInput: formData.get('expectedInput'),
    expectedOutput: formData.get('expectedOutput'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let problem: Problem;
  try {
    problem = await prisma.problem.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
        expectedInput: result.data.expectedInput,
        expectedOutput: result.data.expectedOutput,
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
  // revalidate problems page
  revalidatePath(paths.problems());
  redirect(paths.problem(problem.slug));
}
