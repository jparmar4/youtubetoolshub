import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaImage, FaEye, FaChartLine, FaLightbulb, FaTools, FaRocket } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Ultimate YouTube Thumbnail Guide 2026: AI-Powered Strategies for Higher CTR",
  description: "Master YouTube thumbnail optimization in 2026. Learn AI-powered design strategies, psychological triggers, and proven techniques to boost click-through rates and grow your channel faster.",
  keywords: ["youtube thumbnail guide 2026", "youtube thumbnail optimization", "ai thumbnail generator", "increase youtube ctr", "youtube thumbnail design tips"],
  openGraph: {
    title: "Ultimate YouTube Thumbnail Guide 2026 - AI Strategies",
    description: "Complete guide to YouTube thumbnail optimization with AI-powered strategies for maximum CTR",
    url: `${siteConfig.url}/blog/youtube-thumbnail-guide-2026`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Guide 2026 - AI Strategies",
    description: "Complete guide to YouTube thumbnail optimization with AI-powered strategies",
    images: [`${siteConfig.url}/og-image.png`],
  },
  alternates: {
    canonical: "/blog/youtube-thumbnail-guide-2026",
    languages: {
      "en": "/blog/youtube-thumbnail-guide-2026",
      "x-default": "/blog/youtube-thumbnail-guide-2026",
    },
  },
};

const thumbnailStrategies = [
  {
    title: "Psychological Color Theory",
    description: "Use red and orange for urgency, blue for trust, and yellow for attention. AI tools can analyze your niche and recommend optimal color combinations.",
    icon: <FaEye className="text-red-500" />,
  },
  {
    title: "Text Overlay Optimization",
    description: "Keep text under 3 words, use high-contrast fonts, and place text in the top 60% of the frame. AI generators create compelling text hooks automatically.",
    icon: <FaLightbulb className="text-yellow-500" />,
  },
  {
    title: "Facial Expression Analysis",
    description: "Surprised or happy faces increase CTR by 27%. AI tools can generate expressions that match your content's emotional tone.",
    icon: <FaChartLine className="text-green-500" />,
  },
];

const toolsSection = [
  {
    name: "AI Thumbnail Generator",
    description: "Generate custom thumbnails with AI that understand your niche and audience preferences.",
    link: "/tools/youtube-ai-thumbnail-generator",
  },
  {
    name: "Thumbnail Downloader",
    description: "Analyze competitor thumbnails by downloading them in HD quality for inspiration.",
    link: "/tools/youtube-thumbnail-downloader",
  },
  {
    name: "Thumbnail Text Generator",
    description: "Create compelling text overlays using psychological triggers and proven formulas.",
    link: "/tools/youtube-thumbnail-generator",
  },
];

export default function ThumbnailGuidePage() {
  const articleSchema = getArticleSchema({
    title: metadata.title as string,
    description: metadata.description as string,
    url: `${siteConfig.url}/blog/youtube-thumbnail-guide-2026`,
    imageUrl: `${siteConfig.url}/og-image.png`,
    datePublished: "2026-01-24",
    dateModified: "2026-01-24",
    author: siteConfig.name,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "YouTube Thumbnail Guide 2026", url: "/blog/youtube-thumbnail-guide-2026" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-6">
              <FaImage className="text-lg" />
              Ultimate Guide 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              YouTube Thumbnail <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Optimization</span><br />
              Masterclass
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Discover AI-powered strategies and psychological triggers that top creators use to achieve 10-30% higher click-through rates in 2026.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
              <div className="text-slate-600 dark:text-slate-400">of top videos use custom thumbnails</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-indigo-600 mb-2">27%</div>
              <div className="text-slate-600 dark:text-slate-400">higher CTR with emotional faces</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
              <div className="text-slate-600 dark:text-slate-400">faster growth with optimized thumbnails</div>
            </div>
          </div>

          {/* Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">AI-Powered Thumbnail Strategies</h2>
            <div className="grid gap-6">
              {thumbnailStrategies.map((strategy, index) => (
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Essential Thumbnail Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {toolsSection.map((tool, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTools className="text-purple-500 text-xl" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Try Now
                    <FaRocket className="text-sm" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Thumbnails?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Use our AI-powered tools to create thumbnails that get noticed and drive more clicks to your videos.
            </p>
            <Link
              href="/tools/youtube-ai-thumbnail-generator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              <FaImage className="text-xl" />
              Create AI Thumbnail Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
