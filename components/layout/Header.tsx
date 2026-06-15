"use client";

import Link from "@/components/i18n/Link";
import { useState, useEffect } from "react";
import { MapPin, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import LangCurrencySwitcher from "@/components/i18n/LangCurrencySwitcher";

type SubLink = { key: string; href: string };
type NavLink = { key: keyof Dictionary["nav"]; href: string; children?: SubLink[] };

const NAV: NavLink[] = [
  {
    key: "sports",
    href: "/collections/sports",
    children: [
      { key: "pre-order", href: "/collections/pre-order" },
      { key: "hockey", href: "/collections/hockey" },
      { key: "football", href: "/collections/football" },
      { key: "baseball", href: "/collections/baseball" },
      { key: "basketball", href: "/collections/basketball" },
      { key: "soccer", href: "/collections/soccer" },
      { key: "autres-sports", href: "/collections/autres-sports" },
    ],
  },
  {
    key: "jeux",
    href: "/collections/tcg-tout",
    children: [
      { key: "pokemon", href: "/collections/pokemon" },
      { key: "magic-the-gathering", href: "/collections/magic-the-gathering" },
      { key: "yu-gi-oh", href: "/collections/yu-gi-oh" },
      { key: "digimon", href: "/collections/digimon" },
      { key: "one-piece", href: "/collections/one-piece" },
      { key: "flesh-and-blood", href: "/collections/flesh-and-blood" },
      { key: "lorcana", href: "/collections/lorcana" },
      { key: "riftbound", href: "/collections/riftbound" },
      { key: "union-arena", href: "/collections/union-arena" },
      { key: "final-fantasy", href: "/collections/final-fantasy" },
      { key: "star-wars-marvel", href: "/collections/star-wars-marvel" },
      { key: "dragonball", href: "/collections/dragonball" },
      { key: "disney", href: "/collections/disney" },
    ],
  },
  {
    key: "anime",
    href: "/collections/anime",
    children: [
      { key: "one-piece", href: "/collections/one-piece" },
      { key: "dragonball", href: "/collections/dragonball" },
      { key: "yu-gi-oh", href: "/collections/yu-gi-oh" },
      { key: "digimon", href: "/collections/digimon" },
    ],
  },
  {
    key: "vetements",
    href: "/collections/vetements-de-sports",
    children: [
      { key: "jersey", href: "/collections/jersey" },
      { key: "t-shirts", href: "/collections/t-shirts" },
      { key: "casquettes", href: "/collections/casquettes" },
      { key: "hoodies", href: "/collections/hoodies" },
    ],
  },
  {
    key: "accessoires",
    href: "/collections/accessoires",
    children: [
      { key: "playmats", href: "/collections/playmats" },
      { key: "sleeves", href: "/collections/sleeves" },
      { key: "boites", href: "/collections/boites" },
      { key: "deckbox", href: "/collections/deckbox" },
      { key: "carte-cadeau", href: "/collections/carte-cadeau" },
    ],
  },
  {
    key: "consommables",
    href: "/collections/consommables",
    children: [
      { key: "boissons", href: "/collections/boissons" },
      { key: "nourritures", href: "/collections/nourritures" },
    ],
  },
  { key: "collections", href: "/collections" },
  { key: "contact", href: "/contact" },
];

const LOGO =
  "https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164";

interface HeaderProps {
  siteInfo: Record<string, string>;
  dict: Dictionary;
  currency: string;
}

export default function Header({ siteInfo, dict, currency }: HeaderProps) {
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
          <span className="truncate">🚚 {dict.topbar.livraison}</span>
          <span className="hidden sm:flex items-center gap-1.5 shrink-0">
            <MapPin className="size-3" /> {siteInfo.adresse ?? "347 Rue Duvernay, Beloeil QC"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 bg-[color:var(--cream)]/95 backdrop-blur border-b-2 border-[color:var(--ink)]">

        {/* === DESKTOP === */}
        <div className="hidden lg:flex mx-auto max-w-7xl px-4 py-3 items-center gap-4">
          <Link href="/" aria-label={`Le Roi Des Cartes — ${dict.nav.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Le Roi Des Cartes" className="h-10 w-auto object-contain" />
          </Link>

          <nav className="flex items-center flex-nowrap gap-0.5 ml-2 text-sm font-semibold">
            {NAV.map((l) => (
              <div
                key={l.key}
                className="relative"
                onMouseEnter={() => l.children && setOpenDropdown(l.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)] transition whitespace-nowrap"
                >
                  {dict.nav[l.key]}
                  {l.children && (
                    <ChevronDown
                      className={`size-3 transition-transform duration-200 ${openDropdown === l.key ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {l.children && openDropdown === l.key && (
                  <div className="absolute top-full left-0 z-50 pt-2">
                    <div className="min-w-[200px] bg-[color:var(--cream)] border-2 border-[color:var(--ink)] rounded-md shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
                      {l.children.map((sub) => (
                        <Link
                          key={sub.key + sub.href}
                          href={sub.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-mono hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)] transition whitespace-nowrap border-b border-[color:var(--ink)]/10 last:border-0"
                        >
                          {dict.subnav[sub.key] ?? sub.key}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <LangCurrencySwitcher currency={currency} variant="header" />
            <button
              onClick={openCart}
              className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)] hover:-translate-x-px hover:-translate-y-px transition"
              aria-label={dict.nav.cart}
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

        {/* === MOBILE === */}
        <div className="lg:hidden px-4 py-3 flex items-center justify-between">
          <button
            onClick={openCart}
            className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)]"
            aria-label={dict.nav.cart}
          >
            <ShoppingBag className="size-5" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] text-[10px] font-bold rounded-full size-5 flex items-center justify-center border-2 border-[color:var(--ink)]">
                {totalQty > 9 ? "9+" : totalQty}
              </span>
            )}
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2" aria-label={`Le Roi Des Cartes — ${dict.nav.home}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Le Roi Des Cartes" className="h-10 w-auto object-contain" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative inline-flex items-center justify-center size-10 border-2 border-[color:var(--ink)] rounded-md bg-[color:var(--paper)] shadow-[3px_3px_0_0_var(--ink)] shrink-0"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span className="block h-[2.5px] bg-[color:var(--ink)] rounded-full origin-center transition-all duration-300" style={{ transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none" }} />
              <span className="block h-[2.5px] bg-[color:var(--ink)] rounded-full transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }} />
              <span className="block h-[2.5px] bg-[color:var(--ink)] rounded-full origin-center transition-all duration-300" style={{ transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
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
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b-2 border-[color:var(--cream)]/20">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Le Roi Des Cartes" className="h-12 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center size-10 border-2 border-[color:var(--cream)] rounded-md"
            aria-label={dict.nav.closeMenu}
          >
            <span className="flex flex-col gap-[5px] w-5">
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full origin-center" style={{ transform: "translateY(7.5px) rotate(45deg)" }} />
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full opacity-0" />
              <span className="block h-[2.5px] bg-[color:var(--cream)] rounded-full origin-center" style={{ transform: "translateY(-7.5px) rotate(-45deg)" }} />
            </span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          {NAV.map((l, i) => (
            <div key={l.key} className="border-b border-[color:var(--cream)]/15">
              {l.children ? (
                <button
                  onClick={() => setOpenMobile(openMobile === l.key ? null : l.key)}
                  className="w-full flex items-center justify-between py-4 transition-all duration-200 text-left"
                  style={{
                    transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  <span className="font-display text-[clamp(1.6rem,6vw,2.8rem)] uppercase text-[color:var(--cream)] leading-none">
                    {dict.nav[l.key]}
                  </span>
                  <ChevronDown
                    className={`size-6 text-[color:var(--cream)]/60 transition-transform duration-300 shrink-0 ml-3 ${openMobile === l.key ? "rotate-180 text-[color:var(--primary)]" : ""}`}
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
                    {dict.nav[l.key]}
                  </span>
                  <span className="text-[color:var(--cream)]/30 group-hover:text-[color:var(--primary)] transition-colors text-2xl">↗</span>
                </Link>
              )}

              {l.children && (
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openMobile === l.key ? "600px" : "0px" }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 mb-2 font-mono text-xs text-[color:var(--primary)] hover:underline"
                  >
                    {dict.nav.voirTout} — {dict.nav[l.key]} ↗
                  </Link>
                  <div className="pb-4 grid grid-cols-2 gap-x-3 gap-y-0">
                    {l.children.map((sub) => (
                      <Link
                        key={sub.key + sub.href}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-1.5 font-mono text-sm text-[color:var(--cream)] hover:text-[color:var(--primary)] transition-colors py-2 border-b border-white/10 last:border-0"
                        style={{ opacity: 0.8 }}
                      >
                        <span style={{ opacity: 0.4 }} className="text-xs">›</span>
                        {dict.subnav[sub.key] ?? sub.key}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="px-6 pb-8 pt-4 space-y-3">
          <LangCurrencySwitcher currency={currency} variant="footer" onNavigate={() => setMenuOpen(false)} />
          <Link
            href="/collections"
            onClick={() => setMenuOpen(false)}
            className="btn-chunk w-full justify-center"
          >
            <ShoppingBag className="size-4" /> {dict.nav.boutique}
          </Link>
          <p className="text-center font-mono text-xs text-[color:var(--cream)]/40 pt-2">
            347 Rue Duvernay · Beloeil QC · (450) 281-0625
          </p>
        </div>
      </div>
    </>
  );
}
