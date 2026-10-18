import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  getSoftwareApplicationSchema,
  getFAQSchema,
  getHowToSchema,
  getBreadcrumbSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QuickAnswerCapsule from "@/components/seo/QuickAnswerCapsule";
import TranscriptDownloader from "@/components/tools/TranscriptDownloader";
import ShareButtons from "@/components/ui/ShareButtons";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import GoogleAd from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/lib/adsense";
import {
  FaFileAlt,
  FaSearch,
  FaTags,
  FaDownload,
  FaCheckCircle,
  FaArrowRight,
  FaRobot,
  FaUniversalAccess,
} from "react-icons/fa";

const pageUrl = `${siteConfig.url}/youtube-transcript-downloader`;

export const metadata: Metadata = {
  title: "YouTube Transcript Downloader & Keyword Extractor (Free, 2026)",
  description:
    "Extract and download YouTube transcripts and subtitles free. Export as plain text, SRT, or CSV with timestamps. Analyze spoken keywords and repurpose video dialogue into articles.",
  keywords: [
    "youtube transcript downloader",
    "download youtube transcript free",
    "extract subtitles from youtube",
    "youtube transcript keyword research",
    "youtube to text converter",
    "copy youtube transcript",
    "download srt from youtube",
    "youtube closed captions download",
    "free youtube transcript extractor",
  ],
  alternates: getGlobalAlternates("/youtube-transcript-downloader"),
  openGraph: {
    title: "YouTube Transcript Downloader & Keyword Extractor (Free, 2026)",
    description:
      "Instantly extract text transcripts and closed captions from any YouTube video. Clean formatting, timestamps toggle, SRT download, and spoken SEO keyword analysis.",
    type: "website",
    url: pageUrl,
    images: [
      {
        url: `${siteConfig.url}/images/blog/youtube-transcript-downloader-keyword-extractor-hero.webp`,
        width: 1376,
        height: 768,
        alt: "YouTube Transcript Downloader and Keyword Extractor Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Transcript Downloader & Keyword Extractor (Free)",
    description:
      "Extract synchronized subtitles, plain text, and high-frequency SEO keywords from YouTube videos in seconds.",
    images: [`${siteConfig.url}/images/blog/youtube-transcript-downloader-keyword-extractor-hero.webp`],
  },
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
};

const toolFAQs = [
  {
    question: "How do I download a YouTube transcript for free?",
    answer:
      "Paste any YouTube video link or 11-character video ID into the search bar above, click 'Extract Transcript', and choose your preferred export format: Plain Text (for copying into LLMs or docs), SRT (for video editors and captions), or CSV (for spreadsheet analysis). The tool is 100% free with no registration required.",
  },
  {
    question: "Can I extract YouTube subtitles without timestamps?",
    answer:
      "Yes. Click the 'Plain Text' toggle inside the transcript viewer. This strips out all timecodes and paragraph breaks, giving you a clean, contiguous block of raw video dialogue ready to paste into ChatGPT, Claude, Google Docs, or your blog editor.",
  },
  {
    question: "How does YouTube transcript keyword research work?",
    answer:
      "YouTube's neural recommendation algorithms transcribe spoken dialogue to index topic relevance. Our tool analyzes word and phrase frequencies across the entire transcript, highlighting the exact semantic entities and secondary keywords top-ranking creators repeatedly speak in their videos.",
  },
  {
    question: "Does this transcript downloader work on YouTube Shorts?",
    answer:
      "Yes. You can paste any YouTube Shorts URL (e.g., youtube.com/shorts/VIDEO_ID). If the Short includes spoken dialogue or automatic closed captions, the tool will extract the text accurately.",
  },
  {
    question: "Is downloading YouTube transcripts legal?",
    answer:
      "Yes. Public transcripts are accessible via YouTube's web interface and official player APIs for accessibility purposes. Using transcripts for research, studying competitor topics, generating summaries, or personal study complies with Fair Use principles. Do not republish full copyrighted video scripts without attribution.",
  },
];

const howToSteps = [
  {
    name: "Copy the YouTube Video Link",
    text: "Navigate to the YouTube video or Short you want to analyze and copy the URL from your browser address bar or the YouTube 'Share' button.",
  },
  {
    name: "Paste URL into Transcript Downloader",
    text: "Paste the URL into the input field above and click 'Extract Transcript'.",
  },
  {
    name: "Choose Your Export Format",
    text: "Toggle between Timestamps, Plain Text, or SRT subtitle format. Use the search bar to locate specific spoken phrases.",
  },
  {
    name: "Download or Copy Text",
    text: "Click 'TXT', 'SRT', or 'CSV' to download the file to your computer, or use the 1-click 'Copy' button to paste the transcript anywhere.",
  },
];

export default function YouTubeTranscriptDownloaderPage() {
  const softwareSchema = getSoftwareApplicationSchema({
    name: "YouTube Transcript Downloader & Keyword Extractor",
    description:
      "Free web-based tool to download YouTube transcripts, extract closed captions as SRT or plain text, and perform spoken keyword frequency analysis.",
    category: "utility-tools",
    url: pageUrl,
    rating: {
      ratingValue: "4.9",
      ratingCount: "2480",
    },
  });

  const faqSchema = getFAQSchema(toolFAQs);
  const howToSchema = getHowToSchema({
    name: "How to Download YouTube Transcripts and Extract Subtitles Free",
    description: "Step-by-step guide to exporting YouTube video transcripts with or without timestamps in TXT, SRT, or CSV format.",
    steps: howToSteps,
    totalTime: "PT1M",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    { name: "YouTube Transcript Downloader", url: pageUrl },
  ]);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.toolPage(
          "YouTube Transcript Downloader & Keyword Extractor (Free, 2026)",
          "Extract and download YouTube transcripts and subtitles free in TXT, SRT, or CSV with timestamps and spoken keyword analysis.",
          "Utilities & SEO"
        )}
        pathname="/youtube-transcript-downloader"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
        {/* Hero Header */}
        <div className="bg-gradient-to-b from-purple-100/70 via-purple-50/30 to-transparent dark:from-purple-950/20 dark:via-transparent pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Tools", href: "/tools" },
                { name: "Transcript Downloader" },
              ]}
              className="mb-6"
            />

            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                ⚡ 100% Free · No Login Required · Instant Export
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                YouTube Transcript Downloader &amp; Keyword Extractor
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                Extract video subtitles in seconds. Download clean plain text, SRT captions, or CSV with timestamps, and analyze high-ranking spoken keywords for SEO.
              </p>
            </div>
          </div>
        </div>

        {/* Tool Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <TranscriptDownloader />

          {/* Quick Answer Capsule */}
          <div className="mt-12">
            <QuickAnswerCapsule
              question="Quick Summary: How to extract YouTube video transcripts in 2026"
              answer="To download any YouTube transcript, paste the video link into the extractor above. Select 'Plain Text' to strip timestamps for instant AI prompting, or 'SRT' for video subtitles. The tool extracts all spoken dialogue using YouTube's closed captions data and highlights top-frequency keywords to help optimize your video metadata."
              keyPoints={[
                "Export clean text without timestamps or full timecoded SRT files.",
                "Extract hidden spoken keywords used by YouTube's neural ranking algorithm.",
                "100% free tool with zero daily limits, watermarks, or account requirements.",
                `Fact-checked by our editorial team — last updated ${DATA_LAST_REVIEWED}.`,
              ]}
              badgeText="⚡ AI Quick Answer"
              verifiedNote="Verified with YouTube Data API & Web Standards"
            />
          </div>

          {/* Educational In-Depth Guide & Feature Cards */}
          <div className="mt-16 space-y-12">
            {/* 3 Core Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="p-3 w-fit rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 mb-4">
                  <FaFileAlt className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Repurpose Video into Articles
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Turn hours of spoken dialogue into published blog posts, newsletters, and social media threads in minutes. Clean text mode eliminates tedious manual transcript editing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="p-3 w-fit rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 mb-4">
                  <FaSearch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Transcript Keyword Mining
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Analyze competitor video transcripts to discover the exact conversational phrases and semantic entities that Google and YouTube reward with top search rankings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="p-3 w-fit rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 mb-4">
                  <FaRobot className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  AI Summaries &amp; Prompting
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Feed clean video text straight into ChatGPT, Claude, or Perplexity to generate chapter timestamps, action checklists, study guides, and executive summaries.
                </p>
              </div>
            </div>

            {/* Read Master Guide CTA Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Comprehensive 2026 Playbook
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Want the Full YouTube Transcript &amp; Keyword Strategy?
                </h3>
                <p className="text-sm text-purple-100 leading-relaxed">
                  Read our in-depth 2,800-word tutorial covering the 3-way extraction methodology, automated speech recognition algorithms, and how top channels steal competitor search rankings.
                </p>
              </div>
              <Link
                href="/blog/youtube-transcript-downloader-extract-subtitles-free"
                className="px-6 py-3.5 rounded-xl bg-white text-purple-900 hover:bg-purple-50 font-bold text-sm flex items-center gap-2 transition-all flex-shrink-0 shadow-md"
              >
                Read Master Guide <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* In-Article Ad Unit */}
            <div className="my-8 rounded-2xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Advertisement</p>
              <GoogleAd slot={AD_SLOTS.IN_ARTICLE[0]} lazy responsive className="w-full text-center" />
            </div>

            {/* Step-by-Step How To Guide */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                How to Download YouTube Subtitles in 4 Quick Steps
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {howToSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                        {step.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {toolFAQs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                  >
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Creator Tools */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Related YouTube Creator Utilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link
                  href="/tools/youtube-tag-extractor"
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors group shadow-xs"
                >
                  <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600">
                    Tag Extractor →
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Extract backend tags from any video</p>
                </Link>
                <Link
                  href="/tools/youtube-timestamp-generator"
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors group shadow-xs"
                >
                  <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600">
                    Timestamp Generator →
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Format chapters for Google Key Moments</p>
                </Link>
                <Link
                  href="/tools/youtube-title-generator"
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors group shadow-xs"
                >
                  <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600">
                    Title Generator →
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Generate high-CTR clickable titles</p>
                </Link>
                <Link
                  href="/tools/youtube-description-generator"
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors group shadow-xs"
                >
                  <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600">
                    Description Generator →
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Structure 5-zone SEO descriptions</p>
                </Link>
              </div>
            </div>

            {/* Newsletter & Social Share */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-8">
              <NewsletterSignup />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Share this free utility with other creators:
                </p>
                <ShareButtons url={pageUrl} title="YouTube Transcript Downloader & Keyword Extractor" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
