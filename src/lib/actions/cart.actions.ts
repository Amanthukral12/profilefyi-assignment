"use server";
import Product, { IProduct } from "@/models/product.model";
import { connectToDatabase } from "../database/mongoose";
import Cart from "@/models/cart.model";

export async function combineCarts(
  localCart: IProduct[],
  databaseCart: IProduct[]
) {
  const combinedCart = [...localCart];

  databaseCart.forEach((item) => {
    const existingItem = combinedCart.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      combinedCart.push(item);
    }
  });

  return combinedCart;
}

export async function calculateCartTotal(cartItems: any) {
  try {
    const subTotal = Number(
      cartItems.reduce((sum: number, cartItem: any) => {
        const discountedPrice =
          cartItem.price -
          cartItem.price * (cartItem.product.discountPercentage / 100);

        return sum + discountedPrice * cartItem.quantity;
      }, 0)
    );

    const fixedDiscount = subTotal * 0.1;
    const totalPrice = subTotal - fixedDiscount;

    return {
      subTotal,
      fixedDiscount,
      totalPrice,
    } as { subTotal: number; fixedDiscount: number; totalPrice: number };
  } catch (error) {
    console.error(error);
  }
}

export async function getCartItemsFromDatabase(userId: string) {
  try {
    await connectToDatabase();
    const cartItems = await Cart.findOne({ user: userId }).populate(
      "cartItems.product"
    );
    return JSON.parse(JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
}

export async function addItemsToCart(
  item: any,
  quantity: number,
  userId: string
) {
  try {
    await connectToDatabase();

    let cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product"
    );

    if (cart) {
      const existingItemIndex = cart.cartItems.findIndex((cartItem: any) => {
        return cartItem.product._id.toString() === item._id.toString();
      });

      if (existingItemIndex >= 0) {
        cart.cartItems[existingItemIndex].quantity += quantity;
      } else {
        cart.cartItems.push({
          name: item.name,
          quantity: quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        });
      }
      await cart.populate("cartItems.product");

      const { subTotal, fixedDiscount, totalPrice } = (await calculateCartTotal(
        cart.cartItems
      )) as { subTotal: number; fixedDiscount: number; totalPrice: number };

      cart.subTotal = subTotal;
      cart.fixedDiscount = fixedDiscount;
      cart.totalPrice = totalPrice;

      await cart.save();
    } else {
      const product = await Product.findById({ _id: item._id });
      const discountedPrice = product.calculateDiscountedPrice();
      const subTotal = discountedPrice * quantity;

      const fixedDiscount = subTotal * 0.1;

      const totalPrice = subTotal - fixedDiscount;
      await Cart.create({
        user: userId,
        cartItems: [
          {
            name: item.name,
            quantity: quantity,
            image: item.image,
            price: item.price,
            product: item._id,
          },
        ],
        subTotal: subTotal,
        fixedDiscount: fixedDiscount,
        totalPrice: totalPrice,
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
    let cart = await Cart.findOne({ user: userId }).populate(
      "cartItems.product"
    );
    console.log(cart);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const existingItemIndex = cart.cartItems.findIndex((cartItem: any) => {
      return cartItem._id.toString() === itemId.toString();
    });

    if (existingItemIndex >= 0) {
      cart.cartItems[existingItemIndex].quantity = quantity;
    }
    await cart.populate("cartItems.product");

    const { subTotal, fixedDiscount, totalPrice } = (await calculateCartTotal(
      cart.cartItems
    )) as { subTotal: number; fixedDiscount: number; totalPrice: number };

    cart.subTotal = subTotal;
    cart.fixedDiscount = fixedDiscount;
    cart.totalPrice = totalPrice;
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
