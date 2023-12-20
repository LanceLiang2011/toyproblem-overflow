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
    }
  });
}

export function getTopPosts(n: number = 6): Promise<PostWithData[]> {
  return prisma.post.findMany({
    orderBy: { comments: { _count: 'desc' } },
    include: {
      problem: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    },
    take: n
  });
}

export function getPostsBySearchQuery(query: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { content: { contains: query } }
      ]
    },
    include: {
      problem: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  });
}