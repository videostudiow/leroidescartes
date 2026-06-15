import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Le Roi Des Cartes, conforme à la Loi 25 du Québec.",
  robots: { index: false },
};

type Section = { h: string; p?: string; intro?: string; list?: string[]; after?: string };

const CONTENT: Record<Locale, { titre: string; maj: string; sections: Section[] }> = {
  fr: {
    titre: "Politique de confidentialité",
    maj: "Dernière mise à jour",
    sections: [
      { h: "1. Responsable du traitement", p: "__IDENT__" },
      { h: "2. Données collectées", intro: "Nous collectons les données suivantes :", list: [
        "Formulaire de contact : nom, adresse courriel, numéro de téléphone (optionnel), message.",
        "Commandes en ligne : données de facturation et livraison traitées par Shopify.",
        "Données de navigation : adresse IP, pages visitées, durée de session (via Google Analytics 4, avec consentement).",
        "Infolettre : adresse courriel (si inscription volontaire).",
      ]},
      { h: "3. Finalités du traitement", list: [
        "Répondre à vos demandes via le formulaire de contact.",
        "Traiter et livrer vos commandes en ligne.",
        "Analyser l'utilisation du site pour l'améliorer (avec votre consentement).",
        "Vous envoyer notre infolettre si vous y avez souscrit.",
      ]},
      { h: "4. Cookies et technologies similaires", p: "Notre site utilise des témoins (cookies) pour améliorer votre expérience. Vous pouvez gérer vos préférences via le panneau de gestion des cookies présent sur ce site. Les cookies analytiques (Google Analytics) ne sont activés qu'après votre consentement explicite." },
      { h: "5. Conservation des données", p: "Les messages de contact sont conservés 2 ans. Les données de commandes sont conservées 7 ans conformément aux obligations comptables. Les données analytiques sont conservées 14 mois dans Google Analytics." },
      { h: "6. Partage des données", intro: "Vos données ne sont jamais vendues. Elles peuvent être partagées avec :", list: [
        "Shopify : traitement des paiements et des commandes.",
        "Google Analytics : analyse de trafic anonymisée (avec consentement).",
        "Supabase : stockage sécurisé des messages de contact.",
      ]},
      { h: "7. Vos droits (Loi 25 — Québec)", intro: "Conformément à la Loi 25 du Québec, vous avez le droit de :", list: [
        "Accéder à vos renseignements personnels.",
        "Corriger vos renseignements personnels.",
        "Retirer votre consentement au traitement.",
        "Demander la suppression de vos renseignements personnels.",
        "Déposer une plainte auprès de la Commission d'accès à l'information du Québec.",
      ], after: "Pour exercer ces droits, contactez-nous à :" },
      { h: "8. Sécurité", p: "Nous prenons des mesures raisonnables pour protéger vos renseignements personnels contre la perte, le vol et tout accès non autorisé. Nos serveurs utilisent le chiffrement HTTPS et nos bases de données sont sécurisées selon les standards de l'industrie." },
      { h: "9. Contact", p: "Pour toute question relative à cette politique ou à l'exercice de vos droits, contactez-nous à :__EMAIL__" },
    ],
  },
  en: {
    titre: "Privacy Policy",
    maj: "Last updated",
    sections: [
      { h: "1. Data controller", p: "__IDENT__" },
      { h: "2. Data collected", intro: "We collect the following data:", list: [
        "Contact form: name, email address, phone number (optional), message.",
        "Online orders: billing and shipping data processed by Shopify.",
        "Browsing data: IP address, pages visited, session duration (via Google Analytics 4, with consent).",
        "Newsletter: email address (if you subscribe voluntarily).",
      ]},
      { h: "3. Purposes of processing", list: [
        "Respond to your requests via the contact form.",
        "Process and deliver your online orders.",
        "Analyze site usage to improve it (with your consent).",
        "Send you our newsletter if you subscribed.",
      ]},
      { h: "4. Cookies and similar technologies", p: "Our site uses cookies to improve your experience. You can manage your preferences via the cookie management panel on this site. Analytics cookies (Google Analytics) are only enabled after your explicit consent." },
      { h: "5. Data retention", p: "Contact messages are kept for 2 years. Order data is kept for 7 years in accordance with accounting obligations. Analytics data is kept for 14 months in Google Analytics." },
      { h: "6. Data sharing", intro: "Your data is never sold. It may be shared with:", list: [
        "Shopify: payment and order processing.",
        "Google Analytics: anonymized traffic analysis (with consent).",
        "Supabase: secure storage of contact messages.",
      ]},
      { h: "7. Your rights (Quebec Law 25)", intro: "In accordance with Quebec's Law 25, you have the right to:", list: [
        "Access your personal information.",
        "Correct your personal information.",
        "Withdraw your consent to processing.",
        "Request deletion of your personal information.",
        "File a complaint with the Commission d'accès à l'information du Québec.",
      ], after: "To exercise these rights, contact us at:" },
      { h: "8. Security", p: "We take reasonable measures to protect your personal information against loss, theft and unauthorized access. Our servers use HTTPS encryption and our databases are secured to industry standards." },
      { h: "9. Contact", p: "For any question about this policy or to exercise your rights, contact us at:__EMAIL__" },
    ],
  },
};

export default async function PolitiqueConfidentialitePage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "fr";
  const { siteInfo } = await getSiteData();
  const data = CONTENT[locale];

  const ident = (
    <>
      <strong className="text-dark">Le Roi Des Cartes</strong><br />
      {siteInfo.adresse ?? "347 Rue Duvernay, Beloeil, QC"}<br />
      {locale === "en" ? "Phone" : "Téléphone"} : {siteInfo.telephone ?? "(450) 281-0625"}<br />
      {locale === "en" ? "Email" : "Courriel"} : {siteInfo.email ?? "dsm.sportscards@gmail.com"}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-dark text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl font-black uppercase">{data.titre}</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            {data.maj} : {new Date().toLocaleDateString(locale === "en" ? "en-CA" : "fr-CA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-8">
          {data.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-heading font-bold text-2xl uppercase text-dark mb-3">{s.h}</h2>
              {s.p === "__IDENT__" ? (
                <p>{ident}</p>
              ) : s.p ? (
                <p>
                  {s.p.replace("__EMAIL__", "")}
                  {s.p.includes("__EMAIL__") && (
                    <>{" "}<a href={`mailto:${siteInfo.email}`} className="text-primary underline">{siteInfo.email}</a></>
                  )}
                </p>
              ) : null}
              {s.intro && <p>{s.intro}</p>}
              {s.list && (
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              {s.after && (
                <p className="mt-3">
                  {s.after}{" "}
                  <a href={`mailto:${siteInfo.email}`} className="text-primary underline">{siteInfo.email}</a>
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
