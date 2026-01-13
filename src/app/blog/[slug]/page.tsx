import { Metadata } from "next";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import GoogleAd from "@/components/ads/GoogleAd";
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

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="py-16 lg:py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-3xl -z-10" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/20 blur-[100px] rounded-full -z-10" />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Back Link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 group transition-colors font-medium"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Category */}
                        <div className="mb-6">
                            <span className="inline-block px-4 py-1.5 text-sm font-bold bg-purple-100 text-purple-700 rounded-full tracking-wide">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-slate-500 border-t border-b border-slate-200 py-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="block text-slate-900 font-bold">{post.author}</span>
                                    <span className="text-sm text-slate-500">{post.authorRole}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 ml-auto md:ml-0">
                                <span className="flex items-center gap-2">
                                    <FaCalendar className="w-4 h-4 text-purple-400" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaClock className="w-4 h-4 text-purple-400" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Main Article Column */}
                    <article>
                        {/* Google Ad: Mobile Banner */}
                        <div className="mb-10">
                            <GoogleAd slot="5848325027" className="w-full" />
                        </div>

                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/5 border border-slate-100">
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
                        <div className="max-w-none">
                            {processContent(post.content)}
                        </div>

                        {/* FAQ Section */}
                        {post.faq && post.faq.length > 0 && (
                            <div className="mt-16 mb-12">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                        <FaQuestionCircle />
                                    </span>
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    {post.faq.map((item, index) => (
                                        <details
                                            key={index}
                                            className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                                        >
                                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                                                <span className="pr-4">{item.question}</span>
                                                <FaChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-transparent group-open:border-slate-100 group-open:pt-4">
                                                {item.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        <div className="mt-16 pt-8 border-t border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                <div className="flex flex-wrap gap-2">
                                    {post.keywords.map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-sm hover:border-purple-300 hover:text-purple-600 transition-colors cursor-default"
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
                    </article>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-16 bg-white border-t border-slate-100">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">
                                Keep Reading
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group">
                                        <article className="h-full bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:shadow-purple-900/5 hover:-translate-y-1 transition-all duration-300">
                                            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-md uppercase tracking-wide">
                                                {relatedPost.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
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
                <section className="py-20 bg-slate-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-center border border-slate-200 shadow-2xl shadow-purple-900/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-bl-full -z-0 opacity-50" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                    Ready to Level Up Your Channel?
                                </h2>
                                <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                                    Put these tips into action with our free YouTube tools. Generate better titles,
                                    plan your content, and grow your audience.
                                </p>
                                <Link
                                    href="/tools"
                                    className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Explore Tools
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

