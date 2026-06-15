import "server-only";
import { cookies } from "next/headers";
import {
  getCurrency,
  shopifyLanguage,
  isLocale,
  defaultLocale,
  CURRENCY_COOKIE,
  type Locale,
} from "./i18n/config";

export type ShopContext = { language: string; country: string };

// Contexte Shopify @inContext : langue (depuis la locale d'URL si fournie,
// sinon cookie/défaut) + pays (depuis la devise choisie via cookie).
export function getShopContext(locale?: Locale): ShopContext {
  const c = cookies();
  const currency = getCurrency(c.get(CURRENCY_COOKIE)?.value);
  const effectiveLocale: Locale = locale ?? (isLocale(c.get("lrc_locale")?.value) ? (c.get("lrc_locale")!.value as Locale) : defaultLocale);
  return {
    language: shopifyLanguage(effectiveLocale),
    country: currency.country,
  };
}
