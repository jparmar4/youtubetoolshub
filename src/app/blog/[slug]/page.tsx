import { Metadata } from "next";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import ShareButtons from "@/components/ui/ShareButtons";
import { FaArrowLeft, FaClock, FaCalendar, FaArrowRight, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import { processContent } from "@/lib/content-processor";

// Generate static params
export function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}



export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, 2);

    // Generate structured data for SEO
    const articleSchema = getArticleSchema({
        title: post.title,
        description: post.metaDescription,
        author: post.author,
        datePublished: post.date,
        url: `${siteConfig.url}/blog/${slug}`,
        keywords: post.keywords,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
    ]);

    const faqSchema = post.faq ? getFAQSchema(post.faq) : null;

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}

            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Header */}
                <header className="hero-gradient-light dark:hero-gradient py-12 lg:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 mb-8 group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Category */}
                        <span className="inline-block px-4 py-1.5 text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-4">
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="block text-gray-900 dark:text-white font-medium">{post.author}</span>
                                    <span className="text-sm">{post.authorRole}</span>
                                </div>
                            </div>
                            <span className="flex items-center gap-2">
                                <FaCalendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <article className="py-12">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Ad Placeholder */}
                        <div className="mb-10">
                            <AdPlaceholder size="banner" />
                        </div>

                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                                <NextImage
                                    src={post.coverImage}
                                    alt={post.imageAlt || post.title}
                                    width={1200}
                                    height={630}
                                    priority
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none prose-red dark:prose-invert">
                            {processContent(post.content)}
                        </div>

                        {/* FAQ Section */}
                        {post.faq && post.faq.length > 0 && (
                            <div className="mt-12 mb-12">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <FaQuestionCircle className="text-red-500" />
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    {post.faq.map((item, index) => (
                                        <details
                                            key={index}
                                            className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800"
                                        >
                                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <span className="pr-4">{item.question}</span>
                                                <FaChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="px-4 pb-4 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-transparent group-open:border-gray-100 dark:group-open:border-gray-800 group-open:pt-4">
                                                {item.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {post.keywords.map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                                <ShareButtons
                                    url={`${siteConfig.url}/blog/${slug}`}
                                    title={post.title}
                                    description={post.metaDescription}
                                />
                            </div>
                        </div>

                        {/* Ad Placeholder */}
                        <div className="mt-10">
                            <AdPlaceholder size="inline" />
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                Keep Reading
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                                        <article className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                                            <span className="text-sm text-red-500 font-medium">{relatedPost.category}</span>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-red-500 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-16 bg-white dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Ready to Level Up Your Channel?
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                                Put these tips into action with our free YouTube tools. Generate better titles,
                                plan your content, and grow your audience.
                            </p>
                            <Link
                                href="/tools"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition-colors"
                            >
                                Explore Tools
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

