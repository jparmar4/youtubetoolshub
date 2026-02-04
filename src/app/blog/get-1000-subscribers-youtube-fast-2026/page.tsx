import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaUsers, FaChartLine, FaLightbulb, FaRocket, FaTools, FaPlay } from "react-icons/fa";

export const metadata: Metadata = {
  title: "How to Get 1000 Subscribers on YouTube Fast in 2026 | Proven Strategies",
  description: "Learn how to get 1000 YouTube subscribers fast in 2026. Proven strategies, tips, and tools to grow your channel and reach monetization requirements quickly.",
  keywords: ["get 1000 subscribers youtube", "youtube 1000 subscribers", "grow youtube channel", "youtube monetization requirements", "youtube subscribers fast"],
  openGraph: {
    title: "How to Get 1000 YouTube Subscribers Fast 2026",
    description: "Proven strategies to reach 1000 subscribers and get monetized on YouTube",
    url: `${siteConfig.url}/blog/get-1000-subscribers-youtube-fast-2026`,
    images: [`${siteConfig.url}/images/blog/1000-subscribers.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get 1000 YouTube Subscribers Fast 2026",
    description: "Proven strategies to reach 1000 subscribers and get monetized",
    images: [`${siteConfig.url}/images/blog/1000-subscribers.png`],
  },
  alternates: {
    canonical: "/blog/get-1000-subscribers-youtube-fast-2026",
    languages: {
      "en": "/blog/get-1000-subscribers-youtube-fast-2026",
      "x-default": "/blog/get-1000-subscribers-youtube-fast-2026",
    },
  },
};

const growthStrategies = [
  {
    title: "Optimize Your Channel Branding",
    description: "Create a professional banner, logo, and channel description. First impressions matter—viewers subscribe to channels that look established and trustworthy.",
    icon: <FaUsers className="text-red-500" />,
  },
  {
    title: "Post Consistently (2-3x Weekly)",
    description: "Consistency builds audience expectations. Channels posting 2-3 times weekly grow 3x faster than those posting randomly.",
    icon: <FaChartLine className="text-blue-500" />,
  },
  {
    title: "Create Searchable Content",
    description: "Target keywords people are searching for. Use tools like VidIQ or TubeBuddy to find low-competition, high-volume keywords in your niche.",
    icon: <FaLightbulb className="text-yellow-500" />,
  },
];

const quickWins = [
  {
    name: "Title Generator",
    description: "Create click-worthy titles that drive more views and subscribers.",
    link: "/tools/youtube-title-generator",
  },
  {
    name: "Tag Generator",
    description: "Optimize your video tags to appear in more search results.",
    link: "/tools/youtube-tag-generator",
  },
  {
    name: "Channel Audit",
    description: "Analyze your channel's growth potential and get personalized tips.",
    link: "/tools/youtube-channel-audit",
  },
];

export default function Get1000SubscribersPage() {
  const articleSchema = getArticleSchema({
    title: metadata.title as string,
    description: metadata.description as string,
    url: `${siteConfig.url}/blog/get-1000-subscribers-youtube-fast-2026`,
    imageUrl: `${siteConfig.url}/images/blog/1000-subscribers.png`,
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
    author: siteConfig.name,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Get 1000 Subscribers Fast", url: "/blog/get-1000-subscribers-youtube-fast-2026" },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold mb-6">
              <FaUsers className="text-lg" />
              Growth Guide 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              How to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">1000 Subscribers</span><br />
              on YouTube Fast
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Proven strategies to reach your first 1000 subscribers and unlock YouTube monetization in 2026.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-red-600 mb-2">1,000</div>
              <div className="text-slate-600 dark:text-slate-400">Subscribers needed for YPP</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-orange-600 mb-2">3-6 mo</div>
              <div className="text-slate-600 dark:text-slate-400">Average time to reach goal</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-800">
              <div className="text-3xl font-bold text-green-600 mb-2">2-3x</div>
              <div className="text-slate-600 dark:text-slate-400">Weekly posting recommended</div>
            </div>
          </div>

          {/* Strategies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Proven Growth Strategies</h2>
            <div className="grid gap-6">
              {growthStrategies.map((strategy, index) => (
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Free Tools to Help You Grow</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickWins.map((tool, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <FaTools className="text-red-500 text-xl" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    Try Now
                    <FaRocket className="text-sm" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Channel?</h2>
            <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
              Use our free YouTube tools to optimize your content and reach 1000 subscribers faster.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
            >
              <FaPlay className="text-xl" />
              Explore Free Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
