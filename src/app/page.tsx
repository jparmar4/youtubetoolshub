import Link from "next/link";
import { FaArrowRight, FaRocket, FaCheck, FaBolt, FaStar } from "react-icons/fa";
import { ToolCard, BlogCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { getFeaturedTools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import SmartWorkflow from "@/components/home/SmartWorkflow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Tools Hub – FREE AI Monetization & Growth Tools for Creators 2026",
  description: "Trust 50,000+ creators with pro YouTube tools. Calculate earnings, optimize CPM, get 4K thumbnails & viral titles. Free monetization calculator!",
  keywords: [
    "youtube monetization tools",
    "youtube earnings calculator usa",
    "youtube cpm calculator",
    "youtube revenue estimator",
    "youtube growth software",
    "ai youtube tools",
    "youtube business tools",
    "professional youtube marketing",
    "youtube automation software",
    "youtube channel management"
  ],
  alternates: {
    canonical: "/",
  },
};


// Get the 3 most recent blog posts
const blogPosts = getAllBlogPosts().slice(0, 3);

const benefits = [
  { icon: FaRocket, title: "Save Time", description: "Automate tedious tasks and focus on creating content" },
  { icon: FaBolt, title: "Boost Growth", description: "Optimize your SEO with AI-powered suggestions" },
  { icon: FaStar, title: "Daily Free Credits", description: "Get generous daily limits for all our powerful AI tools" },
  { icon: FaCheck, title: "Free & Pro Plans", description: "Start for free, then upgrade for higher limits and priority" },
];

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Midnight Nebula */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="nebula-bg" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm animate-glow-pulse">
              AI-Powered YouTube Growth
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
              Grow Your Channel <br />
              <span className="text-gradient">Faster Than Light</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Supercharge your creative workflow with our suite of free, professional-grade AI tools.
              Optimize titles, thumbnails, and SEO in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/tools">
                <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-lg border-none">
                  <FaRocket className="mr-2" />
                  Explore All Tools
                </Button>
              </Link>
              <Link href="/tools/youtube-thumbnail-downloader">
                <Button variant="outline" size="lg" className="w-full sm:w-auto glass-premium hover:!bg-white/90 border-slate-200 text-slate-700 hover:!text-slate-900">
                  Try Thumbnail Downloader
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar - Floating Glass */}
          <div className="mt-20 glass-premium rounded-2xl p-8 max-w-5xl mx-auto animate-fade-in-up delay-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50K+", label: "Active Creators" },
                { value: "10M+", label: "Videos Optimized" },
                { value: "100%", label: "Free Forever" },
                { value: "4.9/5", label: "User Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Ad: Homepage Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      </div>

      {/* Featured Tools Section */}
      <section className="py-24 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Popular Tools
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Start with our most popular tools loved by thousands of creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                icon={<tool.icon />}
                title={tool.name}
                description={tool.shortDescription}
                href={`/tools/${tool.slug}`}
                isAI={tool.isAI}
                // @ts-ignore - passing extra prop for new design if supported or will be ignored
                className="glass-premium hover:-translate-y-2 transition-transform duration-300"
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/tools">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg border-none px-8 py-4 text-lg font-bold">
                View All Tools
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SmartWorkflow />

      {/* Benefits Section */}
      <section className="py-24 bg-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Creators Choose Us
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need to grow your YouTube channel in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="glass-premium rounded-2xl p-8 text-center hover:bg-white/50 transition-colors group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Latest Insights
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Tips, tricks, and guides to help you succeed on YouTube
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                slug={post.slug}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                Read More Articles
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-100/50" />
        <div className="nebula-bg opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who use our free tools to save time and grow their audience.
          </p>
          <Link href="/tools">
            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-10 py-4 h-auto text-lg shadow-xl">
              Start Creating Now
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
