"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Event } from "@/lib/types";
import { Plus, Pencil, Trash2, Loader2, Check, X } from "lucide-react";

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

const EMPTY_EVENT: Omit<Event, "id" | "created_at"> = {
  title: "",
  description: "",
  day_of_week: "jeudi",
  start_time: "19h",
  end_time: "22h",
  image_url: null,
  active: true,
  sort_order: 0,
};

export default function AdminEvenementsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<typeof EMPTY_EVENT>({ ...EMPTY_EVENT });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchEvents = () => {
    supabase
      .from("events")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  };

  useEffect(fetchEvents, []);

  const startEdit = (event: Event) => {
    setEditing(event.id);
    setCreating(false);
    setForm({
      title: event.title,
      description: event.description,
      day_of_week: event.day_of_week,
      start_time: event.start_time,
      end_time: event.end_time,
      image_url: event.image_url,
      active: event.active,
      sort_order: event.sort_order,
    });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm({ ...EMPTY_EVENT, sort_order: events.length });
  };

  const cancel = () => {
    setEditing(null);
    setCreating(false);
  };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (creating) {
      const { data } = await supabase.from("events").insert(form).select().single();
      if (data) setEvents((prev) => [...prev, data]);
    } else if (editing) {
      await supabase.from("events").update(form).eq("id", editing);
      setEvents((prev) => prev.map((e) => (e.id === editing ? { ...e, ...form } : e)));
    }
    setSaving(false);
    cancel();
  };

  const toggleActive = async (event: Event) => {
    await supabase.from("events").update({ active: !event.active }).eq("id", event.id);
    setEvents((prev) => prev.map((e) => (e.id === event.id ? { ...e, active: !e.active } : e)));
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return;
    setDeleting(id);
    await supabase.from("events").delete().eq("id", id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const EventForm = () => (
    <div className="bg-zinc-800 rounded-xl p-5 border border-zinc-700 space-y-4">
      <h3 className="font-heading font-bold text-sm uppercase text-white">
        {creating ? "Nouvel événement" : "Modifier l'événement"}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs text-zinc-400 mb-1">Titre *</label>
          <input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
            placeholder="Ex: Soirées Riftbound"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-zinc-400 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Jour</label>
          <select
            value={form.day_of_week}
            onChange={(e) => setForm((p) => ({ ...p, day_of_week: e.target.value }))}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
          >
            {JOURS.map((j) => (
              <option key={j} value={j}>{j.charAt(0).toUpperCase() + j.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Début</label>
            <input
              value={form.start_time}
              onChange={(e) => setForm((p) => ({ ...p, start_time: e.target.value }))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              placeholder="19h"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Fin</label>
            <input
              value={form.end_time}
              onChange={(e) => setForm((p) => ({ ...p, end_time: e.target.value }))}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              placeholder="22h"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={form.active}
            onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="active" className="text-sm text-zinc-300">Actif (visible sur le site)</label>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button
          onClick={save}
          disabled={saving || !form.title.trim()}
          className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          Sauvegarder
        </button>
        <button onClick={cancel} className="btn-outline border-zinc-600 text-zinc-400 text-sm px-4 py-2.5 flex items-center gap-2 hover:border-white hover:text-white">
          <X size={14} /> Annuler
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-black uppercase text-white">Mes événements</h1>
          <p className="text-zinc-500 text-sm mt-1">Gérez les soirées récurrentes affichées sur le site.</p>
        </div>
        <button onClick={startCreate} className="btn-primary text-sm px-4 py-2.5 flex items-center gap-2">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {creating && <div className="mb-6"><EventForm /></div>}

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id}>
            {editing === event.id ? (
              <EventForm />
            ) : (
              <div className={`bg-zinc-900 rounded-xl p-4 border ${event.active ? "border-zinc-800" : "border-zinc-800 opacity-60"} flex items-start gap-4`}>
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-xs font-bold uppercase">
                  {event.day_of_week.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-bold text-lg text-white">{event.title}</p>
                    {!event.active && (
                      <span className="text-xs text-zinc-600 border border-zinc-700 px-2 py-0.5 rounded">Inactif</span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs mt-0.5">{event.start_time}–{event.end_time}</p>
                  <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{event.description}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(event)}
                    className={`p-2 rounded-lg text-xs transition-colors ${event.active ? "text-accent hover:bg-accent/10" : "text-zinc-500 hover:bg-zinc-800"}`}
                    title={event.active ? "Désactiver" : "Activer"}
                  >
                    <Check size={14} />
                  </button>
                  <button onClick={() => startEdit(event)} className="p-2 rounded-lg text-zinc-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Modifier">
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    disabled={deleting === event.id}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Supprimer"
                  >
                    {deleting === event.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {events.length === 0 && !creating && (
          <div className="text-center py-16 text-zinc-600">
            <p className="font-heading text-xl font-bold uppercase mb-2">Aucun événement</p>
            <p className="text-sm">Ajoutez des soirées récurrentes pour les afficher sur le site.</p>
          </div>
        )}
      </div>
    </div>
  );
}
