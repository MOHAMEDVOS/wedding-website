import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "songs.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

function readSongs(): { song: string; name: string; timestamp: string }[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeSongs(songs: { song: string; name: string; timestamp: string }[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(songs, null, 2), "utf-8");
}

export async function GET() {
  const songs = readSongs();
  return NextResponse.json(songs);
}

export async function POST(req: NextRequest) {
  const { song, name } = await req.json();

  if (!song || typeof song !== "string" || !song.trim()) {
    return NextResponse.json({ error: "Song is required" }, { status: 400 });
  }

  const songs = readSongs();
  songs.push({
    song: song.trim(),
    name: (typeof name === "string" && name.trim()) ? name.trim() : "Anonymous",
    timestamp: new Date().toISOString(),
  });
  writeSongs(songs);

  return NextResponse.json({ success: true });
}
