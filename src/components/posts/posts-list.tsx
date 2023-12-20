import type { PostWithData } from '@/db/queries/posts';
import Link from 'next/link';
import paths from '@/paths';

interface PostsListProps {
  getPosts: () => Promise<PostWithData[]>;
}

export default async function PostsList({ getPosts }: PostsListProps) {
  const posts = await getPosts();
  const renderedPosts = posts.map(post => {
    const problemSlug = post.problem.slug;

    if (!problemSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.post(problemSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
