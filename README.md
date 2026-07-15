# YouTube Tools Hub

Free creator tools for YouTube: thumbnails, SEO metadata, earnings/RPM calculator, channel audit, and more.  
**Live:** [https://www.youtubetoolshub.com](https://www.youtubetoolshub.com)

Stack: **Next.js 16**, React 19, Tailwind 4, optional NextAuth + Postgres, Google AdSense.

---

## Local development

```bash
npm install
# copy env keys into .env.local (AI_API_KEY, YOUTUBE_API_KEY, AUTH_SECRET, DATABASE_URL, …)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (Hostinger-style standalone)

```bash
npm run build    # next build + standalone copy
npm start        # node server.js
```

---

## Deploy checklist (use every release)

### Before deploy

```bash
npm run deploy:check
```

### After production is live

```bash
npm run deploy:post
# or faster money URLs only:
npm run deploy:post:priority
# or server-side full list (needs INDEXNOW_ADMIN_SECRET):
npm run deploy:post:api
```

### Manual verification

```bash
npm run deploy:check:post
npm run seo:check
```

### Google Search Console

1. Resubmit `https://www.youtubetoolshub.com/sitemap.xml`
2. Request indexing for:
   - `/tools/youtube-earnings-calculator`
   - `/resources/youtube-cpm-rates`
   - `/resources/link-to-us`
   - `/tools/youtube-thumbnail-downloader`

### GitHub Actions

Workflow: **Post-deploy SEO (IndexNow)** (`.github/workflows/post-deploy-seo.yml`)

- Runs on push to `main`/`master` (after site is healthy)
- Or **Actions → Run workflow** manually
- Optional secret: `INDEXNOW_ADMIN_SECRET`

If you deploy via Hostinger FTP/SSH (not GitHub-connected hosting), always run `npm run deploy:post` on your machine after go-live.

### Auto IndexNow on host boot (optional)

On the server environment, set:

```bash
AUTO_INDEXNOW=1
# optional:
AUTO_INDEXNOW_FULL=1          # full sitemap (default is priority-only via post-deploy)
INDEXNOW_MIN_HOURS=20         # skip if ran recently (default 20)
```

Then `npm start` (`server.js`) waits until `/api/health` is OK and runs IndexNow **once per lock window** — not on every crash loop.

---

## Pinterest / social share images

| Page | Landscape OG | Tall Pinterest pin |
|------|----------------|--------------------|
| Earnings calculator | `/tools/youtube-earnings-calculator/opengraph-image` | `…/pinterest-image` |
| CPM rates | `/resources/youtube-cpm-rates/opengraph-image` | `…/pinterest-image` |
| Link to us | `/resources/link-to-us/opengraph-image` | — |

Copy/titles: `docs/PINTEREST-PINS.md` · also listed on `/resources/link-to-us`.

---

## SEO / growth scripts

| Command | What it does |
|---------|----------------|
| `npm run seo:indexnow` | Submit full sitemap to IndexNow |
| `npm run seo:indexnow:priority` | Money/priority URLs only |
| `npm run seo:check` | Live smoke checks (canonical, h1, ads.txt…) |
| `npm run seo:tracker` | Regenerate outreach spreadsheet |
| `npm run deploy:check` | Pre-deploy file/env checklist |
| `npm run deploy:post` | Health wait + IndexNow + post checks |

---

## Outreach & backlinks

| File | Purpose |
|------|---------|
| `docs/BACKLINK-OUTREACH.md` | Templates A–F, targets, rules |
| `docs/EMAIL-OUTREACH-SEQUENCES.md` | Day 0 / 7 / 21 email sequences |
| `outputs/youtubetoolshub_backlink_outreach_tracker.xlsx` | Tracker + sequence calendar |
| `/resources/link-to-us` | Embed badges + calculator HTML card |

Weekly goal: **~10 Day-0 emails** + due follow-ups; **8–20 quality referring domains / month**.

---

## Important product URLs

| Page | Path |
|------|------|
| Earnings calculator (pillar) | `/tools/youtube-earnings-calculator` |
| CPM rates data | `/resources/youtube-cpm-rates` |
| Link / embed | `/resources/link-to-us` |
| vs TubeBuddy | `/tools/vs/tubebuddy` |
| Tools hub | `/tools` |
| Blog | `/blog` |

Monetization blog posts auto-show the Earnings Calculator CTA (top, mid, bottom).

---

## Environment variables (typical)

| Key | Used for |
|-----|----------|
| `AI_API_KEY` | AI text tools (`/api/generate`) |
| `YOUTUBE_API_KEY` | Tags, channel ID, comments, playlists |
| `REPLICATE_API_TOKEN` | AI thumbnail images |
| `AUTH_SECRET` / Google OAuth | Sign-in (optional for free tools) |
| `DATABASE_URL` | Usage / history / subscriptions |
| `INDEXNOW_ADMIN_SECRET` | Protect `GET /api/indexnow` |

Never commit `.env.local`.

---

## Project layout (short)

```
src/app/           App Router pages + API routes
src/components/    Tools, ads, blog, SEO UI
src/config/        site, tools, blog, programmatic niches
src/lib/           SEO schemas, AI, CPM data, related-tools
scripts/           IndexNow, deploy checks, outreach tracker
docs/              SEO strategy + outreach copy
public/            badges, ads.txt, verification files
```

---

## License / brand

Private project — **YouTube Tools Hub** (youtubetoolshub.com).  
Not affiliated with YouTube or Google.
