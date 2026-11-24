#!/usr/bin/env node

/**
 * normalize-blog-covers.mjs
 *
 * Google Discover readiness pass over blog cover images:
 *   1. Re-encodes files whose bytes are JPEG but whose extension is .webp
 *      (served as image/webp → strict scrapers reject them).
 *   2. Upscales covers narrower than MIN_WIDTH (1200px — Discover's large-image
 *      bar) to that width with a Lanczos kernel, keeping aspect ratio.
 *   3. Attention-crops near-landscape covers to a true 16:9 ratio (Discover's
 *      recommended preview shape). The blog header already renders every cover
 *      in an aspect-video box with object-cover, so the cropped file matches
 *      what visitors see instead of diverging from it. Uses sharp's attention
 *      strategy so in-artwork headlines and faces survive the crop.
 *   4. Writes src/config/blog/image-dimensions.json — real {width,height} per
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
const DISCOVER_WIDTH = 1280;
const DISCOVER_HEIGHT = 720;
const MIN_LANDSCAPE_RATIO = 1.35;
// Discover recommends a 16:9 preview image. Anything landscape but off-ratio
// beyond this tolerance gets attention-cropped to exact 16:9 (step 3 above).
const IDEAL_RATIO = 16 / 9;
const RATIO_TOLERANCE = 0.02;

const postsDir = join(root, "src", "config", "blog", "data");
const { readdirSync } = await import("node:fs");
const dataFiles = readdirSync(postsDir).filter((f) => /^posts-\d+\.ts$/.test(f));

// Extract every coverImage and pinterestImage path from the post data modules.
const coverPaths = new Set();
const pinterestPaths = new Set();
for (const file of dataFiles) {
  const text = readFileSync(join(postsDir, file), "utf8");
  for (const match of text.matchAll(/coverImage:\s*["']([^"']+)["']/g)) {
    coverPaths.add(match[1]);
  }
  for (const match of text.matchAll(/pinterestImage:\s*["']([^"']+)["']/g)) {
    pinterestPaths.add(match[1]);
  }
}

console.log(
  `Found ${coverPaths.size} distinct cover paths and ${pinterestPaths.size} Pinterest paths across ${dataFiles.length} data files`,
);

const dimensions = {};
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const stats = { reencoded: 0, upscaled: 0, reframed: 0, ratioFixed: 0, ok: 0, missing: 0 };

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
  const aspectRatio = height > 0 ? width / height : 0;
  const needsLandscapeReframe = aspectRatio > 0 && aspectRatio < MIN_LANDSCAPE_RATIO;
  const needsRatioFix =
    !needsLandscapeReframe &&
    aspectRatio > 0 &&
    Math.abs(aspectRatio - IDEAL_RATIO) > RATIO_TOLERANCE;

  if (dryRun) {
    const flags = [
      isJpeg && "JPEG-as-webp",
      needsLandscapeReframe && `aspect ${aspectRatio.toFixed(2)} -> 1280x720`,
      needsRatioFix &&
        `aspect ${aspectRatio.toFixed(2)} -> ${Math.max(width, DISCOVER_WIDTH)}x${Math.round(Math.max(width, DISCOVER_WIDTH) * 9 / 16)} 16:9`,
      !needsLandscapeReframe && !needsRatioFix && width < MIN_WIDTH && `narrow ${width}x${height}`,
    ]
      .filter(Boolean)
      .join(", ");
    console.log(`${flags ? "FIX  " : "OK   "} ${width}x${height}  ${coverPath}${flags ? `  (${flags})` : ""}`);
  }

  if (needsLandscapeReframe) {
    if (!dryRun) {
      const bg = await sharp(bytes)
        .resize(DISCOVER_WIDTH, DISCOVER_HEIGHT, { fit: "cover", position: "center" })
        .blur(24)
        .modulate({ brightness: 0.45 })
        .toBuffer();
      const fg = await sharp(bytes)
        .resize(DISCOVER_WIDTH, DISCOVER_HEIGHT, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toBuffer();
      const out = await sharp(bg)
        .composite([{ input: fg, gravity: "center" }])
        .webp({ quality: 84 })
        .toBuffer();
      writeFileSync(abs, out);
      const newMeta = await sharp(out).metadata();
      dimensions[coverPath] = { width: newMeta.width, height: newMeta.height };
    } else {
      dimensions[coverPath] = { width: DISCOVER_WIDTH, height: DISCOVER_HEIGHT };
    }
    console.log(`REFRAME 16:9 ${width}x${height} -> ${DISCOVER_WIDTH}x${DISCOVER_HEIGHT}: ${coverPath}`);
    stats.reframed++;
    if (isJpeg) stats.reencoded++;
    continue;
  }

  // Landscape but off 16:9 (3:2 AI renders, 1.86 panoramic crops): attention-
  // crop to exact 16:9 at native width (min 1280) so Discover's recommended
  // preview shape is met without discarding the artwork's focal content.
  if (needsRatioFix) {
    const targetW = Math.max(width, DISCOVER_WIDTH);
    const targetH = Math.round((targetW * 9) / 16);
    if (!dryRun) {
      const out = await sharp(bytes)
        .resize(targetW, targetH, { fit: "cover", position: sharp.strategy.attention, kernel: "lanczos3" })
        .webp({ quality: 84 })
        .toBuffer();
      writeFileSync(abs, out);
      const newMeta = await sharp(out).metadata();
      dimensions[coverPath] = { width: newMeta.width, height: newMeta.height };
      console.log(`CROP 16:9 ${width}x${height} -> ${newMeta.width}x${newMeta.height} (attention): ${coverPath}`);
    } else {
      dimensions[coverPath] = { width: targetW, height: targetH };
      console.log(`CROP 16:9 ${width}x${height} -> ${targetW}x${targetH} (attention): ${coverPath}`);
    }
    stats.ratioFixed++;
    if (isJpeg) stats.reencoded++;
    continue;
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
      pipeline = pipeline
        .resize(targetW, targetH, { kernel: "lanczos3" })
        .sharpen();
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

// Record portrait Pinterest image dimensions without upscaling them to cover width.
let pinterestRecorded = 0;
for (const pinPath of [...pinterestPaths].sort()) {
  if (dimensions[pinPath]) continue;
  const abs = join(root, "public", pinPath);
  if (!existsSync(abs)) {
    console.warn(`MISSING Pinterest image: ${pinPath}`);
    dimensions[pinPath] = null;
    continue;
  }
  const meta = await sharp(readFileSync(abs)).metadata();
  if (meta.width && meta.height) {
    dimensions[pinPath] = { width: meta.width, height: meta.height };
    pinterestRecorded++;
  }
}

const sortedDimensions = Object.fromEntries(
  Object.keys(dimensions)
    .sort()
    .map((key) => [key, dimensions[key]]),
);

if (!dryRun) {
  const outPath = join(root, "src", "config", "blog", "image-dimensions.json");
  writeFileSync(outPath, JSON.stringify(sortedDimensions, null, 2) + "\n");
  console.log(`\nWrote ${outPath} (${pinterestRecorded} Pinterest entries recorded)`);
}

console.log(`\nSummary: ${stats.ok} ok, ${stats.reframed} reframed 16:9, ${stats.ratioFixed} attention-cropped 16:9, ${stats.upscaled} upscaled, ${stats.reencoded} re-encoded, ${stats.missing} missing, ${pinterestRecorded} pinterest recorded`);
