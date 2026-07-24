# Google Search Console + IndexNow URL list

**Site:** https://www.youtubetoolshub.com  
**Updated:** 2026-07-24 (Batch 3 content deploy)

Use this after every production deploy that changes content or routes.

---

## Deploy sequence (copy/paste)

```bash
cd D:\Web\youtubetoolshub

# 1) Pre-flight (local)
npm run deploy:check

# 2) Build + put live on Hostinger (your usual process)
npm run build
# …upload / restart Node host…

# 3) After https://www.youtubetoolshub.com returns 200
npm run deploy:post
# faster money-only IndexNow:
# npm run deploy:post:priority

# 4) Optional live smoke
npm run deploy:check:post
npm run seo:check
```

`deploy:post` waits for `/api/health`, submits IndexNow (priority or full), then runs smoke checks.

---

## Google Search Console — do these every deploy

1. Open [Google Search Console](https://search.google.com/search-console) → property `www.youtubetoolshub.com`
2. **Sitemaps** → submit / resubmit:
   - `https://www.youtubetoolshub.com/sitemap.xml`
   - (if used) `https://www.youtubetoolshub.com/sitemap_index.xml`
3. **URL Inspection** → paste each URL below → **Request indexing**  
   (GSC rate-limits requests; do P0 same day, P1 next day if needed)

Also confirm **Bing Webmaster** has the same sitemap (import from GSC if not already).

---

## P0 — Request indexing first (money + new Batch 3)

| # | Full URL |
|---|----------|
| 1 | https://www.youtubetoolshub.com/tools/youtube-earnings-calculator |
| 2 | https://www.youtubetoolshub.com/resources/youtube-cpm-rates |
| 3 | https://www.youtubetoolshub.com/tools/youtube-thumbnail-downloader |
| 4 | https://www.youtubetoolshub.com/resources/youtube-monetization-guide |
| 5 | https://www.youtubetoolshub.com/blog/youtube-thumbnail-size-2026 |
| 6 | https://www.youtubetoolshub.com/blog/how-to-download-youtube-thumbnail-2026 |
| 7 | https://www.youtubetoolshub.com/blog/youtube-pay-per-view-2026 |
| 8 | https://www.youtubetoolshub.com/blog/youtube-cpm-rates-by-country-2026 |
| 9 | https://www.youtubetoolshub.com/blog/youtube-shorts-monetization-2026 |
| 10 | https://www.youtubetoolshub.com/blog/youtube-description-template-2026 |
| 11 | https://www.youtubetoolshub.com/blog/youtube-channel-name-ideas-2026 |
| 12 | https://www.youtubetoolshub.com/blog/youtube-chapters-template-2026 |

---

## P1 — Strong secondary (same week)

| # | Full URL |
|---|----------|
| 13 | https://www.youtubetoolshub.com/blog/youtube-adsense-payment-schedule-2026 |
| 14 | https://www.youtubetoolshub.com/blog/youtube-media-kit-template-2026 |
| 15 | https://www.youtubetoolshub.com/resources/youtube-algorithm-guide |
| 16 | https://www.youtubetoolshub.com/resources/link-to-us |
| 17 | https://www.youtubetoolshub.com/tools/vs/tubebuddy |
| 18 | https://www.youtubetoolshub.com/tools/vs/vidiq |
| 19 | https://www.youtubetoolshub.com/tools/youtube-earnings-calculator/usa |
| 20 | https://www.youtubetoolshub.com/tools/youtube-earnings-calculator/uk |
| 21 | https://www.youtubetoolshub.com/tools/youtube-earnings-calculator/india |
| 22 | https://www.youtubetoolshub.com/tools/youtube-title-generator |
| 23 | https://www.youtubetoolshub.com/tools/youtube-tag-generator |
| 24 | https://www.youtubetoolshub.com/tools/youtube-description-generator |
| 25 | https://www.youtubetoolshub.com/tools/youtube-channel-name-generator |
| 26 | https://www.youtubetoolshub.com/tools/youtube-timestamp-generator |
| 27 | https://www.youtubetoolshub.com/ |
| 28 | https://www.youtubetoolshub.com/tools |
| 29 | https://www.youtubetoolshub.com/blog |
| 30 | https://www.youtubetoolshub.com/llms.txt |

---

## IndexNow (Bing / Yandex) — automated

Already wired. After go-live:

```bash
# Money + priority paths only (includes Batch 3 blog URLs)
npm run seo:indexnow:priority

# Or full sitemap (batched)
npm run seo:indexnow

# Preferred: health wait + IndexNow + checks
npm run deploy:post
```

Priority list lives in `scripts/submit-indexnow.mjs` → `PRIORITY_PATHS`.

---

## Post-deploy smoke (must be 200)

```bash
npm run seo:check
npm run deploy:check:post
```

Expect 200 on homepage, tools, blog, sitemap, robots, ads.txt, llms.txt, calculator, CPM resource, and Batch 3 blog paths.

---

## Checklist (tick when done)

- [ ] `npm run deploy:check` passed locally  
- [ ] Production build deployed  
- [ ] Site homepage returns 200  
- [ ] `npm run deploy:post` completed  
- [ ] GSC sitemap resubmitted  
- [ ] GSC URL Inspection requested for all **P0** URLs  
- [ ] Bing Webmaster sitemap OK  
- [ ] `npm run seo:check` all green  

---

## Note

New blog routes only appear on production **after you deploy this build**. IndexNow / GSC requests before deploy will hit 404 or old content—always deploy first, then index.
