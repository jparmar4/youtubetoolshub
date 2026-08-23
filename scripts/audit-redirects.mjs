/**
 * Redirect + index-policy consistency audit.
 *
 * Catches the SEO-fatal combinations that silently destroy link equity:
 *  1. Redirect chains   (A -> B -> C): Google follows but discounts, and each hop leaks.
 *  2. Redirect loops    (A -> B -> A): page becomes uncrawlable.
 *  3. noindex targets   (A -> B where B is noindex): all of A's equity lands on a page
 *                       that cannot rank. This is the single worst pattern.
 *  4. Dead targets      (A -> B where B is not a real post/route).
 *  5. Live+redirected   (A is still published in blog.ts but also 301s away):
 *                       the post renders in listings/sitemaps yet never resolves.
 *
 * Usage: node scripts/audit-redirects.mjs
 * Exits 1 if any error-level issue is found (safe for CI / pre-deploy).
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// ── Load redirects from the real Next config ────────────────────────────────
// pathToFileURL is required on Windows: bare "D:\..." is not a valid ESM specifier.
const config = (await import(pathToFileURL(path.join(root, "next.config.mjs")).href)).default;
const redirects = await config.redirects();

// ── Load blog slugs + noindex policy by parsing source (avoids TS runtime) ──
function readSrc(rel) {
  return readFileSync(path.join(root, rel), "utf8");
}

const blogSrc = readSrc("src/config/blog.ts");
const blogSlugs = new Set(
  [...blogSrc.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]),
);

const policySrc = readSrc("src/config/index-policy.ts");
const noindexBlock = policySrc.match(
  /NOINDEX_BLOG_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/,
);
const noindexSlugs = new Set(
  noindexBlock
    ? [...noindexBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
    : [],
);

// ── Static routes that exist as app-router pages ────────────────────────────
function routeExists(urlPath) {
  const clean = urlPath.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (clean === "/") return true;

  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return blogSlugs.has(blogMatch[1]);

  const segs = clean.slice(1).split("/");
  const base = path.join(root, "src/app", ...segs);
  if (["page.tsx", "page.ts", "page.jsx", "route.ts"].some((f) => existsSync(path.join(base, f)))) {
    return true;
  }
  // Dynamic segment fallback: /tools/<slug> is served by /tools/[slug]/page.tsx
  for (let i = segs.length - 1; i >= 0; i--) {
    const probe = path.join(root, "src/app", ...segs.slice(0, i));
    if (!existsSync(probe)) continue;
    const dyn = readdirSync(probe, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name.startsWith("["));
    if (dyn.length) return true;
  }
  return false;
}

// ── Build the source -> destination map ─────────────────────────────────────
const bySource = new Map();
for (const r of redirects) {
  if (r.source.includes(":")) continue; // skip parameterised patterns
  bySource.set(r.source.replace(/\/$/, ""), r);
}

const errors = [];
const warnings = [];

for (const [source, r] of bySource) {
  const dest = r.destination.replace(/\/$/, "");

  // 1 + 2. chains and loops
  const hops = [source];
  let cursor = dest;
  while (bySource.has(cursor) && hops.length < 12) {
    if (hops.includes(cursor)) {
      errors.push(`LOOP    ${hops.join(" -> ")} -> ${cursor}`);
      cursor = null;
      break;
    }
    hops.push(cursor);
    cursor = bySource.get(cursor).destination.replace(/\/$/, "");
  }
  if (cursor && hops.length > 1) {
    errors.push(`CHAIN   ${hops.join(" -> ")} -> ${cursor}  (flatten to: ${source} -> ${cursor})`);
  }

  const finalDest = cursor ?? dest;

  // 3. redirecting into a noindex page
  const destSlug = finalDest.match(/^\/blog\/([^/]+)$/)?.[1];
  if (destSlug && noindexSlugs.has(destSlug)) {
    errors.push(`NOINDEX-TARGET  ${source} -> ${finalDest}  (target is in NOINDEX_BLOG_SLUGS: equity is discarded)`);
  }

  // 4. dead target
  if (!routeExists(finalDest)) {
    errors.push(`DEAD-TARGET     ${source} -> ${finalDest}  (no matching page/route)`);
  }

  // 5. source is still a published post
  const srcSlug = source.match(/^\/blog\/([^/]+)$/)?.[1];
  if (srcSlug && blogSlugs.has(srcSlug)) {
    warnings.push(`LIVE+REDIRECTED ${source}  (still in blog.ts; unreachable because the redirect wins)`);
  }
}

// 6. noindex slugs that have no redirect and are still published = orphan dead weight
for (const slug of noindexSlugs) {
  if (!blogSlugs.has(slug)) continue;
  if (bySource.has(`/blog/${slug}`)) continue;
  warnings.push(`NOINDEX-ORPHAN  /blog/${slug}  (noindex, still published, no redirect: crawled but cannot rank)`);
}

// 7. Internal links that point at a redirect source or a noindex page.
//    Every one of these wastes a crawl hop and dilutes the internal PageRank
//    that should be reaching the canonical page directly.
const linkFiles = [
  "src/config/blog.ts",
  "src/config/tools.ts",
  "src/lib/topic-clusters.ts",
  "src/lib/related-tools.ts",
];
const internalLinkHits = new Map(); // target -> [{file, line}]
for (const rel of linkFiles) {
  const abs = path.join(root, rel);
  if (!existsSync(abs)) continue;
  const lines = readFileSync(abs, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    // Markdown links and href/url string literals, but never image paths.
    for (const m of line.matchAll(/[("'](\/(?:blog|tools|resources)\/[a-z0-9\-/]+)[)"']/g)) {
      const target = m[1];
      if (/\.(webp|png|jpe?g|svg|avif|gif)$/.test(target)) continue;
      if (target.startsWith("/images/")) continue;

      const isRedirect = bySource.has(target.replace(/\/$/, ""));
      const slug = target.match(/^\/blog\/([^/]+)$/)?.[1];
      const isNoindex = slug ? noindexSlugs.has(slug) : false;
      if (!isRedirect && !isNoindex) continue;

      const key = `${target}|${isRedirect ? "REDIRECT" : "NOINDEX"}`;
      if (!internalLinkHits.has(key)) internalLinkHits.set(key, []);
      internalLinkHits.get(key).push(`${rel}:${i + 1}`);
    }
  });
}
for (const [key, locations] of internalLinkHits) {
  const [target, kind] = key.split("|");
  const finalTarget =
    kind === "REDIRECT" ? bySource.get(target.replace(/\/$/, "")).destination : "(nothing — page is noindex)";
  errors.push(
    `INTERNAL-LINK-TO-${kind}  ${target} -> ${finalTarget}\n` +
      `                  ${locations.length} link(s): ${locations.slice(0, 6).join(", ")}${locations.length > 6 ? ", …" : ""}`,
  );
}

// ── Report ─────────────────────────────────────────────────────────────────
console.log(`Redirect rules parsed: ${bySource.size} literal (of ${redirects.length} total)`);
console.log(`Blog posts: ${blogSlugs.size} | noindex slugs: ${noindexSlugs.size}\n`);

if (errors.length) {
  console.log(`ERRORS (${errors.length}):`);
  for (const e of errors) console.log("  " + e);
  console.log("");
}
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}):`);
  for (const w of warnings) console.log("  " + w);
  console.log("");
}
if (!errors.length && !warnings.length) console.log("Clean: no chains, loops, dead or noindex targets.");

process.exit(errors.length ? 1 : 0);
