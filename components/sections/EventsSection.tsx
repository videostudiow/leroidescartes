import Link from "next/link";
import type { Event } from "@/lib/types";

const DAY_SHORT: Record<string, string> = {
  lundi: "LUN",
  mardi: "MAR",
  mercredi: "MER",
  jeudi: "JEU",
  vendredi: "VEN",
  samedi: "SAM",
  dimanche: "DIM",
};

interface EventsSectionProps {
  content: Record<string, string>;
  events: Event[];
}

export default function EventsSection({ content, events }: EventsSectionProps) {
  const displayEvents =
    events.length > 0
      ? events
      : [
          { id: "1", title: "Soirées Riftbound", day_of_week: "jeudi", start_time: "19h", end_time: "22h", description: "Premier jeudi du mois. Venez découvrir Riftbound.", active: true, sort_order: 1, image_url: null, created_at: "" },
          { id: "2", title: "Magic Night", day_of_week: "vendredi", start_time: "19h", end_time: "22h", description: "Commander pour débutants et avancés. Bienvenue.", active: true, sort_order: 2, image_url: null, created_at: "" },
          { id: "3", title: "Trading Day", day_of_week: "samedi", start_time: "10h", end_time: "17h", description: "Échanges entre collectionneurs. Apportez vos doublons.", active: true, sort_order: 3, image_url: null, created_at: "" },
        ];

  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="section-badge text-secondary">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>{content.evenements_badge ?? "LA TABLE EST PRÊTE"}</span>
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.95] mb-6">
              <span className="block">{content.evenements_titre_ligne1 ?? "CHAQUE SEMAINE,"}</span>
              <span className="block text-secondary">{content.evenements_titre_ligne2 ?? "ON JOUE POUR VRAI."}</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
              {content.evenements_description}
            </p>
            <Link href="/evenements" className="btn-secondary text-sm px-7 py-3.5 font-bold">
              {content.evenements_cta ?? "Réserver ma place"} →
            </Link>
          </div>

          {/* Right — Events schedule */}
          <div className="space-y-3">
            {displayEvents.filter((e) => e.active).map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl p-4 border border-zinc-800 hover:border-primary transition-all duration-200 group"
              >
                {/* Day badge */}
                <div className="w-14 h-14 bg-primary text-white rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="font-heading font-black text-xs">{DAY_SHORT[event.day_of_week.toLowerCase()] ?? event.day_of_week.slice(0, 3).toUpperCase()}</span>
                  <span className="w-4 h-0.5 bg-white/40 my-0.5" />
                  <span className="text-[10px] opacity-70">
                    {event.start_time}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg uppercase group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-snug mt-0.5">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-col items-end text-xs text-zinc-500">
                  <span>{event.start_time}</span>
                  <span className="text-zinc-600">—</span>
                  <span>{event.end_time}</span>
                </div>

                <span className="badge-live text-[10px] hidden sm:flex">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                  INSCRIT
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
