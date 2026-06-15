import fr from "./fr";
import en from "./en";
import type { Locale } from "../config";

export const dictionaries = { fr, en };

// Getter synchrone utilisable côté client (les deux dictionnaires sont bundlés).
export function dictFor(locale: Locale) {
  return dictionaries[locale] ?? fr;
}
