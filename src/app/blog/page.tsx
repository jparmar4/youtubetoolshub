import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getIndexableBlogPosts } from "@/config/blog";
import { BLOG_CATEGORIES, getCategoryPostCounts } from "@/config/blog/categories";
import { siteConfig } from "@/config/site";
import { combineSchemasToGraph, getCollectionPageSchema, getBreadcrumbSchema, getGlobalAlternates } from "@/lib/seo";
import { FaClock, FaUser, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { BlogCard } from "@/components/ui/Card";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { Fragment } from "react";
import AdSlot from "@/components/ads/AdSlot";
import { AD_SLOTS, pickInArticleSlot } from "@/lib/adsense";

export const metadata: Metadata = {
  title: {
    absolute: "YouTube Growth Blog 2026 — SEO, CPM & Monetization",
  },
  description:
    "Free YouTube creator guides: SEO checklists, CPM/RPM explained, Shorts monetization, thumbnail psychology, algorithm tips, and AI tools for channel growth in 2026.",
  keywords: [
    "youtube monetization tips 2026",
    "youtube seo guide",
    "youtube cpm rates",
    "youtube algorithm 2026",
    "how to grow youtube channel",
    "youtube shorts monetization",
    "ai tools for youtube creators",
    "youtube thumbnail tips",
  ],
  alternates: getGlobalAlternates("/blog"),
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
  openGraph: {
    title: "YouTube Strategy Blog 2026 – AI Growth & ROI Insights",
    description:
      "Practical guides on AI-native creation, high-RPM niche selection, semantic SEO, and YouTube monetization workflows.",
    type: "website",
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "YouTube Tools Hub Blog – Strategy & Growth Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Strategy Blog 2026 – AI Growth & ROI Insights",
    description:
      "Master the 2026 algorithm with expert guides on AI-native creation, high-RPM niche selection, and semantic SEO.",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

export default function BlogPage() {
  // Cap initial HTML payload for Core Web Vitals — full archive still linked in sitemap/RSS
  const POSTS_ON_INDEX = 24;
  const blogPosts = getIndexableBlogPosts();
  const categoryPostCounts = getCategoryPostCounts();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, POSTS_ON_INDEX);
  const remainingCount = Math.max(0, blogPosts.length - POSTS_ON_INDEX);

  const collectionSchema = getCollectionPageSchema({
    name: "YouTube Strategy Blog 2026",
    description: "Expert guides on AI-native creation, high-RPM niche selection, and YouTube growth strategies.",
    url: `${siteConfig.url}/blog`,
    items: blogPosts.slice(0, POSTS_ON_INDEX).map((post) => ({
      name: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
    })),
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ]);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.blogPost(
          "YouTube Strategy Blog 2026 – AI Growth & ROI Insights",
          "Practical guides on AI-native creation, high-RPM niche selection, semantic SEO, and YouTube monetization workflows.",
          "YouTube Tools Hub",
          "Creator Tools Team",
          "2026-07-04T00:00:00.000Z",
        )}
        entityType="WebPage"
        primaryTopic="YouTube Growth Strategy"
        conciseAnswer="YouTube Tools Hub's blog covers expert guides on YouTube SEO, AI tools, earnings optimization, thumbnail psychology, and channel growth strategies for 2026."
        keyFacts={[
          "Expert guides on YouTube SEO and AI tools",
          "Covers high-RPM niche selection strategies",
          "Practical creator monetization and planning workflows",
          "Written for creators, marketers, and agencies",
        ]}
        pathname="/blog"
      />
      {/* CollectionPage + ItemList + Breadcrumb JSON-LD (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combineSchemasToGraph(collectionSchema, breadcrumbSchema)),
        }}
      />
      <div className="min-h-screen bg-slate-50 relative overflow-hidden">

        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

        {/* Hero Section */}
        <section className="relative py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-purple-500/10">
                <FaBookOpen className="w-3 h-3" />
                Creator Intelligence 2026
              </span>
              <h1
                className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter font-outfit"
                data-speakable
              >
                YouTube{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  Growth Blog
                </span>{" "}
                — SEO, Monetization &amp; AI Tools
              </h1>
              <p
                className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium summary"
                data-speakable
              >
                Practical guides on YouTube SEO, CPM/RPM earnings, Shorts
                monetization, thumbnail strategy, and free AI tools — written for
                creators who want clear steps, not fluff.
              </p>
            </div>
          </div>
        </section>

        {/* Browse by topic — canonical category hubs */}
        <section aria-label="Browse topics by category" className="pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 text-center">
              Browse by topic
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {BLOG_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-semibold hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-colors shadow-sm"
                >
                  {category.name}
                  <span className="text-slate-500 font-normal"> · {categoryPostCounts[category.slug] ?? 0}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10">
          <AdSlot slot={AD_SLOTS.HEADER} preset="leaderboard" />
        </div>

        {/* Featured Post */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-widest">
                Prime Insight
              </h2>
              <div className="h-px flex-1 bg-slate-200 ml-8 hidden md:block" />
            </div>

            <ScrollReveal>
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12 card-3d rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent -z-10" />

                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 text-xs font-black bg-purple-700 text-white rounded-full mb-6 uppercase tracking-widest">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-5 group-hover:text-purple-600 transition-colors leading-[1.1] font-outfit tracking-tighter">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-600 mb-8 text-lg sm:text-xl leading-relaxed line-clamp-3 font-outfit">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm text-slate-600 font-black uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <FaUser className="text-purple-500" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaClock className="text-purple-500" />
                        {featuredPost.readTime}
                      </span>
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>

                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group-hover:rotate-1 transition-all duration-500 shadow-2xl hidden lg:block border-8 border-white/50 bg-slate-100">
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center text-white">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-125 transition-transform duration-700">
                            <FaBookOpen className="w-10 h-10" />
                          </div>
                          <span className="font-black text-xs uppercase tracking-[0.3em] opacity-50">
                            Strategy Guide
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 mb-14" />

        {/* Ad: Between Featured and Other Posts */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <AdSlot slot={AD_SLOTS.IN_ARTICLE[0]} preset="in-article" />
        </div>

        {/* Other Posts */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="text-purple-400 font-black uppercase tracking-widest text-sm mb-3 block">
                    Knowledge Base
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit tracking-tighter">
                    Latest Strategic Guides
                  </h2>
                </div>
                <p className="text-slate-300 max-w-md font-medium">
                  Deep dives into the mechanics of growth, monetization, and
                  automation.
                </p>
              </div>
            </ScrollReveal>

            {/* Cards reveal individually so the interleaved in-article ad slots
                (full-width grid items below) stay outside every reveal wrapper. */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherPosts.map((post, i) => (
                <Fragment key={post.slug}>
                  <ScrollReveal>
                    <BlogCard
                      title={post.title}
                      excerpt={post.excerpt}
                      date={post.date}
                      category={post.category}
                      slug={post.slug}
                      coverImage={post.coverImage}
                      coverAlt={post.title}
                      className="bg-white/5 border-white/10 hover:bg-white/10"
                      dark={true}
                    />
                  </ScrollReveal>
                  {(i + 1) % 6 === 0 && (
                    <AdSlot
                      slot={pickInArticleSlot(Math.floor(i / 6))}
                      preset="in-article"
                      className="md:col-span-2 lg:col-span-3 my-4 border-white/10 bg-white/5 [&_p]:text-slate-300"
                    />
                  )}
                </Fragment>
              ))}
            </div>
            {remainingCount > 0 && (
              <p className="mt-12 text-center text-slate-300 text-sm">
                Showing {POSTS_ON_INDEX} of {blogPosts.length} guides. Browse by
                topic on our{" "}
                <Link href="/blog/category/channel-growth" className="text-purple-300 hover:text-purple-200 underline">
                  category hubs
                </Link>
                , the{" "}
                <Link href="/feed.xml" className="text-purple-300 hover:text-purple-200 underline">
                  RSS feed
                </Link>
                , or search{" "}
                <Link href="/search" className="text-purple-300 hover:text-purple-200 underline">
                  all articles
                </Link>
                .
              </p>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <AdSlot slot={AD_SLOTS.MULTIPLEX} preset="multiplex" label="Sponsored Recommendations" />
        </div>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 -z-20" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-purple-500/10 blur-[150px] rounded-full -z-10" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter font-outfit">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                Action
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto font-outfit font-medium italic">
              &ldquo;Knowledge without tools is just a dream. Strategy with automation
              is a business.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/tools"
                className="btn-3d-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg group"
              >
                Launch Free Tools
                <FaArrowRight className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/tools/seo-tools"
                className="btn-3d-glass w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg"
              >
                Master SEO
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
