"use client";

import { useState, useEffect, useCallback } from "react";

interface SongRequest {
  song: string;
  name: string;
  timestamp: string;
}

export default function Dashboard() {
  const [songs, setSongs] = useState<SongRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = useCallback(async () => {
    try {
      const res = await fetch("/api/songs");
      if (res.ok) {
        const data = await res.json();
        setSongs(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    const interval = setInterval(fetchSongs, 5000);
    return () => clearInterval(interval);
  }, [fetchSongs]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#1E1008] text-[#F5E6D3] p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "serif" }}>
            Song Requests
          </h1>
          <p className="text-[#A89080] text-sm">
            {songs.length} request{songs.length !== 1 ? "s" : ""} so far
            {" "}&middot;{" "}auto-refreshes every 5s
          </p>
        </div>

        {/* Song List */}
        {loading ? (
          <p className="text-center text-[#A89080]">Loading...</p>
        ) : songs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#A89080] text-lg">No song requests yet.</p>
            <p className="text-[#A89080]/60 text-sm mt-2">
              They&apos;ll appear here when guests submit them.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...songs].reverse().map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#2D1E14] rounded-lg px-5 py-4 border border-[#C4956A]/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#C4956A] text-lg shrink-0">&#9835;</span>
                  <div className="min-w-0">
                    <span className="text-[#F5E6D3] text-base md:text-lg block truncate">
                      {s.song}
                    </span>
                    <span className="text-[#C4956A]/70 text-xs">
                      by {s.name || "Anonymous"}
                    </span>
                  </div>
                </div>
                <span className="text-[#A89080] text-xs whitespace-nowrap ml-4 shrink-0">
                  {formatDate(s.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
