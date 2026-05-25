# Walytics — Contexto do Projeto

## Stack
- Next.js (versão atual em node_modules — verificar breaking changes em `node_modules/next/dist/docs/`)
- TypeScript, ESLint, PostCSS
- Deploy: Netlify (`netlify.toml` presente)

## Variáveis de Ambiente
Arquivo: `.env.local` (NÃO commitado)
- `TATUM_API_KEY` — API de dados blockchain (dashboard.tatum.io)
- `GEMINI_API_KEY` — Gemini AI (aistudio.google.com)
- `WALRUS_PACKAGE_ID` — Sui Walrus (opcional)

## Tema Visual
Brutalist design — **não usar Tailwind CSS v4** (Preflight reset quebra o CSS brutalist).
Commit de referência: `97bf603` (remove Tailwind v4) e `7f5cacf` (alinha com tema brutalist).

## Ao Mover para Novo HD
1. Deletar `node_modules` e `tsconfig.tsbuildinfo`
2. Rodar `npm install`
3. Recriar `.env.local` com as chaves reais (não está no git)

## Features Implementadas
- Rate limiting, input validation, logging estruturado
- Indicador de status Tatum
- Fluxo de mock data RPC
- Página de tutorial

## Notas
- Memórias do Claude Code ficam em `~/.claude/projects/[path-encoded]/memory/` — ao mudar de path, esse contexto substitui.
