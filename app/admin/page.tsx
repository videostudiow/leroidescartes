"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Type,
  Palette,
  Info,
  ImageIcon,
  Calendar,
  MessageSquare,
  ExternalLink,
  Mail,
} from "lucide-react";

const SECTIONS = [
  { label: "Mes textes", href: "/admin/textes", icon: Type, desc: "Modifier les textes du site" },
  { label: "Mes couleurs", href: "/admin/couleurs", icon: Palette, desc: "Changer la palette de couleurs" },
  { label: "Mes informations", href: "/admin/infos", icon: Info, desc: "Heures, adresse, réseaux" },
  { label: "Mes images", href: "/admin/images", icon: ImageIcon, desc: "Logo, héros, galerie" },
  { label: "Mes événements", href: "/admin/evenements", icon: Calendar, desc: "Gérer les soirées récurrentes" },
  { label: "Messages reçus", href: "/admin/messages", icon: MessageSquare, desc: "Voir les messages de contact" },
];

export default function AdminDashboard() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("contact_messages")
      .select("id", { count: "exact" })
      .eq("read", false)
      .then(({ count }) => setUnreadCount(count ?? 0));

    supabase
      .from("site_content")
      .select("updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data?.updated_at) {
          setLastUpdate(
            new Date(data.updated_at).toLocaleDateString("fr-CA", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }
      });
  }, []);

  const now = new Date().toLocaleDateString("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-zinc-500 text-sm mb-1">{now}</p>
        <h1 className="font-heading text-3xl font-black uppercase text-white">
          Bonjour — Gestion du Roi Des Cartes
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-primary transition-colors"
          >
            <ExternalLink size={14} />
            Voir mon site public
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <Mail size={20} className="text-primary" />
            {unreadCount > 0 && (
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full font-bold">
                {unreadCount} nouveau{unreadCount > 1 ? "x" : ""}
              </span>
            )}
          </div>
          <p className="font-heading font-bold text-2xl text-white">{unreadCount}</p>
          <p className="text-zinc-400 text-sm">Message{unreadCount !== 1 ? "s" : ""} non lu{unreadCount !== 1 ? "s" : ""}</p>
          <Link href="/admin/messages" className="text-xs text-primary hover:underline mt-2 block">
            Voir les messages →
          </Link>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="mb-3">
            <Type size={20} className="text-secondary" />
          </div>
          <p className="text-zinc-300 text-sm leading-snug">
            Dernière modification&nbsp;: {lastUpdate ?? "—"}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
          <div className="mb-3">
            <ExternalLink size={20} className="text-accent" />
          </div>
          <p className="text-zinc-300 text-sm">Site en ligne</p>
          <a
            href="https://leroidescartes.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline mt-2 block"
          >
            leroidescartes.ca →
          </a>
        </div>
      </div>

      {/* Sections grid */}
      <h2 className="font-heading font-bold text-lg uppercase text-zinc-400 mb-4">Navigation rapide</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ label, href, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="group bg-zinc-900 rounded-xl p-5 border border-zinc-800 hover:border-primary transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 bg-zinc-800 group-hover:bg-primary rounded-lg flex items-center justify-center mb-3 transition-colors">
              <Icon size={18} />
            </div>
            <p className="font-heading font-bold uppercase text-white group-hover:text-primary transition-colors">
              {label}
            </p>
            <p className="text-zinc-500 text-xs mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
