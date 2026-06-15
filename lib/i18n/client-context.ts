import { getCurrency, shopifyLanguage, CURRENCY_COOKIE, type Locale } from "./config";
import type { ShopContext } from "../shop-context";

// Contexte Shopify @inContext calculé côté client (cookie devise + locale URL).
export function clientShopContext(locale: Locale): ShopContext {
  let code: string | undefined;
  if (typeof document !== "undefined") {
    const m = document.cookie.match(new RegExp(`${CURRENCY_COOKIE}=([^;]+)`));
    code = m?.[1];
  }
  const currency = getCurrency(code);
  return { language: shopifyLanguage(locale), country: currency.country };
}
