# YouTube Tools Hub — Architecture & Developer Guardrails

Welcome to **YouTube Tools Hub** (`youtubetoolshub.com`), a Next.js App Router creator suite delivering free, browser-first tools without forcing login or Chrome extension installs.

---

## Core Architecture Rules

### 1. Central Tool Registry (`src/config/tools.ts`)
- Every tool must be registered once in `rawTools` inside [`src/config/tools.ts`](src/config/tools.ts) with a single canonical `primaryCategory`:
  - `thumbnail-media`
  - `seo-metadata`
  - `channel-growth`
  - `analytics-earnings`
  - `utilities`
- **Never hardcode tool counts** (no `"44+"` or `"45"` strings). Always read `tools.length` (or `citableFacts.toolCount` in [`src/lib/seo-data.ts`](src/lib/seo-data.ts)).
- Map every client component dynamically in [`src/components/tools/ToolComponentRenderer.tsx`](src/components/tools/ToolComponentRenderer.tsx) and provide:
  - Hand-drawn icon motif in [`src/components/ui/tool-artwork.tsx`](src/components/ui/tool-artwork.tsx)
  - Worked example in [`src/lib/tool-examples.ts`](src/lib/tool-examples.ts)
  - Full `definitionBlock`, `content`, `howTo`, and `faqs` (>= 4 Q&As) satisfying `npm run seo:tools`.
- Every tool `seoDescription` and programmatic meta description must stay non-empty and strictly **under 165 characters** (`npm run verify:seo`).

### 2. Zero-Login, No-Extension Core Philosophy
- Core calculators, downloaders, extractors, and browser analyzers (e.g., WebAudio `-14 LUFS` loudness checker, HTML5 Canvas card generator) run directly in the browser with zero Google/YouTube OAuth prompts and zero required browser extensions.
- AI generators and public channel scanners degrade gracefully if optional keys are absent or exhausted.

### 3. Standardized `<ToolShell>` Layout Wrapper
- Dedicated tool landing routes and programmatic tool pages must use `<ToolShell>` ([`src/components/tools/ToolShell.tsx`](src/components/tools/ToolShell.tsx)) to preserve consistent chrome:
  - Breadcrumb navigation + `<GeoAeoHead>` + consolidated `@graph` JSON-LD (`SoftwareApplication` + `FAQPage` + `BreadcrumbList`)
  - Hero card (`ToolIcon3D`, H1/subtitle, optional favorite & recent tracker)
  - Desktop `lg:grid-cols-12` two-column grid (`lg:col-span-8` workspace + `lg:col-span-4` sticky right sidebar `<HighRpmSidebar>` inside `overflow-x-clip`)
  - Post-workspace contextual `<AdSlot slot={AD_SLOTS.IN_ARTICLE[0]} preset="in-article" />`
  - Visible `FaqAccordion` matching the `FAQPage` JSON-LD schema

### 4. AdSense & Zero-CLS Protection
- Preserve publisher ID `ca-pub-1328083083403070` and `AD_SLOTS` in [`src/lib/adsense.ts`](src/lib/adsense.ts).
- Never remove reserved `min-h` containers in [`src/components/ads/AdSlot.tsx`](src/components/ads/AdSlot.tsx):
  - `leaderboard`: `min-h-[100px]`
  - `in-article`, `sidebar`, `multiplex`: `min-h-[280px]`
  - `24px` (`my-6`) vertical breathing room and `"Advertisement"` micro-label.

### 5. Shared API Quota Shield & IP Rate Limiting
- All YouTube Data API v3 calls must route through [`src/lib/youtubeApiClient.ts`](src/lib/youtubeApiClient.ts) (`lib/youtubeApiClient.ts`), reading `YOUTUBE_API_KEYS` (comma-separated, rotating on `403 quotaExceeded` with cooldown) + caching (`revalidate: 86400` video metadata, `21600` channel stats) + graceful oEmbed/RSS fallbacks.
- All AI endpoints (`/api/generate`, `/api/generate-image`, `/api/thumbnail-critique`) must apply [`src/lib/rateLimit.ts`](src/lib/rateLimit.ts) (`lib/rateLimit.ts`, 20 requests per 10 minutes per IP) alongside session/daily tier limits.

### 6. Mandatory Verification Before Merging
Run and confirm exit code `0` for:
1. `npm run verify:seo`
2. `npm run typecheck && npm run lint`
3. `npm test && npm run seo:tools`
4. `npm run build` (using `next build --webpack && node scripts/copy-standalone.js`)

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
