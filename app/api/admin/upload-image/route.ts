import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase-server";

// Liste blanche des clés d'images modifiables (sécurité).
const ALLOWED_KEYS = new Set([
  "hero_image_url",
  "logo_url",
  "home_img_hero_1",
  "home_img_hero_2",
  "home_img_hero_3",
  "home_img_cat_sports",
  "home_img_cat_jeux",
  "home_img_cat_anime",
  "home_img_cat_vetements",
  "home_img_cat_accessoires",
  "home_img_cat_consommables",
  "home_img_break",
]);

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const key = (formData.get("key") as string | null)?.trim() ?? "";

  if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  if (!ALLOWED_KEYS.has(key)) {
    return NextResponse.json({ error: "Clé d'image invalide" }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "Fichier trop grand (max 10 Mo)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${key}-${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const serviceClient = createSupabaseServiceClient();
  const { error: uploadError } = await serviceClient.storage
    .from("media")
    .upload(fileName, bytes, { contentType: file.type, upsert: true });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: { publicUrl } } = serviceClient.storage.from("media").getPublicUrl(fileName);

  await supabase.from("site_content").upsert(
    { key, value: publicUrl },
    { onConflict: "key" }
  );

  return NextResponse.json({ url: publicUrl });
}
