import { Card, CardContent } from "@/components/ui/card"
import { CodeXml, Database, Cpu, Bot, ExternalLink, BookOpen, Workflow } from "lucide-react"

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    content: `Walytics is a real-time analytics and exploration platform for Walrus decentralized storage on Sui.
It indexes blob storage activity, visualizes patterns, and provides AI-powered insights via Gemini.
Built with Tatum's Sui RPC for on-chain data access and the Walrus protocol for storage.`,
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Workflow,
    content: [],
    nodes: [
      { label: "Frontend", value: "Next.js 16 (App Router), Tailwind v4, Recharts" },
      { label: "Backend API", value: "Next.js API Routes (serverless)" },
      { label: "Blockchain", value: "Tatum Sui RPC (sui-mainnet.gateway.tatum.io)" },
      { label: "AI Engine", value: "Google Gemini 2.0 Flash (free tier)" },
      { label: "Storage", value: "Walrus Protocol (decentralized blobs)" },
      { label: "Deploy", value: "Netlify (Next.js Runtime)" },
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
    icon: CodeXml,
    endpoints: [
      { route: "GET /api/analytics", desc: "Aggregated Walrus metrics (blobs, publishers, trends)" },
      { route: "GET /api/blobs", desc: "Paginated list of stored blobs" },
      { route: "POST /api/chat", desc: "AI chat + report generation (Gemini)" },
      { route: "POST /api/tatum", desc: "Generic proxy to Tatum Sui RPC" },
      { route: "POST /api/snapshot", desc: "Save analytics snapshot to Walrus (write-back)" },
    ],
  },
  {
    id: "tatum",
    title: "Tatum Integration",
    icon: Database,
    details: [
      "Endpoint: https://sui-mainnet.gateway.tatum.io",
      "Auth: x-api-key header",
      "Methods used: sui_getLatestCheckpointSequenceNumber, suix_getOwnedObjects",
      "SDK: @tatumio/tatum (configured in src/lib/tatum.ts)",
      "Status: Connected (verified on Sui Mainnet, block #278M+)",
    ],
  },
  {
    id: "walrus",
    title: "Walrus Integration",
    icon: Database,
    details: [
      "Read: Query blob metadata from Walrus storage objects on Sui",
      "Write: Analytics snapshots stored as Walrus blobs (dogfooding)",
      "Snapshots include: metrics snapshot, timestamp, prev hash chain",
      "Storage types: permanent (70%) and ephemeral (30%)",
      "Erasure code: redStuff (Walrus default)",
    ],
  },
  {
    id: "ai",
    title: "AI Features",
    icon: Bot,
    details: [
      "Model: Gemini 2.0 Flash (free tier, 1500 req/day)",
      "Chat: Natural language queries about storage data",
      "Reports: One-click weekly analytics summary",
      "Context: Injects real-time metrics into each query",
      "SDK: @google/generative-ai (configured in src/lib/gemini.ts)",
    ],
  },
  {
    id: "setup",
    title: "Setup",
    icon: Cpu,
    steps: [
      "1. Get Tatum API key at https://dashboard.tatum.io",
      "2. Get Gemini API key at https://aistudio.google.com",
      "3. Clone repo: git clone https://github.com/EdCryptoFi/Walytics",
      "4. Copy .env.local.example → .env.local and fill keys",
      "5. npm install && npm run dev",
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Technical docs, architecture, and API reference for Walytics
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-16 space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <section.icon className="h-5 w-5 text-blue-600" />
            {section.title}
          </h2>

          {"content" in section && typeof section.content === "string" && (
            <Card>
              <CardContent className="p-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {section.content}
              </CardContent>
            </Card>
          )}

          {"nodes" in section && section.nodes && (
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.nodes.map((n) => (
                    <div key={n.label} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{n.label}</p>
                      <p className="mt-1 text-sm font-medium">{n.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {"flow" in section && section.flow && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {section.flow.map((line, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-mono text-zinc-700 dark:text-zinc-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-100 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-400">{i + 1}</span>
                      {line}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {"endpoints" in section && section.endpoints && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {section.endpoints.map((ep) => (
                    <div key={ep.route} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                      <code className="text-sm font-semibold text-blue-600">{ep.route}</code>
                      <p className="mt-1 text-sm text-zinc-500">{ep.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {"details" in section && section.details && (
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {section.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {"steps" in section && section.steps && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {section.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">{i + 1}</span>
                      <code className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{step}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      ))}

      <div className="flex flex-wrap gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <a href="https://github.com/EdCryptoFi/Walytics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">
          <ExternalLink className="h-4 w-4" /> GitHub Repo
        </a>
        <a href="https://walytics.netlify.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800">
          <ExternalLink className="h-4 w-4" /> Live Demo
        </a>
        <a href="/tutorial" className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800">
          <ExternalLink className="h-4 w-4" /> Tutorial
        </a>
      </div>
    </div>
  )
}
