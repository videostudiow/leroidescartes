import Link from "next/link";

interface FooterProps {
  siteInfo: Record<string, string>;
}

export default function Footer({ siteInfo }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--cream)]">
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
            Boutique familiale de cartes à collectionner et objets geek. Avec
            passion, depuis Beloeil — pour les chasseurs, les joueurs, et les
            nostalgiques.
          </p>
        </div>

        <div>
          <div className="font-display uppercase text-sm mb-3">Magasin</div>
          <ul className="space-y-2 text-sm font-mono text-[color:var(--cream)]/80">
            <li><Link href="/collections/sports" className="hover:text-[color:var(--cream)] transition">Sports</Link></li>
            <li><Link href="/collections/tcg-tout" className="hover:text-[color:var(--cream)] transition">Jeux (TCG)</Link></li>
            <li><Link href="/collections/anime" className="hover:text-[color:var(--cream)] transition">Anime</Link></li>
            <li><Link href="/collections/vetements-de-sports" className="hover:text-[color:var(--cream)] transition">Vêtements</Link></li>
            <li><Link href="/collections/accessoires" className="hover:text-[color:var(--cream)] transition">Accessoires</Link></li>
            <li><Link href="/collections/consommables" className="hover:text-[color:var(--cream)] transition">Consommables</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-display uppercase text-sm mb-3">La boutique</div>
          <ul className="space-y-2 text-sm font-mono text-[color:var(--cream)]/80">
            <li>{siteInfo.adresse ?? "347 Rue Duvernay, Beloeil"}</li>
            <li>{siteInfo.telephone ?? "(450) 281-0625"}</li>
            <li>Soirées de jeu jeudi &amp; vendredi</li>
            <li>Breakouts hebdo</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--cream)]/15">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[color:var(--cream)]/60">
          <span>© {year} Le Roi des Cartes — Tous droits réservés.</span>
          <span>Site créé par Studio W · Fait avec passion sur la Rive-Sud 🃏</span>
        </div>
      </div>
    </footer>
  );
}
