
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { countryCPMData, getCountryBySlug } from "@/lib/cpm-data";
import { getToolBySlug } from "@/config/tools";
import EarningsCalculator from "@/components/tools/EarningsCalculator";
import HorizontalAd from "@/components/ads/HorizontalAd";
import SidebarAd from "@/components/ads/SidebarAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FaGlobeAmericas, FaChartLine, FaDollarSign } from "react-icons/fa";

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
        return { title: "YouTube Earnings Calculator" };
    }

    const title = `YouTube Earnings Calculator ${countryData.name}: Real 2026 Rates`;
    const description = `Calculate your YouTube earnings in ${countryData.name} with updated 2026 CPM rates. See how much money you can make in ${countryData.currency}.`;

    return {
        title,
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
        alternates: {
            canonical: `/tools/youtube-earnings-calculator/${country}`,
            languages: {
                'en': `/tools/youtube-earnings-calculator/${country}`,
                'x-default': `/tools/youtube-earnings-calculator/${country}`,
            },
        },
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

    return (
        <div className="min-h-screen py-12 lg:py-20 relative overflow-hidden">
            <div className="nebula-bg" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Breadcrumb
                        items={[
                            { name: "Home", href: "/" },
                            { name: "Tools", href: "/tools" },
                            { name: "Earnings Calculator", href: "/tools/youtube-earnings-calculator" },
                            { name: countryData.name }
                        ]}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Header */}
                        <div className="text-center md:text-left mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
                                <span className="text-xl">{countryData.flag}</span>
                                {countryData.name} Edition (2026 Updated)
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                                YouTube Money Calculator <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">{countryData.name}</span>
                            </h1>
                            <p className="text-xl text-slate-600">
                                Calculate your potential YouTube income based on real {countryData.name} CPM rates ({countryData.currency}).
                            </p>
                        </div>

                        {/* Calculator Component - Passing specific props */}
                        {/* Note: I will need to ensure EarningsCalculator accepts initialRPM/Currency props. 
                         If not, I'll update it in the next step. For now assuming it might or I'll fix it.
                         I'll pass them as props even if it ignores them for now, then fix the component.
                     */}
                        <div className="bg-white rounded-3xl p-1 shadow-xl shadow-green-900/5 border border-slate-100">
                            <EarningsCalculator
                                initialRPM={countryData.rpmRange.avg}
                                currency={countryData.currency}
                                countryName={countryData.name}
                            />
                        </div>

                        <HorizontalAd />

                        {/* Country Stats Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaChartLine className="text-green-500 text-xl" />
                                    <h3 className="font-bold text-slate-900">Average CPM</h3>
                                </div>
                                <div className="text-3xl font-bold text-slate-900">
                                    ${countryData.cpmRange.min} - ${countryData.cpmRange.max}
                                </div>
                                <p className="text-slate-500 text-sm">per 1,000 views in {countryData.name}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <FaGlobeAmericas className="text-blue-500 text-xl" />
                                    <h3 className="font-bold text-slate-900">Est. RPM</h3>
                                </div>
                                <div className="text-3xl font-bold text-slate-900">
                                    ${countryData.rpmRange.min} - ${countryData.rpmRange.max}
                                </div>
                                <p className="text-slate-500 text-sm">Actual revenue per 1k views</p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="glass-premium rounded-2xl p-8 space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">
                                How Much Does YouTube Pay in {countryData.name}? (2026)
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                If you are targeting an audience in <strong>{countryData.name}</strong>, your earning potential is significant.
                                {countryData.name} is considered a {countryData.cpmRange.avg > 10 ? "Tier 1" : "Tier 2"} country for advertisers,
                                meaning companies pay a premium to show ads to viewers here.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                In 2026, the average CPM (Cost Per Mille) for {countryData.name} traffic ranges from
                                <strong>${countryData.cpmRange.min} to ${countryData.cpmRange.max}</strong> depending on your niche.
                                Niches like Finance, Tech, and Business typically command the higher end of this range, while
                                Comedy or Vlogging may be closer to the lower end.
                            </p>
                        </div>

                        {/* Internal Links to other countries */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FaGlobeAmericas className="text-purple-500" />
                                Compare with Other Countries
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {countryCPMData.filter(c => c.slug !== country).slice(0, 6).map(c => (
                                    <Link
                                        key={c.slug}
                                        href={`/tools/youtube-earnings-calculator/${c.slug}`}
                                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 transition-colors"
                                    >
                                        {c.flag} {c.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/tools/youtube-earnings-calculator"
                                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                                >
                                    View Global Average
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="max-lg:hidden lg:col-span-1 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <SidebarAd />

                            {/* Related Tools */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4">Related Tools</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/tools/youtube-channel-audit" className="flex items-center gap-3 text-slate-600 hover:text-green-600 transition-colors">
                                            <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                                                <FaChartLine />
                                            </span>
                                            <span className="font-medium">Channel Audit</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/tools/youtube-tag-generator" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors">
                                            <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                                <FaDollarSign />
                                            </span>
                                            <span className="font-medium">Tag Generator</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <MultiplexAd />
                </div>
            </div>
        </div>
    );
}
