import { updateCart } from "@/lib/actions/cart.actions";
import Image from "next/image";
import React from "react";

const CartItem = ({ item, userId }: { item: any; userId: string }) => {
  console.log(item);
  const updateCartHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await updateCart(userId, item.product._id, Number(e.target.value));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Image src={item.image} alt={item.name} width={100} height={100} />
      <p>{item.name}</p>
      <p>
        ${item.price - (item.price * item.product.discountPercentage) / 100}
      </p>
      <select value={item.quantity} onChange={(e) => updateCartHandler(e)}>
        {[...Array(item.product.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CartItem;
