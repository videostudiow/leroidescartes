import type { Metadata } from "next";
import { headers } from "next/headers";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/get-site-data";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

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
  const { colors } = await getSiteData();

  // langue lue depuis le header posé par le middleware (sinon défaut)
  const headerLocale = headers().get("x-locale");
  const lang = isLocale(headerLocale ?? undefined) ? headerLocale! : defaultLocale;

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

  return (
    <html
      lang={lang}
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/* <!-- COOKIEYES INSERT HERE --> */}
        {/* <!-- GA4 INSERT HERE --> */}
        {/* <!-- GSC VERIFICATION INSERT HERE --> */}
      </head>
      <body style={cssVars}>{children}</body>
    </html>
  );
}
