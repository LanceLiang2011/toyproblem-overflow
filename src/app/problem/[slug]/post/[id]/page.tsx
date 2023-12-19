import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { getCommentsWithUser } from '@/db/queries/comments';
import paths from '@/paths';

interface PostPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const { slug, id } = params;
  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid text-slate-900" href={paths.problem(slug)}>
        {'< '}Back to {slug}
      </Link>
      <PostShow postId={id} />
      <CommentCreateForm postId={id} startOpen />
      <CommentList getComments={() => getCommentsWithUser(id)} />
    </div>
  );
}
