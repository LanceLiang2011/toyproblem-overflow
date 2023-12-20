import React from 'react';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { getPostsBySearchQuery } from '@/db/queries/posts';
import PostsList from '@/components/posts/posts-list';

interface SearchPageProps {
  searchParams: { term: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;
  if (!term) redirect(paths.home());

  return (
    <div>
      <h1 className="text-2xl font-bold">Search results for &quot;{term}&quot;</h1>
      <PostsList getPosts={() => getPostsBySearchQuery(term)} />
    </div>
  );
}
