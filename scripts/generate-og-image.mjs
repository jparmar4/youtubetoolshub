#!/usr/bin/env node

/**
 * Generates public/og-image.png as a true 1200x630 PNG (the old file was a
 * 1024x1024 JPEG with a .png name). Branded with the site palette.
 * Run: node scripts/generate-og-image.mjs
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f0518"/>
      <stop offset="0.55" stop-color="#1c0b2e"/>
      <stop offset="1" stop-color="#2d1150"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#a855f7"/>
      <stop offset="1" stop-color="#e879f9"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#a855f7" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1060" cy="120" r="230" fill="#a855f7" opacity="0.12"/>
  <circle cx="1060" cy="120" r="150" fill="#a855f7" opacity="0.16"/>

  <!-- Play-button mark -->
  <g transform="translate(90 96)">
    <rect x="0" y="0" width="92" height="64" rx="16" fill="url(#accent)"/>
    <path d="M 36 18 L 36 46 L 60 32 Z" fill="#ffffff"/>
  </g>
  <text x="200" y="145" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#ffffff">YouTube Tools Hub</text>

  <text x="90" y="330" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">Free YouTube Growth</text>
  <text x="90" y="420" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="url(#accent)">&amp; AI Tools Suite</text>

  <rect x="90" y="470" width="470" height="4" rx="2" fill="url(#accent)"/>

  <text x="90" y="530" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#d8c9ec">Thumbnail downloader · Title &amp; tag generators · Earnings calculator</text>
  <text x="90" y="578" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600" fill="#a855f7">www.youtubetoolshub.com — no signup required</text>
</svg>`;

const out = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(join(root, "public", "og-image.png"), out);
console.log("Wrote public/og-image.png (1200x630 PNG,", out.length, "bytes)");
