import Link from "next/link";
import { FaArrowRight, FaRocket, FaCheck, FaBolt, FaStar, FaBrain, FaMagic, FaChartPie } from "react-icons/fa";
import { ToolCard, BlogCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import HorizontalAd from "@/components/ads/HorizontalAd";
import MultiplexAd from "@/components/ads/MultiplexAd";

import { getFeaturedTools, tools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import SmartWorkflow from "@/components/home/SmartWorkflow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Tools Hub – 15+ Free AI Tools | Thumbnail Generator, Earnings Calculator 2026",
  description: "🚀 Grow your YouTube channel FREE with 15+ AI tools. Generate viral thumbnails, calculate CPM earnings, extract competitor tags, and optimize SEO. Trusted by 100,000+ creators worldwide in 2026.",
  keywords: [
    "youtube tools free 2026",
    "youtube earnings calculator",
    "youtube thumbnail generator ai",
    "youtube monetization calculator",
    "youtube cpm calculator by country",
    "free youtube seo tools",
    "youtube revenue estimator",
    "ai tools for youtube creators",
    "youtube tag generator free",
    "youtube growth tools"
  ],
  alternates: {
    canonical: "/",
  },
};

const homeFAQs = [
  {
    question: "Is YouTube Tools Hub really 100% free for 2026?",
    answer: "Absolutely. We are committed to democratizing growth tools. Our entire professional suite—including AI Click-Through Prediction, Revenue Calculators, and SEO Tag Generators—is free for all creators with no hidden costs."
  },
  {
    question: "How does the 'AI Team' concept work?",
    answer: "We don't just provide text. Our AI functions as your virtual production team, analyzing over 500,000 successful videos from 2025-2026 to provide creative direction, psychological thumbnail triggers, and algorithmic safety checks."
  },
  {
    question: "Are these tools compliant with YouTube Policies?",
    answer: "Yes. Every tool we build follows the latest YouTube Community Guidelines and Google Safe Search standards. Our semantic SEO focus ensures you avoid 'keyword stuffing' while maximizing relevance."
  },
  {
    question: "Can I use these for YouTube Shorts and Long-form?",
    answer: "Yes. Our engines have specific modes for Shorts shelf velocity and Long-form search intent, ensuring your content is optimized for the specific algorithm that governs its format."
  },
  {
    question: "What is the 'ROI-Focused' Analytics tool?",
    answer: "Unlike basic calculators, our ROI tools factor in 2026 inflation, niche seasonal trends, and regional CPM shifts to give you a business-grade revenue projection for your channel."
  },
  {
    question: "Do I need technical skills to use the AI tools?",
    answer: "No. We've designed the suite for frictionless use. Just paste a link or describe an idea, and our AI does the heavy lifting, providing professional-grade outputs in seconds."
  }
];

// Get the 3 most recent blog posts
const blogPosts = getAllBlogPosts().slice(0, 3);

const benefits = [
  { icon: FaBrain, title: "AI-Native Workflow", description: "Seamlessly integrate machine learning into your ideation, research, and scripting phases." },
  { icon: FaMagic, title: "Creative Leverage", description: "Automate the data-heavy tasks so you can focus 100% on your unique personality and story." },
  { icon: FaChartPie, title: "Data-Driven ROI", description: "Make decisions based on 2026 audience benchmarks and revenue-per-mille projections." },
  { icon: FaCheck, title: "Zero Friction", description: "Instant access to professional-grade tools with no account requirements or credit cards." },
];

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Midnight Nebula */}
      <section className="relative overflow-hidden min-h-[95vh] flex items-center justify-center">
        <div className="nebula-bg" />

        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-purple-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
              <FaBrain className="text-pink-500 animate-glow-pulse" />
              Empowering the AI-Native Creator 2026
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 mb-8 tracking-tighter font-outfit leading-[0.9]">
              Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600">YouTube</span> <br />
              <span className="italic">Exponentially.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
              The world&apos;s most advanced suite of <strong>16+ professional-grade AI tools</strong> is now yours. From click-through prediction to revenue ROI—completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/tools">
                <Button size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white shadow-2xl border-none font-black px-12 py-8 text-xl rounded-full transition-all hover:scale-105 active:scale-95">
                  <FaRocket className="mr-2" />
                  Explore Free Suite
                </Button>
              </Link>
              <Link href="/tools/youtube-earnings-calculator">
                <Button variant="outline" size="lg" className="w-full sm:w-auto glass-premium hover:!bg-white/90 border-white/60 text-slate-900 font-bold px-12 py-8 text-xl rounded-full backdrop-blur-md shadow-xl transition-all hover:scale-105">
                  Calculate Channel ROI
                </Button>
              </Link>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-24 max-w-6xl mx-auto border-t border-slate-200/50 pt-12 animate-fade-in-up delay-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70">
              <div className="text-center">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">100K+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Creators Empowered</div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">35M+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Insights Generated</div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">2026</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Algorithm Optimized</div>
              </div>
              <div className="text-center border-l border-slate-200/50">
                <div className="text-4xl font-black text-slate-900 font-outfit mb-1">Zero</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Monthly Fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad: Contextual Placement */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <HorizontalAd />
      </div>

      {/* Tools Showcase */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Featured Intelligence
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-outfit font-medium">
              Highly specialized tools that perform millions of calculations to ensure your channel stays ahead of the curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                icon={<tool.icon />}
                title={tool.name}
                description={tool.shortDescription}
                href={`/tools/${tool.slug}`}
                isAI={tool.isAI}
                className="glass-premium border-white/40 hover:-translate-y-4 transition-all duration-500 shadow-sm hover:shadow-2xl hover:border-purple-500/20"
              />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/tools">
              <Button size="lg" className="bg-slate-900 text-white rounded-full px-12 py-6 text-xl font-black shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 group">
                Access All {tools.length} Tools
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority & Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.9] font-outfit tracking-tight">
                Data Patterns <br />
                <span className="text-purple-600">Trumping Luck.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: FaMagic, title: "Psychological Triggers", text: "Our models identify curiosity gaps and emotional hooks that stop the scroll.", color: "bg-purple-600" },
                  { icon: FaBrain, title: "Algorithmic safety", text: "We ensure every piece of metadata is 100% compliant with 2026 guidelines.", color: "bg-pink-600" },
                  { icon: FaStar, title: "E-E-A-T Verified", text: "Insights backed by professional growth experts, not just random AI scripts.", color: "bg-indigo-600" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 rounded-[2rem] glass-premium border-white/40 hover:border-purple-500/20 transition-all duration-500 shadow-sm">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2 font-outfit">{item.title}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] glass-premium rounded-[4rem] p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-950 p-16 flex flex-col justify-end text-white">
                  <h3 className="text-4xl font-black font-outfit mb-4">The 2026 Standard</h3>
                  <p className="text-xl text-purple-100/80 font-medium leading-relaxed mb-6">"Our tools are updated every 48 hours to match the shifting volatility of the YouTube Recommendation Engine."</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black">EE</div>
                    <div>
                      <div className="font-bold">E-E-A-T Compliance Team</div>
                      <div className="text-xs text-purple-300 font-bold uppercase tracking-widest">Growth Expert Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SmartWorkflow />

      {/* Benefits Bridge */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Why Creators Scaling to <span className="text-gradient">7-Figures</span> Trust Us
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-outfit font-medium italic">
              "We provide the enterprise-level leverage that was previously only available to the biggest media agencies—now 100% free."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="glass-premium rounded-[2.5rem] p-10 text-center border-white/60 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto mb-8 rounded-[1.5rem] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="font-black text-2xl text-slate-900 mb-4 font-outfit tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-outfit font-medium">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic FAQ Section for GEO/AEO */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 text-balance">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Mastering the <span className="text-purple-600">Algorithm</span>
            </h2>
            <p className="text-xl text-slate-500 font-outfit font-medium">Insights and technical guidance for the 2026 YouTube landscape.</p>
          </div>
          <div className="space-y-12">
            {homeFAQs.map((faq, i) => (
              <div key={i} className="glass-premium p-10 rounded-[2.5rem] border-white/60 hover:shadow-xl transition-all duration-500 relative">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4 font-outfit">
                  <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">Q</span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed text-xl font-outfit font-medium pl-14">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/faq" className="text-purple-600 font-black text-xl hover:underline underline-offset-8">Read Growth Documentation →</Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Insights */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 font-outfit tracking-tighter">
              Latest Growth Insights
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-outfit font-medium">
              Daily strategies and tool application guides for the modern media business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                slug={post.slug}
                className="glass-premium border-white/40 shadow-sm"
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog">
              <Button variant="ghost" className="text-purple-600 font-black text-xl hover:bg-white/50 px-10 py-5 rounded-full">
                View All Intelligence
                <FaArrowRight className="ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad: Content Discovery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <MultiplexAd />
      </div>

      {/* Heroic CTA Section */}
      <section className="py-32 relative overflow-hidden mx-4 md:mx-8 mb-8 rounded-[5rem]">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="nebula-bg opacity-50 absolute inset-0" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 py-16">
          <h2 className="text-6xl md:text-9xl font-black text-white mb-12 tracking-tighter font-outfit leading-[0.85]">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Transcend</span> the Algorithm?
          </h2>
          <p className="text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-outfit font-medium">
            Join 100,000+ creators scaling their vision with the world&apos;s most advanced free AI growth suite.
          </p>
          <Link href="/tools">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-black px-16 py-10 h-auto text-3xl rounded-full shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-all hover:scale-105 active:scale-95 group">
              Get Started Free
              <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Button>
          </Link>
          <div className="mt-12 text-slate-500 font-black text-xs uppercase tracking-[0.3em]">
            No Account Required • Instant Results • Scale Effortlessly
          </div>
        </div>
      </section>
    </div>
  );
}
