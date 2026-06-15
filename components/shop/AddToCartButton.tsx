"use client";

import Link from "@/components/i18n/Link";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { dictFor } from "@/lib/i18n/dictionaries";

interface AddToCartButtonProps {
  merchandiseId: string;
  hasVariants: boolean;
  productHandle: string;
  className?: string;
  fullWidth?: boolean;
  label?: string;
}

export default function AddToCartButton({
  merchandiseId,
  hasVariants,
  productHandle,
  className = "",
  fullWidth = false,
  label,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const locale = useLocale();
  const dict = dictFor(locale);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (hasVariants) {
    return (
      <Link
        href={`/produits/${productHandle}`}
        className={`btn-outline border-dark text-dark text-xs px-3 py-1.5 ${fullWidth ? "w-full justify-center" : ""} ${className}`}
      >
        {locale === "en" ? "Choose" : "Choisir"}
      </Link>
    );
  }

  const handleClick = async () => {
    if (loading || added) return;
    setLoading(true);
    try {
      await addItem(merchandiseId);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`btn-primary text-xs px-3 py-1.5 ${fullWidth ? "w-full justify-center" : ""} ${added ? "bg-accent" : ""} disabled:opacity-60 ${className}`}
      aria-label="Ajouter au panier"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : added ? (
        <><Check size={14} /> {dict.product.ajoute}</>
      ) : (
        <><ShoppingBag size={14} /> {label ?? dict.product.ajouter}</>
      )}
    </button>
  );
}
