"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Upload, Loader2, Check, AlertCircle, ImageIcon, Link2 } from "lucide-react";

interface ImageField {
  key: string;
  label: string;
  description: string;
  group: string;
}

const FIELDS: ImageField[] = [
  { key: "logo_url", label: "Logo", description: "Logo affiché dans le header et le footer (PNG transparent).", group: "Identité" },
  { key: "hero_image_url", label: "Photo héros (optionnelle)", description: "Image d'arrière-plan de la section principale.", group: "Identité" },

  { key: "home_img_hero_1", label: "Accueil — Carte héros 1", description: "Carte de gauche dans l'empilement de la bannière d'accueil.", group: "Accueil — Bannière" },
  { key: "home_img_hero_2", label: "Accueil — Carte héros 2", description: "Carte de droite dans l'empilement.", group: "Accueil — Bannière" },
  { key: "home_img_hero_3", label: "Accueil — Carte héros 3", description: "Carte du bas dans l'empilement.", group: "Accueil — Bannière" },

  { key: "home_img_cat_sports", label: "Catégorie — Sports", description: "Vignette de la carte Sports.", group: "Accueil — Catégories" },
  { key: "home_img_cat_jeux", label: "Catégorie — Jeux (TCG)", description: "Vignette de la carte Jeux.", group: "Accueil — Catégories" },
  { key: "home_img_cat_anime", label: "Catégorie — Anime", description: "Vignette de la carte Anime.", group: "Accueil — Catégories" },
  { key: "home_img_cat_vetements", label: "Catégorie — Vêtements", description: "Vignette de la carte Vêtements.", group: "Accueil — Catégories" },
  { key: "home_img_cat_accessoires", label: "Catégorie — Accessoires", description: "Vignette de la carte Accessoires.", group: "Accueil — Catégories" },
  { key: "home_img_cat_consommables", label: "Catégorie — Consommables", description: "Vignette de la carte Consommables.", group: "Accueil — Catégories" },

  { key: "home_img_break", label: "Accueil — Bannière Breakouts", description: "Photo de la section Breakouts du jeudi soir.", group: "Accueil — Breakouts" },
];

export default function AdminImagesPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, value")
      .in("key", FIELDS.map((f) => f.key))
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach(({ key, value }) => { map[key] = value ?? ""; });
        setUrls(map);
        setDrafts(map);
        setLoading(false);
      });
  }, []);

  const flashSuccess = (key: string) => {
    setSuccess((p) => ({ ...p, [key]: true }));
    setTimeout(() => setSuccess((p) => ({ ...p, [key]: false })), 3000);
  };

  const saveUrl = async (key: string) => {
    const value = (drafts[key] ?? "").trim();
    setSaving((p) => ({ ...p, [key]: true }));
    setErrors((p) => ({ ...p, [key]: "" }));
    const { error } = await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
    setSaving((p) => ({ ...p, [key]: false }));
    if (error) {
      setErrors((p) => ({ ...p, [key]: error.message }));
    } else {
      setUrls((p) => ({ ...p, [key]: value }));
      flashSuccess(key);
    }
  };

  const handleUpload = async (key: string, file: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrors((p) => ({ ...p, [key]: "Fichier trop grand (max 10 Mo)." }));
      return;
    }
    setUploading((p) => ({ ...p, [key]: true }));
    setErrors((p) => ({ ...p, [key]: "" }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", key);

    try {
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur upload");
      setUrls((p) => ({ ...p, [key]: data.url }));
      setDrafts((p) => ({ ...p, [key]: data.url }));
      flashSuccess(key);
    } catch (err) {
      setErrors((p) => ({ ...p, [key]: err instanceof Error ? err.message : "Erreur inconnue" }));
    } finally {
      setUploading((p) => ({ ...p, [key]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const groups = Array.from(new Set(FIELDS.map((f) => f.group)));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl font-black uppercase text-white mb-2">Mes images</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Modifiez chaque image en collant une adresse (URL) ou en téléversant un fichier (JPG, PNG, WebP, SVG — max 10 Mo).
      </p>

      {groups.map((group) => (
        <div key={group} className="mb-10">
          <h2 className="font-heading font-bold text-xs uppercase text-primary tracking-widest mb-4">{group}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FIELDS.filter((f) => f.group === group).map((field) => {
              const url = urls[field.key] ?? "";
              return (
                <div key={field.key} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col">
                  <div className="px-5 py-3 border-b border-zinc-800">
                    <h3 className="font-heading font-bold text-sm uppercase text-zinc-300">{field.label}</h3>
                    <p className="text-zinc-600 text-xs mt-0.5">{field.description}</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    {url ? (
                      <div className="relative h-32 rounded-xl overflow-hidden bg-zinc-800 mb-3">
                        <Image src={url} alt={field.label} fill className="object-contain" sizes="320px" unoptimized />
                      </div>
                    ) : (
                      <div className="h-32 rounded-xl bg-zinc-800 flex items-center justify-center mb-3 border-2 border-dashed border-zinc-700">
                        <ImageIcon size={28} className="text-zinc-600" />
                      </div>
                    )}

                    {/* URL */}
                    <div className="flex gap-2 mb-2">
                      <div className="relative flex-1">
                        <Link2 size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="url"
                          value={drafts[field.key] ?? ""}
                          onChange={(e) => setDrafts((p) => ({ ...p, [field.key]: e.target.value }))}
                          placeholder="https://…"
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg pl-7 pr-2 py-2 text-xs text-zinc-200 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        onClick={() => saveUrl(field.key)}
                        disabled={saving[field.key] || (drafts[field.key] ?? "") === url}
                        className="shrink-0 bg-primary text-white rounded-lg px-3 text-xs font-bold disabled:opacity-40"
                      >
                        {saving[field.key] ? <Loader2 size={13} className="animate-spin" /> : "OK"}
                      </button>
                    </div>

                    {/* Upload */}
                    <label className={`block text-center border-2 border-dashed rounded-lg py-2 px-3 cursor-pointer text-xs transition-colors ${
                      uploading[field.key] ? "border-primary/50 text-primary/50" : "border-zinc-700 hover:border-primary text-zinc-400 hover:text-primary"
                    }`}>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                        className="hidden"
                        disabled={uploading[field.key]}
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(field.key, f); e.target.value = ""; }}
                      />
                      <span className="flex items-center justify-center gap-2 font-medium">
                        {uploading[field.key] ? (
                          <><Loader2 size={13} className="animate-spin" /> Upload…</>
                        ) : success[field.key] ? (
                          <><Check size={13} className="text-accent" /> Enregistré !</>
                        ) : (
                          <><Upload size={13} /> Téléverser</>
                        )}
                      </span>
                    </label>

                    {errors[field.key] && (
                      <div className="flex items-center gap-2 text-xs text-red-400 bg-red-400/10 rounded-lg px-2.5 py-1.5 mt-2">
                        <AlertCircle size={12} />
                        <span>{errors[field.key]}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
