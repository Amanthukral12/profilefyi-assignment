"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
export default function SignIn() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border rounded-lg py-4 px-2 shadow-lg h-1/2 w-1/2 flex flex-col justify-center items-center">
        <button
          onClick={handleSubmit}
          className="text-xl border rounded-lg py-4 px-2 shadow-lg flex items-center justify-center"
        >
          <Image
            src="/googleIcon.svg"
            height={50}
            width={50}
            alt="google icon"
          />{" "}
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
