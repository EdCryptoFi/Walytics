"use client";

import { formatBytes, shortenAddress, formatTimestamp } from "@/lib/utils";
import type { BlobInfo } from "@/types";

const TYPE_ICONS: Record<string, string> = {
  "image/png": "🖼", "image/jpeg": "📷", "video/mp4": "🎬",
  "text/plain": "📜", "application/pdf": "📄", "application/json": "🧾",
  "model/gltf-binary": "🧊", "audio/mp3": "🎵"
};

const VERDICTS = [
  { label: "OPEN CASE",   color: "var(--burgundy)", fg: "var(--tusk)" },
  { label: "SOLVED",      color: "var(--mint)",     fg: "var(--ink)"  },
  { label: "ARCHIVED",    color: "var(--paper-2)",  fg: "var(--ink)"  },
  { label: "RED HERRING", color: "var(--gold)",     fg: "var(--ink)"  },
  { label: "OF INTEREST", color: "var(--tweed)",    fg: "var(--tusk)" },
];

function getVerdict(id: string) {
  let h = 0;
  for (let c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return VERDICTS[h % VERDICTS.length];
}

interface BlobRowProps {
  blob: BlobInfo;
  idx: number;
  selected: boolean;
  onSelect: () => void;
  active: boolean;
  onClick: () => void;
}

export function BlobRow({ blob, idx, selected, onSelect, active, onClick }: BlobRowProps) {
  const verdict = getVerdict(blob.id);
  const typeIcon = TYPE_ICONS[blob.storageType] ?? "📦";
  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "28px 36px 1.5fr 1fr 90px 110px 120px",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderBottom: "2px dashed rgba(0,0,0,0.18)",
        background: active ? "var(--mint)" : selected ? "rgba(201,162,74,0.18)" : "transparent",
        cursor: "pointer",
      }}
    >
      <input type="checkbox" checked={selected} onChange={onSelect} onClick={e => e.stopPropagation()}
        style={{
          width: 18, height: 18, accentColor: "var(--burgundy)",
          appearance: "none", border: "2.5px solid var(--ink)",
          background: selected ? "var(--burgundy)" : "var(--paper)",
          position: "relative", cursor: "pointer"
        }}/>
      <div style={{
        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--paper-2)", border: "2.5px solid var(--ink)",
        fontSize: 16
      }}>{typeIcon}</div>
      <div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>{shortenAddress(blob.id)}</div>
        <div className="mono" style={{ fontSize: 10, opacity: 0.65 }}>{blob.storageType} · #{idx}</div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 14 }}>{shortenAddress(blob.publisher)}</div>
        <div className="mono" style={{ fontSize: 9.5, opacity: 0.6 }}>publisher</div>
      </div>
      <div className="mono" style={{ fontSize: 13, fontWeight: 700, textAlign: "right" }}>{formatBytes(blob.size)}</div>
      <div className="mono" style={{ fontSize: 11, opacity: 0.75 }}>{formatTimestamp(blob.timestamp)}</div>
      <div>
        <span className="tag" style={{
          background: verdict.color, color: verdict.fg, fontSize: 9.5, padding: "3px 7px"
        }}>{verdict.label}</span>
      </div>
    </div>
  );
}
