import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaSearch, FaChartLine, FaLightbulb, FaRocket, FaTools, FaTrophy } from "react-icons/fa";

export const metadata: Metadata = {
  title: "YouTube SEO Strategies 2026: AI-Powered Optimization for Top Rankings",
  description: "Master YouTube SEO in 2026 with AI-powered strategies. Learn title optimization, keyword research, description writing, and tag optimization to rank higher and get more views.",
  keywords: ["youtube seo 2026", "youtube title optimization", "youtube keyword research", "youtube ranking factors", "ai youtube seo"],
  openGraph: {
    title: "YouTube SEO Strategies 2026 - AI Optimization",
    description: "Complete guide to YouTube SEO with AI-powered strategies for top rankings and more views",
    url: `${siteConfig.url}/blog/youtube-seo-strategies-2026`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube SEO Strategies 2026 - AI Optimization",
    description: "Complete guide to YouTube SEO with AI-powered strategies",
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: "/blog/youtube-seo-strategies-2026",
    languages: {
      "en": "/blog/youtube-seo-strategies-2026",
      "x-default": "/blog/youtube-seo-strategies-2026",
    },
  },
};

const seoStrategies = [
  {
    title: "AI-Powered Title Optimization",
    description: "Use AI to generate titles with emotional triggers, curiosity gaps, and keyword optimization. Top-ranking titles use power words and numbers.",
    icon: <FaSearch className="text-blue-500" />,
  },
  {
    title: "Strategic Keyword Research",
    description: "Analyze competitor keywords, search trends, and user intent. AI tools identify high-volume, low-competition keywords in your niche.",
    icon: <FaChartLine className="text-green-500" />,
  },
  {
    title: "Description SEO Mastery",
    description: "Structure descriptions with hooks, timestamps, and keyword-rich content. AI generates optimized descriptions that rank and convert.",
    icon: <FaLightbulb className="text-yellow-500" />,
  },
];

const seoTools = [
  {
    name: "Title Generator",
    description: "Create SEO-optimized titles with AI that rank higher and get more clicks.",
    link: "/tools/youtube-title-generator",
  },
  {
    name: "Tag Generator",
    description: "Find high-ranking SEO tags for better discoverability and search rankings.",
    link: "/tools/youtube-tag-generator",
  },
  {
    name: "Description Generator",
    description: "Write engaging descriptions with hooks, timestamps, and SEO optimization.",
    link: "/tools/youtube-description-generator",
  },
];

export default function YouTubeSEOGuidePage() {
  const articleSchema = getArticleSchema({
    title: metadata.title as string,
    description: metadata.description as string,
    url: `${siteConfig.url}/blog/youtube-seo-strategies-2026`,
    imageUrl: `${siteConfig.url}/og-image.png`,
    datePublished: "2026-01-24",
    dateModified: "2026-01-24",
    author: siteConfig.name,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "YouTube SEO Strategies 2026", url: "/blog/youtube-seo-strategies-2026" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-bold mb-6">
              <FaSearch className="text-lg" />
              SEO Masterclass 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              YouTube SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Strategies</span><br />
              That Actually Work
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Discover AI-powered SEO techniques that top creators use to dominate YouTube search and get 10x more organic traffic in 2026.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 mb-2">3B+</div>
              <div className="text-slate-600 dark:text-slate-400">monthly YouTube searches</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-indigo-600 mb-2">70%</div>
              <div className="text-slate-600 dark:text-slate-400">of views come from search</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-green-600 mb-2">5x</div>
              <div className="text-slate-600 dark:text-slate-400">more traffic with optimized SEO</div>
            </div>
          </div>

          {/* Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">AI-Powered SEO Strategies</h2>
            <div className="grid gap-6">
              {seoStrategies.map((strategy, index) => (
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Essential SEO Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {seoTools.map((tool, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTools className="text-blue-500 text-xl" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try Now
                    <FaRocket className="text-sm" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white mb-16">
            <h2 className="text-3xl font-bold mb-8">Results You Can Expect</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <FaTrophy className="text-4xl mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">Rank Higher</div>
                <div className="text-blue-100">Get on first page for competitive keywords</div>
              </div>
              <div>
                <FaChartLine className="text-4xl mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">More Views</div>
                <div className="text-blue-100">10x increase in organic traffic</div>
              </div>
              <div>
                <FaRocket className="text-4xl mb-4 mx-auto" />
                <div className="text-2xl font-bold mb-2">Faster Growth</div>
                <div className="text-blue-100">Consistent subscriber acquisition</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Dominate YouTube SEO?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Use our AI-powered SEO tools to optimize your content and rank higher in YouTube search results.
            </p>
            <Link
              href="/tools/youtube-title-generator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              <FaSearch className="text-xl" />
              Start SEO Optimization
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
