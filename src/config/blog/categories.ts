/**
 * Canonical blog category system.
 *
 * Historically the 86 posts accumulated 29 free-text `category` labels
 * ("Growth", "Growth Strategy", "Channel Growth"…), which fragmented topical
 * authority and gave crawlers no hub pages to crawl. This module resolves every
 * raw label onto 9 canonical hubs WITHOUT rewriting post data (related-post
 * matching and the tool alias layer still run on the raw strings).
 *
 * Layers, in order:
 *   1. CATEGORY_SLUG_OVERRIDES  — per-post correction (wins over everything)
 *   2. CATEGORY_ALIASES         — raw label → canonical slug
 *   3. fallback                 — channel-growth
 */

import { getIndexableBlogPosts, type BlogPost } from "./index";

export interface BlogCategory {
  /** URL segment under /blog/category/ */
  slug: string;
  /** Display name (badge, H1) */
  name: string;
  /** 40–60 word AEO definition — the "what is X" answer for AI engines */
  definition: string;
  /** SERP title, ≤60 chars */
  seoTitle: string;
  /** SERP meta description, ≤155 chars */
  metaDescription: string;
  /** Hub-level FAQs (3 per hub) — also emitted as FAQPage JSON-LD */
  faqs: { question: string; answer: string }[];
  /** Slugs of related free tools shown as CTAs on the hub page */
  toolSlugs: string[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "channel-growth",
    name: "Channel Growth",
    definition:
      "Channel growth covers the strategies creators use to gain YouTube subscribers and views: upload cadence, niche selection, audience retention, packaging, analytics reviews, and community building. This hub collects every tested growth framework we publish, from your first 1,000 subscribers to scaling past 100k.",
    seoTitle: "YouTube Channel Growth Guides (17 Expert Playbooks)",
    metaDescription:
      "Proven YouTube channel growth strategies: get more views and subscribers, pick a niche, master analytics, and scale from 0 to 100k in 2026.",
    faqs: [
      {
        question: "How do I grow a YouTube channel from 0 subscribers?",
        answer:
          "Pick one niche you can cover weekly, study the top 10 channels in it, then publish consistently with strong packaging — a clear title and thumbnail tested against your niche. Our growth guides cover the full sequence: niche selection, upload cadence, retention editing, and analytics reviews.",
      },
      {
        question: "What is the fastest way to get more YouTube views?",
        answer:
          "Improve click-through rate and retention on existing videos before publishing new ones: refresh thumbnails and titles on videos that YouTube already suggests, and place your hook in the first 15 seconds. Views follow when YouTube's system sees people clicking and watching.",
      },
      {
        question: "How long does it take to grow on YouTube?",
        answer:
          "Most channels that eventually grow publish 20–50 focused videos in one niche before gaining traction. Growth is compounding, not linear — a library of related videos lets YouTube recommend you as a package, which is why niche focus beats one-off viral attempts.",
      },
    ],
    toolSlugs: ["youtube-channel-audit", "youtube-video-ideas-generator", "youtube-trend-helper"],
  },
  {
    slug: "monetization",
    name: "Monetization",
    definition:
      "YouTube monetization explains how creators turn views into income: AdSense CPM and RPM rates, YouTube Partner Program requirements, Shorts revenue, sponsorships, memberships, and Super Thanks. This hub tracks 2026 payout benchmarks by country and niche, plus every revenue path outside AdSense.",
    seoTitle: "YouTube Monetization Guides: CPM, RPM & AdSense (2026)",
    metaDescription:
      "How YouTube pays creators in 2026: CPM/RPM benchmarks by country, Partner Program requirements, Shorts revenue, sponsorships, and AdSense timing.",
    faqs: [
      {
        question: "How much does YouTube pay per 1,000 views?",
        answer:
          "It depends on your niche and audience country. US audiences commonly deliver an RPM of roughly $4–$10, so 1,000 views often earn a few dollars — while high-CPM finance or business niches can earn far more. Our CPM rates guide lists current benchmarks for 50+ countries.",
      },
      {
        question: "What are the YouTube Partner Program requirements in 2026?",
        answer:
          "The standard AdSense path needs 1,000 subscribers plus 4,000 public watch hours in 12 months, or 1,000 subscribers with 10 million Shorts views in 90 days. A lower entry tier (500 subscribers) unlocks fan funding like Super Thanks first.",
      },
      {
        question: "Do you need 1,000 subscribers to make money on YouTube?",
        answer:
          "Not for every revenue path. Affiliate links, sponsorships, and selling your own products work at any size. AdSense revenue sharing, channel memberships, and Super Thanks require YouTube Partner Program eligibility.",
      },
    ],
    toolSlugs: ["youtube-earnings-calculator", "youtube-sponsorship-calculator", "youtube-channel-valuation-calculator"],
  },
  {
    slug: "youtube-seo",
    name: "YouTube SEO",
    definition:
      "YouTube SEO is the practice of making videos discoverable in YouTube and Google search: keyword research, titles, descriptions, tags, hashtags, chapters, and captions — plus the click-through rate and watch time signals that decide rankings. This hub is our complete 2026 metadata and search-optimization library.",
    seoTitle: "YouTube SEO Guides: Tags, Titles & Descriptions (2026)",
    metaDescription:
      "Rank videos in YouTube search: keyword research, title formulas, description templates, tag strategy, chapters, and hashtags — all tested in 2026.",
    faqs: [
      {
        question: "Do YouTube tags still matter for SEO?",
        answer:
          "Tags are a minor signal in 2026 — the title, thumbnail, description, and audience response matter far more. Tags still help with misspellings and disambiguation, so spend a minute filling them (up to 500 characters) rather than treating them as the main ranking lever.",
      },
      {
        question: "How do I rank a YouTube video in Google search?",
        answer:
          "Target queries where Google prefers video results (tutorials, how-tos, reviews), put the exact keyword in your title, write a description that answers the query in the first two sentences, and add chapters so Google can surface key moments.",
      },
      {
        question: "How many tags should a YouTube video have?",
        answer:
          "Use 15–30 tags within YouTube's 500-character limit: start with the exact target keyword, add close variants, then 2–3 broad category tags. Never stuff unrelated trending tags — mismatched tags hurt the recommendations YouTube builds from your metadata.",
      },
    ],
    toolSlugs: ["youtube-tag-generator", "youtube-title-generator", "youtube-description-generator"],
  },
  {
    slug: "ai-tools",
    name: "AI Tools",
    definition:
      "AI tools for YouTube cover generative software that speeds up creation: AI thumbnail makers, script writers, video editors, subtitle generators, and idea generators. This hub reviews the tools actually worth using in 2026, with honest notes on what to verify before publishing AI-assisted work.",
    seoTitle: "AI Tools for YouTube: Top Guides & Reviews (2026)",
    metaDescription:
      "The best AI tools for YouTube creators in 2026: thumbnail generators, script writers, AI video editors, caption tools, and automation workflows reviewed.",
    faqs: [
      {
        question: "Can I use AI to make YouTube videos?",
        answer:
          "Yes — YouTube allows AI-assisted content, but requires disclosing realistic synthetic media (altered faces, voices, or scenes) via the altered-content label. AI works best for drafts, scripts, thumbnails, and captions; your voice, face, and judgment keep the channel authentic.",
      },
      {
        question: "What is the best free AI tool for YouTube creators?",
        answer:
          "For metadata and planning, a free browser suite like YouTube Tools Hub covers titles, tags, descriptions, and thumbnail downloads without signup. For video generation and editing, free tiers of CapCut and Clipchamp handle most beginner workflows.",
      },
      {
        question: "Will YouTube demonetize AI-generated videos?",
        answer:
          "YouTube demonetizes mass-produced, repetitive content regardless of how it is made. AI narration over stock footage with no original commentary is at risk; AI used as an editing aid inside original, human-guided videos monetizes normally.",
      },
    ],
    toolSlugs: ["youtube-ai-thumbnail-generator", "youtube-intro-script-generator", "youtube-ai-thumbnail-prompt"],
  },
  {
    slug: "thumbnails-design",
    name: "Thumbnails & Design",
    definition:
      "Thumbnail and design guides cover what makes YouTube images earn clicks: correct sizes (1280×720), contrast and face psychology, text limits, A/B testing, plus channel-level branding — banners, logos, and intros. This hub is our complete visual packaging library for 2026.",
    seoTitle: "YouTube Thumbnail & Design Guides: Sizes, CTR, Branding",
    metaDescription:
      "Design thumbnails that get clicked: exact YouTube thumbnail sizes, psychology-backed patterns, A/B testing, banner makers, and channel branding guides.",
    faqs: [
      {
        question: "What size should a YouTube thumbnail be?",
        answer:
          "1280×720 pixels (16:9), under 2MB, in JPG, PNG, or WebP. Export at exactly that size or larger — YouTube displays thumbnails from 168px wide on mobile to full-size on TVs, so fine detail and small text disappear on most screens.",
      },
      {
        question: "How do I make my thumbnails get more clicks?",
        answer:
          "Test one variable at a time: a clear focal subject, three words of maximum text, high contrast against YouTube's white/dark interfaces, and an expression or outcome that creates curiosity. Then use YouTube's Test & Compare feature to A/B validate.",
      },
      {
        question: "Can I download a YouTube thumbnail legally?",
        answer:
          "Downloading a thumbnail for analysis or reference is technically easy — append the video ID to an i.ytimg.com URL — but the image stays copyrighted by its creator. Use downloads to study layouts, never to republish someone else's thumbnail as your own.",
      },
    ],
    toolSlugs: ["youtube-thumbnail-downloader", "youtube-thumbnail-generator", "youtube-banner-logo-maker"],
  },
  {
    slug: "gear-equipment",
    name: "Gear & Equipment",
    definition:
      "YouTube gear guides cover the cameras, microphones, webcams, laptops, and lighting that actually move production quality up per dollar spent. Every pick is scoped by budget tier — phone-only, under $100, under $500, and pro — so you buy for your stage, not for a setup video.",
    seoTitle: "YouTube Gear Guides: Cameras, Mics & Laptops by Budget",
    metaDescription:
      "YouTube equipment guides by budget: best cameras, microphones, webcams, and editing laptops for creators in 2026 — with picks at every price tier.",
    faqs: [
      {
        question: "What equipment do I need to start a YouTube channel?",
        answer:
          "A modern phone camera, a $20–$100 lavalier or USB microphone, and window light are enough for your first 20 videos. Audio quality matters more than video — viewers forgive soft images but drop off over harsh sound. Upgrade cameras only after your content format is proven.",
      },
      {
        question: "Is a microphone or camera more important for YouTube?",
        answer:
          "The microphone. Poor audio reads as unprofessional instantly and kills retention, while slightly soft video is acceptable on every device. Spend your first $100 on audio, then improve lighting, then camera.",
      },
      {
        question: "How much does YouTube equipment cost for beginners?",
        answer:
          "A workable beginner kit costs $0–$150: your phone, a budget lavalier mic, and free editing software like CapCut or DaVinci Resolve. Add a $60–$100 USB microphone when you move to desk-based or podcast formats.",
      },
    ],
    toolSlugs: ["youtube-thumbnail-generator", "youtube-intro-script-generator", "youtube-content-calendar-generator"],
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    definition:
      "Video editing guides for YouTube cover the software and techniques that hold retention: free editors like CapCut and DaVinci Resolve, AI-assisted tools like Descript, mobile workflows, plus the cut patterns — hooks, jump cuts, pattern interrupts — that keep viewers watching.",
    seoTitle: "YouTube Video Editing Guides: Free Editors & Techniques",
    metaDescription:
      "Edit YouTube videos that retain: CapCut, DaVinci Resolve and Descript tutorials, free editor roundups, mobile workflows, and retention cutting techniques.",
    faqs: [
      {
        question: "What is the best free video editor for YouTube?",
        answer:
          "DaVinci Resolve is the most powerful free desktop editor (color and audio included); CapCut is the fastest for Shorts and social cuts. Both export 1080p+ with no watermark. Start with CapCut for speed, graduate to Resolve when you need fine control.",
      },
      {
        question: "How long should it take to edit a YouTube video?",
        answer:
          "Beginners commonly spend 1–2 hours per finished minute. Batching, templates for intros/lower thirds, and cutting the script before recording get most talking-head channels to 30–60 minutes per minute — retention editing is where the time should go, not effects.",
      },
      {
        question: "What editing techniques improve YouTube retention?",
        answer:
          "Cut every silence and restart, open with the payoff tease (hook) before context, change the frame or zoom every 20–40 seconds, add b-roll over every claim, and end sections with a question the next section answers.",
      },
    ],
    toolSlugs: ["youtube-shorts-script-planner", "youtube-timestamp-generator", "youtube-intro-script-generator"],
  },
  {
    slug: "shorts",
    name: "YouTube Shorts",
    definition:
      "YouTube Shorts guides cover the short-form playbook: viral ideas, scripting and editing techniques, the Shorts monetization revenue model, and how Shorts compare to TikTok and Reels pay. This hub collects everything specific to YouTube's short-form surface in 2026.",
    seoTitle: "YouTube Shorts Guides: Ideas, Viral Strategy & Monetization",
    metaDescription:
      "Master YouTube Shorts in 2026: viral video ideas, editing techniques, how the Shorts revenue pool pays, and Shorts vs TikTok vs Reels earnings compared.",
    faqs: [
      {
        question: "How much does YouTube pay for 1,000 Shorts views?",
        answer:
          "Shorts pay from a shared pool based on music licensing, so rates are far lower than long-form: creators commonly see the equivalent of roughly $0.01–$0.07 RPM — a few cents to pennies per 1,000 views. Shorts work as audience builders; long-form and sponsors carry the revenue.",
      },
      {
        question: "Do Shorts help grow a YouTube channel?",
        answer:
          "Yes — Shorts can expose a channel to millions of non-subscribers quickly, and viewers who like a Short often visit long-form content. The channels that benefit most use Shorts to demo the same topic their long videos cover, so new viewers have a next step.",
      },
      {
        question: "How long can YouTube Shorts be in 2026?",
        answer:
          "Up to 3 minutes for videos uploaded in the vertical 9:16 format (the limit was 60 seconds until October 2024). The feed still favors tight videos — most successful Shorts run under 45 seconds.",
      },
    ],
    toolSlugs: ["youtube-shorts-script-planner", "youtube-video-ideas-generator", "youtube-trend-helper"],
  },
  {
    slug: "creator-tools",
    name: "Tools & Reviews",
    definition:
      "Creator tool reviews compare the software YouTube channels actually use: TubeBuddy vs VidIQ, keyword research tools, SEO suites, intro makers, and free browser alternatives. Every review states who each tool fits, what the free tier really includes, and what to verify before paying.",
    seoTitle: "YouTube Tool Reviews & Comparisons: Best Free & Paid (2026)",
    metaDescription:
      "Honest YouTube tool reviews and comparisons: TubeBuddy vs VidIQ, keyword research suites, intro makers, and the best free browser-based alternatives.",
    faqs: [
      {
        question: "What is the best free alternative to TubeBuddy and VidIQ?",
        answer:
          "For core metadata workflows — titles, tags, descriptions, thumbnail downloads, and earnings estimates — YouTube Tools Hub covers the most-used TubeBuddy/VidIQ features free, in the browser with no extension. VidIQ/TubeBuddy still win on in-YouTube keyword scores and competitor tracking.",
      },
      {
        question: "Are paid YouTube SEO tools worth it?",
        answer:
          "Worth it once you publish consistently and need competitor keyword tracking at scale. Under ~5 videos a month, free tools plus YouTube's own Research tab in Studio cover keyword and metadata needs without a subscription.",
      },
      {
        question: "Do I need a browser extension for YouTube tools?",
        answer:
          "No. Browser-based suites run the same generators (titles, tags, descriptions, calculators) in a web page, with nothing installed. Extensions add in-page overlays while you browse YouTube — useful for competitor spying, optional for content production.",
      },
    ],
    toolSlugs: ["youtube-tag-extractor", "youtube-channel-audit", "youtube-subscriber-count-checker"],
  },
];

/**
 * Raw category label → canonical slug. Every raw string currently present in
 * posts-1..5.ts is covered; unmapped labels fall back to channel-growth.
 */
export const CATEGORY_ALIASES: Record<string, string> = {
  // Growth family
  "YouTube Growth": "channel-growth",
  Growth: "channel-growth",
  "Growth Strategy": "channel-growth",
  "Channel Growth": "channel-growth",
  "Content Strategy": "channel-growth",
  "Analytics & Growth": "channel-growth",
  Scripting: "channel-growth",
  // Monetization family
  Monetization: "monetization",
  "YouTube Monetization": "monetization",
  Business: "monetization",
  // SEO family
  "SEO & Metadata": "youtube-seo",
  "SEO & Growth": "youtube-seo",
  "SEO Tips": "youtube-seo",
  SEO: "youtube-seo",
  // AI family
  "AI Tools": "ai-tools",
  "Tools & Automation": "ai-tools",
  // Design family
  "Thumbnail & Design": "thumbnails-design",
  "Design & Branding": "thumbnails-design",
  Thumbnails: "thumbnails-design",
  // Gear family
  "YouTube Equipment": "gear-equipment",
  "YouTube Gear": "gear-equipment",
  "Creator Gear": "gear-equipment",
  // Editing family
  "Video Editing": "video-editing",
  "YouTube Tutorials": "video-editing",
  // Tools family
  "Tool Reviews": "creator-tools",
  "YouTube Tools": "creator-tools",
  "Getting Started": "creator-tools",
  "SEO Tools": "creator-tools",
  // Shorts
  Shorts: "shorts",
  "Content Ideas": "shorts",
};

/**
 * Per-post corrections where the raw label is too coarse for one post.
 * Keyed by post slug — these win over CATEGORY_ALIASES.
 */
export const CATEGORY_SLUG_OVERRIDES: Record<string, string> = {
  "youtube-seo-checklist-2026": "youtube-seo",
  "youtube-keyword-research-tools-2026": "creator-tools",
  "descript-youtube-editing": "video-editing",
  "ai-subtitle-generator-youtube": "ai-tools",
  "youtube-music-copyright-guide": "monetization",
  "opus-clip-tutorial": "ai-tools",
  "ai-scriptwriting-tools-youtube": "ai-tools",
  "shorts-vs-reels-vs-tiktok-pay": "shorts",
  "youtube-shorts-best-editing-apps-techniques": "shorts",
  "youtube-shorts-monetization-2026": "shorts",
  "ai-video-generators-youtube-shorts-2026": "shorts",
  "best-ai-video-editing-software-2026": "video-editing",
  "faceless-youtube-channel-ideas-2026": "channel-growth",
  "canva-ai-tools-youtube-complete-tutorial": "ai-tools",
  "best-free-video-editors-youtube-2026": "video-editing",
  "youtube-banner-makers-2026": "thumbnails-design",
  "youtube-thumbnail-ab-testing-guide-2026": "thumbnails-design",
};

const CATEGORY_BY_SLUG = new Map(BLOG_CATEGORIES.map((c) => [c.slug, c]));

/** Resolve a post's raw category label onto its canonical hub slug. */
export function getCanonicalCategorySlug(post: Pick<BlogPost, "slug" | "category">): string {
  const override = CATEGORY_SLUG_OVERRIDES[post.slug];
  if (override && CATEGORY_BY_SLUG.has(override)) return override;
  return CATEGORY_ALIASES[post.category] ?? "channel-growth";
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return CATEGORY_BY_SLUG.get(slug);
}

/** Display name for a raw category label (canonical hub name). */
export function getCategoryDisplayName(post: Pick<BlogPost, "slug" | "category">): string {
  return CATEGORY_BY_SLUG.get(getCanonicalCategorySlug(post))?.name ?? post.category;
}

export function getBlogCategoryUrl(slug: string): string {
  return `/blog/category/${slug}`;
}

/** All indexable posts filed under a canonical category hub, newest first. */
export function getPostsForCategory(slug: string): BlogPost[] {
  return getIndexableBlogPosts().filter(
    (post) => getCanonicalCategorySlug(post) === slug,
  );
}

/** Post counts per canonical hub (for hubs listing, sitemap, llms.txt). */
export function getCategoryPostCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of BLOG_CATEGORIES) counts[category.slug] = 0;
  for (const post of getIndexableBlogPosts()) {
    counts[getCanonicalCategorySlug(post)] =
      (counts[getCanonicalCategorySlug(post)] ?? 0) + 1;
  }
  return counts;
}
