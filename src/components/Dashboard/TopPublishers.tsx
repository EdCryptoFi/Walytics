import { formatBytes, shortenAddress } from "@/lib/utils";
import type { WalrusMetrics } from "@/lib/walrus";

interface TopPublishersProps {
  publishers: WalrusMetrics["topPublishers"];
}

const BADGES = ["PRIME SUSPECT", "REPEAT OFFENDER", "RELIABLE", "RISING", "UNDER WATCH", "COOLING"];
const TRENDS = [12, 4, -2, 18, 1, -7];

export function TopPublishers({ publishers }: TopPublishersProps) {
  const rows = publishers.slice(0, 6).map((p, i) => ({
    label: p.label ?? "Unknown",
    addr: shortenAddress(p.address),
    blobs: p.count,
    size: formatBytes(p.totalSize),
    trend: TRENDS[i] ?? 0,
    badge: BADGES[i] ?? "OBSERVED",
  }));

  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid",
          gridTemplateColumns: "32px 1fr 120px 70px",
          alignItems: "center",
          gap: 14,
          padding: "12px 4px",
          borderTop: i === 0 ? "2.5px solid var(--ink)" : "2px dashed rgba(0,0,0,0.25)",
          borderBottom: i === rows.length - 1 ? "2.5px solid var(--ink)" : "none",
        }}>
          <div style={{
            width: 30, height: 30,
            border: "2.5px solid var(--ink)",
            background: i === 0 ? "var(--gold)" : i === 1 ? "var(--mint)" : i === 2 ? "var(--burgundy)" : "var(--paper-2)",
            color: i === 2 ? "var(--tusk)" : "var(--ink)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14,
          }}>{i+1}</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 17, lineHeight: 1.1 }}>{r.label}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 3 }}>
              <span className="mono" style={{ fontSize: 14, opacity: 0.55 }}>{r.addr}</span>
              <span className="tag" style={{ fontSize: 13, padding: "2px 6px",
                background: r.badge === "PRIME SUSPECT" ? "var(--gold)" :
                            r.badge === "RISING" ? "var(--mint)" :
                            r.badge === "UNDER WATCH" ? "var(--burgundy)" : "var(--paper-2)",
                color: r.badge === "UNDER WATCH" ? "var(--tusk)" : "var(--ink)" }}>{r.badge}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 15, fontWeight: 800 }}>{r.blobs}</div>
            <div className="mono" style={{ fontSize: 14, opacity: 0.7 }}>{r.size}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="mono" style={{
              fontSize: 15, fontWeight: 800,
              padding: "3px 6px",
              background: r.trend >= 0 ? "var(--mint)" : "var(--burgundy)",
              color: r.trend >= 0 ? "var(--ink)" : "var(--tusk)",
              border: "2px solid var(--ink)"
            }}>{r.trend >= 0 ? "▲" : "▼"} {Math.abs(r.trend)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
