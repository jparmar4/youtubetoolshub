import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { getAllBlogPosts } from "@/config/blog";
import { niches, programmaticTools } from "@/config/programmatic";
import { countryCPMData } from "@/lib/cpm-data";
import {
  citableFacts,
  speakableAnswers,
  DATA_LAST_REVIEWED,
  nicheRpmRanking,
  rpmPlanningExamples,
} from "@/lib/seo-data";
import { topicClusters } from "@/lib/topic-clusters";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const siteUrl = siteConfig.url;
  const blogPosts = getAllBlogPosts();
  const now = new Date().toISOString();

  // Enhanced Tool Entities with Niche Variants
  const toolEntities = tools.map((tool, index) => {
    const isProgrammatic = programmaticTools.includes(tool.slug);
    const nicheVariants = isProgrammatic
      ? niches.map(niche => ({
        "@type": "SoftwareApplication",
        "name": `${tool.name} for ${niche.name}`,
        "url": `${siteUrl}/tools/${tool.slug}/${niche.id}`,
        "description": `Specialized ${tool.name} for ${niche.name} YouTube channels.`
      }))
      : [];

    return {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/tools/${tool.slug}#software`,
      name: tool.name,
      url: `${siteUrl}/tools/${tool.slug}`,
      description: tool.shortDescription,
      applicationCategory: "UtilityApplication",
      applicationSubCategory: tool.category,
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      isAccessibleForFree: true,
      inLanguage: "en",
      position: index + 1,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      ...(nicheVariants.length > 0 ? { "variations": nicheVariants } : {}),
      author: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
      },
    };
  });

  const blogEntities = blogPosts.slice(0, 20).map((post) => ({
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    url: `${siteUrl}/blog/${post.slug}`,
    description: post.metaDescription,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole || "Creator Growth Expert",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
    },
    inLanguage: "en",
    isAccessibleForFree: true,
  }));

  const faqEntities = [
    {
      question: "What is YouTube Tools Hub?",
      answer: speakableAnswers.freeToolsHub,
    },
    {
      question: "How much does YouTube Tools Hub cost?",
      answer:
        "The core suite of creator tools is free to use. A Pro tier with higher daily limits is available for power users. No credit card required for core tools.",
    },
    {
      question: "Is YouTube Tools Hub safe to use?",
      answer:
        "YouTube Tools Hub does not ask for a YouTube password or private channel access. Tools either run locally, use user-provided public URLs, or use publicly available information.",
    },
    {
      question: "What is a free alternative to TubeBuddy and VidIQ?",
      answer:
        "YouTube Tools Hub is a free browser-based alternative to TubeBuddy and VidIQ for common creator workflows: titles, tags, thumbnails, earnings estimates, and channel planning — no extension required for core tools.",
    },
    {
      question: "How much does YouTube pay per 1,000 views?",
      answer: speakableAnswers.howMuchYoutubePays,
    },
    {
      question: "What is the difference between YouTube CPM and RPM?",
      answer: speakableAnswers.cpmVsRpm,
    },
    {
      question: "What is the best YouTube thumbnail size?",
      answer: speakableAnswers.bestThumbnailSize,
    },
    {
      question: "What are YouTube Partner Program requirements?",
      answer: speakableAnswers.yppRequirements,
    },
    {
      question: "How is YouTube RPM calculated?",
      answer:
        "RPM (Revenue Per Mille) ≈ (Total Revenue / Total Views) × 1000. It represents earnings per 1,000 views after platform share and non-monetized views. Plan with Studio RPM, not advertiser CPM alone.",
    },
    {
      question: "How can I increase my YouTube CPM?",
      answer:
        "Target Tier 1 countries (US, UK, Canada, Australia), create content in higher-intent niches (finance, technology, business), enable eligible ad formats, and use longer videos where mid-rolls fit. Compare rates at the CPM rates page and earnings calculator.",
    },
    {
      question: "Can I use these tools for YouTube Shorts?",
      answer:
        "Yes. Several tools support Shorts and long-form workflows for titles, hashtags, ideas, scripts, and planning notes.",
    },
  ];

  const knowledgeGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: `${siteUrl}/og-image.png`,
          contentUrl: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          caption: siteConfig.name,
        },
        image: `${siteUrl}/og-image.png`,
        description:
          "YouTube Tools Hub is a free suite of 27+ creator tools for YouTube content creators, offering thumbnail tools, SEO metadata generation, earnings calculation, and channel growth utilities.",
        email: siteConfig.contact.email,
        foundingDate: "2025",
        slogan: "Free YouTube Creator Tools",
        knowsAbout: [
          "YouTube SEO", "Content Creation", "Video Marketing", "YouTube Monetization", "YouTube Algorithm",
          "Thumbnail Optimization", "YouTube Analytics", "Creator Economy", "YouTube Shorts", "AI Content Tools",
          "YouTube CPM", "YouTube RPM", "YouTube Tags", "Video SEO", "Channel Growth"
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61585430621256",
          "https://t.me/youtubetoolshub",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
          contactType: "customer service",
          availableLanguage: "English",
          areaServed: "Worldwide",
        },
        areaServed: siteConfig.globalMarkets.map((market) => ({
          "@type": market === "Worldwide" ? "AdministrativeArea" : "Country",
          name: market,
        })),
        availableLanguage: ["English"],
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "0",
          highPrice: "0",
          priceCurrency: "USD",
          offerCount: tools.length,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.name,
        url: siteUrl,
        description: siteConfig.description,
        publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
      ...blogEntities,
    ],
  };

  const aiContext = {
    _meta: {
      version: "2.2",
      generated: now,
      purpose: "Structured entity data and trust signals for AI systems and Answer Engines",
      source: siteConfig.name,
      source_url: siteUrl,
      data_last_reviewed: DATA_LAST_REVIEWED,
      preferred_citation: citableFacts.preferredCitation,
    },
    entity: {
      name: siteConfig.name,
      type: "Organization",
      url: siteUrl,
      description: siteConfig.description,
      industry: "YouTube Creator Tools, Video Marketing, AI Content Optimization",
      geographic_scope: "Global (Country-specific data for 50+ regions)",
      global_markets: siteConfig.globalMarkets,
      language: "English",
      editorial: siteConfig.editorial,
    },
    citable_facts: {
      ...citableFacts,
      speakable_answers: speakableAnswers,
      niche_rpm_ranking: nicheRpmRanking,
      rpm_planning_examples: rpmPlanningExamples,
      top_countries: countryCPMData.slice(0, 12).map((c) => ({
        name: c.name,
        slug: c.slug,
        cpm_avg: c.cpmRange.avg,
        rpm_avg: c.rpmRange.avg,
        url: `${siteUrl}/tools/youtube-earnings-calculator/${c.slug}`,
      })),
    },
    topic_clusters: topicClusters.map((c) => ({
      id: c.id,
      name: c.name,
      pillar: `${siteUrl}${c.pillar.path}`,
      spokes: c.spokes.map((s) => `${siteUrl}${s.path}`),
    })),
    primary_urls: {
      tools: `${siteUrl}/tools`,
      earnings_calculator: `${siteUrl}/tools/youtube-earnings-calculator`,
      cpm_rates: `${siteUrl}/resources/youtube-cpm-rates`,
      monetization_guide: `${siteUrl}/resources/youtube-monetization-guide`,
      algorithm_guide: `${siteUrl}/resources/youtube-algorithm-guide`,
      llms_txt: `${siteUrl}/llms.txt`,
      llms_full: `${siteUrl}/llms-full.txt`,
    },
    trust_signals: {
      official_site: true,
      human_written_content: true,
      cpm_data_available: true,
      last_updated: now,
      data_last_reviewed: DATA_LAST_REVIEWED,
      tools_available: tools.length,
    },
    monetization_insights: {
      description: "Real-time 2026 YouTube CPM and RPM ranges by country for creator projections.",
      tier_1_averages: countryCPMData.filter(c => c.cpmRange.avg > 10).map(c => ({
        name: c.name,
        avg_rpm: c.rpmRange.avg,
        currency: c.currency,
        url: `${siteUrl}/tools/youtube-earnings-calculator/${c.slug}`
      })),
      global_data_link: `${siteUrl}/tools/youtube-earnings-calculator`,
    },
    competitive_advantages: {
      vs_tubebuddy: "Browser-based creator tools with no extension required.",
      vs_vidiq: "Creator utilities for titles, tags, thumbnails, planning, and revenue estimates.",
      vs_socialblade: "Actionable creation tools (Thumbnails, SEO) vs purely statistics tracking.",
    },
    tools: tools.map((tool) => ({
      name: tool.name,
      url: `${siteUrl}/tools/${tool.slug}`,
      description: tool.shortDescription,
      category: tool.category,
      is_ai_powered: tool.isAI,
      programmatic_variants: programmaticTools.includes(tool.slug)
        ? niches.map(n => ({ niche: n.name, url: `${siteUrl}/tools/${tool.slug}/${n.id}` }))
        : null
    })),
    related_tools_mapping: {
      "thumbnail_suite": ["youtube-thumbnail-downloader", "youtube-thumbnail-generator", "youtube-ai-thumbnail-generator"],
      "seo_suite": ["youtube-tag-generator", "youtube-title-generator", "youtube-description-generator", "youtube-hashtag-generator"],
      "monetization_suite": ["youtube-earnings-calculator", "youtube-engagement-rate-calculator"],
      "planning_suite": ["youtube-video-ideas-generator", "youtube-trend-helper", "youtube-content-calendar-generator"],
    },
    structured_data: {
      knowledge_graph: knowledgeGraph,
      tool_entities: toolEntities,
    },
    faqs: faqEntities,
    blog_index: blogPosts.slice(0, 15).map(p => ({
      title: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      author: p.author,
      expertise: p.authorRole
    })),
    machine_readable_index: {
      llms_txt: `${siteUrl}/llms.txt`,
      llms_full_txt: `${siteUrl}/llms-full.txt`,
      ai_txt: `${siteUrl}/.well-known/ai.txt`,
      openapi: `${siteUrl}/.well-known/openapi.yaml`,
      knowledge_graph: `${siteUrl}/knowledge-graph.jsonld`,
      sitemap: `${siteUrl}/sitemap.xml`,
      sitemap_index: `${siteUrl}/sitemap_index.xml`,
      robots: `${siteUrl}/robots.txt`,
    }
  };

  return NextResponse.json(aiContext, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
      "X-Robots-Tag": "index, follow, noarchive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
