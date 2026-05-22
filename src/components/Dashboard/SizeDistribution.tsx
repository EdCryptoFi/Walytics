interface SizeDistributionProps {
  data: { range: string; count: number }[];
}

const COLORS = [
  "var(--mint)",
  "var(--gold)",
  "var(--tweed)",
  "var(--burgundy)",
  "var(--rust)",
  "var(--ink)",
];

export function SizeDistribution({ data }: SizeDistributionProps) {
  const total = data.reduce((s, b) => s + b.count, 0) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.map((b, i) => {
        const pct = (b.count / total) * 100;
        const hatched = i === data.length - 1;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 90px", alignItems: "center", gap: 12 }}>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{b.range}</span>
            <div style={{ height: 24, border: "2.5px solid var(--ink)", background: "var(--paper-2)", position: "relative", overflow: "hidden" }}>
              <div style={{
                width: `${pct}%`, height: "100%", background: COLORS[i] ?? "var(--ink)",
                borderRight: "2.5px solid var(--ink)",
                backgroundImage: hatched
                  ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 4px, transparent 4px 8px)" : "none",
                transition: "width 0.6s cubic-bezier(.34,1.56,.64,1)"
              }}/>
              <span style={{
                position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                color: "var(--ink)", mixBlendMode: "multiply"
              }}>{pct.toFixed(1)}%</span>
            </div>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700, textAlign: "right" }}>
              {b.count.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
