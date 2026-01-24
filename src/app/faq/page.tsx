import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaQuestionCircle, FaTools, FaRocket, FaShieldAlt, FaChartLine, FaUsers } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - YouTube Tools Hub",
  description: "Get answers to common questions about our free YouTube tools, AI features, pricing, and how to grow your channel faster with YouTube Tools Hub.",
  keywords: ["youtube tools faq", "youtube seo questions", "youtube creator tools help", "youtubetoolshub support"],
  openGraph: {
    title: "FAQ - YouTube Tools Hub",
    description: "Find answers about our free YouTube creator tools and AI features",
    url: `${siteConfig.url}/faq`,
    images: [`${siteConfig.url}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - YouTube Tools Hub",
    description: "Find answers about our free YouTube creator tools and AI features",
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const faqData = [
  {
    question: "Are YouTube Tools Hub really free?",
    answer: "Yes! All our core YouTube tools are completely free to use. We offer premium features for power users who need advanced analytics and unlimited usage, but the essential tools for thumbnail generation, title optimization, and basic analytics are 100% free.",
    category: "Pricing",
    icon: <FaRocket className="text-purple-500" />,
  },
  {
    question: "How does the AI thumbnail generator work?",
    answer: "Our AI thumbnail generator uses advanced computer vision and text generation models to create compelling thumbnail concepts. Simply describe your video topic, and our AI will suggest text overlays, color schemes, and visual elements that proven to increase click-through rates.",
    category: "Tools",
    icon: <FaTools className="text-blue-500" />,
  },
  {
    question: "Can I download thumbnails from any YouTube video?",
    answer: "Yes, our thumbnail downloader works with any public YouTube video. Just paste the video URL, and you can download thumbnails in various resolutions including HD (720p), Full HD (1080p), 4K, and even 8K when available.",
    category: "Tools",
    icon: <FaTools className="text-green-500" />,
  },
  {
    question: "How accurate are the earnings calculations?",
    answer: "Our earnings calculator uses real-time data from YouTube's RPM rates across different niches. While we can't guarantee exact amounts (as YouTube's algorithm is complex), our estimates are typically within 10-15% of actual earnings for most creators.",
    category: "Analytics",
    icon: <FaChartLine className="text-orange-500" />,
  },
  {
    question: "Do you store my YouTube channel data?",
    answer: "We prioritize your privacy. We only store data that you explicitly save to your account (like tool history or preferences). We never access your YouTube channel without permission, and all API calls are made securely with proper authentication.",
    category: "Privacy",
    icon: <FaShieldAlt className="text-red-500" />,
  },
  {
    question: "How many tools do you offer?",
    answer: "We currently offer 21+ specialized YouTube tools covering thumbnail optimization, SEO enhancement, analytics, content planning, and channel growth. New tools are added monthly based on creator feedback and industry trends.",
    category: "Features",
    icon: <FaTools className="text-indigo-500" />,
  },
  {
    question: "Can I use these tools for commercial purposes?",
    answer: "Absolutely! Our tools are designed for both individual creators and agencies managing multiple channels. Premium plans offer additional features for teams and agencies, including white-label options.",
    category: "Business",
    icon: <FaUsers className="text-teal-500" />,
  },
  {
    question: "What makes YouTube Tools Hub different from TubeBuddy or VidIQ?",
    answer: "While TubeBuddy and VidIQ focus mainly on analytics, we prioritize content creation and optimization. Our AI-powered tools help you create better content, not just analyze past performance. Plus, our core features are free, while competitors lock essential tools behind expensive subscriptions.",
    category: "Comparison",
    icon: <FaQuestionCircle className="text-purple-500" />,
  },
];

export default function FAQPage() {
  const faqSchema = getFAQSchema(faqData);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);

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
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Questions</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about YouTube Tools Hub and how our AI-powered features can help grow your channel faster.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="grid gap-6 mb-12">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-purple-100 text-lg mb-8">
              Our support team is here to help you succeed on YouTube.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/tools"
                className="px-8 py-4 bg-purple-700 text-white rounded-xl font-bold hover:bg-purple-800 transition-colors"
              >
                Try Our Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
