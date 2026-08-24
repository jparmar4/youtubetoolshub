/**
 * Codemod: bring the display type scale and section rhythm back to normal.
 *
 * Symptom this fixes: every page looked permanently zoomed in. It was not a
 * zoom/rem bug — the root font-size is a normal 16px with `zoom: 1` and no
 * transform. The pages were simply authored at display sizes: section H2s
 * computed to 60px and 72px (`text-5xl md:text-7xl`), heroes to 60px, with
 * 128px (`py-32`) of section padding. At laptop widths a 72px section heading
 * fills the content column and reads as browser zoom.
 *
 * Strategy: compress only the top of the scale (>= text-5xl) and the largest
 * spacing steps, leaving text-4xl and below untouched so body copy, cards, and
 * already-correct headings do not shift. Responsive pairs are rewritten as
 * whole combos first, so a pair never collapses into a no-op like
 * `text-4xl md:text-4xl`.
 *
 * Target bands after this runs: heroes 36/48px, section headings 30/36px.
 *
 * Usage: node scripts/normalize-type-scale.mjs [--dry]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DRY = process.argv.includes("--dry");
const ROOT = "src";

/**
 * Whole-combo rewrites. These are matched before bare tokens so a responsive
 * pair never collapses into a no-op like `text-4xl md:text-4xl`.
 * Order within the combined pass is longest-source-first.
 */
const COMBOS = [
  ["text-4xl md:text-6xl lg:text-7xl", "text-3xl md:text-4xl lg:text-5xl"], // 36/60/72 -> 30/36/48
  ["text-5xl md:text-7xl", "text-4xl md:text-5xl"], // 48/72 -> 36/48 (hero)
  ["text-4xl md:text-6xl", "text-3xl md:text-4xl"], // 36/60 -> 30/36 (section)
  ["text-4xl lg:text-6xl", "text-3xl lg:text-4xl"],
  ["text-3xl md:text-5xl", "text-3xl md:text-4xl"], // 30/48 -> 30/36
  // The 404 numeral is deliberately decorative; keep it oversized, just less so.
  ["text-8xl md:text-9xl", "text-6xl md:text-7xl"],
];

/** Single tokens still oversized after the combo pass. */
const TOKENS = [
  ["text-8xl", "text-5xl"],
  ["text-7xl", "text-4xl"],
  ["text-6xl", "text-4xl"],
  ["text-5xl", "text-4xl"],
];

/** Section rhythm: 128px of padding between sections is what sells the "zoomed" read. */
const SPACING = [
  ["py-32", "py-20"],
  ["py-24", "py-16"],
  ["mb-24", "mb-14"],
  ["mb-20", "mb-12"],
];

/**
 * All rewrites are applied in ONE left-to-right pass over each file.
 *
 * A sequence of independent passes would cascade: a combo rewriting to
 * `text-6xl md:text-7xl` would then be re-matched by the bare `text-6xl` rule
 * and shrink twice. Single-pass alternation, longest source first, makes each
 * span rewrite exactly once.
 *
 * The lookbehind/lookahead guards keep matches to whole class tokens, so
 * `py-24` cannot eat the `sm:py-24` variant and `text-5xl` cannot match inside
 * an arbitrary value such as `text-[3.5rem]`.
 */
const RULES = [...COMBOS, ...TOKENS, ...SPACING].sort(
  (a, b) => b[0].length - a[0].length,
);
const RULE_MAP = new Map(RULES);
const RULE_RE = new RegExp(
  `(?<![\\w:-])(?:${RULES.map(([from]) =>
    from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  ).join("|")})(?![\\w-])`,
  "g",
);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (full.endsWith(".tsx")) files.push(full);
  }
  return files;
}

const counts = new Map();
let touched = 0;

for (const file of walk(ROOT)) {
  const original = readFileSync(file, "utf8");
  const src = original.replace(RULE_RE, (match) => {
    counts.set(match, (counts.get(match) ?? 0) + 1);
    return RULE_MAP.get(match);
  });

  if (src !== original) {
    touched++;
    if (!DRY) writeFileSync(file, src);
  }
}

console.log(`${DRY ? "[dry] " : ""}files changed: ${touched}`);
for (const [from, n] of [...counts].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${from.padEnd(34)} -> ${RULE_MAP.get(from).padEnd(34)} ${n}`);
}
