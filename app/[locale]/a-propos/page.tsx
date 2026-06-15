import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Heart, Star, Truck, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Le Roi Des Cartes — boutique familiale de cartes à collectionner à Beloeil, Rive-Sud de Montréal. Notre histoire, nos valeurs, notre passion.",
};

const ICONS: Record<string, React.ReactNode> = {
  "1": <Truck size={22} />,
  "2": <Lock size={22} />,
  "3": <Star size={22} />,
  "4": <Heart size={22} />,
};

const COPY = {
  fr: {
    titre: "Notre histoire",
    sousTitre: "Entreprise familiale depuis le début",
    statLabels: ["Cartes en stock", "Ouvert", "Abonnés infolettre", "Support / jour"],
    valeurs: [
      { titre: "Livraison gratuite", texte: "Sur toutes les commandes de 250 $ et plus au Canada" },
      { titre: "Paiements sécurisés", texte: "100 % sécurisé via Shopify" },
      { titre: "Support 12h/jour", texte: "Disponibles du matin au soir" },
      { titre: "Boutique familiale", texte: "Service personnalisé, passion authentique" },
    ],
  },
  en: {
    titre: "Our story",
    sousTitre: "A family business from the start",
    statLabels: ["Cards in stock", "Open", "Newsletter members", "Support / day"],
    valeurs: [
      { titre: "Free shipping", texte: "On all orders of $250 and more across Canada" },
      { titre: "Secure payments", texte: "100% secure through Shopify" },
      { titre: "12h/day support", texte: "Available from morning to evening" },
      { titre: "Family shop", texte: "Personalized service, genuine passion" },
    ],
  },
};

export default async function AProposPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "fr";
  const { content } = await getSiteData();
  const dict = await getDictionary(locale);
  const c = COPY[locale];

  // Texte narratif : FR depuis Supabase (éditable), EN = traduction statique.
  const story =
    locale === "en"
      ? "Le Roi Des Cartes was born from a passion for collectible cards. Our mission is to deliver first-class service, with passion and love. A family shop in Beloeil — we know our customers by their first name and their favorite deck."
      : content.apropos_texte;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary mb-4">
            <span>{dict.about.badge.toUpperCase()}</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            {c.titre}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-heading text-4xl font-black uppercase leading-tight mb-6">
              {c.sousTitre}
            </h2>
            <div className="prose prose-lg text-muted leading-relaxed space-y-4">
              <p>{story}</p>
            </div>
          </div>
          <div className="bg-dark text-white rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { valeur: "18k+", label: c.statLabels[0] },
                { valeur: "7 jrs/7", label: c.statLabels[1] },
                { valeur: "500+", label: c.statLabels[2] },
                { valeur: "12h", label: c.statLabels[3] },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-zinc-900 rounded-xl">
                  <p className="font-heading font-black text-4xl text-secondary">{stat.valeur}</p>
                  <p className="text-zinc-400 text-sm mt-1 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-4xl font-black uppercase text-center mb-10">
            {dict.about.valeurs}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.valeurs.map((v, i) => (
              <div
                key={v.titre}
                className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  {ICONS[String(i + 1)]}
                </div>
                <h3 className="font-heading font-bold text-lg uppercase mb-2">{v.titre}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
