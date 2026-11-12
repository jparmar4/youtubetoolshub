import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { countryCPMData, getCountryBySlug, getCountryTier, estimateEarnings, TIERS } from "@/lib/cpm-data";
import { getCountryMonetizationMeta } from "@/lib/country-monetization-meta";
import { formatDualCurrencySummary, formatMoneyRounded } from "@/lib/currency-data";
import { getToolBySlug } from "@/config/tools";
import EarningsCalculator from "@/components/tools/EarningsCalculator";

import Breadcrumb from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/ui/FaqAccordion";
import QuickAnswerCapsule from "@/components/seo/QuickAnswerCapsule";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { FaGlobeAmericas, FaChartLine, FaFileInvoiceDollar, FaUniversity, FaLayerGroup } from "react-icons/fa";
import { ToolContextProvider } from "@/components/tools/ToolContext";
import ToolIcon3D from "@/components/ui/ToolIcon3D";
import {
    combineSchemasToGraph,
    getFAQSchema,
    getBreadcrumbSchema,
    getDatasetSchema,
    getGlobalAlternates,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED, speakableAnswers } from "@/lib/seo-data";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateBanner from "@/components/ads/AffiliateBanner";
import InternationalPayoutCallout from "@/components/ads/InternationalPayoutCallout";
import { AdSectionPrioritize, AdSectionIgnore } from "@/components/ads/AdSectionTarget";
import Tier1ComparisonMatrix from "@/components/tools/Tier1ComparisonMatrix";
import { AD_SLOTS } from "@/lib/adsense";

/** Unknown country slugs → 404 (prevents soft-404 index bloat) */
export const dynamicParams = false;

export function generateStaticParams() {
    return countryCPMData.map((country) => ({
        country: country.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ country: string }>;
}): Promise<Metadata> {
    const { country } = await params;
    const countryData = getCountryBySlug(country);

    if (!countryData) {
        return {
            title: "YouTube Earnings Calculator",
            robots: { index: false, follow: false },
        };
    }

    const rpm = countryData.rpmRange;
    const baseTitle = `YouTube Earnings in ${countryData.name} 2026 — $${rpm.min.toFixed(0)}–$${rpm.max.toFixed(0)} RPM`;
    const title = baseTitle.length <= 60 ? baseTitle : `YouTube Earnings in ${countryData.name} — $${rpm.min.toFixed(0)}–$${rpm.max.toFixed(0)} RPM`;
    const description = `Free YouTube earnings calculator for ${countryData.name}. Planning RPM is about $${rpm.min.toFixed(2)}–$${rpm.max.toFixed(2)} (avg $${rpm.avg.toFixed(2)}). Estimate 100k and 1M view pay.`;

    return {
        title: { absolute: title },
        description,
        keywords: [`youtube earnings calculator ${countryData.name}`, `youtube cpm ${countryData.name}`, `youtube money calculator ${countryData.currency}`, `how much does youtube pay in ${countryData.name}`],
        openGraph: {
            title: `${title} | YouTube Tools Hub`,
            description,
            type: "website",
            url: `${siteConfig.url}/tools/youtube-earnings-calculator/${country}`,
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        alternates: getGlobalAlternates(
            `/tools/youtube-earnings-calculator/${country}`,
        ),
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
        other: {
            "primaryTopic": `YouTube Monetization in ${countryData.name}`,
            "abstract": description,
            "key-facts": [
                `Updated 2026 CPM for ${countryData.name}`,
                `Currency support: ${countryData.currency}`,
                `Niche-specific RPM projections for ${countryData.name}`,
                "Part of the official YouTube Tools Hub mission"
            ].join(", "),
        }
    };
}

export default async function CountryEarningsPage({
    params,
}: {
    params: Promise<{ country: string }>;
}) {
    const { country } = await params;
    const countryData = getCountryBySlug(country);
    const tool = getToolBySlug("youtube-earnings-calculator");

    if (!countryData || !tool) {
        notFound();
    }

    const tier = getCountryTier(countryData.code);
    const countryMeta = getCountryMonetizationMeta(
        countryData.code,
        countryData.name,
        tier.id,
        countryData.currency,
    );
    const avgRpm = countryData.rpmRange.avg;
    const earn100k = estimateEarnings(100_000, avgRpm);
    const earn100kMin = estimateEarnings(100_000, countryData.rpmRange.min);
    const earn100kMax = estimateEarnings(100_000, countryData.rpmRange.max);
    const earn1m = estimateEarnings(1_000_000, avgRpm);
    const payout100kSummary = formatDualCurrencySummary(earn100k, countryData.currency);
    const payout1mSummary = formatDualCurrencySummary(earn1m, countryData.currency);

    const countryFaqs = [
        {
            question: `How much does YouTube pay in ${countryData.name}?`,
            answer: `In ${countryData.name} (${tier.label}), planning CPM typically ranges about $${countryData.cpmRange.min.toFixed(2)}–$${countryData.cpmRange.max.toFixed(2)} (avg ~$${countryData.cpmRange.avg.toFixed(2)} USD), with creator RPM roughly $${countryData.rpmRange.min.toFixed(2)}–$${countryData.rpmRange.max.toFixed(2)} (avg ~$${countryData.rpmRange.avg.toFixed(2)} USD). ${countryMeta.marketInsight}`,
        },
        {
            question: `How much is 1 million YouTube views worth in ${countryData.name}?`,
            answer: `At a mid planning RPM of $${avgRpm.toFixed(2)} USD, 1 million views from ${countryData.name} is roughly ${payout1mSummary} in AdSense. Low-end RPM ($${countryData.rpmRange.min.toFixed(2)}) is ~${formatDualCurrencySummary(estimateEarnings(1_000_000, countryData.rpmRange.min), countryData.currency)}; high-end ($${countryData.rpmRange.max.toFixed(2)}) is ~${formatDualCurrencySummary(estimateEarnings(1_000_000, countryData.rpmRange.max), countryData.currency)}.`,
        },
        {
            question: "What is CPM vs RPM?",
            answer: speakableAnswers.cpmVsRpm,
        },
        {
            question: `What are the highest-paying YouTube niches in ${countryData.name}?`,
            answer: `Top domestic advertiser verticals in ${countryData.name} include ${countryMeta.topLocalNiches.join(", ")}. ${countryMeta.seasonalityNote}`,
        },
        {
            question: `How do creators in ${countryData.name} get paid in ${countryData.currency}?`,
            answer: `Google AdSense accrues earnings against the ${countryMeta.adsenseThreshold} payment threshold and settles monthly between the 21st and 26th via ${countryMeta.payoutMethod}. Multi-currency accounts such as Wise or Payoneer can reduce cross-border FX markups when converting USD to ${countryData.currency}.`,
        },
        {
            question: `What US tax withholding and local tax rules apply in ${countryData.name}?`,
            answer: `US-viewer AdSense withholding status: ${countryMeta.usWithholdingRate}. ${countryMeta.usTaxNote} Domestically, creators report under ${countryMeta.localTaxAuthority}: ${countryMeta.localTaxNote}`,
        },
        {
            question: "Is this guaranteed AdSense income?",
            answer:
                "No. These are directional industry benchmarks for planning. Real AdSense revenue depends on viewer geography mix, video length (8+ min mid-rolls), niche advertiser bids, and YouTube Studio analytics.",
        },
    ];

    const faqSchema = getFAQSchema(countryFaqs);
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Tools", url: `${siteConfig.url}/tools` },
        {
            name: "Earnings Calculator",
            url: `${siteConfig.url}/tools/youtube-earnings-calculator`,
        },
        {
            name: countryData.name,
            url: `${siteConfig.url}/tools/youtube-earnings-calculator/${country}`,
        },
    ]);
    const datasetSchema = getDatasetSchema({
        name: `YouTube CPM/RPM — ${countryData.name} (${DATA_LAST_REVIEWED})`,
        description: `Planning CPM and RPM ranges for YouTube creators with audience in ${countryData.name}.`,
        url: `${siteConfig.url}/tools/youtube-earnings-calculator/${country}`,
        dateModified: DATA_LAST_REVIEWED,
    });

    return (
        <>
            <GeoAeoHead
                {...GEO_AEO_PRESETS.countryPage(
                    countryData.name,
                    countryData.currency,
                    countryData.rpmRange.avg,
                    countryData.code,
                )}
                pathname={`/tools/youtube-earnings-calculator/${country}`}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        combineSchemasToGraph(faqSchema, breadcrumbSchema, datasetSchema),
                    ),
                }}
            />
            <div className="min-h-screen py-8 sm:py-12 relative overflow-hidden">
                <div className="nebula-bg" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                    {/* Breadcrumb */}
                    <AdSectionIgnore>
                        <div className="mb-6">
                            <Breadcrumb
                                items={[
                                    { name: "Home", href: "/" },
                                    { name: "Tools", href: "/tools" },
                                    { name: "Earnings Calculator", href: "/tools/youtube-earnings-calculator" },
                                    { name: countryData.name }
                                ]}
                            />
                        </div>
                    </AdSectionIgnore>

                    <div className="max-w-6xl mx-auto">
                        {/* Main Content — full-width now that the sidebar rail is gone */}
                        <div className="space-y-8">
                            <AdSectionPrioritize>
                            {/* Studio Header */}
                            <header className="card-3d rounded-3xl p-6 sm:p-7 mb-8 relative overflow-hidden">
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                                <div className="flex items-start gap-4 sm:gap-5">
                                    <ToolIcon3D
                                        slug="youtube-earnings-calculator"
                                        category="analytics-earnings"
                                        size="lg"
                                        badge={countryData.code}
                                        className="mt-0.5"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
                                            <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white text-[11px] font-black">
                                                {countryData.code}
                                            </span>
                                            <span>{countryData.name} Edition · 2026 Updated ({countryData.currency})</span>
                                        </div>
                                        <h1
                                            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight font-outfit leading-tight"
                                            data-speakable
                                        >
                                            YouTube Earnings Calculator{" "}
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                                {countryData.name}
                                            </span>{" "}
                                            — CPM &amp; RPM 2026
                                        </h1>
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed" data-speakable>
                                            Estimate YouTube income for creators in {countryData.name} using
                                            updated CPM/RPM ranges ({countryData.currency}). Free planning tool —
                                            verify results in YouTube Studio.
                                        </p>
                                    </div>
                                </div>
                            </header>

                            {/* Compact Responsive Leaderboard Above Calculator */}
                            <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" className="mb-8" />

                            {/* Interactive Calculator Console — Immediately Visible */}
                            <div className="studio-console-3d rounded-3xl overflow-hidden mb-8">
                                <div className="flex items-center justify-between gap-2 px-5 py-3 bg-slate-900 text-white border-b border-slate-800">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 text-emerald-300 shrink-0" aria-hidden="true">
                                            <FaLayerGroup className="w-3 h-3" />
                                        </span>
                                        <span className="text-xs font-bold text-slate-200 truncate">
                                            {countryData.name} ({countryData.currency}) YouTube RPM Studio
                                        </span>
                                    </div>
                                    <span className="shrink-0 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                                        Avg ${countryData.rpmRange.avg.toFixed(2)} RPM
                                    </span>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <ToolContextProvider value={{ hideHeader: true }}>
                                        <EarningsCalculator
                                            initialRPM={countryData.rpmRange.avg}
                                            currency={countryData.currency}
                                            countryName={countryData.name}
                                        />
                                    </ToolContextProvider>
                                </div>
                            </div>

                            <div className="mb-8">
                                <QuickAnswerCapsule
                                    question={`Quick Answer: How much does YouTube pay in ${countryData.name}?`}
                                    answer={`In ${countryData.name} (${tier.label}), YouTube creators typically earn $${countryData.rpmRange.min.toFixed(2)}–$${countryData.rpmRange.max.toFixed(2)} USD per 1,000 views (average $${countryData.rpmRange.avg.toFixed(2)} USD RPM). For 100,000 views, estimated AdSense revenue is $${Math.round(earn100kMin).toLocaleString("en-US")}–$${Math.round(earn100kMax).toLocaleString("en-US")} USD (midpoint ${payout100kSummary}).`}
                                    keyPoints={[
                                        `Average RPM: $${countryData.rpmRange.avg.toFixed(2)} USD per 1,000 views ($${countryData.rpmRange.min.toFixed(2)}–$${countryData.rpmRange.max.toFixed(2)})`,
                                        `Advertiser CPM: $${countryData.cpmRange.avg.toFixed(2)} USD average ($${countryData.cpmRange.min.toFixed(2)}–$${countryData.cpmRange.max.toFixed(2)})`,
                                        `100,000 Views Midpoint: ~${payout100kSummary}`,
                                        `1 Million Views Midpoint: ~${payout1mSummary} · US Withholding: ${countryMeta.usWithholdingRate}`,
                                    ]}
                                    badgeText={`${countryData.name} 2026 Summary`}
                                />
                            </div>

                            {/* Top Affiliate Recommendation */}
                            <AffiliateBanner toolId="vidiq" variant="compact" />


                            {/* Country Stats Grid */}
                            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                <div className="card-3d p-6 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaChartLine className="text-emerald-600 text-xl" />
                                        <h3 className="font-bold text-slate-900">Average CPM</h3>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">
                                        ${countryData.cpmRange.min} - ${countryData.cpmRange.max}
                                    </div>
                                    <p className="text-slate-600 text-sm">per 1,000 views in {countryData.name}</p>
                                </div>
                                <div className="card-3d p-6 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaGlobeAmericas className="text-blue-600 text-xl" />
                                        <h3 className="font-bold text-slate-900">Est. RPM</h3>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">
                                        ${countryData.rpmRange.min} - ${countryData.rpmRange.max}
                                    </div>
                                    <p className="text-slate-600 text-sm">Actual revenue per 1k views</p>
                                </div>
                            </div>

                            {/* Ad placement */}
                            <AdSlot slot="3397391628" preset="in-article" className="my-8" />

                            {/* Content Section */}
                            <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 font-outfit">
                                    How Much Does YouTube Pay in {countryData.name}? (2026)
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {countryData.name} is a <strong>{tier.label}</strong> advertiser market
                                    ({tier.description.toLowerCase()}). {countryMeta.marketInsight}
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Planning CPM for {countryData.name} is about{" "}
                                    <strong>${countryData.cpmRange.min.toFixed(2)}–${countryData.cpmRange.max.toFixed(2)} USD</strong>
                                    {countryData.currency !== "USD" ? ` (settled locally in ${countryData.currency})` : ""}.
                                    Mid creator RPM sits near <strong>${avgRpm.toFixed(2)} USD</strong>. Top domestic verticals here —{" "}
                                    {countryMeta.topLocalNiches.join(", ")} — routinely double broad entertainment RPM.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-slate-600">
                                                <th scope="col" className="py-2 pr-4 font-semibold">Views</th>
                                                <th scope="col" className="py-2 pr-4 font-semibold">Low RPM (${countryData.rpmRange.min.toFixed(2)})</th>
                                                <th scope="col" className="py-2 pr-4 font-semibold">Mid RPM (${avgRpm.toFixed(2)})</th>
                                                {countryData.currency !== "USD" && (
                                                    <th scope="col" className="py-2 pr-4 font-semibold">Mid ({countryData.currency})</th>
                                                )}
                                                <th scope="col" className="py-2 font-semibold">High RPM (${countryData.rpmRange.max.toFixed(2)})</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-800 font-medium">
                                            {[10_000, 100_000, 1_000_000].map((views) => {
                                                const midUsd = estimateEarnings(views, avgRpm);
                                                return (
                                                    <tr key={views} className="border-b border-slate-100">
                                                        <td className="py-2 pr-4">{views.toLocaleString("en-US")}</td>
                                                        <td className="py-2 pr-4">${Math.round(estimateEarnings(views, countryData.rpmRange.min)).toLocaleString("en-US")}</td>
                                                        <td className="py-2 pr-4 font-bold text-emerald-700">${Math.round(midUsd).toLocaleString("en-US")}</td>
                                                        {countryData.currency !== "USD" && (
                                                            <td className="py-2 pr-4 font-bold text-slate-900">
                                                                ~{formatMoneyRounded(midUsd, countryData.currency)}
                                                            </td>
                                                        )}
                                                        <td className="py-2">${Math.round(estimateEarnings(views, countryData.rpmRange.max)).toLocaleString("en-US")}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-slate-600 text-sm">
                                    These are AdSense planning estimates for a {countryData.name}-heavy audience, not
                                    official payouts. Compare with{" "}
                                    <Link href="/blog/youtube-monetization-truths-cpm-rpm" className="text-purple-600 font-semibold hover:underline">
                                        1 million view earnings
                                    </Link>{" "}
                                    and the{" "}
                                    <Link href="/resources/youtube-cpm-rates" className="text-purple-600 font-semibold hover:underline">
                                        full country CPM table
                                    </Link>.
                                </p>
                            </div>

                            {/* Country-Specific Tax, W-8BEN & Payout Intelligence */}
                            <section className="card-3d rounded-3xl p-6 sm:p-8 space-y-5" aria-labelledby="country-tax-payout">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h2 id="country-tax-payout" className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                                        {countryData.name} Creator Tax, W-8BEN &amp; Payout Rules (2026)
                                    </h2>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold shrink-0">
                                        US Treaty Rate: {countryMeta.usWithholdingRate}
                                    </span>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5">
                                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <FaFileInvoiceDollar className="text-purple-600 shrink-0" />
                                            <span>US Form W-8BEN &amp; Domestic Tax</span>
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            <strong>US Withholding:</strong> {countryMeta.usTaxNote}
                                        </p>
                                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                                            <strong>Local Filing ({countryMeta.localTaxAuthority}):</strong> {countryMeta.localTaxNote}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-1.5">
                                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <FaUniversity className="text-emerald-600 shrink-0" />
                                            <span>AdSense Threshold, Rail &amp; Seasonality</span>
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            <strong>Payout Minimum:</strong> {countryMeta.adsenseThreshold} via {countryMeta.payoutMethod}.
                                        </p>
                                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                                            <strong>Seasonality:</strong> {countryMeta.seasonalityNote}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-purple-50/60 border border-purple-200/70 p-4">
                                    <div className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-2">
                                        Highest-CPM Domestic Advertiser Verticals in {countryData.name}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {countryMeta.topLocalNiches.map((niche) => (
                                            <span key={niche} className="px-3 py-1 rounded-lg bg-white border border-purple-200 text-xs font-semibold text-slate-800">
                                                {niche}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Tier 1 Benchmark Comparison */}
                            <div className="my-8">
                                <Tier1ComparisonMatrix />
                            </div>

                            {/* International Banking & Wire Fee Savings */}
                            <div className="my-8">
                                <InternationalPayoutCallout />
                            </div>
                            </AdSectionPrioritize>

                            {/* AEO FAQ (visible + schema) */}
                            <section data-speakable>
                                <h2 className="text-2xl font-bold text-slate-900 mb-5 font-outfit">
                                    {countryData.name} YouTube earnings FAQ
                                </h2>
                                <FaqAccordion items={countryFaqs} headingLevel="h3" />
                                <p className="mt-5 text-sm text-slate-600">
                                    Full multi-country table:{" "}
                                    <Link href="/resources/youtube-cpm-rates" className="text-purple-600 font-semibold hover:underline">
                                        YouTube CPM rates by country
                                    </Link>
                                    . Data last reviewed {DATA_LAST_REVIEWED}.
                                </p>
                            </section>

                            {/* Internal Links to other countries — full market mesh for global crawl */}
                            <AdSectionIgnore>
                                <div className="card-3d rounded-3xl p-6 sm:p-8">
                                    <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 font-outfit text-lg">
                                        <FaGlobeAmericas className="text-purple-600" />
                                        <span>{`Compare with all ${countryCPMData.length} countries`}</span>
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-5">
                                        Same calculator localized for each market — Tier 1 premium, Tier 2 solid, Tier 3 emerging.
                                    </p>
                                    {[
                                        { label: `Tier 1 (${TIERS.TIER1.countries.length})`, codes: TIERS.TIER1.countries },
                                        { label: `Tier 2 (${TIERS.TIER2.countries.length})`, codes: TIERS.TIER2.countries },
                                        { label: `Tier 3 (${TIERS.TIER3.countries.length})`, codes: TIERS.TIER3.countries },
                                    ].map((group) => (
                                        <div key={group.label} className="mb-4 last:mb-0">
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
                                                {group.label}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {countryCPMData
                                                    .filter((c) => group.codes.includes(c.code) && c.slug !== country)
                                                    .map((c) => (
                                                        <Link
                                                            key={c.slug}
                                                            href={`/tools/youtube-earnings-calculator/${c.slug}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:border-purple-500 hover:text-purple-600 transition-colors"
                                                        >
                                                            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[11px] font-black">
                                                                {c.code}
                                                            </span>
                                                            <span>{c.name}</span>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <Link
                                            href="/tools/youtube-earnings-calculator"
                                            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                                        >
                                            View Global Average
                                        </Link>
                                        <Link
                                            href="/resources/youtube-cpm-rates"
                                            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 transition-colors"
                                        >
                                            {`Full ${countryCPMData.length}-country CPM table`}
                                        </Link>
                                    </div>
                                </div>
                            </AdSectionIgnore>

                            {/* Bottom Multiplex Ad Unit */}
                            <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Recommended For Creators" className="my-8" />
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
