"use client";

import { useState } from "react";
import { useTheme } from "@/components/Layout/ThemeProvider";

type Palette = "mint" | "burgundy" | "indigo" | "mustard";
type Pattern = "map" | "plain" | "tartan";
type TypoType = "chunky" | "victorian" | "mono";

const PALETTES: { value: Palette; label: string; colors: string[] }[] = [
  { value: "mint",     label: "Mint Holmes",  colors: ["#8CC4BE", "#2E4A3B", "#C9A24A", "#F2E8D2"] },
  { value: "burgundy", label: "Crimson Tweed", colors: ["#5C1F1F", "#8E3A3A", "#D4A04A", "#F2E8D2"] },
  { value: "indigo",   label: "Nocturne",     colors: ["#1F2A4A", "#3A4878", "#E8C967", "#F2E8D2"] },
  { value: "mustard",  label: "Mustard Inn",  colors: ["#3E3416", "#C9A24A", "#B85230", "#EDDDA8"] },
];

const PATTERNS: { value: Pattern; label: string }[] = [
  { value: "map",    label: "Map" },
  { value: "plain",  label: "Plain" },
  { value: "tartan", label: "Tartan" },
];

const TYPO: { value: TypoType; label: string }[] = [
  { value: "chunky",    label: "Chunky" },
  { value: "victorian", label: "Victorian" },
  { value: "mono",      label: "Mono" },
];

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const { animations, dark, type, palette, pattern, setTheme } = useTheme();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 20, right: open ? 296 : 20, zIndex: 100,
          width: 44, height: 44,
          background: "var(--ink)", color: "var(--paper)",
          border: "3px solid var(--ink)",
          boxShadow: "4px 4px 0 0 var(--gold)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: 20,
          transition: "right 0.2s ease"
        }}
        title="Tweaks"
      >
        🎩
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: "fixed", right: 20, bottom: 20, zIndex: 99,
          width: 272, maxHeight: "calc(100vh - 40px)",
          background: "var(--paper)", border: "3px solid var(--ink)",
          boxShadow: "8px 8px 0 0 var(--ink)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          <div style={{
            padding: "12px 16px",
            background: "var(--ink)", color: "var(--paper)",
            fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 13,
            letterSpacing: "0.1em",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            🎩 TWEAKS
            <button onClick={() => setOpen(false)} style={{
              background: "transparent", border: "none", color: "var(--paper)",
              cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 800, padding: 0
            }}>✕</button>
          </div>

          <div style={{ padding: "14px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Animations */}
            <section>
              <div className="kicker" style={{ marginBottom: 8 }}>Walrus</div>
              <Row label="Animations">
                <Toggle value={animations} onChange={v => setTheme("animations", v)}/>
              </Row>
              <Row label="Dark cabinet">
                <Toggle value={dark} onChange={v => setTheme("dark", v)}/>
              </Row>
            </section>

            {/* Palette */}
            <section>
              <div className="kicker" style={{ marginBottom: 8 }}>Palette</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PALETTES.map(p => (
                  <button key={p.value} onClick={() => setTheme("palette", p.value)} style={{
                    border: palette === p.value ? "3px solid var(--ink)" : "2px solid rgba(0,0,0,0.2)",
                    boxShadow: palette === p.value ? "3px 3px 0 0 var(--ink)" : "none",
                    background: p.colors[0], padding: "8px 10px",
                    cursor: "pointer", textAlign: "left",
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700
                  }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {p.colors.map((c, i) => (
                        <span key={i} style={{ width: 14, height: 14, background: c, border: "1px solid rgba(0,0,0,0.2)" }}/>
                      ))}
                    </div>
                    {p.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Pattern */}
            <section>
              <div className="kicker" style={{ marginBottom: 8 }}>Background</div>
              <div style={{ display: "flex", gap: 6 }}>
                {PATTERNS.map(p => (
                  <button key={p.value} onClick={() => setTheme("pattern", p.value)} className="btn" style={{
                    flex: 1, padding: "8px 4px", fontSize: 10,
                    background: pattern === p.value ? "var(--ink)" : "var(--paper)",
                    color: pattern === p.value ? "var(--paper)" : "var(--ink)",
                    boxShadow: "3px 3px 0 0 var(--ink)"
                  }}>{p.label}</button>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section>
              <div className="kicker" style={{ marginBottom: 8 }}>Typography</div>
              <div style={{ display: "flex", gap: 6 }}>
                {TYPO.map(t => (
                  <button key={t.value} onClick={() => setTheme("type", t.value)} className="btn" style={{
                    flex: 1, padding: "8px 4px", fontSize: 10,
                    background: type === t.value ? "var(--ink)" : "var(--paper)",
                    color: type === t.value ? "var(--paper)" : "var(--ink)",
                    boxShadow: "3px 3px 0 0 var(--ink)"
                  }}>{t.label}</button>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} style={{
      width: 40, height: 22, borderRadius: 0,
      background: value ? "var(--tweed)" : "var(--paper-2)",
      border: "2px solid var(--ink)",
      cursor: "pointer", position: "relative",
      transition: "background 0.15s"
    }}>
      <span style={{
        position: "absolute", top: 2,
        left: value ? "calc(100% - 18px)" : 2,
        width: 14, height: 14,
        background: value ? "var(--tusk)" : "var(--ink)",
        transition: "left 0.15s"
      }}/>
    </button>
  );
}
