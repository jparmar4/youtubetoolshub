import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaDollarSign, FaChartLine, FaLightbulb, FaRocket, FaTools, FaTrophy } from "react-icons/fa";

export const metadata: Metadata = {
  title: "YouTube Monetization Guide 2026: Maximize Earnings with AI Analytics",
  description: "Complete guide to YouTube monetization in 2026. Learn RPM optimization, niche selection, revenue diversification, and AI-powered analytics to maximize your YouTube income.",
  keywords: ["youtube monetization 2026", "youtube rpm optimization", "youtube earnings calculator", "youtube revenue streams", "ai youtube analytics"],
  openGraph: {
    title: "YouTube Monetization Guide 2026 - AI Analytics",
    description: "Complete guide to YouTube monetization with AI-powered analytics and revenue optimization",
    url: `${siteConfig.url}/blog/youtube-monetization-guide-2026`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Monetization Guide 2026 - AI Analytics",
    description: "Complete guide to YouTube monetization with AI-powered analytics",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const monetizationStrategies = [
  {
    title: "High-RPM Niche Selection",
    description: "Finance niches earn $40+ RPM while gaming earns $2-5 RPM. AI tools analyze market trends and competition to find profitable niches.",
    icon: <FaDollarSign className="text-green-500" />,
  },
  {
    title: "Revenue Stream Diversification",
    description: "Combine AdSense with sponsorships, merchandise, and digital products. Top creators earn 70% from non-ad revenue.",
    icon: <FaChartLine className="text-blue-500" />,
  },
  {
    title: "AI-Powered Analytics",
    description: "Use AI to predict earnings, optimize posting schedules, and identify revenue opportunities. Real-time data drives better decisions.",
    icon: <FaLightbulb className="text-yellow-500" />,
  },
];

const monetizationTools = [
  {
    name: "Earnings Calculator",
    description: "Estimate your YouTube revenue with real-time RPM data and niche-specific calculations.",
    link: "/tools/youtube-earnings-calculator",
  },
  {
    name: "Engagement Calculator",
    description: "Measure audience engagement to prove value to sponsors and increase sponsorship rates.",
    link: "/tools/youtube-engagement-rate-calculator",
  },
  {
    name: "Channel Audit",
    description: "Comprehensive analysis of your channel's monetization potential and optimization opportunities.",
    link: "/tools/youtube-channel-audit",
  },
];

export default function MonetizationGuidePage() {
  const articleSchema = getArticleSchema({
    title: metadata.title as string,
    description: metadata.description as string,
    url: `${siteConfig.url}/blog/youtube-monetization-guide-2026`,
    imageUrl: `${siteConfig.url}/og-image.png`,
    datePublished: "2026-01-24",
    dateModified: "2026-01-24",
    author: siteConfig.name,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "YouTube Monetization Guide 2026", url: "/blog/youtube-monetization-guide-2026" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm font-bold mb-6">
              <FaDollarSign className="text-lg" />
              Monetization Masterclass 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              YouTube <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Monetization</span><br />
              Strategies That Work
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Master YouTube monetization in 2026 with AI-powered analytics, niche optimization, and revenue diversification strategies used by top creators.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-green-600 mb-2">$50B+</div>
              <div className="text-slate-600 dark:text-slate-400">YouTube creator economy size</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$2-40</div>
              <div className="text-slate-600 dark:text-slate-400">RPM range by niche</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
              <div className="text-slate-600 dark:text-slate-400">of top earners use multiple revenue streams</div>
            </div>
          </div>

          {/* Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">AI-Powered Monetization Strategies</h2>
            <div className="grid gap-6">
              {monetizationStrategies.map((strategy, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {strategy.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {strategy.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Monetization Analytics Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {monetizationTools.map((tool, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTools className="text-green-500 text-xl" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    Try Now
                    <FaRocket className="text-sm" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white mb-16">
            <h2 className="text-3xl font-bold mb-8">Top Creator Revenue Breakdown</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold mb-2">30%</div>
                <div className="text-green-100">AdSense Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">25%</div>
                <div className="text-green-100">Sponsorships</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">20%</div>
                <div className="text-green-100">Merchandise</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">25%</div>
                <div className="text-green-100">Digital Products</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Maximize Your Earnings?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Use our AI-powered monetization tools to analyze your revenue potential and optimize your YouTube income streams.
            </p>
            <Link
              href="/tools/youtube-earnings-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              <FaDollarSign className="text-xl" />
              Calculate Your Earnings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
