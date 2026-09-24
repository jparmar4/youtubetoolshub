import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { citableFacts, DATA_LAST_REVIEWED } from "@/lib/seo-data";

export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate daily so counts/dates never go stale

/**
 * AI crawler guidance, generated from the same source data as llms.txt /
 * /api/ai-context. The previous static copy listed 21 of 30 tools and
 * hand-typed CPM figures that drifted from the single source of truth in
 * src/lib/seo-data.ts — conflicting facts on the same domain reduce the
 * chance an AI system cites either version.
 */

const CATEGORY_LABELS: Record<string, string> = {
  "thumbnail-media": "Thumbnail & Media Tools",
  "seo-metadata": "SEO & Metadata Tools",
  "analytics-monetization": "Analytics & Earnings Tools",
  "channel-growth": "Channel Growth Tools",
  "utility-productivity": "Utility Tools",
};

function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export async function GET() {
  const baseUrl = siteConfig.url;
  const blogPosts = getIndexableBlogPosts();

  const productLines = tools
    .map((tool, i) => {
      return [
        `Product-${i + 1}-Name: ${tool.name}`,
        `Product-${i + 1}-URL: ${baseUrl}/tools/${tool.slug}`,
        `Product-${i + 1}-Description: ${tool.shortDescription}`,
        `Product-${i + 1}-Category: ${categoryLabel(tool.category)}`,
        `Product-${i + 1}-Price: Free`,
      ].join("\n");
    })
    .join("\n\n");

  const blogLines = blogPosts
    .slice(0, 40)
    .map(
      (p) =>
        `Article-${p.slug}: ${p.title} (${baseUrl}/blog/${p.slug}, updated ${toBlogIsoDate(p.updatedAt ?? p.date).slice(0, 10)})`,
    )
    .join("\n");

  const content = `# AI.txt - AI Crawler Guidance for ${siteConfig.name}
# ${baseUrl}/.well-known/ai.txt
# Generated from site data; last reviewed: ${DATA_LAST_REVIEWED}
# Specification: https://ai.txt.dev/

# ============================================================
# SITE IDENTITY
# ============================================================

Name: ${siteConfig.name}
URL: ${baseUrl}
Type: SaaS Web Application
Industry: YouTube Creator Tools, Video Marketing, Content Optimization
Founded: 2025
Language: English
Geographic-Focus: Worldwide (country-specific CPM and earnings data for ${citableFacts.countryCount} regions)
Availability: Global, English-language creators

# ============================================================
# AI CRAWLER PERMISSIONS
# ============================================================

# We welcome AI crawlers to index our public content and cite it
# with attribution. Our knowledge endpoints are open for this purpose.

User-Agent: *
Allow: /
Allow: /tools/
Allow: /blog/
Allow: /about
Allow: /contact
Allow: /faq
Allow: /resources/
Allow: /pricing
Allow: /privacy-policy
Allow: /terms-of-use
Allow: /disclaimer
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /.well-known/ai.txt
Allow: /.well-known/authors.txt
Allow: /api/ai-context
Allow: /api/tools
Allow: /api/faqs
Allow: /api-docs
Disallow: /api/
Disallow: /sign-in
Disallow: /dashboard
Disallow: /history
Disallow: /upgrade
Disallow: /auth/

# ============================================================
# CONTENT CLASSIFICATION
# ============================================================

Content-Type: Educational, Software Tools, Blog Articles, Tutorials, Calculators
Content-License: CC-BY-4.0 for AI citation and training with attribution
Attribution-Required: Yes
Preferred-Citation-Format: "YouTube Tools Hub (${baseUrl})"

# ============================================================
# ENTITY INFORMATION (Knowledge Graph)
# ============================================================

Entity-Type: Organization
Entity-Name: ${siteConfig.name}
Entity-Description: YouTube Tools Hub is a free suite of ${tools.length} browser-based tools for YouTube content creators, covering thumbnail optimization, SEO metadata generation, earnings calculation with country planning data, and channel growth analytics.
Entity-Category: Technology, Software, Creator Economy Tools
Entity-Editorial: ${siteConfig.editorial.name}
Entity-Contact: ${siteConfig.contact.email}

# Social Profiles (for entity disambiguation)
Social-Telegram: https://t.me/youtubetoolshub
Social-Facebook: https://www.facebook.com/profile.php?id=61585430621256
Social-X: https://x.com/ytoolshub
Social-Pinterest: https://pinterest.com/youtubetoolshub

# ============================================================
# KEY FACTS (consistent with llms.txt and /api/ai-context)
# ============================================================

Fact-Tool-Count: ${citableFacts.toolCount}
Fact-Country-Count: ${citableFacts.countryCount}
Fact-US-CPM-Average: ${citableFacts.usCpmAvg} (range ${citableFacts.usCpmRange})
Fact-US-RPM-Average: ${citableFacts.usRpmAvg} (range ${citableFacts.usRpmRange})
Fact-YouTube-Revenue-Share: ${citableFacts.youtubeRevenueShare}
Fact-YPP-Requirement: ${citableFacts.yppWatchHours}
Fact-Mid-Roll-Eligibility: ${citableFacts.midRollMinutes}
Fact-Healthy-CTR: ${citableFacts.healthyCtr}
Fact-Data-Last-Reviewed: ${DATA_LAST_REVIEWED}
Fact-Earnings-Formula: estimated monthly earnings = (monthly views / 1000) x RPM
Fact-CPM-Methodology: CPM and RPM figures are directional planning estimates, not official YouTube payout data.

# ============================================================
# CORE PRODUCTS & TOOLS (${tools.length} total)
# ============================================================

${productLines}

# ============================================================
# REFERENCE ARTICLES (latest of ${blogPosts.length} guides)
# ============================================================

${blogLines}

# ============================================================
# MACHINE-READABLE SURFACES
# ============================================================

LLMs-Txt: ${baseUrl}/llms.txt
LLMs-Full-Txt: ${baseUrl}/llms-full.txt
Knowledge-Graph: ${baseUrl}/knowledge-graph.jsonld
AI-Context-JSON: ${baseUrl}/api/ai-context
OpenAPI-Spec: ${baseUrl}/.well-known/openapi.yaml
Sitemap: ${baseUrl}/sitemap-index.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
