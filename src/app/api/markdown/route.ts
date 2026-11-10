import { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { tools, toolCategories, getToolBySlug, getToolsByCategory } from "@/config/tools";
import { countryCPMData, getCountryBySlug, getCountryTier, estimateEarnings } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED, speakableAnswers, nicheRpmRanking, subscriberBenchmarks, citableFacts } from "@/lib/seo-data";
import { getBlogPostBySlug, getIndexableBlogPosts } from "@/config/blog";
import { getCategoryBySlug, getPostsForCategory } from "@/config/blog/categories";
import { glossaryTerms } from "@/config/glossary";

function buildHomepageMarkdown(): string {
  const baseUrl = siteConfig.url;
  const tier1Countries = countryCPMData.slice(0, 12);

  const toolsByCategory = toolCategories
    .map((cat) => {
      const catTools = tools.filter((t) => t.category === cat.id);
      const list = catTools
        .map(
          (t) =>
            `- [${t.name}](${baseUrl}/tools/${t.slug}): ${t.shortDescription}${t.isAI ? " *(AI-Powered)*" : ""}`,
        )
        .join("\n");
      return `### ${cat.name} (${catTools.length} Tools)\n\n${cat.description}\n\n${list}`;
    })
    .join("\n\n");

  const cpmTable = [
    "| Country | Code | Avg CPM (USD) | Avg RPM (USD) | Calculator URL |",
    "| --- | --- | --- | --- | --- |",
    ...tier1Countries.map(
      (c) =>
        `| ${c.name} | ${c.code} | $${c.cpmRange.avg.toFixed(2)} | $${c.rpmRange.avg.toFixed(2)} | [Calculate](${baseUrl}/tools/youtube-earnings-calculator/${c.slug}) |`,
    ),
  ].join("\n");

  const nicheTable = [
    "| Niche | Typical RPM Range (USD) | Notes |",
    "| --- | --- | --- |",
    ...nicheRpmRanking.map(
      (n) => `| ${n.label} | ${n.value} | ${n.note || ""} |`,
    ),
  ].join("\n");

  return `---
title: "${siteConfig.seo.defaultTitle}"
url: "${baseUrl}"
description: "${siteConfig.description}"
organization: "${siteConfig.name}"
email: "${siteConfig.contact.email}"
telephone: "${siteConfig.contact.telephone}"
address: "${siteConfig.contact.address.streetAddress}, ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.addressCountry}"
data_last_reviewed: "${DATA_LAST_REVIEWED}"
llms_txt: "${baseUrl}/llms.txt"
mcp_server_card: "${baseUrl}/.well-known/mcp/server-card.json"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# ${siteConfig.name} — Free YouTube Tools for Creators

> ${siteConfig.description}

**${siteConfig.name}** (${baseUrl}) is a free, browser-based suite of **${tools.length} YouTube creator tools** covering 4K/HD thumbnail downloading, AI title & tag generation, transcript extraction, and Tier-1 AdSense RPM/CPM earnings calculation across 52 countries. No signup, browser extension, or credit card is required for core tools.

## Quick Navigation & Official Pages

- **Home**: [${baseUrl}](${baseUrl})
- **All ${tools.length} Creator Tools**: [${baseUrl}/tools](${baseUrl}/tools)
- **YouTube CPM & RPM Rates (2026)**: [${baseUrl}/resources/youtube-cpm-rates](${baseUrl}/resources/youtube-cpm-rates)
- **YouTube Creator Blog**: [${baseUrl}/blog](${baseUrl}/blog)
- **Pricing**: [${baseUrl}/pricing](${baseUrl}/pricing)
- **FAQ**: [${baseUrl}/faq](${baseUrl}/faq)
- **About Us**: [${baseUrl}/about](${baseUrl}/about)
- **Contact Support**: [${baseUrl}/contact](${baseUrl}/contact)
- **Privacy Policy**: [${baseUrl}/privacy-policy](${baseUrl}/privacy-policy)
- **Terms of Use**: [${baseUrl}/terms-of-use](${baseUrl}/terms-of-use)
- **Refund Policy**: [${baseUrl}/refund-policy](${baseUrl}/refund-policy)
- **Disclaimer**: [${baseUrl}/disclaimer](${baseUrl}/disclaimer)

## Organization & Business Details

- **Legal / Brand Name**: ${siteConfig.name} (YT Tools Hub)
- **Website**: ${baseUrl}
- **Support Email**: ${siteConfig.contact.email}
- **Telephone**: ${siteConfig.contact.telephone}
- **Mailing Address**: ${siteConfig.contact.address.streetAddress}, ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.addressCountry}

## Complete Directory of ${tools.length} Free YouTube Tools

${toolsByCategory}

## 2026 YouTube CPM & RPM Benchmarks (Top Tier-1 Markets)

${speakableAnswers.howMuchYoutubePays}

${cpmTable}

## 2026 YouTube Niche RPM Benchmarks

${nicheTable}

## Frequently Asked Questions

### Is YouTube Tools Hub free to use?
Yes. Core tools including the YouTube Thumbnail Downloader, Title Generator, Tag Generator, Transcript Downloader, and Earnings Calculator are 100% free in your browser with no signup required.

### How much does YouTube pay per 1,000 views?
${speakableAnswers.howMuchYoutubePays}

### What is the difference between YouTube CPM and RPM?
${speakableAnswers.cpmVsRpm}

### What is the best YouTube thumbnail resolution?
${speakableAnswers.bestThumbnailSize}

## Agent & Machine-Readable Endpoints

- **LLMs Summary**: [${baseUrl}/llms.txt](${baseUrl}/llms.txt)
- **LLMs Full Documentation**: [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt)
- **MCP Server Card (SEP-1649)**: [${baseUrl}/.well-known/mcp/server-card.json](${baseUrl}/.well-known/mcp/server-card.json)
- **MCP JSON-RPC Endpoint**: [${baseUrl}/api/mcp](${baseUrl}/api/mcp)
- **AI Context Graph (JSON)**: [${baseUrl}/api/ai-context](${baseUrl}/api/ai-context)
- **JSON-LD Knowledge Graph**: [${baseUrl}/knowledge-graph.jsonld](${baseUrl}/knowledge-graph.jsonld)
- **OpenAPI 3.1 Spec**: [${baseUrl}/.well-known/openapi.yaml](${baseUrl}/.well-known/openapi.yaml)
`;
}

function buildToolMarkdown(slug: string): string | null {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  const baseUrl = siteConfig.url;
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;

  const steps = (tool.howTo?.steps || [])
    .map((s, idx) => `${idx + 1}. **${s.name}**: ${s.text}`)
    .join("\n");

  const faqs = (tool.faqs || [])
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  return `---
title: "${tool.seoTitle || tool.name}"
url: "${toolUrl}"
category: "${tool.category}"
is_ai_powered: ${Boolean(tool.isAI)}
price: "0 USD (Free)"
---

# ${tool.name}

> ${tool.seoDescription || tool.description}

- **Tool URL**: [${toolUrl}](${toolUrl})
- **Category**: ${tool.category}
- **Cost**: Free (No signup required)

## How to Use ${tool.name}

${steps || `1. Open [${tool.name}](${toolUrl}) in your browser.\n2. Enter your YouTube URL, topic, or metrics.\n3. Review and copy or download your results instantly.`}

${faqs ? `## Frequently Asked Questions\n\n${faqs}\n` : ""}
## Related Links

- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
- [Home — ${siteConfig.name}](${baseUrl})
`;
}

function buildBlogPostMarkdown(slug: string): string | null {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;
  const baseUrl = siteConfig.url;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const cleanContent = post.content
    .replace(/:::\s*QUICK-ANSWER\s*([\s\S]*?):::/gi, "> **Quick Answer**:\n> $1\n")
    .replace(/:::\s*KEY-TAKEAWAYS\s*([\s\S]*?):::/gi, "> **Key Takeaways**:\n> $1\n");

  const howToSection = post.howTo
    ? `\n\n## Step-by-Step Guide: ${post.howTo.name}\n\n${post.howTo.description}\n\n` +
      post.howTo.steps.map((s, idx) => `${idx + 1}. **${s.name}**: ${s.text}`).join("\n")
    : "";

  const faqSection = post.faq && post.faq.length > 0
    ? `\n\n## Frequently Asked Questions\n\n` +
      post.faq.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")
    : "";

  return `---
title: "${post.title.replace(/"/g, '\\"')}"
url: "${postUrl}"
date: "${post.date}"
${post.updatedAt ? `updated_at: "${post.updatedAt}"\n` : ""}author: "${post.author}"
author_role: "${post.authorRole}"
category: "${post.category}"
reading_time: "${post.readTime}"
description: "${post.metaDescription.replace(/"/g, '\\"')}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# ${post.title}

> ${post.excerpt}

- **Published**: ${post.date}${post.updatedAt ? ` (Updated: ${post.updatedAt})` : ""}
- **Author**: ${post.author} (${post.authorRole})
- **Category**: ${post.category}
- **Read Time**: ${post.readTime}
- **Canonical URL**: [${postUrl}](${postUrl})

${cleanContent}
${howToSection}
${faqSection}

## About the Author
**${post.author}** is a ${post.authorRole} at YouTube Tools Hub.

## Related Resources
- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
- [YouTube CPM & RPM Rates (2026)](${baseUrl}/resources/youtube-cpm-rates)
- [Creator Blog Directory](${baseUrl}/blog)
`;
}

function buildBlogListMarkdown(): string {
  const baseUrl = siteConfig.url;
  const posts = getIndexableBlogPosts();

  const list = posts
    .map(
      (p) =>
        `- [${p.title}](${baseUrl}/blog/${p.slug}) (${p.date} • ${p.category} • ${p.readTime}): ${p.excerpt}`,
    )
    .join("\n");

  return `---
title: "YouTube Creator Blog & Growth Guides | YouTube Tools Hub"
url: "${baseUrl}/blog"
description: "Data-backed YouTube growth guides, monetization formulas, CPM rate benchmarks, and AI workflows for creators."
total_posts: ${posts.length}
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Creator Blog & Guides

> Data-backed tutorials, revenue benchmarks, algorithm breakdowns, and step-by-step YouTube growth guides.

## All ${posts.length} Published Articles

${list}

## Free Tools
- [Explore all ${tools.length} Free Creator Tools](${baseUrl}/tools)
- [2026 YouTube CPM & RPM Benchmarks](${baseUrl}/resources/youtube-cpm-rates)
`;
}

function buildCpmRatesMarkdown(): string {
  const baseUrl = siteConfig.url;
  const cpmTable = [
    "| Country | Code | Avg CPM (USD) | Min CPM | Max CPM | Avg RPM (USD) | Calculator Link |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...countryCPMData.map(
      (c) =>
        `| ${c.name} | ${c.code} | $${c.cpmRange.avg.toFixed(2)} | $${c.cpmRange.min.toFixed(2)} | $${c.cpmRange.max.toFixed(2)} | $${c.rpmRange.avg.toFixed(2)} | [Calculate](${baseUrl}/tools/youtube-earnings-calculator/${c.slug}) |`,
    ),
  ].join("\n");

  return `---
title: "YouTube CPM & RPM Rates by Country (2026 Benchmark Data)"
url: "${baseUrl}/resources/youtube-cpm-rates"
description: "Comprehensive 2026 YouTube CPM and RPM benchmarks across 52 countries. Verified data for creators, marketers, and video publishers."
last_reviewed: "${DATA_LAST_REVIEWED}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube CPM & RPM Rates by Country (2026 Benchmarks)

> Official monetization benchmarks across 52 countries for YouTube creators and video marketers.

## Key Definitions
- **CPM (Cost Per Mille)**: The cost advertisers pay per 1,000 ad impressions before YouTube takes its 45% revenue share.
- **RPM (Revenue Per Mille)**: The net amount creators actually receive per 1,000 total video views after YouTube's cut.

${speakableAnswers.howMuchYoutubePays}

## 2026 YouTube AdSense CPM & RPM Table (52 Countries)

${cpmTable}

## Free Monetization Calculators
- [YouTube Earnings Calculator](${baseUrl}/tools/youtube-earnings-calculator)
- [YouTube Sponsorship Rate Calculator](${baseUrl}/tools/youtube-sponsorship-calculator)
- [YouTube Channel Valuation Calculator](${baseUrl}/tools/youtube-channel-valuation-calculator)
`;
}

function buildFaqMarkdown(): string {
  const baseUrl = siteConfig.url;

  return `---
title: "Frequently Asked Questions | YouTube Tools Hub"
url: "${baseUrl}/faq"
description: "Common questions about YouTube Tools Hub free creator tools, AI thumbnail generators, AdSense calculators, and security."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# Frequently Asked Questions

> Everything you need to know about YouTube Tools Hub, tool safety, browser-based execution, and monetization calculations.

### Is YouTube Tools Hub free to use?
Yes. All ${tools.length} core creator tools—including the Thumbnail Downloader, Title Generator, Description Generator, Transcript Downloader, and Earnings Calculator—are 100% free with no account or credit card required.

### Do I need to connect or link my YouTube account?
No. Tools operate on public video, channel, or playlist URLs. You never need to grant OAuth permissions, provide API keys, or enter your YouTube credentials.

### How accurate are the YouTube Earnings and CPM Calculators?
Calculations use audited 2026 CPM and RPM empirical data across ${countryCPMData.length} countries and 15+ niches. AdSense revenue is estimated using YouTube's standard 55/45 creator revenue share split.

### How does the YouTube Thumbnail Downloader work?
It extracts official Google CDN high-resolution thumbnails directly from YouTube's static image servers across maxresdefault (1080p/4K), hqdefault (720p), mqdefault, and standard resolutions.

### Are AI-generated titles and descriptions compliant with YouTube policies?
Yes. Titles and descriptions are drafted to comply with YouTube's Metadata & Spam Guidelines. We recommend personalizing the above-the-fold hook to reflect your authentic video tone.

## Explore More
- [Browse All Free Tools](${baseUrl}/tools)
- [Read Creator Growth Guides](${baseUrl}/blog)
- [Contact Support](${baseUrl}/contact)
`;
}

const CATEGORY_HUB_MAP: Record<
  string,
  { categoryId: string; title: string; description: string }
> = {
  "thumbnail-tools": {
    categoryId: "thumbnail-media",
    title: "YouTube Thumbnail & Media Tools",
    description:
      "Download HD and 4K thumbnails, generate AI thumbnail concepts, craft text hooks, and optimize video packaging for higher CTR.",
  },
  "seo-tools": {
    categoryId: "seo-metadata",
    title: "YouTube SEO & Metadata Tools",
    description:
      "Generate viral YouTube titles, SEO descriptions, semantic tags, and trending hashtags directly in your browser.",
  },
  "channel-tools": {
    categoryId: "channel-growth",
    title: "YouTube Channel Research & Growth Tools",
    description:
      "Research rising topics, generate viral video ideas, build upload calendars, and scale your YouTube channel.",
  },
  "analytics-tools": {
    categoryId: "analytics-earnings",
    title: "YouTube Analytics, Revenue & Tax Calculators",
    description:
      "Calculate YouTube AdSense earnings, sponsorship rates, channel valuation, S-Corp tax savings, and engagement rates.",
  },
  "utility-tools": {
    categoryId: "utility-fun",
    title: "YouTube Utility & Productivity Tools",
    description:
      "Calculate playlist duration, run fair giveaway comment draws, extract transcripts, and audit channel health.",
  },
};

function buildToolsIndexMarkdown(): string {
  const baseUrl = siteConfig.url;
  const categorySections = toolCategories
    .map((cat) => {
      const catTools = getToolsByCategory(cat.id);
      const list = catTools
        .map(
          (t) =>
            `- [${t.name}](${baseUrl}/tools/${t.slug}): ${t.shortDescription}${t.isAI ? " *(AI-Powered)*" : ""}`,
        )
        .join("\n");
      return `## ${cat.name} (${catTools.length})\n\n${cat.description}\n\n${list}`;
    })
    .join("\n\n");

  return `---
title: "All ${tools.length} Free YouTube Tools | YouTube Tools Hub"
url: "${baseUrl}/tools"
description: "Browse all ${tools.length} free YouTube tools by category: thumbnails, SEO metadata, channel growth, revenue calculators, and creator utilities."
tool_count: ${tools.length}
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# All ${tools.length} Free YouTube Tools

> Browser-based creator toolkit covering thumbnails, SEO titles & tags, channel analytics, tax & AdSense calculators, and utilities — no signup required.

## Category Hubs

- [Thumbnail & Media Tools](${baseUrl}/tools/thumbnail-tools)
- [SEO & Metadata Tools](${baseUrl}/tools/seo-tools)
- [Channel Research & Growth Tools](${baseUrl}/tools/channel-tools)
- [Analytics, Revenue & Tax Calculators](${baseUrl}/tools/analytics-tools)
- [Utility & Productivity Tools](${baseUrl}/tools/utility-tools)

${categorySections}
`;
}

function buildCategoryHubMarkdown(hubSlug: string): string | null {
  const hub = CATEGORY_HUB_MAP[hubSlug];
  if (!hub) return null;
  const baseUrl = siteConfig.url;
  const catTools = getToolsByCategory(hub.categoryId);
  const list = catTools
    .map(
      (t) =>
        `- [${t.name}](${baseUrl}/tools/${t.slug}): ${t.shortDescription}${t.isAI ? " *(AI-Powered)*" : ""}`,
    )
    .join("\n");

  return `---
title: "${hub.title} | YouTube Tools Hub"
url: "${baseUrl}/tools/${hubSlug}"
description: "${hub.description}"
tool_count: ${catTools.length}
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# ${hub.title}

> ${hub.description}

## Included Free Tools (${catTools.length})

${list}

## Related Links
- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
- [YouTube CPM & RPM Benchmarks](${baseUrl}/resources/youtube-cpm-rates)
`;
}

function buildVsComparisonMarkdown(competitor: "tubebuddy" | "vidiq"): string {
  const baseUrl = siteConfig.url;
  const name = competitor === "tubebuddy" ? "TubeBuddy" : "VidIQ";
  return `---
title: "YouTube Tools Hub vs ${name} (Free Browser Alternative 2026)"
url: "${baseUrl}/tools/vs/${competitor}"
description: "Compare YouTube Tools Hub and ${name}: pricing ($0 free web tools vs paid subscriptions), browser extension requirements, privacy, and creator workflows."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Tools Hub vs ${name} (2026 Comparison)

> Looking for a fast, browser-based free ${name} alternative with no extension required? Compare features, privacy, and pricing side by side.

## Quick Verdict
- **YouTube Tools Hub**: ${tools.length} browser-based YouTube tools (thumbnails, titles, tags, transcripts, earnings, tax & sponsorship calculators) — free with no browser extension or YouTube OAuth login required.
- **${name}**: Browser extension with in-Studio overlays and keyword/competitor tracking behind paid tiers.

## Explore Free Tools
- [Browse All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
- [YouTube Earnings Calculator](${baseUrl}/tools/youtube-earnings-calculator)
- [YouTube Tag Extractor](${baseUrl}/tools/youtube-tag-extractor)
`;
}

function buildCountryEarningsMarkdown(countrySlug: string): string | null {
  const country = getCountryBySlug(countrySlug);
  if (!country) return null;
  const baseUrl = siteConfig.url;
  const tier = getCountryTier(country.code);
  const earn100k = estimateEarnings(100_000, country.rpmRange.avg);
  const earn1m = estimateEarnings(1_000_000, country.rpmRange.avg);
  const url = `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`;

  return `---
title: "YouTube Earnings Calculator — ${country.name} (${country.code}, 2026)"
url: "${url}"
country: "${country.name}"
country_code: "${country.code}"
currency: "${country.currency}"
tier: "${tier.label}"
last_reviewed: "${DATA_LAST_REVIEWED}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Earnings Calculator: ${country.name} (${country.flag} ${country.code})

> Free 2026 YouTube AdSense planning calculator for creators with audiences in **${country.name}** (${tier.label}: ${tier.description}).

## 2026 ${country.name} CPM & RPM Benchmarks

- **Average CPM (Advertiser Spend)**: $${country.cpmRange.avg.toFixed(2)} USD (Range: $${country.cpmRange.min.toFixed(2)} – $${country.cpmRange.max.toFixed(2)})
- **Average RPM (Creator Net)**: $${country.rpmRange.avg.toFixed(2)} USD (Range: $${country.rpmRange.min.toFixed(2)} – $${country.rpmRange.max.toFixed(2)})
- **Estimated 100,000 Views Earnings**: $${earn100k.toFixed(2)} USD
- **Estimated 1,000,000 Views Earnings**: $${earn1m.toFixed(2)} USD
- **Local Currency**: ${country.currency}

## Open Interactive Calculator
- [YouTube Earnings Calculator (${country.name})](${url})
- [All ${countryCPMData.length} Country CPM Rates](${baseUrl}/resources/youtube-cpm-rates)
- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
`;
}

function buildTranscriptDownloaderMarkdown(): string {
  const baseUrl = siteConfig.url;
  const url = `${baseUrl}/youtube-transcript-downloader`;
  return `---
title: "YouTube Transcript Downloader & Keyword Extractor (Free, 2026)"
url: "${url}"
price: "0 USD (Free)"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Transcript Downloader & Keyword Extractor

> Extract and download YouTube transcripts and closed captions free in Plain Text, SRT, or CSV with optional timestamps and spoken SEO keyword analysis. Works with standard videos and YouTube Shorts.

## Key Features
- **Multiple Export Formats**: Plain Text (\`.txt\`), SubRip Subtitles (\`.srt\`), and CSV (\`.csv\`).
- **Timestamps Toggle**: Strip timecodes for clean LLM prompts, summaries, and articles.
- **Spoken Keyword Extraction**: Identify high-frequency spoken keywords and topic entities.
- **Shorts & Standard Videos**: Works with any public \`youtube.com/watch\`, \`youtu.be\`, or \`youtube.com/shorts\` URL.

## Open Tool
- [Launch YouTube Transcript Downloader](${url})
- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
`;
}

function buildBlogCategoryMarkdown(slug: string): string | null {
  const category = getCategoryBySlug(slug);
  if (!category) return null;
  const baseUrl = siteConfig.url;
  const posts = getPostsForCategory(slug);
  const list = posts
    .map(
      (p) =>
        `- [${p.title}](${baseUrl}/blog/${p.slug}) (${p.date} • ${p.readTime}): ${p.excerpt}`,
    )
    .join("\n");

  const faqs = category.faqs
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  return `---
title: "${category.seoTitle} | YouTube Tools Hub"
url: "${baseUrl}/blog/category/${category.slug}"
description: "${category.metaDescription}"
post_count: ${posts.length}
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# ${category.name} — YouTube Creator Guides

> ${category.definition}

## Guides in This Category (${posts.length})

${list}

## Frequently Asked Questions

${faqs}
`;
}

function buildResourcesIndexMarkdown(): string {
  const baseUrl = siteConfig.url;
  return `---
title: "YouTube Creator Resources & Guides | YouTube Tools Hub"
url: "${baseUrl}/resources"
description: "Free YouTube creator resources: CPM rate benchmarks across ${countryCPMData.length} countries, algorithm guides, monetization playbooks, creator statistics, glossary, and embeddable badges."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Creator Resources & Playbooks

> Long-form benchmarks, algorithm explainers, and monetization playbooks — free, with no signup required.

## Resource Library
- [YouTube CPM & RPM Rates by Country (${countryCPMData.length} Markets)](${baseUrl}/resources/youtube-cpm-rates)
- [YouTube Algorithm Guide 2026](${baseUrl}/resources/youtube-algorithm-guide)
- [YouTube Monetization Guide 2026](${baseUrl}/resources/youtube-monetization-guide)
- [YouTube Creator Statistics 2026](${baseUrl}/resources/youtube-creator-statistics)
- [YouTube Glossary (${glossaryTerms.length} Creator Terms Defined)](${baseUrl}/resources/youtube-glossary)
- [Link to Us — Badges & Widgets](${baseUrl}/resources/link-to-us)
`;
}

function buildResourceGuideMarkdown(pathname: string): string | null {
  const baseUrl = siteConfig.url;
  switch (pathname) {
    case "/resources/youtube-algorithm-guide":
      return `---
title: "YouTube Algorithm Guide 2026 — How It Works & Ranking Factors"
url: "${baseUrl}${pathname}"
description: "Complete guide to the YouTube algorithm in 2026: CTR, Watch Time, viewer satisfaction, session duration, and SEO signals."
last_reviewed: "${DATA_LAST_REVIEWED}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Algorithm Guide 2026

> How YouTube ranks and recommends videos across Home, Suggested, Search, and Shorts — and which packaging and retention signals creators can directly improve.

## Core Ranking Signals
1. **Click-Through Rate (CTR)**: How compelling your title and thumbnail appear on first impression.
2. **Average View Duration & Retention**: How long viewers stay engaged after clicking.
3. **Viewer Satisfaction Signals**: Surveys, likes, shares, rewatches, and low "Not Interested" skips.
4. **Topical Authority & Session Time**: Related videos that encourage binge sessions across your channel.

## Recommended Tools
- [YouTube Title Generator](${baseUrl}/tools/youtube-title-generator)
- [YouTube Title A/B Tester](${baseUrl}/tools/youtube-title-ab-tester)
- [YouTube Channel Audit](${baseUrl}/tools/youtube-channel-audit)
`;
    case "/resources/youtube-monetization-guide":
      return `---
title: "YouTube Monetization Guide 2026: YPP & Revenue Streams"
url: "${baseUrl}${pathname}"
description: "YouTube Partner Program requirements (1,000 subscribers + 4,000 watch hours or 10M Shorts views), AdSense RPM vs CPM, sponsorships, and diversified creator income."
last_reviewed: "${DATA_LAST_REVIEWED}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Monetization Guide 2026

> Complete roadmap to unlocking the YouTube Partner Program (YPP), pricing sponsorships, optimizing AdSense RPM, and building diversified creator revenue.

## 2026 Partner Program Thresholds
- **Full AdSense tier**: 1,000 subscribers + either 4,000 valid public watch hours in the past 12 months OR 10 million valid public Shorts views in the past 90 days.
- **Fan-funding early access tier**: 500 subscribers + 3 public uploads in 90 days + either 3,000 watch hours or 3M Shorts views.

## Revenue Calculators
- [YouTube Earnings Calculator](${baseUrl}/tools/youtube-earnings-calculator)
- [YouTube Sponsorship Rate Calculator](${baseUrl}/tools/youtube-sponsorship-calculator)
- [4,000 Watch Hours Calculator](${baseUrl}/tools/youtube-watch-hours-calculator)
`;
    case "/resources/youtube-creator-statistics": {
      const niches = nicheRpmRanking
        .map((n) => `- **${n.label}**: ${n.value}${n.note ? ` (${n.note})` : ""}`)
        .join("\n");
      const subs = subscriberBenchmarks
        .map((s) => `- **${s.label}**: ${s.value}`)
        .join("\n");
      return `---
title: "YouTube Creator Statistics 2026 | YouTube Tools Hub"
url: "${baseUrl}${pathname}"
description: "Verified 2026 YouTube creator benchmarks: niche RPM rankings, subscriber milestones, Shorts vs long-form monetization, and global CPM averages."
last_reviewed: "${DATA_LAST_REVIEWED}"
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Creator Statistics & Benchmarks (2026)

> Data reviewed ${DATA_LAST_REVIEWED}. Global planning benchmark: ${citableFacts.globalCpmRough} CPM-equivalent across broad audiences, with wide variation by geography and niche.

## Niche RPM Benchmarks
${niches}

## Channel Benchmarks
${subs}

## Related Tools
- [Country CPM Benchmarks](${baseUrl}/resources/youtube-cpm-rates)
- [YouTube Earnings Calculator](${baseUrl}/tools/youtube-earnings-calculator)
`;
    }
    case "/resources/youtube-glossary": {
      const termsMd = glossaryTerms
        .map((item) => `### ${item.term}\n${item.definition}`)
        .join("\n\n");
      return `---
title: "YouTube Glossary: ${glossaryTerms.length} Creator Terms Defined (2026)"
url: "${baseUrl}${pathname}"
description: "Plain-English definitions of ${glossaryTerms.length} essential YouTube creator metrics and terminology including CPM, RPM, CTR, YPP, AVD, and Content ID."
term_count: ${glossaryTerms.length}
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# YouTube Glossary (${glossaryTerms.length} Terms Defined)

${termsMd}
`;
    }
    case "/resources/link-to-us":
      return `---
title: "Link to YouTube Tools Hub — Attribution & Badges"
url: "${baseUrl}${pathname}"
description: "Embeddable HTML badges and attribution snippets for creator blogs, newsletters, and communities linking to our ${tools.length} free YouTube tools."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# Link to YouTube Tools Hub

> Free attribution snippets and HTML badges for creators, educators, and bloggers who recommend our ${tools.length} free YouTube tools.

- [Visit Link to Us Page](${baseUrl}/resources/link-to-us)
- [Browse All ${tools.length} Tools](${baseUrl}/tools)
`;
    default:
      return null;
  }
}

function buildAboutMarkdown(): string {
  const baseUrl = siteConfig.url;
  return `---
title: "About YouTube Tools Hub - Free Tools for Creators"
url: "${baseUrl}/about"
description: "Learn about YouTube Tools Hub, a free suite of ${tools.length}+ browser-based creator tools built to streamline YouTube research, packaging, and monetization workflows."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# About ${siteConfig.name}

> ${siteConfig.description}

- **Total Tools**: ${tools.length} free creator tools
- **Signup Required**: None for core tools
- **Supported Markets**: ${countryCPMData.length} countries in CPM/RPM calculators
- **Support Email**: ${siteConfig.contact.email}
- **Mailing Address**: ${siteConfig.contact.address.streetAddress}, ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.addressCountry}

## Explore
- [Browse All ${tools.length} Tools](${baseUrl}/tools)
- [Contact Support](${baseUrl}/contact)
`;
}

function buildPricingMarkdown(): string {
  const baseUrl = siteConfig.url;
  return `---
title: "Pricing — Free vs Pro Plans | YouTube Tools Hub"
url: "${baseUrl}/pricing"
description: "Compare Free vs Pro plans on YouTube Tools Hub. All ${tools.length} core tools are free with no signup or credit card required."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# Pricing — Free & Pro Plans

> Core YouTube Tools Hub calculators, downloaders, and metadata generators (${tools.length} tools total) are free to use with no credit card or signup required.

- **Free Plan ($0/month)**: Unlimited core access to browser calculators, thumbnail downloads, metadata builders, and transcript exports.
- **Pro Plan**: Higher daily AI generation limits and priority processing for high-volume channels and teams.

- [View Live Pricing Page](${baseUrl}/pricing)
- [Explore All ${tools.length} Free Tools](${baseUrl}/tools)
`;
}

function buildContactMarkdown(): string {
  const baseUrl = siteConfig.url;
  return `---
title: "Contact Support | YouTube Tools Hub"
url: "${baseUrl}/contact"
description: "Contact the YouTube Tools Hub support team for assistance, feedback, feature requests, or partnerships."
content_signal: "search=yes, ai-input=yes, ai-train=no"
---

# Contact YouTube Tools Hub

- **Email**: ${siteConfig.contact.email}
- **Telephone**: ${siteConfig.contact.telephone}
- **Mailing Address**: ${siteConfig.contact.address.streetAddress}, ${siteConfig.contact.address.addressLocality}, ${siteConfig.contact.address.addressRegion} ${siteConfig.contact.address.postalCode}, ${siteConfig.contact.address.addressCountry}
- **Interactive Contact Form**: [${baseUrl}/contact](${baseUrl}/contact)
`;
}

function buildNotFoundMarkdown(pathname: string): string {
  const baseUrl = siteConfig.url;
  return `---
title: "404 Page Not Found | YouTube Tools Hub"
status: 404
url: "${baseUrl}${pathname}"
---

# 404 — Page Not Found

The requested resource (\`${pathname}\`) does not exist on YouTube Tools Hub.

- [Home — YouTube Tools Hub](${baseUrl})
- [All ${tools.length} Free YouTube Tools](${baseUrl}/tools)
- [YouTube Creator Blog](${baseUrl}/blog)
`;
}

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path") || "/";
  let normalizedPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  if (normalizedPath.endsWith(".md")) {
    normalizedPath = normalizedPath.slice(0, -3) || "/";
  }
  if (normalizedPath.length > 1) {
    normalizedPath = normalizedPath.replace(/\/+$/, "");
  }
  if (normalizedPath === "/index") {
    normalizedPath = "/";
  }

  let markdown: string | null = null;

  if (normalizedPath === "/") {
    markdown = buildHomepageMarkdown();
  } else if (normalizedPath === "/tools") {
    markdown = buildToolsIndexMarkdown();
  } else if (normalizedPath.startsWith("/tools/")) {
    const segments = normalizedPath.replace(/^\/tools\//, "").split("/").filter(Boolean);
    if (segments.length === 1 && CATEGORY_HUB_MAP[segments[0]]) {
      markdown = buildCategoryHubMarkdown(segments[0]);
    } else if (
      segments.length === 2 &&
      segments[0] === "vs" &&
      (segments[1] === "tubebuddy" || segments[1] === "vidiq")
    ) {
      markdown = buildVsComparisonMarkdown(segments[1]);
    } else if (segments.length === 2 && segments[0] === "youtube-earnings-calculator") {
      markdown = buildCountryEarningsMarkdown(segments[1]);
    } else if (segments.length === 1) {
      markdown = buildToolMarkdown(segments[0]);
    }
  } else if (normalizedPath === "/youtube-transcript-downloader") {
    markdown = buildTranscriptDownloaderMarkdown();
  } else if (normalizedPath === "/blog") {
    markdown = buildBlogListMarkdown();
  } else if (normalizedPath.startsWith("/blog/category/")) {
    const segments = normalizedPath.replace(/^\/blog\/category\//, "").split("/").filter(Boolean);
    if (segments.length === 1) {
      markdown = buildBlogCategoryMarkdown(segments[0]);
    }
  } else if (normalizedPath.startsWith("/blog/")) {
    const segments = normalizedPath.replace(/^\/blog\//, "").split("/").filter(Boolean);
    if (segments.length === 1) {
      markdown = buildBlogPostMarkdown(segments[0]);
    }
  } else if (normalizedPath === "/resources") {
    markdown = buildResourcesIndexMarkdown();
  } else if (normalizedPath === "/resources/youtube-cpm-rates") {
    markdown = buildCpmRatesMarkdown();
  } else if (normalizedPath.startsWith("/resources/")) {
    markdown = buildResourceGuideMarkdown(normalizedPath);
  } else if (normalizedPath === "/faq") {
    markdown = buildFaqMarkdown();
  } else if (normalizedPath === "/about") {
    markdown = buildAboutMarkdown();
  } else if (normalizedPath === "/pricing") {
    markdown = buildPricingMarkdown();
  } else if (normalizedPath === "/contact") {
    markdown = buildContactMarkdown();
  }

  const baseUrl = siteConfig.url;

  if (!markdown) {
    const notFoundMd = buildNotFoundMarkdown(normalizedPath);
    return new Response(notFoundMd, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Cache-Control": "no-store",
        "X-Markdown-Tokens": String(Math.ceil(notFoundMd.length / 4)),
        "X-Robots-Tag": "noindex",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const estimatedTokens = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Markdown-Tokens": String(estimatedTokens),
      "Content-Signal": "search=yes, ai-input=yes, ai-train=no",
      Link: [
        `<${baseUrl}/llms.txt>; rel="llms-txt"; type="text/plain"`,
        `<${baseUrl}/llms-full.txt>; rel="llms-full-txt"; type="text/plain"`,
        `<${baseUrl}/.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"`,
        `<${baseUrl}/api/ai-context>; rel="describedby"; type="application/json"`,
      ].join(", "),
      "Cache-Control":
        "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
      "X-Robots-Tag": "index, follow, noarchive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
