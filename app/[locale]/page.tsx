import Link from "@/components/i18n/Link";
import {
  MapPin, Phone, Clock, Sparkles, Swords, Zap,
  ArrowUpRight, Flame, Dice5, Trophy, Star,
} from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSiteData } from "@/lib/get-site-data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

// Images de l'accueil — éditables dans /admin/images (clés home_img_*)
type HomeImages = {
  hero1: string; hero2: string; hero3: string;
  catSports: string; catJeux: string; catAnime: string;
  catVetements: string; catAccessoires: string; catConsommables: string;
  break: string;
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

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "fr";
  const [dict, { content }] = await Promise.all([
    getDictionary(locale),
    getSiteData(),
  ]);

  const img: HomeImages = {
    hero1: content.home_img_hero_1,
    hero2: content.home_img_hero_2,
    hero3: content.home_img_hero_3,
    catSports: content.home_img_cat_sports,
    catJeux: content.home_img_cat_jeux,
    catAnime: content.home_img_cat_anime,
    catVetements: content.home_img_cat_vetements,
    catAccessoires: content.home_img_cat_accessoires,
    catConsommables: content.home_img_cat_consommables,
    break: content.home_img_break,
  };

  return (
    <>
      <Hero dict={dict} img={img} />
      <BeltMarquee />
      <Categories dict={dict} img={img} />
      <Events dict={dict} />
      <Brands dict={dict} />
      <BreakBanner dict={dict} img={img} />
      <Visit dict={dict} />
    </>
  );
}

function Hero({ dict, img }: { dict: Dictionary; img: HomeImages }) {
  const h = dict.home;
  return (
    <section className="relative overflow-hidden border-b-2 border-[color:var(--ink)] grid-noise">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 relative z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="sticker red"><Flame className="size-3" /> {h.stickerNouveautes}</span>
            <span className="sticker yellow"><Zap className="size-3" /> {h.stickerBreakouts}</span>
            <span className="sticker"><Star className="size-3" /> {h.stickerAvis}</span>
          </div>

          <h1 className="font-display text-[clamp(2.2rem,8vw,5.6rem)] leading-[0.92] uppercase">
            {h.heroTitre1} <br />
            <span className="inline-block bg-[color:var(--primary)] text-[color:var(--primary-foreground)] px-3 py-1 -rotate-1 border-2 border-[color:var(--ink)] shadow-[4px_4px_0_0_var(--ink)] my-2">
              {h.heroTitre2}
            </span><br />
            {h.heroTitre3}
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base lg:text-lg text-[color:var(--ink)]/80">
            {h.heroDesc}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/collections" className="btn-chunk text-sm">{h.heroCta1} <ArrowUpRight className="size-4" /></Link>
            <Link href="/evenements" className="btn-chunk alt text-sm"><Swords className="size-4" /> {h.heroCta2}</Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 font-mono text-xs max-w-xs sm:max-w-md">
            {[
              ["18k+", h.stat1],
              ["7 jrs/7", h.stat2],
              ["12 h", h.stat3],
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
              <img src={img.hero1} alt="Pokémon" className="w-full h-full object-cover" />
            </div>
            <div className="absolute w-[72%] aspect-[3/4] brutal-card overflow-hidden tilt-r" style={{ right: "0%", top: "0%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.hero2} alt="Magic the Gathering" className="w-full h-full object-cover" />
            </div>
            <div className="absolute w-[60%] aspect-[3/4] brutal-card overflow-hidden" style={{ left: "20%", bottom: "0%", transform: "rotate(-1deg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.hero3} alt="Riftbound" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-2 right-4 sticker red rotate-6 text-sm py-1.5 px-3">
              <Sparkles className="size-3" /> {h.stickerBlister}
            </span>
            <span className="absolute bottom-4 left-2 sticker yellow -rotate-3 text-sm py-1.5 px-3">
              {h.stickerGrade}
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

function Categories({ dict, img }: { dict: Dictionary; img: HomeImages }) {
  const h = dict.home;
  const cats = [
    { title: dict.nav.sports, tag: h.cats.sports.tag, desc: h.cats.sports.desc, img: img.catSports, color: "bg-[color:var(--paper)]", href: "/collections/sports" },
    { title: h.cats.jeux.title, tag: h.cats.jeux.tag, desc: h.cats.jeux.desc, img: img.catJeux, color: "bg-[color:var(--accent)]", href: "/collections/tcg-tout" },
    { title: dict.nav.anime, tag: h.cats.anime.tag, desc: h.cats.anime.desc, img: img.catAnime, color: "bg-[color:var(--secondary)]", href: "/collections/anime" },
    { title: h.cats.vetements.title, tag: h.cats.vetements.tag, desc: h.cats.vetements.desc, img: img.catVetements, color: "bg-[color:var(--paper)]", href: "/collections/vetements-de-sports" },
    { title: dict.nav.accessoires, tag: h.cats.accessoires.tag, desc: h.cats.accessoires.desc, img: img.catAccessoires, color: "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]", href: "/collections/accessoires" },
    { title: dict.nav.consommables, tag: h.cats.consommables.tag, desc: h.cats.consommables.desc, img: img.catConsommables, color: "bg-[color:var(--secondary)]", href: "/collections/consommables" },
  ];
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <div className="sticker mb-3"><Dice5 className="size-3" /> {h.catBadge}</div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">
            {h.catTitre1} <span className="text-[color:var(--primary)]">{h.catTitre2}</span>
          </h2>
        </div>
        <Link href="/collections" className="hidden md:inline-flex font-mono text-sm underline underline-offset-4">
          {h.catVoirTout}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cats.map((c, i) => (
          <Link key={c.href} href={c.href}
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

function Events({ dict }: { dict: Dictionary }) {
  const h = dict.home;
  return (
    <section id="events" className="relative border-y-2 border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--cream)] overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(var(--cream) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="inline-flex sticker yellow mb-4"><Trophy className="size-3" /> {h.evBadge}</div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">
              {h.evTitre1} <br />
              <span className="bg-[color:var(--secondary)] text-[color:var(--ink)] px-2 -rotate-1 inline-block border-2 border-[color:var(--cream)]">
                {h.evTitre2}
              </span>
            </h2>
            <p className="mt-5 text-[color:var(--cream)]/80 max-w-md">{h.evDesc}</p>
            <Link href="/evenements" className="btn-chunk lime mt-6 inline-flex">{h.evCta}</Link>
          </div>
          <ul className="lg:col-span-7 space-y-3 sm:space-y-4">
            {h.events.map((e, i) => (
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
                <span className="hidden sm:inline-flex sticker shrink-0">{h.evGratuit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Brands({ dict }: { dict: Dictionary }) {
  const h = dict.home;
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <span className="sticker shrink-0">{h.brandsBadge}</span>
        <h2 className="font-display text-xl sm:text-3xl uppercase">{h.brandsTitre}</h2>
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

function BreakBanner({ dict, img }: { dict: Dictionary; img: HomeImages }) {
  const h = dict.home;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:pb-16">
      <div className="brutal-card overflow-hidden text-[color:var(--primary-foreground)]" style={{ background: "var(--primary)" }}>
        <div className="grid md:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="sticker yellow self-start mb-3 sm:mb-4"><Flame className="size-3" /> {h.breakBadge}</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-none">
              {h.breakTitre1} <br />{h.breakTitre2}
            </h2>
            <p className="mt-4 text-sm sm:text-base max-w-md text-[color:var(--primary-foreground)]/90">
              {h.breakDesc}
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
              <Link href="/evenements" className="btn-chunk alt text-sm">{h.breakCta1}</Link>
              <a href="https://www.tiktok.com/@leroidescartes" target="_blank" rel="noopener noreferrer" className="btn-chunk ghost text-sm">{h.breakCta2}</a>
            </div>
          </div>
          <div className="relative aspect-[16/9] md:aspect-auto border-t-2 md:border-t-0 md:border-l-2 border-[color:var(--ink)] bg-[color:var(--ink)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.break} alt="Hockey break" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <span className="absolute top-3 right-3 sm:top-4 sm:right-4 sticker yellow font-mono text-xs">{h.breakLive}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit({ dict }: { dict: Dictionary }) {
  const h = dict.home;
  return (
    <section id="visit" className="mx-auto max-w-7xl px-4 py-12 sm:py-20 grid lg:grid-cols-2 gap-8 lg:gap-10">
      <div>
        <div className="sticker mb-4"><MapPin className="size-3" /> {h.visitBadge}</div>
        <h2 className="font-display text-3xl sm:text-5xl uppercase leading-none">
          {h.visitTitre1} <br />
          <span className="text-[color:var(--primary)]">{h.visitTitre2}</span>
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base max-w-md text-[color:var(--ink)]/80">
          {h.visitDesc}
        </p>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="brutal-card p-4 sm:p-5">
            <Clock className="size-4 sm:size-5 mb-2" />
            <div className="font-display uppercase text-sm sm:text-base">{h.visitHeures}</div>
            <ul className="mt-2 font-mono text-xs sm:text-sm space-y-1 text-[color:var(--ink)]/80">
              {h.hoursLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
          <div className="brutal-card p-4 sm:p-5">
            <Phone className="size-4 sm:size-5 mb-2" />
            <div className="font-display uppercase text-sm sm:text-base">{h.visitContact}</div>
            <ul className="mt-2 font-mono text-xs sm:text-sm space-y-1 text-[color:var(--ink)]/80">
              <li>(450) 281-0625</li>
              <li>347 Rue Duvernay</li>
              <li>Beloeil, QC</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 flex flex-wrap gap-3">
          <a href="https://maps.app.goo.gl/LeRoiDesCartes" target="_blank" rel="noreferrer" className="btn-chunk text-sm">{h.visitItineraire} <ArrowUpRight className="size-4" /></a>
          <a href="tel:+14502810625" className="btn-chunk alt text-sm">{h.visitAppeler}</a>
        </div>
      </div>

      <div className="relative brutal-card overflow-hidden min-h-[280px] sm:min-h-[380px] lg:min-h-[420px]">
        <iframe
          title="Le Roi des Cartes - Beloeil"
          className="absolute inset-0 w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.9015358427177!2d-73.21211342323777!3d45.56518007107575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9abb53da6edcb%3A0x3a23a060baedbe28!2sLe%20Roi%20des%20Cartes%20-%20Hockey%2C%20TCG%20%26%20Accessoires!5e1!3m2!1sfr!2sca!4v1781485705340!5m2!1sfr!2sca"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
