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

  return (
    <div className="flex border rounded-lg py-4 px-2 shadow-lg">
      <Image
        src={item.image}
        alt={item.name}
        width={100}
        height={100}
        className="w-[10rem] h-[10rem] object-cover rounded-md"
      />
      <div className="ml-8">
        <p className="text-xl my-1">{item.name}</p>
        {userId !== "" ? (
          <p className="my-1">
            <span className="mr-2">
              $
              {item.price -
                (item.price * item.product.discountPercentage) / 100}
            </span>
            <span className="line-through mr-2 text-slate-600">
              ${item.price}
            </span>
            <span className="text-green-600">
              ({item.product.discountPercentage}% off)
            </span>
          </p>
        ) : (
          <p className="my-1">
            <span className="mr-2">
              ${item.price - (item.price * item.discountPercentage) / 100}
            </span>
            <span className="line-through mr-2 text-slate-600">
              ${item.price}
            </span>
            <span className="text-green-600">
              ({item.discountPercentage}% off)
            </span>
          </p>
        )}

        <div className="flex items-center my-2">
          <button
            onClick={() =>
              userId !== "" ? updateCartHandler(-1) : updateLocalCartHandler(-1)
            }
            disabled={item.quantity === 1}
            className="p-2 bg-gray-200 rounded-md text-xl"
          >
            -
          </button>
          <p className="mx-4 text-xl">{item.quantity}</p>
          <button
            onClick={() =>
              userId !== "" ? updateCartHandler(1) : updateLocalCartHandler(1)
            }
            disabled={
              userId !== ""
                ? item.quantity === item.product.countInStock
                : item.quantity === item.countInStock
            }
            className="p-2 bg-gray-200 rounded-md text-xl"
          >
            +
          </button>
        </div>

        <button
          onClick={
            userId !== "" ? deleteCartItemHandler : deleteLocalCartItemHandler
          }
          className="bg-red-500 text-white w-full py-2 rounded my-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
