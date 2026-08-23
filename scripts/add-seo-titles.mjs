/**
 * One-off codemod: add a hand-written `seoTitle` to blog posts whose `title`
 * exceeds the ~60-char SERP limit, so Google shows a complete phrase instead of
 * an auto-shortened one. Safe to re-run: skips posts that already have seoTitle.
 *
 * Usage: node scripts/add-seo-titles.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const SEO_TITLES = {
  "how-to-download-youtube-thumbnail-2026": "How to Download a YouTube Thumbnail in HD (2026)",
  "youtube-chapters-template-2026": "YouTube Chapters Template 2026: Format + Examples",
  "youtube-description-template-2026": "YouTube Description Template 2026 (Copy & Paste)",
  "youtube-adsense-payment-schedule-2026": "YouTube AdSense Payment Schedule 2026: Dates & Limits",
  "how-to-get-more-views-youtube-2026": "How to Get More Views on YouTube: 15 Proven Tactics",
  "best-time-upload-youtube-2026": "Best Time to Upload to YouTube in 2026 (Global Data)",
  "ai-video-generators-youtube-shorts-2026": "10 Best AI Video Generators for YouTube Shorts (2026)",
  "get-1000-subscribers-youtube-fast-2026": "How to Get 1000 Subscribers on YouTube Fast (2026)",
  "high-cpm-youtube-niches-2026": "15 Best High CPM YouTube Niches in 2026 ($20-$50)",
  "tubebuddy-vs-vidiq-2026": "TubeBuddy vs VidIQ 2026: Which Is Actually Better?",
  "youtube-keyword-research-tools-2026": "10 Best Free YouTube Keyword Research Tools (2026)",
  "ai-thumbnail-generators-youtube-2026": "10 Best AI Thumbnail Generators for YouTube (2026)",
  "youtube-shorts-monetization-2026": "YouTube Shorts Monetization 2026: Complete Guide",
  "youtube-partner-program-2026": "YouTube Partner Program Requirements 2026",
  "faceless-youtube-channel-2026": "How to Start a Faceless YouTube Channel in 2026",
  "best-ai-video-editing-software-2026": "15 Best AI Video Editing Software in 2026",
  "chatgpt-youtube-content-creation": "ChatGPT for YouTube: Complete AI Content Guide 2026",
  "youtube-vs-tiktok-money-2026": "YouTube vs TikTok: Which Pays Creators More in 2026?",
  "how-to-start-youtube-business-2026": "How to Start a YouTube Business: 17 Profitable Ideas",
  "youtube-rpm-vs-cpm-explained": "YouTube RPM vs CPM (2026): Formula and Benchmarks",
  "youtube-sponsorship-guidelines-2026": "YouTube Sponsorship Rates & Guidelines (2026)",
  "ai-tools-youtube-creators-2026": "15 AI Tools Every YouTube Creator Needs in 2026",
  "youtube-thumbnail-design-psychology": "YouTube Thumbnail Psychology: Why Clicks Happen",
  "youtube-video-ideas-that-actually-work": "YouTube Video Ideas That Actually Work in 2026",
  "best-youtube-tools-for-beginners": "Best Free YouTube Tools for Beginners (2026)",
  "how-to-write-catchy-youtube-titles": "How to Write YouTube Titles That Get Clicked (2026)",
  "how-to-optimize-youtube-thumbnails": "7 YouTube Thumbnail Patterns That Get Clicks (2026)",
  "grow-youtube-channel-fast": "How to Grow on YouTube: 0 to 10k Subscribers (2026)",
  "youtube-automation-tools-guide": "YouTube Automation in 2026: Ethical Complete Guide",
  "youtube-shorts-viral-strategy-2026": "YouTube Shorts Strategy: 10M Views in 30 Days (2026)",
  "youtube-analytics-guide-beginners-2026": "YouTube Analytics Guide 2026 for Beginners",
  "how-much-youtube-pays-per-1000-views-2026": "How Much YouTube Pays Per 1000 Views in 2026",
  "youtube-cpm-rates-by-country-2026": "YouTube CPM Rates by Country 2026: US, UK, CA, AU",
  "best-youtube-seo-tools-2026": "12 Best YouTube SEO Tools in 2026 (Free & Paid)",
  "best-free-youtube-intro-makers-2026": "10 Best Free YouTube Intro Makers in 2026",
  "free-midjourney-alternatives-2026": "7 Free Midjourney Alternatives in 2026",
  "best-free-video-editors-youtube-2026": "10 Best Free Video Editors for YouTube in 2026",
  "best-microphones-under-100-youtube": "Best Microphones Under $100 for YouTube (2026)",
  "best-4k-cameras-under-1000-vlogging-2026": "Best 4K Cameras Under $1000 for Vlogging (2026)",
  "best-usb-microphones-youtube-podcasting-2026": "Best USB Microphones for YouTube & Podcasting 2026",
  "davinci-resolve-tutorial-youtube-beginners": "DaVinci Resolve Tutorial for YouTube Beginners 2026",
  "how-to-start-youtube-channel-2026": "How to Start a YouTube Channel in 2026 (Beginners)",
  "how-to-rank-on-ai-search-chatgpt-perplexity-gemini-2026": "AI SEO 2026: Rank on ChatGPT, Perplexity & Gemini",
};

const file = "src/config/blog.ts";
let src = readFileSync(file, "utf8");

// Guard: every seoTitle must fit the SERP budget with room to spare.
for (const [slug, t] of Object.entries(SEO_TITLES)) {
  if (t.length > 60) throw new Error(`seoTitle too long (${t.length}) for ${slug}: ${t}`);
}

let added = 0;
const skipped = [];

for (const [slug, seoTitle] of Object.entries(SEO_TITLES)) {
  // Match `slug: "<slug>",` then the following `title:` value (same line or wrapped).
  const re = new RegExp(
    `(slug: "${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\s*\\n(\\s*)title:\\s*(?:"[^"]*"|\\n\\s*"[^"]*"),)`,
  );
  const m = src.match(re);
  if (!m) {
    skipped.push(`${slug} (no match)`);
    continue;
  }
  // indent is captured by the replacer below.
  if (src.slice(m.index, m.index + m[0].length + 200).includes("seoTitle:")) {
    skipped.push(`${slug} (already has seoTitle)`);
    continue;
  }
  // Replacer must be a function: a string replacement would treat "$100" / "$20"
  // inside the seoTitle as capture-group references and corrupt the file.
  src = src.replace(re, (full, _all, ind) => `${full}\n${ind}seoTitle: ${JSON.stringify(seoTitle)},`);
  added++;
}

writeFileSync(file, src);
console.log(`seoTitle added: ${added}`);
if (skipped.length) console.log("skipped:\n  " + skipped.join("\n  "));
