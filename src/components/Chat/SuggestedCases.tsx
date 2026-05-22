"use client";

const SUGGESTED = [
  { q: "Who's hoarding the largest blobs?",             emoji: "🧐" },
  { q: "Show me publishers that went quiet last week.", emoji: "🤐" },
  { q: "Forecast storage growth for the next 30 days.", emoji: "🔮" },
  { q: "Anything suspicious in the > 10 MB bucket?",   emoji: "🚨" },
  { q: "Which file types are growing fastest?",         emoji: "📈" },
  { q: "Find duplicate blobs across publishers.",       emoji: "👯" },
];

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
      <div className="kicker" style={{ marginBottom: 8 }}>Suggested cases</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {SUGGESTED.map((s, i) => (
          <button key={i} onClick={() => onSend(s.q)} disabled={disabled}
            className="btn" style={{ padding: "8px 12px", fontSize: 11, boxShadow: "3px 3px 0 0 var(--ink)" }}>
            <span style={{ fontSize: 14 }}>{s.emoji}</span> {s.q}
          </button>
        ))}
      </div>
    </div>
  );
}
