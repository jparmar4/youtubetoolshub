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
  "/tools/youtube-earnings-calculator/united-states",
];

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
          if (body.length < 200_000) body += c;
        });
        res.on("end", () =>
          resolve({
            path,
            status: res.statusCode || 0,
            len: body.length,
            body,
            headers: res.headers,
          }),
        );
      },
    );
    req.on("error", (err) =>
      resolve({ path, status: 0, len: 0, body: "", error: err.message }),
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ path, status: 0, len: 0, body: "", error: "timeout" });
    });
  });
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
  }
  if (r.path === "/sitemap.xml") {
    if (!r.body.includes("<urlset") && !r.body.includes("<sitemapindex")) {
      issues.push("sitemap not valid xml root");
    }
    if (!r.body.includes("<loc>")) issues.push("sitemap has no loc");
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
    r.path.startsWith("/faq")
  ) {
    if (!r.body.includes("rel=\"canonical\"") && !r.body.includes("rel='canonical'")) {
      // Next may put canonical in different form
      if (!r.body.includes("canonical")) issues.push("no canonical");
    }
    if (!/<h1[\s>]/i.test(r.body)) {
      issues.push("no h1");
    }
    if (!r.body.includes("application/ld+json")) {
      issues.push("no json-ld");
    }
  }
  return issues;
}

async function main() {
  console.log(`SEO check → ${BASE}\n`);
  let fails = 0;
  for (const path of PATHS) {
    const r = await fetch(path);
    const issues = checks(r);
    const ok = issues.length === 0 && r.status === 200;
    if (!ok) fails++;
    const mark = ok ? "OK " : "FAIL";
    console.log(
      `${mark} ${String(r.status).padStart(3)} ${(r.len / 1024).toFixed(1).padStart(6)}KB  ${path}${issues.length ? "  → " + issues.join("; ") : ""}`,
    );
  }
  console.log(fails ? `\n${fails} path(s) need attention.` : "\nAll checks passed.");
  process.exitCode = fails ? 1 : 0;
}

main();
