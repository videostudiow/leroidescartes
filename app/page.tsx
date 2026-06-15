import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Phone, Clock, Sparkles, Swords, Zap,
  ArrowUpRight, Flame, Dice5, Trophy, Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Le Roi Des Cartes — Repaire des collectionneurs de la Rive-Sud",
  description:
    "Boutique de cartes à collectionner et objets geek à Beloeil (Rive-Sud). Pokémon, Magic, Riftbound, Yu-Gi-Oh, NHL, Funko Pop. Soirées de jeu, breakouts, trading. Livraison gratuite 250 $+.",
  openGraph: {
    title: "Le Roi des Cartes — Le repaire des collectionneurs",
    description:
      "Cartes Pokémon, Magic, NHL, Riftbound + Funko Pop & goodies geek. Boutique + en ligne. Soirées de jeu chaque semaine.",
    images: [
      "https://leroidescartes.ca/cdn/shop/files/Sans_titre_1170_x_800_px_2.png?v=1779726946&width=1500",
    ],
  },
};

const IMG = {
  pokemon: "https://leroidescartes.ca/cdn/shop/files/Sans_titre_1170_x_800_px_2.png?v=1779726946&width=1500",
  magic: "https://leroidescartes.ca/cdn/shop/files/MagicSuperheroespromo_1.png?v=1778532585&width=1500",
  riftbound: "https://leroidescartes.ca/cdn/shop/files/Unleashedpromo.png?v=1778532501&width=1500",
  pokeBox: "https://leroidescartes.ca/cdn/shop/files/s-l1200_5_7d5d6037-31f9-48f2-869e-f12a090e6850.jpg?v=1770339338&width=1200",
  hockey: "https://leroidescartes.ca/cdn/shop/files/images_1_1.jpg?v=1770339429&width=1200",
  acc: "https://leroidescartes.ca/cdn/shop/files/Nouveau_projet_5.png?v=1773099815&width=1200",
};

const BRANDS = [
  { name: "Pokémon", src: "https://leroidescartes.ca/cdn/shop/files/topps_c98ab0bc-d980-411e-96bc-ea87510c8877.png?v=1715947703&width=400" },
  { name: "Magic", src: "https://leroidescartes.ca/cdn/shop/files/magic-center.png?v=1715947750&width=400" },
  { name: "Panini", src: "https://leroidescartes.ca/cdn/shop/files/panini_b9c4983f-4051-484f-8fa6-18782c1e257b.png?v=1715947810&width=400" },
  { name: "Yu-Gi-Oh!", src: "https://leroidescartes.ca/cdn/shop/files/yugiho.png?v=1715949979&width=400" },
  { name: "Upper Deck", src: "https://leroidescartes.ca/cdn/shop/files/upperdeck.png?v=1715947662&width=400" },
  { name: "Fanatics", src: "https://leroidescartes.ca/cdn/shop/files/fanatics_1.png?v=1715950032&width=400" },
  { name: "New Era", src: "https://leroidescartes.ca/cdn/shop/files/new_era.png?v=1715950093&width=400" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BeltMarquee />
      <Categories />
      <Events />
      <Brands />
      <BreakBanner />
      <Visit />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-[color:var(--ink)] grid-noise">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 relative z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="sticker red"><Flame className="size-3" /> Nouveautés Chaos Rising</span>
            <span className="sticker yellow"><Zap className="size-3" /> Breakouts en direct</span>
            <span className="sticker"><Star className="size-3" /> Note 4,9/5 (412 avis)</span>
          </div>

          <h1 className="font-display text-[clamp(2.2rem,8vw,5.6rem)] leading-[0.92] uppercase">
            Le repaire <br />
            <span className="inline-block bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-3 py-1 -rotate-1 border-2 border-[color:var(--ink)] shadow-[4px_4px_0_0_var(--ink)] my-2">
              des collectionneurs
            </span><br />
            de la rive-sud.
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base lg:text-lg text-[color:var(--ink)]/80">
            Pokémon, Magic, Riftbound, Yu-Gi-Oh!, NHL, Funko Pop&nbsp;— et tout
            ce qui se chasse, se trade, se sleeve&nbsp;ou se garde sous vitrine.
            Boutique familiale à Beloeil, livraison partout au Canada.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/collections" className="btn-chunk text-sm">Magasiner les boosters <ArrowUpRight className="size-4" /></Link>
            <Link href="/evenements" className="btn-chunk alt text-sm"><Swords className="size-4" /> Soirées de jeu</Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 font-mono text-xs max-w-xs sm:max-w-md">
            {[
              ["18k+", "cartes en stock"],
              ["7 jrs/7", "ouverts"],
              ["12 h", "support rapide"],
            ].map(([n, l]) => (
              <div key={l} className="brutal-card p-3 text-center">
                <div className="font-display text-xl sm:text-2xl">{n}</div>
                <div className="uppercase tracking-wide text-[color:var(--ink)]/70 mt-1 text-[10px] sm:text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card stack — desktop only */}
        <div className="hidden lg:block lg:col-span-5 relative h-[520px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[78%] aspect-[3/4] brutal-card overflow-hidden tilt-l" style={{ left: "2%", top: "8%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.pokeBox} alt="Boîte Pokémon" className="w-full h-full object-cover" />
            </div>
            <div className="absolute w-[72%] aspect-[3/4] brutal-card overflow-hidden tilt-r" style={{ right: "0%", top: "0%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.magic} alt="Magic the Gathering" className="w-full h-full object-cover" />
            </div>
            <div className="absolute w-[60%] aspect-[3/4] brutal-card overflow-hidden" style={{ left: "20%", bottom: "0%", transform: "rotate(-1deg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.riftbound} alt="Riftbound" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-2 right-4 sticker red rotate-6 text-sm py-1.5 px-3">
              <Sparkles className="size-3" /> SOUS BLISTER
            </span>
            <span className="absolute bottom-4 left-2 sticker yellow -rotate-3 text-sm py-1.5 px-3">
              GRADÉ PSA 10
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeltMarquee() {
  const items = [
    "POKÉMON • CHAOS RISING", "★",
    "MAGIC • SUPERHEROES", "✦",
    "RIFTBOUND • UNLEASHED", "★",
    "NHL 23-24 RETAIL", "✦",
    "YU-GI-OH! • QUARTER CENTURY", "★",
    "FUNKO POP CHASE", "✦",
  ];
  return (
    <div className="tape py-3 overflow-hidden">
      <div className="marquee font-display text-xl sm:text-2xl uppercase tracking-wider">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="shrink-0">{t}</span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  const cats = [
    { title: "Sports", tag: "NHL • NBA • MLB", desc: "Hockey, baseball, basketball, football, soccer, golf et racing.", img: IMG.hockey, color: "bg-[color:var(--paper)]", href: "/collections/sports" },
    { title: "Jeux (TCG)", tag: "TCG", desc: "Pokémon, Magic, Yu-Gi-Oh!, Riftbound, Lorcana, One Piece et plus.", img: IMG.magic, color: "bg-[color:var(--accent)]", href: "/collections/tcg-tout" },
    { title: "Anime", tag: "Nouveau", desc: "Cartes et collectibles anime — Digimon, Dragon Ball, Disney.", img: IMG.pokemon, color: "bg-[color:var(--secondary)]", href: "/collections/anime" },
    { title: "Vêtements", tag: "Mode", desc: "Chandails de hockey, vêtements de sports, casquettes.", img: IMG.acc, color: "bg-[color:var(--paper)]", href: "/collections/vetements-de-sports" },
    { title: "Accessoires", tag: "Gear", desc: "Sleeves, toploaders, binders, boîtes de storage et thermos.", img: IMG.pokeBox, color: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]", href: "/collections/accessoires" },
    { title: "Consommables", tag: "Boutique", desc: "Carte-cadeau, jeux de société, boissons et nourritures.", img: IMG.riftbound, color: "bg-[color:var(--secondary)]", href: "/collections/consommables" },
  ];
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <div className="sticker mb-3"><Dice5 className="size-3" /> Catégories</div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">
            Choisis ton <span className="text-[color:var(--primary)]">terrain de chasse</span>
          </h2>
        </div>
        <Link href="/collections" className="hidden md:inline-flex font-mono text-sm underline underline-offset-4">
          voir tout le catalogue ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cats.map((c, i) => (
          <Link key={c.title} href={c.href}
            className={`brutal-card brutal-card-hover overflow-hidden flex flex-col sm:${i % 2 === 0 ? "tilt-xs-l" : "tilt-xs-r"}`}>
            <div className={`relative aspect-[5/4] overflow-hidden ${c.color} border-b-2 border-[color:var(--ink)]`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title} className="w-full h-full object-cover mix-blend-multiply" />
              <span className="absolute top-3 left-3 sticker red">{c.tag}</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl uppercase leading-tight">{c.title}</h3>
                <ArrowUpRight className="size-5 shrink-0 mt-1" />
              </div>
              <p className="mt-2 text-sm text-[color:var(--ink)]/75">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Events() {
  const ev = [
    { day: "JEU", time: "19h – 22h", title: "Soirées Riftbound", note: "Duels, drafts, deckbuilding. Premier verre offert." },
    { day: "VEN", time: "19h – 23h", title: "Magic Night", note: "Commander pods, standard, draft on demand." },
    { day: "SAM", time: "11h – 17h", title: "Trading Day", note: "Échanges entre collectionneurs. Ramène tes binders." },
  ];
  return (
    <section id="events" className="relative border-y-2 border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--cream)] overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(var(--cream) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="inline-flex sticker yellow mb-4"><Trophy className="size-3" /> La table est mise</div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">
              Chaque semaine, <br />
              <span className="bg-[color:var(--secondary)] text-[color:var(--ink)] px-2 -rotate-1 inline-block border-2 border-[color:var(--cream)]">
                on joue pour vrai.
              </span>
            </h2>
            <p className="mt-5 text-[color:var(--cream)]/80 max-w-md">
              Pas besoin d&rsquo;être pro — juste d&rsquo;avoir envie. Tables, sleeves,
              et même un coup de main pour bâtir ton premier deck.
            </p>
            <Link href="/evenements" className="btn-chunk lime mt-6 inline-flex">Réserver ma place</Link>
          </div>
          <ul className="lg:col-span-7 space-y-3 sm:space-y-4">
            {ev.map((e, i) => (
              <li key={e.title}
                className={`brutal-card text-[color:var(--ink)] p-4 sm:p-6 flex items-center gap-4 sm:gap-5 sm:${i === 1 ? "tilt-xs-r" : "tilt-xs-l"}`}>
                <div className="shrink-0 w-16 sm:w-24 text-center border-r-2 border-[color:var(--ink)] pr-3 sm:pr-4">
                  <div className="font-display text-2xl sm:text-4xl">{e.day}</div>
                  <div className="font-mono text-[10px] sm:text-xs mt-1">{e.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-2xl uppercase">{e.title}</h3>
                  <p className="text-xs sm:text-sm text-[color:var(--ink)]/75 mt-1 line-clamp-2">{e.note}</p>
                </div>
                <span className="hidden sm:inline-flex sticker shrink-0">Gratuit</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <span className="sticker shrink-0">Officiel</span>
        <h2 className="font-display text-xl sm:text-3xl uppercase">Distributeur autorisé</h2>
        <span className="flex-1 h-0.5 bg-[color:var(--ink)]" />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        {BRANDS.map((b) => (
          <div key={b.name} className="brutal-card p-2 sm:p-4 flex items-center justify-center aspect-[3/2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.src} alt={b.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
          </div>
        ))}
      </div>
    </section>
  );
}

function BreakBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:pb-16">
      <div className="brutal-card overflow-hidden text-[color:var(--primary-foreground)]" style={{ background: "var(--primary)" }}>
        <div className="grid md:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="sticker yellow self-start mb-3 sm:mb-4"><Flame className="size-3" /> En direct</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-none">
              Breakouts <br />du jeudi soir
            </h2>
            <p className="mt-4 text-sm sm:text-base max-w-md text-[color:var(--primary-foreground)]/90">
              On ouvre les hobby box devant la caméra. Tu prends une équipe,
              une division, ou un random — tu gardes tes hits. Pis si t&rsquo;es chanceux,
              tu repars avec un rookie 1/1.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
              <Link href="/evenements" className="btn-chunk alt text-sm">Voir les breaks à venir</Link>
              <a href="https://www.tiktok.com/@leroidescartes" target="_blank" rel="noopener noreferrer" className="btn-chunk ghost text-sm">Regarder en direct</a>
            </div>
          </div>
          <div className="relative aspect-[16/9] md:aspect-auto border-t-2 md:border-t-0 md:border-l-2 border-[color:var(--ink)] bg-[color:var(--ink)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.hockey} alt="Hockey break" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 sticker yellow font-mono text-xs">● LIVE JEU. 20h00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-4 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-10">
      <div>
        <div className="sticker mb-4"><MapPin className="size-3" /> En personne</div>
        <h2 className="font-display text-3xl sm:text-5xl uppercase leading-none">
          Passe nous voir <br />
          <span className="text-[color:var(--primary)]">à Beloeil.</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base max-w-md text-[color:var(--ink)]/80">
          Entreprise familiale. On parle cartes, on aide à bâtir ton deck,
          on évalue ta collection — pis on a un wall de Funko qui vaut la photo.
        </p>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="brutal-card p-4 sm:p-5">
            <Clock className="size-4 sm:size-5 mb-2" />
            <div className="font-display uppercase text-sm sm:text-base">Heures</div>
            <ul className="mt-2 font-mono text-xs sm:text-sm space-y-1 text-[color:var(--ink)]/80">
              <li>Lun–Mer · 11h–18h</li>
              <li>Jeu–Ven · 11h–22h</li>
              <li>Sam · 11h–17h</li>
              <li>Dim · 12h–17h</li>
            </ul>
          </div>
          <div className="brutal-card p-4 sm:p-5">
            <Phone className="size-4 sm:size-5 mb-2" />
            <div className="font-display uppercase text-sm sm:text-base">Contact</div>
            <ul className="mt-2 font-mono text-xs sm:text-sm space-y-1 text-[color:var(--ink)]/80">
              <li>(450) 281-0625</li>
              <li>347 Rue Duvernay</li>
              <li>Beloeil, QC</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
          <a href="https://maps.google.com/?q=347+Rue+Duvernay+Beloeil+QC" target="_blank" rel="noreferrer" className="btn-chunk text-sm">Itinéraire <ArrowUpRight className="size-4" /></a>
          <a href="tel:+14502810625" className="btn-chunk alt text-sm">Appeler la boutique</a>
        </div>
      </div>

      <div className="relative brutal-card overflow-hidden min-h-[280px] sm:min-h-[380px] lg:min-h-[420px]">
        <iframe
          title="Le Roi des Cartes - Beloeil"
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps?q=347%20Rue%20Duvernay%2C%20Beloeil%2C%20QC&output=embed"
          loading="lazy"
        />
      </div>
    </section>
  );
}
