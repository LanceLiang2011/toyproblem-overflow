import { Code } from "bright"
import { prisma } from "@/db";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({postId}: PostShowProps) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if(!post) {
    return <div>Post not found</div>
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <Code lang="js" lineNumbers>{post.content}</Code>
    </div>
  );
}
