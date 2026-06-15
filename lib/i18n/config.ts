// Configuration i18n — langues et devises (Shopify Markets)

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// Devises offertes par l'ancien site (Shopify Markets).
// `country` = code pays ISO passé à @inContext pour la conversion Shopify.
export type Currency = {
  code: string; // code devise ISO 4217
  symbol: string;
  country: string; // code pays pour @inContext(country:)
  label: string;
};

export const currencies: Currency[] = [
  { code: "CAD", symbol: "$", country: "CA", label: "CAD $" },
  { code: "USD", symbol: "$", country: "US", label: "USD $" },
  { code: "EUR", symbol: "€", country: "FR", label: "EUR €" },
  { code: "DKK", symbol: "kr", country: "DK", label: "DKK kr" },
  { code: "HUF", symbol: "Ft", country: "HU", label: "HUF Ft" },
  { code: "PLN", symbol: "zł", country: "PL", label: "PLN zł" },
  { code: "RON", symbol: "Lei", country: "RO", label: "RON Lei" },
  { code: "SEK", symbol: "kr", country: "SE", label: "SEK kr" },
  { code: "CZK", symbol: "Kč", country: "CZ", label: "CZK Kč" },
];

export const defaultCurrency = currencies[0]; // CAD

export const CURRENCY_COOKIE = "lrc_currency";
export const LOCALE_COOKIE = "lrc_locale";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function getCurrency(code: string | undefined): Currency {
  return currencies.find((c) => c.code === code) ?? defaultCurrency;
}

// Mappe une locale vers le code langue Shopify (@inContext(language:))
export function shopifyLanguage(locale: Locale): string {
  return locale === "en" ? "EN" : "FR";
}
