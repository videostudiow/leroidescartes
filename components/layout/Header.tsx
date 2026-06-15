"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type SubLink = { label: string; href: string };
type NavLink = { label: string; href: string; children?: SubLink[] };

const NAV_LINKS: NavLink[] = [
  {
    label: "Sports",
    href: "/collections/sports",
    children: [
      { label: "Pre-Order", href: "/collections/pre-order" },
      { label: "Hockey", href: "/collections/hockey" },
      { label: "Football", href: "/collections/football" },
      { label: "Baseball", href: "/collections/baseball" },
      { label: "Basketball", href: "/collections/basketball" },
      { label: "Soccer", href: "/collections/soccer" },
      { label: "Autres sports", href: "/collections/autres-sports" },
    ],
  },
  {
    label: "JEUX",
    href: "/collections/tcg-tout",
    children: [
      { label: "Pokémon", href: "/collections/pokemon" },
      { label: "Magic The Gathering", href: "/collections/magic-the-gathering" },
      { label: "Yu-Gi-Oh!", href: "/collections/yu-gi-oh" },
      { label: "Digimon", href: "/collections/digimon" },
      { label: "One Piece", href: "/collections/one-piece" },
      { label: "Flesh & Blood", href: "/collections/flesh-and-blood" },
      { label: "Lorcana", href: "/collections/lorcana" },
      { label: "Riftbound", href: "/collections/riftbound" },
      { label: "Union Arena", href: "/collections/union-arena" },
      { label: "Final Fantasy", href: "/collections/final-fantasy" },
      { label: "Star Wars & Marvel", href: "/collections/star-wars-marvel" },
      { label: "Dragonball", href: "/collections/dragonball" },
      { label: "Disney", href: "/collections/disney" },
    ],
  },
  {
    label: "Anime",
    href: "/collections/anime",
    children: [
      { label: "One Piece", href: "/collections/one-piece" },
      { label: "Dragon Ball", href: "/collections/dragonball" },
      { label: "Yu-Gi-Oh!", href: "/collections/yu-gi-oh" },
      { label: "Digimon", href: "/collections/digimon" },
    ],
  },
  {
    label: "Vêtements",
    href: "/collections/vetements-de-sports",
    children: [
      { label: "Jersey", href: "/collections/jersey" },
      { label: "T-Shirts", href: "/collections/t-shirts" },
      { label: "Casquettes", href: "/collections/casquettes" },
      { label: "Hoodies", href: "/collections/hoodies" },
    ],
  },
  {
    label: "Accessoires",
    href: "/collections/accessoires",
    children: [
      { label: "Playmats", href: "/collections/playmats" },
      { label: "Sleeves", href: "/collections/sleeves" },
      { label: "Boites", href: "/collections/boites" },
      { label: "Deckbox", href: "/collections/deckbox" },
      { label: "Cartes-Cadeaux", href: "/collections/carte-cadeau" },
    ],
  },
  {
    label: "Consommables",
    href: "/collections/consommables",
    children: [
      { label: "Boissons", href: "/collections/boissons" },
      { label: "Nourritures", href: "/collections/nourritures" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  siteInfo: Record<string, string>;
}

export default function Header({ siteInfo }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const { cart, openCart } = useCart();
  const totalQty = cart?.totalQuantity ?? 0;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[color:var(--ink)] text-[color:var(--cream)] text-xs relative z-50">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-between font-mono gap-2">
          <span className="truncate">🚚 Livraison GRATUITE au Canada à partir de 250 $</span>
          <span className="hidden sm:flex items-center gap-1.5 shrink-0">
            <MapPin className="size-3" /> {siteInfo.adresse ?? "347 Rue Duvernay, Beloeil QC"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[color:var(--cream)]/95 backdrop-blur border-b-2 border-[color:var(--ink)]">

        {/* === DESKTOP === */}
        <div className="hidden lg:flex mx-auto max-w-7xl px-4 py-3 items-center gap-4">
          <Link href="/" aria-label="Le Roi Des Cartes — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164"
              alt="Le Roi Des Cartes"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="flex items-center flex-nowrap gap-0.5 ml-2 text-sm font-semibold">
            {NAV_LINKS.map((l) => (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={() => l.children && setOpenDropdown(l.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)] transition whitespace-nowrap"
                >
                  {l.label}
                  {l.children && (
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${openDropdown === l.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {l.children && openDropdown === l.label && (
                  /* pt-2 crée un pont invisible entre le lien et le panel —
                     la souris reste dans le div parent et ne ferme pas le menu */
                  <div className="absolute top-full left-0 z-50 pt-2">
                    <div className="min-w-[200px] bg-[color:var(--cream)] border-2 border-[color:var(--ink)] rounded-md shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
                      {l.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-mono hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)] transition whitespace-nowrap border-b border-[color:var(--ink)]/10 last:border-0"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              onClick={openCart}
              className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)] hover:-translate-x-px hover:-translate-y-px transition"
              aria-label={`Ouvrir le panier${totalQty > 0 ? ` (${totalQty} articles)` : ""}`}
            >
              <ShoppingBag className="size-5" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] text-[10px] font-bold rounded-full size-5 flex items-center justify-center border-2 border-[color:var(--ink)]">
                  {totalQty > 9 ? "9+" : totalQty}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* === MOBILE === logo centré + hamburger */}
        <div className="lg:hidden px-4 py-3 flex items-center justify-between">
          {/* Panier à gauche */}
          <button
            onClick={openCart}
            className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)]"
            aria-label={`Ouvrir le panier${totalQty > 0 ? ` (${totalQty} articles)` : ""}`}
          >
            <ShoppingBag className="size-5" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] text-[10px] font-bold rounded-full size-5 flex items-center justify-center border-2 border-[color:var(--ink)]">
                {totalQty > 9 ? "9+" : totalQty}
              </span>
            )}
          </button>

          {/* Logo centré */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Le Roi Des Cartes — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164"
              alt="Le Roi Des Cartes"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Hamburger à droite avec animation */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)] shrink-0"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span
                className="block h-[2.5px] bg-[color:var(--ink)] rounded-full origin-center transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-[2.5px] bg-[color:var(--ink)] rounded-full transition-all duration-200"
                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="block h-[2.5px] bg-[color:var(--ink)] rounded-full origin-center transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* === OVERLAY MENU PLEIN ÉCRAN === */}
      <div
        className={`lg:hidden fixed inset-0 z-[999] bg-[color:var(--ink)] flex flex-col transition-all duration-500 ease-in-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* En-tête overlay */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-[color:var(--cream)]/20">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164"
              alt="Le Roi Des Cartes"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center size-10 border-2 border-[color:var(--cream)] rounded-md"
            aria-label="Fermer le menu"
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full origin-center" style={{ transform: "translateY(7.5px) rotate(45deg)" }} />
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full opacity-0" />
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full origin-center" style={{ transform: "translateY(-7.5px) rotate(-45deg)" }} />
            </span>
          </button>
        </div>

        {/* Liens de navigation avec accordéon */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          {NAV_LINKS.map((l, i) => (
            <div key={l.label} className="border-b border-[color:var(--cream)]/15">

              {/* Ligne principale — toute la ligne clique pour ouvrir l'accordéon si enfants */}
              {l.children ? (
                <button
                  onClick={() => setOpenMobile(openMobile === l.label ? null : l.label)}
                  className="w-full flex items-center justify-between py-4 transition-all duration-200 text-left"
                  style={{
                    transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  <span className="font-display text-[clamp(1.6rem,6vw,2.8rem)] uppercase text-[color:var(--cream)] leading-none">
                    {l.label}
                  </span>
                  <ChevronDown
                    className={`size-6 text-[color:var(--cream)]/60 transition-transform duration-300 shrink-0 ml-3 ${openMobile === l.label ? "rotate-180 text-[color:var(--primary)]" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 transition-all duration-200 group"
                  style={{
                    transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  <span className="font-display text-[clamp(1.6rem,6vw,2.8rem)] uppercase text-[color:var(--cream)] group-hover:text-[color:var(--primary)] transition-colors leading-none">
                    {l.label}
                  </span>
                  <span className="text-[color:var(--cream)]/30 group-hover:text-[color:var(--primary)] transition-colors text-2xl">↗</span>
                </Link>
              )}

              {/* Panel accordéon */}
              {l.children && (
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openMobile === l.label ? "600px" : "0px" }}
                >
                  {/* Lien "Voir tout" */}
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 mb-2 font-mono text-xs text-[color:var(--primary)] hover:underline"
                  >
                    Voir tout — {l.label} ↗
                  </Link>
                  <div className="pb-4 grid grid-cols-2 gap-x-3 gap-y-0">
                    {l.children.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-1.5 font-mono text-sm text-[color:var(--cream)] hover:text-[color:var(--primary)] transition-colors py-2 border-b border-white/10 last:border-0"
                        style={{ opacity: 0.8 }}
                      >
                        <span style={{ opacity: 0.4 }} className="text-xs">›</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer du menu */}
        <div className="px-6 pb-8 pt-4 space-y-3">
          <Link
            href="/collections"
            onClick={() => setMenuOpen(false)}
            className="btn-chunk w-full justify-center"
          >
            <ShoppingBag className="size-4" /> Boutique en ligne
          </Link>
          <p className="text-center font-mono text-xs text-[color:var(--cream)]/40 pt-2">
            347 Rue Duvernay · Beloeil QC · (450) 281-0625
          </p>
        </div>
      </div>
    </>
  );
}
