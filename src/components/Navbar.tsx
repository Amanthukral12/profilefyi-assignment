"use client";

import { ICart } from "@/models/cart.model";
import { useCart } from "@/provider/CartProvider";
import { AlignJustify, ShoppingCart, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { cart, localCart } = useCart() as {
    cart: ICart | undefined;
    localCart: any[];
  };

  return (
    <header className="mx-8 py-4">
      <div className="flex justify-between items-center flex-wrap">
        <Link href={"/"}>Teevolution</Link>
        <div className="hidden md:flex md:justify-between">
          <Link href={"/cart"} className="flex mr-2">
            <ShoppingCart />
            <p className="pl-1">Cart</p>

            {session
              ? cart &&
                cart.cartItems &&
                cart.cartItems.length > 0 && (
                  <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                    {cart.cartItems.length}
                  </div>
                )
              : localCart &&
                localCart.length > 0 && (
                  <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                    {localCart.length}
                  </div>
                )}
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
        <button onClick={toggleNavbar} className="md:hidden">
          {isOpen ? <X /> : <AlignJustify />}
        </button>
        {isOpen && (
          <div className=" flex flex-col items-end basis-full w-1/2">
            <Link href={"/cart"} className="flex">
              <ShoppingCart />
              <p className="pl-1">Cart</p>

              {session
                ? cart &&
                  cart.cartItems &&
                  cart.cartItems.length > 0 && (
                    <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                      {cart.cartItems.length}
                    </div>
                  )
                : localCart &&
                  localCart.length > 0 && (
                    <div className="p-1 h-5 w-5 bg-red-500 text-white rounded-[50%] flex justify-center items-center">
                      {localCart.length}
                    </div>
                  )}
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
        )}
      </div>
    </header>
  );
};

export default Navbar;
