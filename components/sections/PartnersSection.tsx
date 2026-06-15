import Image from "next/image";

const PARTNERS = [
  { nom: "Topps", logo: "https://leroidescartes.ca/cdn/shop/files/topps_c98ab0bc-d980-411e-96bc-ea87510c8877.png?v=1715947703&width=400" },
  { nom: "Magic", logo: "https://leroidescartes.ca/cdn/shop/files/magic-center.png?v=1715947750&width=400" },
  { nom: "Panini", logo: "https://leroidescartes.ca/cdn/shop/files/panini_b9c4983f-4051-484f-8fa6-18782c1e257b.png?v=1715947810&width=400" },
  { nom: "Yu-Gi-Oh!", logo: "https://leroidescartes.ca/cdn/shop/files/yugiho.png?v=1715949979&width=400" },
  { nom: "Upper Deck", logo: "https://leroidescartes.ca/cdn/shop/files/upperdeck.png?v=1715947662&width=400" },
  { nom: "Fanatics", logo: "https://leroidescartes.ca/cdn/shop/files/fanatics_1.png?v=1715950032&width=400" },
  { nom: "New Era", logo: "https://leroidescartes.ca/cdn/shop/files/new_era.png?v=1715950093&width=400" },
];

interface PartnersSectionProps {
  content: Record<string, string>;
}

export default function PartnersSection({ content }: PartnersSectionProps) {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-badge justify-center mb-8">
          <span className="w-full max-w-24 h-px bg-border" />
          <span className="whitespace-nowrap px-4">{content.partenaires_badge ?? "DISTRIBUTEUR AUTORISÉ"}</span>
          <span className="w-full max-w-24 h-px bg-border" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p.nom}
              className="bg-white rounded-xl border border-border shadow-sm w-24 h-16 md:w-28 md:h-20 flex items-center justify-center p-3 hover:shadow-md transition-shadow"
            >
              <Image
                src={p.logo}
                alt={p.nom}
                width={120}
                height={60}
                className="max-h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
