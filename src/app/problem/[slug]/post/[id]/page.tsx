import { Suspense } from 'react';
import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/paths';
import PostShowLoading from '@/components/posts/post-show-loading';

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
      <Link
        className="underline decoration-solid text-slate-900"
        href={paths.problem(slug)}
      >
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={id} />
      </Suspense>
      <CommentCreateForm postId={id} startOpen />
      <CommentList postId={id} />
    </div>
  );
}
