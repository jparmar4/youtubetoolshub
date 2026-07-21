# SEO / AEO / GEO Growth Design

**Date:** 2026-07-19
**Status:** Approved (text-only scope — no UI changes)
**Target site:** https://www.youtubetoolshub.com

## 1. Problem & Goal

### Current state (from AdSense + Search Console, last 7 days)
- 94 pageviews, 17 clicks, $0.03 CPC, $1.65 RPM, ~$0.15 weekly revenue
- Traffic declining (-26% to -50% across metrics)

### Honest diagnosis
The codebase is **technically excellent** (Next.js 16 App Router, 4 sitemaps, 20+ JSON-LD schema types, full AI-search setup with llms.txt/ai.txt/knowledge-graph, AdSense Auto ads + manual units, IndexNow, www canonicalization). The plumbing is done.

The real problems are:
1. **Volume** — 94 weekly views is too low for any monetization math to work
2. **Content quality** — 99 AI-generated blog posts + 200 programmatic template pages without topical structure, likely triggering Helpful Content System penalties
3. **No internal linking architecture** — 330+ pages but almost no cluster structure; many orphaned pages
4. **Weak AEO/GEO signals** — content is descriptive prose, not answer-optimized or data-rich enough for AI engines to cite

### Goal
Rank higher on Google/Bing/Yandex (SEO), capture featured snippets/PAA/voice (AEO), and become a cited source in ChatGPT/Perplexity/Gemini/Claude (GEO). Realistic 5–10× traffic growth over 6 months through ranking improvements alone.

### Success metrics

| Metric | Today | 30d | 90d | 180d |
|---|---|---|---|---|
| Monthly pageviews | ~400 | ~500 | ~1,500 | ~5,000+ |
| Avg. organic position (top 20 queries) | unknown | baseline | +3 | +8 |
| Indexed pages w/ >10 impressions/mo | ~20 | ~30 | ~60 | ~100+ |
| Page RPM | $1.65 | unchanged | $3 | $4 |

Note: RPM lift is a *secondary* outcome of better traffic quality, not a primary goal — ad placement is explicitly out of scope (see §3).

## 2. Hard Constraints (user-locked)

- **Scope:** Code & site only. User handles off-page promotion themselves.
- **No UI changes whatsoever.** No new components, no styled boxes, no badges, no ad placement changes, no layout changes.
- **Text additions are OK** — longer articles, more FAQs in existing style, plain-text internal links within body content.
- **Invisible work is OK** — schema/JSON-LD, meta tags, sitemap, robots, llms.txt.
- **Existing content is AI-generated; user has approved free edit/delete/merge.**
- **Most pages already indexed** per GSC.

## 3. Architecture

Every change must improve at least one of three discovery surfaces:

| Surface | Ranks on | Primary lever |
|---|---|---|
| **SEO** (Google, Bing, Yandex) | Helpfulness, topical authority, E-E-A-T, intent match | Content depth + clusters + intent alignment |
| **AEO** (snippets, PAA, voice) | Concise answerable content, schema, question format | FAQ/HowTo schema, tables/lists, speakable |
| **GEO** (ChatGPT, Perplexity, Gemini, Claude, Grok) | Citable original data, entity clarity, expertise | Original stats, sourced facts, author signals, llms.txt |

## 4. Phases

### Phase 0 — Invisible Technical Fixes (3–5 days)

Prerequisite fixes so later work is actually crawled and indexed correctly.

- **0a. Dynamic sitemap `lastModified`** — replace hardcoded `2026-07-15` constant in `src/app/sitemap.ts` with per-route dynamic dates (use blog post `date`, tool modification times, or a route-level last-modified map). Google currently treats the entire site as frozen.
- **0b. Repo cleanup** — remove committed build artifacts (`lint-results*.json`, `tsconfig.tsbuildinfo`) from git history forward (not rewriting history; just untrack + gitignore).
- **0c. Schema validation** — run all JSON-LD through Google's Rich Results test, fix any warnings/errors (recent commits show prior schema bug fixes — verify clean state).
- **0d. llms.txt enrichment** — expand `src/app/llms.txt/route.ts` and `llms-full.txt/route.ts` with richer AI-citation context (key facts, statistics, preferred citation text per page).
- **0e. Web Vitals check** — confirm no obvious CLS/LCP regressions. No code changes here unless an issue is found.

**Out of scope:** ad placement, multiplex re-enablement, slot fixes.

### Phase 1 — Content Quality (2–3 weeks) — biggest traffic lever

- **1a. Content audit** — script `src/lib/content-audit.ts` (not runtime; analysis tool) scores all 330 pages on word count, uniqueness, keyword targeting, intent match, internal links, schema completeness. Output `outputs/content-audit.csv` with keep/expand/merge/delete recommendations.
- **1b. Pruning & merging** — delete or merge low-value blog posts. Target prune rate: 30–50% of 99 AI posts (expect ~30–50 deletions). Reduces sitewide "low-quality surface area" that triggers Helpful Content penalties.
- **1c. Search intent remapping** — for each kept page, identify actual query intent (informational/commercial/navigational/transactional) and align title, H1, intro paragraph, and content format. No new pages — just realignment.
- **1d. Content depth upgrades** — top 30 highest-priority pages expanded to 2000–3000 words. Add: original research data, comparison tables, "what we found" sections, examples with specific numbers, expert-attributed insights (text-only; no new UI).

### Phase 2 — Topical Authority via Internal Links (2 weeks)

- **2a. Topic cluster map** — new `src/lib/topic-clusters.ts` data file. 8–12 clusters:
  - `monetization` (pillar: `/resources/youtube-monetization-guide`)
  - `seo` (pillar: `/resources/youtube-algorithm-guide`)
  - `cpm-rates` (pillar: `/resources/youtube-cpm-rates`)
  - `creator-statistics` (pillar: `/resources/youtube-creator-statistics`)
  - `thumbnails`, `shorts`, `niche-selection`, `equipment`, `analytics`, `content-strategy`, `ai-tools`, `growth`
  - Each cluster: 1 pillar + 8–15 spokes (existing pages only — no new pages this phase)
- **2b. Plain-text internal links** — insert contextual links within article body using the existing Next.js `<Link>` component (no new component). 3–5 contextual links per page, descriptive keyword anchors. Implementation: edit the article body text in `src/config/blog.ts` (or relevant content source) to include inline `<Link>` elements; do NOT introduce a separate "Related guides" block.
- **2c. Orphan rescue** — identify programmatic/niche pages with 0 inbound internal links; wire them into cluster pillars.
- **2d. Breadcrumb & anchor text** — audit and replace generic anchors ("click here", "read more") with descriptive keyword anchors.

### Phase 3 — AEO + GEO Schema Layer (2 weeks)

- **3a. FAQ expansion** — every pillar + high-priority blog post gets 5–8 additional PAA-matched Q&As (researched from actual "People Also Ask" queries, not invented). Added as text in existing FAQ section style. Existing `getFAQSchema` already wires the schema.
- **3b. Author/entity schema** — define a site author entity (e.g., "YouTube Tools Hub Editorial Team" or a named persona) in `src/config/site.ts` and emit `Person` schema from `layout.tsx` or article pages (invisible — no visible byline added unless one already exists). Add `lastReviewed` dates to data-driven pages. No visible badge.
- **3c. Citable data tables** — add original data tables as text content (Markdown-style tables in existing rendering): subscriber benchmarks, RPM comparisons, monetization timelines, equipment cost ranges. Extend `src/lib/cpm-data.ts` and add `src/lib/seo-data.ts`. Wire `Dataset` schema (already in `lib/seo.ts`) to these.
- **3d. Speakable schema expansion** — extend `getSpeakableSchema` to cover concise answer paragraphs on pillar pages (voice search).

### Phase 4 — High-Intent Content Expansion (ongoing, weeks 8+)

All new pages use **existing** templates — no new UI.

- **4a.** 8–12 higher-CPC vertical articles using existing blog post template (`src/config/blog.ts` + `src/app/blog/[slug]/page.tsx`). Targets: creator taxes, LLC formation, sponsorship rate cards, equipment insurance, business banking for creators.
- **4b.** 10+ "X vs Y" comparison pages using existing comparison template (extend the tubebuddy/vidiq pattern at `src/app/tools/vs/`).
- **4c.** "Best ___ for ___" listicles in existing blog style.
- All new pages linked into Phase 2 cluster map.

## 5. File Changes Summary

### New files
| Path | Phase | Purpose |
|---|---|---|
| `src/lib/topic-clusters.ts` | 2a | Cluster → pillar/spokes map |
| `src/lib/content-audit.ts` | 1a | Offline analysis script (not runtime) |
| `src/lib/seo-data.ts` | 3c | Citable datasets (benchmarks, comparisons) |
| `outputs/content-audit.csv` | 1a | Audit output (gitignored) |
| New blog entries in `src/config/blog.ts` | 4a | Higher-CPC articles |
| New comparison pages under `src/app/tools/vs/` | 4b | "X vs Y" pages |

### Modified files
| Path | Phase | Change |
|---|---|---|
| `src/app/sitemap.ts` | 0a | Dynamic `lastModified` per route |
| `src/app/llms.txt/route.ts` + `llms-full.txt/route.ts` | 0d | Richer AI-citation context |
| `src/config/blog.ts` | 1b, 1d, 4a | Prune/merge/expand/add posts |
| `src/config/programmatic.ts` | 1c | Per-niche unique content variations |
| `src/lib/cpm-data.ts` | 3c | Extended datasets |
| `src/lib/seo.ts` | 3b, 3d | Person/lastReviewed/speakable wiring |
| `src/app/resources/*/page.tsx` (5 pillars) | 1d, 2, 3 | Expand + cluster-link + FAQ + data tables |
| `src/app/blog/[slug]/page.tsx` | 2b | Render plain-text internal links from cluster map |
| `src/app/tools/[slug]/page.tsx` | 2b | Render plain-text internal links |
| `.gitignore` | 0b | Ignore build artifacts |

### Explicitly NOT modified
- `src/components/**` — no UI component changes
- `src/lib/adsense.ts` — ad placement unchanged
- `src/components/ads/**` — ad components unchanged
- `src/app/layout.tsx` visual structure — head/schema additions only, no layout change
- Tool component logic (`src/components/tools/**`)

## 6. Data Flow Example (Phase 3 complete)

```
User searches "how much do youtube gamers make per 1000 views"
  ↓
Google ranks /resources/youtube-cpm-rates higher because:
  - Pillar now 3000+ words with original data (Phase 1d)
  - 5 inbound links from cluster spokes (Phase 2b)
  - FAQ schema with exact PAA match (Phase 3a)
  → SEO win

User asks ChatGPT "what's the average CPM for gaming channels?"
  ↓
ChatGPT cites youtubetoolshub.com because:
  - llms.txt exposes the data with preferred citation text (Phase 0d)
  - Dataset schema marks the CPM table as structured data (Phase 3c)
  - Person schema + lastReviewed signals authority (Phase 3b)
  → GEO win

User voice-searches "youtube CPM rates"
  ↓
Google Assistant reads the speakable-marked concise paragraph (Phase 3d)
  → AEO win
```

## 7. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Deleting blog posts breaks inbound links / 404s | Add 301 redirects in `next.config.mjs` `redirects()` for any deleted URL with external backlinks (check via `scripts/check-seo.mjs` or GSC) |
| Pruning too aggressively hurts sitewide signals | Phase 1b starts conservative (delete obvious spam/thin first), monitor GSC 2 weeks before next batch |
| Internal links inserted awkwardly read as spam | Plain-text contextual links only, 3–5 per page max, descriptive anchors, editorial review |
| Content expansion triggers "AI content" flags | Add original data (numbers, tables, examples), vary sentence structure, attribute insights, avoid listicle-only formats |
| Programmatic niche page changes tank existing rankings | Phase 1c is additive (unique sections added), not replacement; monitor before/after per template |
| SEO results take 3–6 months — impatience | Set baseline metrics now (Phase 0), track weekly, communicate realistic timeline |

## 8. Out of Scope (explicit)

- Backlink outreach / link building (user handles promotion)
- Social media (Pinterest, etc.)
- AdSense placement optimization / new ad units
- Visual redesign, new components, UI changes
- Multi-language / hreflang (single-locale intentional)
- Off-page SEO of any kind

## 9. Measurement Plan

Track weekly via GSC + AdSense:
- Total clicks, impressions, avg position
- Top 20 queries — position delta
- Indexed page count
- Pages with >10 impressions/mo
- Page RPM (secondary — will rise as traffic quality improves)
- Manual spot-check: query target terms in ChatGPT/Perplexity/Gemini monthly for citation presence

Baseline captured at Phase 0 completion.
