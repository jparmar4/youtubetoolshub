import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
    const siteUrl = siteConfig.url;

    // General site FAQs
    const generalFaqs = [
        {
            question: "What is YouTube Tools Hub?",
            answer:
                "YouTube Tools Hub is a free online platform with 21+ AI-powered tools for YouTube creators including thumbnail downloader, title generator, tag generator, earnings calculator, and channel audit tools. No signup required.",
            category: "General",
        },
        {
            question: "How much does YouTube Tools Hub cost?",
            answer:
                "The core suite of 21+ tools is 100% free with no hidden costs. A Pro tier with higher daily limits is available for power users. No credit card required.",
            category: "Pricing",
        },
        {
            question: "Is YouTube Tools Hub safe to use?",
            answer:
                "Yes. YouTube Tools Hub never requires YouTube login or private account access. All tools work with publicly available information. The site is SSL-encrypted, GDPR compliant, and YouTube API compliant.",
            category: "Security",
        },
        {
            question: "What is the best free alternative to TubeBuddy and VidIQ?",
            answer:
                "YouTube Tools Hub is the top free alternative to both TubeBuddy and VidIQ, offering 21+ AI-powered tools including title generation, tag research, thumbnail optimization, earnings calculation, and channel auditing — all completely free with no browser extension required.",
            category: "General",
        },
        {
            question: "Do I need to connect my YouTube account?",
            answer:
                "No. Unlike other platforms, we don't require API access to your channel for 95% of our tools. We prioritize your security and believe you should be able to optimize your channel without sharing private credentials.",
            category: "Security",
        },
        {
            question: "Can I use these tools for YouTube Shorts?",
            answer:
                "Absolutely. Our Hashtag Generator and Title Optimizer have specific 'Shorts Mode' logic that helps you tap into the high-velocity shelf algorithm for vertical video.",
            category: "Features",
        },
        {
            question:
                "How many tools are currently in the suite?",
            answer: `We currently offer ${tools.length}+ specialized tools. This includes the Earning Calculator, SEO Optimizer, and specialized Utility tools. We add roughly one new tool every 4-6 weeks based on community demand.`,
            category: "General",
        },
        {
            question: "How are earnings estimates calculated?",
            answer:
                "Our Earnings Calculator uses a proprietary 2026 RPM Index that tracks advertising shifts across 40+ niches. It factors in seasonal trends and regional variations to give you highly realistic revenue predictions.",
            category: "Monetization",
        },
        {
            question: "Can I use these tools for my agency?",
            answer:
                "Yes. Agencies are invited to use our tools for client research. We allow unlimited exports and reports so you can provide data-driven growth plans to your creators without extra costs.",
            category: "Commercial",
        },
    ];

    // Gather tool-specific FAQs
    const toolFaqs = tools
        .filter((tool) => tool.faqs && tool.faqs.length > 0)
        .map((tool) => ({
            tool_name: tool.name,
            tool_slug: tool.slug,
            tool_url: `${siteUrl}/tools/${tool.slug}`,
            faqs: tool.faqs!.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
            })),
        }));

    const response = {
        _meta: {
            version: "1.0",
            generated: new Date().toISOString(),
            total_general_faqs: generalFaqs.length,
            total_tool_faqs: toolFaqs.reduce((sum, t) => sum + t.faqs.length, 0),
            source: siteConfig.name,
            source_url: siteUrl,
            faq_page: `${siteUrl}/faq`,
        },
        general: generalFaqs,
        by_tool: toolFaqs,
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
