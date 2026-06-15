import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 heure

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_SUBMISSIONS) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  let body: { name: string; email: string; phone?: string; message: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Adresse courriel invalide." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 200),
    phone: phone?.trim().slice(0, 20) ?? null,
    message: message.trim().slice(0, 2000),
  });

  if (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
