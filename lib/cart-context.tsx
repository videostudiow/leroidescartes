"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ShopifyCart } from "./types";
import { addToCart, createCart, getCart, removeCartLines, updateCartLines } from "./shopify";

interface CartContextValue {
  cart: ShopifyCart | null;
  cartOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (cartId) {
      getCart(cartId)
        .then((c) => { if (c) setCart(c); })
        .catch(() => localStorage.removeItem("shopify_cart_id"));
    }
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;
    const newCart = await createCart();
    localStorage.setItem("shopify_cart_id", newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [cart]);

  const addItem = useCallback(async (merchandiseId: string, quantity = 1) => {
    setLoading(true);
    try {
      const cartId = await ensureCart();
      const updated = await addToCart(cartId, [{ merchandiseId, quantity }]);
      setCart(updated);
      setCartOpen(true);
    } finally {
      setLoading(false);
    }
  }, [ensureCart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updated = await removeCartLines(cart.id, [lineId]);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updated = await updateCartLines(cart.id, [{ id: lineId, quantity }]);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      loading,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addItem,
      removeItem,
      updateItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}
