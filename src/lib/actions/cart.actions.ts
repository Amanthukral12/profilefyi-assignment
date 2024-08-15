"use server";
import { IProduct } from "@/models/product.model";
import { connectToDatabase } from "../database/mongoose";
import Cart from "@/models/cart.model";

export function combineCarts(localCart: IProduct[], databaseCart: IProduct[]) {
  const combinedCart = [...localCart];

  databaseCart.forEach((item) => {
    const existingItem = combinedCart.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      existingItem.qty += item.qty;
    } else {
      combinedCart.push(item);
    }
  });

  return combinedCart;
}

export async function getCartItemsFromDatabase(userId: string) {
  try {
    await connectToDatabase();
    const cartItems = Cart.findOne({ userId: userId });
    return JSON.parse(JSON.stringify(cartItems));
  } catch (error) {}
}

export async function addItemsToCart(
  item: any,
  quantity: number,
  userId: string
) {
  try {
    await connectToDatabase();
    const cart = await getCartItemsFromDatabase(userId);
    if (cart) {
      const existingItemIndex = cart.cartItems.findIndex(
        (cartItem: any) => cartItem.product === item._id
      );
      if (existingItemIndex >= 0) {
        cart.cartItems[existingItemIndex].qty += quantity;
      } else {
        cart.cartItems.push({
          name: item.name,
          quantity: quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        });
      }
      await cart.save();
    } else {
      await Cart.create({
        userId: userId,
        cartItems: [
          {
            name: item.name,
            quantity: quantity,
            image: item.image,
            price: item.price,
            product: item._id,
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateCart(
  userId: string,
  itemId: string,
  quantity: number
) {
  try {
    await connectToDatabase();
    const cart = await getCartItemsFromDatabase(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const existingItemIndex = cart.cartItems.findIndex(
      (cartItem: any) => cartItem.product === itemId
    );
    if (existingItemIndex >= 0) {
      cart.cartItems[existingItemIndex].qty = quantity;
    }
    await cart.save();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItemFromCart(userId: string, itemId: string) {
  try {
    await connectToDatabase();
    const cart = await getCartItemsFromDatabase(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.cartItems = cart.cartItems.filter(
      (cartItem: any) => cartItem.product !== itemId
    );
    await cart.save();
  } catch (error) {
    console.error(error);
  }
}
