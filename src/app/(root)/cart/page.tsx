"use client";
import CartItem from "@/components/CartItem";
import { getCartItemsFromDatabase } from "@/lib/actions/cart.actions";
import { getLocalCartItems } from "@/lib/utils/cart";
import { ICart } from "@/models/cart.model";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<ICart | {}>({});
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (session) {
        const items = await getCartItemsFromDatabase(session.user.id);
        setCart(items);
      } else {
        const items = getLocalCartItems();
        setLocalCart(items);
      }
    };
    fetchCartItems();
  }, [session]);

  return (
    <div>
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
  );
};

export default Cart;
