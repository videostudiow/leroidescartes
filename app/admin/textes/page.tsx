"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { defaultContent } from "@/lib/content";
import { Check, Loader2, Save } from "lucide-react";

const SECTIONS_LABELS: Record<string, { label: string; section: string }> = {
  hero_badge: { label: "Badge accroche", section: "Accueil — Héros" },
  hero_titre_ligne1: { label: "Titre ligne 1", section: "Accueil — Héros" },
  hero_titre_ligne2: { label: "Titre ligne 2 (fond rouge)", section: "Accueil — Héros" },
  hero_titre_ligne3: { label: "Titre ligne 3", section: "Accueil — Héros" },
  hero_description: { label: "Description", section: "Accueil — Héros" },
  hero_cta_principal: { label: "Bouton principal", section: "Accueil — Héros" },
  hero_cta_secondaire: { label: "Bouton secondaire", section: "Accueil — Héros" },
  hero_stat_1_valeur: { label: "Stat 1 — valeur", section: "Accueil — Héros" },
  hero_stat_1_label: { label: "Stat 1 — label", section: "Accueil — Héros" },
  hero_stat_2_valeur: { label: "Stat 2 — valeur", section: "Accueil — Héros" },
  hero_stat_2_label: { label: "Stat 2 — label", section: "Accueil — Héros" },
  hero_stat_3_valeur: { label: "Stat 3 — valeur", section: "Accueil — Héros" },
  hero_stat_3_label: { label: "Stat 3 — label", section: "Accueil — Héros" },
  categories_titre: { label: "Titre section catégories", section: "Accueil — Catégories" },
  evenements_badge: { label: "Badge", section: "Accueil — Événements" },
  evenements_titre_ligne1: { label: "Titre ligne 1", section: "Accueil — Événements" },
  evenements_titre_ligne2: { label: "Titre ligne 2", section: "Accueil — Événements" },
  evenements_description: { label: "Description", section: "Accueil — Événements" },
  evenements_cta: { label: "Bouton", section: "Accueil — Événements" },
  breakouts_badge: { label: "Badge", section: "Accueil — Breakouts" },
  breakouts_titre: { label: "Titre", section: "Accueil — Breakouts" },
  breakouts_description: { label: "Description", section: "Accueil — Breakouts" },
  breakouts_cta_principal: { label: "Bouton principal", section: "Accueil — Breakouts" },
  breakouts_cta_secondaire: { label: "Bouton secondaire", section: "Accueil — Breakouts" },
  visite_badge: { label: "Badge", section: "Accueil — Visite" },
  visite_titre_ligne1: { label: "Titre ligne 1", section: "Accueil — Visite" },
  visite_titre_ligne2: { label: "Titre ligne 2", section: "Accueil — Visite" },
  visite_description: { label: "Description", section: "Accueil — Visite" },
  apropos_titre: { label: "Titre de la page", section: "Page À propos" },
  apropos_sous_titre: { label: "Sous-titre", section: "Page À propos" },
  apropos_texte: { label: "Texte principal", section: "Page À propos" },
  contact_titre: { label: "Titre de la page", section: "Page Contact" },
  contact_description: { label: "Description", section: "Page Contact" },
  footer_description: { label: "Description du pied de page", section: "Pied de page" },
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminTextesPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, SaveStatus>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, value")
      .then(({ data }) => {
        const map: Record<string, string> = { ...defaultContent };
        data?.forEach(({ key, value }) => {
          if (value) map[key] = value;
        });
        setValues(map);
        setLoading(false);
      });
  }, []);

  const save = useCallback(async (key: string) => {
    setStatuses((prev) => ({ ...prev, [key]: "saving" }));
    const { error } = await supabase.from("site_content").upsert(
      { key, value: values[key] ?? "" },
      { onConflict: "key" }
    );
    setStatuses((prev) => ({
      ...prev,
      [key]: error ? "error" : "saved",
    }));
    if (!error) {
      setTimeout(() => setStatuses((prev) => ({ ...prev, [key]: "idle" })), 2000);
    }
  }, [values]);

  const sectionGroups = Object.entries(SECTIONS_LABELS).reduce<
    Record<string, Array<{ key: string; label: string }>>
  >((acc, [key, { label, section }]) => {
    if (!acc[section]) acc[section] = [];
    acc[section].push({ key, label });
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl font-black uppercase text-white mb-2">Mes textes</h1>
      <p className="text-zinc-500 text-sm mb-8">Modifiez les textes affichés sur le site. Chaque champ se sauvegarde individuellement.</p>

      <div className="space-y-8">
        {Object.entries(sectionGroups).map(([section, fields]) => (
          <section key={section} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">
                {section}
              </h2>
            </div>
            <div className="p-6 space-y-5">
              {fields.map(({ key, label }) => {
                const isLong = (values[key] ?? "").length > 80 || key.includes("texte") || key.includes("description");
                const status = statuses[key] ?? "idle";

                return (
                  <div key={key}>
                    <label className="block text-sm text-zinc-300 font-medium mb-1.5">
                      {label}
                    </label>
                    <div className="flex gap-2">
                      {isLong ? (
                        <textarea
                          value={values[key] ?? ""}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          rows={3}
                          className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[key] ?? ""}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      )}
                      <button
                        onClick={() => save(key)}
                        disabled={status === "saving"}
                        className={`px-3 py-2 rounded-lg transition-colors flex-shrink-0 ${
                          status === "saved"
                            ? "bg-accent/20 text-accent"
                            : status === "error"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-primary/20 text-primary hover:bg-primary hover:text-white"
                        }`}
                        aria-label="Sauvegarder"
                        title="Sauvegarder"
                      >
                        {status === "saving" ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : status === "saved" ? (
                          <Check size={16} />
                        ) : (
                          <Save size={16} />
                        )}
                      </button>
                    </div>
                    {status === "error" && (
                      <p className="text-xs text-red-400 mt-1">Erreur — réessayez.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
