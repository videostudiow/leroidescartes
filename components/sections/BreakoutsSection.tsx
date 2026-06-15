import Link from "next/link";
import Image from "next/image";

interface BreakoutsSectionProps {
  content: Record<string, string>;
}

export default function BreakoutsSection({ content }: BreakoutsSectionProps) {
  return (
    <section className="py-20 bg-primary text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] bg-white/20 px-3 py-1.5 rounded-sm mb-6">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              {content.breakouts_badge ?? "EN DIRECT"}
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.95] mb-6">
              {content.breakouts_titre ?? "BREAKOUTS DU JEUDI SOIR"}
            </h2>
            <p className="text-white/80 leading-relaxed mb-8 max-w-lg">
              {content.breakouts_description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://breakinghits.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-primary font-bold px-7 py-3.5 text-sm hover:bg-zinc-100 active:scale-95"
              >
                {content.breakouts_cta_principal ?? "Voir les Breaks à venir"} →
              </a>
              <button className="btn border-2 border-white text-white px-7 py-3.5 text-sm hover:bg-white/10 active:scale-95">
                {content.breakouts_cta_secondaire ?? "Regarder en direct"}
              </button>
            </div>
          </div>

          {/* Right — Photo hockey live */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl aspect-[4/3]">
              <Image
                src="https://leroidescartes.ca/cdn/shop/files/images_1_1.jpg?v=1770339429&width=1200"
                alt="Breakouts hockey en direct"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-3 right-3 badge bg-black/70 backdrop-blur-sm text-white text-xs inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                LIVE · JEU 20h00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
