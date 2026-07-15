import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaLink, FaCode, FaHeart, FaStar, FaRocket, FaHandshake, FaChartLine } from "react-icons/fa";
import CopyButton from "@/components/ui/CopyButton";

export const metadata: Metadata = {
  title: "Link to Us – Embed Badges, Calculator Widget & Backlinks",
  description:
    "Embed free YouTube Tools Hub badges and the YouTube Earnings Calculator card on your blog or resource page. Copy-paste HTML widgets — no JS, no signup.",
  keywords: [
    "link to youtube tools hub",
    "youtube tools hub badge",
    "youtube earnings calculator embed",
    "youtube tools hub widget",
    "youtube tools hub backlink",
    "free youtube tools badge",
    "youtube cpm calculator embed",
    "youtube tools hub partner",
  ],
  alternates: {
    canonical: `${siteConfig.url}/resources/link-to-us`,
  },
  openGraph: {
    title: "Link to Us – Embed Badges & Calculator Widget | YouTube Tools Hub",
    description:
      "Copy free HTML badges and an embeddable YouTube earnings calculator card for your site.",
    url: `${siteConfig.url}/resources/link-to-us`,
    type: "website",
  },
};

const CALCULATOR_HTML_CARD = `<div style="max-width:420px;border:2px solid #059669;border-radius:16px;padding:20px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:linear-gradient(145deg,#ecfdf5,#ffffff);box-shadow:0 8px 24px rgba(5,150,105,.12)">
  <div style="font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#047857;margin-bottom:8px">Free tool</div>
  <div style="font-size:20px;font-weight:800;color:#064e3b;margin:0 0 8px;line-height:1.25">YouTube Earnings Calculator</div>
  <p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.5">Estimate AdSense revenue from views &amp; RPM. Example: <strong>100K views × $5 RPM ≈ $500/mo</strong>. Country CPM context included.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">
    <span style="font-size:11px;background:#d1fae5;color:#065f46;padding:4px 8px;border-radius:999px;font-weight:600">No signup</span>
    <span style="font-size:11px;background:#d1fae5;color:#065f46;padding:4px 8px;border-radius:999px;font-weight:600">RPM · CPM</span>
    <span style="font-size:11px;background:#d1fae5;color:#065f46;padding:4px 8px;border-radius:999px;font-weight:600">50+ countries</span>
  </div>
  <a href="https://www.youtubetoolshub.com/tools/youtube-earnings-calculator" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#059669;color:#fff;padding:10px 18px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700">Open free calculator →</a>
  <div style="margin-top:12px;font-size:11px;color:#6b7280">By <a href="https://www.youtubetoolshub.com" target="_blank" rel="noopener noreferrer" style="color:#047857;font-weight:600">YouTube Tools Hub</a></div>
</div>`;

const CALCULATOR_BADGE_IMG = `<a href="https://www.youtubetoolshub.com/tools/youtube-earnings-calculator" title="Free YouTube Earnings Calculator – RPM & CPM Estimator" target="_blank" rel="noopener noreferrer"><img src="https://www.youtubetoolshub.com/images/badge-calculator.svg" alt="Free YouTube Earnings Calculator by YouTube Tools Hub" width="320" height="120" style="border:0;max-width:100%;height:auto" loading="lazy" /></a>`;

const EMBED_SNIPPETS = [
  {
    id: "calc-html-card",
    label: "⭐ Earnings Calculator HTML Card (recommended)",
    description:
      "Pure HTML/CSS card — no JavaScript. Perfect for monetization posts, resource pages, and newsletters.",
    code: CALCULATOR_HTML_CARD,
  },
  {
    id: "calc-badge-img",
    label: "Earnings Calculator Image Badge",
    description: "SVG badge linking to the free YouTube money calculator.",
    code: CALCULATOR_BADGE_IMG,
  },
  {
    id: "text-link",
    label: "Simple Text Link",
    description: "A clean, professional text link perfect for blog posts and articles.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – Free AI Tools for Creators" target="_blank" rel="noopener noreferrer">YouTube Tools Hub – Free YouTube Creator Tools</a>`,
  },
  {
    id: "badge-small",
    label: "Small Badge (150×50 SVG)",
    description: "A compact badge ideal for sidebars and footers.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – Free Creator Tools" target="_blank" rel="noopener noreferrer"><img src="https://www.youtubetoolshub.com/images/badge-small.svg" alt="YouTube Tools Hub" width="150" height="50" style="border:0" loading="lazy" /></a>`,
  },
  {
    id: "badge-medium",
    label: "Medium Badge (300×100 SVG)",
    description: "A medium-sized badge great for resource pages and partner sections.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – 27+ Free YouTube Creator Tools" target="_blank" rel="noopener noreferrer"><img src="https://www.youtubetoolshub.com/images/badge-medium.svg" alt="YouTube Tools Hub – Free YouTube Creator Tools" width="300" height="100" style="border:0" loading="lazy" /></a>`,
  },
  {
    id: "thumbnail-tool",
    label: "Thumbnail Downloader Link",
    description: "Direct link to our most popular tool — great for tutorial sites.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-thumbnail-downloader" title="Free YouTube Thumbnail Downloader – HD & 4K" target="_blank" rel="noopener noreferrer">Download YouTube Thumbnails Free (HD & 4K) – YouTube Tools Hub</a>`,
  },
  {
    id: "earnings-calc",
    label: "Earnings Calculator Text Link",
    description: "Plain text link to the YouTube Earnings Calculator — ideal for monetization articles.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-earnings-calculator" title="YouTube Earnings Calculator – Free RPM & CPM Estimator 2026" target="_blank" rel="noopener noreferrer">Free YouTube Earnings Calculator (RPM &amp; CPM) – YouTube Tools Hub</a>`,
  },
  {
    id: "cpm-rates",
    label: "CPM Rates by Country Link",
    description: "Cite our public CPM/RPM country table in research posts.",
    code: `<a href="https://www.youtubetoolshub.com/resources/youtube-cpm-rates" title="YouTube CPM Rates by Country 2026" target="_blank" rel="noopener noreferrer">YouTube CPM Rates by Country (2026) – YouTube Tools Hub</a>`,
  },
  {
    id: "tag-generator",
    label: "Tag Generator Link",
    description: "Link to our YouTube Tag Generator — ideal for SEO-focused content.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-tag-generator" title="Free YouTube Tag Generator" target="_blank" rel="noopener noreferrer">Free YouTube Tag Generator – YouTube Tools Hub</a>`,
  },
  {
    id: "rich-snippet",
    label: "Rich Recommendation Box",
    description: "A styled recommendation box with description — great for resource roundups.",
    code: `<div style="border:2px solid #a855f7;border-radius:12px;padding:20px;max-width:500px;font-family:system-ui,sans-serif;background:#faf5ff">
  <h3 style="margin:0 0 8px;color:#7e22ce;font-size:18px">YouTube Tools Hub</h3>
  <p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.5">27+ free creator tools for YouTube. Generate titles, download thumbnails, calculate earnings, and optimize your channel — no signup required.</p>
  <a href="https://www.youtubetoolshub.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#a855f7;color:#fff;padding:8px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Try Free Tools →</a>
</div>`,
  },
  {
    id: "comparison-link",
    label: "TubeBuddy/VidIQ Alternative Link",
    description: "Position us as a free alternative in comparison articles.",
    code: `<a href="https://www.youtubetoolshub.com/tools/vs/tubebuddy" title="Free TubeBuddy Alternative – YouTube Tools Hub" target="_blank" rel="noopener noreferrer">YouTube Tools Hub – Free TubeBuddy &amp; VidIQ Alternative (No Extension)</a>`,
  },
  {
    id: "markdown",
    label: "Markdown (for GitHub, Notion, blogs)",
    description: "Copy into Markdown posts or README resource lists.",
    code: `[Free YouTube Earnings Calculator](https://www.youtubetoolshub.com/tools/youtube-earnings-calculator) — estimate AdSense revenue from views & RPM (no signup).

[![YouTube Tools Hub](https://www.youtubetoolshub.com/images/badge-medium.svg)](https://www.youtubetoolshub.com)`,
  },
  {
    id: "pinterest-calc",
    label: "Pinterest pin image (Earnings Calculator)",
    description:
      "Tall 1000×1500 pin. Use as pin image; destination = calculator URL. See docs/PINTEREST-PINS.md.",
    code: `Pin image:
https://www.youtubetoolshub.com/tools/youtube-earnings-calculator/pinterest-image

Destination link:
https://www.youtubetoolshub.com/tools/youtube-earnings-calculator

Title:
How much does YouTube pay per 1,000 views? Free calculator 2026`,
  },
  {
    id: "pinterest-cpm",
    label: "Pinterest pin image (CPM rates table)",
    description: "Tall pin for the CPM-by-country resource page.",
    code: `Pin image:
https://www.youtubetoolshub.com/resources/youtube-cpm-rates/pinterest-image

Destination link:
https://www.youtubetoolshub.com/resources/youtube-cpm-rates

Title:
YouTube CPM rates by country 2026 (US, UK, India…)`,
  },
];

const BACKLINK_OPPORTUNITIES = [
  {
    icon: FaStar,
    title: "Resource Pages & Roundup Posts",
    description:
      'If you write "Best YouTube Tools" or "Free Creator Resources" articles, we\'d love to be included. Our 27+ free tools make us a valuable addition to any creator resource list.',
  },
  {
    icon: FaRocket,
    title: "Tutorial & How-To Content",
    description:
      "Writing YouTube growth tutorials? Link to our specific tools when mentioning thumbnail optimization, SEO tags, or earnings estimation. Your readers get free tools, you get a relevant outbound link.",
  },
  {
    icon: FaHandshake,
    title: "Guest Post Exchange",
    description:
      "We welcome high-quality guest posts on our blog about YouTube growth, monetization, and content strategy. Accepted posts can include a relevant contextual backlink.",
  },
  {
    icon: FaChartLine,
    title: "Case Studies & Data Citation",
    description:
      "Our CPM data covers 50+ countries. If you cite YouTube CPM rates, earnings data, or creator statistics, link to our Earnings Calculator as the source for accurate, up-to-date figures.",
  },
];

export default function LinkToUsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Resources", url: `${siteConfig.url}/resources` },
    { name: "Link to Us", url: `${siteConfig.url}/resources/link-to-us` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-fuchsia-100/30" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <FaLink className="w-4 h-4" />
              Support & Partnership
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Link to <span className="text-purple-600">YouTube Tools Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Help fellow creators discover our{" "}
              <strong>27+ free creator tools</strong> — and embed our{" "}
              <strong>YouTube Earnings Calculator</strong> card on your site.
              Copy-paste HTML below. No JavaScript required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#calculator-embed"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700"
              >
                Get calculator embed
              </a>
              <a
                href="#embed-snippets"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm font-bold hover:border-purple-400"
              >
                All badges &amp; links
              </a>
            </div>
          </div>
        </section>

        {/* Featured calculator embed preview */}
        <section id="calculator-embed" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-center">
              Embed the free Earnings Calculator
            </h2>
            <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8">
              Ideal for monetization posts and “how much does YouTube pay” guides.
              Pure HTML — works in WordPress, Ghost, Substack HTML blocks, and static sites.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              <div
                className="shrink-0"
                dangerouslySetInnerHTML={{ __html: CALCULATOR_HTML_CARD }}
              />
              <div className="flex-1 w-full max-w-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  Copy this HTML
                </p>
                <pre className="bg-slate-900 text-emerald-300 text-xs p-4 rounded-xl overflow-x-auto max-h-64 leading-relaxed whitespace-pre-wrap break-all">
                  <code>{CALCULATOR_HTML_CARD}</code>
                </pre>
                <div className="mt-3 flex justify-end">
                  <CopyButton
                    text={CALCULATOR_HTML_CARD}
                    variant="button"
                    label="Copy calculator card"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Link to Us */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Link to YouTube Tools Hub?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Every link helps YouTube creators find useful free tools.
            Here&#39;s why your audience will thank you:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {BACKLINK_OPPORTUNITIES.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Embed Snippets */}
        <section id="embed-snippets" className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            <FaCode className="inline w-7 h-7 text-purple-600 mr-2 align-middle" />
            Ready-to-Use Embed Snippets
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Copy any snippet below and paste it into your HTML. All links include
            proper <code className="text-purple-600 bg-purple-50 px-1 rounded">title</code> attributes
            and <code className="text-purple-600 bg-purple-50 px-1 rounded">rel=&quot;noopener&quot;</code> for
            best SEO practices.
          </p>
          <div className="space-y-8">
            {EMBED_SNIPPETS.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-5 border-b border-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {snippet.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {snippet.description}
                  </p>
                </div>
                <div className="p-5 bg-gray-50">
                  <pre className="bg-gray-900 text-green-400 text-xs sm:text-sm p-4 rounded-xl overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                    <code>{snippet.code}</code>
                  </pre>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      HTML • Copy and paste into your site
                    </span>
                    <CopyButton text={snippet.code} variant="button" label="Copy Code" />
                  </div>
                </div>
                {/* Preview */}
                <div className="p-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
                    Preview
                  </p>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: snippet.code }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guest Post CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <FaHeart className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Write a Guest Post?
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              We accept high-quality guest posts about YouTube growth,
              monetization, SEO, and content creation. You&#39;ll get a contextual
              backlink when the article is relevant and useful for readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
              >
                Contact Us for Guest Posts
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-500/30 text-white font-semibold rounded-xl hover:bg-purple-500/50 transition-colors border border-white/20"
              >
                See Our Blog
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <div className="prose prose-gray max-w-none">
            <h2>About YouTube Tools Hub</h2>
            <p>
              <strong>YouTube Tools Hub</strong> is a free suite of AI-powered
              tools for YouTube content creators. With <strong>27+ creator tools</strong>, we
              help creators in the{" "}
              <strong>United States, United Kingdom, Canada, Australia</strong>,
              and 50+ other countries improve planning, SEO, and revenue estimates.
            </p>
            <p>
              Our tools include a{" "}
              <Link href="/tools/youtube-thumbnail-downloader">
                YouTube Thumbnail Downloader
              </Link>
              ,{" "}
              <Link href="/tools/youtube-title-generator">
                AI Title Generator
              </Link>
              ,{" "}
              <Link href="/tools/youtube-tag-generator">
                YouTube Tag Generator
              </Link>
              ,{" "}
              <Link href="/tools/youtube-earnings-calculator">
                YouTube Earnings Calculator
              </Link>{" "}
              with CPM data for 50+ countries, and much more — all{" "}
              <strong>free to use</strong>.
            </p>
            <p>
              Core tools work directly in the browser with no extension or
              private YouTube login required. If you run a blog, YouTube channel, or
              resource site in the creator economy space, linking to us provides
              genuine value to your audience.
            </p>

            <h3>Our Most Popular Tools for Backlinks</h3>
            <ul>
              <li>
                <Link href="/tools/youtube-thumbnail-downloader">
                  YouTube Thumbnail Downloader
                </Link>{" "}
                — Download HD & 4K thumbnails from any video
              </li>
              <li>
                <Link href="/tools/youtube-earnings-calculator">
                  YouTube Earnings Calculator
                </Link>{" "}
                — Estimate revenue with country-specific CPM data
              </li>
              <li>
                <Link href="/tools/youtube-title-generator">
                  YouTube Title Generator
                </Link>{" "}
                — AI-powered viral title ideas
              </li>
              <li>
                <Link href="/tools/youtube-tag-generator">
                  YouTube Tag Generator
                </Link>{" "}
                — Find high-ranking SEO tags
              </li>
              <li>
                <Link href="/tools/youtube-tag-extractor">
                  YouTube Tag Extractor
                </Link>{" "}
                — Spy on competitor tags
              </li>
              <li>
                <Link href="/tools/youtube-channel-audit">
                  YouTube Channel Audit
                </Link>{" "}
                — AI-powered channel health analysis
              </li>
            </ul>

            <h3>Suggested Anchor Text for Backlinks</h3>
            <p>
              For the best SEO impact (for both your site and ours), use
              descriptive anchor text like:
            </p>
            <ul>
              <li>&quot;free YouTube tools&quot;</li>
              <li>&quot;YouTube Tools Hub&quot;</li>
              <li>&quot;free YouTube thumbnail downloader&quot;</li>
              <li>&quot;YouTube earnings calculator&quot;</li>
              <li>&quot;AI YouTube title generator&quot;</li>
              <li>&quot;best free YouTube SEO tools 2026&quot;</li>
              <li>&quot;free alternative to TubeBuddy&quot;</li>
              <li>&quot;YouTube tag generator online&quot;</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
