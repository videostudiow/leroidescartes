"use client";

import Link from "@/components/i18n/Link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import { ShoppingBag, Trash2, Minus, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { dictFor } from "@/lib/i18n/dictionaries";

export default function PanierPage() {
  const locale = useLocale();
  const dict = dictFor(locale);
  const c = dict.cart;
  const { cart, removeItem, updateItem, loading } = useCart();
  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black uppercase">
            {c.titre}
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-4 text-2xl text-zinc-400">({cart.totalQuantity})</span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {lines.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={64} className="text-muted mx-auto mb-6 opacity-20" />
            <p className="font-heading text-3xl font-black uppercase mb-2">{c.vide}</p>
            <Link href="/collections" className="btn-primary text-sm px-8 py-3.5 mt-6 inline-flex">
              {c.videCta} →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {lines.map((line) => {
                const image = line.merchandise.product.images.edges[0]?.node;
                return (
                  <div key={line.id} className="bg-white rounded-xl p-4 flex gap-4 shadow-sm">
                    {image && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                        <Image
                          src={image.url}
                          alt={image.altText ?? line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/produits/${line.merchandise.product.handle}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-2 text-sm leading-snug"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      {line.merchandise.title !== "Default Title" && (
                        <p className="text-xs text-muted mt-0.5">{line.merchandise.title}</p>
                      )}
                      <p className="font-bold text-primary mt-1">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode, locale)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        onClick={() => removeItem(line.id)}
                        className="text-muted hover:text-primary transition-colors"
                        aria-label={c.retirer}
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                          className="px-2.5 py-1.5 hover:bg-zinc-100 transition-colors"
                          aria-label="−"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-medium">{line.quantity}</span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          className="px-2.5 py-1.5 hover:bg-zinc-100 transition-colors"
                          aria-label="+"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/collections"
                className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mt-4"
              >
                <ArrowLeft size={14} />
                {c.continuer}
              </Link>
            </div>

            {cart && (
              <div className="lg:col-span-1">
                <div className="bg-dark text-white rounded-xl p-6 sticky top-24">
                  <h2 className="font-heading font-bold text-xl uppercase mb-4">{c.sousTotal}</h2>
                  <div className="space-y-3 text-sm border-b border-zinc-800 pb-4 mb-4">
                    <div className="flex justify-between text-zinc-400">
                      <span>{c.sousTotal}</span>
                      <span className="text-white">
                        {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode, locale)}
                      </span>
                    </div>
                    {cart.cost.totalTaxAmount && (
                      <div className="flex justify-between text-zinc-400">
                        <span>{c.taxes}</span>
                        <span className="text-white">
                          {formatPrice(cart.cost.totalTaxAmount.amount, cart.cost.totalTaxAmount.currencyCode, locale)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>{c.sousTotal}</span>
                    <span className="text-secondary">
                      {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode, locale)}
                    </span>
                  </div>
                  <a
                    href={cart.checkoutUrl}
                    className={`btn-secondary w-full text-center py-4 font-bold text-base ${loading ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        …
                      </span>
                    ) : (
                      `${c.paiement} →`
                    )}
                  </a>
                  <p className="text-xs text-zinc-500 text-center mt-3">{c.taxes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
