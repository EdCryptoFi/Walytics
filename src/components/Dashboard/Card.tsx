import { ReactNode, CSSProperties } from "react";

interface CardProps {
  title: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
  accent?: "paper" | "mint" | "gold" | "paper2";
  tape?: boolean;
  style?: CSSProperties;
}

const accentBg: Record<string, string> = {
  paper:  "var(--paper)",
  mint:   "var(--mint)",
  gold:   "var(--gold)",
  paper2: "var(--paper-2)",
};

export function Card({ title, kicker, action, children, accent = "paper", tape = false, style = {} }: CardProps) {
  return (
    <section className="brut" style={{ background: accentBg[accent] ?? "var(--paper)", padding: "20px 22px 22px", ...style }}>
      {tape && <span className="tape"/>}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 14 }}>
        <div>
          {kicker && <div className="kicker">{kicker}</div>}
          <h2 className="h-display" style={{ fontSize: 26, margin: "2px 0 0" }}>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
