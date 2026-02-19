import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getCollectionPageSchema, getBreadcrumbSchema } from "@/lib/seo";
import { FaClock, FaUser, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { BlogCard } from "@/components/ui/Card";
import HorizontalAd from "@/components/ads/HorizontalAd";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";

export const metadata: Metadata = {
  title: "YouTube Strategy Blog 2026 – AI Growth & ROI Insights",
  description:
    "Master the 2026 algorithm with our expert guides on AI-native creation, high-RPM niche selection, and semantic SEO. Trusted by 100k+ professional creators.",
  keywords: [
    "youtube monetization tips 2026",
    "ai youtube strategy",
    "youtube roi optimization",
    "semantic seo for youtube",
    "youtube thumbnail psychology",
    "creator economy insights 2026",
    "youtube channel growth secrets",
  ],
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      "x-default": "/blog",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "YouTube Strategy Blog 2026 – AI Growth & ROI Insights",
    description:
      "Master the 2026 algorithm with expert guides on AI-native creation, high-RPM niche selection, and semantic SEO. Trusted by 100k+ professional creators.",
    type: "website",
    url: "https://www.youtubetoolshub.com/blog",
    images: [
      {
        url: "https://www.youtubetoolshub.com/og-image.png",
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
    images: ["https://www.youtubetoolshub.com/og-image.png"],
  },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const collectionSchema = getCollectionPageSchema({
    name: "YouTube Strategy Blog 2026",
    description: "Expert guides on AI-native creation, high-RPM niche selection, and YouTube growth strategies.",
    url: `${siteConfig.url}/blog`,
    items: blogPosts.map((post) => ({
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
          "Master the 2026 algorithm with expert guides on AI-native creation, high-RPM niche selection, and semantic SEO. Trusted by 100k+ professional creators.",
          "YouTube Tools Hub",
          "YouTube Growth Expert",
          new Date().toISOString(),
        )}
        entityType="WebPage"
        primaryTopic="YouTube Growth Strategy"
        conciseAnswer="YouTube Tools Hub's blog covers expert guides on YouTube SEO, AI tools, earnings optimization, thumbnail psychology, and channel growth strategies for 2026."
        keyFacts={[
          "Expert guides on YouTube SEO and AI tools",
          "Covers high-RPM niche selection strategies",
          "Updated for the 2026 YouTube algorithm",
          "Written by certified YouTube growth experts",
        ]}
      />
      {/* CollectionPage + ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="min-h-screen bg-slate-50 relative overflow-hidden">

        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10" />

        {/* Hero Section */}
        <section className="relative py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl shadow-purple-500/10">
                <FaBookOpen className="w-3 h-3" />
                Creator Intelligence 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  Strategy
                </span>{" "}
                Ledger
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
                No fluff. No generic advice. Just hard data and AI-native
                strategies designed to maximize your YouTube ROI in 2026.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" />

        {/* Featured Post */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-widest">
                Prime Insight
              </h2>
              <div className="h-px flex-1 bg-slate-200 ml-8 hidden md:block" />
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid lg:grid-cols-2 gap-12 items-center p-12 glass-premium border-white/40 rounded-[3rem] shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent -z-10" />

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 text-xs font-black bg-purple-500 text-white rounded-full mb-8 uppercase tracking-widest">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 group-hover:text-purple-600 transition-colors leading-[1.1] font-outfit tracking-tighter">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 mb-10 text-xl leading-relaxed line-clamp-3 font-outfit">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 font-black uppercase tracking-widest">
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

                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group-hover:rotate-1 transition-all duration-500 shadow-2xl hidden lg:block border-8 border-white/50">
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
                </div>
              </div>
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 mb-24" />

        {/* Ad: Between Featured and Other Posts */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <HorizontalAd />
        </div>

        {/* Other Posts */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-purple-500 font-black uppercase tracking-widest text-sm mb-4 block">
                  Knowledge Base
                </span>
                <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter">
                  Latest Strategic Guides
                </h2>
              </div>
              <p className="text-slate-400 max-w-md font-medium">
                Deep dives into the mechanics of growth, monetization, and
                automation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  category={post.category}
                  slug={post.slug}
                  className="bg-white/5 border-white/10 hover:bg-white/10"
                  dark={true}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 bg-white" />

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 -z-20" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-purple-500/10 blur-[150px] rounded-full -z-10" />

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                Action
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-outfit font-medium italic">
              "Knowledge without tools is just a dream. Strategy with automation
              is a business."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/tools"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-6 bg-slate-900 text-white rounded-full font-black text-xl transition-all shadow-2xl hover:scale-105 active:scale-95 group"
              >
                Launch Free Tools
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/tools/seo-tools"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-6 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-black text-xl transition-all hover:bg-slate-50 shadow-lg"
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

