"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { cart, cartOpen, closeCart, removeItem, updateItem, loading } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-dark text-white z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Votre panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-heading text-xl font-bold uppercase">
              Mon Panier
              {cart && cart.totalQuantity > 0 && (
                <span className="ml-2 text-sm bg-primary text-white px-2 py-0.5 rounded-sm">
                  {cart.totalQuantity}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-zinc-400">
              <ShoppingBag size={48} className="opacity-30" />
              <p className="font-heading text-2xl font-bold uppercase">Panier vide</p>
              <p className="text-sm">Ajoutez des produits pour commencer.</p>
              <button onClick={closeCart} className="btn-primary text-sm px-6 py-2">
                Continuer le magasinage
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const image = line.merchandise.product.images.edges[0]?.node;
              return (
                <div key={line.id} className="flex gap-3 bg-zinc-900 rounded-lg p-3">
                  {image && (
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-zinc-800">
                      <Image
                        src={image.url}
                        alt={image.altText ?? line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight line-clamp-2">
                      {line.merchandise.product.title}
                    </p>
                    {line.merchandise.title !== "Default Title" && (
                      <p className="text-xs text-zinc-400 mt-0.5">{line.merchandise.title}</p>
                    )}
                    <p className="text-primary font-bold text-sm mt-1">
                      {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(line.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                      aria-label="Retirer l'article"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-2 border border-zinc-700 rounded">
                      <button
                        onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs w-4 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="border-t border-zinc-800 px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Sous-total</span>
              <span className="text-white font-bold">
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-zinc-500">Taxes et livraison calculées au paiement.</p>
            <a
              href={cart.checkoutUrl}
              className={`btn-primary w-full text-center text-sm py-3 ${loading ? "opacity-60 pointer-events-none" : ""}`}
            >
              {loading ? "Chargement..." : "Passer à la caisse →"}
            </a>
            <button onClick={closeCart} className="w-full text-center text-xs text-zinc-500 hover:text-white transition-colors py-1">
              Continuer le magasinage
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
