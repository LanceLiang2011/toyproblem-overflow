import type { Post } from '@prisma/client';
import { prisma } from '@/db';

export interface PostWithData extends Post {
  problem: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
}

export function getPostsByProblemSlug(slug: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: { problem: { slug } },
    include: {
      problem: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    },
  });
}
