import { ReactNode } from "react";
import { Sparkline } from "./Sparkline";

type Accent = "mint" | "gold" | "tweed" | "burgundy" | "paper" | "paper2";

interface KPIProps {
  label: string;
  sub?: string;
  value: string;
  unit?: string;
  delta: number;
  deltaLabel?: string;
  spark?: number[];
  accent?: Accent;
  stamp?: string;
  icon?: ReactNode;
  delay?: number;
}

const accentMap: Record<Accent, string> = {
  mint:     "var(--mint)",
  gold:     "var(--gold)",
  tweed:    "var(--tweed)",
  burgundy: "var(--burgundy)",
  paper:    "var(--paper)",
  paper2:   "var(--paper-2)",
};

export function KPI({ label, sub, value, unit, delta, deltaLabel, spark, accent = "mint", stamp, icon, delay = 0 }: KPIProps) {
  const bg = accentMap[accent];
  const fg = (accent === "tweed" || accent === "burgundy") ? "var(--tusk)" : "var(--ink)";
  const up = delta >= 0;
  return (
    <div className="brut brut-hov" style={{ padding: 18, animationDelay: `${delay}s`, color: fg, background: bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div className="kicker" style={{ color: fg, opacity: 0.85 }}>
          <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 6 }}>{icon}</span>
          {label}
        </div>
        {stamp && <span className="stamp stamp-tweed" style={{ borderColor: fg, color: fg }}>{stamp}</span>}
      </div>
      {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 2, opacity: 0.7 }}>{sub}</div>}
      <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="h-display" style={{ fontSize: 46, lineHeight: 1 }}>{value}</span>
        {unit && <span className="mono" style={{ fontSize: 13, fontWeight: 700, opacity: 0.7 }}>{unit}</span>}
      </div>
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
        <div className="mono" style={{ fontSize: 11, fontWeight: 700 }}>
          <span style={{
            display: "inline-block",
            padding: "2px 6px",
            background: up ? "rgba(46,87,81,0.18)" : "rgba(122,42,42,0.18)",
            border: `2px solid ${fg}`,
            marginRight: 6
          }}>{up ? "▲" : "▼"} {Math.abs(delta)}%</span>
          <span style={{ opacity: 0.75 }}>{deltaLabel}</span>
        </div>
        {spark && (
          <Sparkline
            data={spark}
            color={fg}
            fill={(accent === "tweed" || accent === "burgundy") ? "var(--mint)" : "var(--tweed)"}
            width={130}
            height={40}
          />
        )}
      </div>
    </div>
  );
}
