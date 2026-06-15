import "server-only";
import { createSupabaseServerClient } from "./supabase-server";
import { defaultColors, defaultContent, defaultSiteInfo } from "./content";
import type { SiteData } from "./types";

const mergeRows = (
  defaults: Record<string, string>,
  rows: Array<{ key: string; value: string }> | null
): Record<string, string> => {
  const result = { ...defaults };
  if (rows) {
    rows.forEach(({ key, value }) => {
      if (value !== null && value !== "") result[key] = value;
    });
  }
  return result;
};

export async function getSiteData(): Promise<SiteData> {
  try {
    const supabase = createSupabaseServerClient();

    const [contentRes, infoRes, colorsRes] = await Promise.all([
      supabase.from("site_content").select("key, value"),
      supabase.from("site_info").select("key, value"),
      supabase.from("site_colors").select("key, value"),
    ]);

    return {
      content: mergeRows(defaultContent, contentRes.data),
      siteInfo: mergeRows(defaultSiteInfo, infoRes.data),
      colors: mergeRows(defaultColors, colorsRes.data),
    };
  } catch {
    // Supabase non configuré — retourner les valeurs par défaut
    return {
      content: { ...defaultContent },
      siteInfo: { ...defaultSiteInfo },
      colors: { ...defaultColors },
    };
  }
}
