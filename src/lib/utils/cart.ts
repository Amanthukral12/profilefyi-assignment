import { IProduct } from "@/models/product.model";

export function addItemtoLocalCart(item: IProduct) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.findIndex(
    (cartItem: IProduct) => cartItem._id === item._id
  );
  if (existingItem !== -1) {
    cartItems[existingItem].qty += 1;
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
    (cartItem: IProduct) => cartItem._id !== id
  );
  localStorage.setItem("cartItems", JSON.stringify(newCartItems));
}

export function clearLocalCart() {
  localStorage.removeItem("cartItems");
}

export function updateLocalCartQty(id: string, qty: number) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.findIndex(
    (cartItem: IProduct) => cartItem._id === id
  );
  if (existingItem !== -1) {
    cartItems[existingItem].qty = qty;
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function getLocalCartTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  return cartItems.reduce(
    (acc: number, item: IProduct) => acc + item.price * item.qty,
    0
  );
}

export function getLocalCartTotalItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  return cartItems.reduce((acc: number, item: IProduct) => acc + item.qty, 0);
}
