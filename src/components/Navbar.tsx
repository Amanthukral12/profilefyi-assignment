"use client";

import { ICart } from "@/models/cart.model";
import { useCart } from "@/provider/CartProvider";
import { ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();

  const { cart, localCart } = useCart() as {
    cart: ICart | undefined;
    localCart: any[];
  };

  return (
    <div className="flex justify-between mx-8 py-4">
      <Link href={"/"}>Teevolution</Link>
      <div className="flex w-[10%] justify-between">
        <Link href={"/cart"} className="flex">
          <ShoppingCart />
          <p className="pl-1">Cart</p>

          <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
            {session
              ? cart && cart.cartItems && cart.cartItems.length
              : localCart.length}
          </div>
        </Link>
        {session ? (
          <>
            <p
              onClick={() => {
                signOut();
                localStorage.removeItem("cart");
              }}
            >
              Sign out
            </p>
          </>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
