import PostCreateForm from '@/components/posts/post-create-form';
import PostsList from '@/components/posts/posts-list';
import { getPostsByProblemSlug } from '@/db/queries/posts';
import { prisma } from '@/db';
import { Card, CardHeader, CardBody, Code } from '@nextui-org/react';

interface ProblemPageProps {
  params: {
    slug: string;
  };
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const slugToTitle = (slug: string) =>
  slug
    .split('-')
    .map(s => capitalize(s))
    .join(' ');

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = params;

  const problem = await prisma.problem.findFirst(
    {
      where: {
        slug,
      },
    },
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4 md:col-span-3">
        <h1 className="text-2xl font-bold mb-2">Solutions for {slugToTitle(slug)}</h1>
        <PostsList getPosts={() => getPostsByProblemSlug(slug)} />
      </div>
      <div className="p-2 col-span-4 md:col-span-1">
        <PostCreateForm slug={slug} />
        <div className="mt-4">
          <Card>
            <CardHeader className="font-bold">{slugToTitle(slug)}</CardHeader>
            <CardBody>
              <p>{problem?.description}</p>
              <br />
              <p>Expected input: <Code>{problem?.expectedInput}</Code></p>
              <p>Expected output: <Code>{problem?.expectedOutput}</Code></p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
