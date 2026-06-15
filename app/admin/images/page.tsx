"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Upload, Loader2, Check, AlertCircle, ImageIcon } from "lucide-react";

interface ImageField {
  key: string;
  label: string;
  description: string;
  currentUrl: string;
  uploadEndpoint: string;
}

export default function AdminImagesPage() {
  const [fields, setFields] = useState<ImageField[]>([
    {
      key: "hero_image_url",
      label: "Photo héros",
      description: "Image d'arrière-plan de la section principale (accueil). Format recommandé : 1920×1080px.",
      currentUrl: "",
      uploadEndpoint: "/api/admin/upload-hero",
    },
    {
      key: "logo_url",
      label: "Logo",
      description: "Logo de la boutique (PNG transparent recommandé). Affiché dans le header et le footer.",
      currentUrl: "",
      uploadEndpoint: "/api/admin/upload-logo",
    },
  ]);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, value")
      .in("key", ["hero_image_url", "logo_url"])
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach(({ key, value }) => {
          map[key] = value;
        });
        setFields((prev) =>
          prev.map((f) => ({ ...f, currentUrl: map[f.key] ?? f.currentUrl }))
        );
        setLoading(false);
      });
  }, []);

  const handleUpload = async (fieldKey: string, endpoint: string, file: File) => {
    if (!file) return;
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({ ...prev, [fieldKey]: "Fichier trop grand (max 10 Mo)." }));
      return;
    }

    setUploading((prev) => ({ ...prev, [fieldKey]: true }));
    setErrors((prev) => ({ ...prev, [fieldKey]: "" }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur upload");

      setFields((prev) =>
        prev.map((f) => (f.key === fieldKey ? { ...f, currentUrl: data.url } : f))
      );
      setSuccess((prev) => ({ ...prev, [fieldKey]: true }));
      setTimeout(() => setSuccess((prev) => ({ ...prev, [fieldKey]: false })), 3000);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [fieldKey]: err instanceof Error ? err.message : "Erreur inconnue",
      }));
    } finally {
      setUploading((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-black uppercase text-white mb-2">Mes images</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Formats acceptés : JPG, PNG, WebP, SVG. Taille maximale : 10 Mo.
      </p>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="font-heading font-bold text-sm uppercase text-zinc-400 tracking-widest">
                {field.label}
              </h2>
              <p className="text-zinc-600 text-xs mt-1">{field.description}</p>
            </div>
            <div className="p-6">
              {/* Preview */}
              {field.currentUrl ? (
                <div className="relative h-40 rounded-xl overflow-hidden bg-zinc-800 mb-4">
                  <Image
                    src={field.currentUrl}
                    alt={field.label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                </div>
              ) : (
                <div className="h-40 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 border-2 border-dashed border-zinc-700">
                  <div className="text-center text-zinc-600">
                    <ImageIcon size={32} className="mx-auto mb-2" />
                    <p className="text-sm">Aucune image</p>
                  </div>
                </div>
              )}

              {/* Upload */}
              <label
                className={`block w-full text-center border-2 border-dashed rounded-xl py-4 px-4 cursor-pointer transition-colors ${
                  uploading[field.key]
                    ? "border-primary/50 text-primary/50"
                    : "border-zinc-700 hover:border-primary text-zinc-400 hover:text-primary"
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  className="hidden"
                  disabled={uploading[field.key]}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(field.key, field.uploadEndpoint, file);
                    e.target.value = "";
                  }}
                />
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  {uploading[field.key] ? (
                    <><Loader2 size={16} className="animate-spin" /> Upload en cours...</>
                  ) : success[field.key] ? (
                    <><Check size={16} className="text-accent" /> Image mise à jour !</>
                  ) : (
                    <><Upload size={16} /> Choisir une image</>
                  )}
                </div>
              </label>

              {errors[field.key] && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2 mt-3">
                  <AlertCircle size={14} />
                  <span>{errors[field.key]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
