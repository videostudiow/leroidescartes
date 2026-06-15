import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { ShoppingBag, Tag } from "lucide-react";

interface PageProps {
  params: { handle: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const collection = await getCollectionByHandle(params.handle);
    if (!collection) return { title: "Collection introuvable" };
    return {
      title: collection.title,
      description: collection.description || `Explorez notre collection ${collection.title} — Le Roi Des Cartes`,
    };
  } catch {
    return { title: "Collection" };
  }
}

export const revalidate = 60;

export default async function CollectionPage({ params }: PageProps) {
  let collection = null;
  try {
    collection = await getCollectionByHandle(params.handle);
  } catch {
    // Shopify non configuré
  }

  if (!collection) {
    return <CollectionPlaceholder handle={params.handle} />;
  }

  const products = collection.products.edges.map((e) => e.node);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            {" / "}
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            {" / "}
            <span className="text-zinc-300">{collection.title}</span>
          </nav>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9]">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-zinc-400 mt-3 max-w-2xl">{collection.description}</p>
          )}
          <p className="text-zinc-500 text-sm mt-2">{products.length} produits</p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="text-muted mx-auto mb-4 opacity-30" />
            <p className="font-heading text-2xl font-bold uppercase">Collection vide</p>
            <p className="text-muted mt-2">Aucun produit dans cette collection pour l&apos;instant.</p>
            <Link href="/collections" className="btn-primary inline-flex mt-6 text-sm px-6 py-3">
              Voir toutes les collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const image = product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;
              const comparePrice = product.variants.edges[0]?.node.compareAtPrice;
              const firstVariant = product.variants.edges[0]?.node;

              return (
                <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <Link href={`/produits/${product.handle}`}>
                    <div className="relative aspect-square bg-zinc-100 overflow-hidden">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                          <Tag size={32} className="text-zinc-300" />
                        </div>
                      )}
                      {!product.availableForSale && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="badge bg-zinc-800 text-white">Épuisé</span>
                        </div>
                      )}
                      {comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount) && (
                        <span className="absolute top-2 left-2 badge-primary text-xs">SOLDE</span>
                      )}
                    </div>
                  </Link>
                  <div className="p-3 flex-1 flex flex-col">
                    <Link href={`/produits/${product.handle}`}>
                      <h2 className="font-medium text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {product.title}
                      </h2>
                    </Link>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-dark">
                          {formatPrice(price.amount, price.currencyCode)}
                        </span>
                        {comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount) && (
                          <span className="text-xs text-muted line-through ml-1.5">
                            {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                          </span>
                        )}
                      </div>
                      {product.availableForSale && firstVariant && (
                        <AddToCartButton
                          merchandiseId={firstVariant.id}
                          hasVariants={product.variants.edges.length > 1}
                          productHandle={product.handle}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CollectionPlaceholder({ handle }: { handle: string }) {
  const title = handle.replace(/-/g, " ").toUpperCase();
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            {" / "}
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            {" / "}
            <span className="text-zinc-300">{title}</span>
          </nav>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-black uppercase">{title}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={48} className="text-muted mx-auto mb-4 opacity-30" />
        <p className="font-heading text-2xl font-bold uppercase mb-2">Boutique en cours de configuration</p>
        <p className="text-muted max-w-md mx-auto">La connexion Shopify sera activée prochainement. Visitez-nous en boutique au 347 Rue Duvernay, Beloeil.</p>
        <Link href="/contact" className="btn-primary inline-flex mt-6 text-sm px-6 py-3">
          Nous contacter
        </Link>
      </div>
    </div>
  );
}
