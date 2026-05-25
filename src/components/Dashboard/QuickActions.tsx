import Link from "next/link";
import { IconChat, IconLoupe, IconKey, IconBook } from "@/components/Mascot/DetectiveIcons";

const actions = [
  { href: "/chat",     label: "Interrogate the AI",   sub: "Ask about storage trends",   accent: "btn-burgundy", Icon: IconChat },
  { href: "/explorer", label: "Inspect Recent Blobs", sub: "Browse the evidence locker", accent: "btn-mint",     Icon: IconLoupe },
  { href: "/explorer", label: "Subpoena a Publisher", sub: "Filter by 0x address",       accent: "btn-gold",     Icon: IconKey },
  { href: "/docs",     label: "Open the Case Log",    sub: "View API docs & reports",    accent: "",             Icon: IconBook },
];

export function QuickActions() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
      {actions.map((a, i) => (
        <Link key={i} href={a.href} className={`btn ${a.accent}`}
           style={{ padding: 16, justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a.Icon size={18}/>
            <span style={{ fontSize: 14 }}>{a.label}</span>
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, opacity: 0.85, textTransform: "none", letterSpacing: "0" }}>
            {a.sub}
          </span>
        </Link>
      ))}
    </div>
  );
}
