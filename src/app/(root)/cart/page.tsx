"use client";
import CartItem from "@/components/CartItem";
import { getCartItemsFromDatabase } from "@/lib/actions/cart.actions";
import { getLocalCartItems } from "@/lib/utils/cart";
import { ICart } from "@/models/cart.model";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Cart = () => {
  const { data: session } = useSession();
  const [cart, setCart] = React.useState<ICart | {}>({});

  useEffect(() => {
    const fetchCartItems = async () => {
      if (session) {
        const items = await getCartItemsFromDatabase(session.user.id);
        setCart(items);
      } else {
        const items = getLocalCartItems();
        setCart(items);
      }
    };
    fetchCartItems();
  }, [session]);

  return (
    <div>
      {cart &&
        (cart as ICart)?.cartItems &&
        (cart as ICart)?.cartItems.map((item: any) => (
          <CartItem key={item._id} item={item} userId={session?.user.id} />
        ))}
    </div>
  );
};

export default Cart;
