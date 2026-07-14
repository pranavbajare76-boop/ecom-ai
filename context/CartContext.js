"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item._id === product._id);
      if (existing) {
        return current.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
