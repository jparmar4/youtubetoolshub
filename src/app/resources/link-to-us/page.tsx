import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { FaLink, FaCode, FaCopy, FaHeart, FaStar, FaRocket, FaHandshake, FaChartLine } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Link to Us – Embed Badges & Backlink Resources | YouTube Tools Hub",
  description:
    "Support YouTube Tools Hub by linking to us from your website, blog, or social media. Grab our embed badges, banners, and HTML snippets to share our free YouTube tools with your audience.",
  keywords: [
    "link to youtube tools hub",
    "youtube tools hub badge",
    "youtube tools hub embed",
    "youtube tools hub banner",
    "youtube tools hub backlink",
    "free youtube tools widget",
    "youtube tools hub partner",
    "youtube tools hub affiliate",
  ],
  alternates: {
    canonical: "/resources/link-to-us",
  },
  openGraph: {
    title: "Link to Us – YouTube Tools Hub",
    description:
      "Support YouTube Tools Hub by linking to us. Grab embed badges, banners, and HTML snippets.",
    url: `${siteConfig.url}/resources/link-to-us`,
    type: "website",
  },
};

const EMBED_SNIPPETS = [
  {
    id: "text-link",
    label: "Simple Text Link",
    description: "A clean, professional text link perfect for blog posts and articles.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – Free AI Tools for Creators" target="_blank" rel="noopener">YouTube Tools Hub – Free AI-Powered YouTube Tools</a>`,
  },
  {
    id: "badge-small",
    label: "Small Badge (150x50)",
    description: "A compact badge ideal for sidebars and footers.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – Free AI Tools for Creators" target="_blank" rel="noopener"><img src="https://www.youtubetoolshub.com/images/badge-small.png" alt="YouTube Tools Hub" width="150" height="50" style="border:0" loading="lazy" /></a>`,
  },
  {
    id: "badge-medium",
    label: "Medium Badge (300x100)",
    description: "A medium-sized badge great for resource pages and partner sections.",
    code: `<a href="https://www.youtubetoolshub.com" title="YouTube Tools Hub – 21+ Free AI YouTube Tools" target="_blank" rel="noopener"><img src="https://www.youtubetoolshub.com/images/badge-medium.png" alt="YouTube Tools Hub – Free AI YouTube Tools" width="300" height="100" style="border:0" loading="lazy" /></a>`,
  },
  {
    id: "thumbnail-tool",
    label: "Thumbnail Downloader Link",
    description: "Direct link to our most popular tool — great for tutorial sites.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-thumbnail-downloader" title="Free YouTube Thumbnail Downloader – HD & 4K" target="_blank" rel="noopener">Download YouTube Thumbnails Free (HD & 4K) – YouTube Tools Hub</a>`,
  },
  {
    id: "earnings-calc",
    label: "Earnings Calculator Link",
    description: "Link to our YouTube Earnings Calculator — perfect for monetization content.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-earnings-calculator" title="YouTube Earnings Calculator – Estimate Revenue by Country" target="_blank" rel="noopener">YouTube Earnings Calculator (50+ Countries) – YouTube Tools Hub</a>`,
  },
  {
    id: "tag-generator",
    label: "Tag Generator Link",
    description: "Link to our YouTube Tag Generator — ideal for SEO-focused content.",
    code: `<a href="https://www.youtubetoolshub.com/tools/youtube-tag-generator" title="Free YouTube Tag Generator – AI SEO Tags" target="_blank" rel="noopener">Free AI YouTube Tag Generator – YouTube Tools Hub</a>`,
  },
  {
    id: "rich-snippet",
    label: "Rich Recommendation Box",
    description: "A styled recommendation box with description — great for resource roundups.",
    code: `<div style="border:2px solid #a855f7;border-radius:12px;padding:20px;max-width:500px;font-family:system-ui,sans-serif;background:#faf5ff">
  <h3 style="margin:0 0 8px;color:#7e22ce;font-size:18px">🚀 YouTube Tools Hub</h3>
  <p style="margin:0 0 12px;color:#374151;font-size:14px;line-height:1.5">21+ free AI-powered tools for YouTube creators. Generate titles, download thumbnails, calculate earnings, and optimize your channel — no signup required.</p>
  <a href="https://www.youtubetoolshub.com" target="_blank" rel="noopener" style="display:inline-block;background:#a855f7;color:#fff;padding:8px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Try Free Tools →</a>
</div>`,
  },
  {
    id: "comparison-link",
    label: "TubeBuddy/VidIQ Alternative Link",
    description: "Position us as a free alternative in comparison articles.",
    code: `<a href="https://www.youtubetoolshub.com" title="Free TubeBuddy & VidIQ Alternative – YouTube Tools Hub" target="_blank" rel="noopener">YouTube Tools Hub – The Best Free Alternative to TubeBuddy & VidIQ (21+ AI Tools)</a>`,
  },
];

const BACKLINK_OPPORTUNITIES = [
  {
    icon: FaStar,
    title: "Resource Pages & Roundup Posts",
    description:
      'If you write "Best YouTube Tools" or "Free Creator Resources" articles, we\'d love to be included. Our 21+ free tools make us a valuable addition to any creator resource list.',
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
      "We welcome high-quality guest posts on our blog about YouTube growth, monetization, and content strategy. In return, you get a contextual backlink from our Google AdSense-approved domain.",
  },
  {
    icon: FaChartLine,
    title: "Case Studies & Data Citation",
    description:
      "Our CPM data covers 50+ countries. If you cite YouTube CPM rates, earnings data, or creator statistics, link to our Earnings Calculator as the source for accurate, up-to-date figures.",
  },
];

function CopyButton({ textToCopy, snippetId }: { textToCopy: string; snippetId: string }) {
  return (
    <button
      id={`copy-btn-${snippetId}`}
      onClick={() => {
        navigator.clipboard.writeText(textToCopy);
        const btn = document.getElementById(`copy-btn-${snippetId}`);
        if (btn) {
          btn.textContent = "✓ Copied!";
          setTimeout(() => {
            btn.textContent = "Copy Code";
          }, 2000);
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      Copy Code
    </button>
  );
}

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
              <strong>21+ free AI-powered YouTube tools</strong> by linking to us
              from your website, blog, or social media. Grab a ready-made embed
              badge or HTML snippet below.
            </p>
          </div>
        </section>

        {/* Why Link to Us */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Link to YouTube Tools Hub?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Every link helps YouTube creators find free, professional-grade tools.
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
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
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
                    <CopyButton textToCopy={snippet.code} snippetId={snippet.id} />
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
              backlink from our <strong>Google AdSense-approved</strong> domain
              with real organic traffic.
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
              <strong>YouTube Tools Hub</strong> is the world&#39;s most
              comprehensive free suite of AI-powered tools for YouTube content
              creators. With <strong>21+ professional-grade tools</strong>, we
              help creators in the{" "}
              <strong>United States, United Kingdom, Canada, Australia</strong>,
              and 50+ other countries optimize their channels for maximum growth
              and revenue.
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
              <strong>100% free with no signup required</strong>.
            </p>
            <p>
              We&#39;re trusted by <strong>100,000+ creators</strong> worldwide,
              Google AdSense approved, and regularly updated for the latest
              YouTube algorithm changes. If you run a blog, YouTube channel, or
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
