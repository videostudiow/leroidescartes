import Link from "next/link";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const HEURES_SEMAINE = [
  { jour: "Lun–Mer", heures: "10h–17h" },
  { jour: "Jeu–Ven", heures: "10h–21h" },
  { jour: "Sam", heures: "10h–17h" },
  { jour: "Dim", heures: "9h–17h" },
];

interface VisitSectionProps {
  content: Record<string, string>;
  siteInfo: Record<string, string>;
}

export default function VisitSection({ content, siteInfo }: VisitSectionProps) {
  const heures = [
    { jour: "Lun–Mer", heures: siteInfo.heures_lundi ?? "10h–17h" },
    { jour: "Jeu–Ven", heures: siteInfo.heures_jeudi ?? "10h–21h" },
    { jour: "Sam", heures: siteInfo.heures_samedi ?? "10h–17h" },
    { jour: "Dim", heures: siteInfo.heures_dimanche ?? "9h–17h" },
  ];

  const adresse = encodeURIComponent(siteInfo.adresse ?? "347 Rue Duvernay, Beloeil, QC");
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${adresse}`;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <div>
            <div className="section-badge">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span>{content.visite_badge ?? "EN PERSONNE"}</span>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.95] mb-6">
              <span className="block">{content.visite_titre_ligne1 ?? "PASSE NOUS VOIR"}</span>
              <span className="block text-primary">{content.visite_titre_ligne2 ?? "À BELOEIL."}</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-md">
              {content.visite_description}
            </p>

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {/* Heures */}
              <div className="bg-dark text-white rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-secondary" />
                  <h3 className="font-heading font-bold uppercase text-sm">Heures</h3>
                </div>
                <dl className="space-y-1.5">
                  {heures.map(({ jour, heures: h }) => (
                    <div key={jour} className="flex justify-between text-sm">
                      <dt className="text-zinc-400">{jour}</dt>
                      <dd className="font-medium">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Contact */}
              <div className="bg-dark text-white rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Phone size={16} className="text-secondary" />
                  <h3 className="font-heading font-bold uppercase text-sm">Contact</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <a
                    href={`tel:${siteInfo.telephone}`}
                    className="flex items-start gap-2 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Phone size={14} className="flex-shrink-0 mt-0.5" />
                    {siteInfo.telephone}
                  </a>
                  <div className="flex items-start gap-2 text-zinc-400">
                    <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{siteInfo.adresse}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-6 py-3 flex items-center gap-2"
              >
                <MapPin size={14} />
                Itinéraire
              </a>
              <a
                href={`tel:${siteInfo.telephone}`}
                className="btn-outline border-dark text-dark text-sm px-6 py-3 flex items-center gap-2"
              >
                <Phone size={14} />
                Appeler la boutique
              </a>
            </div>
          </div>

          {/* Right — Map embed (sans clé API) */}
          <div className="rounded-2xl overflow-hidden h-96 lg:h-auto lg:min-h-[480px] relative bg-zinc-200">
            <iframe
              src={`https://maps.google.com/maps?q=${adresse}&z=15&output=embed`}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte — Le Roi Des Cartes, Beloeil"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
