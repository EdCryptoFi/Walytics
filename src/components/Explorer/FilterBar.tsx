"use client";

import { IconLoupe, IconKey } from "@/components/Mascot/DetectiveIcons";

const TYPES = ["image/png", "image/jpeg", "video/mp4", "text/plain", "application/pdf", "application/json", "model/gltf-binary", "audio/mp3"];
const TYPE_ICONS: Record<string, string> = {
  "image/png": "🖼", "image/jpeg": "📷", "video/mp4": "🎬",
  "text/plain": "📜", "application/pdf": "📄", "application/json": "🧾",
  "model/gltf-binary": "🧊", "audio/mp3": "🎵"
};

const VERDICTS = ["OPEN CASE", "SOLVED", "ARCHIVED", "RED HERRING", "OF INTEREST"];

interface FilterBarProps {
  q: string;
  setQ: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  verdict: string;
  setVerdict: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

export function FilterBar({ q, setQ, type, setType, verdict, setVerdict, sortBy, setSortBy }: FilterBarProps) {
  return (
    <div className="brut" style={{ padding: 14, marginBottom: 22, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        border: "3px solid var(--ink)", background: "var(--paper)", padding: "8px 12px",
        flex: "1 1 280px"
      }}>
        <IconLoupe size={18}/>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search the evidence locker… (id, publisher)"
          style={{
            border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600,
            color: "var(--ink)", width: "100%"
          }}/>
        {q && (
          <button onClick={() => setQ("")} style={{
            border: "2px solid var(--ink)", background: "var(--burgundy)", color: "var(--tusk)",
            padding: "1px 7px", cursor: "pointer", fontFamily: "var(--font-mono)", fontWeight: 700
          }}>×</button>
        )}
      </div>
      <select value={type} onChange={e => setType(e.target.value)} className="chip-sel">
        <option value="">All types</option>
        {TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t}</option>)}
      </select>
      <select value={verdict} onChange={e => setVerdict(e.target.value)} className="chip-sel">
        <option value="">All verdicts</option>
        {VERDICTS.map(v => <option key={v} value={v}>{v}</option>)}
      </select>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="chip-sel">
        <option value="recent">Most recent</option>
        <option value="size-d">Largest first</option>
        <option value="size-a">Smallest first</option>
        <option value="pub">By publisher</option>
      </select>
      <button className="btn btn-mint" style={{ padding: "8px 12px", fontSize: 11 }}>
        <IconKey size={14}/> Subpoena selected
      </button>
    </div>
  );
}
