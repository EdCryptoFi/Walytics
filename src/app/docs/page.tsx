import { PageHead } from "@/components/Layout/PageHead";
import { Footer } from "@/components/Layout/Footer";

const sections = [
  {
    id: "overview",
    title: "Overview",
    kicker: "📖 What is this",
    content: `Walytics is a real-time analytics and exploration platform for Walrus decentralized storage on Sui.
It indexes blob storage activity, visualizes patterns, and provides AI-powered insights via Gemini.
Built with Tatum's Sui RPC for on-chain data access and the Walrus protocol for storage.`,
  },
  {
    id: "architecture",
    title: "Architecture",
    kicker: "🏗️ How it's built",
    nodes: [
      { label: "Frontend",    value: "Next.js 16 (App Router), Tailwind v4" },
      { label: "Backend API", value: "Next.js API Routes (serverless)" },
      { label: "Blockchain",  value: "Tatum Sui RPC (sui-mainnet.gateway.tatum.io)" },
      { label: "AI Engine",   value: "Google Gemini 2.0 Flash" },
      { label: "Storage",     value: "Walrus Protocol (decentralized blobs)" },
      { label: "Deploy",      value: "Netlify (Next.js Runtime)" },
    ],
    flow: [
      "User → Next.js App → API Routes → Tatum Sui RPC → Sui Blockchain",
      "API Routes → Analytics Engine → Walrus Blob Storage (snapshots)",
      "API Routes → Gemini AI → Chat responses & Reports",
    ],
  },
  {
    id: "api",
    title: "API Endpoints",
    kicker: "🔌 Routes",
    endpoints: [
      { route: "GET /api/analytics",   desc: "Aggregated Walrus metrics (blobs, publishers, trends)" },
      { route: "GET /api/blobs",        desc: "Paginated list of stored blobs" },
      { route: "POST /api/chat",        desc: "AI chat + report generation (Gemini)" },
      { route: "POST /api/tatum",       desc: "Generic proxy to Tatum Sui RPC" },
      { route: "POST /api/snapshot",    desc: "Save analytics snapshot to Walrus (write-back)" },
    ],
  },
  {
    id: "tatum",
    title: "Tatum Integration",
    kicker: "🔗 On-chain data",
    details: [
      "Endpoint: https://sui-mainnet.gateway.tatum.io",
      "Auth: x-api-key header",
      "Methods: sui_getLatestCheckpointSequenceNumber, suix_getOwnedObjects",
      "SDK: @tatumio/tatum (configured in src/lib/tatum.ts)",
    ],
  },
  {
    id: "walrus",
    title: "Walrus Integration",
    kicker: "🦭 Decentralized storage",
    details: [
      "Read: Query blob metadata from Walrus storage objects on Sui",
      "Write: Analytics snapshots stored as Walrus blobs (dogfooding)",
      "Storage types: permanent (70%) and ephemeral (30%)",
      "Erasure code: redStuff (Walrus default)",
    ],
  },
  {
    id: "ai",
    title: "AI Features",
    kicker: "🤖 Holmes intelligence",
    details: [
      "Model: Gemini 2.0 Flash (free tier, 1500 req/day)",
      "Chat: Natural language queries about storage data",
      "Reports: One-click weekly analytics summary",
      "Context: Injects real-time metrics into each query",
    ],
  },
  {
    id: "setup",
    title: "Setup",
    kicker: "⚙️ Get running",
    steps: [
      "Get Tatum API key at https://dashboard.tatum.io",
      "Get Gemini API key at https://aistudio.google.com",
      "Clone repo: git clone https://github.com/EdCryptoFi/Walytics",
      "Copy .env.local.example → .env.local and fill keys",
      "npm install && npm run dev",
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <PageHead
        kicker="📚 Case file documentation"
        caseNo="W-0042-DOCS"
        title={<>The Casebook.</>}
        lede="Technical documentation, architecture, and API reference for Walytics — Walytics Holmes Edition."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 22 }}>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="brut" style={{ padding: "20px 22px 22px" }}>
            <div className="kicker" style={{ marginBottom: 4 }}>{section.kicker}</div>
            <h2 className="h-display" style={{ fontSize: 28, marginBottom: 16 }}>{section.title}</h2>

            {"content" in section && typeof section.content === "string" && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 760 }}>
                {section.content}
              </p>
            )}

            {"nodes" in section && section.nodes && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12, marginBottom: 16 }}>
                {section.nodes.map((n) => (
                  <div key={n.label} className="brut brut-paper2" style={{ padding: "10px 14px" }}>
                    <div className="kicker" style={{ fontSize: 9 }}>{n.label}</div>
                    <div className="mono" style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{n.value}</div>
                  </div>
                ))}
              </div>
            )}

            {"flow" in section && section.flow && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {section.flow.map((line, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{
                      width: 24, height: 24, background: "var(--burgundy)", color: "var(--tusk)",
                      border: "2px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 800, flexShrink: 0
                    }}>{i+1}</span>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-soft)", paddingTop: 4 }}>{line}</code>
                  </div>
                ))}
              </div>
            )}

            {"endpoints" in section && section.endpoints && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {section.endpoints.map((ep) => (
                  <div key={ep.route} className="brut brut-paper2" style={{ padding: "10px 14px" }}>
                    <code className="mono" style={{ fontSize: 13, fontWeight: 800, color: "var(--tweed)" }}>{ep.route}</code>
                    <p style={{ marginTop: 4, fontSize: 13, color: "var(--ink-soft)" }}>{ep.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {"details" in section && section.details && (
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, listStyle: "none" }}>
                {section.details.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 10, height: 10, background: "var(--mint)", border: "2px solid var(--ink)", flexShrink: 0, marginTop: 5 }}/>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)" }}>{d}</span>
                  </li>
                ))}
              </ul>
            )}

            {"steps" in section && section.steps && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {section.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      width: 28, height: 28, background: "var(--gold)", border: "2.5px solid var(--ink)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 14, flexShrink: 0
                    }}>{i+1}</span>
                    <code className="mono" style={{ fontSize: 13, lineHeight: 1.6, paddingTop: 4 }}>{step}</code>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Links */}
      <div className="brut" style={{ padding: "18px 22px", background: "var(--paper-2)", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <a href="https://github.com/EdCryptoFi/Walytics" target="_blank" rel="noopener noreferrer"
           className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 12 }}>GitHub Repo →</a>
        <a href="https://walytics.netlify.app" target="_blank" rel="noopener noreferrer"
           className="btn btn-mint" style={{ padding: "10px 16px", fontSize: 12 }}>Live Demo →</a>
        <a href="/tutorial" className="btn" style={{ padding: "10px 16px", fontSize: 12 }}>Tutorial →</a>
      </div>

      <Footer/>
    </div>
  );
}
