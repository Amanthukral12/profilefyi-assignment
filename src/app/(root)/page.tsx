"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main>
      Home Page
      <br />
      {session ? (
        <>
          <p onClick={() => signOut()}>Sign out</p>
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </main>
  );
}
