import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Le Roi Des Cartes, conforme à la Loi 25 du Québec.",
  robots: { index: false },
};

export default async function PolitiqueConfidentialitePage() {
  const { siteInfo } = await getSiteData();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl font-black uppercase">
            Politique de confidentialité
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-8">
          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">1. Responsable du traitement</h2>
            <p>
              <strong className="text-dark">Le Roi Des Cartes</strong><br />
              {siteInfo.adresse ?? "347 Rue Duvernay, Beloeil, QC"}<br />
              Téléphone : {siteInfo.telephone ?? "(450) 281-0625"}<br />
              Courriel : {siteInfo.email ?? "dsm.sportscards@gmail.com"}
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong className="text-dark">Formulaire de contact :</strong> nom, adresse courriel, numéro de téléphone (optionnel), message.</li>
              <li><strong className="text-dark">Commandes en ligne :</strong> données de facturation et livraison traitées par Shopify.</li>
              <li><strong className="text-dark">Données de navigation :</strong> adresse IP, pages visitées, durée de session (via Google Analytics 4, avec consentement).</li>
              <li><strong className="text-dark">Infolettre :</strong> adresse courriel (si inscription volontaire).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">3. Finalités du traitement</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Répondre à vos demandes via le formulaire de contact.</li>
              <li>Traiter et livrer vos commandes en ligne.</li>
              <li>Analyser l'utilisation du site pour l'améliorer (avec votre consentement).</li>
              <li>Vous envoyer notre infolettre si vous y avez souscrit.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">4. Cookies et technologies similaires</h2>
            <p>
              Notre site utilise des témoins (cookies) pour améliorer votre expérience. Vous pouvez gérer vos préférences via le panneau de gestion des cookies présent sur ce site. Les cookies analytiques (Google Analytics) ne sont activés qu'après votre consentement explicite.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">5. Conservation des données</h2>
            <p>
              Les messages de contact sont conservés 2 ans. Les données de commandes sont conservées 7 ans conformément aux obligations comptables. Les données analytiques sont conservées 14 mois dans Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">6. Partage des données</h2>
            <p>Vos données ne sont jamais vendues. Elles peuvent être partagées avec :</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong className="text-dark">Shopify :</strong> traitement des paiements et des commandes.</li>
              <li><strong className="text-dark">Google Analytics :</strong> analyse de trafic anonymisée (avec consentement).</li>
              <li><strong className="text-dark">Supabase :</strong> stockage sécurisé des messages de contact.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">7. Vos droits (Loi 25 — Québec)</h2>
            <p>Conformément à la Loi 25 du Québec, vous avez le droit de :</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Accéder à vos renseignements personnels.</li>
              <li>Corriger vos renseignements personnels.</li>
              <li>Retirer votre consentement au traitement.</li>
              <li>Demander la suppression de vos renseignements personnels.</li>
              <li>Déposer une plainte auprès de la Commission d'accès à l'information du Québec.</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href={`mailto:${siteInfo.email}`} className="text-primary underline">
                {siteInfo.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">8. Sécurité</h2>
            <p>
              Nous prenons des mesures raisonnables pour protéger vos renseignements personnels contre la perte, le vol et tout accès non autorisé. Nos serveurs utilisent le chiffrement HTTPS et nos bases de données sont sécurisées selon les standards de l'industrie.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">9. Contact</h2>
            <p>
              Pour toute question relative à cette politique ou à l'exercice de vos droits, contactez notre responsable de la protection des renseignements personnels :{" "}
              <a href={`mailto:${siteInfo.email}`} className="text-primary underline">
                {siteInfo.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
