import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    label: "POKÉMON",
    handle: "pokemon",
    description: "Boosters, ETB, decks, singles chassés à la main.",
    badge: "TCG",
    badgeColor: "bg-accent text-dark",
    image:
      "https://leroidescartes.ca/cdn/shop/files/s-l1200_5_7d5d6037-31f9-48f2-869e-f12a090e6850.jpg?v=1770339338&width=1200",
  },
  {
    label: "MAGIC: THE GATHERING",
    handle: "magic-the-gathering",
    description: "Set boosters, collector, commander precons.",
    badge: "TCG",
    badgeColor: "bg-accent text-dark",
    image:
      "https://leroidescartes.ca/cdn/shop/files/MagicSuperheroespromo_1.png?v=1778532585&width=1500",
  },
  {
    label: "RIFTBOUND",
    handle: "riftbound",
    description: "Le TCG League of Legends. Disponible icitte.",
    badge: "NOUVEAU",
    badgeColor: "bg-primary text-white",
    image:
      "https://leroidescartes.ca/cdn/shop/files/Unleashedpromo.png?v=1778532501&width=1500",
  },
  {
    label: "HOCKEY & SPORTS",
    handle: "hockey",
    description: "Upper Deck, Topps, Panini — du retail au hobby box.",
    badge: "NHL",
    badgeColor: "bg-primary text-white",
    image:
      "https://leroidescartes.ca/cdn/shop/files/images_1_1.jpg?v=1770339429&width=1200",
  },
  {
    label: "FUNKO POP! & FIGURINES",
    handle: "funko-pop",
    description: "Chases, exclusives, vinyles introuvables.",
    badge: "GEEK",
    badgeColor: "bg-accent text-dark",
    image:
      "https://leroidescartes.ca/cdn/shop/files/Nouveau_projet_5.png?v=1773099815&width=1200",
  },
  {
    label: "SLEEVES & PROTECTION",
    handle: "accessoires",
    description: "Penny, perfect fit, toploaders, binders 12 cases.",
    badge: "GEAR",
    badgeColor: "bg-secondary text-dark",
    image:
      "https://leroidescartes.ca/cdn/shop/files/Sans_titre_1170_x_800_px_2.png?v=1779726946&width=1500",
  },
];

interface CategoriesSectionProps {
  content: Record<string, string>;
}

export default function CategoriesSection({ content }: CategoriesSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-badge">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>CATALOGUE</span>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-tight">
              {content.categories_titre ?? "CHOISIS TON TERRAIN DE CHASSE"}
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors font-medium"
          >
            {content.categories_lien ?? "voir tout le catalogue →"}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.handle}
              href={`/collections/${cat.handle}`}
              className="group relative overflow-hidden rounded-xl bg-dark text-white aspect-[4/3]"
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Badge */}
              {cat.badge && (
                <span className={`absolute top-3 left-3 badge text-xs ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              )}

              {/* Arrow */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowUpRight size={16} />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-heading font-black text-xl md:text-2xl uppercase leading-tight mb-1">
                  {cat.label}
                </h3>
                <p className="text-zinc-300 text-xs md:text-sm leading-snug">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 md:hidden">
          <Link href="/collections" className="btn-outline border-dark text-dark w-full text-center py-3">
            Voir tout le catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
