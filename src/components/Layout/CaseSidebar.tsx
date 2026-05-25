"use client";

import Link from "next/link";
import { RandomCharacter } from "@/components/UI/RandomCharacter";

interface CaseSidebarProps {
  activePage: "chat" | "explorer";
}

const navItems = [
  { icon: "folder_open",  label: "Evidence Locker",     href: "/explorer" },
  { icon: "groups",       label: "Persons of Interest",  href: "/explorer" },
  { icon: "description",  label: "Case Logs",            href: "/chat" },
  { icon: "psychology",   label: "AI Analytics",         href: "/chat" },
  { icon: "menu_book",    label: "Field Manual",         href: "/tutorial" },
];

const pageToNav: Record<string, string[]> = {
  explorer: ["Evidence Locker", "Persons of Interest"],
  chat:     ["Case Logs", "AI Analytics"],
};

export function CaseSidebar({ activePage }: CaseSidebarProps) {
  const activeLabels = pageToNav[activePage] ?? [];

  return (
    <aside style={{
      position: "sticky",
      top: 68,
      alignSelf: "flex-start",
      width: 256,
      minWidth: 256,
      height: "calc(100vh - 68px)",
      background: "var(--surface-c)",
      borderRight: "4px solid var(--ink)",
      boxShadow: "8px 0 0 0 rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 30,
    }}>
      {/* Character portrait */}
      <div style={{
        padding: "28px 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderBottom: "3px solid var(--ink)",
      }}>
        <div style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          border: "3px solid var(--ink)",
          overflow: "hidden",
          marginBottom: 12,
          background: "var(--paper-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <RandomCharacter width={88} height={88} alt="Walytics Holmes"/>
        </div>
        <div className="h-display" style={{ fontSize: 16, marginBottom: 2 }}>Walytics Holmes</div>
        <div className="mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Consulting Analyst
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: 8 }}>
        {navItems.map((item) => {
          const isActive = activeLabels.includes(item.label);
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                textDecoration: "none",
                background: isActive ? "var(--ink)" : "transparent",
                color: isActive ? "var(--tusk)" : "var(--ink-soft)",
                borderLeft: isActive ? "6px solid var(--secondary)" : "6px solid transparent",
                transition: "all 0.15s ease",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: "16px 20px 20px", borderTop: "2px solid var(--outline)", display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 10,
          color: "var(--ink-soft)", textDecoration: "none",
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>dashboard</span>
          Dashboard
        </Link>
        <Link href="/tutorial" style={{
          display: "flex", alignItems: "center", gap: 10,
          color: "var(--ink-soft)", textDecoration: "none",
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7,
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>help_outline</span>
          Help
        </Link>
      </div>
    </aside>
  );
}
