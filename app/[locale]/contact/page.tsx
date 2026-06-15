import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description:
    "Contactez Le Roi Des Cartes à Beloeil — formulaire de contact, téléphone, adresse. Évaluations de cartes, commandes spéciales, soirées de jeu.",
};

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.9015358427177!2d-73.21211342323777!3d45.56518007107575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9abb53da6edcb%3A0x3a23a060baedbe28!2sLe%20Roi%20des%20Cartes%20-%20Hockey%2C%20TCG%20%26%20Accessoires!5e1!3m2!1sfr!2sca!4v1781485705340!5m2!1sfr!2sca";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "fr";
  const { siteInfo } = await getSiteData();
  const dict = await getDictionary(locale);
  const c = dict.contact;

  const heures = [
    { jour: c.jours.lunMer, heures: siteInfo.heures_lundi ?? "10h–17h" },
    { jour: c.jours.jeuVen, heures: siteInfo.heures_jeudi ?? "10h–21h" },
    { jour: c.jours.sam, heures: siteInfo.heures_samedi ?? "10h–17h" },
    { jour: c.jours.dim, heures: siteInfo.heures_dimanche ?? "9h–17h" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary mb-4">
            <span>{c.badge.toUpperCase()}</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            {c.titre}
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl">{c.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-3xl font-black uppercase mb-6">{c.envoyer}</h2>
            <ContactForm dict={dict} />
          </div>

          <div className="space-y-6">
            <div className="bg-dark text-white rounded-2xl p-6">
              <h3 className="font-heading font-bold text-xl uppercase mb-4 flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                {c.heures}
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
              <h3 className="font-heading font-bold text-xl uppercase mb-2">{c.coordonnees}</h3>
              <a href={`tel:${siteInfo.telephone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </div>
                <span>{siteInfo.telephone}</span>
              </a>
              <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
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
                <a href={siteInfo.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Facebook size={16} />
                  </div>
                  <span>Facebook</span>
                </a>
              )}
            </div>

            {/* Carte Google */}
            <div className="relative rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                title="Le Roi des Cartes - Beloeil"
                src={MAP_EMBED}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="bg-secondary text-dark rounded-2xl p-6">
              <p className="font-heading font-bold text-lg uppercase mb-1">{c.repondVite}</p>
              <p className="text-sm">{c.repondViteDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
