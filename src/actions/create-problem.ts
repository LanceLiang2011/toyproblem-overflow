'use server';

import { z } from 'zod';

const createProblemSchema = z.object({
  name: z.string().min(1).max(50).regex(/^[a-z-]+$/, { message: 'must be lowercase letters and dashes only' }),
  description: z.string().min(1).max(500),
});

export async function createProblem(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  console.log({name, description}); // FIXME: remove this line

  // revalidate home page
};