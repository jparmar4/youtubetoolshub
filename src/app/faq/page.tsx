import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import {
  getFAQSchema,
  getBreadcrumbSchema,
  getSpeakableSchema,
} from "@/lib/seo";
import Link from "next/link";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import {
  FaQuestionCircle,
  FaTools,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import HorizontalAd from "@/components/ads/HorizontalAd";
import MultiplexAd from "@/components/ads/MultiplexAd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - YouTube Creator Tools",
  description:
    "Get answers to common questions about YouTube Tools Hub, free creator tools, AI-assisted features, and monetization calculators.",
  keywords: [
    "youtube tools faq",
    "youtube seo help",
    "how to use ai for youtube",
    "monetization calculator help",
    "youtubetoolshub support",
    "youtube tools hub questions",
    "free youtube tools help",
    "youtube earnings calculator faq",
  ],
  alternates: {
    canonical: "/faq",
    
  },
  openGraph: {
    title: "FAQ - YouTube Tools Hub",
    description:
      "Find answers about YouTube Tools Hub creator tools, AI-assisted features, and monetization calculators.",
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
      "Get answers to common questions about YouTube creator tools, AI-assisted features, and monetization calculators.",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const faqData = [
  {
    question: "Is YouTube Tools Hub free to use?",
    answer:
      "Yes. The core creator tools are free to use. Some features may have usage limits or optional account-based access, but you can use the main tools without a paid plan.",
    category: "Pricing",
    icon: <FaRocket className="text-purple-500" />,
  },
  {
    question: "How should I use the AI Thumbnail Generator?",
    answer:
      "Use generated thumbnail concepts as drafts. Check that the image matches your actual video, add readable text carefully, and avoid visuals that exaggerate or mislead viewers.",
    category: "AI Tools",
    icon: <FaTools className="text-blue-500" />,
  },
  {
    question: "Do I need to connect my YouTube account?",
    answer:
      "No. Most tools work without private YouTube account access. Some public-data tools may use a video, channel, or playlist URL, but they do not ask for your YouTube password.",
    category: "Security",
    icon: <FaShieldAlt className="text-red-500" />,
  },
  {
    question: "Can I use these tools for YouTube Shorts?",
    answer:
      "Yes. Several tools can help draft Shorts titles, hashtags, scripts, and planning notes. Review the output for accuracy and fit before publishing.",
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
    question: "How should I review generated metadata?",
    answer:
      "The tools are designed to encourage relevant metadata rather than keyword stuffing. You should still review every title, tag, and description against YouTube's current policies before publishing.",
    category: "SEO",
    icon: <FaUsers className="text-teal-500" />,
  },
  {
    question: "How are earnings estimates calculated?",
    answer:
      "The Earnings Calculator uses RPM and CPM assumptions by country or niche to create planning estimates. Your actual revenue depends on audience location, niche, ad demand, seasonality, and YouTube Studio data.",
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
      "Get answers to common questions about YouTube Tools Hub, free creator tools, AI-assisted features, and monetization calculators.",
    cssSelectors: ["h1", ".faq-summary"],
  });

  return (
    <>
      <GeoAeoHead {...GEO_AEO_PRESETS.faqPage} pathname="/faq" />
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
              creator tool suite.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="grid gap-6 mb-20">
            {faqData.map((faq, index) => (
              <React.Fragment key={index}>
                <div
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
                {/* Ad: Midway through FAQ list */}
                {index === Math.floor(faqData.length / 2) - 1 && (
                  <HorizontalAd />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Ad: Multiplex at bottom of FAQ */}
          <div className="mb-12">
            <MultiplexAd />
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
