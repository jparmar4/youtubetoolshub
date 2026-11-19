import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import {
  BLOG_CATEGORIES,
  getPostsForCategory,
} from "@/config/blog/categories";
import { glossaryTerms } from "@/config/glossary";
import { countryCPMData } from "@/lib/cpm-data";
import {
  citableFacts,
  speakableAnswers,
  DATA_LAST_REVIEWED,
  nicheRpmRanking,
  rpmPlanningExamples,
} from "@/lib/seo-data";
import { topicClusters } from "@/lib/topic-clusters";
import { US_STATE_CREATOR_TAXES, calculateCreatorStateTaxSummary } from "@/data/usStateCreatorTaxes";
import { COMPETITOR_ALTERNATIVES } from "@/data/competitorAlternatives";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const siteUrl = siteConfig.url;
  const blogPosts = getIndexableBlogPosts();
  const now = new Date().toISOString();

  const toolEntities = tools.map((tool, index) => {
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
      author: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.name,
      },
    };
  });

  const blogEntities = blogPosts.map((post) => ({
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}#article`,
    headline: post.title,
    url: `${siteUrl}/blog/${post.slug}`,
    description: post.metaDescription,
    datePublished: toBlogIsoDate(post.date),
    ...(post.updatedAt ? { dateModified: toBlogIsoDate(post.updatedAt) } : {}),
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
    {
      question: "When should a YouTuber elect S-Corp status and what expenses are tax-deductible?",
      answer: speakableAnswers.creatorTaxAndSCorpRule,
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
          `YouTube Tools Hub is a free suite of ${tools.length} creator tools for YouTube content creators, offering thumbnail tools, SEO metadata generation, earnings calculation, and channel growth utilities.`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.streetAddress,
          addressLocality: siteConfig.contact.address.addressLocality,
          addressRegion: siteConfig.contact.address.addressRegion,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: siteConfig.contact.address.addressCountry,
        },
        foundingDate: "2025",
        slogan: "Free YouTube Creator Tools",
        knowsAbout: [
          "YouTube SEO", "Content Creation", "Video Marketing", "YouTube Monetization", "YouTube Algorithm",
          "Thumbnail Optimization", "YouTube Analytics", "Creator Economy", "YouTube Shorts", "AI Content Tools",
          "YouTube CPM", "YouTube RPM", "YouTube Tags", "Video SEO", "Channel Growth"
        ],
        sameAs: siteConfig.footerLinks.social.map((s) => s.href),
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
        telephone: siteConfig.contact.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.streetAddress,
          addressLocality: siteConfig.contact.address.addressLocality,
          addressRegion: siteConfig.contact.address.addressRegion,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: siteConfig.contact.address.addressCountry,
        },
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
      version: "2.3",
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
      geographic_scope: `Global (Country-specific data for ${countryCPMData.length} regions)`,
      global_markets: siteConfig.globalMarkets,
      language: "English (en-US, en-GB, en-IN, en-AU, en-CA variants served from one canonical)",
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
      all_countries: countryCPMData.map((c) => ({
        name: c.name,
        slug: c.slug,
        code: c.code,
        currency: c.currency,
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
    blog_categories: BLOG_CATEGORIES.map((category) => ({
      name: category.name,
      url: `${siteUrl}/blog/category/${category.slug}`,
      post_count: getPostsForCategory(category.slug).length,
      definition: category.definition,
    })),
    glossary: {
      url: `${siteUrl}/resources/youtube-glossary`,
      term_count: glossaryTerms.length,
      terms: glossaryTerms.map((t) => ({
        term: t.term,
        definition: t.definition,
      })),
    },
    primary_urls: {
      tools: `${siteUrl}/tools`,
      research_report_2026: `${siteUrl}/research/youtube-cpm-rpm-report-2026`,
      state_tax_hub: `${siteUrl}/tools/creator-tax-calculator`,
      alternatives_hub: `${siteUrl}/alternatives`,
      earnings_calculator: `${siteUrl}/tools/youtube-earnings-calculator`,
      sponsorship_calculator: `${siteUrl}/tools/youtube-sponsorship-calculator`,
      channel_valuation: `${siteUrl}/tools/youtube-channel-valuation-calculator`,
      llc_vs_scorp: `${siteUrl}/tools/youtube-llc-vs-s-corp-tax-savings-calculator`,
      tax_deduction: `${siteUrl}/tools/youtube-tax-deduction-calculator`,
      creator_tax_guide: `${siteUrl}/blog/youtube-creator-taxes-accounting-software-guide`,
      q4_cpm_surge_guide: `${siteUrl}/blog/youtube-q4-cpm-rpm-surge-2026-black-friday-data`,
      creator_banking_guide: `${siteUrl}/blog/youtube-creator-business-bank-account-credit-cards-2026`,
      quarterly_taxes_1099_guide: `${siteUrl}/blog/youtube-1099-nec-quarterly-estimated-taxes-2026-2027`,
      adsense_fee: `${siteUrl}/tools/youtube-adsense-fee-calculator`,
      ads_cost: `${siteUrl}/tools/youtube-ads-cost-calculator`,
      cpm_rates: `${siteUrl}/resources/youtube-cpm-rates`,
      cpm_united_states: `${siteUrl}/tools/youtube-earnings-calculator/usa`,
      cpm_united_kingdom: `${siteUrl}/tools/youtube-earnings-calculator/uk`,
      cpm_canada: `${siteUrl}/tools/youtube-earnings-calculator/canada`,
      cpm_australia: `${siteUrl}/tools/youtube-earnings-calculator/australia`,
      cpm_switzerland: `${siteUrl}/tools/youtube-earnings-calculator/switzerland`,
      cpm_germany: `${siteUrl}/tools/youtube-earnings-calculator/germany`,
      monetization_guide: `${siteUrl}/resources/youtube-monetization-guide`,
      algorithm_guide: `${siteUrl}/resources/youtube-algorithm-guide`,
      glossary: `${siteUrl}/resources/youtube-glossary`,
      blog_category_hubs: `${siteUrl}/blog/category/channel-growth`,
      llms_txt: `${siteUrl}/llms.txt`,
      llms_full: `${siteUrl}/llms-full.txt`,
    },
    research_report_2026: {
      headline: "2026 YouTube Creator Economy & CPM/RPM Benchmark Report",
      url: `${siteUrl}/research/youtube-cpm-rpm-report-2026`,
      last_reviewed: DATA_LAST_REVIEWED,
      country_count: countryCPMData.length,
      long_form_vs_shorts: {
        long_form_split: "55% of Watch Page AdSense revenue",
        long_form_tier1_rpm: "$6.50 - $15.00 USD per 1,000 views",
        shorts_split: "45% of allocated Shorts Creator Pool post music deduction",
        shorts_tier1_rpm: "$0.03 - $0.08 USD per 1,000 views",
      },
      top_niche_ranks: nicheRpmRanking,
    },
    us_state_creator_taxes: {
      hub_url: `${siteUrl}/tools/creator-tax-calculator`,
      jurisdiction_count: US_STATE_CREATOR_TAXES.length,
      irs_2026_baseline: {
        social_security_wage_cap: 184500,
        self_employment_tax_rate: "15.3%",
        single_standard_deduction: 16100,
        qbi_deduction_rate: "20%",
      },
      jurisdictions: US_STATE_CREATOR_TAXES.map((state) => {
        const at100k = calculateCreatorStateTaxSummary(state, 100000);
        return {
          state_name: state.stateName,
          state_code: state.stateCode,
          slug: state.slug,
          top_income_tax_rate_pct: state.topIncomeTaxRate,
          llc_filing_fee_usd: state.llcFilingFee,
          llc_annual_fee_usd: state.llcAnnualFee,
          sole_prop_total_tax_at_100k_usd: at100k.totalSolePropTax,
          est_scorp_net_savings_at_100k_usd: at100k.estimatedSCorpNetSavings,
          url: `${siteUrl}/tools/creator-tax-calculator/${state.slug}`,
        };
      }),
    },
    competitor_alternatives: {
      hub_url: `${siteUrl}/alternatives`,
      count: COMPETITOR_ALTERNATIVES.length,
      comparisons: COMPETITOR_ALTERNATIVES.map((alt) => ({
        slug: alt.slug,
        competitor_name: alt.competitorName,
        competitor_starting_price: alt.competitorStartingPrice,
        competitor_annual_cost: alt.competitorAnnualCost,
        yt_tools_hub_cost: alt.ytToolsHubCost,
        annual_savings: alt.annualSavingsLabel,
        embedded_tool_slug: alt.embeddedToolSlug,
        url: `${siteUrl}/alternatives/${alt.slug}`,
      })),
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
    })),
    related_tools_mapping: {
      "thumbnail_suite": ["youtube-thumbnail-downloader", "youtube-thumbnail-generator", "youtube-ai-thumbnail-generator"],
      "seo_suite": ["youtube-tag-generator", "youtube-title-generator", "youtube-description-generator", "youtube-hashtag-generator"],
      "monetization_suite": [
        "youtube-earnings-calculator",
        "youtube-sponsorship-calculator",
        "youtube-channel-valuation-calculator",
        "youtube-tax-deduction-calculator",
        "youtube-llc-vs-s-corp-tax-savings-calculator",
        "youtube-adsense-fee-calculator",
        "youtube-ads-cost-calculator",
        "patreon-vs-youtube-memberships-vs-fourthwall-fee-calculator",
        "youtube-watch-hours-calculator",
        "youtube-shorts-vs-long-form-calculator",
        "youtube-engagement-rate-calculator"
      ],
      "planning_suite": ["youtube-video-ideas-generator", "youtube-trend-helper", "youtube-content-calendar-generator"],
    },
    structured_data: {
      knowledge_graph: knowledgeGraph,
      tool_entities: toolEntities,
    },
    faqs: faqEntities,
    blog_index: blogPosts.map(p => ({
      title: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      author: p.author,
      expertise: p.authorRole,
      date: toBlogIsoDate(p.updatedAt ?? p.date),
    })),
    machine_readable_index: {
      llms_txt: `${siteUrl}/llms.txt`,
      llms_full_txt: `${siteUrl}/llms-full.txt`,
      ai_txt: `${siteUrl}/.well-known/ai.txt`,
      openapi: `${siteUrl}/.well-known/openapi.yaml`,
      knowledge_graph: `${siteUrl}/knowledge-graph.jsonld`,
      sitemap: `${siteUrl}/sitemap.xml`,
      sitemap_index: `${siteUrl}/sitemap-index.xml`,
      robots: `${siteUrl}/robots.txt`,
      mcp_server_card: `${siteUrl}/.well-known/mcp/server-card.json`,
      mcp_endpoint: `${siteUrl}/api/mcp`,
      markdown_homepage: `${siteUrl}/index.md`,
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
