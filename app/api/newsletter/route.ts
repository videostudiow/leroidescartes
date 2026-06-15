import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  let body: { email?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const locale = body.locale === "en" ? "en" : "fr";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.slice(0, 200), locale });

  if (error) {
    // 23505 = violation contrainte unique → déjà inscrit
    if (error.code === "23505") {
      return NextResponse.json({ error: "already" }, { status: 409 });
    }
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
