#!/usr/bin/env node

/**
 * normalize-blog-covers.mjs
 *
 * Google Discover readiness pass over blog cover images:
 *   1. Re-encodes files whose bytes are JPEG but whose extension is .webp
 *      (served as image/webp → strict scrapers reject them).
 *   2. Upscales covers narrower than MIN_WIDTH (1200px — Discover's large-image
 *      bar) to that width with a Lanczos kernel, keeping aspect ratio.
 *   3. Writes src/config/blog/image-dimensions.json — real {width,height} per
 *      cover path — so OG tags / Article schema declare honest dimensions
 *      instead of hardcoded 1200x630.
 *
 * Run:  node scripts/normalize-blog-covers.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const dryRun = process.argv.includes("--dry-run");

const MIN_WIDTH = 1200;

const postsDir = join(root, "src", "config", "blog", "data");
const { readdirSync } = await import("node:fs");
const dataFiles = readdirSync(postsDir).filter((f) => /^posts-\d+\.ts$/.test(f));

// Extract every coverImage path from the post data modules.
const coverPaths = new Set();
for (const file of dataFiles) {
  const text = readFileSync(join(postsDir, file), "utf8");
  for (const match of text.matchAll(/coverImage:\s*"([^"]+)"/g)) {
    coverPaths.add(match[1]);
  }
}

console.log(`Found ${coverPaths.size} distinct cover paths across ${dataFiles.length} data files`);

const dimensions = {};
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const stats = { reencoded: 0, upscaled: 0, ok: 0, missing: 0 };

for (const coverPath of [...coverPaths].sort()) {
  const abs = join(root, "public", coverPath);
  if (!existsSync(abs)) {
    console.warn(`MISSING: ${coverPath}`);
    dimensions[coverPath] = null;
    stats.missing++;
    continue;
  }

  const bytes = readFileSync(abs);
  const isJpeg = bytes.subarray(0, 3).equals(jpegMagic);
  const meta = await sharp(bytes).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  if (dryRun) {
    const flags = [isJpeg && "JPEG-as-webp", width < MIN_WIDTH && `narrow ${width}x${height}`]
      .filter(Boolean)
      .join(", ");
    console.log(`${flags ? "FIX  " : "OK   "} ${width}x${height}  ${coverPath}${flags ? `  (${flags})` : ""}`);
  }

  let pipeline = sharp(bytes);
  let needsWrite = false;

  // Decode-then-reencode fixes the mislabeled container in the same pass.
  if (isJpeg) {
    console.log(`RE-ENCODE (JPEG served as .webp): ${coverPath} (${width}x${height})`);
    needsWrite = true;
    stats.reencoded++;
  }

  if (width < MIN_WIDTH) {
    const targetW = MIN_WIDTH;
    const targetH = Math.round((height / width) * MIN_WIDTH);
    if (!dryRun) {
      pipeline = pipeline.resize(targetW, targetH, {
        kernel: "lanczos3",
        // Mild sharpening compensates for upscale softness.
        sharp: true,
      });
    }
    console.log(`UPSCALE ${width}x${height} -> ${targetW}x${targetH}: ${coverPath}`);
    needsWrite = true;
    stats.upscaled++;
  }

  if (needsWrite && !dryRun) {
    const out = await pipeline.webp({ quality: 82 }).toBuffer();
    writeFileSync(abs, out);
    const newMeta = await sharp(out).metadata();
    dimensions[coverPath] = { width: newMeta.width, height: newMeta.height };
  } else {
    dimensions[coverPath] = { width, height };
  }

  if (!needsWrite) stats.ok++;
}

if (!dryRun) {
  const outPath = join(root, "src", "config", "blog", "image-dimensions.json");
  writeFileSync(outPath, JSON.stringify(dimensions, null, 2) + "\n");
  console.log(`\nWrote ${outPath}`);
}

console.log(`\nSummary: ${stats.ok} ok, ${stats.upscaled} upscaled, ${stats.reencoded} re-encoded, ${stats.missing} missing`);
