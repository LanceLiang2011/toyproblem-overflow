'use client';
import { Input } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import { useSearchParams } from 'next/navigation';
import { search } from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={search}>
      <Input
        name="term"
        defaultValue={searchParams.get('term') || undefined}
        placeholder="Search by title or code..."
        startContent={<CiSearch />}
      />
    </form>
  );
}
