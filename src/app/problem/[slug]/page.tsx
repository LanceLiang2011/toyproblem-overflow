import PostCreateForm from '@/components/posts/post-create-form';

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

export default function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slugToTitle(slug)}</h1>
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
