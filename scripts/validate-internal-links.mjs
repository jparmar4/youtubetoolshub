/**
 * Internal link hygiene for blog content.
 *
 * Usage:
 *   node scripts/validate-internal-links.mjs           # report spaced/broken URLs
 *   node scripts/validate-internal-links.mjs --fix      # rewrite spaced URLs in blog files
 *   node scripts/validate-internal-links.mjs --live     # HTTP-check each target (BASE_URL or prod)
 *
 * Fixes/flags markdown links whose URL path contains " - " (an artifact of
 * copy/paste imports): (/tools/youtube - tag - generator) -> (/tools/youtube-tag-generator)
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = path.resolve(import.meta.dirname, "..");
const BLOG_DIR = path.join(ROOT, "src/config/blog");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".ts")) out.push(full);
  }
  return out;
}
const BLOG_FILES = walk(BLOG_DIR);
const BASE = (process.env.BASE_URL || "https://www.youtubetoolshub.com").replace(/\/$/, "");

const doFix = process.argv.includes("--fix");
const doLive = process.argv.includes("--live");

let src = BLOG_FILES.map((f) => fs.readFileSync(f, "utf8")).join("\n");

// Only link URLs (start with /), never image paths.
const SPACED_URL = /\]\((\/(?!images\/)[^)\n]*?[^)\n]*?)\)/g;
const spaced = [];
for (const m of src.matchAll(SPACED_URL)) {
  if (m[1].includes(" - ")) spaced.push(m[1]);
}

if (spaced.length && doFix) {
  let fixed = 0;
  for (const file of BLOG_FILES) {
    const original = fs.readFileSync(file, "utf8");
    const updated = original.replace(SPACED_URL, (_, url) => `](${url.replace(/ - /g, "-")})`);
    if (updated !== original) {
      fs.writeFileSync(file, updated);
      fixed++;
    }
  }
  console.log(`Fixed ${spaced.length} spaced URL occurrences across ${fixed} blog file(s)`);
} else if (spaced.length) {
  console.log(`Found ${spaced.length} spaced URLs (run with --fix):`);
  for (const u of [...new Set(spaced)].slice(0, 30)) console.log(`  ${u}`);
}

// Collect every internal link target (re-read after any fix pass).
src = BLOG_FILES.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const hrefs = new Set();
for (const m of src.matchAll(/\]\((\/(?!images\/)[^)\n]+?)\)/g)) {
  hrefs.add(m[1].split("#")[0]);
}

console.log(`\n${hrefs.size} unique internal link targets`);
if (!doLive) process.exit(0);

function fetch(url) {
  const lib = url.startsWith("https") ? https : http;
  return new Promise((resolve) => {
    const req = lib.get(url, { timeout: 15000 }, (res) => {
      res.resume();
      resolve(res.statusCode || 0);
    });
    req.on("error", () => resolve(0));
    req.on("timeout", () => { req.destroy(); resolve(0); });
  });
}

let bad = 0;
for (const href of [...hrefs].sort()) {
  const code = await fetch(`${BASE}${href}`);
  if (code >= 200 && code < 400) continue;
  bad++;
  console.log(`BROKEN ${code || "ERR"}  ${href}`);
}
console.log(bad ? `\n${bad} broken target(s)` : "\nAll targets reachable");
