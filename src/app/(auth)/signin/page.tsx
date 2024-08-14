"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={handleSubmit}>Sign in with Google</button>
    </div>
  );
}
