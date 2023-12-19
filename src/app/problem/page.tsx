import Link from 'next/link';
import { prisma } from '@/db';
import { Chip } from '@nextui-org/react';
import paths from '@/path';

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany();

  const renderedProblems = problems.map(problem => {
    return (
      <div key={problem.id}>
        <Link href={paths.problem(problem.slug)}>
          <Chip variant="shadow" color="warning">
            {problem.slug}
          </Chip>
        </Link>
      </div>
    );
  });
  return (
    <div className="flex flex-row flex-wrap gap-2 overflow-y-auto">
      {renderedProblems}
    </div>
  );
}

// TODO: Add pagination for problems.
