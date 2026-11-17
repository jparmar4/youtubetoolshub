import { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaBalanceScale } from "react-icons/fa";
import { COMPETITOR_ALTERNATIVES } from "@/data/competitorAlternatives";
import { siteConfig } from "@/config/site";
import {
  combineSchemasToGraph,
  getBreadcrumbSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";

export const metadata: Metadata = {
  title: {
    absolute: "Free Creator Tool Alternatives vs 1of10, Pikzels, SocialBlade & VidIQ (2026)",
  },
  description:
    "Compare free browser-based YouTube tools against paid $20–$99/mo subscriptions including 1of10, Pikzels, SocialBlade, VidIQ, and TubeBuddy.",
  alternates: getGlobalAlternates("/alternatives"),
};

export default function AlternativesIndexPage() {
  const schema = combineSchemasToGraph(
    getBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Alternatives", url: `${siteConfig.url}/alternatives` },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen py-8 sm:py-12 relative overflow-x-clip">
        <div className="nebula-bg" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Free Alternatives" },
            ]}
          />

          <header className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-extrabold uppercase tracking-wider">
              <FaBalanceScale className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Honest 2026 Competitor Comparisons</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              Free Browser Alternatives to Paid YouTube SaaS Tools
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              See transparent pricing comparisons, honest workflow trade-offs, and test live interactive tools right inside each comparison before subscribing to $20–$99/month extensions or credit tools.
            </p>
          </header>

          <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPETITOR_ALTERNATIVES.map((alt) => (
              <Link
                key={alt.slug}
                href={`/alternatives/${alt.slug}`}
                className="group card-3d rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 hover:border-purple-400 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      vs. {alt.competitorName} ({alt.competitorStartingPrice})
                    </span>
                    <span className="text-xs font-black text-purple-700">
                      {alt.ytToolsHubCost}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-purple-700 font-outfit leading-snug">
                    {alt.h1}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {alt.heroSubtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-extrabold text-purple-700">
                  <span>{alt.annualSavingsLabel}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Compare &amp; Launch Tool <FaArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" />
        </div>
      </div>
    </>
  );
}
