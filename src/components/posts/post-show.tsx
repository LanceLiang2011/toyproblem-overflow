import { Code } from "bright"
import { prisma } from "@/db";
import { notFound } from "next/navigation";

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
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <Code lang="js" lineNumbers>{post.content}</Code>
    </div>
  );
}
