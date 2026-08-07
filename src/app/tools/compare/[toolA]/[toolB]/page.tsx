import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, tools } from "@/config/tools";
import { getComparisonPairs, getComparisonContent } from "@/config/comparisons";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getFAQSchema, getSpeakableSchema } from "@/lib/seo";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import GoogleAd from "@/components/ads/GoogleAd";
import BlogSidebar from "@/components/blog/BlogSidebar";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getComparisonPairs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolA: string; toolB: string }>;
}): Promise<Metadata> {
  const { toolA: slugA, toolB: slugB } = await params;
  const toolA = getToolBySlug(slugA);
  const toolB = getToolBySlug(slugB);

  if (!toolA || !toolB) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const content = getComparisonContent(toolA, toolB);

  return {
    title: `${toolA.name} vs ${toolB.name} — Free Comparison | YouTube Tools Hub`,
    description: content.description,
    keywords: [
      ...toolA.keywords.slice(0, 3),
      ...toolB.keywords.slice(0, 3),
      `${toolA.name} vs ${toolB.name}`,
      "youtube tools comparison",
      "free youtube tools",
    ],
    openGraph: {
      title: content.title,
      description: content.description,
      type: "website",
      url: `${siteConfig.url}/tools/compare/${slugA}/${slugB}`,
      images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630, alt: content.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [`${siteConfig.url}/og-image.png`],
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/compare/${slugA}/${slugB}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ toolA: string; toolB: string }>;
}) {
  const { toolA: slugA, toolB: slugB } = await params;
  const toolA = getToolBySlug(slugA);
  const toolB = getToolBySlug(slugB);

  if (!toolA || !toolB) notFound();

  const content = getComparisonContent(toolA, toolB);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tools", url: `${siteConfig.url}/tools` },
    { name: `${toolA.name} vs ${toolB.name}`, url: `${siteConfig.url}/tools/compare/${slugA}/${slugB}` },
  ]);

  const faqSchema = getFAQSchema(content.faqs);

  const speakableSchema = getSpeakableSchema({
    url: `${siteConfig.url}/tools/compare/${slugA}/${slugB}`,
    headline: content.title,
    summary: content.description,
    cssSelectors: ["h1", ".summary"],
  });

  // Get other comparison pairs for cross-linking
  const allPairs = getComparisonPairs();
  const relatedPairs = allPairs
    .filter(
      (p) =>
        (p.toolA === slugA || p.toolB === slugA || p.toolA === slugB || p.toolB === slugB) &&
        !(p.toolA === slugA && p.toolB === slugB),
    )
    .slice(0, 8);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.comparisonPage(`${toolA.name} vs ${toolB.name}`)}
        pathname={`/tools/compare/${slugA}/${slugB}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-purple-100 dark:border-slate-700 rounded-2xl overflow-hidden">
              <div className="py-10 px-6 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                  Free Tool Comparison
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl" data-speakable>
                  {content.title}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto summary" data-speakable>
                  {content.description}
                </p>
              </div>
            </div>

            {/* Quick comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href={`/tools/${toolA.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-lg">A</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {toolA.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">{toolA.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-400">{toolA.category}</span>
                  {toolA.isAI && <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-md text-purple-700 dark:text-purple-300">AI-Powered</span>}
                  <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-700 dark:text-emerald-300">Free</span>
                </div>
              </Link>

              <Link
                href={`/tools/${toolB.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-indigo-100 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">B</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {toolB.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">{toolB.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-400">{toolB.category}</span>
                  {toolB.isAI && <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-md text-indigo-700 dark:text-indigo-300">AI-Powered</span>}
                  <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-emerald-700 dark:text-emerald-300">Free</span>
                </div>
              </Link>
            </div>

            {/* Ad placement 1 */}
            <div aria-hidden="true">
              <GoogleAd slot="8649718301" />
            </div>

            {/* Content sections */}
            <article className="space-y-8">
              {content.sections.map((section, idx) => (
                <section key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line">{section.content}</p>
                </section>
              ))}
            </article>

            {/* FAQ */}
            {content.faqs.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {content.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ad placement 2 */}
            <div aria-hidden="true">
              <GoogleAd layout="in-article" format="fluid" slot="3397391628" style={{ display: "block", textAlign: "center" }} />
            </div>

            {/* Related comparisons */}
            {relatedPairs.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">More Comparisons</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedPairs.map((pair) => {
                    const a = getToolBySlug(pair.toolA);
                    const b = getToolBySlug(pair.toolB);
                    if (!a || !b) return null;
                    return (
                      <Link
                        key={`${pair.toolA}-${pair.toolB}`}
                        href={`/tools/compare/${pair.toolA}/${pair.toolB}`}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                      >
                        {a.name.replace(/^YouTube\s+/i, "")} vs {b.name.replace(/^YouTube\s+/i, "")}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA links */}
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              Try both free tools:{" "}
              <Link href={`/tools/${toolA.slug}`} className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">{toolA.name}</Link>
              {" · "}
              <Link href={`/tools/${toolB.slug}`} className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">{toolB.name}</Link>
              {" · "}
              <Link href="/tools" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">All Free YouTube Tools</Link>
            </p>
          </div>

          {/* Sidebar — ad-only rail for vertical AdSense */}
          <div className="max-lg:hidden lg:col-span-1 min-w-0">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
