"use client";
import CartItem from "@/components/CartItem";
import {
  addItemsToCart,
  getCartItemsFromDatabase,
} from "@/lib/actions/cart.actions";
import { getLocalCartItems } from "@/lib/utils/cart";
import { ICart } from "@/models/cart.model";
import { IProduct } from "@/models/product.model";
import { useCart } from "@/provider/CartProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, setCart, localCart, setLocalCart } = useCart() as {
    cart: ICart | undefined;
    setCart: (cart: ICart | undefined) => void;
    localCart: any[];
    setLocalCart: (localCart: any[]) => void;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (session) {
        const items = getLocalCartItems();
        items.map((item: any) => {
          const newProduct = {
            _id: item.id,
            user: session?.user.id,
            name: item.name,
            image: item.image,
            price: item.price,
            countInStock: item.countInStock,
            discountPercentage: item.discountPercentage,
          };

          addItemsToCart(newProduct, item.quantity, session.user.id);
        });
        localStorage.setItem("cartItems", JSON.stringify([]));
        const databaseCart = await getCartItemsFromDatabase(session.user.id);
        localStorage.setItem("cart", JSON.stringify(databaseCart));
        setCart(databaseCart);
      } else {
        const items = getLocalCartItems();
        setLocalCart(items);
      }
    };
    fetchCartItems();
  }, [session]);

  const discountedTotal = localCart.reduce(
    (acc: number, item: IProduct) =>
      acc + item.price * item.quantity * (1 - item.discountPercentage / 100),
    0
  );

  const fixedDiscount = discountedTotal * 0.1;

  const totalPrice = discountedTotal - fixedDiscount;

  if (cart?.cartItems === undefined && localCart.length === 0) {
    return <p className="text-center text-2xl">No Items in Cart.</p>;
  }

  return (
    <section className="mx-8">
      <h3 className="text-2xl my-4 font-bold">Shopping Cart</h3>
      <div className="flex flex-col md:flex md:flex-row justify-between">
        <div className="md:w-3/5 mt-8">
          {session
            ? cart &&
              (cart as ICart)?.cartItems &&
              (cart as ICart)?.cartItems.map((item: any) => (
                <CartItem
                  key={item._id}
                  item={item}
                  userId={session?.user.id}
                  setCart={setCart}
                />
              ))
            : localCart.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  userId={""}
                  setCart={setLocalCart}
                />
              ))}
        </div>
        <div className="md:w-2/5 px-8 mt-8 md:mt-0">
          <h4 className="text-xl mb-2 font-bold">Cart Summary</h4>
          {session ? (
            <div className="border rounded-lg py-4 px-2 shadow-lg flex flex-col items-center">
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">SubTotal:</span>
                <span>${cart?.subTotal}</span>
              </p>
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">Fixed Discount (10%):</span>
                <span>${cart?.fixedDiscount}</span>
              </p>
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">Total Amount:</span>
                <span>${cart?.totalPrice}</span>
              </p>
              <button
                onClick={() => {
                  alert("Order Placed Successfully");
                  router.push("/");
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-8"
              >
                Proceed to Checkout
              </button>
            </div>
          ) : (
            <div className="border rounded-lg py-4 px-2 shadow-lg flex flex-col items-center">
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">SubTotal:</span>
                <span>${discountedTotal}</span>
              </p>
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">Fixed Discount (10%):</span>
                <span>${Number(fixedDiscount.toFixed(2))}</span>
              </p>
              <p className="flex justify-between w-4/5 my-1">
                <span className="font-bold">Total Amount:</span>
                <span>${totalPrice}</span>
              </p>
              <button
                onClick={() => {
                  alert("PLease Sign In to Proceed to Checkout");
                  router.push("/signin");
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-8"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
