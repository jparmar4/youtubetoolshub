/**
 * Lightweight SEO smoke checks against production (or BASE_URL).
 * Usage: node scripts/check-seo.mjs
 *        BASE_URL=http://localhost:3000 node scripts/check-seo.mjs
 */

import https from "https";
import http from "http";

const BASE = (process.env.BASE_URL || "https://www.youtubetoolshub.com").replace(
  /\/$/,
  "",
);

const PATHS = [
  "/",
  "/tools",
  "/blog",
  "/faq",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/ads.txt",
  "/tools/youtube-thumbnail-downloader",
  "/tools/youtube-earnings-calculator",
  "/tools/youtube-title-generator/gaming",
  "/tools/youtube-earnings-calculator/usa",
  "/resources/youtube-cpm-rates",
  "/resources/youtube-monetization-guide",
  "/blog/youtube-adsense-payment-schedule-2026",
  // Batch 3 acquisition + money posts
  "/blog/youtube-thumbnail-size-2026",
  "/blog/how-to-download-youtube-thumbnail-2026",
  "/blog/youtube-description-template-2026",
  "/blog/youtube-channel-name-ideas-2026",
  "/blog/youtube-chapters-template-2026",
  "/blog/youtube-cpm-rates-by-country-2026",
  "/blog/youtube-shorts-monetization-2026",
  "/blog/youtube-pay-per-view-2026",
];

/** Expect 404 (or 410) — soft-404 / indexable missing URLs are failures */
const MISSING_PATHS = [
  "/blog/this-post-does-not-exist-seo-check-xyz",
  "/tools/fake-tool-seo-check-xyz",
];

/** Expect noindex (meta and/or X-Robots-Tag) */
const NOINDEX_PATHS = ["/search"];

function fetch(path) {
  const url = `${BASE}${path}`;
  const lib = url.startsWith("https") ? https : http;
  return new Promise((resolve) => {
    const req = lib.get(
      url,
      { headers: { "User-Agent": "YouTubeToolsHub-SEOCheck/1.0" }, timeout: 20000 },
      (res) => {
        let body = "";
        res.on("data", (c) => {
          body += c;
        });
        res.on("end", () =>
          resolve({
            path,
            status: res.statusCode || 0,
            len: body.length,
            body,
            headers: res.headers || {},
          }),
        );
      },
    );
    req.on("error", (err) =>
      resolve({ path, status: 0, len: 0, body: "", headers: {}, error: err.message }),
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ path, status: 0, len: 0, body: "", headers: {}, error: "timeout" });
    });
  });
}

function hasMetaNoindex(body) {
  const m = body.match(
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
  ) || body.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i,
  );
  return m ? /noindex/i.test(m[1]) : false;
}

function hasXRobotsNoindex(headers) {
  const raw = headers["x-robots-tag"] || headers["X-Robots-Tag"] || "";
  const val = Array.isArray(raw) ? raw.join(", ") : String(raw);
  return /noindex/i.test(val);
}

function hasMetaIndexable(body) {
  const m = body.match(
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
  ) || body.match(
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i,
  );
  if (!m) return true; // no robots meta → default indexable
  return !/noindex/i.test(m[1]);
}

function checks(r) {
  const issues = [];
  if (r.error) {
    issues.push(r.error);
    return issues;
  }
  if (r.status !== 200) issues.push(`HTTP ${r.status}`);
  if (r.path === "/robots.txt") {
    if (!r.body.includes("Sitemap:")) issues.push("robots missing Sitemap");
    if (!r.body.includes("Allow:")) issues.push("robots missing Allow");
    if (!r.body.includes("Disallow: /search")) {
      issues.push("robots missing Disallow: /search");
    }
    if (!r.body.includes("Disallow: /api/")) {
      issues.push("robots missing Disallow: /api/");
    }
  }
  if (r.path === "/sitemap.xml") {
    if (!r.body.includes("<urlset") && !r.body.includes("<sitemapindex")) {
      issues.push("sitemap not valid xml root");
    }
    if (!r.body.includes("<loc>")) issues.push("sitemap has no loc");
    if (/\/search[<"\s]/i.test(r.body)) {
      issues.push("sitemap should not list /search");
    }
  }
  if (r.path === "/ads.txt") {
    if (!r.body.includes("google.com")) issues.push("ads.txt missing google.com");
  }
  if (r.path === "/llms.txt") {
    if (!r.body.toLowerCase().includes("youtube")) issues.push("llms.txt weak");
  }
  if (
    r.path === "/" ||
    r.path.startsWith("/tools") ||
    r.path.startsWith("/blog") ||
    r.path.startsWith("/faq") ||
    r.path.startsWith("/resources")
  ) {
    if (!r.body.includes('rel="canonical"') && !r.body.includes("rel='canonical'")) {
      if (!r.body.includes("canonical")) issues.push("no canonical");
    }
    if (!/<h1[\s>]/i.test(r.body)) {
      issues.push("no h1");
    }
    if (!r.body.includes("application/ld+json")) {
      issues.push("no json-ld");
    }
    // Public HTML pages must not ship accidental noindex
    if (hasMetaNoindex(r.body) || hasXRobotsNoindex(r.headers)) {
      issues.push("unexpected noindex on public page");
    }
  }
  return issues;
}

function checksMissing(r) {
  const issues = [];
  if (r.error) {
    issues.push(r.error);
    return issues;
  }
  // Hard 404 preferred; 410 also OK. Soft-404 (200 + missing content) is a fail.
  if (r.status === 200) {
    issues.push("soft-404: missing URL returned 200");
    if (hasMetaIndexable(r.body) && !hasXRobotsNoindex(r.headers)) {
      issues.push("soft-404 is still indexable");
    }
  } else if (r.status !== 404 && r.status !== 410) {
    issues.push(`expected 404, got HTTP ${r.status}`);
  }
  return issues;
}

function checksNoindex(r) {
  const issues = [];
  if (r.error) {
    issues.push(r.error);
    return issues;
  }
  if (r.status !== 200) issues.push(`HTTP ${r.status}`);
  if (!hasMetaNoindex(r.body) && !hasXRobotsNoindex(r.headers)) {
    issues.push("expected noindex meta or X-Robots-Tag");
  }
  return issues;
}

async function main() {
  console.log(`SEO check → ${BASE}\n`);
  let fails = 0;

  console.log("— Public paths (must be 200 + indexable) —");
  for (const path of PATHS) {
    const r = await fetch(path);
    const issues = checks(r);
    const ok = issues.length === 0;
    if (!ok) fails++;
    const mark = ok ? "OK " : "FAIL";
    console.log(
      `${mark} ${String(r.status).padStart(3)} ${(r.len / 1024).toFixed(1).padStart(6)}KB  ${path}${issues.length ? "  → " + issues.join("; ") : ""}`,
    );
  }

  console.log("\n— Missing paths (must hard-404, not soft-404) —");
  for (const path of MISSING_PATHS) {
    const r = await fetch(path);
    const issues = checksMissing(r);
    const ok = issues.length === 0;
    if (!ok) fails++;
    const mark = ok ? "OK " : "FAIL";
    console.log(
      `${mark} ${String(r.status).padStart(3)}  ${path}${issues.length ? "  → " + issues.join("; ") : ""}`,
    );
  }

  console.log("\n— Intentional noindex paths —");
  for (const path of NOINDEX_PATHS) {
    const r = await fetch(path);
    const issues = checksNoindex(r);
    const ok = issues.length === 0;
    if (!ok) fails++;
    const mark = ok ? "OK " : "FAIL";
    console.log(
      `${mark} ${String(r.status).padStart(3)}  ${path}${issues.length ? "  → " + issues.join("; ") : ""}`,
    );
  }

  console.log(fails ? `\n${fails} path(s) need attention.` : "\nAll checks passed.");
  process.exitCode = fails ? 1 : 0;
}

main();
