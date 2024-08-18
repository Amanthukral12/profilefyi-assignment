"use client";
import {
  addItemsToCart,
  getCartItemsFromDatabase,
} from "@/lib/actions/cart.actions";
import { addItemtoLocalCart, getLocalCartItems } from "@/lib/utils/cart";
import { ICart } from "@/models/cart.model";
import { IProduct } from "@/models/product.model";
import { useCart } from "@/provider/CartProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Product = ({ product }: { product: IProduct }) => {
  const { data: session } = useSession();
  const { setCart, setLocalCart } = useCart() as {
    setCart: (cart: ICart | undefined) => void;
    setLocalCart: (localCart: any[]) => void;
  };

  const addToCartHandler = async (product: IProduct) => {
    const item = {
      id: product._id,
      name: product.name,
      quantity: 1,
      image: product.image,
      price: product.price,
      discountPercentage: product.discountPercentage,
      countInStock: product.countInStock,
    };

    if (!session) {
      addItemtoLocalCart({ item });
      const items = getLocalCartItems();
      setLocalCart(items);
    } else {
      addItemsToCart(product, 1, session.user.id);
      const databaseCart = await getCartItemsFromDatabase(session.user.id);
      localStorage.setItem("cart", JSON.stringify(databaseCart));
      setCart(databaseCart);
    }
  };

  return (
    <div>
      <Image src={product.image} alt={product.name} width={200} height={200} />
      <p>{product.name}</p>
      <p>
        ${product.price - (product.price * product.discountPercentage) / 100}
      </p>
      <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
