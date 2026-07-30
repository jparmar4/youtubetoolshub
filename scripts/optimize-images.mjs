#!/usr/bin/env node

/**
 * optimize-images.mjs
 *
 * Scans public/images/blog/ for PNG files larger than 500 KB and converts
 * them to WebP (quality 80) using the `sharp` npm package.
 *
 * Usage:
 *   node scripts/optimize-images.mjs              # convert all qualifying PNGs
 *   node scripts/optimize-images.mjs --dry-run    # preview only, no conversion
 *   node scripts/optimize-images.mjs --replace    # convert and back up originals (.png → .png.bak)
 */

import { readdir, stat, rename } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Configuration ──────────────────────────────────────────────────────────
const SIZE_THRESHOLD = 500 * 1024; // 500 KB
const WEBP_QUALITY = 80;
const BLOG_IMAGES_DIR = join(
  fileURLToPath(new URL("..", import.meta.url)),
  "public",
  "images",
  "blog"
);

// ── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const replace = args.includes("--replace");

// ── Helpers ────────────────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function pct(original, optimized) {
  return ((1 - optimized / original) * 100).toFixed(1);
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("🖼️  Image Optimization Script");
  console.log("─".repeat(60));
  console.log(`📂 Directory : ${BLOG_IMAGES_DIR}`);
  console.log(`📏 Threshold : > ${formatBytes(SIZE_THRESHOLD)}`);
  console.log(`🎨 WebP quality: ${WEBP_QUALITY}`);
  if (dryRun) console.log("🏃 Mode      : DRY RUN (no files will be modified)");
  else if (replace) console.log("🔄 Mode      : REPLACE (PNG → .png.bak + WebP)");
  else console.log("➕ Mode      : ADD (WebP alongside PNG)");
  console.log("─".repeat(60));

  // 1. Discover qualifying PNGs
  let entries;
  try {
    entries = await readdir(BLOG_IMAGES_DIR);
  } catch (err) {
    console.error(`❌ Cannot read directory: ${BLOG_IMAGES_DIR}`);
    console.error(err.message);
    process.exit(1);
  }

  const pngFiles = entries.filter(
    (f) => extname(f).toLowerCase() === ".png"
  );

  const candidates = [];
  for (const file of pngFiles) {
    const filePath = join(BLOG_IMAGES_DIR, file);
    const info = await stat(filePath);
    if (info.size > SIZE_THRESHOLD) {
      candidates.push({ file, path: filePath, size: info.size });
    }
  }

  if (candidates.length === 0) {
    console.log("\n✅ No PNG files exceed the size threshold. Nothing to do.");
    return;
  }

  console.log(`\n🔍 Found ${candidates.length} PNG file(s) over ${formatBytes(SIZE_THRESHOLD)}:\n`);

  // Sort largest first
  candidates.sort((a, b) => b.size - a.size);

  // ── Dry-run: just list ───────────────────────────────────────────────
  if (dryRun) {
    let totalOriginal = 0;
    for (const { file, size } of candidates) {
      totalOriginal += size;
      console.log(`  📄 ${file}  (${formatBytes(size)})`);
    }
    console.log("─".repeat(60));
    console.log(`  Total: ${candidates.length} files, ${formatBytes(totalOriginal)}`);
    console.log("\n💡 Run without --dry-run to convert these files to WebP.");
    return;
  }

  // ── Actual conversion (requires sharp) ───────────────────────────────
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "\n❌ The 'sharp' package is not installed.\n" +
        "   Please install it first:\n\n" +
        "     npm install --save-dev sharp\n"
    );
    process.exit(1);
  }

  let totalOriginal = 0;
  let totalOptimized = 0;
  let converted = 0;
  const results = [];

  for (const { file, path: filePath, size: originalSize } of candidates) {
    const webpName = file.replace(/\.png$/i, ".webp");
    const webpPath = join(BLOG_IMAGES_DIR, webpName);

    try {
      await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      const webpInfo = await stat(webpPath);
      const newSize = webpInfo.size;
      const savings = pct(originalSize, newSize);

      totalOriginal += originalSize;
      totalOptimized += newSize;
      converted++;

      results.push({ file, webpName, originalSize, newSize, savings });

      console.log(
        `  ✅ ${file}  ${formatBytes(originalSize)} → ${formatBytes(newSize)}  (-${savings}%)`
      );

      // If --replace, back up the original PNG
      if (replace) {
        const bakPath = filePath + ".bak";
        await rename(filePath, bakPath);
        console.log(`     🔄 Renamed ${file} → ${basename(bakPath)}`);
      }
    } catch (err) {
      console.error(`  ❌ Failed: ${file} – ${err.message}`);
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────
  console.log("\n" + "─".repeat(60));
  console.log("📊 Summary");
  console.log("─".repeat(60));
  console.log(`  Files converted : ${converted} / ${candidates.length}`);
  console.log(`  Original total  : ${formatBytes(totalOriginal)}`);
  console.log(`  Optimized total : ${formatBytes(totalOptimized)}`);
  console.log(
    `  Total savings   : ${formatBytes(totalOriginal - totalOptimized)} (-${pct(totalOriginal, totalOptimized)}%)`
  );
  if (replace) {
    console.log(`  ⚠️  Original PNGs renamed to .png.bak`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
