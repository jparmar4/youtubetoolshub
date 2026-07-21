/**
 * Remove duplicate / low-value blog posts from src/config/blog.ts
 * Keeps the first occurrence of each slug; drops listed merge targets entirely.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogPath = path.join(__dirname, "..", "src", "config", "blog.ts");

/** Slugs to delete entirely (redirect elsewhere) */
const DELETE_SLUGS = new Set([
  "faceless-youtube-channel-ideas-make-10000-month-2026",
  "youtube-shorts-monetization-complete-guide-2026",
]);

/** For these, keep first occurrence only (drop later duplicates) */
const DEDUPE_SLUGS = new Set([
  "youtube-shorts-monetization-2026",
  "faceless-youtube-channel-ideas-2026",
]);

const raw = fs.readFileSync(blogPath, "utf8");

const arrayStart = raw.indexOf("export const blogPosts: BlogPost[] = [");
if (arrayStart < 0) throw new Error("blogPosts array not found");
const bracketStart = raw.indexOf("[", arrayStart);
const helpersStart = raw.indexOf("\n// Helper functions");
if (helpersStart < 0) throw new Error("Helper functions marker not found");

const prefix = raw.slice(0, bracketStart + 1);
const suffix = raw.slice(helpersStart); // includes leading newline before helpers
const arrayBody = raw.slice(bracketStart + 1, helpersStart);

/**
 * Split array body into top-level post object strings (each starts with {)
 */
function splitPosts(body) {
  const posts = [];
  let i = 0;
  while (i < body.length) {
    while (i < body.length && /\s|,/.test(body[i])) i++;
    if (i >= body.length) break;
    if (body[i] !== "{") {
      // unexpected — skip char
      i++;
      continue;
    }
    const start = i;
    let depth = 0;
    let inStr = null;
    let escape = false;
    for (; i < body.length; i++) {
      const c = body[i];
      if (inStr) {
        if (escape) {
          escape = false;
          continue;
        }
        if (c === "\\") {
          escape = true;
          continue;
        }
        if (c === inStr) inStr = null;
        continue;
      }
      if (c === "`") {
        // track template literals loosely by treating as string
        inStr = "`";
        continue;
      }
      if (c === '"' || c === "'") {
        inStr = c;
        continue;
      }
      if (c === "{") depth++;
      if (c === "}") {
        depth--;
        if (depth === 0) {
          i++;
          posts.push(body.slice(start, i));
          break;
        }
      }
    }
  }
  return posts;
}

function getSlug(post) {
  const m = post.match(/slug:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function contentLen(post) {
  const m = post.match(/content:\s*`([\s\S]*?)`/);
  return m ? m[1].length : post.length;
}

const posts = splitPosts(arrayBody);
console.log("Parsed posts:", posts.length);

const seen = new Map(); // slug -> post
const removed = [];
const kept = [];

for (const post of posts) {
  const slug = getSlug(post);
  if (!slug) {
    kept.push(post);
    continue;
  }
  if (DELETE_SLUGS.has(slug)) {
    removed.push({ slug, reason: "delete_merge" });
    continue;
  }
  if (seen.has(slug)) {
    // prefer longer content for kept first — but we already kept first; drop this
    const prev = seen.get(slug);
    if (contentLen(post) > contentLen(prev) * 1.2 && DEDUPE_SLUGS.has(slug)) {
      // replace with longer duplicate if substantially better
      const idx = kept.indexOf(prev);
      if (idx >= 0) kept[idx] = post;
      seen.set(slug, post);
      removed.push({ slug, reason: "dup_replaced_with_longer" });
    } else {
      removed.push({ slug, reason: "dup_dropped" });
    }
    continue;
  }
  seen.set(slug, post);
  kept.push(post);
}

console.log("Kept:", kept.length, "Removed:", removed.length);
for (const r of removed) console.log(" -", r.slug, r.reason);

const newBody = "\n" + kept.join(",\n") + ",\n";
// Ensure array closes before helpers (suffix must start after `];`)
const closedSuffix = suffix.trimStart().startsWith("];")
  ? suffix
  : "];\n\n" + suffix.replace(/^\s*/, "");
const out = prefix + newBody + closedSuffix;
// Normalize export line if a previous run mangled it
const fixed = out.replace(
  /export const blogPosts: BlogPost\[\s*\n/,
  "export const blogPosts: BlogPost[] = [\n",
);
fs.writeFileSync(blogPath, fixed);
console.log("Wrote", blogPath);
