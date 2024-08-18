import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";
import AuthProvider from "@/provider/AuthProvider";
import { CartProvider } from "@/provider/CartProvider";
export const metadata: Metadata = {
  title: "ProfileFyi-Assignment",
  description: "ProfileFyi-Assignment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <CartProvider>
          <body className={inter.className}>{children}</body>
        </CartProvider>
      </AuthProvider>
    </html>
  );
}
