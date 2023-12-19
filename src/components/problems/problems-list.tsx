import Link from 'next/link';
import { prisma } from '@/db';
import { Chip, Button } from '@nextui-org/react';
import paths from '@/paths';

export const PROBMELMS = 20;

export default async function ProblemsList() {
  const problems = await prisma.problem.findMany({ take: PROBMELMS });

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

  const showMoreButton = (
    <Link href={paths.problems()}>
      <Button color="secondary">Show more</Button>
    </Link>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-2 overflow-y-auto">
        {renderedProblems}
      </div>
      <div> {problems.length === PROBMELMS && showMoreButton}</div>
    </div>
  );
}
