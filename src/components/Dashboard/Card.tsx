import { ReactNode, CSSProperties } from "react";

interface CardProps {
  title: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
  accent?: "paper" | "mint" | "gold" | "paper2" | "cream" | "sticky";
  tape?: boolean;
  style?: CSSProperties;
}

const accentBg: Record<string, string> = {
  paper:  "var(--paper)",
  mint:   "var(--peach)",
  gold:   "var(--paper-2)",
  paper2: "var(--paper-2)",
  cream:  "var(--cream)",
  sticky: "var(--sticky)",
};

export function Card({ title, kicker, action, children, accent = "paper", tape = false, style = {} }: CardProps) {
  return (
    <section style={{
      background: accentBg[accent] ?? "var(--paper)",
      border: "4px solid var(--ink)",
      boxShadow: "6px 6px 0 0 rgba(0,0,0,0.6)",
      padding: "24px 24px 22px",
      position: "relative",
      ...style,
    }}>
      {tape && <span className="tape"/>}
      <header style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", gap: 16, marginBottom: 18,
      }}>
        <div>
          {kicker && <div className="kicker">{kicker}</div>}
          <h2 className="h-display" style={{ fontSize: 24, margin: "4px 0 0" }}>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
