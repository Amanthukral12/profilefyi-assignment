"use client";
import {
  deleteItemFromCart,
  getCartItemsFromDatabase,
  updateCart,
} from "@/lib/actions/cart.actions";
import {
  getLocalCartItems,
  removeItemFromLocalCart,
  updateLocalCartquantity,
} from "@/lib/utils/cart";
import Image from "next/image";

const CartItem = ({
  item,
  userId,
  setCart,
}: {
  item: any;
  userId: string;

  setCart: any;
}) => {
  const updateCartHandler = async (quantity: number) => {
    try {
      await updateCart(userId, item._id, quantity);
      const updatedCart = await getCartItemsFromDatabase(userId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };
  const updateLocalCartHandler = (quantity: number) => {
    try {
      updateLocalCartquantity(item.id, quantity);
      const updatedCart = getLocalCartItems();
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteLocalCartItemHandler = () => {
    try {
      removeItemFromLocalCart(item.id);
      const updatedCart = getLocalCartItems();
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCartItemHandler = async () => {
    try {
      await deleteItemFromCart(userId, item._id);
      const updatedCart = await getCartItemsFromDatabase(userId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(item);
  return (
    <div>
      <Image src={item.image} alt={item.name} width={100} height={100} />
      <p>{item.name}</p>
      {userId !== "" ? (
        <p>
          ${item.price - (item.price * item.product.discountPercentage) / 100}
        </p>
      ) : (
        <p> ${item.price - (item.price * item.discountPercentage) / 100}</p>
      )}

      <div>
        <button
          onClick={() =>
            userId !== "" ? updateCartHandler(-1) : updateLocalCartHandler(-1)
          }
          disabled={item.quantity === 1}
        >
          -
        </button>
        {item.quantity}
        <button
          onClick={() =>
            userId !== "" ? updateCartHandler(1) : updateLocalCartHandler(1)
          }
          disabled={
            userId !== ""
              ? item.quantity === item.product.countInStock
              : item.quantity === item.countInStock
          }
        >
          +
        </button>
      </div>

      <button
        onClick={
          userId !== "" ? deleteCartItemHandler : deleteLocalCartItemHandler
        }
      >
        Delete
      </button>
    </div>
  );
};

export default CartItem;
