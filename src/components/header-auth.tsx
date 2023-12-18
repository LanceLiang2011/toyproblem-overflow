'use client';
import { ReactNode } from 'react';
import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Skeleton
} from '@nextui-org/react';
import { FaGithub } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { signin, signout } from '@/actions';

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  let authContent: ReactNode;
  if (status === 'loading') {
    authContent = <Skeleton className="flex rounded-full w-12 h-12" />;
  } else if (session?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar
            isBordered
            src={session.user.image || ''}
            name={session.user.name || 'Anonymous'}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={signout}>
              <Button type="submit" color="danger">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form action={signin}>
        <Button
          className="bg-slate-800 text-slate-50"
          type="submit"
          variant="flat"
          endContent={<FaGithub />}
        >
          Sign In With GitHub
        </Button>
      </form>
    );
  }

  return authContent;
}
