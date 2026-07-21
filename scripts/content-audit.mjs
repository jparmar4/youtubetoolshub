/**
 * Offline content audit for blog posts in src/config/blog.ts
 * Scores uniqueness risk, length, FAQ presence, and keyword cannibalization.
 *
 * Usage: node scripts/content-audit.mjs
 * Output: outputs/content-audit.csv + outputs/content-audit.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const blogPath = path.join(root, "src", "config", "blog.ts");
const outDir = path.join(root, "outputs");

const raw = fs.readFileSync(blogPath, "utf8");

// Split on slug entries (rough parser for audit only)
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let m;
while ((m = slugRegex.exec(raw)) !== null) {
  slugs.push({ slug: m[1], index: m.index });
}

function extractBetween(startIdx, endIdx) {
  return raw.slice(startIdx, endIdx);
}

function field(block, name) {
  const re = new RegExp(`${name}:\\s*"((?:\\\\.|[^"\\\\])*)"`, "s");
  const match = block.match(re);
  return match ? match[1].replace(/\\n/g, "\n").replace(/\\"/g, '"') : "";
}

function contentField(block) {
  const re = /content:\s*`([\s\S]*?)`\s*,\s*\n\s*(?:metaDescription|keywords|coverImage|imageAlt|faq|rating|video)/;
  const match = block.match(re);
  if (match) return match[1];
  // fallback: first large template literal after content:
  const re2 = /content:\s*`([\s\S]*?)`/;
  const m2 = block.match(re2);
  return m2 ? m2[1] : "";
}

function countFaq(block) {
  const faqStart = block.indexOf("faq:");
  if (faqStart < 0) return 0;
  const slice = block.slice(faqStart, faqStart + 8000);
  return (slice.match(/question:\s*"/g) || []).length;
}

const posts = [];
for (let i = 0; i < slugs.length; i++) {
  const start = slugs[i].index;
  const end = i + 1 < slugs.length ? slugs[i + 1].index : raw.length;
  const block = extractBetween(start, end);
  const title = field(block, "title");
  const category = field(block, "category");
  const date = field(block, "date");
  const content = contentField(block);
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const faqCount = countFaq(block);
  const hasQuickAnswer = content.includes("QUICK-ANSWER") || content.includes("Quick Answer");
  const internalLinkHints = (content.match(/\]\(\//g) || []).length;

  posts.push({
    slug: slugs[i].slug,
    title,
    category,
    date,
    wordCount,
    faqCount,
    hasQuickAnswer,
    internalLinkHints,
  });
}

// Cannibalization: similar title tokens
function tokens(s) {
  return new Set(
    (s || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["youtube", "with", "from", "your", "that", "this", "guide", "2026", "complete"].includes(w))
  );
}

function jaccard(a, b) {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

// Score each post
const recommendations = posts.map((p) => {
  let score = 50;
  const reasons = [];

  if (p.wordCount >= 2000) score += 20;
  else if (p.wordCount >= 1200) score += 10;
  else if (p.wordCount >= 800) score += 0;
  else if (p.wordCount >= 400) {
    score -= 15;
    reasons.push("thin_content");
  } else {
    score -= 30;
    reasons.push("very_thin");
  }

  if (p.faqCount >= 5) score += 10;
  else if (p.faqCount >= 3) score += 5;
  else {
    score -= 5;
    reasons.push("few_faqs");
  }

  if (p.hasQuickAnswer) score += 5;
  else reasons.push("no_quick_answer");

  if (p.internalLinkHints >= 2) score += 5;
  else reasons.push("weak_internal_links");

  // Near-duplicate titles
  const nearDupes = posts.filter(
    (o) => o.slug !== p.slug && jaccard(o.title, p.title) >= 0.55
  );
  if (nearDupes.length) {
    score -= 20;
    reasons.push(`cannibalizes:${nearDupes.map((d) => d.slug).join("|")}`);
  }

  let action = "keep";
  if (score < 25 || p.wordCount < 350) action = "delete_or_merge";
  else if (score < 40 || nearDupes.length >= 2) action = "merge_candidate";
  else if (score < 55 || p.wordCount < 1000) action = "expand";

  // Priority money topics
  const money =
    /cpm|rpm|monetiz|earn|adsense|partner program|pay per|revenue|sponsorship/i.test(
      `${p.slug} ${p.title} ${p.category}`
    );
  if (money && action === "expand") action = "expand_priority";
  if (money) score += 5;

  return {
    ...p,
    score: Math.max(0, Math.min(100, score)),
    action,
    reasons: reasons.join("; "),
    nearDupes: nearDupes.map((d) => d.slug).join(" "),
  };
});

recommendations.sort((a, b) => a.score - b.score);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const headers = [
  "slug",
  "title",
  "category",
  "date",
  "wordCount",
  "faqCount",
  "hasQuickAnswer",
  "internalLinkHints",
  "score",
  "action",
  "reasons",
  "nearDupes",
];

const csv = [
  headers.join(","),
  ...recommendations.map((r) =>
    headers
      .map((h) => {
        const v = String(r[h] ?? "");
        return `"${v.replace(/"/g, '""')}"`;
      })
      .join(",")
  ),
].join("\n");

fs.writeFileSync(path.join(outDir, "content-audit.csv"), csv);
fs.writeFileSync(
  path.join(outDir, "content-audit.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totalPosts: recommendations.length,
      byAction: recommendations.reduce((acc, r) => {
        acc[r.action] = (acc[r.action] || 0) + 1;
        return acc;
      }, {}),
      posts: recommendations,
    },
    null,
    2
  )
);

const summary = recommendations.reduce((acc, r) => {
  acc[r.action] = (acc[r.action] || 0) + 1;
  return acc;
}, {});

console.log(`Audited ${recommendations.length} posts`);
console.log("By action:", summary);
console.log("Lowest 15 scores:");
recommendations.slice(0, 15).forEach((r) => {
  console.log(`  ${r.score}\t${r.action}\t${r.slug} (${r.wordCount}w)`);
});
console.log(`\nWrote outputs/content-audit.csv and outputs/content-audit.json`);
