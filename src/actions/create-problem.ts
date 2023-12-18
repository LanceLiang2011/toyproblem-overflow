'use server';

import { z } from 'zod';
import { auth } from '@/auth';

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
  formState: CreateProblemFormState,
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

  // revalidate home page
  return { errors: {} };
}
