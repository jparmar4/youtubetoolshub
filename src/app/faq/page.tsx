import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import {
  getFAQSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
} from "@/lib/seo";
import Link from "next/link";
import {
  FaQuestionCircle,
  FaTools,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - YouTube Growth & AI Suite 2026",
  description:
    "Get expert answers to common questions about our free YouTube tools, AI-powered features, monetization calculators, and 2026 growth strategies.",
  keywords: [
    "youtube tools faq",
    "youtube seo help 2026",
    "how to use ai for youtube",
    "monetization calculator help",
    "youtubetoolshub support",
    "youtube tools hub questions",
    "free youtube tools help",
    "youtube earnings calculator faq",
  ],
  alternates: {
    canonical: "/faq",
    languages: {
      en: "/faq",
      "x-default": "/faq",
    },
  },
  openGraph: {
    title: "FAQ - YouTube Tools & AI Growth Suite 2026",
    description:
      "Find answers about our free professional-grade YouTube creator tools and AI features. 21+ free tools, no signup required.",
    type: "website",
    url: `${siteConfig.url}/faq`,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "YouTube Tools Hub FAQ – Frequently Asked Questions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – YouTube Tools Hub | Free AI Tools for Creators",
    description:
      "Get expert answers to common questions about our 21+ free YouTube tools, AI features, monetization calculators, and growth strategies.",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const faqData = [
  {
    question: "Is YouTube Tools Hub really 100% free?",
    answer:
      "Yes, our core mission is democratization. In 2026, while many tools have moved to subscription models, we maintain our entire professional suite—including AI thumbnail generation and advanced SEO tools—completely free for all creators.",
    category: "Pricing",
    icon: <FaRocket className="text-purple-500" />,
  },
  {
    question: "How accurate is the 2026 AI Thumbnail Generator?",
    answer:
      "Our AI is trained on over 500,000 high-CTR thumbnails from 2024-2025. It analyzes color psychology, curiosity gaps, and mobile readability to ensure your concepts are optimized for the latest YouTube mobile app layout.",
    category: "AI Tools",
    icon: <FaTools className="text-blue-500" />,
  },
  {
    question: "Do I need to connect my YouTube account?",
    answer:
      "No. Unlike other platforms, we don't require API access to your channel for 95% of our tools. We prioritize your security and believe you should be able to optimize your channel without sharing private credentials.",
    category: "Security",
    icon: <FaShieldAlt className="text-red-500" />,
  },
  {
    question: "Can I use these tools for YouTube Shorts?",
    answer:
      "Absolutely. Our Hashtag Generator and Title Optimizer have specific 'Shorts Mode' logic that helps you tap into the high-velocity shelf algorithm for vertical video.",
    category: "Features",
    icon: <FaChartLine className="text-emerald-500" />,
  },
  {
    question: "How many tools are currently in the suite?",
    answer: `We currently offer ${tools.length}+ specialized tools. This includes the Earning Calculator, SEO Optimizer, and specialized Utility tools. We add roughly one new tool every 4-6 weeks based on community demand.`,
    category: "Overview",
    icon: <FaTools className="text-indigo-500" />,
  },
  {
    question: "Is the data 'Algorithm-Safe'?",
    answer:
      "Yes. All metadata generated (titles, descriptions, tags) adheres to YouTube's 2026 Community Guidelines and Spam Policies. We focus on semantic relevance rather than keyword stuffing.",
    category: "SEO",
    icon: <FaUsers className="text-teal-500" />,
  },
  {
    question: "How are earnings estimates calculated?",
    answer:
      "Our Earnings Calculator uses a proprietary 2026 RPM Index that tracks advertising shifts across 40+ niches. It factors in seasonal trends and regional variations to give you highly realistic revenue predictions.",
    category: "Monetization",
    icon: <FaChartLine className="text-orange-500" />,
  },
  {
    question: "Can I use these tools for my agency?",
    answer:
      "Yes. Agencies are invited to use our tools for client research. We allow unlimited exports and reports so you can provide data-driven growth plans to your creators without extra costs.",
    category: "Commercial",
    icon: <FaQuestionCircle className="text-purple-500" />,
  },
];

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  const speakableSchema = getSpeakableSchema({
    url: `${siteConfig.url}/faq`,
    headline: "Frequently Asked Questions",
    summary:
      "Get expert answers to common questions about our free YouTube tools, AI-powered features, monetization calculators, and 2026 growth strategies.",
    cssSelectors: ["h1", ".faq-summary"],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        <div className="nebula-bg" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 font-outfit tracking-tighter">
              Common{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Questions
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-outfit faq-summary">
              Everything you need to know about mastering the algorithm with our
              2026 AI-powered creator suite.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="grid gap-6 mb-20">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="glass-premium rounded-3xl p-8 border-white/40 hover:border-purple-500/30 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/60 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {faq.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-slate-900 font-outfit">
                        {faq.question}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-700">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed font-outfit font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="relative group overflow-hidden rounded-[3rem] p-1 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-gradient" />
            <div className="relative bg-slate-900 rounded-[2.9rem] p-12 text-center text-white">
              <h2 className="text-4xl font-black mb-4 font-outfit tracking-tight">
                Still have questions?
              </h2>
              <p className="text-slate-400 text-xl mb-10 max-w-xl mx-auto font-outfit">
                Our growth experts are active in the community. Reach out for
                technical help or strategic advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  Contact Experts
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools"
                  className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-full font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  Try the Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
