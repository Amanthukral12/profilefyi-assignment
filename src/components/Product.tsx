"use client";
import { addItemsToCart } from "@/lib/actions/cart.actions";
import { addItemtoLocalCart } from "@/lib/utils/cart";
import { IProduct } from "@/models/product.model";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Product = ({ product }: { product: IProduct }) => {
  const { data: session } = useSession();
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
    {
      !session
        ? addItemtoLocalCart({ item })
        : addItemsToCart(product, 1, session.user.id);
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
