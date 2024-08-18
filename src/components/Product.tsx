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
    <div className="border rounded-lg py-4 px-2 shadow-lg flex flex-col items-center">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={100}
        quality={70}
        priority={true}
        className="object-cover mb-4 w-auto h-auto rounded-lg"
      />
      <p className="text-lg font-semibold mb-2 text-center">{product.name}</p>
      <p className="text-xl font-bold mb-4">
        ${product.price - (product.price * product.discountPercentage) / 100}
      </p>
      <button
        onClick={() => addToCartHandler(product)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
