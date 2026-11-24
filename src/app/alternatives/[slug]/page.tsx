import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowRight,
  FaBalanceScale,
  FaCheckCircle,
  FaLayerGroup,
  FaMinusCircle,
} from "react-icons/fa";
import {
  COMPETITOR_ALTERNATIVES,
  getCompetitorAlternativeBySlug,
} from "@/data/competitorAlternatives";
import { siteConfig } from "@/config/site";
import {
  combineSchemasToGraph,
  getBreadcrumbSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import AlternativeToolEmbed from "@/components/alternatives/AlternativeToolEmbed";
import HighRpmSidebar from "@/components/tools/HighRpmSidebar";
import AdSlot from "@/components/ads/AdSlot";
import { AdSectionIgnore, AdSectionPrioritize } from "@/components/ads/AdSectionTarget";
import { AD_SLOTS } from "@/lib/adsense";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITOR_ALTERNATIVES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const alt = getCompetitorAlternativeBySlug(slug);

  if (!alt) {
    return {
      title: "Alternative Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: alt.pageTitle },
    description: alt.metaDescription,
    keywords: [
      `${alt.competitorName} free alternative`,
      `free alternative to ${alt.competitorName}`,
      `youtube tools hub vs ${alt.competitorName}`,
      `${alt.competitorName} pricing 2026`,
    ],
    openGraph: {
      title: alt.pageTitle,
      description: alt.metaDescription,
      type: "website",
      url: `${siteConfig.url}/alternatives/${alt.slug}`,
      images: [
        {
          url: `${siteConfig.url}/alternatives/${alt.slug}/opengraph-image`,
          width: 1200,
          height: 675,
          alt: alt.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: alt.pageTitle,
      description: alt.metaDescription,
      images: [`${siteConfig.url}/alternatives/${alt.slug}/opengraph-image`],
    },
    alternates: getGlobalAlternates(`/alternatives/${alt.slug}`),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function CompetitorAlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alt = getCompetitorAlternativeBySlug(slug);

  if (!alt) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/alternatives/${alt.slug}`;
  const combinedSchema = combineSchemasToGraph(
    getBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Alternatives", url: `${siteConfig.url}/alternatives` },
      { name: `${alt.competitorName} Alternative`, url: pageUrl },
    ]),
    getFAQSchema(alt.faqs),
  );

  const peerAlternatives = COMPETITOR_ALTERNATIVES.filter(
    (item) => item.slug !== alt.slug,
  );

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.comparisonPage(alt.competitorName)}
        pathname={`/alternatives/${alt.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="min-h-screen py-8 sm:py-12 relative overflow-x-clip">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AdSectionIgnore>
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Alternatives", href: "/alternatives" },
                  { name: `${alt.competitorName} Alternative` },
                ]}
              />
            </div>
          </AdSectionIgnore>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-8 min-w-0 space-y-8">
              <AdSectionPrioritize>
                {/* Hero Card with Savings Badge, Side-by-Side Pricing Callout & Primary CTA */}
                <header className="card-3d rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-5">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                    <FaBalanceScale className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{alt.annualSavingsLabel}</span>
                  </div>
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-outfit tracking-tight leading-tight"
                    data-speakable
                  >
                    {alt.h1}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed" data-speakable>
                    {alt.heroSubtitle}
                  </p>

                  {/* Side-by-Side Price Callout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 p-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                        YouTube Tools Hub
                      </span>
                      <span className="text-2xl font-black text-emerald-700 font-outfit block mt-0.5">
                        {alt.ytToolsHubCost}
                      </span>
                      <span className="text-xs text-emerald-900/80 block mt-0.5">
                        Free browser studio · No credit card or extension
                      </span>
                    </div>

                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                        {alt.competitorName} (2026 Pricing)
                      </span>
                      <span className="text-2xl font-black text-slate-900 font-outfit block mt-0.5">
                        {alt.competitorStartingPrice}
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Annual cost: {alt.competitorAnnualCost}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Link
                      href={`/tools/${alt.embeddedToolSlug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-extrabold shadow-sm transition-colors"
                    >
                      <span>Open {alt.embeddedToolTitle}</span>
                      <FaArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/tools"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-300 hover:border-purple-400 text-slate-800 text-sm font-bold transition-colors"
                    >
                      <span>Browse All Free Tools</span>
                    </Link>
                  </div>
                </header>

                {/* Header Ad */}
                <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />

                {/* Embedded Live Matching Tool */}
                <section className="studio-console-3d rounded-3xl overflow-hidden">
                  <div className="flex items-center justify-between gap-2 px-5 py-3 bg-slate-900 text-white border-b border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 text-purple-300 shrink-0">
                        <FaLayerGroup className="w-3 h-3" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold text-slate-200 truncate">
                        {alt.embeddedToolTitle} — Live Interactive Tool
                      </span>
                    </div>
                    <span className="shrink-0 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                      $0 Free Workspace
                    </span>
                  </div>
                  <div className="p-4 sm:p-6">
                    <AlternativeToolEmbed
                      tools={[{ slug: alt.embeddedToolSlug, label: alt.embeddedToolTitle }]}
                    />
                  </div>
                </section>

                {/* Post-Tool High-Intent Contextual Ad Slot */}
                <AdSlot slot={AD_SLOTS.IN_ARTICLE[0]} preset="in-article" lazy={false} />

                {/* Responsive HTML Comparison Table */}
                <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                        2026 Feature &amp; Pricing Matrix
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mt-0.5">
                        YouTube Tools Hub ({alt.ytToolsHubCost}) vs. {alt.competitorName}
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                      {alt.annualSavingsLabel}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {alt.verdictSummary}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-800">
                          <th scope="col" className="py-3 px-4 font-extrabold">Capability / Cost</th>
                          <th scope="col" className="py-3 px-4 font-extrabold text-emerald-800">
                            YouTube Tools Hub
                          </th>
                          <th scope="col" className="py-3 px-4 font-extrabold text-slate-600">
                            {alt.competitorName}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {alt.comparisonRows.map((row) => (
                          <tr key={row.feature} className="hover:bg-slate-50/70">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              {row.feature}
                            </td>
                            <td
                              className={`py-3.5 px-4 font-bold ${
                                row.winner === "ytToolsHub"
                                  ? "text-emerald-700 bg-emerald-50/40"
                                  : "text-slate-700"
                              }`}
                            >
                              <span className="inline-flex items-start gap-2">
                                {row.winner === "ytToolsHub" && (
                                  <FaCheckCircle
                                    className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{row.ytToolsHubValue}</span>
                              </span>
                            </td>
                            <td
                              className={`py-3.5 px-4 font-medium ${
                                row.winner === "competitor"
                                  ? "text-blue-800 bg-blue-50/30 font-bold"
                                  : "text-slate-600"
                              }`}
                            >
                              <span className="inline-flex items-start gap-2">
                                {row.winner === "competitor" && (
                                  <FaCheckCircle
                                    className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{row.competitorValue}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Two-Column Honest Verdict Cards */}
                <section
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  aria-label="Honest workflow comparison"
                >
                  <div className="card-3d rounded-3xl p-6 border-2 border-emerald-200 bg-emerald-50/40 space-y-4">
                    <h2 className="text-lg font-black text-emerald-950 font-outfit">
                      When to choose YouTube Tools Hub
                    </h2>
                    <ul className="space-y-3">
                      {alt.bestForYtToolsHub.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-800"
                        >
                          <FaCheckCircle
                            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-3d rounded-3xl p-6 border border-slate-200 bg-slate-50/80 space-y-4">
                    <h2 className="text-lg font-black text-slate-900 font-outfit">
                      When to choose {alt.competitorName}
                    </h2>
                    <ul className="space-y-3">
                      {alt.bestForCompetitor.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <FaMinusCircle
                            className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </AdSectionPrioritize>

              {/* FAQs */}
              <section data-speakable>
                <h2 className="text-2xl font-black text-slate-900 mb-5 font-outfit">
                  {alt.competitorName} Alternative FAQ
                </h2>
                <FaqAccordion items={alt.faqs} headingLevel="h3" />
              </section>

              {/* Peer Switcher Pages */}
              <AdSectionIgnore>
                <div className="card-3d rounded-3xl p-6 sm:p-7 space-y-4">
                  <h3 className="text-lg font-black text-slate-900 font-outfit">
                    Explore More Free Tool Comparisons
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {peerAlternatives.map((peer) => (
                      <Link
                        key={peer.slug}
                        href={`/alternatives/${peer.slug}`}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-white transition-all flex flex-col justify-between gap-2"
                      >
                        <span className="font-bold text-sm text-slate-900">
                          Free {peer.competitorName} Alternative
                        </span>
                        <span className="text-xs font-extrabold text-purple-700 inline-flex items-center gap-1">
                          Compare <FaArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </AdSectionIgnore>
            </div>

            <HighRpmSidebar currentSlug={alt.embeddedToolSlug} />
          </div>

          <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" />
        </div>
      </div>
    </>
  );
}
