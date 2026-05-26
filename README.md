# Walytics — Walrus Storage Analytics

**Real-time analytics dashboard for [Walrus](https://walrus.xyz) decentralized storage on Sui, powered by [Tatum](https://tatum.io) RPC and [Gemini](https://ai.google.dev) AI.**

Built for the [Tatum x Walrus Hackathon](https://tatum.io/tatum-x-walrus-hackathon).

🔴 **Live:** https://walytics-dash.vercel.app

---

## Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Real-time metrics: total blobs, storage used, publishers, trends |
| **Blob Explorer** | Browse/search blobs by publisher, size, type, date |
| **AI Chat** | Natural language queries about storage data (Gemini) |
| **Generate Report** | One-click weekly analytics summary archived on Walrus |
| **Walrus Write-Back** | Analytics snapshots stored as Walrus blobs (dogfooding) |
| **Tatum Status** | Live health check — `sui_getLatestCheckpointSequenceNumber` via Tatum RPC |

---

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐
│   Next.js 16  │────▶│  API Routes  │────▶│  Blockberry API      │
│  (App Router) │     │  (Serverless)│     │  (primary blob data) │
└──────┬───────┘     └──────┬───────┘     └──────────────────────┘
       │                    │
       ▼                    ├────────────▶  Tatum Sui RPC (health check + fallback)
┌──────────────┐            │
│  Custom CSS   │            ├────────────▶  Gemini AI (chat + reports)
│  + Recharts   │            │
│  + Framer     │            └────────────▶  Walrus Protocol (snapshot write-back)
└──────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router, Turbopack), Custom CSS, Recharts, Framer Motion |
| **Backend** | Next.js API Routes (serverless, Node.js runtime) |
| **Blob Data** | [Blockberry API](https://api.blockberry.one) (same source as walruscan.com) |
| **Blockchain RPC** | [Tatum](https://tatum.io) Sui RPC — health check + fallback indexer |
| **AI** | Google Gemini (`gemini-2.5-flash-lite`, free tier) |
| **Storage** | Walrus Protocol (blob write-back) |
| **Icons** | Material Symbols Outlined (Google Fonts) |
| **Deploy** | Vercel |

---

## Hackathon Judging Criteria

### Walrus + Tatum Integration (30%)

- **Tatum:** Powers the live health status indicator (`sui_getLatestCheckpointSequenceNumber`), rate-limited RPC proxy endpoint at `/api/tatum`, and fallback blob indexing via `suix_queryEvents`.
- **Walrus:** Dashboard reads real blob data (via Blockberry, the same backend as walruscan.com). Analytics snapshots are written back to Walrus as blobs — dogfooding at its finest.

### Technical Quality (30%)

- TypeScript throughout, schema-based input validation (`validateBody`), per-route rate limiting, structured logging, container/hook separation. 0 TypeScript errors. Production build passes.

### Creativity (20%)

- Detective theme ("Walytics Holmes") with Walrus Holmes character. AI analyst that speaks Walrus data fluently. Dogfooding pattern: analytics stored on Walrus itself. Deterministic blob polaroid cards.

### Presentation (20%)

- Live at [walytics-dash.vercel.app](https://walytics-dash.vercel.app). Full README, tutorial page, and technical docs included.

### Bonus Targets

- **Best Walrus Integration:** Write-back snapshots, blob explorer, storage analytics
- **Best Use of Tatum Tools:** Sui RPC health monitor, rate-limited proxy API, fallback indexer

---

## Getting Started

### Prerequisites

- Node.js 20+
- [Tatum API Key](https://dashboard.tatum.io) (free)
- [Gemini API Key](https://aistudio.google.com) (free)
- [Blockberry API Key](https://blockberry.one) (free — for live Walrus blob data)

### Setup

```bash
git clone https://github.com/EdCryptoFi/Walytics
cd Walytics
cp .env.local.example .env.local
# Edit .env.local with your API keys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
TATUM_API_KEY=t-xxxxx           # From dashboard.tatum.io
GEMINI_API_KEY=AIzaxxxxx        # From aistudio.google.com
BLOCKBERRY_API_KEY=xxxxx        # From blockberry.one — live Walrus blob data
WALRUS_PACKAGE_ID=0x795dd...    # Walrus Move package on Sui mainnet
```

---

## API Endpoints

| Route | Method | Rate Limit | Description |
|-------|--------|------------|-------------|
| `/api/analytics` | GET | 30/min | Aggregated Walrus metrics |
| `/api/blobs` | GET | 30/min | Paginated blob list |
| `/api/chat` | POST | 15/min | AI chat + report generation |
| `/api/snapshot` | POST | 10/min | Store analytics snapshot on Walrus |
| `/api/tatum` | POST | 20/min | Tatum Sui RPC proxy (whitelisted methods) |

All endpoints return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` headers.

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analytics/     # Walrus metrics API
│   │   ├── blobs/         # Blob list API
│   │   ├── chat/          # AI chat API
│   │   ├── snapshot/      # Walrus write-back API
│   │   └── tatum/         # Tatum RPC proxy
│   ├── chat/              # AI Analytics page
│   ├── docs/              # Technical documentation
│   ├── explorer/          # Blob Explorer page
│   ├── tutorial/          # Tutorial page
│   └── page.tsx           # Dashboard (home)
├── components/
│   ├── Chat/              # Chat UI (Bubble, Composer, CasePanel)
│   ├── Dashboard/         # KPI cards, charts, SaveToWalrus
│   ├── Explorer/          # BlobRow, BlobModal, FilterBar
│   ├── Layout/            # Nav, Footer
│   └── UI/                # DataSourceBadge, shared components
├── hooks/
│   ├── useAnalytics.ts    # Metrics polling (60s)
│   ├── useBlobs.ts        # Blob polling (30s)
│   ├── useChat.ts         # Chat + report generation
│   ├── useSaveSnapshot.ts # Walrus snapshot write
│   └── useTatumStatus.ts  # Tatum health check (15s)
└── lib/
    ├── tatum.ts           # Tatum RPC client
    ├── gemini.ts          # Gemini AI client
    ├── walrus.ts          # Blockberry + Tatum data sources
    ├── validation.ts      # Schema-based input validation
    ├── rate-limit.ts      # Per-IP, per-route rate limiting
    └── logger.ts          # Structured logging
```

---

## Links

- **Live Site:** https://walytics-dash.vercel.app
- **GitHub:** https://github.com/EdCryptoFi/Walytics
- **Author:** [ED (@EdCriptoFi)](https://x.com/EdCriptoFi)
- **Tatum:** https://tatum.io
- **Walrus:** https://walrus.xyz
- **Hackathon:** https://tatum.io/tatum-x-walrus-hackathon

---

## License

MIT
