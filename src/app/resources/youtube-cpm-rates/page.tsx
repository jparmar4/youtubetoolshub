import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { countryCPMData, nicheCPMData, TIERS } from "@/lib/cpm-data";
import { getFAQSchema, getHowToSchema, getBreadcrumbSchema } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HorizontalAd from "@/components/ads/HorizontalAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import InArticleAd from "@/components/ads/InArticleAd";
import EarningsCalculatorCTA from "@/components/blog/EarningsCalculatorCTA";

export const metadata: Metadata = {
    title: "YouTube CPM Rates by Country 2026 — Complete Data Table",
    description:
        "Full YouTube CPM and RPM rates for 50+ countries in 2026. See average CPM by country tier, niche CPM breakdown (Finance, Tech, Gaming), and proven tips to increase your YouTube earnings.",
    keywords: [
        "youtube cpm rates by country 2026",
        "youtube cpm rates",
        "youtube rpm by country",
        "how much does youtube pay per 1000 views",
        "youtube cpm india",
        "youtube cpm usa",
        "youtube cpm uk",
        "youtube monetization rates",
        "youtube adsense cpm",
        "highest cpm countries youtube",
        "youtube earnings per 1000 views by country",
        "youtube cpm calculator",
        "youtube rpm vs cpm",
    ],
    alternates: {
        canonical: `${siteConfig.url}/resources/youtube-cpm-rates`,
    },
    openGraph: {
        title: "YouTube CPM Rates by Country 2026 — Full Data Table",
        description:
            "Complete YouTube CPM and RPM data for 50+ countries. Finance, Tech, Gaming niche breakdowns. Updated for 2026.",
        url: `${siteConfig.url}/resources/youtube-cpm-rates`,
        // Dynamic image: /resources/youtube-cpm-rates/opengraph-image
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube CPM Rates by Country 2026",
        description:
            "50+ countries. US avg CPM ~$14.50. Free data table + earnings calculator.",
    },
    other: {
        "pinterest:media": `${siteConfig.url}/resources/youtube-cpm-rates/pinterest-image`,
    },
};

const pageFAQs = [
    {
        question: "What is a good YouTube CPM rate in 2026?",
        answer:
            "A good YouTube CPM in 2026 depends on your audience location and niche. For US audiences, $8–$25 CPM is average, with Finance and Business niches reaching $20–$50. Global average CPM across all countries is roughly $2–$5. Creators targeting Tier 1 countries (US, UK, CA, AU) consistently earn 5–10x more per 1,000 views than those with primarily Indian or Southeast Asian audiences.",
    },
    {
        question: "Which country has the highest YouTube CPM?",
        answer:
            "The United States consistently has the highest YouTube CPM, averaging $8–$25 per 1,000 ad impressions, with Finance niche channels reaching $20–$50. Australia, Switzerland, Norway, and Canada also rank among the top CPM countries, all averaging $7–$14 CPM. These Tier 1 markets have dense advertiser competition and high consumer purchasing power.",
    },
    {
        question: "What is the difference between YouTube CPM and RPM?",
        answer:
            "CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions — this is the advertiser-side rate. RPM (Revenue Per Mille) is what you actually receive per 1,000 video views after YouTube takes its 45% revenue share. If your CPM is $10, your RPM will be approximately $4.50–$6.00, because not every view generates an ad impression.",
    },
    {
        question: "What is YouTube CPM in India in 2026?",
        answer:
            "YouTube CPM in India in 2026 averages $0.50–$3.00, with an average of $1.50 CPM. This gives Indian creators an RPM of roughly $0.20–$1.50 per 1,000 views. To increase earnings, Indian creators should focus on content that attracts US, UK, or Australian viewers — such as tech reviews in English, finance education, or tools tutorials.",
    },
    {
        question: "What YouTube niche has the highest CPM?",
        answer:
            "Personal Finance & Investing has the highest YouTube CPM in 2026, averaging $12–$45 CPM in the US ($22 average). Business & Entrepreneurship ($10–$35), Digital Marketing ($8–$22), and Technology ($8–$20) also rank among the highest. Gaming and Entertainment have some of the lowest CPMs at $1–$6, despite having large audiences.",
    },
    {
        question: "How can I increase my YouTube CPM?",
        answer:
            "To increase your YouTube CPM: (1) Create content targeting Tier 1 audiences in the US, UK, Canada, or Australia. (2) Shift to higher-CPM niches like finance, business, or technology. (3) Enable all ad formats including skippable, non-skippable, bumper, and display ads. (4) Produce longer videos (8+ minutes) to include mid-roll ads. (5) Post consistently during Q4 (October–December) when advertiser spend peaks, boosting CPMs by 20–50%.",
    },
    {
        question: "Why does my YouTube RPM fluctuate month to month?",
        answer:
            "YouTube RPM fluctuates due to: (1) Seasonal advertiser spend — Q4 (Oct–Dec) is highest, Q1 (Jan–Feb) drops 20–40%. (2) Your audience's geographic mix changing. (3) Ad format fill rates varying. (4) New video topics attracting different advertiser categories. Tracking your RPM in YouTube Studio Analytics monthly helps identify which content types earn the most.",
    },
    {
        question: "Does YouTube CPM vary by video length?",
        answer:
            "Yes. Videos over 8 minutes qualify for mid-roll ads, which significantly increases total ad impressions and therefore your effective RPM. A 10-minute video can earn 2–3x more than an equivalent 5-minute video because advertisers can place ads at the beginning, middle, and end. Always aim for 10–15 minute videos in high-CPM niches for maximum earnings.",
    },
    {
        question: "What is YouTube CPM in the United States in 2026?",
        answer:
            "YouTube CPM in the United States in 2026 ranges from $8 to $25 per 1,000 ad impressions, with an average of $14.50. In high-CPM niches like Personal Finance or B2B software, US CPMs regularly reach $20–$50. This makes the US the most valuable audience for YouTube monetization. Use the YouTube Tools Hub Earnings Calculator to estimate your exact US earnings.",
    },
    {
        question: "How accurate is this CPM data?",
        answer:
            "This data represents industry estimates compiled from aggregated creator reports, AdSense benchmarks, and publicly available monetization research for 2026. Actual CPM varies based on your specific audience demographics, content type, ad format mix, and seasonality. Use this as a directional guide rather than a guaranteed rate. Your YouTube Studio Analytics will always show your exact RPM.",
    },
];

const howToSchema = getHowToSchema({
    name: "How to Increase Your YouTube CPM in 2026",
    description:
        "Follow these proven steps to attract higher-CPM advertisers and grow your YouTube AdSense revenue.",
    totalTime: "PT30D",
    steps: [
        {
            name: "Target Tier 1 country audiences",
            text: "Create content in English targeting US, UK, Canadian, and Australian viewers. Use topics, examples, and references relevant to those markets. Tier 1 audiences generate 5–10x higher CPM than Tier 3 markets.",
        },
        {
            name: "Switch to high-CPM niches",
            text: "Finance, investing, business, technology, and digital marketing consistently deliver $10–$45 CPM in the US versus $1–$3 for gaming or entertainment. Even a partial pivot — adding a 'YouTube monetization tips' series — can lift your average RPM significantly.",
        },
        {
            name: "Enable all ad formats",
            text: "In YouTube Studio, go to Monetization → Ad formats and enable skippable ads, non-skippable ads, bumper ads, overlay ads, and display ads. Each additional format increases total ad impressions per video view.",
        },
        {
            name: "Make videos longer than 8 minutes",
            text: "Videos over 8 minutes qualify for mid-roll ads. A 12-minute video can carry 2–3 ad breaks, multiplying total impressions. Use the YouTube Content Calendar Generator to plan longer-form content consistently.",
        },
        {
            name: "Post during Q4 (October–December)",
            text: "Advertiser budgets peak in Q4 as brands push holiday spending. YouTube CPM rates in the US can jump 20–50% in November and December. Schedule your highest-quality, most monetization-friendly content during this period.",
        },
    ],
});

const faqSchema = getFAQSchema(pageFAQs);

const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
    { name: "YouTube CPM Rates 2026", url: `${siteConfig.url}/resources/youtube-cpm-rates` },
]);

const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "YouTube CPM and RPM Rates by Country 2026",
    description:
        "Industry estimates of YouTube CPM (Cost Per Mille) and RPM (Revenue Per Mille) rates for 50+ countries, categorized by Tier 1, Tier 2, and Tier 3 markets. Also includes niche-level CPM benchmarks for Personal Finance, Technology, Gaming, and more.",
    url: `${siteConfig.url}/resources/youtube-cpm-rates`,
    creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    license: `${siteConfig.url}/terms-of-use`,
    temporalCoverage: "2026-01-01/2026-12-31",
    variableMeasured: ["CPM", "RPM", "Country", "Niche"],
    spatialCoverage: { "@type": "Place", name: "Global" },
};

const tier1 = countryCPMData.filter((c) => TIERS.TIER1.countries.includes(c.code));
const tier2 = countryCPMData.filter((c) => TIERS.TIER2.countries.includes(c.code));
const tier3 = countryCPMData.filter((c) => TIERS.TIER3.countries.includes(c.code));

function CPMTable({ countries, tierLabel, tierColor }: { countries: typeof countryCPMData; tierLabel: string; tierColor: string }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
                <caption className="sr-only">{tierLabel} YouTube CPM rates by country</caption>
                <thead>
                    <tr className={`${tierColor} text-white`}>
                        <th className="text-left px-4 py-3 font-bold">Country</th>
                        <th className="text-right px-4 py-3 font-bold">CPM Min</th>
                        <th className="text-right px-4 py-3 font-bold">CPM Avg</th>
                        <th className="text-right px-4 py-3 font-bold">CPM Max</th>
                        <th className="text-right px-4 py-3 font-bold">RPM Avg</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((c, i) => (
                        <tr key={c.code} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                            <td className="px-4 py-3 font-medium text-slate-900">
                                <Link
                                    href={`/tools/youtube-earnings-calculator/${c.slug}`}
                                    className="hover:text-emerald-700 hover:underline"
                                >
                                    <span className="mr-2">{c.flag}</span>
                                    {c.name}
                                </Link>
                                <span className="ml-2 text-xs text-slate-400">({c.currency})</span>
                            </td>
                            <td className="px-4 py-3 text-right text-slate-600">${c.cpmRange.min.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">${c.cpmRange.avg.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right text-slate-600">${c.cpmRange.max.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right text-emerald-700 font-semibold">${c.rpmRange.avg.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function YouTubeCPMRatesPage() {
    return (
        <>
            {/* Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                {/* Hero */}
                <section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_60%)]" />
                    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Breadcrumb
                            items={[
                                { name: "Home", href: "/" },
                                { name: "Resources", href: "/resources" },
                                { name: "YouTube CPM Rates 2026" },
                            ]}
                            className="mb-8 text-slate-400 [&_a]:text-slate-400 [&_a:hover]:text-white"
                        />
                        <div className="text-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                                Updated for 2026 · 50+ Countries
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                YouTube CPM Rates<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    by Country 2026
                                </span>
                            </h1>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                                Complete CPM and RPM data for 50+ countries. Understand exactly how much YouTube pays per 1,000 views in your market — and how to maximize your earnings.
                            </p>
                            {/* Quick-answer box for AEO featured snippet */}
                            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left">
                                <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">⚡ Quick Answer</p>
                                <p className="text-white font-medium leading-relaxed">
                                    Average YouTube CPM in the <strong>United States</strong> is <strong>$8–$25</strong> per 1,000 ad impressions ($14.50 avg). The <strong>UK</strong> averages $6–$18, <strong>Canada</strong> $6.50–$20, and <strong>Australia</strong> $7.50–$22. <strong>India</strong> averages $0.50–$3.00. Finance and Business niches earn 3–5× more than Gaming or Entertainment in every country.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                    {/* Key Stats */}
                    <section>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "US Avg CPM", value: "$14.50", sub: "Highest globally", color: "from-purple-500 to-purple-700" },
                                { label: "Finance Niche CPM", value: "$22 avg", sub: "Up to $50 in US", color: "from-emerald-500 to-emerald-700" },
                                { label: "India Avg CPM", value: "$1.50", sub: "Tier 3 market", color: "from-orange-500 to-orange-700" },
                                { label: "Countries Tracked", value: "50+", sub: "Updated 2026", color: "from-pink-500 to-pink-700" },
                            ].map((stat) => (
                                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white text-center shadow-lg`}>
                                    <div className="text-3xl font-black mb-1">{stat.value}</div>
                                    <div className="text-sm font-bold opacity-90">{stat.label}</div>
                                    <div className="text-xs opacity-70 mt-1">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <EarningsCalculatorCTA
                        variant="card"
                        contextLabel="Turn CPM data into your estimate"
                    />

                    {/* What is CPM section */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <h2 className="text-3xl font-black text-slate-900 mb-4 font-outfit">What is YouTube CPM?</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            <strong>CPM (Cost Per Mille)</strong> is the amount advertisers pay YouTube for every 1,000 ad impressions served on your videos. <strong>RPM (Revenue Per Mille)</strong> is what you actually receive per 1,000 video views — after YouTube takes its 45% revenue share.
                        </p>
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 font-mono text-sm">
                            <div className="text-slate-500 mb-1">// The relationship between CPM and RPM:</div>
                            <div className="text-slate-900">Your RPM ≈ CPM × 0.55 × Ad Fill Rate</div>
                            <div className="text-slate-500 mt-2 text-xs">Example: $14.50 CPM × 55% share × 80% fill = ~$6.38 RPM</div>
                        </div>
                        <p className="text-slate-600 mt-4 leading-relaxed">
                            Not every view generates an ad impression (ad fill rate is typically 60–85%). That&apos;s why your RPM is always lower than your CPM. The data tables below show both figures for accurate income planning.
                        </p>
                    </section>

                    <HorizontalAd />

                    {/* Tier 1 Table */}
                    <section>
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-3">Tier 1</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">Premium Markets — Highest CPM</h2>
                            <p className="text-slate-500 mt-2">US, UK, Canada, Australia, Germany, Switzerland, and Nordic countries. Advertisers pay the most to reach these audiences.</p>
                        </div>
                        <CPMTable countries={tier1} tierLabel="Tier 1" tierColor="bg-purple-700" />
                    </section>

                    {/* Tier 2 Table */}
                    <section>
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">Tier 2</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">Solid Markets — Competitive CPM</h2>
                            <p className="text-slate-500 mt-2">Middle East, Western Europe, East Asia, and Southeast Asia. Strong CPMs with growing advertiser bases.</p>
                        </div>
                        <CPMTable countries={tier2} tierLabel="Tier 2" tierColor="bg-blue-700" />
                    </section>

                    <InArticleAd />

                    {/* Tier 3 Table */}
                    <section>
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest mb-3">Tier 3</span>
                            <h2 className="text-3xl font-black text-slate-900 font-outfit">Emerging Markets — High Volume, Lower CPM</h2>
                            <p className="text-slate-500 mt-2">India, Brazil, Southeast Asia, and Africa. Huge audience sizes but lower advertiser rates. Strategy: drive Tier 1 traffic.</p>
                        </div>
                        <CPMTable countries={tier3} tierLabel="Tier 3" tierColor="bg-orange-600" />
                    </section>

                    {/* Niche CPM Table */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 font-outfit mb-3">YouTube CPM by Niche (2026)</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Your niche has as much impact on CPM as your audience country. Finance channels in the US earn <strong>10–20× more per view</strong> than gaming channels with the same US audience.
                                <span className="text-xs text-slate-400 ml-2">(Industry estimates based on aggregated creator reports. Actual rates vary.)</span>
                            </p>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="text-left px-4 py-3 font-bold">Niche</th>
                                        <th className="text-right px-4 py-3 font-bold">US CPM Range</th>
                                        <th className="text-right px-4 py-3 font-bold">Global Avg CPM</th>
                                        <th className="text-left px-4 py-3 font-bold hidden md:table-cell">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nicheCPMData.map((n, i) => (
                                        <tr key={n.niche} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                            <td className="px-4 py-3 font-semibold text-slate-900">{n.niche}</td>
                                            <td className="px-4 py-3 text-right font-bold text-purple-700">
                                                ${n.topCountryCPM.min}–${n.topCountryCPM.max}
                                            </td>
                                            <td className="px-4 py-3 text-right text-emerald-700 font-semibold">
                                                ${n.avgCPM.min}–${n.avgCPM.max}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">{n.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <HorizontalAd />

                    {/* How to Increase CPM */}
                    <section className="glass-premium rounded-3xl p-8 md:p-12 shadow-sm border border-white/60">
                        <h2 className="text-3xl font-black text-slate-900 font-outfit mb-3">How to Increase Your YouTube CPM</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            You can&apos;t control what advertisers bid, but you can control who your audience is and what topics you cover.
                        </p>
                        <div className="space-y-6">
                            {[
                                {
                                    step: "1",
                                    title: "Target Tier 1 audiences",
                                    text: "Create content in English that speaks to US, UK, Canadian, or Australian viewers. Use local examples, dollar amounts, and reference platforms they use. A US viewer is worth 10–30× more in ad revenue than a viewer from India or Pakistan.",
                                    color: "bg-purple-600",
                                },
                                {
                                    step: "2",
                                    title: "Move toward high-CPM niches",
                                    text: "Finance, investing, business tools, and digital marketing attract advertisers willing to pay $15–$50 CPM. Even a partial pivot — a series on 'YouTube monetization strategy' or 'how to make money online' — can lift your channel's average RPM significantly.",
                                    color: "bg-pink-600",
                                },
                                {
                                    step: "3",
                                    title: "Enable all ad formats",
                                    text: "In YouTube Studio → Monetization → Ad formats, enable skippable ads, non-skippable ads (15s), bumper ads (6s), overlay ads, and display ads. Each format adds more potential ad impressions per view.",
                                    color: "bg-indigo-600",
                                },
                                {
                                    step: "4",
                                    title: "Make videos 10–15 minutes long",
                                    text: "Videos over 8 minutes qualify for mid-roll ads. A 12-minute video can carry 2–3 ad breaks, multiplying total impressions by 2–3×. Combined with a high CPM, this is the most direct path to higher AdSense revenue.",
                                    color: "bg-emerald-600",
                                },
                                {
                                    step: "5",
                                    title: "Publish heavily in Q4",
                                    text: "October–December is peak advertiser spend globally. US CPMs can jump 30–50% in November as brands push Black Friday and holiday campaigns. Schedule your best, most monetization-friendly content for this window every year.",
                                    color: "bg-orange-500",
                                },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-5 items-start">
                                    <div className={`flex-shrink-0 w-11 h-11 rounded-full ${item.color} text-white flex items-center justify-center font-black text-lg shadow-lg`}>
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA to calculator */}
                    <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-purple-950 p-8 md:p-12 text-center shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-outfit">
                            Calculate Your Exact Earnings
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                            Use our free YouTube Earnings Calculator to see what your channel would earn with different CPM rates and view counts — country by country.
                        </p>
                        <Link
                            href="/tools/youtube-earnings-calculator"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-lg rounded-full shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
                        >
                            Open Earnings Calculator →
                        </Link>
                        <p className="text-slate-500 text-sm mt-4">Free · No signup · Real CPM data for 50+ countries</p>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 font-outfit mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-5">
                            {pageFAQs.map((faq, i) => (
                                <div key={i} className="glass-premium rounded-2xl p-7 border border-white/60 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Data disclaimer */}
                    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-500">
                        <strong className="text-slate-700 block mb-1">Data Disclaimer</strong>
                        CPM and RPM figures on this page are industry estimates compiled from aggregated creator reports, advertising rate benchmarks, and monetization research for 2026. Actual rates vary based on your specific audience demographics, ad format mix, content category, and seasonal factors. YouTube does not publish official CPM data. Your most accurate data source is always YouTube Studio Analytics → Revenue → RPM.
                    </section>

                    <MultiplexAd />
                </div>
            </div>
        </>
    );
}
