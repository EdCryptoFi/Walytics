import Link from "next/link";
import { IconFootprint, IconMagnify, IconWatch, IconBook } from "@/components/Mascot/DetectiveIcons";

interface CitedCardProps {
  cited: { kind: string; label?: string; count?: number };
}

export function CitedCard({ cited }: CitedCardProps) {
  const Icon = cited.kind === "publisher" ? IconFootprint
             : cited.kind === "anomaly"   ? IconMagnify
             : cited.kind === "forecast"  ? IconWatch
             : IconBook;
  return (
    <div className="brut" style={{
      marginTop: 10, padding: 10, background: "var(--paper-2)",
      display: "flex", alignItems: "center", gap: 10,
      borderStyle: "dashed", boxShadow: "4px 4px 0 0 var(--burgundy)"
    }}>
      <span style={{
        width: 28, height: 28, background: "var(--burgundy)", color: "var(--tusk)",
        border: "2.5px solid var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Icon size={14}/>
      </span>
      <div style={{ flex: 1 }}>
        <div className="kicker" style={{ fontSize: 9, color: "var(--burgundy)" }}>CITED EVIDENCE</div>
        <div className="mono" style={{ fontSize: 12, fontWeight: 800 }}>
          {cited.label ?? `${cited.count} findings`}
        </div>
      </div>
      <Link href="/explorer" className="mono" style={{
        fontSize: 10, fontWeight: 800, color: "var(--ink)",
        textDecoration: "none", padding: "5px 8px",
        border: "2px solid var(--ink)", background: "var(--mint)"
      }}>INSPECT →</Link>
    </div>
  );
}
