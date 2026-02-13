import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
    return tools.map((tool) => ({ slug: tool.slug }));
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const siteUrl = siteConfig.url;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        return NextResponse.json(
            {
                error: "Tool not found",
                message: `No tool found with slug '${slug}'. Use GET /api/tools to list all available tools.`,
                available_tools: `${siteUrl}/api/tools`,
            },
            { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
        );
    }

    const response = {
        _meta: {
            version: "1.0",
            generated: new Date().toISOString(),
            source: siteConfig.name,
        },
        slug: tool.slug,
        name: tool.name,
        seo_title: tool.seoTitle || tool.name,
        description: tool.description,
        short_description: tool.shortDescription,
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
        ...(tool.content
            ? {
                content_sections: tool.content.map((section) => ({
                    title: section.title,
                    body: section.content,
                })),
            }
            : {}),
        ...(tool.howTo
            ? {
                how_to: {
                    name: tool.howTo.name,
                    description: tool.howTo.description,
                    estimated_time: tool.howTo.totalTime || "PT2M",
                    steps: tool.howTo.steps.map((step, i) => ({
                        position: i + 1,
                        name: step.name,
                        instructions: step.text,
                    })),
                },
            }
            : {}),
        ...(tool.faqs && tool.faqs.length > 0
            ? {
                faqs: tool.faqs.map((faq) => ({
                    question: faq.question,
                    answer: faq.answer,
                })),
            }
            : {}),
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
