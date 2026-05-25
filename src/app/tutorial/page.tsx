"use client";

import { useState } from "react";
import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";
import { useFlashlight } from "@/components/Layout/FlashlightOverlay";

const steps = [
  {
    step: "01",
    title: "Connect your API Key",
    desc: "Get a free Tatum API key at dashboard.tatum.io and add it to .env.local. Walytics uses Tatum's Sui RPC endpoints to fetch on-chain blob data.",
    kicker: "First things first",
    bg: "var(--paper)",
  },
  {
    step: "02",
    title: "Explore the Dashboard",
    desc: "The main page shows aggregated Walrus metrics: total blobs filed, storage used, active publishers, size distributions, and timeline trends.",
    kicker: "The big picture",
    bg: "var(--peach)",
  },
  {
    step: "03",
    title: "Interrogate the AI",
    desc: "Head to AI Analytics and ask Holmes anything. Try: 'Who is the top publisher?' or 'What's the average blob size?' or 'How is storage trending?'",
    kicker: "Ask Holmes",
    bg: "var(--sticky)",
  },
  {
    step: "04",
    title: "Generate Reports",
    desc: "Click 'Generate Report' in the chat to produce an automated weekly analytics summary — trends, top publishers, and storage anomalies.",
    kicker: "Case summary",
    bg: "var(--paper-2)",
  },
];

const features = [
  { icon: "📈", title: "Analytics Dashboard", desc: "Real-time Walrus metrics: blob counts, storage totals, unique publishers, and average sizes. All data from the Sui blockchain via Tatum RPC.", bg: "var(--peach)" },
  { icon: "🔍", title: "Blob Explorer", desc: "Browse and search all blobs stored in Walrus. Filter by publisher, size, or storage type. Inspect individual blob evidence in the right panel.", bg: "var(--sticky)" },
  { icon: "🤖", title: "AI Analytics Chat", desc: "Ask natural language questions about the storage data. Gemini 2.0 Flash answers with analysis grounded in real-time metrics.", bg: "var(--paper-2)" },
  { icon: "📋", title: "Automatic Reports", desc: "One-click weekly analytics reports with trend analysis, top publisher breakdowns, and storage anomaly detection.", bg: "var(--paper)" },
  { icon: "🦭", title: "Walrus Dogfooding", desc: "Analytics snapshots are written back to Walrus as blobs — creating an immutable, verifiable history of the metrics themselves.", bg: "var(--peach)" },
  { icon: "🔗", title: "Tatum Sui RPC", desc: "Direct connection to Sui via Tatum RPC. On-chain queries for blob storage objects and Walrus protocol data, no middleman.", bg: "var(--paper-2)" },
];

const stack = [
  { label: "Frontend",   value: "Next.js 16 (App Router)" },
  { label: "Blockchain", value: "Tatum Sui RPC" },
  { label: "Storage",    value: "Walrus Protocol" },
  { label: "AI Engine",  value: "Gemini 2.0 Flash" },
];

export default function TutorialPage() {
  const { toggle: toggleFlashlight } = useFlashlight();
  const [zoomActive, setZoomActive] = useState(false);
  const [annotating, setAnnotating] = useState(false);

  function toggleZoom() {
    setZoomActive(z => {
      document.body.style.cursor = !z ? "zoom-in" : "";
      return !z;
    });
  }
  function toggleAnnotate() {
    setAnnotating(a => {
      document.body.style.cursor = !a ? "crosshair" : "";
      return !a;
    });
  }

  return (
    <div className="page-surface">
      <div className="container" style={{ paddingTop: 0 }}>
        <PageHead
          kicker="Field Manual"
          caseNo="W-0042-TUT"
          title={<>How to Run<br/>the Case.</>}
          lede="A field guide to Walytics — Walytics Holmes Edition. Learn the tools, read the evidence, interrogate the data."
        />

        {/* Steps — torn paper cards */}
        <section style={{ marginBottom: 32 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Procedure</div>
          <h2 className="h-display" style={{ fontSize: 28, marginBottom: 24 }}>How to Use</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="paper-hover animate-on-load jagged-edge"
                style={{
                  background: s.bg,
                  border: "3px solid var(--ink)",
                  boxShadow: "6px 6px 0 0 rgba(0,0,0,0.55)",
                  padding: "20px 22px 30px",
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${(i % 2 === 0 ? 0.4 : -0.4)}deg)`,
                }}
              >
                <div className="kicker" style={{ marginBottom: 10, fontSize: 9 }}>{s.kicker}</div>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{
                    width: 40, height: 40,
                    background: "var(--ink)", color: "var(--tusk)",
                    border: "2px solid var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
                    flexShrink: 0,
                  }}>{s.step}</span>
                  <div>
                    <div className="h-display" style={{ fontSize: 19, marginBottom: 10 }}>{s.title}</div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ marginBottom: 32 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Capabilities</div>
          <h2 className="h-display" style={{ fontSize: 28, marginBottom: 24 }}>Features</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <div key={f.title} className="paper-hover animate-on-load" style={{
                background: f.bg,
                border: "3px solid var(--ink)",
                boxShadow: "5px 5px 0 0 rgba(0,0,0,0.5)",
                padding: "18px 20px",
                animationDelay: `${0.4 + i * 0.08}s`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <div className="h-display" style={{ fontSize: 18, marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section style={{
          background: "var(--surface)",
          border: "4px solid var(--ink)",
          boxShadow: "6px 6px 0 0 rgba(0,0,0,0.6)",
          padding: "24px 26px",
          marginBottom: 24,
        }}>
          <div className="kicker" style={{ marginBottom: 6 }}>Under the Magnifying Glass</div>
          <h2 className="h-display" style={{ fontSize: 28, marginBottom: 20 }}>Tech Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14 }}>
            {stack.map((s) => (
              <div key={s.label} style={{
                background: "var(--paper-2)",
                border: "2px solid var(--ink)",
                boxShadow: "3px 3px 0 0 rgba(0,0,0,0.4)",
                padding: "12px 16px",
              }}>
                <div className="kicker" style={{ fontSize: 9 }}>{s.label}</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <div style={{
          background: "var(--paper-2)",
          border: "3px solid var(--ink)",
          boxShadow: "4px 4px 0 0 rgba(0,0,0,0.5)",
          padding: "20px 24px",
          display: "flex", gap: 12, flexWrap: "wrap",
          marginBottom: 24,
        }}>
          <a href="https://docs.wal.app" target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }}>Walrus Docs →</a>
          <a href="https://tatum.io/mcp" target="_blank" rel="noopener noreferrer"
             className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }}>Tatum MCP →</a>
          <a href="https://github.com/EdCryptoFi/Walytics" target="_blank" rel="noopener noreferrer"
             className="btn" style={{ padding: "10px 16px", fontSize: 13 }}>GitHub Repo →</a>
          <a href="/docs" className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }}>Full Docs →</a>
        </div>

        <Footer/>
      </div>

      {/* Detective's Toolkit dock — fixed bottom */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 0, zIndex: 20,
        border: "3px solid var(--ink)",
        borderBottom: "none",
        boxShadow: "0 -4px 0 0 rgba(0,0,0,0.5)",
        background: "var(--ink)",
      }}>
        {([
          { icon: "🔍", label: "Zoom",       active: zoomActive,   fn: toggleZoom },
          { icon: "🔦", label: "Flashlight", active: false,         fn: toggleFlashlight },
          { icon: "✏️", label: "Annotate",   active: annotating,   fn: toggleAnnotate },
        ] as {icon:string; label:string; active:boolean; fn:()=>void}[]).map((t) => (
          <button key={t.label} onClick={t.fn} style={{
            padding: "10px 20px",
            background: t.active ? "rgba(255,255,255,0.15)" : "transparent",
            color: "var(--tusk)",
            border: "none",
            borderRight: "2px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "background 0.15s",
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
