# Walytics — Walrus Storage Analytics

**Real-time analytics dashboard for [Walrus](https://walrus.xyz) decentralized storage on [Sui](https://sui.io), powered by [Tatum](https://tatum.io) RPC and [Gemini](https://ai.google.dev) AI.**

Built for the [Tatum x Walrus Hackathon](https://tatum.io/tatum-x-walrus-hackathon).

---

## Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Real-time metrics: total blobs, storage used, publishers, trends |
| **Blob Explorer** | Browse/search blobs by publisher, size, type, date |
| **AI Chat** | Natural language queries about storage data (Gemini 2.0 Flash) |
| **Auto Reports** | One-click weekly analytics summaries |
| **Walrus Write-Back** | Analytics snapshots stored as Walrus blobs (dogfooding) |
| **Tatum Status** | Live connection indicator to Sui Mainnet via Tatum RPC |

---

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   Next.js 16  │────▶│  API Routes  │────▶│  Tatum Sui RPC   │
│  (App Router) │     │  (Serverless)│     │  (Mainnet)       │
└──────┬───────┘     └──────┬───────┘     └──────────────────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Tailwind v4  │     │  Gemini AI   │     │  Walrus Protocol  │
│  + Recharts   │     │  2.0 Flash   │     │  (Blob Storage)  │
└──────────────┘     └──────────────┘     └──────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Recharts |
| **Backend** | Next.js API Routes (serverless, dynamic) |
| **Blockchain** | Tatum Sui RPC (`sui-mainnet.gateway.tatum.io`) |
| **AI** | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| **Storage** | Walrus Protocol (decentralized blob store) |
| **Icons** | Lucide React |
| **Deploy** | Netlify (Next.js Runtime, auto-deploy from GitHub) |

---

## Hackathon Judging Criteria

### Walrus and Tatum Integration (30%)

- **Tatum:** All on-chain data flows through `sui-mainnet.gateway.tatum.io` with `x-api-key` auth. Verified working (block #278M+). Proxy endpoint available at `/api/tatum`.
- **Walrus:** Dashboard indexes and visualizes Walrus blob storage. Analytics snapshots are stored back on Walrus as blobs (write-back/dogfooding). Blob types: permanent + ephemeral. Erasure code: redStuff.

### Technical Quality (30%)

- TypeScript throughout, clean component architecture, API routes with proper error handling. 0 lint errors, 0 TypeScript errors. Production build passes.

### Creativity (20%)

- First dedicated Walrus analytics explorer. AI chat that queries storage data in natural language. Dogfooding pattern (analytics stored on Walrus itself). Tatum connection health monitor.

### Presentation (20%)

- Live at [walytics.netlify.app](https://walytics.netlify.app). Full README, tutorial page, and technical docs included. Demo video (2-3 min) available.

### Bonus

- **Best Walrus Integration:** Write-back snapshots, blob explorer, storage analytics
- **Best Use of Tatum Tools:** Sui RPC integration, real-time block monitoring, proxy API
- **MCP:** Tatum Documentation MCP referenced; could be extended

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- [Tatum API Key](https://dashboard.tatum.io) (free)
- [Gemini API Key](https://aistudio.google.com) (free)

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
TATUM_API_KEY=t-xxxxx          # From dashboard.tatum.io
GEMINI_API_KEY=AIzaxxxxx       # From aistudio.google.com
WALRUS_PACKAGE_ID=              # Optional: Walrus package ID for live data
```

---

## API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics` | GET | Aggregated Walrus metrics (blobs, publishers, trends) |
| `/api/blobs` | GET | Paginated blob list |
| `/api/chat` | POST | AI chat + report generation |
| `/api/snapshot` | POST | Store analytics snapshot on Walrus |
| `/api/tatum` | POST | Generic Tatum Sui RPC proxy |

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
│   ├── tutorial/          # Tutorial/how-to page
│   ├── page.tsx           # Dashboard (home)
│   └── layout.tsx         # Root layout with sidebar + footer
├── components/
│   ├── Chat/              # Chat interface
│   ├── Dashboard/         # Cards, charts, Tatum status
│   ├── Explorer/          # Blob table
│   ├── Layout/            # Sidebar navigation
│   └── ui/                # Button, Card primitives
├── lib/
│   ├── tatum.ts           # Tatum RPC client
│   ├── gemini.ts          # Gemini AI client
│   ├── walrus.ts          # Walrus data helpers + mock data
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
```

---

## Demo Video

[Watch the demo →](https://youtube.com/your-video-link)

Script available in [`DEMO_VIDEO_SCRIPT.md`](./DEMO_VIDEO_SCRIPT.md).

---

## Links

- **Live Site:** https://walytics.netlify.app
- **GitHub:** https://github.com/EdCryptoFi/Walytics
- **Author:** [ED (@EdCriptoFi)](https://x.com/EdCriptoFi)
- **Tatum:** https://tatum.io
- **Walrus:** https://walrus.xyz
- **Hackathon:** https://tatum.io/tatum-x-walrus-hackathon

---

## License

MIT
