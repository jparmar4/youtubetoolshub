# Website Audit Report — YouTube Tools Hub

**Date:** 2026-09-24  
**Scope:** Full codebase audit (security, SEO/AEO, code quality, testing/CI, performance, accessibility, privacy, docs) + remediation  
**Baseline → Final:** lint 10 errors → **0** · typecheck clean → **clean** · `npm audit` 11 vulns (3 critical) → **0** · no tests wired → **`npm test` passing** · no CI → **CI active** · build OK → **build OK**

---

## Executive summary

| Severity | Found | Fixed | Accepted / manual |
|---|---:|---:|---|
| Critical | 2 | 1 | 1 (password rotation — requires Hostinger access) |
| High | 6 | 6 | 0 |
| Medium | 8 | 7 | 1 (rate-limit multi-instance — documented) |
| Low | 6 | 5 | 1 (git history purge — optional, destructive) |
| **Total** | **22** | **19** | **3** |

**Manual actions required (you):**

1. **Rotate the Hostinger MySQL password** — old password was committed in git history (`src/lib/db.ts`). Removed from code; history still contains it. Rotate in Hostinger panel → update `.env.local` + production env.
2. Confirm the GitHub repo is **private** (`github.com/jparmar4/youtubetoolshub`).
3. After deploy: smoke-test **AdSense / Clarity / Razorpay checkout** — CSP `unsafe-eval` was removed (rollback note in finding #5). All signed-in users will be signed out once (new `AUTH_SECRET`).

---

## Critical

### 1. Hardcoded MySQL credentials in source — FIXED
- **Was:** `src/lib/db.ts:8-10` fell back to literal `u393706093_yuvraj` / `Yuvraj@382017` / `u393706093_yuvi` when env vars were missing; committed to git.
- **Fix:** Credentials removed; `getPool()` now requires `MYSQL_URL` or `MYSQL_HOST`+`MYSQL_USER`+`MYSQL_PASSWORD`+`MYSQL_DATABASE` and throws a clear config error otherwise. `.env.example` placeholders scrubbed of real usernames.
- **Still required:** Rotate the password on Hostinger (it lives in git history forever). See manual action #1.

### 2. Weak / placeholder secrets in `.env.local` — FIXED (local)
- **Was:** `AUTH_SECRET` was a weak sequential-hex placeholder (`a8f9d3b42c…`); `INDEXNOW_ADMIN_SECRET` was still `change-me-to-a-secure-random-secret`.
- **Fix:** Both regenerated with `crypto.randomBytes` (96 hex chars / 64 hex chars) in `.env.local`.
- **Impact:** Existing sessions invalidate on next deploy (users sign in again). IndexNow admin API secret is now real — set the **same value** as GitHub secret `INDEXNOW_ADMIN_SECRET` if you use the workflow API step.
- **Manual:** Mirror the new secrets into Hostinger environment variables.

---

## High

### 3. 11 dependency vulnerabilities (3 critical, 6 high, 2 moderate) — FIXED
- **Was:** `nodemailer ≤9.1.0` (8 advisories: CRLF injection, SSRF/file-read, TLS validation, IDN bypass…), `postcss ≤8.5.22` (path traversal via sourcemap), nested `sharp ≤0.35.4-rc.0` (libvips/libheif CVEs), `critters` via postcss.
- **Fix:**
  - `nodemailer` → `^10.0.10` (contact + newsletter routes use stable `createTransport`/`sendMail` API; typecheck + build pass)
  - `postcss` override `8.5.13` → `^8.5.23`
  - `npm audit fix` for sharp/critters/transitives
- **Result:** `npm audit --omit=dev` → **0 vulnerabilities**.

### 4. No CI — FIXED
- **Was:** README claimed `.github/workflows/post-deploy-seo.yml` existed; actual file was stranded in `docs/github-workflows/` and **there was no `.github/` directory**. No lint/typecheck/test gates anywhere.
- **Fix:**
  - Created **`.github/workflows/ci.yml`** — on push/PR to `main`/`master`: `npm ci` → `typecheck` → `lint` → `test` → `build` (Node 22, build-time env stubs)
  - Moved post-deploy SEO workflow to **`.github/workflows/post-deploy-seo.yml`**
  - Fixed broken step condition: `secrets.*` is not readable in `if:` — secret now exposed via job `env` and checked with `env.INDEXNOW_ADMIN_SECRET != ''`
  - Added npm scripts: `"typecheck": "tsc --noEmit"`, `"test": "node scripts/test-commercial-calculators.cjs && node scripts/test-discovery.cjs"`
- **Note:** `post-deploy-seo.yml` still runs IndexNow on every push to master after paths filter — intended; disable `push:` trigger if unwanted.

### 5. CSP allowed `script-src 'unsafe-eval'` — FIXED (verify after deploy)
- **Was:** `next.config.mjs:128` included `'unsafe-eval'` (XSS → arbitrary code execution escalation).
- **Fix:** Removed; `'unsafe-inline'` retained (required by AdSense/gtag inline snippets). Comment in config documents rollback.
- **Risk:** Rare vendor breakage (some Clarity/Razorpay builds historically used eval). **Smoke-test ads, analytics, and checkout after deploy.** Re-add `'unsafe-eval'` only if a specific vendor console-errors on CSP.

### 6. Lint failing (10 errors) — FIXED
- **Was:** `@typescript-eslint/no-require-imports` in `scripts/test-commercial-calculators.cjs` + `scripts/test-discovery.cjs`. Config only exempted `scripts/**/*.js`, not `.cjs`.
- **Fix:** `eslint.config.mjs` override now includes `scripts/**/*.cjs`.  
- **Result:** `npm run lint` → **0 problems** (also eliminated the Babel “deoptimised styling >500KB” note — see #11).

### 7. Blog content in one 1.76 MB / 29,921-line TS module — FIXED
- **Was:** `src/config/blog.ts` — slowed lint (Babel deopt), typecheck, and was unreviewable; any edit dirtied a 30k-line file.
- **Fix:** Mechanical AST-based split (same public API, zero call-site changes):
  ```
  src/config/blog/
    index.ts          # blogPosts assembly + helpers (116 lines)
    types.ts          # BlogPost interface
    data/posts-1..5.ts # 86 posts chunked (~250–380 KB each)
  ```
- **Verified:** `tsc --noEmit` clean, lint clean (no deopt), tests pass, `next build` succeeds with all 86 `/blog/[slug]` SSG pages.

### 8. README / docs drift — FIXED
- **Was:** Stack said “Postgres” (actual: **MySQL**); env table said `DATABASE_URL` only; GitHub Actions section pointed at a non-existent path.
- **Fix:** README updated (stack, `MYSQL_*` keys, both workflow files). 

---

## Medium

### 9. Silent error swallowing in `db.ts` — FIXED
- **Was:** `ensureTablesExist().catch(() => {})` at two call sites — table-init failures invisible.
- **Fix:** Both log `[Database] ensureTablesExist failed:` with the error.
- **Audited other suspected swallows** (explore-pass false positives / intentional):  
  `history:59`, `generate:65` = invalid-JSON handlers (correct) · `newsletter:19` = missing file → `[]` (correct) · `channel-id:68`, `playlist-length:41`, `download-image:48` = URL-parse fallbacks with comments (correct) · all other API `catch` blocks log via `console.error`.

### 10. Sitemap index inconsistency — FIXED
- **Was:** `robots.ts` + middleware advertise `/sitemap-index.xml` (hyphen), but `/api/ai-context` and `/.well-known/ai.txt` advertised `/sitemap_index.xml` (underscore). Both routes existed; underscore route already 301s to hyphen (kept as legacy alias).
- **Fix:** Canonical hyphen URL now advertised in `ai-context` + `ai.txt`. Alias route retained for old links. `next.config.mjs` XML cache headers on the (now redirecting) underscore path are harmless.

### 11. Dead weight & repo hygiene — FIXED
Removed / relocated:
| Item | Action |
|---|---|
| 6 root `inject_*.py/.mjs` one-off content scripts | `git rm` |
| `src/app/api/setup-db/` (empty) | deleted |
| `eslint_output.txt`, `lint-results*.json`, `tsconfig.tsbuildinfo` | deleted from disk (were gitignored) |
| `.tmp_content_review/` | deleted |
| `src/dictionaries/{es,hi,pt}.json` (unused; i18n registers only `en`) | `git rm` — locale-prefix **redirects** in `proxy.ts` kept for old URLs |
| Root `youtubetoolshub_content_strategy.xlsx` | moved → `outputs/` |
| Root `youtubetoolshub_blog_publish_plan_2026.xlsx` | removed (byte-identical copy already in `outputs/`) |

### 12. Accessibility gaps in forms/modals — FIXED
| Component | Fix |
|---|---|
| `NewsletterSignup.tsx` | `aria-label` on email input; `role="status"` / `role="alert"` on result messages |
| `ExitIntentPopup.tsx` | `role="dialog"` + `aria-modal` + `aria-label`; Escape-to-close; `aria-label` on email input |
| `ShareModal.tsx` | `role="dialog"` + `aria-modal` + `aria-label`; close button `aria-label` |
| `LimitReachedModal.tsx` | `role="dialog"` + `aria-modal` + `aria-labelledby`; close button `aria-label` |
| `CookieConsent.tsx` | `role="region"` + `aria-label="Cookie consent"` |

Already solid (unchanged): header menu `aria-expanded`, breadcrumb `aria-current`, ad close labels, calculator `role="status"`/`role="alert"`, image `alt` coverage across tools.

### 13. Privacy policy under-disclosed third parties — FIXED
- **Was:** “analytics (such as Google Analytics) and advertising” only.
- **Fix:** Policy now names Google Analytics, Microsoft Clarity, Google AdSense, Razorpay, Google OAuth, AI tool providers, and the YouTube Data API — matching actual runtime behavior (`ConsentAnalytics`, AdSense in `layout.tsx`, Razorpay routes, `src/lib/ai.ts`).

### 14. Consent Mode / cookie banner — KEPT (intentional, verified compliant pattern)
- Defaults: `granted` globally + `denied` override for EEA/UK/CH (`layout.tsx:306-325`) with `wait_for_update: 500`.
- Banner only blocks in likely-GDPR timezones (`CookieConsent` + `isLikelyGdprTimezone`); Accept/Decline both wired to `gtag('consent','update', …)` via `ConsentAnalytics`.
- **Decision:** Keep — deliberate revenue optimization with region-correct GDPR gating; documented, not a defect.

### 15. Tool auth-gate disabled — KEPT (intentional)
- `src/proxy.ts:155-171` commented out (“DISABLED for Growth”) so tools stay crawlable/logged-out-accessible for traffic + ads.
- AI endpoints still have IP/user rate limits + pro tiers (`/api/generate` etc.).
- **Decision:** Keep disabled; re-enabling would noindex-block growth. Documented as accepted risk.

---

## Low

### 16. Process-local rate limiting — ACCEPTED (documented)
- `src/lib/rate-limit.ts` is in-memory Map with pruning + 10k cap — fine for **single-instance** Hostinger Node; self-documented as not multi-instance-safe.
- If you ever scale horizontally, move to Redis/MySQL-backed limiter.

### 17. Git history still contains old DB password — ACCEPTED (optional follow-up)
- Not rewriting history (destructive; needs explicit request + backup).
- **Recommended path:** rotate password (invalidates the leaked secret) rather than `git filter-repo`. If you still want a purge: fresh clone + `git filter-repo --path src/lib/db.ts --invert-paths` + force-push (coordinate; breaks all clones).

### 18. `next-auth@5.0.0-beta.30` — NOTED
- v5 still beta; works and typechecks. Plan migration to stable when released.

### 19. No unit/e2e framework — PARTIAL
- Wired the 2 existing regression scripts into `npm test` + CI. Broader coverage (API routes, webhooks) remains a future investment — not blocking.

### 20. Performance — REVIEWED, no risky changes
- `next build` ✅ · standalone copy ✅ · **35 JS + 2 CSS** static assets (lean)
- Routes mostly static/SSG (`○`/`●`); dynamic only where needed (API, feeds, proxy)
- Blog split removed the only build-time lint deopt
- No aggressive bundle refactors attempted (framer-motion is the main client dep; leave unless CWV regresses)

### 21. Razorpay payment security — VERIFIED OK (no change)
- Webhook: HMAC-SHA256 + `timingSafeEqual` + length guard (`webhooks/razorpay/route.ts`)
- Checkout verify: signature check + server-side plan fetch + email binding (`verify-payment/route.ts`)
- Create-order: auth-gated, rate-limited, **server-side pricing** (client cannot set amount)
- Download proxy: hostname allowlist + `redirect: "error"` (SSRF-safe)

### 22. `sitemap_index.xml` headers-only block in `next.config.mjs` — NOTED
- Underscore path now primarily 301s; XML Cache-Control header on the redirect is inert. Left as-is to avoid touching redirect/header precedence late in the audit.

---

## Verification (final gates — all run post-fix)

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run typecheck` | ✅ exit 0 |
| Lint | `npm run lint` | ✅ 0 problems |
| Tests | `npm test` | ✅ both suites pass |
| Dependencies | `npm audit --omit=dev` | ✅ 0 vulnerabilities |
| Production build | `npm run build` | ✅ all routes + standalone copy |

---

## Post-deploy checklist

- [ ] Rotate Hostinger MySQL password → update `.env.local` + production env
- [ ] Deploy new `AUTH_SECRET` + `INDEXNOW_ADMIN_SECRET` to Hostinger (sessions reset once)
- [ ] Set GitHub secret `INDEXNOW_ADMIN_SECRET` (optional, for workflow API step)
- [ ] Smoke-test: AdSense fill, Clarity load, GA4, Razorpay checkout, contact form email
- [ ] If CSP blocks a vendor: re-add `'unsafe-eval'` to `script-src` in `next.config.mjs` (comment marks the spot)
- [ ] Confirm GitHub repo visibility = private
- [ ] Watch first CI run on push (typecheck → lint → test → build)

## Accepted product decisions (not defects)

1. Tool pages publicly accessible without sign-in (growth/SEO)
2. Consent Mode `granted` default outside EEA/UK/CH (revenue) with region-correct denial + banner inside them
3. Process-local rate limits on single-instance host
4. Git history not rewritten (password rotation instead)

---

# Second-pass deep audit (batches 1–7)

**Date:** 2026-09-24  
**Scope:** ~70 residual findings across security, a11y, SEO correctness, performance, contrast, and dead-code cleanup  
**Baseline → Final:** lint **0** · typecheck **clean** · tests **pass** · `npm audit --omit=dev` **0** · `next build` **OK (301 SSG pages)**

## Batch 1 — Security

| # | Finding | Fix |
|---|---|---|
| S1 | Open redirect via unvalidated `callbackUrl` in NextAuth | `src/auth.ts` — allow same-origin paths only |
| S2 | Rate-limit IP taken only from `x-forwarded-for[0]` (spoofable) | `getRequestIp()` prefers `x-real-ip`, else last XFF hop |
| S3 | Middleware redirects could go off-origin | `src/proxy.ts` — fixed-origin `new URL(path, request.url)` |
| S4 | GHA IndexNow step interpolated secrets into shell | `post-deploy-seo.yml` — env-based base URL, Node 22 |
| S5 | `/api/trending` accepted arbitrary category strings | Allowlist of known categories |
| S6 | Plan lookups used `obj[key]` (prototype pollution risk) | `Object.hasOwn` guards |
| S7 | `/api/indexnow` compared secrets with `===` (timing) | `crypto.timingSafeEqual` + rate limit |
| S8 | Contact route: unbounded body + injectable `from`/`replyTo` | Length caps; safe header construction |
| S9 | `server.js` `serveFile` dead `ifNoneMatch` + missing traversal/SVG guards | 304/ETag kept; traversal resolved; `X-Content-Type-Options`; SVG CSP |
| S10 | `outputs/**/*.{xlsx,csv,docx,ndjson}` tracked in git | `.gitignore` recursive patterns; `git rm --cached` (incl. `content_plan_v2/*`) |

## Batch 2 — Accessibility (serious)

| # | Finding | Fix |
|---|---|---|
| A1 | `UserMenu` no Escape / focus return / `aria-haspopup` | Escape closes + restores focus; `aria-haspopup`/`aria-expanded`; light-theme white dropdown |
| A2 | Nested `<Link><Button>` (invalid HTML, double focus) | 11 sites → styled `<Link>` (home ×5, 404, about, SmartWorkflow, ToolAuthGuard) |
| A3 | No skip link / `main` landmark | Skip link + `<main id="main-content" tabIndex={-1}>` in `layout.tsx` |
| A4 | No `:focus-visible` / reduced-motion | Global blocks in `globals.css`; `MotionConfig reducedMotion="user"` |
| A5 | Modals/menus don't close on Escape | Share, LimitReached, Header mobile, ToolHistory detail (with autofocus) |
| A6 | `ToolHistory` cards not keyboard-operable | `role="button"`/`tabIndex`/`onKeyDown`; delete visible on focus; aria-labels |
| A7 | Orphan `<label>`s in history panel | → `<span>` |
| A8 | Bare `focus:outline-none` (no replacement) | ExitIntent/Newsletter inputs → `focus-visible` ring |
| A9 | Icon-only buttons missing labels | UsageBanner dismiss, ScrollToTop, honeypot `aria-hidden` |

## Batch 3 — SEO correctness

| # | Finding | Fix |
|---|---|---|
| SEO1 | Topic-cluster pillar/spoke paths pointed at deleted slugs | Remapped to live posts (`topic-clusters.ts`) |
| SEO2 | No resource index page | NEW `src/app/resources/page.tsx` (BreadcrumbList + `GEO_AEO_PRESETS.resourcePage` 5-arg) |
| SEO3 | `atom.xml` broke on `]]>` / unescaped XML | `escapeXml` + `cdata()` |
| SEO4 | Sitemap missing legal pages | `/privacy-policy`, `/terms-of-use`, `/disclaimer`, `/refund-policy`, `/resources` lastmod |
| SEO5 | CollectionPage JSON-LD included off-page posts | Capped to `POSTS_ON_INDEX` |
| SEO6 | VideoObject duration invalid when `video` missing | `post.video?.duration ?? "PT10M"` |
| SEO7 | `contact/layout.tsx` duplicated page metadata | Layout owns robots-only; page owns title/description |
| SEO8 | Double brand in titles (`… \| YouTube Tools Hub \| YouTube Tools Hub`) | `title: { absolute }` on about, api-docs, vidiq, tubebuddy, faq, tools, search, link-to-us, 404, home |
| SEO9 | Tool FAQs rendered on both parent and tool pages | FAQ only on parent `/tools/[slug]`; `ToolPageLayout` `faq` prop kept `@deprecated` for typecheck |

## Batch 4 — Performance (quick)

| # | Finding | Fix |
|---|---|---|
| P1 | `ToolHistory` always in tool-page bundle | `dynamic(..., { ssr: false })` |
| P2 | `UsageContext` value recreated every render | `useMemo` |
| P3 | Unused deps (`@formatjs/intl-localematcher`, `@types/negotiator`, `date-fns`, `negotiator`) | Removed + `npm prune` (−5 pkgs); `engines.node >=20` |
| P4 | Cache headers: public static files far-future immutable | `/_next/static` immutable 1y; public static `max-age=86400, must-revalidate` |
| P5 | Dead font preconnects (next/font self-hosts) | Removed from `layout.tsx` |
| P6 | 6 `fill` images missing `sizes` | Added responsive `sizes` (ExpertQuote, ChannelIdFinder, CommentPicker, PlaylistLength, SubscriberCount, blog cover) |

## Batch 5 — Performance (medium)

| # | Finding | Fix |
|---|---|---|
| P7 | Dashboard/ LimitReached imported full `tools.ts` (all components graph) | NEW `src/config/tool-meta.ts` (30 slim entries) + `getToolMetaBySlug` |
| P8 | `/tools/[slug]` statically imported 30 tool components | `next/dynamic` map keyed by slug |

## Batch 6 — Contrast + remaining a11y

| # | Finding | Fix |
|---|---|---|
| C1 | Light-theme purple/fuchsia badges below WCAG AA | `Card` purple-400→600, fuchsia-400→700; blog/vidiq badges `bg-purple-500`→`purple-700`; resource CTAs `bg-purple-500`→`purple-700`; `blog/[slug]` icons `text-purple-400`→`600` |
| C2 | Helper text `slate-400` on white | `Input`/`Select` → `slate-600` |
| C3 | Icon-only controls < 44×44 | Modal close, CopyButton, ShareButtons, Header hamburger → `min-w-11`/`min-h-11` |
| A10 | Table headers missing `scope` | `scope="col"` on 8 files (earnings ×3, cpm-rates ×2, creator-stats, monetization, PricingClient, ContentCalendar, content-processor) — `<thead>` preserved |
| A11 | Pricing monthly/yearly toggle not announced | `role="group"` + `aria-pressed` + `type="button"` + `min-h-11` + higher-contrast inactive state |
| A12 | Tool content swap not announced | `aria-live="polite"` on tool content region |

## Batch 7 — Cleanup

| # | Finding | Fix |
|---|---|---|
| CL1 | 11 dead schema exports in `src/lib/seo.ts` | Removed `getLocalBusinessSchema`, `getSpeakableSchema`, `getDefinedTermSchema`, `getReviewSchema`, `getAggregateRatingSchema`, `getNewsArticleSchema`, `getWebPageSchema`, `getAuthorSchema`, `getClaimReviewSchema`, `getLiveBlogPostingSchema`, `getAnswerSchema` (only used in dead docs) |
| CL2 | Unused `src/lib/i18n.ts` + `src/dictionaries/en.json` | Deleted (no importers) |
| CL3 | Unused `src/config/comparisons.ts` | Deleted (no importers) |
| CL4 | Stale `NOINDEX_BLOG_SLUGS` (21) + `RETIRED_BLOG_SLUGS` (17) with zero matching posts | Emptied to `new Set<string>([])` (kept structure for future use) |
| CL5 | `feed.xml` raw interpolation (XXE/entity risk on titles/attrs) | Local `escapeXml` + `cdata()` for all dynamic values |
| CL6 | Temp audit scripts (`fix-contrast-once.cjs`, `fix-thead.cjs`, `clean-seo.cjs`, `check-stale-slugs.cjs`) | Deleted after use |

## Verification (second-pass gates)

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run typecheck` | ✅ exit 0 |
| Lint | `npm run lint` | ✅ 0 problems |
| Tests | `npm test` | ✅ both suites pass |
| Dependencies | `npm audit --omit=dev` | ✅ 0 vulnerabilities |
| Production build | `npm run build` | ✅ 301 static pages + standalone copy |

## Accepted / not changed (second-pass)

- Bare `focus:outline-none` + `focus:ring-*` pairs left as-is (ring is the visible indicator).
- Dead one-off scripts under `scripts/` (`expand-*.mjs`, `insert-*.mjs`, etc.) left — operational utilities, not wired into npm scripts.
- `NOINDEX`/`RETIRED` sets emptied rather than removed — call sites (`blog/[slug]`, `indexnow`, `getIndexableBlogPosts`) keep the filter API.
- Git history still contains the old MySQL password (same as first-pass finding #17).
