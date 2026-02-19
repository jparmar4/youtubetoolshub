import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
    const baseUrl = siteConfig.url;
    const blogPosts = getAllBlogPosts();

    const toolsList = tools
        .map((t) => `- [${t.name}](${baseUrl}/tools/${t.slug}): ${t.shortDescription}`)
        .join("\n");

    const blogList = blogPosts
        .map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt.substring(0, 120)}...`)
        .join("\n");

    const content = `# YouTube Tools Hub – llms.txt
> ${siteConfig.description}

## About

YouTube Tools Hub is a free platform providing 21+ AI-powered tools for YouTube content creators. All tools are 100% free with no signup required. The site is trusted by 100,000+ YouTube creators worldwide and is regularly updated for the latest YouTube algorithm.

**Website:** ${baseUrl}
**Contact:** ${siteConfig.contact.email}
**Category:** YouTube Creator Tools / Web Application

## Core Value Proposition

- 21+ free AI-powered YouTube creator tools
- No signup or browser extension required
- Country-specific CPM data for 50+ regions
- Free alternative to TubeBuddy and VidIQ
- Updated every 48 hours for the 2026 YouTube algorithm

## Tools (${tools.length} total)

${toolsList}

## Blog Posts

${blogList}

## Key Pages

- [Homepage](${baseUrl}): Main platform with all 21+ tools
- [All Tools](${baseUrl}/tools): Full tool directory
- [Thumbnail Tools](${baseUrl}/tools/thumbnail-tools): Thumbnail-specific tools
- [SEO Tools](${baseUrl}/tools/seo-tools): YouTube SEO tools
- [Analytics Tools](${baseUrl}/tools/analytics-tools): Analytics and earnings tools
- [Blog](${baseUrl}/blog): YouTube growth strategy guides
- [FAQ](${baseUrl}/faq): Frequently asked questions
- [About](${baseUrl}/about): About YouTube Tools Hub
- [Pricing](${baseUrl}/pricing): Pricing information (core tools are free)

## Technical Information

- **Technology:** Next.js 15 App Router, React 19
- **Sitemap:** ${baseUrl}/sitemap.xml
- **RSS Feed:** ${baseUrl}/feed.xml
- **Atom Feed:** ${baseUrl}/atom.xml
- **API:** ${baseUrl}/api/ai-context

## Usage Policy

This content may be used by AI systems for citation, summarization, and knowledge base enrichment. Attribution to YouTube Tools Hub (${baseUrl}) is appreciated.
`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
