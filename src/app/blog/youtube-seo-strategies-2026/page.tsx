import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaSearch, FaChartLine, FaImage, FaRocket, FaTools, FaCheck } from "react-icons/fa";

export const metadata: Metadata = {
  title: "YouTube SEO Strategies 2026: Rank #1 in Search Results",
  description: "Master YouTube SEO in 2026. Learn keyword research, title optimization, thumbnail best practices, and ranking strategies to get more views on your videos.",
  keywords: ["youtube seo", "youtube seo 2026", "youtube ranking", "video seo", "youtube search optimization"],
  openGraph: {
    title: "YouTube SEO Strategies 2026",
    description: "Complete guide to ranking #1 in YouTube search results",
    url: `${siteConfig.url}/blog/youtube-seo-strategies-2026`,
    images: [`${siteConfig.url}/images/blog/youtube-seo.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube SEO Strategies 2026",
    description: "Rank #1 in YouTube search results",
    images: [`${siteConfig.url}/images/blog/youtube-seo.png`],
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
    title: "Keyword Research First",
    description: "Find keywords with high search volume and low competition. Use YouTube autocomplete, VidIQ, or TubeBuddy to discover what people are searching for.",
    icon: <FaSearch className="text-blue-500" />,
  },
  {
    title: "Optimize Title & Description",
    description: "Put your main keyword in the first 60 characters of your title. Write descriptions with keywords naturally, 200+ words recommended.",
    icon: <FaChartLine className="text-green-500" />,
  },
  {
    title: "Thumbnails Drive CTR",
    description: "Custom thumbnails with faces, contrast, and minimal text get 30%+ higher CTR. CTR is a major ranking factor.",
    icon: <FaImage className="text-red-500" />,
  },
];

const seoChecklist = [
  "Keyword in title (first 60 chars)",
  "Keyword in description (first 100 words)",
  "5-15 relevant tags",
  "Custom thumbnail (1280x720)",
  "Chapters/timestamps added",
  "End screen & cards added",
  "Description links to related videos",
  "Pinned comment with CTA",
];

const rankingFactors = [
  { factor: "Click-Through Rate (CTR)", importance: "Very High", tip: "Improve thumbnails & titles" },
  { factor: "Watch Time", importance: "Very High", tip: "Hook viewers in first 30 seconds" },
  { factor: "Engagement (Likes/Comments)", importance: "High", tip: "Ask questions, use CTAs" },
  { factor: "Keywords & Tags", importance: "Medium", tip: "Research before filming" },
  { factor: "Upload Consistency", importance: "Medium", tip: "Post 2-3x per week minimum" },
];

const seoTools = [
  {
    name: "Keyword Tool",
    description: "Find high-volume, low-competition YouTube keywords.",
    link: "/tools/youtube-keyword-tool",
  },
  {
    name: "Tag Generator",
    description: "Generate SEO-optimized tags for your videos.",
    link: "/tools/youtube-tag-generator",
  },
  {
    name: "Title Generator",
    description: "Create click-worthy, keyword-rich titles.",
    link: "/tools/youtube-title-generator",
  },
];

export default function YouTubeSEOStrategiesPage() {
  const articleSchema = getArticleSchema({
    title: metadata.title as string,
    description: metadata.description as string,
    url: `${siteConfig.url}/blog/youtube-seo-strategies-2026`,
    imageUrl: `${siteConfig.url}/images/blog/youtube-seo.png`,
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
    author: siteConfig.name,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "SEO Strategies", url: "/blog/youtube-seo-strategies-2026" },
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
              <FaSearch className="text-lg" />
              SEO Guide 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              YouTube SEO Strategies<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Rank #1 in Search</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Master YouTube SEO to get more views from search. Complete guide to keywords, titles, thumbnails, and ranking factors.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-green-600 mb-2">20-30%</div>
              <div className="text-slate-600 dark:text-slate-400">Views from search</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-emerald-600 mb-2">48 hrs</div>
              <div className="text-slate-600 dark:text-slate-400">Critical ranking window</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-blue-600 mb-2">5-10x</div>
              <div className="text-slate-600 dark:text-slate-400">More views with good SEO</div>
            </div>
          </div>

          {/* Core Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Core SEO Strategies</h2>
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

          {/* SEO Checklist */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Video SEO Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {seoChecklist.map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking Factors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Ranking Factors</h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Factor</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Importance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Tip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rankingFactors.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.factor}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.importance === 'Very High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : row.importance === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                          {row.importance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{row.tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Free SEO Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {seoTools.map((tool, index) => (
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
                    Try Free
                    <FaRocket className="text-sm" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Understand the Algorithm</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Learn how the YouTube algorithm decides which videos to recommend.
            </p>
            <Link
              href="/blog/youtube-algorithm-2026"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              <FaChartLine className="text-xl" />
              Algorithm Guide
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
