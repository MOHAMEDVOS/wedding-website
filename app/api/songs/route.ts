import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("song_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const songs = (data || []).map((row) => ({
    song: row.song,
    name: row.guest_name,
    timestamp: row.created_at,
  }));

  return NextResponse.json(songs);
}

export async function POST(req: NextRequest) {
  const { song, name } = await req.json();

  if (!song || typeof song !== "string" || !song.trim()) {
    return NextResponse.json({ error: "Song is required" }, { status: 400 });
  }

  const { error } = await supabase.from("song_requests").insert({
    song: song.trim(),
    guest_name: typeof name === "string" && name.trim() ? name.trim() : "Anonymous",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
