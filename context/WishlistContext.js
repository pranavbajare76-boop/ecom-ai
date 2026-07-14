"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext({});

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wishlistItems");
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((current) => {
      if (current.some((item) => item._id === product._id)) return current;
      return [...current, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((current) => current.filter((item) => item._id !== productId));
  };

  const isInWishlist = (productId) => wishlistItems.some((item) => item._id === productId);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}
