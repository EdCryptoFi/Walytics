# Walytics — Walrus Storage Analytics

**Walytics** is a real-time analytics dashboard for [Walrus](https://walrus.xyz) decentralized storage on [Sui](https://sui.io), powered by [Tatum](https://tatum.io).

Built for the [Tatum x Walrus Hackathon](https://tatum.io/tatum-x-walrus-hackathon).

## Features

- **Dashboard** — Real-time metrics: total blobs, storage used, publishers, trends
- **Blob Explorer** — Browse and search blobs stored on Walrus
- **AI Analytics Chat** — Ask questions in plain English about Walrus storage data (powered by Gemini 2.0 Flash)
- **Automated Reports** — Generate weekly analytics reports via AI
- **Walrus Dogfooding** — Analytics snapshots can be stored back on Walrus

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Tatum SDK](https://tatum.io) — Sui RPC endpoints
- [Google Gemini 2.0 Flash](https://ai.google.dev) — AI chat & reports (free tier)
- [Lucide](https://lucide.dev) — Icons

## Getting Started

### Prerequisites

- Node.js 20.9+
- [Tatum API Key](https://dashboard.tatum.io) (free)
- [Gemini API Key](https://aistudio.google.com) (free)

### Setup

```bash
cp .env.local.example .env.local
```

Fill in your API keys in `.env.local`:

```env
TATUM_API_KEY=your_tatum_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analytics/     # Walrus metrics API
│   │   ├── blobs/         # Walrus blob list API
│   │   ├── chat/          # AI chat API
│   │   └── tatum/         # Tatum RPC proxy
│   ├── chat/              # AI Analytics chat page
│   ├── explorer/          # Blob Explorer page
│   ├── page.tsx           # Dashboard (home)
│   └── layout.tsx         # Root layout with sidebar
├── components/
│   ├── Chat/              # Chat interface
│   ├── Dashboard/         # Overview cards, charts
│   ├── Explorer/          # Blob table
│   ├── Layout/            # Sidebar navigation
│   └── ui/                # Button, Card components
├── lib/
│   ├── tatum.ts           # Tatum RPC client
│   ├── gemini.ts          # Gemini AI client
│   ├── walrus.ts          # Walrus data helpers
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Hackathon Submission

- **Demo Video:** 2–3 min walkthrough
- **GitHub Repo:** [Link to your repo]
- **Team:** Solo
- **Built With:** Tatum Sui RPC + Walrus Storage + Gemini AI

## License

MIT
