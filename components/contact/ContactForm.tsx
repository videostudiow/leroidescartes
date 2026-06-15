"use client";

import { useState } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface FormState {
  nom: string;
  email: string;
  telephone: string;
  message: string;
  honeypot: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    telephone: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // Anti-spam
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nom,
          email: form.email,
          phone: form.telephone,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur lors de l'envoi");
      }

      setStatus("success");
      setForm({ nom: "", email: "", telephone: "", message: "", honeypot: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-accent/10 border border-accent text-dark rounded-xl p-8 text-center">
        <div className="w-14 h-14 bg-accent text-dark rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={28} />
        </div>
        <p className="font-heading font-black text-2xl uppercase mb-2">Message envoyé !</p>
        <p className="text-muted">On vous répond en moins de 24h. Merci de votre message.</p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline border-dark text-dark text-sm px-6 py-2 mt-6"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — caché des humains */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-bold uppercase tracking-wide mb-1.5">
            Nom <span className="text-primary">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide mb-1.5">
            Courriel <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="votre@courriel.com"
            className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-bold uppercase tracking-wide mb-1.5">
          Téléphone <span className="text-muted text-xs font-normal normal-case">(optionnel)</span>
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          value={form.telephone}
          onChange={handleChange}
          placeholder="(450) 000-0000"
          className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors"
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wide mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Votre question, évaluation de carte, demande spéciale..."
          className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-colors resize-none"
        />
      </div>

      <p className="text-xs text-muted">
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous
        répondre conformément à notre{" "}
        <a href="/politique-de-confidentialite" className="underline hover:text-primary">
          politique de confidentialité
        </a>
        .
      </p>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle size={16} />
          <span>{errorMsg || "Une erreur est survenue. Veuillez réessayer."}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full py-4 text-sm font-bold disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Envoi en cours...
          </span>
        ) : (
          "Envoyer le message →"
        )}
      </button>
    </form>
  );
}
