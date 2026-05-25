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
  mint:     "var(--peach)",
  gold:     "var(--paper-2)",
  tweed:    "var(--tweed)",
  burgundy: "var(--error)",
  paper:    "var(--paper)",
  paper2:   "var(--paper-2)",
};

export function KPI({ label, sub, value, unit, delta, deltaLabel, spark, accent = "mint", stamp, icon, delay = 0 }: KPIProps) {
  const bg = accentMap[accent];
  const isDark = accent === "tweed" || accent === "burgundy";
  const fg = isDark ? "var(--tusk)" : "var(--ink)";
  const up = delta >= 0;

  return (
    <div className="paper-hover" style={{
      padding: 20,
      background: bg,
      border: "3px solid var(--ink)",
      boxShadow: "5px 5px 0 0 rgba(0,0,0,0.55)",
      color: fg,
      animationDelay: `${delay}s`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div className="kicker" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--ink-soft)" }}>
          <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 6 }}>{icon}</span>
          {label}
        </div>
        {stamp && (
          <span className="stamp" style={{ borderColor: fg, color: fg, fontSize: 10 }}>{stamp}</span>
        )}
      </div>
      {sub && (
        <div className="mono" style={{ fontSize: 10, marginTop: 2, opacity: 0.65 }}>{sub}</div>
      )}
      <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="h-display" style={{ fontSize: 44, lineHeight: 1 }}>{value}</span>
        {unit && (
          <span className="mono" style={{ fontSize: 13, fontWeight: 700, opacity: 0.65 }}>{unit}</span>
        )}
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
        <div className="mono" style={{ fontSize: 11, fontWeight: 700 }}>
          <span style={{
            display: "inline-block",
            padding: "2px 6px",
            background: up ? "rgba(46,107,99,0.15)" : "rgba(186,26,26,0.15)",
            border: `2px solid ${fg}`,
            marginRight: 6,
          }}>{up ? "▲" : "▼"} {Math.abs(delta)}%</span>
          <span style={{ opacity: 0.7 }}>{deltaLabel}</span>
        </div>
        {spark && (
          <Sparkline
            data={spark}
            color={fg}
            fill={isDark ? "var(--peach)" : "var(--tweed)"}
            width={120}
            height={36}
          />
        )}
      </div>
    </div>
  );
}
