"use client";
import { ICart } from "@/models/cart.model";
import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

const cartContext = createContext({});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICart | {}>({});
  const [localCart, setLocalCart] = useState([]);

  return (
    <cartContext.Provider value={{ cart, setCart, localCart, setLocalCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
