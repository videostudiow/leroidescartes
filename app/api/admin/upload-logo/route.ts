import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });

  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Fichier trop grand" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "png";
  const fileName = `logo-${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();

  const serviceClient = createSupabaseServiceClient();
  const { error } = await serviceClient.storage
    .from("media")
    .upload(fileName, bytes, { contentType: file.type, upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = serviceClient.storage.from("media").getPublicUrl(fileName);

  await supabase.from("site_content").upsert(
    { key: "logo_url", value: publicUrl },
    { onConflict: "key" }
  );

  return NextResponse.json({ url: publicUrl });
}
