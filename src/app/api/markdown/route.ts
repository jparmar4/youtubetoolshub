import { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { tools, toolCategories, getToolBySlug } from "@/config/tools";
import { countryCPMData } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED, speakableAnswers, nicheRpmRanking } from "@/lib/seo-data";
import { getBlogPostBySlug, getIndexableBlogPosts } from "@/config/blog";

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

  let cleanContent = post.content
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
Yes. All 44 core creator tools—including the Thumbnail Downloader, Title Generator, Description Generator, Transcript Downloader, and Earnings Calculator—are 100% free with no account or credit card required.

### Do I need to connect or link my YouTube account?
No. Tools operate on public video, channel, or playlist URLs. You never need to grant OAuth permissions, provide API keys, or enter your YouTube credentials.

### How accurate are the YouTube Earnings and CPM Calculators?
Calculations use audited 2026 CPM and RPM empirical data across 52 countries and 15+ niches. AdSense revenue is estimated using YouTube's standard 55/45 creator revenue share split.

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

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path") || "/";
  let normalizedPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  if (normalizedPath.endsWith(".md")) {
    normalizedPath = normalizedPath.slice(0, -3) || "/";
  }

  let markdown: string | null = null;

  if (normalizedPath.startsWith("/tools/")) {
    const slug = normalizedPath.replace(/^\/tools\//, "").split("/")[0];
    if (slug) {
      markdown = buildToolMarkdown(slug);
    }
  } else if (normalizedPath.startsWith("/blog/")) {
    const slug = normalizedPath.replace(/^\/blog\//, "").split("/")[0];
    if (slug) {
      markdown = buildBlogPostMarkdown(slug);
    }
  } else if (normalizedPath === "/blog") {
    markdown = buildBlogListMarkdown();
  } else if (normalizedPath === "/resources/youtube-cpm-rates") {
    markdown = buildCpmRatesMarkdown();
  } else if (normalizedPath === "/faq") {
    markdown = buildFaqMarkdown();
  }

  if (!markdown) {
    markdown = buildHomepageMarkdown();
  }

  const estimatedTokens = Math.ceil(markdown.length / 4);
  const baseUrl = siteConfig.url;

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
