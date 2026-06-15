import { locales, defaultLocale, type Locale } from "./config";

// Préfixe un href interne avec la locale. Idempotent.
// Laisse intacts : liens externes, mailto/tel, ancres.
export function localizeHref(href: string, locale: Locale): string {
  if (
    !href ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }
  if (!href.startsWith("/")) return href;

  const seg = href.split("/")[1];
  if (locales.includes(seg as Locale)) return href; // déjà préfixé

  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

// Retire le préfixe de locale d'un pathname → chemin "nu".
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (locales.includes(seg as Locale)) {
    const rest = pathname.slice(seg.length + 1);
    return rest || "/";
  }
  return pathname;
}

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale;
}
