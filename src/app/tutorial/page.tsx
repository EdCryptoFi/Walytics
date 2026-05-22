import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";

const steps = [
  {
    step: "1",
    title: "Connect your API Key",
    desc: "Get a free Tatum API key at dashboard.tatum.io and add it to .env.local. Walytics uses Tatum's Sui RPC endpoints to fetch on-chain blob data.",
    kicker: "⚙️ First things first",
  },
  {
    step: "2",
    title: "Explore the Dashboard",
    desc: "The main page shows aggregated Walrus metrics: total blobs filed, storage used, active publishers, size distributions, and timeline trends.",
    kicker: "📊 The big picture",
  },
  {
    step: "3",
    title: "Interrogate the AI",
    desc: "Head to AI Analytics and ask Holmes anything. Try: 'Who is the top publisher?' or 'What's the average blob size?' or 'How is storage trending?'",
    kicker: "🚬 Ask Holmes",
  },
  {
    step: "4",
    title: "Generate Reports",
    desc: "Click 'Generate Report' in the chat to produce an automated weekly analytics summary — trends, top publishers, and storage anomalies.",
    kicker: "📋 Case summary",
  },
];

const features = [
  {
    icon: "📈",
    title: "Analytics Dashboard",
    desc: "Real-time Walrus metrics: blob counts, storage totals, unique publishers, and average sizes. All data from the Sui blockchain via Tatum RPC.",
    accent: "var(--mint)",
  },
  {
    icon: "🔍",
    title: "Blob Explorer",
    desc: "Browse and search all blobs stored in Walrus. Filter by publisher, size, or storage type. Inspect individual blob evidence in the right panel.",
    accent: "var(--gold)",
  },
  {
    icon: "🤖",
    title: "AI Analytics Chat",
    desc: "Ask natural language questions about the storage data. Gemini 2.0 Flash answers with analysis grounded in real-time metrics.",
    accent: "var(--paper-2)",
  },
  {
    icon: "📋",
    title: "Automatic Reports",
    desc: "One-click weekly analytics reports with trend analysis, top publisher breakdowns, and storage anomaly detection.",
    accent: "var(--burgundy)",
  },
  {
    icon: "🦭",
    title: "Walrus Dogfooding",
    desc: "Analytics snapshots are written back to Walrus as blobs — creating an immutable, verifiable history of the metrics themselves.",
    accent: "var(--tweed)",
  },
  {
    icon: "🔗",
    title: "Tatum Sui RPC",
    desc: "Direct connection to Sui via Tatum RPC. On-chain queries for blob storage objects and Walrus protocol data, no middleman.",
    accent: "var(--rust)",
  },
];

const stack = [
  { label: "Frontend",    value: "Next.js 16 (App Router), Tailwind v4" },
  { label: "Blockchain",  value: "Tatum Sui RPC" },
  { label: "Storage",     value: "Walrus Protocol" },
  { label: "AI Engine",   value: "Gemini 2.0 Flash" },
];

export default function TutorialPage() {
  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <PageHead
        kicker="📖 Field manual"
        caseNo="W-0042-TUT"
        title={<>How to Run<br/>the Case.</>}
        lede="A field guide to Walytics — Walrus Holmes Edition. Learn the tools, read the evidence, interrogate the data."
      />

      {/* Steps */}
      <section style={{ marginBottom: 28 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>🔢 Procedure</div>
        <h2 className="h-display" style={{ fontSize: 26, marginBottom: 18 }}>How to Use</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {steps.map((s) => (
            <div key={s.step} className="brut" style={{ padding: "18px 20px 20px" }}>
              <div className="kicker" style={{ marginBottom: 6, fontSize: 9 }}>{s.kicker}</div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  width: 36, height: 36, background: "var(--gold)", border: "2.5px solid var(--ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 16, flexShrink: 0
                }}>{s.step}</span>
                <div>
                  <div className="h-display" style={{ fontSize: 18, marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: 28 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>🧰 Capabilities</div>
        <h2 className="h-display" style={{ fontSize: 26, marginBottom: 18 }}>Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {features.map((f) => (
            <div key={f.title} className="brut" style={{ padding: "16px 18px", background: f.accent }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div className="h-display" style={{ fontSize: 17, marginBottom: 8 }}>{f.title}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="brut" style={{ padding: "20px 22px 22px", marginBottom: 22 }}>
        <div className="kicker" style={{ marginBottom: 4 }}>⚙️ Under the magnifying glass</div>
        <h2 className="h-display" style={{ fontSize: 26, marginBottom: 16 }}>Tech Stack</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12 }}>
          {stack.map((s) => (
            <div key={s.label} className="brut brut-paper2" style={{ padding: "10px 14px" }}>
              <div className="kicker" style={{ fontSize: 9 }}>{s.label}</div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <div className="brut" style={{ padding: "18px 22px", background: "var(--paper-2)", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <a href="https://docs.wal.app" target="_blank" rel="noopener noreferrer"
           className="btn" style={{ padding: "10px 16px", fontSize: 12 }}>Walrus Docs →</a>
        <a href="https://tatum.io/mcp" target="_blank" rel="noopener noreferrer"
           className="btn" style={{ padding: "10px 16px", fontSize: 12 }}>Tatum MCP →</a>
        <a href="https://github.com/EdCryptoFi/Walytics" target="_blank" rel="noopener noreferrer"
           className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 12 }}>GitHub Repo →</a>
        <a href="/docs" className="btn btn-mint" style={{ padding: "10px 16px", fontSize: 12 }}>Full Docs →</a>
      </div>

      <Footer/>
    </div>
  );
}
