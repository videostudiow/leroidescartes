import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getSiteData } from "@/lib/get-site-data";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  locales,
  isLocale,
  getCurrency,
  CURRENCY_COOKIE,
  type Locale,
} from "@/lib/i18n/config";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://leroidescartes.ca";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : "fr";
  const isEn = locale === "en";
  return {
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_CA" : "fr_CA",
      url: `${SITE_URL}/${locale}`,
      siteName: "Le Roi Des Cartes",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const [{ siteInfo }, dict] = await Promise.all([
    getSiteData(),
    getDictionary(locale),
  ]);

  const currency = getCurrency(cookies().get(CURRENCY_COOKIE)?.value).code;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Le Roi Des Cartes",
    description:
      "Boutique familiale spécialisée en cartes de collection, jeux de cartes à collectionner et objets geek à Beloeil, Québec.",
    url: SITE_URL,
    telephone: siteInfo.telephone,
    email: siteInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "347 Rue Duvernay",
      addressLocality: "Beloeil",
      addressRegion: "QC",
      postalCode: "J3G",
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: 45.5651, longitude: -73.2121 },
    sameAs: [siteInfo.facebook, siteInfo.tiktok, siteInfo.ebay].filter(Boolean),
    priceRange: "$$",
    paymentAccepted: "Credit Card, Cash",
  };

  return (
    <LocaleProvider locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <CartProvider>
        <Header siteInfo={siteInfo} dict={dict} currency={currency} />
        <main>{children}</main>
        <Footer siteInfo={siteInfo} dict={dict} currency={currency} />
      </CartProvider>
    </LocaleProvider>
  );
}
