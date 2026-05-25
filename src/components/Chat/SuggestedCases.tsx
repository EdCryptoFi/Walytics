"use client";

const SUGGESTED = [
  { q: "Who's hoarding the largest blobs?",             emoji: "🧐" },
  { q: "Show me publishers that went quiet last week.", emoji: "🤐" },
  { q: "Forecast storage growth for the next 30 days.", emoji: "🔮" },
  { q: "Anything suspicious in the > 10 MB bucket?",   emoji: "🚨" },
  { q: "Which file types are growing fastest?",         emoji: "📈" },
  { q: "Find duplicate blobs across publishers.",       emoji: "👯" },
];

const CASE_BG = ["var(--paper)", "var(--peach)", "var(--sticky)", "var(--paper-2)"];

/* Deterministic pseudo-random rotation per index */
function caseRotation(i: number): number {
  const vals = [-0.8, 0.6, -0.4, 1.0, -1.0, 0.3];
  return vals[i % vals.length];
}

interface SuggestedCasesProps {
  onSend: (msg: string) => void;
  disabled: boolean;
}

export function SuggestedCases({ onSend, disabled }: SuggestedCasesProps) {
  return (
    <div style={{
      borderTop: "3px solid var(--ink)",
      padding: "12px 16px",
      background: "var(--paper-2)"
    }}>
      <div className="kicker" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>search</span>
        Suggested cases
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {SUGGESTED.map((s, i) => (
          <button key={i} onClick={() => onSend(s.q)} disabled={disabled}
            className="btn" style={{
              padding: "8px 12px", fontSize: 15,
              boxShadow: "3px 3px 0 0 var(--ink)",
              background: CASE_BG[i % CASE_BG.length],
              color: "var(--ink)",
              transform: `rotate(${caseRotation(i)}deg)`,
              position: "relative",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}>
            {/* Pushpin effect */}
            <span className="material-symbols-outlined" style={{
              position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
              fontSize: 14, color: "var(--burgundy)", pointerEvents: "none",
            }}>push_pin</span>
            <span style={{ fontSize: 14 }}>{s.emoji}</span> {s.q}
          </button>
        ))}
      </div>
    </div>
  );
}
