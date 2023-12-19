import PostShow from "@/components/posts/post-show"

interface PostPageProps {
  params: {
    slug: string;
    id: string;
  };
}

export default function PostPage({params}: PostPageProps) {
  return (
    <div>
      <PostShow postId={params.id} />
    </div>
  )
}
