import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/ui/Card";
import GeoAeoHead from "@/components/seo/GeoAeoHead";
import { GEO_AEO_PRESETS } from "@/config/geo-aeo";
import {
  BLOG_CATEGORIES,
  getCategoryBySlug,
  getPostsForCategory,
} from "@/config/blog/categories";
import { getToolMetaBySlug } from "@/config/tool-meta";
import { siteConfig } from "@/config/site";
import {
  getCollectionPageSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getGlobalAlternates,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

// Only the 9 canonical hubs exist — unknown slugs are hard 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Category Not Found", robots: { index: false, follow: false } };
  }

  return {
    title: { absolute: category.seoTitle },
    description: category.metaDescription,
    keywords: [
      `youtube ${category.name.toLowerCase()} tips`,
      `youtube ${category.name.toLowerCase()} guide 2026`,
      `how to ${category.name.toLowerCase()} youtube`,
    ],
    alternates: getGlobalAlternates(`/blog/category/${category.slug}`),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: category.seoTitle,
      description: category.metaDescription,
      type: "website",
      url: `${siteConfig.url}/blog/category/${category.slug}`,
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${category.name} guides — YouTube Tools Hub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.seoTitle,
      description: category.metaDescription,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsForCategory(slug);
  const url = `${siteConfig.url}/blog/category/${category.slug}`;
  const relatedTools = category.toolSlugs
    .map((toolSlug) => getToolMetaBySlug(toolSlug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  const otherCategories = BLOG_CATEGORIES.filter((c) => c.slug !== slug);

  const collectionSchema = getCollectionPageSchema({
    name: `${category.name} Guides — YouTube Tools Hub`,
    description: category.definition,
    url,
    items: posts.map((post) => ({
      name: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
    })),
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: category.name, url },
  ]);

  const faqSchema = getFAQSchema(category.faqs);

  return (
    <>
      <GeoAeoHead
        {...GEO_AEO_PRESETS.blogPost(
          `${category.name} Guides (2026)`,
          category.metaDescription,
          "YouTube Tools Hub Editorial Team",
          "Creator Tools & YouTube Growth Research",
          DATA_LAST_REVIEWED,
        )}
        entityType="WebPage"
        title={`${category.name} Guides — YouTube Tools Hub`}
        primaryTopic={`YouTube ${category.name}`}
        conciseAnswer={category.definition}
        keyFacts={[
          `${posts.length} in-depth guides on YouTube ${category.name.toLowerCase()}`,
          "Practical steps, benchmarks, and templates — no fluff",
          "Fact-checked by the editorial team and updated for 2026",
          "Every guide pairs with free tools — no signup required",
        ]}
        pathname={`/blog/category/${category.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

        {/* Hero */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-8">
              <Link href="/blog" className="hover:text-purple-600 font-medium">
                Blog
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-slate-700 font-medium" aria-current="page">
                {category.name}
              </span>
            </nav>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 text-sm font-bold bg-purple-100 text-purple-700 rounded-full tracking-wide mb-6">
                {posts.length} guide{posts.length === 1 ? "" : "s"}
              </span>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
                data-speakable
              >
                YouTube {category.name} Guides
              </h1>
              <p className="summary text-lg text-slate-700 leading-relaxed" data-speakable>
                {category.definition}
              </p>
            </div>
          </div>
        </section>

        {/* Post grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.updatedAt ?? post.date}
                  category={category.name}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  coverAlt={post.imageAlt || post.title}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {category.name} — Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {category.faqs.map((item) => (
                <div
                  key={item.question}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                >
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{item.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free tools for this topic */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 md:p-8 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Free tools for {category.name.toLowerCase()}
              </h2>
              <p className="text-slate-600 mb-6">
                Apply these guides with free creator tools — no signup required.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-purple-400 hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-slate-800 hover:text-purple-700 text-sm md:text-base">
                      {tool.name}
                    </span>
                    <span aria-hidden="true" className="text-purple-600">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse other hubs */}
            <div className="mt-12">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                Browse all topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog/category/${c.slug}`}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
