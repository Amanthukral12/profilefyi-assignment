import { IProduct } from "@/models/product.model";

export function addItemtoLocalCart({ item }: { item: CartItem }) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.findIndex(
    (cartItem: IProduct) => cartItem.id === item.id
  );
  if (existingItem !== -1) {
    cartItems[existingItem].quantity += 1;
  } else {
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function getLocalCartItems() {
  return JSON.parse(localStorage.getItem("cartItems") || "[]");
}

export function removeItemFromLocalCart(id: string) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const newCartItems = cartItems.filter(
    (cartItem: IProduct) => cartItem.id !== id
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItems));
}

export function clearLocalCart() {
  localStorage.removeItem("cartItems");
}

export function updateLocalCartquantity(id: string, quantity: number) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.findIndex(
    (cartItem: IProduct) => cartItem.id === id
  );
  if (existingItem !== -1) {
    cartItems[existingItem].quantity += quantity;
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function getLocalCartTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  return cartItems.reduce(
    (acc: number, item: IProduct) => acc + item.price * item.quantity,
    0
  );
}

export function getLocalCartTotalItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  return cartItems.reduce(
    (acc: number, item: IProduct) => acc + item.quantity,
    0
  );
}
