# YouTube Tools Hub — Growth Action Plan (Now)

**Site:** https://www.youtubetoolshub.com  
**Updated:** 2026-07-19  
**Baseline (from design):** ~94 weekly pageviews, ~$0.03 CPC, ~$1.65 RPM, ~$0.15/week

## Honest diagnosis

The **tech stack is already strong** (schemas, sitemaps, AdSense units, llms.txt, tools). Revenue is low because:

1. **Traffic volume is too low** for AdSense math to work  
2. **Content quality / cannibalization** diluted topical authority  
3. **Tier-1 share is likely low** → low CPC/RPM even when ads fill  
4. **Off-page signals** (backlinks, brand searches, social) are still thin  

Code alone cannot create 10k visits/week. Ranking + distribution + Tier-1 intent traffic can.

---

## Batch 2 — Merge / redirects / high-CPC (2026-07-19)

| Change | Detail |
|--------|--------|
| **Pruned posts** | Removed true duplicates + thin cannibals |
| **301 redirects** | `faceless…make-10000-month` → ideas; `shorts…complete-guide` → shorts monetization; money calculator legacy path |
| **Expanded** | 1,000 subs, 1M views earnings, Shorts monetization |
| **New high-CPC** | `/blog/youtube-media-kit-template-2026` |
| **Safety** | `getAllBlogPosts()` dedupes by slug |

Deleted (do not re-publish under same slug):
- `faceless-youtube-channel-ideas-make-10000-month-2026`
- `youtube-shorts-monetization-complete-guide-2026`
- duplicate trailing copies of shorts monetization + faceless ideas

---

## What we shipped in code (this session)

| Area | Change |
|------|--------|
| **Sitemap** | Per-route dynamic `lastModified` (no more sitewide frozen 2026-07-15) |
| **Topic clusters** | `src/lib/topic-clusters.ts` — 10 clusters, auto internal links via content-processor |
| **GEO data** | `src/lib/seo-data.ts` — citable facts, examples, speakable answers |
| **llms.txt / llms-full** | Rich citation facts, CPM table, cluster map for AI engines |
| **Person schema** | Editorial team + per-author on blog posts |
| **CPM pillar** | More PAA FAQs, speakable schema, dataset date aligned |
| **Blog** | Expanded thin money posts; new **AdSense payment schedule** article |
| **Audit** | `npm run seo:audit` → `outputs/content-audit.csv` |
| **Cleanup** | gitignore lint/tsbuild artifacts |

---

## Deploy steps (do after pull)

```bash
npm run build
npm start   # or your Hostinger deploy process
npm run deploy:post
```

Then in **Google Search Console**:
1. Resubmit `https://www.youtubetoolshub.com/sitemap.xml`
2. Request indexing for:
   - `/tools/youtube-earnings-calculator`
   - `/resources/youtube-cpm-rates`
   - `/blog/youtube-adsense-payment-schedule-2026`
   - `/blog/youtube-pay-per-view-2026`
   - `/resources/youtube-monetization-guide`

Also: Bing Webmaster (import from GSC) + IndexNow already wired.

---

## AdSense dashboard actions (raise CPC/RPM)

These are **not** code changes—do them in AdSense:

1. **Auto ads ON** + experiment ad balance  
2. **Vignette + Anchor** formats enabled (often higher RPM on mobile)  
3. **Block low-value categories** (dating/gambling/etc. if they fill cheap)  
4. **Unique slots per placement** already partly configured in `src/lib/adsense.ts`  
5. **Site-level optimization experiments** for 2–4 weeks  

RPM rises mainly when **Tier-1 (US/UK/CA/AU) share** rises—not when you add more ad units alone.

---

## Content process (next 90 days)

Cadence from `docs/TRAFFIC-KEYWORD-PLAN-Q3-2026.md`:

- **2 new source-backed posts / week**  
- **1 refresh / week** of an existing URL that already has impressions  

### Priority money URLs (protect & expand)

| URL | Why |
|-----|-----|
| `/tools/youtube-earnings-calculator` | High commercial intent |
| `/resources/youtube-cpm-rates` | Citable data → SEO + GEO |
| `/resources/youtube-monetization-guide` | Pillar |
| `/blog/youtube-adsense-payment-schedule-2026` | New high-intent |
| `/blog/youtube-pay-per-view-2026` | Expanded |
| `/tools/youtube-thumbnail-downloader` | High volume acquisition |

### Merge candidates (from `npm run seo:audit`)

Do **not** mass-delete blindly. Next batch:

1. Merge overlapping **faceless channel ideas** posts → one canonical + 301  
2. Expand or merge **get-1000-subscribers** thin post  
3. Expand **shorts monetization** duplicates into one pillar  

Use 301s in `next.config.mjs` for any deleted slug that has links/impressions.

---

## Traffic channels that move the needle

| Channel | Action | Effort |
|---------|--------|--------|
| **Google organic** | Clusters + weekly quality content + GSC | Ongoing |
| **Bing/Yandex** | Webmaster + IndexNow after each deploy | Low |
| **Pinterest** | Pin CPM + calculator pins (`docs/PINTEREST-PINS.md`) | Medium |
| **Backlinks** | 8–20 quality RDs/month (`docs/BACKLINK-OUTREACH.md`) | High impact |
| **YouTube itself** | Shorts/videos that demo tools + end screen URL | High for brand |
| **Communities** | Reddit/Discord: answer + link tool only when it solves the problem | Careful |

---

## Revenue math (realistic)

`monthly ad revenue ≈ (pageviews ÷ 1000) × page RPM`

| Monthly views | RPM $2 | RPM $4 | RPM $8 |
|---------------|--------|--------|--------|
| 1,000 | $2 | $4 | $8 |
| 5,000 | $10 | $20 | $40 |
| 25,000 | $50 | $100 | $200 |
| 100,000 | $200 | $400 | $800 |

At **~400 views/month**, even perfect ads ≈ pocket change. Goal is **5k–25k+ qualified monthly views** first, then RPM optimization.

### 6-month target (ambitious but grounded)

| Metric | Now | 90 days | 180 days |
|--------|-----|---------|----------|
| Monthly pageviews | ~400 | 1,500–3,000 | 5,000–15,000 |
| Page RPM | ~$1.65 | $3+ | $4–$8 if Tier-1 mix improves |
| Est. monthly AdSense | &lt;$5 | $10–$40 | $50–$200+ |

---

## Weekly scoreboard

Track every Monday:

1. GSC: clicks, impressions, avg position (top 20 queries)  
2. GA4: users by country (US/UK/CA/AU %)  
3. AdSense: page RPM, CPC, pageviews  
4. Indexed pages with &gt;10 impressions  
5. One manual check: query target keywords in ChatGPT/Perplexity for citations  

---

## What “done” looks like for you this week

- [ ] Deploy build + `npm run deploy:post`  
- [ ] GSC sitemap + index requests on money URLs  
- [ ] AdSense: Auto ads / vignette / anchor review  
- [ ] Send 10 Day-0 outreach emails (`docs/EMAIL-OUTREACH-SEQUENCES.md`)  
- [ ] Publish or refresh **one** more high-intent URL  
- [ ] Run `npm run seo:audit` and pick 3 merge/expand targets  

SEO/AEO/GEO improvements compound over **8–16 weeks**. Consistency beats one-time “SEO packs.”
