import { NextResponse } from "next/server";
import crypto from "crypto";
import { submitToIndexNow } from "@/lib/indexnow";
import { siteConfig } from "@/config/site";
import { getIndexableBlogPosts } from "@/config/blog";
import { tools } from "@/config/tools";
import { countryCPMData, isCountryEarningsIndexable } from "@/lib/cpm-data";
import { US_STATE_CREATOR_TAXES } from "@/data/usStateCreatorTaxes";
import { COMPETITOR_ALTERNATIVES } from "@/data/competitorAlternatives";
import { INDEX_US_STATE_TAX_PAGES } from "@/config/index-policy";
import { enforceRateLimit, getRequestIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function extractProvidedSecret(request: Request): string | null {
  const headerSecret = request.headers.get("x-indexnow-secret");
  if (headerSecret) return headerSecret;
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }
  return null;
}

function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function buildUrlCatalog(scope: "all" | "new-tiers"): {
  urls: string[];
  breakdown: Record<string, number>;
} {
  const baseUrl = siteConfig.url;

  const stateTaxPages = [
    `${baseUrl}/tools/creator-tax-calculator`,
    ...(INDEX_US_STATE_TAX_PAGES
      ? US_STATE_CREATOR_TAXES.map(
          (state) => `${baseUrl}/tools/creator-tax-calculator/${state.slug}`,
        )
      : []),
  ];

  const alternativePages = [
    `${baseUrl}/alternatives`,
    ...COMPETITOR_ALTERNATIVES.map((alt) => `${baseUrl}/alternatives/${alt.slug}`),
  ];

  const researchAndFlagshipPages = [
    `${baseUrl}/research/youtube-cpm-rpm-report-2026`,
    `${baseUrl}/tools/youtube-loudness-checker`,
    `${baseUrl}/tools/shorts-series-planner`,
    `${baseUrl}/tools/creator-partnership-boost-calculator`,
  ];

  if (scope === "new-tiers") {
    const urls = [...new Set([...stateTaxPages, ...alternativePages, ...researchAndFlagshipPages])];
    return {
      urls,
      breakdown: {
        stateTaxPages: stateTaxPages.length,
        alternativePages: alternativePages.length,
        researchAndFlagshipPages: researchAndFlagshipPages.length,
      },
    };
  }

  const corePages = [
    "",
    "/tools",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/pricing",
    "/resources/youtube-creator-statistics",
    "/resources/youtube-cpm-rates",
    "/resources/youtube-algorithm-guide",
    "/resources/youtube-monetization-guide",
    "/resources/link-to-us",
    "/research/youtube-cpm-rpm-report-2026",
    "/tools/youtube-earnings-calculator",
    "/tools/youtube-transcript-downloader",
    "/privacy-policy",
    "/terms-of-use",
    "/disclaimer",
    "/refund-policy",
  ].map((page) => `${baseUrl}${page}`);

  const categoryPages = [
    "/tools/thumbnail-tools",
    "/tools/seo-tools",
    "/tools/analytics-tools",
    "/tools/channel-tools",
    "/tools/utility-tools",
  ].map((page) => `${baseUrl}${page}`);

  const toolPages = tools.map((tool) => `${baseUrl}/tools/${tool.slug}`);
  const countryPages = countryCPMData
    .filter((country) => isCountryEarningsIndexable(country.code))
    .map((country) => `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`);
  const posts = getIndexableBlogPosts().map((post) => `${baseUrl}/blog/${post.slug}`);

  const uniqueUrls = [
    ...new Set([
      ...corePages,
      ...categoryPages,
      ...toolPages,
      ...countryPages,
      ...stateTaxPages,
      ...alternativePages,
      ...posts,
    ]),
  ];

  return {
    urls: uniqueUrls,
    breakdown: {
      corePages: corePages.length,
      categoryPages: categoryPages.length,
      toolPages: toolPages.length,
      countryPages: countryPages.length,
      stateTaxPages: stateTaxPages.length,
      alternativePages: alternativePages.length,
      blogPosts: posts.length,
    },
  };
}

async function handleIndexNowRequest(request: Request, explicitUrls?: string[], scopeParam?: string | null) {
  const ip = getRequestIp(request.headers);
  const rl = enforceRateLimit(`indexnow-admin:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const secret = extractProvidedSecret(request);
  const expected = process.env.INDEXNOW_SECRET || process.env.INDEXNOW_ADMIN_SECRET;
  if (!expected || !secretMatches(secret, expected)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const scope: "all" | "new-tiers" = scopeParam === "new-tiers" ? "new-tiers" : "all";
    let uniqueUrls: string[];
    let breakdown: Record<string, number>;

    if (explicitUrls && explicitUrls.length > 0) {
      const originPrefix = `${siteConfig.url}/`;
      uniqueUrls = [
        ...new Set(
          explicitUrls
            .map((u) => u.trim())
            .filter((u) => u === siteConfig.url || u.startsWith(originPrefix)),
        ),
      ];
      if (uniqueUrls.length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid URLs matching site origin provided." },
          { status: 400 },
        );
      }
      breakdown = { customUrls: uniqueUrls.length };
    } else {
      const catalog = buildUrlCatalog(scope);
      uniqueUrls = catalog.urls;
      breakdown = catalog.breakdown;
    }

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
        scope: explicitUrls?.length ? "custom" : scope,
        message: `All ${totalSubmitted} URLs submitted successfully to IndexNow`,
        totalUrls: uniqueUrls.length,
        totalSubmitted,
        breakdown,
        batches: results,
        submittedAt: new Date().toISOString(),
      });
    }

    const failedBatches = results.filter((r) => !r.success);
    return NextResponse.json(
      {
        success: false,
        scope: explicitUrls?.length ? "custom" : scope,
        message: `Some batches failed. ${totalSubmitted}/${uniqueUrls.length} URLs submitted.`,
        totalUrls: uniqueUrls.length,
        totalSubmitted,
        breakdown,
        batches: results,
        failedBatches,
        submittedAt: new Date().toISOString(),
      },
      { status: 207 },
    );
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return handleIndexNowRequest(request, undefined, searchParams.get("scope"));
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  let body: { urls?: unknown; scope?: unknown } = {};
  try {
    body = (await request.json()) as { urls?: unknown; scope?: unknown };
  } catch {
    body = {};
  }

  const explicitUrls = Array.isArray(body.urls)
    ? body.urls.filter((item): item is string => typeof item === "string")
    : undefined;
  const scope =
    typeof body.scope === "string" ? body.scope : searchParams.get("scope");

  return handleIndexNowRequest(request, explicitUrls, scope);
}
