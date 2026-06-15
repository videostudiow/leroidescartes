"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProductByHandle } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, ChevronLeft, Loader2, Check } from "lucide-react";
import type { ShopifyProduct, ShopifyVariant } from "@/lib/types";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    getProductByHandle(params.handle)
      .then((p) => {
        setProduct(p);
        if (p) setSelectedVariant(p.variants.edges[0]?.node ?? null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [params.handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale || addingToCart) return;
    setAddingToCart(true);
    try {
      await addItem(selectedVariant.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-heading text-4xl font-black uppercase">Produit introuvable</p>
        <Link href="/collections" className="btn-primary text-sm px-6 py-3">
          Voir toutes les collections
        </Link>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const hasMultipleVariants = variants.length > 1 && variants[0]?.title !== "Default Title";
  const comparePrice = selectedVariant?.compareAtPrice;
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-dark transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-dark transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-dark line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 mb-3">
              {images[activeImage] ? (
                <Image
                  src={images[activeImage].url}
                  alt={images[activeImage].altText ?? product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag size={60} className="text-zinc-200" />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      i === activeImage ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image src={img.url} alt={img.altText ?? `Image ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.tags.includes("nouveaute") && (
              <span className="badge-primary text-xs mb-3 inline-flex">NOUVEAUTÉ</span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-black uppercase leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-heading text-3xl font-black text-primary">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              {comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount) && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                </span>
              )}
            </div>

            {/* Variants */}
            {hasMultipleVariants && (
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-wide mb-2">
                  {variants[0]?.selectedOptions[0]?.name ?? "Option"} :{" "}
                  <span className="font-normal normal-case">{selectedVariant?.title}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                      className={`px-4 py-2 text-sm border-2 rounded-lg font-medium transition-colors ${
                        selectedVariant?.id === v.id
                          ? "border-primary bg-primary text-white"
                          : v.availableForSale
                          ? "border-border hover:border-dark"
                          : "border-border text-muted opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {v.title}
                      {!v.availableForSale && " (Épuisé)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || addingToCart}
              className={`btn w-full py-4 text-base font-bold mb-4 ${
                added ? "bg-accent text-dark" : "bg-primary text-white hover:bg-red-700"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {addingToCart ? (
                <><Loader2 size={18} className="animate-spin" /> Ajout en cours...</>
              ) : added ? (
                <><Check size={18} /> Ajouté au panier !</>
              ) : !selectedVariant?.availableForSale ? (
                "Épuisé"
              ) : (
                <><ShoppingBag size={18} /> Ajouter au panier</>
              )}
            </button>

            <p className="text-xs text-muted text-center mb-8">
              Livraison gratuite au Canada sur les commandes de 250 $ et plus.
            </p>

            {/* Description */}
            {product.descriptionHtml && (
              <div className="border-t border-border pt-6">
                <h2 className="font-heading font-bold text-lg uppercase mb-3">Description</h2>
                <div
                  className="prose prose-sm text-muted max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="border-t border-border pt-4 mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-zinc-100 text-muted px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
