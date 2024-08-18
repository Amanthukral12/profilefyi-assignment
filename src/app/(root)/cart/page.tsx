"use client";
import CartItem from "@/components/CartItem";
import {
  addItemsToCart,
  getCartItemsFromDatabase,
} from "@/lib/actions/cart.actions";
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
        localStorage.removeItem("cartItems");
        const databaseCart = await getCartItemsFromDatabase(session.user.id);
        setCart(databaseCart);
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
