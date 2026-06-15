import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez Le Roi Des Cartes à Beloeil — formulaire de contact, téléphone, adresse. Évaluations de cartes, commandes spéciales, soirées de jeu.",
};

export default async function ContactPage() {
  const { content, siteInfo } = await getSiteData();

  const heures = [
    { jour: "Lun–Mer", heures: siteInfo.heures_lundi ?? "10h–17h" },
    { jour: "Jeu–Ven", heures: siteInfo.heures_jeudi ?? "10h–21h" },
    { jour: "Sam", heures: siteInfo.heures_samedi ?? "10h–17h" },
    { jour: "Dim", heures: siteInfo.heures_dimanche ?? "9h–17h" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary mb-4">
            <span>RESTONS EN CONTACT</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            {content.contact_titre ?? "CONTACTEZ-NOUS"}
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl">
            {content.contact_description ?? "Question sur un produit, évaluation de carte, événement — on est là."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-heading text-3xl font-black uppercase mb-6">Envoyer un message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-dark text-white rounded-2xl p-6">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                Heures d&apos;ouverture
              </h3>
              <dl className="space-y-2">
                {heures.map(({ jour, heures: h }) => (
                  <div key={jour} className="flex justify-between text-sm">
                    <dt className="text-zinc-400">{jour}</dt>
                    <dd className="font-medium">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border space-y-4">
              <h3 className="font-heading font-bold text-xl uppercase mb-2">Coordonnées</h3>
              <a
                href={`tel:${siteInfo.telephone}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </div>
                <span>{siteInfo.telephone}</span>
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <span className="break-all">{siteInfo.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted">
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <span>{siteInfo.adresse}</span>
              </div>
              {siteInfo.facebook && (
                <a
                  href={siteInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Facebook size={16} />
                  </div>
                  <span>Facebook</span>
                </a>
              )}
            </div>

            <div className="bg-secondary text-dark rounded-2xl p-6">
              <p className="font-heading font-bold text-lg uppercase mb-1">On répond vite !</p>
              <p className="text-sm">La plupart du temps en moins de 24h. Pour les urgences, appelez directement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
