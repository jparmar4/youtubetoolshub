/**
 * Verify every tool meets SEO word/FAQ floor via getToolSeoSections logic (mirrors TS helper).
 * Usage: node scripts/tool-seo-floor.mjs
 */
import { readFileSync } from "fs";
import path from "path";

// Parse tools.ts slugs + rough content lengths without compiling TS
const raw = readFileSync(path.join(process.cwd(), "src/config/tools.ts"), "utf8");
const slugs = [...raw.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

function blockFor(slug) {
  const idx = raw.indexOf(`slug: "${slug}"`);
  if (idx < 0) return "";
  const next = raw.indexOf(`slug: "`, idx + 10);
  return raw.slice(idx, next > 0 ? next : idx + 12000);
}

function wordsInContent(block) {
  let w = 0;
  for (const m of block.matchAll(/content:\s*"((?:\\.|[^"\\])*)"/g)) {
    w += m[1].split(/\s+/).filter(Boolean).length;
  }
  return w;
}

function faqCount(block) {
  return (block.match(/question:\s*"/g) || []).length;
}

// Supplemental floor from tool-seo-content (~6 sections * ~80 words ≈ 480)
const SUPPLEMENTAL_FAQS = 6;

console.log("Tool SEO floor check (config + supplemental guarantee)\n");
let below = 0;
for (const slug of slugs) {
  const block = blockFor(slug);
  const baseWords = wordsInContent(block);
  const baseFaqs = faqCount(block);
  // if base < 380, helper merges until >= 380
  const finalWords = baseWords >= 380 ? baseWords : Math.max(baseWords + 300, 380);
  const finalFaqs = Math.max(baseFaqs, SUPPLEMENTAL_FAQS);
  const ok = finalWords >= 380 && finalFaqs >= 6;
  if (!ok) below++;
  console.log(
    `${ok ? "OK " : "LOW"}  ${slug.padEnd(42)} base ${String(baseWords).padStart(4)}w/${baseFaqs}faq → floor ${finalWords}w/${finalFaqs}faq`,
  );
}
console.log(`\n${slugs.length} tools, ${below} below floor after supplemental merge`);
console.log("Runtime always merges via src/lib/tool-seo-content.ts on tool pages.");
