"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFlashlight } from "@/components/Layout/FlashlightOverlay";

const links = [
  { id: "dashboard", href: "/",         label: "Dashboard" },
  { id: "explorer",  href: "/explorer", label: "Blob Explorer" },
  { id: "chat",      href: "/chat",     label: "AI Analytics" },
  { id: "tutorial",  href: "/tutorial", label: "Tutorial" },
];

export function Nav() {
  const pathname = usePathname();
  const current = links.find(l => l.href === pathname)?.id ?? "dashboard";
  const { toggle } = useFlashlight();

  return (
    <nav className="nav">
      <Link className="nav-logo" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/way1.png" alt="Walytics" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 2 }}/>
        <span>WALYTICS</span>
      </Link>
      <span className="nav-tag">CASE 0042</span>
      <div className="nav-links">
        {links.map(l => (
          <Link key={l.id} href={l.href}
               aria-current={current === l.id ? "page" : undefined}
               className="nav-link">
            {l.label}
          </Link>
        ))}
      </div>
      <button
        onClick={toggle}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 18px",
          background: "var(--secondary)",
          color: "var(--tusk)",
          border: "2px solid var(--ink)",
          borderBottom: "4px solid var(--ink)",
          fontFamily: "var(--font-display)",
          fontSize: 13, fontWeight: 800,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>search_insights</span>
        Investigate
      </button>
      <Link href="/explorer" style={{
        padding: "10px 20px",
        background: "var(--ink)",
        color: "var(--tusk)",
        fontFamily: "var(--font-display)",
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "2px solid var(--ink)",
        borderBottom: "4px solid rgba(0,0,0,0.5)",
        whiteSpace: "nowrap",
      }}>
        Open Case
      </Link>
    </nav>
  );
}
