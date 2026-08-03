import Link from "next/link";
import { Metadata } from "next";
import { ToolCard } from "@/components/ui/Card";
import { tools, toolCategories, getToolsByCategory } from "@/config/tools";
import {
  getToolListSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getSpeakableSchema,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { Fragment } from "react";

const toolsPageFaqs = [
  {
    question: "Are YouTube Tools Hub tools free?",
    answer:
      "Yes. Core tools including the thumbnail downloader, title generator, tag generator, and earnings calculator are free with no signup required.",
  },
  {
    question: "Do I need to install a browser extension?",
    answer:
      "No. Every tool runs in the browser at youtubetoolshub.com. You do not need TubeBuddy, VidIQ, or any extension to use the suite.",
  },
  {
    question: "What free YouTube SEO tools are included?",
    answer:
      "Title generator, tag generator, tag extractor, description generator, hashtag generator, timestamp generator, and channel audit tools for metadata and growth.",
  },
  {
    question: "Can I estimate YouTube earnings by country?",
    answer:
      "Yes. The YouTube Earnings Calculator uses country-level CPM and RPM planning ranges for 50+ markets, including the US, UK, Canada, Australia, and India.",
  },
];

export const metadata: Metadata = {
  title: "27+ Free YouTube Tools | Thumbnail, SEO, Tags & Earnings",
  description:
    "Free YouTube tools for creators: HD thumbnail downloader, AI title & tag generators, earnings calculator, channel audit, hashtag generator, and more. No signup.",
  keywords: [
    "free youtube tools",
    "youtube thumbnail downloader",
    "youtube tag generator",
    "youtube title generator",
    "youtube earnings calculator",
    "youtube seo tools free",
    "tubebuddy alternative free",
    "vidiq alternative free",
    "youtube channel audit",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "27+ Free YouTube Tools | YouTube Tools Hub",
    description:
      "Free tools for thumbnails, SEO metadata, earnings estimates, and channel growth. No signup required.",
    type: "website",
    url: `${siteConfig.url}/tools`,
  },
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
};

export default function ToolsPage() {
  // Generate JSON-LD schemas
  const toolListSchema = getToolListSchema(
    tools.map((tool) => ({
      name: tool.name,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tools", url: `${siteConfig.url}/tools` },
  ]);

  const faqSchema = getFAQSchema(toolsPageFaqs);
  const speakableSchema = getSpeakableSchema({
    url: `${siteConfig.url}/tools`,
    headline: "27+ Free YouTube Tools for Creators",
    summary:
      "YouTube Tools Hub offers 27+ free creator tools including thumbnail downloader, title generator, tag generator, and earnings calculator. No signup required.",
    cssSelectors: ["h1", ".summary", "[data-speakable]"],
  });

  return (
    <>
      {/* GEO/AEO Head for AI discoverability */}
      <GeoAeoHead
        title="27+ Free YouTube Tools – Creator Suite for Creators"
        description="A free suite of creator tools, including AI-assisted generators. Download thumbnails, generate title ideas, calculate earnings, and optimize your channel SEO."
        entityType="WebApplication"
        primaryTopic="YouTube Creator Tools Suite"
        conciseAnswer="YouTube Tools Hub offers 27+ free creator tools for YouTube creators including thumbnail downloader, title generator, tag extractor, earnings calculator, and channel audit. No signup required."
        keyFacts={[
          "27+ free creator tools",
          "No signup or browser extension required",
          "Tools organized into 5 categories: Thumbnail, SEO, Growth, Analytics, Utility",
          "Free alternative to TubeBuddy and VidIQ",
        ]}
        pathname="/tools"
      />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <div className="min-h-screen py-20 relative overflow-hidden bg-slate-50">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-100/40 via-blue-50/20 to-transparent -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-purple-500/20">
              Creator Tool Suite
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight font-outfit"
              data-speakable
            >
              Free YouTube Tools — SEO, Thumbnails &amp; Earnings Calculators
            </h1>
            <p
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit summary"
              data-speakable
            >
              {tools.length}+ free online tools for YouTube creators: download HD
              thumbnails, generate titles and tags, calculate CPM earnings by
              country, audit channels, and plan content — no signup or extension
              required.
            </p>
          </div>

          {/* Above-the-fold Ad Placement */}

          {/* Tools by Category */}
          <div className="space-y-32">
            {toolCategories.map((category) => {
              const categoryTools = getToolsByCategory(category.id);
              return (
                <div key={category.id}>
                  <section className="animate-fade-in-up">
                    <div className="mb-12 flex flex-col items-center text-center">
                      <h2 className="text-4xl font-bold text-slate-900 mb-4 font-outfit relative">
                        {category.name}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full"></div>
                      </h2>
                      <p className="text-lg text-slate-500 max-w-2xl mb-6">
                        {category.description}
                      </p>
                      {/* Link to Hub Page */}
                      {(() => {
                        const hubMap: Record<string, string> = {
                          "thumbnail-media": "/tools/thumbnail-tools",
                          "seo-metadata": "/tools/seo-tools",
                          "channel-growth": "/tools/channel-tools",
                          "analytics-earnings": "/tools/analytics-tools",
                          "utility-fun": "/tools/utility-tools",
                        };
                        const hubUrl = hubMap[category.id];
                        return hubUrl ? (
                          <Link
                            href={hubUrl}
                            className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors group"
                          >
                            View Full {category.name.replace(" Tools", "")}{" "}
                            Suite
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </Link>
                        ) : null;
                      })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryTools.map((tool) => (
                        <Fragment key={tool.slug}>
                          <ToolCard
                            icon={<tool.icon />}
                            title={tool.name}
                            description={tool.shortDescription}
                            href={`/tools/${tool.slug}`}
                            isAI={tool.isAI}
                            className="hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl border-white/40 glass-premium"
                          />
                        </Fragment>
                      ))}
                    </div>
                  </section>
                </div>
              );
            })}

            {/* Trust Bar Section */}
            <div className="glass-premium rounded-3xl p-12 text-center border border-white/40 shadow-sm animate-fade-in-up">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-outfit italic">
                "A practical toolkit for faster creator workflows."
              </h3>
              <div className="flex justify-center items-center gap-8 opacity-40 grayscale">
                <span className="font-bold text-xl tracking-tighter">
                  BROWSER BASED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  NO SIGNUP NEEDED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  AI POWERED
                </span>
                <span className="font-bold text-xl tracking-tighter">
                  CREATOR FOCUSED
                </span>
              </div>
            </div>

            {/* AEO: visible FAQ matching FAQPage schema */}
            <section className="mt-24 max-w-3xl mx-auto" aria-labelledby="tools-faq-heading">
              <h2
                id="tools-faq-heading"
                className="text-3xl font-bold text-slate-900 mb-8 text-center font-outfit"
              >
                Free YouTube Tools FAQ
              </h2>
              <div className="space-y-4">
                {toolsPageFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="glass-premium rounded-2xl p-6 border border-white/40"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-slate-500">
                More answers on the{" "}
                <Link href="/faq" className="text-purple-600 font-semibold hover:underline">
                  full FAQ page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
