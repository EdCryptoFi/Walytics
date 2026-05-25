import { ReactNode } from "react";

interface PageHeadProps {
  kicker?: string;
  title: ReactNode;
  lede?: string;
  caseNo?: string;
  accentColor?: string;
}

export function PageHead({ kicker, title, lede, caseNo }: PageHeadProps) {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <header style={{
      background: "var(--paper)",
      border: "4px solid var(--ink)",
      boxShadow: "8px 8px 0 0 rgba(0,0,0,0.6)",
      padding: "40px 40px 32px",
      marginBottom: 32,
      position: "relative",
    }}>
      {/* Date stamp top-right */}
      <div style={{
        position: "absolute", top: 16, right: 20,
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--ink-soft)", letterSpacing: "0.08em",
      }}>
        {today}
      </div>

      {/* Case number badge */}
      {caseNo && (
        <div style={{
          position: "absolute", top: 16, left: 20,
          fontFamily: "var(--font-mono)", fontSize: 10,
          color: "var(--ink-soft)", letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          FILE № <strong>{caseNo}</strong>
        </div>
      )}

      {kicker && (
        <div className="kicker" style={{ marginBottom: 10, marginTop: caseNo ? 18 : 0, color: "var(--secondary)" }}>
          {kicker}
        </div>
      )}

      <h1 className="h-display" style={{
        fontSize: "clamp(52px, 6.5vw, 88px)",
        margin: "6px 0 16px",
        color: "var(--ink)",
      }}>
        {title}
      </h1>

      {lede && (
        <p style={{
          maxWidth: 640,
          fontSize: 16,
          lineHeight: 1.65,
          margin: 0,
          fontFamily: "var(--font-mono)",
          fontStyle: "italic",
          color: "var(--ink-soft)",
          borderLeft: "4px solid var(--secondary)",
          paddingLeft: 18,
        }}>
          {lede}
        </p>
      )}
    </header>
  );
}
