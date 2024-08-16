"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between mx-8">
      <Link href={"/"}>Teevolution</Link>
      <div className="flex">
        <Link href={"/cart"}>Cart</Link>
        {session ? (
          <>
            <p onClick={() => signOut()}>Sign out</p>
          </>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
