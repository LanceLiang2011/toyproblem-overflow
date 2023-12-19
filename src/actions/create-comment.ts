'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import paths from '@/paths';

export async function createComment() {
  // reevalidate post page
  // revalidate home page or revalidate home page on timebase
}
