import { tools } from "@/config/tools";
import { getIndexableBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { countryCPMData, TIERS } from "@/lib/cpm-data";
import {
    INDEX_TIER2_COUNTRY_PAGES,
    INDEX_US_STATE_TAX_PAGES,
} from "@/config/index-policy";
import { US_STATE_CREATOR_TAXES } from "@/data/usStateCreatorTaxes";
import { COMPETITOR_ALTERNATIVES } from "@/data/competitorAlternatives";

export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate every 24 hours

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildImageUrlEntry(pageUrl: string, imageUrl: string, title: string, caption?: string): string {
    return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>${caption ? `\n      <image:caption>${escapeXml(caption)}</image:caption>` : ""}
    </image:image>
  </url>`;
}

export async function GET() {
    const baseUrl = siteConfig.url;
    const blogPosts = getIndexableBlogPosts();

    const entries: string[] = [];

    // Blog post cover images
    for (const post of blogPosts) {
        if (post.coverImage) {
            const coverTitle = escapeXml(post.title);
            const coverCaption = escapeXml(post.imageAlt || post.metaDescription);
            const pinTitle = escapeXml(`${post.title} Pinterest guide`);
            const pinCaption = escapeXml(post.pinterestImageAlt || post.metaDescription);
            entries.push(`  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${baseUrl}${post.coverImage}</image:loc>
      <image:title>${coverTitle}</image:title>
      <image:caption>${coverCaption}</image:caption>
    </image:image>
${post.pinterestImage ? `    <image:image>
      <image:loc>${baseUrl}${post.pinterestImage}</image:loc>
      <image:title>${pinTitle}</image:title>
      <image:caption>${pinCaption}</image:caption>
    </image:image>
` : ""}  </url>`);
        }
    }

    // Flagship research & resource pillars
    const resourcePillars = [
        {
            path: "/research/youtube-cpm-rpm-report-2026",
            title: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
            caption: "Tier-1 vs Tier-2/3 CPM/RPM dataset across 52 countries and Top 12 niches.",
        },
        {
            path: "/resources/youtube-cpm-rates",
            title: "YouTube CPM & RPM Rates by Country (2026)",
            caption: "Complete 2026 CPM and RPM planning table across 52 global creator markets.",
        },
        {
            path: "/resources/youtube-monetization-guide",
            title: "YouTube Monetization Guide 2026",
            caption: "YPP requirements, 8 revenue streams, and CPM vs RPM strategies.",
        },
        {
            path: "/resources/youtube-algorithm-guide",
            title: "YouTube Algorithm Guide 2026",
            caption: "How the YouTube algorithm ranks and recommends videos across Home, Search, and Suggested.",
        },
        {
            path: "/resources/youtube-creator-statistics",
            title: "YouTube Creator Statistics 2026",
            caption: "Niche RPM benchmarks and creator milestone data for 2026.",
        },
    ];
    for (const pillar of resourcePillars) {
        entries.push(
            buildImageUrlEntry(
                `${baseUrl}${pillar.path}`,
                `${baseUrl}${pillar.path}/opengraph-image`,
                pillar.title,
                pillar.caption,
            ),
        );
    }

    // Tool pages with unique OG images (do not repeat the same og-image.png)
    for (const tool of tools) {
        const imageUrl =
            tool.slug === "youtube-transcript-downloader"
                ? `${baseUrl}/images/blog/youtube-transcript-downloader-keyword-extractor-hero.webp`
                : `${baseUrl}/tools/${tool.slug}/opengraph-image`;
        entries.push(
            buildImageUrlEntry(
                `${baseUrl}/tools/${tool.slug}`,
                imageUrl,
                tool.name,
            ),
        );
    }

    // Country Earnings Calculator OG cards — mirror sitemap.ts index policy
    // so Google never receives "Submitted URL marked 'noindex'" errors.
    for (const country of countryCPMData) {
        const isTier1 = TIERS.TIER1.countries.includes(country.code);
        if (!isTier1 && !INDEX_TIER2_COUNTRY_PAGES) continue;
        entries.push(
            buildImageUrlEntry(
                `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`,
                `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}/opengraph-image`,
                `YouTube Earnings Calculator ${country.name} (${country.code})`,
                `2026 YouTube CPM & RPM rates for ${country.name} (${country.currency}).`,
            ),
        );
    }

    // US State Creator Tax OG cards — gated by index policy
    if (INDEX_US_STATE_TAX_PAGES) {
        for (const state of US_STATE_CREATOR_TAXES) {
            entries.push(
                buildImageUrlEntry(
                    `${baseUrl}/tools/creator-tax-calculator/${state.slug}`,
                    `${baseUrl}/tools/creator-tax-calculator/${state.slug}/opengraph-image`,
                    `${state.stateName} YouTube Creator Tax & S-Corp Calculator`,
                    `2026 Federal SE tax, ${state.stateName} income tax, LLC fees & S-Corp savings.`,
                ),
            );
        }
    }

    // Competitor alternative OG cards
    for (const alt of COMPETITOR_ALTERNATIVES) {
        entries.push(
            buildImageUrlEntry(
                `${baseUrl}/alternatives/${alt.slug}`,
                `${baseUrl}/alternatives/${alt.slug}/opengraph-image`,
                `Best Free ${alt.competitorName} Alternative (2026)`,
                alt.metaDescription,
            ),
        );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
