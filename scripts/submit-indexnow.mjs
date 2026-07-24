/**
 * IndexNow submitter for Bing / Yandex / compatible engines.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs              # full sitemap (batched)
 *   node scripts/submit-indexnow.mjs --priority   # money pages first
 *   node scripts/submit-indexnow.mjs --limit 50   # cap URL count
 *
 * After deploy: npm run seo:indexnow
 */

import https from "https";
import http from "http";

const SITE_URL = "https://www.youtubetoolshub.com";
const API_KEY = "01d46652569c40eaa19149073834de57";
const KEY_LOCATION = `${SITE_URL}/${API_KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const PRIORITY_PATHS = [
  "/",
  "/tools",
  "/blog",
  "/faq",
  "/about",
  // Money / commercial intent
  "/tools/youtube-earnings-calculator",
  "/tools/youtube-earnings-calculator/usa",
  "/tools/youtube-earnings-calculator/uk",
  "/tools/youtube-earnings-calculator/india",
  "/resources/youtube-cpm-rates",
  "/resources/youtube-monetization-guide",
  "/resources/youtube-algorithm-guide",
  "/resources/youtube-creator-statistics",
  "/resources/link-to-us",
  // High-volume acquisition tools
  "/tools/youtube-thumbnail-downloader",
  "/tools/youtube-title-generator",
  "/tools/youtube-tag-generator",
  "/tools/youtube-tag-extractor",
  "/tools/youtube-description-generator",
  "/tools/youtube-channel-audit",
  "/tools/youtube-ai-thumbnail-generator",
  "/tools/youtube-hashtag-generator",
  "/tools/youtube-video-ideas-generator",
  "/tools/youtube-content-calendar-generator",
  "/tools/youtube-channel-name-generator",
  "/tools/youtube-timestamp-generator",
  "/tools/vs/tubebuddy",
  "/tools/vs/vidiq",
  "/tools/seo-tools",
  "/tools/thumbnail-tools",
  "/tools/analytics-tools",
  // New / refreshed blog (Batch 3 — 2026-07-24)
  "/blog/youtube-thumbnail-size-2026",
  "/blog/how-to-download-youtube-thumbnail-2026",
  "/blog/youtube-description-template-2026",
  "/blog/youtube-channel-name-ideas-2026",
  "/blog/youtube-chapters-template-2026",
  "/blog/youtube-cpm-rates-by-country-2026",
  "/blog/youtube-shorts-monetization-2026",
  "/blog/youtube-pay-per-view-2026",
  "/blog/youtube-adsense-payment-schedule-2026",
  "/blog/youtube-media-kit-template-2026",
  // AI / GEO surfaces
  "/llms.txt",
  "/llms-full.txt",
];

function parseArgs(argv) {
  const args = { priority: false, limit: 0 };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--priority") args.priority = true;
    if (argv[i] === "--limit" && argv[i + 1]) {
      args.limit = parseInt(argv[++i], 10) || 0;
    }
  }
  return args;
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "YouTubeToolsHub-IndexNow/1.0" } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          resolve(data);
        });
      })
      .on("error", reject);
  });
}

function submitBatch(urls) {
  const payload = JSON.stringify({
    host: "www.youtubetoolshub.com",
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });

  const options = {
    hostname: "api.indexnow.org",
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
      "User-Agent": "YouTubeToolsHub-IndexNow/1.0",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () =>
        resolve({ statusCode: res.statusCode, body: body || "(empty)" }),
      );
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function extractLocs(xml) {
  const urls = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let match;
  while ((match = re.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return [...new Set(urls)];
}

function prioritize(urls) {
  const prioritySet = new Set(
    PRIORITY_PATHS.map((p) => `${SITE_URL}${p === "/" ? "" : p}`),
  );
  // Also allow trailing slash variants
  const scored = urls.map((url) => {
    const bare = url.replace(/\/$/, "") || SITE_URL;
    let score = 0;
    if (prioritySet.has(url) || prioritySet.has(bare)) score += 100;
    if (url.includes("/tools/youtube-")) score += 20;
    if (url.includes("/blog/")) score += 10;
    if (url.includes("/resources/")) score += 15;
    if (url.includes("/tools/vs/")) score += 25;
    // niche long-tail slightly lower
    if (/\/tools\/[^/]+\/[^/]+$/.test(url) && !url.includes("earnings-calculator")) {
      score -= 5;
    }
    return { url, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.url);
}

async function main() {
  const args = parseArgs(process.argv);
  console.log("IndexNow submitter");
  console.log(`  site: ${SITE_URL}`);
  console.log(`  mode: ${args.priority ? "priority-first" : "full sitemap"}`);

  let urls = [];

  if (args.priority) {
    urls = PRIORITY_PATHS.map((p) =>
      p === "/" ? SITE_URL : `${SITE_URL}${p}`,
    );
    console.log(`Priority list: ${urls.length} URLs`);
  } else {
    console.log(`Fetching sitemap: ${SITEMAP_URL}`);
    try {
      const xml = await fetchUrl(SITEMAP_URL);
      urls = extractLocs(xml);
      console.log(`Found ${urls.length} URLs in sitemap`);
    } catch (err) {
      console.error("Sitemap fetch failed:", err.message);
      console.log("Falling back to priority URL list...");
      urls = PRIORITY_PATHS.map((p) =>
        p === "/" ? SITE_URL : `${SITE_URL}${p}`,
      );
    }
  }

  // Always ensure money pages are included
  for (const p of PRIORITY_PATHS) {
    const u = p === "/" ? SITE_URL : `${SITE_URL}${p}`;
    if (!urls.includes(u)) urls.unshift(u);
  }

  urls = prioritize([...new Set(urls)]);

  if (args.limit > 0) {
    urls = urls.slice(0, args.limit);
    console.log(`Limited to first ${urls.length} URLs`);
  }

  if (urls.length === 0) {
    console.error("No URLs to submit.");
    process.exit(1);
  }

  const batchSize = 1000;
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const n = Math.floor(i / batchSize) + 1;
    console.log(`Submitting batch ${n} (${batch.length} URLs)...`);
    console.log(`  first: ${batch[0]}`);
    try {
      const result = await submitBatch(batch);
      console.log(`  status: ${result.statusCode} ${result.body}`);
      // IndexNow: 200/202 success
      if (result.statusCode === 200 || result.statusCode === 202) ok++;
      else fail++;
    } catch (err) {
      console.error(`  error: ${err.message}`);
      fail++;
    }
    // polite pause between batches
    if (i + batchSize < urls.length) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  console.log(`Done. Batches ok=${ok} fail=${fail}. Total URLs=${urls.length}`);
  if (fail > 0) process.exitCode = 1;
}

main();
