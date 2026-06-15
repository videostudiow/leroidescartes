"use client";

import { CartProvider as Provider } from "@/lib/cart-context";
import CartDrawer from "@/components/cart/CartDrawer";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <CartDrawer />
    </Provider>
  );
}
