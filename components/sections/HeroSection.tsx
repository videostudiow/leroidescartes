import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  content: Record<string, string>;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative bg-background min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decorative image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 bg-gradient-to-l from-black to-transparent" />
        {content.hero_image_url && (
          <Image
            src={content.hero_image_url}
            alt="Le Roi Des Cartes — Boutique"
            fill
            className="object-cover object-right opacity-15"
            priority
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="badge bg-dark text-white text-xs inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                NOUVEAUTÉS CHAOS RISING
              </span>
              <span className="badge bg-primary text-white text-xs inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                BREAKOUTS EN DIRECT
              </span>
              <span className="badge bg-secondary text-dark text-xs inline-flex items-center gap-1.5">
                ★ NOTE 4,9/5 (422 AVIS)
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-black uppercase mb-6">
              <span className="block">{content.hero_titre_ligne1 ?? "LE REPAIRE"}</span>
              <span className="block bg-primary text-white px-2 -mx-2 w-fit">
                {content.hero_titre_ligne2 ?? "DES COLLECTIONNEURS"}
              </span>
              <span className="block">{content.hero_titre_ligne3 ?? "DE LA RIVE-SUD."}</span>
            </h1>

            {/* Description */}
            <p className="text-muted text-base leading-relaxed max-w-lg mb-8">
              {content.hero_description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/collections"
                className="btn-primary text-sm px-7 py-3.5 font-bold"
              >
                {content.hero_cta_principal ?? "Magasiner les Boosters"} →
              </Link>
              <Link
                href="/evenements"
                className="btn-outline border-dark text-dark text-sm px-7 py-3.5 font-bold"
              >
                {content.hero_cta_secondaire ?? "Soirées de Jeu"}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 border-t border-border pt-6">
              {[
                { valeur: content.hero_stat_1_valeur ?? "18k+", label: content.hero_stat_1_label ?? "Cartes en stock" },
                { valeur: content.hero_stat_2_valeur ?? "7 jrs/7", label: content.hero_stat_2_label ?? "Ouvert" },
                { valeur: content.hero_stat_3_valeur ?? "12 h", label: content.hero_stat_3_label ?? "Support offert" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-3xl font-black text-dark">{stat.valeur}</p>
                  <p className="text-xs text-muted uppercase tracking-wide mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual : cartes en éventail */}
          <div className="hidden lg:flex justify-center items-center relative h-[520px]">
            {/* Carte arrière gauche */}
            <div className="absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-dark/10 -rotate-12 -translate-x-28 translate-y-4 bg-dark">
              <Image
                src="https://leroidescartes.ca/cdn/shop/files/MagicSuperheroespromo_1.png?v=1778532585&width=1500"
                alt="Magic Superheroes"
                fill
                className="object-cover"
              />
            </div>
            {/* Carte arrière droite */}
            <div className="absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-dark/10 rotate-12 translate-x-28 translate-y-4 bg-dark">
              <Image
                src="https://leroidescartes.ca/cdn/shop/files/Sans_titre_1170_x_800_px_2.png?v=1779726946&width=1500"
                alt="Chaos Rising"
                fill
                className="object-cover"
              />
            </div>
            {/* Carte avant (centre) */}
            <div className="relative w-64 h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-dark z-10">
              <Image
                src="https://leroidescartes.ca/cdn/shop/files/Unleashedpromo.png?v=1778532501&width=1500"
                alt="Riftbound Unleashed"
                fill
                className="object-cover"
                priority
              />
              {/* Badge LIVE */}
              <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 font-heading font-black text-sm uppercase rounded-md shadow-lg inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            </div>
            {/* Badge flottant bas */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-dark px-4 py-2 font-heading font-black text-sm uppercase -rotate-2 shadow-lg z-20 rounded-md">
              GRADE PSA 10
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
