import fs from "node:fs";
import path from "node:path";
import { tools, type ToolCategoryId } from "../src/config/tools";
import { toolMeta } from "../src/config/tool-meta";
import { siteConfig } from "../src/config/site";
import {
  US_STATE_CREATOR_TAXES,
  buildStateCreatorTaxMetadata,
} from "../data/usStateCreatorTaxes";
import { COMPETITOR_ALTERNATIVES } from "../data/competitorAlternatives";

const MAX_META_DESCRIPTION_LENGTH = 165;
const VALID_CATEGORIES = new Set<ToolCategoryId>([
  "thumbnail-media",
  "seo-metadata",
  "channel-growth",
  "analytics-earnings",
  "utilities",
]);

const errors: string[] = [];
const warnings: string[] = [];

function fail(msg: string) {
  errors.push(msg);
}

// 1. Validate central tools registry (src/config/tools.ts)
const toolSlugs = new Set<string>();
const rendererSrc = fs.readFileSync(
  path.join(process.cwd(), "src/components/tools/ToolComponentRenderer.tsx"),
  "utf8",
);
const artworkSrc = fs.readFileSync(
  path.join(process.cwd(), "src/components/ui/tool-artwork.tsx"),
  "utf8",
);

for (const tool of tools) {
  if (!tool.slug || !tool.slug.trim()) {
    fail("Found tool entry with empty slug.");
    continue;
  }
  if (toolSlugs.has(tool.slug)) {
    fail(`Duplicate tool slug in tools registry: "${tool.slug}"`);
  }
  toolSlugs.add(tool.slug);

  if (!VALID_CATEGORIES.has(tool.primaryCategory)) {
    fail(`Tool "${tool.slug}" has invalid primaryCategory "${tool.primaryCategory}".`);
  }

  const title = (tool.seoTitle || tool.name || "").trim();
  if (!title) {
    fail(`Tool "${tool.slug}" is missing a non-empty title / seoTitle.`);
  }

  const desc = (tool.seoDescription || tool.description || "").trim();
  if (!desc) {
    fail(`Tool "${tool.slug}" is missing a meta description.`);
  } else if (desc.length >= MAX_META_DESCRIPTION_LENGTH) {
    fail(
      `Tool "${tool.slug}" description is ${desc.length} chars (must be < ${MAX_META_DESCRIPTION_LENGTH}): "${desc}"`,
    );
  }

  if (!tool.faqs || tool.faqs.length < 3) {
    fail(`Tool "${tool.slug}" must have at least 3 FAQs for FAQPage schema.`);
  }

  if (!rendererSrc.includes(`"${tool.slug}"`)) {
    fail(`Tool "${tool.slug}" is not mapped in ToolComponentRenderer.tsx.`);
  }

  if (!artworkSrc.includes(`"${tool.slug}"`)) {
    warnings.push(`Tool "${tool.slug}" has no custom motif in tool-artwork.tsx.`);
  }
}

// 2. Validate US State Creator Taxes (data/usStateCreatorTaxes.ts)
const stateSlugs = new Set<string>();
const stateCodes = new Set<string>();

if (US_STATE_CREATOR_TAXES.length !== 51) {
  fail(`Expected 51 US state/DC records, found ${US_STATE_CREATOR_TAXES.length}.`);
}

for (const state of US_STATE_CREATOR_TAXES) {
  if (!state.slug || !state.stateName || !state.stateCode) {
    fail(`Invalid state record encountered: ${JSON.stringify(state)}`);
    continue;
  }
  if (stateSlugs.has(state.slug)) {
    fail(`Duplicate state slug: "${state.slug}"`);
  }
  stateSlugs.add(state.slug);

  if (stateCodes.has(state.stateCode)) {
    fail(`Duplicate stateCode: "${state.stateCode}"`);
  }
  stateCodes.add(state.stateCode);

  const meta = buildStateCreatorTaxMetadata(state);
  if (!meta.title.trim()) {
    fail(`State "${state.slug}" produced empty metadata title.`);
  }
  if (!meta.description.trim()) {
    fail(`State "${state.slug}" produced empty meta description.`);
  } else if (meta.description.length >= MAX_META_DESCRIPTION_LENGTH) {
    fail(
      `State "${state.slug}" meta description is ${meta.description.length} chars (must be < ${MAX_META_DESCRIPTION_LENGTH}): "${meta.description}"`,
    );
  }
}

// Check state neighbor cross-link targets after collecting all valid slugs
for (const state of US_STATE_CREATOR_TAXES) {
  if (!state.popularNeighborSlugs || state.popularNeighborSlugs.length === 0) {
    fail(`State "${state.slug}" has no popularNeighborSlugs cross-links.`);
    continue;
  }
  for (const neighbor of state.popularNeighborSlugs) {
    if (!stateSlugs.has(neighbor)) {
      fail(
        `State "${state.slug}" references unknown neighbor slug "${neighbor}".`,
      );
    }
    if (neighbor === state.slug) {
      fail(`State "${state.slug}" links to itself in popularNeighborSlugs.`);
    }
  }
}

// 3. Validate Competitor Alternatives (data/competitorAlternatives.ts)
const altSlugs = new Set<string>();
for (const alt of COMPETITOR_ALTERNATIVES) {
  if (!alt.slug || !alt.competitorName) {
    fail(`Competitor alternative entry missing slug or competitorName.`);
    continue;
  }
  if (altSlugs.has(alt.slug)) {
    fail(`Duplicate competitor alternative slug: "${alt.slug}"`);
  }
  altSlugs.add(alt.slug);

  if (!alt.pageTitle.trim() || !alt.h1.trim()) {
    fail(`Alternative "${alt.slug}" is missing pageTitle or h1.`);
  }

  const metaLen = alt.metaDescription.trim().length;
  if (metaLen === 0) {
    fail(`Alternative "${alt.slug}" has an empty metaDescription.`);
  } else if (metaLen >= MAX_META_DESCRIPTION_LENGTH) {
    fail(
      `Alternative "${alt.slug}" metaDescription is ${metaLen} chars (must be < ${MAX_META_DESCRIPTION_LENGTH}): "${alt.metaDescription}"`,
    );
  }

  if (!toolSlugs.has(alt.embeddedToolSlug)) {
    fail(
      `Alternative "${alt.slug}" references missing embeddedToolSlug "${alt.embeddedToolSlug}".`,
    );
  }

  if (!alt.comparisonRows || alt.comparisonRows.length === 0) {
    fail(`Alternative "${alt.slug}" has no comparisonRows.`);
  }
  if (!alt.faqs || alt.faqs.length === 0) {
    fail(`Alternative "${alt.slug}" has no faqs.`);
  }
}

// 4. Validate footer internal links resolve to registered paths
for (const resLink of siteConfig.footerLinks.resources) {
  const href = resLink.href;
  if (href.startsWith("/alternatives/")) {
    const slug = href.replace("/alternatives/", "");
    if (!altSlugs.has(slug)) {
      fail(`Footer resource link points to unknown alternative slug: "${href}"`);
    }
  } else if (href.startsWith("/tools/creator-tax-calculator/")) {
    const slug = href.replace("/tools/creator-tax-calculator/", "");
    if (!stateSlugs.has(slug)) {
      fail(`Footer resource link points to unknown state tax slug: "${href}"`);
    }
  }
}

// 5. Verify client light metadata parity with full tools registry (toolMeta === tools)
if (toolMeta.length !== tools.length) {
  fail(
    `tool-meta.ts count (${toolMeta.length}) does not match tools.ts count (${tools.length}). Keep both synchronized!`,
  );
}
const metaBySlug = new Map(toolMeta.map((m) => [m.slug, m]));
for (const tool of tools) {
  const meta = metaBySlug.get(tool.slug);
  if (!meta) {
    fail(`Tool "${tool.slug}" exists in tools.ts but is missing from tool-meta.ts.`);
  } else if (meta.primaryCategory !== tool.primaryCategory) {
    fail(
      `Category mismatch for "${tool.slug}": tools.ts="${tool.primaryCategory}" vs tool-meta.ts="${meta.primaryCategory}".`,
    );
  }
}

// 6. Verify static public manifests use current tool count (${tools.length})
const staticManifestPaths = [
  "public/index.md",
  "public/authors.txt",
  "public/.well-known/authors.txt",
  "public/.well-known/ai-plugin.json",
  "public/.well-known/openapi.yaml",
];
for (const relPath of staticManifestPaths) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;
  const text = fs.readFileSync(fullPath, "utf8");
  if (!text.includes(String(tools.length))) {
    fail(
      `Static manifest "${relPath}" does not mention current tool count (${tools.length}).`,
    );
  }
}

console.log(
  `[verify-seo] Audited ${tools.length} tools (${toolMeta.length} in tool-meta), ${US_STATE_CREATOR_TAXES.length} US jurisdictions, ${COMPETITOR_ALTERNATIVES.length} competitor alternatives.`,
);

if (warnings.length > 0) {
  console.warn(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length > 0) {
  console.error(`\nSEO & Registry verification FAILED with ${errors.length} error(s):`);
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
}

console.log("✓ verify:seo passed: all slugs unique, titles non-empty, descriptions < 165 chars, cross-links valid.");
