"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Status = "idle" | "loading" | "ok" | "already" | "error";

export default function NewsletterForm({ dict }: { dict: Dictionary }) {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "ok"
      ? dict.newsletter.succes
      : status === "already"
      ? dict.newsletter.dejaInscrit
      : status === "error"
      ? dict.newsletter.erreur
      : "";

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.newsletter.placeholder}
          className="flex-1 min-w-0 rounded-md border-2 border-[color:var(--cream)]/30 bg-[color:var(--cream)]/5 px-4 py-3 text-sm text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40 focus:outline-none focus:border-[color:var(--secondary)]"
          aria-label={dict.newsletter.placeholder}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[color:var(--secondary)] text-[color:var(--ink)] font-display uppercase text-sm px-5 py-3 border-2 border-[color:var(--cream)] hover:-translate-y-px transition disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : status === "ok" ? (
            <Check className="size-4" />
          ) : null}
          {dict.newsletter.cta}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 font-mono text-xs ${
            status === "ok" ? "text-[color:var(--secondary)]" : "text-[color:var(--cream)]/70"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
