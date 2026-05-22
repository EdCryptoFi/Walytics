import { ReactNode } from "react";

interface PageHeadProps {
  kicker?: string;
  title: ReactNode;
  lede?: string;
  caseNo?: string;
  accentColor?: string;
}

export function PageHead({ kicker, title, lede, caseNo, accentColor }: PageHeadProps) {
  return (
    <header className="page-head">
      <div className="case-no">
        FILE № <strong>{caseNo}</strong> · {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
      {kicker && <div className="kicker" style={{ color: accentColor }}>{kicker}</div>}
      <h1>{title}</h1>
      {lede && (
        <p style={{ maxWidth: 720, fontSize: 17, lineHeight: 1.5, margin: 0, color: "var(--ink-soft)" }}>{lede}</p>
      )}
    </header>
  );
}
