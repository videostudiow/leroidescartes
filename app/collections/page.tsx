import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCollections } from "@/lib/shopify";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Toutes nos collections",
  description:
    "Explorez notre catalogue complet : Pokémon, Magic, NHL, Riftbound, Funko Pop et plus encore. Boutique Le Roi Des Cartes à Beloeil.",
};

export const revalidate = 60;

export default async function CollectionsPage() {
  let collections = [];
  try {
    collections = await getAllCollections();
  } catch {
    // Shopify non configuré — afficher placeholder
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary">
            <span>BOUTIQUE EN LIGNE</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            TOUTES NOS<br />COLLECTIONS
          </h1>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {collections.length === 0 ? (
          <PlaceholderCollections />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="group bg-dark text-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 bg-zinc-800">
                  {col.image ? (
                    <Image
                      src={col.image.url}
                      alt={col.image.altText ?? col.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading font-black text-4xl text-zinc-700 uppercase">
                        {col.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-heading font-bold text-xl uppercase group-hover:text-secondary transition-colors">
                      {col.title}
                    </h2>
                    {col.description && (
                      <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{col.description}</p>
                    )}
                  </div>
                  <ArrowRight size={20} className="text-zinc-600 group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceholderCollections() {
  const PLACEHOLDERS = [
    { label: "Sports", handle: "sports", color: "#22C55E" },
    { label: "Jeux (TCG)", handle: "tcg-tout", color: "#9333EA" },
    { label: "Anime", handle: "anime", color: "#EC4899" },
    { label: "Vêtements de sports", handle: "vetements-de-sports", color: "#6B7280" },
    { label: "Accessoires", handle: "accessoires", color: "#84CC16" },
    { label: "Consommables", handle: "consommables", color: "#F97316" },
    { label: "Pokémon", handle: "pokemon", color: "#F5C52B" },
    { label: "Magic: The Gathering", handle: "magic-the-gathering", color: "#E53935" },
    { label: "Hockey", handle: "hockey", color: "#1D4ED8" },
    { label: "Funko Pop!", handle: "funko-pop", color: "#06B6D4" },
    { label: "Riftbound", handle: "riftbound", color: "#7C3AED" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PLACEHOLDERS.map((col) => (
        <Link
          key={col.handle}
          href={`/collections/${col.handle}`}
          className="group bg-dark text-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div
            className="h-40 flex items-center justify-center"
            style={{ backgroundColor: col.color + "22" }}
          >
            <span
              className="font-heading font-black text-5xl"
              style={{ color: col.color }}
            >
              {col.label.charAt(0)}
            </span>
          </div>
          <div className="p-5 flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl uppercase group-hover:text-secondary transition-colors">
              {col.label}
            </h2>
            <ArrowRight size={20} className="text-zinc-600 group-hover:text-primary transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}
