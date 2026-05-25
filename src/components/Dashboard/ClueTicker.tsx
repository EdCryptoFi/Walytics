"use client";

import { useState, useEffect } from "react";

const clues = [
  "👃 Sniffed: avg blob size up 4.2% — somebody's hoarding evidence.",
  "🔎 Spotted: 0xd4e8…9a31 published 142 blobs in 6 minutes. Suspicious.",
  "📜 Filed: 18,432 blobs catalogued this fortnight.",
  "🚬 Pipe-puff: storage growth slowing — calm before the case?",
  "🗝️ Decoded: 96 blobs > 10 MB. Vault expansion recommended.",
];

export function ClueTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % clues.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      borderTop: "3px solid var(--ink)",
      borderBottom: "3px solid var(--ink)",
      background: "var(--ink)", color: "var(--paper)",
      padding: "10px 22px",
      display: "flex", alignItems: "center", gap: 16,
      fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13,
      letterSpacing: "0.02em",
      overflow: "hidden",
    }}>
      <span style={{
        background: "var(--gold)", color: "var(--ink)",
        padding: "3px 8px", letterSpacing: "0.18em", fontSize: 14, whiteSpace: "nowrap", flexShrink: 0
      }}>LIVE CLUE</span>
      <span key={i} style={{ flex: 1 }}>{clues[i]}</span>
      <span style={{ opacity: 0.6 }}>{String(i + 1).padStart(2, "0")}/{String(clues.length).padStart(2, "0")}</span>
    </div>
  );
}
