/**
 * Pre/post deploy checklist for YouTube Tools Hub.
 *
 * Usage:
 *   node scripts/deploy-checklist.mjs           # local pre-deploy checks
 *   node scripts/deploy-checklist.mjs --post    # after deploy (hits production)
 *   node scripts/deploy-checklist.mjs --post --base https://www.youtubetoolshub.com
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const isPost = args.includes("--post");
const baseIdx = args.indexOf("--base");
const BASE = (
  baseIdx >= 0 ? args[baseIdx + 1] : "https://www.youtubetoolshub.com"
).replace(/\/$/, "");

const REQUIRED_FILES = [
  "src/app/tools/youtube-earnings-calculator/page.tsx",
  "src/components/blog/EarningsCalculatorCTA.tsx",
  "src/lib/related-tools.ts",
  "src/app/api/extract-tags/route.ts",
  "public/images/badge-calculator.svg",
  "public/images/badge-small.svg",
  "public/placeholder-thumbnail.svg",
  "docs/BACKLINK-OUTREACH.md",
  "scripts/submit-indexnow.mjs",
  "scripts/check-seo.mjs",
  "package.json",
];

const ENV_KEYS_RECOMMENDED = [
  "AI_API_KEY",
  "YOUTUBE_API_KEY",
  "AUTH_SECRET",
  "DATABASE_URL",
];

const POST_PATHS = [
  "/",
  "/tools/youtube-earnings-calculator",
  "/resources/link-to-us",
  "/resources/youtube-cpm-rates",
  "/images/badge-calculator.svg",
  "/images/badge-small.svg",
  "/placeholder-thumbnail.svg",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/ads.txt",
  "/api/extract-tags?videoId=dQw4w9WgXcQ",
];

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}
function fail(msg) {
  console.log(`  ✗ ${msg}`);
}
function info(msg) {
  console.log(`  → ${msg}`);
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: { "User-Agent": "YouTubeToolsHub-DeployCheck/1.0" },
        timeout: 20000,
      },
      (res) => {
        let body = "";
        res.on("data", (c) => {
          if (body.length < 120_000) body += c;
        });
        res.on("end", () =>
          resolve({
            status: res.statusCode || 0,
            body,
            len: body.length,
          }),
        );
      },
    );
    req.on("error", (e) => resolve({ status: 0, body: "", error: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, body: "", error: "timeout" });
    });
  });
}

function checkLocal() {
  console.log("\n══ PRE-DEPLOY (local) ══\n");
  let fails = 0;

  console.log("Required files");
  for (const rel of REQUIRED_FILES) {
    const p = path.join(root, rel);
    if (fs.existsSync(p)) ok(rel);
    else {
      fail(`missing ${rel}`);
      fails++;
    }
  }

  console.log("\npackage.json scripts");
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(root, "package.json"), "utf8"),
    );
    for (const s of [
      "build",
      "seo:indexnow",
      "seo:indexnow:priority",
      "seo:check",
      "seo:tracker",
      "deploy:post",
      "deploy:check",
    ]) {
      if (pkg.scripts?.[s]) ok(`npm run ${s}`);
      else {
        fail(`missing script: ${s}`);
        fails++;
      }
    }
  } catch {
    fail("cannot read package.json");
    fails++;
  }

  console.log("\nEnv (.env.local keys present — values not shown)");
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    fail(".env.local not found (OK if secrets only on host)");
  } else {
    const envText = fs.readFileSync(envPath, "utf8");
    for (const key of ENV_KEYS_RECOMMENDED) {
      if (new RegExp(`^${key}=`, "m").test(envText)) ok(key);
      else info(`${key} not in .env.local (set on server if needed)`);
    }
  }

  console.log("\nGit hint");
  info("Commit & push, then deploy to Hostinger/Node host");
  info("After live: node scripts/deploy-checklist.mjs --post");

  console.log("\nManual deploy steps");
  [
    "1. git add -A && git commit && git push (or upload build)",
    "2. npm run build && npm start (or host pipeline)",
    "3. Confirm https://www.youtubetoolshub.com returns 200",
    "4. npm run deploy:post   (health wait + IndexNow full + smoke checks)",
    "   or: npm run deploy:post:priority  (faster, money URLs only)",
    "   or: GitHub Actions → Post-deploy SEO workflow (workflow_dispatch)",
    "5. GSC: resubmit sitemap + inspect earnings calculator URL",
    "6. Smoke: Shorts thumbnail URL, tag extractor, content calendar",
    "7. Outreach: docs/EMAIL-OUTREACH-SEQUENCES.md + tracker xlsx (10 Day-0 emails)",
  ].forEach((s) => info(s));

  return fails;
}

async function checkPost() {
  console.log(`\n══ POST-DEPLOY (${BASE}) ══\n`);
  let fails = 0;

  for (const p of POST_PATHS) {
    const url = `${BASE}${p}`;
    const r = await fetchUrl(url);
    if (r.error) {
      fail(`${p} — ${r.error}`);
      fails++;
      continue;
    }
    if (r.status !== 200) {
      fail(`${p} — HTTP ${r.status}`);
      fails++;
      continue;
    }

    // Content checks
    const issues = [];
    if (p === "/tools/youtube-earnings-calculator") {
      if (!/<h1[\s>]/i.test(r.body)) issues.push("no h1");
      if (!/earnings calculator/i.test(r.body)) issues.push("weak copy");
      if (!/application\/ld\+json/i.test(r.body)) issues.push("no json-ld");
    }
    if (p === "/resources/link-to-us") {
      if (!/badge-calculator|Earnings Calculator HTML|calculator/i.test(r.body))
        issues.push("missing calculator embed section");
    }
    if (p === "/api/extract-tags?videoId=dQw4w9WgXcQ") {
      if (!/"success"\s*:\s*true/.test(r.body) && !/"tags"/.test(r.body))
        issues.push("unexpected extract-tags body");
    }
    if (issues.length) {
      fail(`${p} — ${issues.join("; ")}`);
      fails++;
    } else {
      ok(`${p} (${(r.len / 1024).toFixed(1)}KB)`);
    }
  }

  // POST extract-tags
  console.log("\nAPI POST extract-tags");
  const postResult = await new Promise((resolve) => {
    const data = JSON.stringify({
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
    const url = new URL(`${BASE}/api/extract-tags`);
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          "User-Agent": "YouTubeToolsHub-DeployCheck/1.0",
        },
        timeout: 20000,
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () =>
          resolve({ status: res.statusCode || 0, body }),
        );
      },
    );
    req.on("error", (e) => resolve({ status: 0, body: e.message }));
    req.write(data);
    req.end();
  });

  if (postResult.status === 200 || postResult.status === 429) {
    ok(`POST /api/extract-tags → ${postResult.status}`);
  } else if (postResult.status === 405) {
    fail(
      "POST /api/extract-tags → 405 (old deploy — extract-tags POST fix not live)",
    );
    fails++;
  } else {
    fail(`POST /api/extract-tags → ${postResult.status}`);
    fails++;
  }

  console.log("\nNext");
  info("npm run seo:indexnow");
  info("GSC → request indexing for /tools/youtube-earnings-calculator");
  info("Send 10 outreach emails (Template A) from docs/BACKLINK-OUTREACH.md");

  return fails;
}

const fails = isPost ? await checkPost() : checkLocal();
console.log(
  fails
    ? `\n${fails} issue(s) found.\n`
    : `\nAll automated checks passed.\n`,
);
process.exitCode = fails ? 1 : 0;
