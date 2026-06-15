import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Event } from "@/lib/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Événements & Soirées",
  description:
    "Soirées Riftbound, Magic Night, Trading Day — rejoignez notre communauté chaque semaine à la boutique Le Roi Des Cartes à Beloeil.",
};

const DAY_FR: Record<string, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};

const DEFAULT_EVENTS: Event[] = [
  {
    id: "1",
    title: "Soirées Riftbound",
    description:
      "Venez découvrir Riftbound, le nouveau TCG de League of Legends. Tables disponibles, débutants bienvenus. Premier jeudi du mois ouvert à tous.",
    day_of_week: "jeudi",
    start_time: "19h",
    end_time: "22h",
    image_url: null,
    active: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    title: "Magic Night",
    description:
      "Commander, Draft, Legacy — tous les formats. Bienvenue aux débutants. On prête des decks si tu n'en as pas encore.",
    day_of_week: "vendredi",
    start_time: "19h",
    end_time: "22h",
    image_url: null,
    active: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "3",
    title: "Trading Day",
    description:
      "Échanges entre collectionneurs. Apportez vos doublons, votre binder, vos listes. Évaluations gratuites sur place.",
    day_of_week: "samedi",
    start_time: "10h",
    end_time: "17h",
    image_url: null,
    active: true,
    sort_order: 3,
    created_at: "",
  },
];

export default async function EvenementsPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  const events: Event[] = data && data.length > 0 ? data : DEFAULT_EVENTS;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dark text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="section-badge text-secondary mb-4">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span>LA TABLE EST PRÊTE</span>
          </div>
          <h1 className="font-heading text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9] mb-4">
            ÉVÉNEMENTS<br /><span className="text-secondary">& SOIRÉES</span>
          </h1>
          <p className="text-zinc-400 max-w-xl leading-relaxed">
            Chaque semaine, on joue pour vrai. Pas besoin d&apos;être pro — juste d&apos;avoir envie.
            Tables, sleeves, et même un coup de main pour bâtir ton premier deck.
          </p>
        </div>
      </div>

      {/* Events */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <article
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border flex flex-col"
            >
              {/* Day header */}
              <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <div>
                    <p className="font-heading font-black text-xl uppercase">
                      {DAY_FR[event.day_of_week.toLowerCase()] ?? event.day_of_week}
                    </p>
                    <p className="text-white/70 text-xs uppercase tracking-widest">Récurrent</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/80">
                  <Clock size={14} />
                  {event.start_time}–{event.end_time}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-heading font-black text-2xl uppercase mb-3">{event.title}</h2>
                <p className="text-muted text-sm leading-relaxed flex-1">{event.description}</p>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                  >
                    S&apos;inscrire / Info <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-12 bg-dark text-white rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-black text-2xl uppercase mb-2">Une question sur un événement ?</p>
            <p className="text-zinc-400 text-sm">On vous répond via Facebook, TikTok ou en boutique.</p>
          </div>
          <Link href="/contact" className="btn-secondary text-sm px-7 py-3.5 font-bold whitespace-nowrap">
            Nous contacter →
          </Link>
        </div>
      </div>
    </div>
  );
}
