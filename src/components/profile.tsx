'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div>
        <h1>User signed in</h1>
        <div>{JSON.stringify(session.user)}</div>
      </div>
    );
  }
  return <div>User not signed in</div>;
}
