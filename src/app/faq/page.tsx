import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import {
  combineSchemasToGraph,
  getFAQSchema,
  getBreadcrumbSchema,
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
import AdSlot from "@/components/ads/AdSlot";
import FaqAccordion from "@/components/ui/FaqAccordion";
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "FAQ — Free YouTube Creator Tools | YouTube Tools Hub",
  },
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
    canonical: `${siteConfig.url}/faq`,
    languages: {
      en: `${siteConfig.url}/faq`,
      "x-default": `${siteConfig.url}/faq`,
    },
  },
  openGraph: {
    title: { absolute: "FAQ - YouTube Tools Hub" },
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
    answer: `We currently offer ${tools.length} specialized tools. This includes the Earning Calculator, SEO Optimizer, and specialized Utility tools. We add roughly one new tool every 4-6 weeks based on community demand.`,
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
      "Yes. Agencies can use the tools for client research, metadata drafting, and earnings planning. Review outputs before publishing on behalf of clients.",
    category: "Commercial",
    icon: <FaQuestionCircle className="text-purple-500" />,
  },
  {
    question: "What is a free TubeBuddy or VidIQ alternative?",
    answer:
      "YouTube Tools Hub is a free browser-based alternative for common creator tasks: tag generation, title ideas, thumbnail download, channel audit, and earnings estimates — without installing a browser extension.",
    category: "Overview",
    icon: <FaTools className="text-pink-500" />,
  },
  {
    question: "How do I download a YouTube thumbnail in HD?",
    answer:
      "Open the free YouTube Thumbnail Downloader, paste any video or Shorts URL, and download available public thumbnail sizes (including max resolution when YouTube provides it). No account required.",
    category: "Features",
    icon: <FaRocket className="text-rose-500" />,
  },
  {
    question: "How much does YouTube pay per 1,000 views?",
    answer:
      "YouTube creator revenue is usually measured as RPM (revenue per 1,000 views). Typical ranges are about $0.25–$12+ depending on country, niche, and seasonality. Use the free Earnings Calculator for country-level estimates, then verify in YouTube Studio.",
    category: "Monetization",
    icon: <FaChartLine className="text-green-500" />,
  },
];

// Group questions by category (first-appearance order); each group keeps a
// colored icon seeded from the first question in that category.
const faqGroups: { category: string; icon: ReactNode; items: FaqItem[] }[] = [];
faqData.forEach((faq) => {
  let group = faqGroups.find((g) => g.category === faq.category);
  if (!group) {
    group = { category: faq.category, icon: faq.icon, items: [] };
    faqGroups.push(group);
  }
  group.items.push({ question: faq.question, answer: faq.answer });
});

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

  return (
    <>
      <GeoAeoHead {...GEO_AEO_PRESETS.faqPage} pathname="/faq" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combineSchemasToGraph(faqSchema, breadcrumbSchema)),
        }}
      />

      <div className="min-h-screen pt-10 sm:pt-14 pb-20 relative overflow-hidden">
        <div className="nebula-bg" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tighter"
              data-speakable
            >
              YouTube Tools FAQ — Free Creator Tools, SEO &amp; Earnings
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-outfit faq-summary">
              Everything you need to know about mastering the algorithm with our
              creator tool suite.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8 mb-12">
            {faqGroups.map((group) => (
              <div
                key={group.category}
                className="card-3d rounded-3xl p-6 sm:p-8 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 shadow-xs flex items-center justify-center">
                    {group.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-outfit">
                    {group.category}
                  </h2>
                </div>
                <FaqAccordion items={group.items} headingLevel="h3" />
              </div>
            ))}
          </div>

          {/* Ad placement (auto-collapses when unfilled) */}
          <AdSlot slot="7688425196" preset="leaderboard" lazy className="my-8" />

          {/* Contact Support */}
          <div className="relative group overflow-hidden rounded-[2.5rem] p-1 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-gradient" />
            <div className="relative bg-slate-900 rounded-[2.4rem] p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-black mb-4 font-outfit tracking-tight">
                Still have questions?
              </h2>
              <p className="text-slate-300 text-lg sm:text-xl mb-8 max-w-xl mx-auto font-outfit">
                Our growth experts are active in the community. Reach out for
                technical help or strategic advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  Contact Experts
                  <FaArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools"
                  className="px-8 py-4 bg-white/10 text-white border border-white/25 rounded-2xl font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md"
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
