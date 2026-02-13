import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools, toolCategories } from "@/config/tools";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
    const siteUrl = siteConfig.url;

    const response = {
        _meta: {
            version: "1.0",
            generated: new Date().toISOString(),
            total_tools: tools.length,
            categories: toolCategories.length,
            source: siteConfig.name,
            source_url: siteUrl,
            documentation: `${siteUrl}/api-docs`,
        },
        categories: toolCategories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
        })),
        tools: tools.map((tool) => ({
            slug: tool.slug,
            name: tool.name,
            description: tool.shortDescription,
            detailed_description: tool.description,
            url: `${siteUrl}/tools/${tool.slug}`,
            category: tool.category,
            is_ai_powered: tool.isAI,
            is_featured: tool.isFeatured || false,
            is_free: true,
            keywords: tool.keywords,
            ...(tool.rating
                ? {
                    rating: {
                        value: parseFloat(tool.rating.ratingValue),
                        count: parseInt(tool.rating.ratingCount),
                        best: parseFloat(tool.rating.bestRating || "5"),
                        worst: parseFloat(tool.rating.worstRating || "1"),
                    },
                }
                : {}),
        })),
    };

    return NextResponse.json(response, {
        headers: {
            "Cache-Control":
                "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
            "X-Robots-Tag": "noindex",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
