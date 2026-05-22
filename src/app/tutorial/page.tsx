import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Search, MessageSquare, FileText, Database, Cpu, BookOpen, CodeXml, ExternalLink } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Analítico",
    desc: "Visão geral do Walrus: total de blobs, armazenamento usado, publishers únicos e tamanho médio dos blobs em tempo real.",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    icon: Search,
    title: "Blob Explorer",
    desc: "Navegue e pesquise blobs armazenados no Walrus. Filtre por publisher, tamanho e data. Veja detalhes como digest e tipo de armazenamento.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    icon: MessageSquare,
    title: "AI Analytics Chat",
    desc: "Faça perguntas em linguagem natural sobre os dados de armazenamento. A IA (Gemini 2.0 Flash) responde com análises baseadas nos dados reais.",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/50",
  },
  {
    icon: FileText,
    title: "Relatórios Automáticos",
    desc: "Gere relatórios semanais de analytics com um clique. A IA analisa tendências, top publishers e métricas de armazenamento.",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    icon: Database,
    title: "Dogfooding no Walrus",
    desc: "Os snapshots de analytics são armazenados de volta no Walrus como blobs, criando um histórico imutável e verificável das métricas.",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/50",
  },
  {
    icon: Cpu,
    title: "Tatum Sui RPC",
    desc: "Conexão direta com a Sui via Tatum RPC endpoints. Consultas on-chain para dados de blob storage e objetos do Walrus.",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
]

const steps = [
  {
    step: "1",
    title: "Conecte sua API Key",
    desc: "Obtenha uma Tatum API Key gratuita em dashboard.tatum.io e adicione no .env.local. O Walytics usa os endpoints Sui RPC da Tatum.",
  },
  {
    step: "2",
    title: "Explore o Dashboard",
    desc: "A página inicial mostra métricas agregadas do Walrus: total de blobs, armazenamento, publishers ativos e distribuição de tamanhos.",
  },
  {
    step: "3",
    title: "Interaja com a IA",
    desc: "Vá até AI Analytics e pergunte sobre os dados. Ex: 'Qual o maior blob armazenado?' ou 'Quantos blobs foram publicados hoje?'.",
  },
  {
    step: "4",
    title: "Gere Relatórios",
    desc: "Clique em 'Generate Report' no chat para obter um relatório semanal automático com análise de tendências e top publishers.",
  },
]

export default function TutorialPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Tutorial</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Walytics é uma plataforma de analytics para o{" "}
          <a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
            Walrus
          </a>
          , o protocolo de armazenamento descentralizado da Sui, construída com a{" "}
          <a href="https://tatum.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
            Tatum API
          </a>{" "}
          e IA do{" "}
          <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline underline-offset-2">
            Gemini
          </a>.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-blue-600" />
          Como Usar
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <Card key={s.step}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          Funcionalidades
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${f.bg}`}>
                    <f.icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <CardTitle className="text-sm">{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Cpu className="h-6 w-6 text-blue-600" />
          Stack Técnica
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Frontend", value: "Next.js 16 + Tailwind v4" },
                { label: "Blockchain", value: "Tatum Sui RPC" },
                { label: "Storage", value: "Walrus Protocol" },
                { label: "IA", value: "Gemini 2.0 Flash" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{item.label}</p>
                  <p className="mt-1 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">🔗 Links Úteis</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Documentação e recursos usados no projeto
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://docs.wal.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700">
              <ExternalLink className="h-4 w-4" />
              Walrus Docs
            </a>
            <a href="https://tatum.io/mcp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700">
              <ExternalLink className="h-4 w-4" />
              Tatum MCP
            </a>
            <a href="https://github.com/EdCryptoFi/Walytics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
              <CodeXml className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
