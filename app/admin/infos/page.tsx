"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { defaultSiteInfo } from "@/lib/content";
import { Check, Loader2, Save } from "lucide-react";

const JOURS = [
  { key: "heures_lundi", label: "Lundi" },
  { key: "heures_mardi", label: "Mardi" },
  { key: "heures_mercredi", label: "Mercredi" },
  { key: "heures_jeudi", label: "Jeudi" },
  { key: "heures_vendredi", label: "Vendredi" },
  { key: "heures_samedi", label: "Samedi" },
  { key: "heures_dimanche", label: "Dimanche" },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminInfosPage() {
  const [info, setInfo] = useState<Record<string, string>>({ ...defaultSiteInfo });
  const [globalStatus, setGlobalStatus] = useState<SaveStatus>("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_info")
      .select("key, value")
      .then(({ data }) => {
        const map: Record<string, string> = { ...defaultSiteInfo };
        data?.forEach(({ key, value }) => {
          if (value) map[key] = value;
        });
        setInfo(map);
        setLoading(false);
      });
  }, []);

  const saveAll = async () => {
    setGlobalStatus("saving");
    const rows = Object.entries(info).map(([key, value]) => ({ key, value: value ?? "" }));
    const { error } = await supabase.from("site_info").upsert(rows, { onConflict: "key" });
    setGlobalStatus(error ? "error" : "saved");
    if (!error) setTimeout(() => setGlobalStatus("idle"), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const field = (key: string, label: string, type = "text", placeholder = "") => (
    <div key={key}>
      <label className="block text-sm text-zinc-300 font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={info[key] ?? ""}
        onChange={(e) => setInfo((prev) => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
        autoComplete="off"
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-black uppercase text-white">Mes informations</h1>
          <p className="text-zinc-500 text-sm mt-1">Coordonnées, heures d'ouverture, réseaux sociaux.</p>
        </div>
        <button
          onClick={saveAll}
          disabled={globalStatus === "saving"}
          className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
        >
          {globalStatus === "saving" ? (
            <><Loader2 size={15} className="animate-spin" /> Sauvegarde...</>
          ) : globalStatus === "saved" ? (
            <><Check size={15} /> Sauvegardé !</>
          ) : (
            <><Save size={15} /> Tout sauvegarder</>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Coordonnées */}
        <section className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">Coordonnées</h2>
          </div>
          <div className="p-6 space-y-4">
            {field("nom", "Nom de la boutique", "text", "Le Roi Des Cartes")}
            {field("adresse", "Adresse complète", "text", "347 Rue Duvernay, Beloeil, QC")}
            {field("telephone", "Téléphone", "tel", "(450) 000-0000")}
            {field("email", "Courriel", "email", "boutique@example.com")}
          </div>
        </section>

        {/* Heures */}
        <section className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">Heures d'ouverture</h2>
          </div>
          <div className="p-6 space-y-3">
            {JOURS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <span className="text-zinc-400 text-sm w-24 flex-shrink-0">{label}</span>
                <input
                  type="text"
                  value={info[key] ?? ""}
                  onChange={(e) => setInfo((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder="10h–17h ou Fermé"
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">Réseaux sociaux</h2>
          </div>
          <div className="p-6 space-y-4">
            {field("facebook", "Facebook (URL complète)", "url", "https://www.facebook.com/...")}
            {field("tiktok", "TikTok (URL complète)", "url", "https://www.tiktok.com/@...")}
            {field("ebay", "eBay Store (URL complète)", "url", "https://www.ebay.com/str/...")}
          </div>
        </section>
      </div>

      <div className="mt-6">
        {globalStatus === "error" && (
          <p className="text-sm text-red-400 text-center">Erreur lors de la sauvegarde. Réessayez.</p>
        )}
      </div>
    </div>
  );
}
