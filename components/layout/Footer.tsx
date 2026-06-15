import Link from "@/components/i18n/Link";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import LangCurrencySwitcher from "@/components/i18n/LangCurrencySwitcher";

interface FooterProps {
  siteInfo: Record<string, string>;
  dict: Dictionary;
  currency: string;
}

const SHOP_LINKS: Array<{ key: keyof Dictionary["nav"]; href: string }> = [
  { key: "sports", href: "/collections/sports" },
  { key: "jeux", href: "/collections/tcg-tout" },
  { key: "anime", href: "/collections/anime" },
  { key: "vetements", href: "/collections/vetements-de-sports" },
  { key: "accessoires", href: "/collections/accessoires" },
  { key: "consommables", href: "/collections/consommables" },
];

export default function Footer({ siteInfo, dict, currency }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--cream)]">
      {/* Infolettre */}
      <div className="border-b border-[color:var(--cream)]/15">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="font-display uppercase text-2xl">{dict.newsletter.titre}</div>
            <p className="mt-2 text-sm text-[color:var(--cream)]/70 max-w-md">
              {dict.newsletter.desc}
            </p>
          </div>
          <NewsletterForm dict={dict} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-display text-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164"
              alt="Le Roi Des Cartes"
              className="h-10 w-auto object-contain"
            />
            LE ROI DES CARTES
          </Link>
          <p className="mt-4 max-w-sm text-[color:var(--cream)]/70 text-sm">
            {dict.footer.desc}
          </p>
          <div className="mt-5">
            <LangCurrencySwitcher currency={currency} variant="footer" />
          </div>
        </div>

        <div>
          <div className="font-display uppercase text-sm mb-3">{dict.footer.magasin}</div>
          <ul className="space-y-2 text-sm font-mono text-[color:var(--cream)]/80">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[color:var(--cream)] transition">
                  {dict.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display uppercase text-sm mb-3">{dict.footer.laBoutique}</div>
          <ul className="space-y-2 text-sm font-mono text-[color:var(--cream)]/80">
            <li>{siteInfo.adresse ?? "347 Rue Duvernay, Beloeil"}</li>
            <li>{siteInfo.telephone ?? "(450) 281-0625"}</li>
            <li>{dict.footer.soirees}</li>
            <li>{dict.footer.breakouts}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--cream)]/15">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[color:var(--cream)]/60">
          <span>© {year} Le Roi des Cartes — {dict.footer.droits}</span>
          <span>{dict.footer.watermark}</span>
        </div>
      </div>
    </footer>
  );
}
