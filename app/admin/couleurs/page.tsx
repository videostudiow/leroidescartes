"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { defaultColors } from "@/lib/content";
import { Check, Loader2, Save } from "lucide-react";

const COLOR_LABELS: Record<string, string> = {
  background: "Arrière-plan (fond crème)",
  text: "Couleur du texte principal",
  primary: "Couleur principale (rouge boutons, accents)",
  secondary: "Couleur secondaire (jaune, CTA)",
  accent: "Couleur accent (vert, badges LIVE)",
  dark: "Couleur sombre (sections noires)",
  muted: "Couleur atténuée (textes secondaires)",
  border: "Couleur des bordures",
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminCouleursPage() {
  const [colors, setColors] = useState<Record<string, string>>({ ...defaultColors });
  const [statuses, setStatuses] = useState<Record<string, SaveStatus>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_colors")
      .select("key, value")
      .then(({ data }) => {
        const map: Record<string, string> = { ...defaultColors };
        data?.forEach(({ key, value }) => {
          if (value) map[key] = value;
        });
        setColors(map);
        setLoading(false);
      });
  }, []);

  const save = useCallback(
    async (key: string) => {
      setStatuses((prev) => ({ ...prev, [key]: "saving" }));
      const { error } = await supabase.from("site_colors").upsert(
        { key, value: colors[key], label: COLOR_LABELS[key] ?? key },
        { onConflict: "key" }
      );
      setStatuses((prev) => ({ ...prev, [key]: error ? "error" : "saved" }));
      if (!error) {
        setTimeout(() => setStatuses((prev) => ({ ...prev, [key]: "idle" })), 2000);
      }
    },
    [colors]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-black uppercase text-white mb-2">Mes couleurs</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Modifiez les couleurs du site. Utilisez des codes hexadécimaux (#RRGGBB).
        Les changements s'appliquent en temps réel sur le site.
      </p>

      {/* Preview */}
      <div
        className="rounded-xl p-6 mb-8 border border-zinc-700"
        style={{ backgroundColor: colors.background }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.muted }}>
          Aperçu du design system
        </p>
        <div className="flex flex-wrap gap-3">
          {Object.entries(COLOR_LABELS).map(([key, label]) => (
            <div key={key} className="text-center">
              <div
                className="w-10 h-10 rounded-lg border border-white/20 mb-1 mx-auto"
                style={{ backgroundColor: colors[key] }}
              />
              <p className="text-[10px]" style={{ color: colors.text }}>
                {key}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color fields */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">
            Palette de couleurs
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(COLOR_LABELS).map(([key, label]) => {
            const status = statuses[key] ?? "idle";
            return (
              <div key={key} className="flex items-center gap-3">
                {/* Color picker */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-lg border-2 border-zinc-700 cursor-pointer overflow-hidden"
                    style={{ backgroundColor: colors[key] }}
                  >
                    <input
                      type="color"
                      value={colors[key] ?? "#000000"}
                      onChange={(e) =>
                        setColors((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      aria-label={`Couleur ${label}`}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block text-sm text-zinc-300 font-medium mb-1 truncate">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={colors[key] ?? ""}
                    onChange={(e) =>
                      setColors((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    placeholder="#000000"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-primary transition-colors"
                    maxLength={7}
                  />
                </div>

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
            );
          })}
        </div>
      </div>
    </div>
  );
}
