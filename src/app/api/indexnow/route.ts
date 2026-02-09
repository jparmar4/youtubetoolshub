import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import { tools } from "@/config/tools";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const baseUrl = siteConfig.url;
    const urls: string[] = [];

    // ─── 1. Core Pages (highest priority) ───
    const corePages = [
      "",
      "/tools",
      "/blog",
      "/about",
      "/contact",
      "/faq",
      "/pricing",
      "/resources/youtube-creator-statistics",
      "/resources/link-to-us",
      "/privacy-policy",
      "/terms-of-use",
      "/disclaimer",
      "/refund-policy",
    ];

    corePages.forEach((page) => {
      urls.push(`${baseUrl}${page}`);
    });

    // ─── 2. Tool Category Pages ───
    const categoryPages = [
      "/tools/thumbnail-tools",
      "/tools/seo-tools",
      "/tools/analytics-tools",
      "/tools/channel-tools",
      "/tools/utility-tools",
    ];

    categoryPages.forEach((page) => {
      urls.push(`${baseUrl}${page}`);
    });

    // ─── 3. Comparison / vs Pages ───
    const vsPages = ["/tools/vs/tubebuddy", "/tools/vs/vidiq"];

    vsPages.forEach((page) => {
      urls.push(`${baseUrl}${page}`);
    });

    // ─── 4. All Individual Tool Pages ───
    tools.forEach((tool) => {
      urls.push(`${baseUrl}/tools/${tool.slug}`);
    });

    // ─── 5. Programmatic Niche Tool Pages ───
    programmaticTools.forEach((toolSlug) => {
      niches.forEach((niche) => {
        urls.push(`${baseUrl}/tools/${toolSlug}/${niche.id}`);
      });
    });

    // ─── 6. Country-Specific Earnings Calculator Pages ───
    countryCPMData.forEach((country) => {
      urls.push(`${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`);
    });

    // ─── 7. Blog Posts (all, sorted by most recent first) ───
    const posts = getAllBlogPosts();
    posts.forEach((post) => {
      urls.push(`${baseUrl}/blog/${post.slug}`);
    });

    // ─── 8. AI Discovery & SEO Files ───
    const discoveryFiles = [
      "/llms.txt",
      "/llms-full.txt",
      "/sitemap.xml",
      "/sitemap_index.xml",
      "/feed.xml",
    ];

    discoveryFiles.forEach((file) => {
      urls.push(`${baseUrl}${file}`);
    });

    // ─── 9. Deduplicate URLs (safety measure) ───
    const uniqueUrls = [...new Set(urls)];

    // ─── 10. Submit in batches of 10,000 (IndexNow limit) ───
    const batchSize = 10000;
    const results: {
      batch: number;
      count: number;
      success: boolean;
      message?: string;
    }[] = [];
    let totalSubmitted = 0;

    for (let i = 0; i < uniqueUrls.length; i += batchSize) {
      const batch = uniqueUrls.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      const result = await submitToIndexNow({ urls: batch });

      results.push({
        batch: batchNumber,
        count: batch.length,
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        totalSubmitted += batch.length;
      }
    }

    const allSucceeded = results.every((r) => r.success);

    if (allSucceeded) {
      return NextResponse.json({
        success: true,
        message: `All ${totalSubmitted} URLs submitted successfully to IndexNow`,
        totalUrls: uniqueUrls.length,
        totalSubmitted,
        breakdown: {
          corePages: corePages.length,
          categoryPages: categoryPages.length,
          vsPages: vsPages.length,
          toolPages: tools.length,
          programmaticPages: programmaticTools.length * niches.length,
          countryPages: countryCPMData.length,
          blogPosts: posts.length,
          discoveryFiles: discoveryFiles.length,
        },
        batches: results,
        submittedAt: new Date().toISOString(),
      });
    } else {
      const failedBatches = results.filter((r) => !r.success);
      return NextResponse.json(
        {
          success: false,
          message: `Some batches failed. ${totalSubmitted}/${uniqueUrls.length} URLs submitted.`,
          totalUrls: uniqueUrls.length,
          totalSubmitted,
          batches: results,
          failedBatches,
          submittedAt: new Date().toISOString(),
        },
        { status: 207 },
      );
    }
  } catch (error) {
    console.error("API IndexNow Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
