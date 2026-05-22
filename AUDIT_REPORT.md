# Walytics — Relatório de Auditoria Completa
## Claude Design vs Código: Todas as Divergências

**Data:** 22 de maio de 2026  
**Escopo:** Comparação completa entre o Claude Design handoff bundle e o código-fonte do projeto  
**Objetivo:** Identificar por que o visual do site não corresponde ao design  

---

## RESUMO EXECUTIVO

O código do Walytics está **estruturalmente correto** — TypeScript compila sem erros, os componentes do design brutalist estão todos presentes, e o CSS é quase idêntico ao do design. O problema principal não é de componentes faltantes, mas sim de **componentes duplicados de uma iteração anterior** que competem com o design correto, **dados vazios quando APIs falham**, e **pequenas divergências** que acumuladas quebram a experiência visual.

---

## PROBLEMAS CRÍTICOS (Severidade Alta)

### 1. COMPONENTES DUPLICADOS — Sistema de Design Antigo vs Novo

**O maior problema do projeto.** Existem dois conjuntos paralelos de componentes: os do design brutalist (corretos) e os de uma iteração anterior com Tailwind/shadcn (incorretos). Ambos existem no código, e o **ChatInterface.tsx antigo** usa classes de estilo completamente diferentes.

| Componente Antigo (shadcn/Tailwind) | Componente Correto (Brutalist) | Status |
|---|---|---|
| `src/components/Chat/ChatInterface.tsx` | `src/app/chat/page.tsx` + `Bubble.tsx`, `Composer.tsx`, etc. | **ChatInterface.tsx é ÓRFÃO** — não é importado em nenhum lugar, mas polui o codebase |
| `src/components/Dashboard/BlobsChart.tsx` | `src/components/Dashboard/BlobTimeline.tsx` | **BlobsChart.tsx é ÓRFÃO** — usa `Card` do shadcn com `#3b82f6` (azul Tailwind) |
| `src/components/Dashboard/OverviewCards.tsx` | `src/components/Dashboard/KPI.tsx` | **OverviewCards.tsx é ÓRFÃO** — usa ícones Lucide + cores Tailwind |
| `src/components/Dashboard/StorageDistribution.tsx` | `src/components/Dashboard/SizeDistribution.tsx` | **StorageDistribution.tsx é ÓRFÃO** — usa cores hardcoded `#3b82f6`, `#10b981` |
| `src/components/Dashboard/TatumStatus.tsx` | `src/components/Dashboard/Connection.tsx` | **TatumStatus.tsx é ÓRFÃO** — usa `CheckCircle2` do Lucide com estilo moderno |
| `src/components/Layout/Sidebar.tsx` | `src/components/Layout/Nav.tsx` | **Sidebar.tsx é ÓRFÃO** — usa `zinc-900`, `white`, visual moderno |
| `src/components/Explorer/BlobTable.tsx` | `src/components/Explorer/BlobRow.tsx` | **BlobTable.tsx é ÓRFÃO** — usa shadcn Card |
| `src/components/ui/button.tsx` | Classes CSS `.btn`, `.btn-primary`, `.btn-mint` | **button.tsx é ÓRFÃO** — componente shadcn com rounded-lg, zinc-900 |
| `src/components/ui/card.tsx` | Classe CSS `.brut` | **card.tsx é ÓRFÃO** — componente shadcn com rounded-xl, shadow-sm |

**Impacto:** Se qualquer parte do código importar acidentalmente esses componentes antigos, o visual quebra completamente. O `ChatInterface.tsx` é especialmente perigoso porque importa `useChat` (o mesmo hook) e pode causar confusão.

**Correção:** Deletar todos os 9 componentes órfãos listados abaixo (seção "ARQUIVOS QUE PODEM SER DELETADOS").

---

### 2. TopPublishers — Sem Labels Legíveis

**Design (dashboard.jsx):**
```jsx
const topPublishers = [
  { addr: "0xd4e8…9a31", label: "Sui Capy Storage", blobs: 842, ... },
  { addr: "0x91bf…c042", label: "WalrusVault Pro",  blobs: 610, ... },
  // etc — cada publisher tem um LABEL humano
];
// Renderiza: r.label (grande) + r.addr (pequeno)
```

**Código (TopPublishers.tsx):**
```tsx
// Só mostra shortenAddress(p.address) — sem label humano
<div style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{r.addr}</div>
```

**Impacto:** No design, a tabela mostra nomes como "Sui Capy Storage", "WalrusVault Pro". No código, mostra apenas `0xd4e8...9a31`. Visualmente muito diferente.

**Correção:** A API (`walrus.ts`) retorna `topPublishers` sem campo `label`. Adicionar um mapeamento de labels conhecidos ou gerar labels baseados no endereço. Atualizar `TopPublishers.tsx` para mostrar label + address como no design.

---

### 3. Chat — Mensagem Inicial Genérica (Não Detective)

**Design (chat.jsx):**
```jsx
// Mensagem inicial com tema de detetive
{ role: "assistant", content: "**Case W-0042 — opened just now.**\n\n..." }
```

**Código (useChat.ts):**
```tsx
// Mensagem genérica
initialMessages: [{ role: "assistant", content: "Hi! I'm Walytics AI..." }]
```

**Impacto:** A primeira impressão do chat perde completamente o tema de detetive que é central ao design.

**Correção:** Mudar a mensagem inicial do `useChat.ts` para o estilo detetive do design.

---

### 4. Gemini System Prompt — Sem Persona "Holmes"

**Design (chat.jsx):** O chat tem respostas pré-programadas com personalidade de detetive (regex-matched canned responses como "The evidence suggests...", "My magnifying glass reveals...").

**Código (gemini.ts):**
```ts
const systemPrompt = `You are Walytics AI, an analytics assistant for Walrus...`
```

**Impacto:** O Gemini responde como um assistente genérico, não como "Walrus Holmes". O tom do design é perdido.

**Correção:** Alterar o system prompt para instruir o Gemini a responder como "Walrus Holmes" com linguagem de detetive.

---

## PROBLEMAS MÉDIOS (Severidade Média)

### 5. Explorer — Sem Filtro de Verdict

**Design (explorer.jsx):** Tem um dropdown de filtro `verdict` no FilterBar com opções: ALL VERDICTS, OPEN CASE, SOLVED, ARCHIVED, RED HERRING, OF INTEREST.

**Código (FilterBar.tsx):** Não tem filtro de verdict. Só tem: search, type, sortBy.

**Impacto:** Feature interativa faltando. O Explorer funciona mas perde uma dimensão de filtragem que é visualmente proeminente no design.

**Correção:** Adicionar prop `verdict`/`setVerdict` ao FilterBar e filtrar no ExplorerPage.

---

### 6. BlobRow — storageType Inconsistente

**Design:** Blobs têm tipos MIME como `image/png`, `video/mp4`, `text/plain` com ícones emoji correspondentes.

**Código (walrus.ts):** Os mock blobs usam `storageType: "permanent" | "ephemeral"` — que NÃO são tipos MIME.

```ts
storageType: Math.random() > 0.3 ? "permanent" : "ephemeral",
```

**Impacto:** O `TYPE_ICONS` no BlobRow.tsx procura por `"image/png"` etc., mas recebe `"permanent"`, então todos os blobs mostram o ícone fallback `📦`. Os type filters no FilterBar também não funcionam.

**Correção:** Adicionar um campo `mimeType` aos mock blobs com tipos MIME variados, ou mudar `storageType` para gerar tipos MIME.

---

### 7. Layout Duplicado — `<div className="app">` Aninhado

**Código (layout.tsx):**
```tsx
<body>
  <ThemeProvider>
    <div className="app">  // ← wrapper no layout
      <Nav/>
      <main>{children}</main>
      <TweaksPanel/>
    </div>
  </ThemeProvider>
</body>
```

**Código (page.tsx, explorer/page.tsx, chat/page.tsx):**
```tsx
return (
  <div className="app">  // ← OUTRO wrapper na página!
    <div className="container">
```

**Impacto:** Duplo `.app` wrapper. Dependendo do CSS, pode causar problemas de layout, margins duplicadas, ou backgrounds sobrepostos.

**Correção:** Remover `<div className="app">` das páginas individuais (page.tsx, explorer/page.tsx, chat/page.tsx) já que o layout.tsx já provê esse wrapper.

---

### 8. CSS — Animação `pulse-pin` OK (Verificado)

`@keyframes pulse-pin` existe no globals.css (linha 397). Este item está OK — sem ação necessária.

---

### 9. Fontes — CSS Variable vs Nome Direto

**Design (styles.css):**
```css
[data-type="chunky"] {
  --font-display: "Archivo Black", "Arial Black", system-ui, sans-serif;
  --font-body: "Space Grotesk", "Helvetica Neue", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

**Código (globals.css):**
```css
[data-type="chunky"] {
  --font-display: var(--font-archivo-black), "Arial Black", system-ui, sans-serif;
  --font-body: var(--font-space-grotesk), "Helvetica Neue", sans-serif;
  --font-mono: var(--font-jetbrains-mono), "Fira Code", monospace;
}
```

**Impacto:** Se `next/font/google` falhar em carregar ou se as CSS variables `--font-archivo-black` etc. não forem resolvidas, as fontes caem para os fallbacks. As fonts são carregadas como `variable` classes no `<html>`, o que deve funcionar — mas é um ponto de falha potencial.

**Correção:** Verificar no browser se as fontes estão sendo aplicadas. Se não, considerar usar os nomes diretos como no design e carregar as fontes via `<link>` ao invés de `next/font`.

---

## PROBLEMAS MENORES (Severidade Baixa)

### 10. CasePanel — Dados Hardcoded

O `CasePanel.tsx` do chat tem dados fixos ("W-0042", "22 May 2026", "5,688 blobs", "284 publishers"). Isso é consistente com o design (que também hardcoda), então não é um bug — mas pode parecer estranho se os números reais do dashboard forem muito diferentes.

### 11. brut-hov Hover Selector

**Design:** `.brut:hover.brut-hov` (precisa ter ambas classes)
**Código:** `.brut-hov:hover` (qualquer elemento com brut-hov)

Diferença sutil mas pode causar hovers indesejados em elementos que não são `.brut`.

### 12. Connection.tsx vs Design

**Design:** Sempre mostra "TATUM ONLINE · SURVEILLANCE ACTIVE" com status hardcoded.
**Código:** Faz chamada real ao `/api/tatum` e mostra status dinâmico. Se o Tatum key não estiver configurado, mostra erro.

Não é um bug, é uma melhoria — mas se a API key não estiver configurada no Netlify, esse componente mostrará estado de erro no deploy.

### 13. SizeDistribution — Dados do Design vs API

**Design:** Usa buckets com labels "< 1 KB", "1-10 KB" etc., com `hatched: true/false` e cores customizadas.
**Código:** Usa `range` e `count` da API, sem hatching.

Visualmente similar mas sem o efeito de hachurado que o design mostra em alguns buckets.

---

## ARQUIVOS QUE PODEM SER DELETADOS

Estes arquivos são órfãos da iteração anterior e devem ser removidos para limpar o projeto:

```
src/components/Chat/ChatInterface.tsx          ← Usa shadcn Card, Lucide Bot/User/Send
src/components/Dashboard/BlobsChart.tsx        ← Usa shadcn Card, cor #3b82f6
src/components/Dashboard/OverviewCards.tsx      ← Usa shadcn Card, Lucide Database/HardDrive
src/components/Dashboard/StorageDistribution.tsx ← Usa shadcn Card, cores hardcoded
src/components/Dashboard/TatumStatus.tsx       ← Usa shadcn Card, Lucide CheckCircle2
src/components/Explorer/BlobTable.tsx          ← Usa shadcn Card (nunca importado)
src/components/Layout/Sidebar.tsx              ← Usa Tailwind zinc/white
src/components/ui/button.tsx                   ← shadcn Button
src/components/ui/card.tsx                     ← shadcn Card/CardHeader/CardTitle/etc
```

**VERIFICADO:** Nenhum desses arquivos é importado por nenhuma página ou componente ativo. Todos os imports de `@/components/ui/card` e `@/components/ui/button` vêm apenas dos próprios órfãos. Podem ser deletados com segurança.

---

## DEPENDÊNCIAS — TUDO INSTALADO

Não há dependências faltantes. O `package.json` contém tudo que é necessário:

- `next`, `react`, `react-dom` — framework
- `recharts` — gráficos (não usado no design mas disponível)
- `lucide-react` — ícones (usado nos órfãos, não no design principal)
- `@google/generative-ai` — Gemini AI
- `class-variance-authority`, `clsx`, `tailwind-merge` — utilitários de estilo (usados por shadcn/ui órfãos)
- `@tailwindcss/postcss` — Tailwind v4

Após deletar os órfãos, `lucide-react`, `class-variance-authority`, `clsx`, e `tailwind-merge` podem ser removidos do package.json (verificar se são usados em outro lugar primeiro).

---

## CHECKLIST DE CORREÇÕES (Prioridade)

| # | Correção | Severidade | Esforço |
|---|---|---|---|
| 1 | Deletar os 9 componentes órfãos | ALTA | 5 min |
| 2 | Corrigir `storageType` nos mock blobs para tipos MIME | ALTA | 10 min |
| 3 | Adicionar labels aos TopPublishers | ALTA | 15 min |
| 4 | Remover `<div className="app">` duplicado das páginas | ALTA | 5 min |
| 5 | Mudar mensagem inicial do chat para tema detetive | MÉDIA | 5 min |
| 6 | Alterar system prompt do Gemini para persona Holmes | MÉDIA | 10 min |
| 7 | Adicionar filtro de verdict ao Explorer FilterBar | MÉDIA | 20 min |
| 8 | ~~`@keyframes pulse-pin`~~ — JÁ EXISTE | ✅ | 0 min |
| 9 | Verificar carregamento de fontes no browser | BAIXA | 5 min |
| 10 | Configurar variáveis de ambiente no Netlify | BAIXA | 5 min |

---

## CONCLUSÃO

O projeto está **90% alinhado** com o Claude Design. As divergências são principalmente:

1. **Componentes órfãos** de uma iteração anterior com estilo shadcn/Tailwind que não foram limpos
2. **Dados mock inconsistentes** (storageType como "permanent"/"ephemeral" ao invés de tipos MIME)
3. **Labels faltando** nos TopPublishers
4. **Wrapper HTML duplicado** (`<div className="app">`)
5. **Tema de detetive ausente** no chat (mensagem inicial + system prompt do Gemini)

Nenhuma dessas correções requer instalação de novas dependências ou mudanças arquiteturais. São todas edições pontuais em arquivos existentes.
