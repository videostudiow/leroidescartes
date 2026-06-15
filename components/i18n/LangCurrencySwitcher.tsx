"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  locales,
  currencies,
  type Locale,
  CURRENCY_COOKIE,
  LOCALE_COOKIE,
} from "@/lib/i18n/config";
import { useLocale } from "./LocaleProvider";

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=31536000;samesite=lax`;
}

type Variant = "header" | "footer";

export default function LangCurrencySwitcher({
  currency,
  variant = "header",
  onNavigate,
}: {
  currency: string;
  variant?: Variant;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchLocale(next: Locale) {
    if (next === locale) return;
    setCookie(LOCALE_COOKIE, next);
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || `/${next}`);
    onNavigate?.();
  }

  function switchCurrency(code: string) {
    setCookie(CURRENCY_COOKIE, code);
    setOpen(false);
    router.refresh();
  }

  const current = currencies.find((c) => c.code === currency) ?? currencies[0];
  const isFooter = variant === "footer";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={
          isFooter
            ? "inline-flex items-center gap-2 font-mono text-sm text-[color:var(--cream)]/80 hover:text-[color:var(--cream)] transition border border-[color:var(--cream)]/20 rounded-md px-3 py-2"
            : "inline-flex items-center gap-1.5 font-mono text-xs border-2 border-[color:var(--ink)] rounded-md px-2 py-1.5 bg-[color:var(--paper)] shadow-[2px_2px_0_0_var(--ink)] hover:-translate-x-px hover:-translate-y-px transition"
        }
        aria-label="Langue et devise"
        aria-expanded={open}
      >
        <Globe className="size-3.5" />
        <span className="uppercase font-bold">{locale}</span>
        <span className="opacity-50">·</span>
        <span>{current.label}</span>
        <ChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className={`absolute z-[1000] min-w-[220px] bg-[color:var(--cream)] text-[color:var(--ink)] border-2 border-[color:var(--ink)] rounded-md shadow-[4px_4px_0_0_var(--ink)] overflow-hidden ${
            isFooter ? "bottom-full mb-2 left-0" : "top-full mt-2 right-0"
          }`}
        >
          {/* Langue */}
          <div className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-wide opacity-50">
            Langue / Language
          </div>
          <div className="flex gap-1 px-2 pb-2 border-b-2 border-[color:var(--ink)]/10">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`flex-1 py-1.5 rounded font-mono text-xs uppercase font-bold transition ${
                  l === locale
                    ? "bg-[color:var(--ink)] text-[color:var(--cream)]"
                    : "hover:bg-[color:var(--ink)]/10"
                }`}
              >
                {l === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>

          {/* Devise */}
          <div className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-wide opacity-50">
            Devise / Currency
          </div>
          <div className="max-h-56 overflow-y-auto pb-1">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => switchCurrency(c.code)}
                className="w-full flex items-center justify-between px-3 py-2 font-mono text-sm hover:bg-[color:var(--ink)] hover:text-[color:var(--cream)] transition"
              >
                <span>{c.label}</span>
                {c.code === current.code && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
