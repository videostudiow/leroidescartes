"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ContactMessage } from "@/lib/types";
import { Mail, MailOpen, Trash2, Loader2, Phone, User, Clock } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMessages = () => {
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setMessages(data ?? []);
        setLoading(false);
      });
  };

  useEffect(fetchMessages, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const handleSelect = async (message: ContactMessage) => {
    setSelected(selected === message.id ? null : message.id);
    if (!message.read) markRead(message.id);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Supprimer ce message ? Cette action est irréversible.")) return;
    setDeleting(id);
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected === id) setSelected(null);
    setDeleting(null);
  };

  const filtered = filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-black uppercase text-white">Messages reçus</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
            {unreadCount > 0 && (
              <span className="ml-2 text-primary font-bold">{unreadCount} non lu{unreadCount !== 1 ? "s" : ""}</span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase transition-colors ${filter === "all" ? "bg-primary text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase transition-colors ${filter === "unread" ? "bg-primary text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}
          >
            Non lus {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-zinc-600">
          <Mail size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-heading text-xl font-bold uppercase">
            {filter === "unread" ? "Aucun message non lu" : "Aucun message"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((message) => (
            <div key={message.id} className={`bg-zinc-900 rounded-xl border transition-all ${!message.read ? "border-primary/40" : "border-zinc-800"}`}>
              <button
                onClick={() => handleSelect(message)}
                className="w-full text-left p-4 flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${!message.read ? "bg-primary" : "bg-zinc-800"}`}>
                  {!message.read ? <Mail size={15} className="text-white" /> : <MailOpen size={15} className="text-zinc-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-bold text-sm ${!message.read ? "text-white" : "text-zinc-300"}`}>
                      {message.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-600 whitespace-nowrap">
                        {new Date(message.created_at).toLocaleDateString("fr-CA", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        disabled={deleting === message.id}
                        className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                        aria-label="Supprimer"
                      >
                        {deleting === message.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs mt-0.5">{message.email}</p>
                  <p className="text-zinc-400 text-sm mt-1.5 line-clamp-2">{message.message}</p>
                </div>
              </button>

              {/* Expanded view */}
              {selected === message.id && (
                <div className="border-t border-zinc-800 px-4 py-4 space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <User size={14} className="text-zinc-600" />
                      <span>{message.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail size={14} className="text-zinc-600" />
                      <a href={`mailto:${message.email}`} className="hover:text-primary transition-colors underline">
                        {message.email}
                      </a>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Phone size={14} className="text-zinc-600" />
                        <a href={`tel:${message.phone}`} className="hover:text-primary transition-colors">
                          {message.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                    <Clock size={12} />
                    <span>{new Date(message.created_at).toLocaleString("fr-CA", { dateStyle: "long", timeStyle: "short" })}</span>
                  </div>
                  <a
                    href={`mailto:${message.email}?subject=Re: Votre message — Le Roi Des Cartes`}
                    className="btn-primary text-xs px-4 py-2 inline-flex items-center gap-2"
                  >
                    <Mail size={13} /> Répondre par courriel
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
