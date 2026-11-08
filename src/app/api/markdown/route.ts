import { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { tools, toolCategories, getToolBySlug } from "@/config/tools";
import { countryCPMData } from "@/lib/cpm-data";
import { DATA_LAST_REVIEWED, speakableAnswers, nicheRpmRanking } from "@/lib/seo-data";

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

export async function GET(request: NextRequest) {
  const rawPath = request.nextUrl.searchParams.get("path") || "/";
  const normalizedPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

  let markdown: string | null = null;

  if (normalizedPath.startsWith("/tools/")) {
    const slug = normalizedPath.replace(/^\/tools\//, "").split("/")[0];
    if (slug) {
      markdown = buildToolMarkdown(slug);
    }
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
