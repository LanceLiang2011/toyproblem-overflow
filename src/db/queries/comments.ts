import type { Comment } from '@prisma/client';
import { prisma } from '@/db';

export interface CommentWithUser extends Comment {
  user: {
    name: string | null;
    image: string | null;
  };
}

export function getCommentsWithUser(
  postId: string
): Promise<CommentWithUser[]> {
  return prisma.comment.findMany({
    where: {
      postId: postId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  });
}
