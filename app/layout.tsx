import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/get-site-data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/components/cart/CartProvider";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display-next",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-next",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-next",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Le Roi Des Cartes — Cartes de collection & Accessoires | Beloeil",
    template: "%s | Le Roi Des Cartes",
  },
  description:
    "Boutique familiale de cartes de collection à Beloeil, Rive-Sud de Montréal. Pokémon, Magic, NHL, Riftbound, Funko Pop. Livraison gratuite 250 $+. Soirées de jeu chaque semaine.",
  keywords: [
    "cartes de collection",
    "Pokémon",
    "Magic The Gathering",
    "NHL",
    "Riftbound",
    "Funko Pop",
    "Beloeil",
    "Rive-Sud",
    "boutique gaming",
    "Yu-Gi-Oh",
  ],
  authors: [{ name: "Le Roi Des Cartes" }],
  creator: "Studio W",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "https://leroidescartes.ca",
    siteName: "Le Roi Des Cartes",
    title: "Le Roi Des Cartes — Repaire des collectionneurs de la Rive-Sud",
    description:
      "Pokémon, Magic, NHL, Riftbound, Funko Pop. Boutique familiale à Beloeil. Livraison gratuite 250 $+.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Le Roi Des Cartes — Boutique de cartes de collection à Beloeil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Roi Des Cartes",
    description: "Boutique familiale de cartes de collection à Beloeil, Rive-Sud.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  metadataBase: new URL("https://leroidescartes.ca"),
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteInfo, colors } = await getSiteData();

  const cssVars = {
    "--color-background": colors.background,
    "--color-text": colors.text,
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-accent": colors.accent,
    "--color-dark": colors.dark,
    "--color-muted": colors.muted,
    "--color-border": colors.border,
  } as React.CSSProperties;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Le Roi Des Cartes",
    description:
      "Boutique familiale spécialisée en cartes de collection, jeux de cartes à collectionner et objets géek à Beloeil, Québec.",
    url: "https://leroidescartes.ca",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5544,
      longitude: -73.2049,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Thursday", "Friday"], opens: "10:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "09:00", closes: "17:00" },
    ],
    sameAs: [
      siteInfo.facebook,
      siteInfo.tiktok,
      siteInfo.ebay,
    ].filter(Boolean),
    priceRange: "$$",
    currenciesAccepted: "CAD",
    paymentAccepted: "Credit Card, Cash",
  };

  return (
    <html lang="fr" className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* <!-- COOKIEYES INSERT HERE --> */}
        {/* <!-- GA4 INSERT HERE --> */}
        {/* <!-- GSC VERIFICATION INSERT HERE --> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body style={cssVars}>
        <CartProvider>
          <Header siteInfo={siteInfo} />
          <main>{children}</main>
          <Footer siteInfo={siteInfo} />
        </CartProvider>
      </body>
    </html>
  );
}
