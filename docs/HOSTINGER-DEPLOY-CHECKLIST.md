# Hostinger Deploy Checklist (YouTube Tools Hub)

Use this after every release so production matches local build.

## 1. Build on your PC

```bash
cd D:\Web\youtubetoolshub
npm run build
```

Confirm:

- Build finishes without errors
- Folder exists: `.next\standalone\`
- Assets copied: `.next\standalone\public\` and `.next\standalone\.next\static\`

## 2. What to upload

Upload the **standalone app** contents to your Hostinger Node app directory (the folder that already runs the site).

Typical contents:

| Local path | Remote |
|------------|--------|
| `.next/standalone/**` | App root (or merge into existing app root) |
| Includes `server.js` (or project `server.js` if you start with that) | Keep your usual start command |
| `.env` / env vars on Hostinger | **Do not overwrite secrets** — keep Hostinger env panel keys |

If you normally run `node server.js` from the **repo root** (not inside standalone), follow your existing Hostinger workflow and upload:

1. Built app files your host expects (standalone or full project)
2. Updated source only if you build **on the server**

**Recommended for this project:** use the standalone output from `npm run build` + `copy-standalone.js`, then start with the same command Hostinger already uses (`node server.js` or `npm start`).

## 3. Environment variables (Hostinger panel)

Do **not** commit `.env.local`. On Hostinger, ensure at least:

- `AI_API_KEY` / `YOUTUBE_API_KEY` (if tools need them)
- `AUTH_SECRET` (if auth enabled)
- `DATABASE_URL` (if used)
- `INDEXNOW_ADMIN_SECRET` (optional)
- Any AdSense-related public IDs are already in code

Restart the Node app after env changes.

## 4. Restart Node

In Hostinger:

1. Node.js app → **Restart**
2. Wait until health is OK

Quick check:

```
https://www.youtubetoolshub.com/api/health
```

## 5. From your PC after live

```bash
npm run deploy:post
# or priority only:
npm run deploy:post:priority
npm run seo:check
```

## 6. Manual verification (5 minutes)

Open these and confirm **new** content (not 404 / not old layout):

| URL | Expect |
|-----|--------|
| `/tools/youtube-title-generator` | H1 in View Source + “Complete guide” body |
| `/tools/youtube-engagement-rate-calculator` | Expanded FAQ + unique sections |
| `/blog/youtube-media-kit-template-2026` | Article loads (not “Post Not Found”) |
| `/blog/youtube-adsense-payment-schedule-2026` | Article loads |
| `/tools/youtube-earnings-calculator/united-states` | Redirects to `/usa` |
| `/tools/youtube-earnings-calculator/usa` | Country H1 + FAQs |
| `/llms.txt` | Rich citation facts / clusters |

## 7. Google Search Console

1. Resubmit `https://www.youtubetoolshub.com/sitemap.xml`
2. Request indexing for:
   - `/tools/youtube-earnings-calculator`
   - `/resources/youtube-cpm-rates`
   - `/blog/youtube-media-kit-template-2026`
   - `/blog/youtube-adsense-payment-schedule-2026`
   - `/tools/youtube-thumbnail-downloader`

## 8. Common mistakes

- Uploading only `src/` without a new build → live stays old  
- Forgetting `.next/static` → CSS/JS 404  
- Overwriting Hostinger `.env` with empty local secrets  
- Running IndexNow before upload → pings old pages  

## 9. After deploy success

- Continue weekly content + outreach (`docs/GROWTH-ACTION-PLAN-NOW.md`)
- AdSense: Auto ads / vignette / Tier-1 traffic mix for RPM
