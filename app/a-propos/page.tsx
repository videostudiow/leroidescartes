import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
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

export default async function AProposPage() {
  const { content } = await getSiteData();

  const valeurs = [
    {
      id: "1",
      titre: content.apropos_valeur_1_titre ?? "Livraison gratuite",
      texte: content.apropos_valeur_1_texte ?? "Sur toutes les commandes de 250 $ et plus au Canada",
    },
    {
      id: "2",
      titre: content.apropos_valeur_2_titre ?? "Paiements sécurisés",
      texte: content.apropos_valeur_2_texte ?? "100 % sécurisé via Shopify",
    },
    {
      id: "3",
      titre: content.apropos_valeur_3_titre ?? "Support 12h/jour",
      texte: content.apropos_valeur_3_texte ?? "Disponibles du matin au soir",
    },
    {
      id: "4",
      titre: content.apropos_valeur_4_titre ?? "Boutique familiale",
      texte: content.apropos_valeur_4_texte ?? "Service personnalisé, passion authentique",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary mb-4">
            <span>NOTRE HISTOIRE</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9]">
            {content.apropos_titre ?? "NOTRE HISTOIRE"}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-heading text-4xl font-black uppercase leading-tight mb-6">
              {content.apropos_sous_titre ?? "Entreprise familiale depuis le début"}
            </h2>
            <div className="prose prose-lg text-muted leading-relaxed space-y-4">
              <p>{content.apropos_texte}</p>
            </div>
          </div>
          <div className="bg-dark text-white rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { valeur: "18k+", label: "Cartes en stock" },
                { valeur: "7 jrs/7", label: "Ouvert" },
                { valeur: "500+", label: "Abonnés infolettre" },
                { valeur: "12h", label: "Support / jour" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-zinc-900 rounded-xl">
                  <p className="font-heading font-black text-4xl text-secondary">{stat.valeur}</p>
                  <p className="text-zinc-400 text-sm mt-1 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div>
          <h2 className="font-heading text-4xl font-black uppercase text-center mb-10">
            NOS VALEURS
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  {ICONS[v.id]}
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
