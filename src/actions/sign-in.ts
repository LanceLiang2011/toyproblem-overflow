'use server';
import { signIn } from '@/auth';

export async function signin() {
  return signIn('github');
}
