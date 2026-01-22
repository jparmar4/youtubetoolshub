import { Metadata } from "next";
import SidebarAd from "@/components/ads/SidebarAd";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";

import ShareButtons from "@/components/ui/ShareButtons";
import { FaArrowLeft, FaClock, FaCalendar, FaArrowRight, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema, getSpeakableSchema } from "@/lib/seo";
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

    const isoDate = Number.isNaN(Date.parse(post.date)) ? post.date : new Date(post.date).toISOString();

    return {
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            publishedTime: isoDate,
            modifiedTime: isoDate,
            authors: [post.author],
            section: post.category,
            tags: post.keywords,
            images: [
                {
                    url: `${siteConfig.url}${post.coverImage}`,
                    width: 1200,
                    height: 630,
                    alt: post.imageAlt || post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription,
            images: [`${siteConfig.url}${post.coverImage}`],
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

    const isoDate = Number.isNaN(Date.parse(post.date)) ? post.date : new Date(post.date).toISOString();

    // Generate structured data for SEO
    const articleSchema = getArticleSchema({
        title: post.title,
        description: post.metaDescription,
        author: post.author,
        datePublished: isoDate,
        dateModified: isoDate,
        url: `${siteConfig.url}/blog/${slug}`,
        keywords: post.keywords,
        imageUrl: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
        section: post.category,
        inLanguage: "en",
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
    ]);

    const faqSchema = post.faq ? getFAQSchema(post.faq) : null;

    const speakableSchema = getSpeakableSchema({
        url: `${siteConfig.url}/blog/${slug}`,
        headline: post.title,
        summary: post.metaDescription,
        cssSelectors: ["h1", ".summary"],
    });

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
                    __html: JSON.stringify(speakableSchema),
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

                        <div className="summary text-lg text-slate-700 leading-relaxed max-w-3xl mb-8">
                            {post.metaDescription}
                        </div>

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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 lg:order-2">
                            <article>
                                {/* Google Ad: Mobile Top Banner */}


                                {/* Cover Image */}
                                {post.coverImage && (
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
                                        <NextImage
                                            src={post.coverImage}
                                            alt={post.imageAlt || post.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                )}

                                {/* Article Content */}
                                <div
                                    className="prose prose-lg prose-slate max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-slate-600 prose-p:leading-relaxed
                                prose-a:text-purple-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900 prose-strong:font-bold
                                prose-ul:my-6 prose-li:text-slate-600
                                prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                                prose-code:text-purple-600 prose-code:bg-purple-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-medium
                                prose-pre:bg-slate-900 prose-pre:rounded-xl
                                prose-img:rounded-xl prose-img:shadow-md"
                                >
                                    {processContent(post.content)}
                                </div>

                                {/* Tags */}
                                {post.keywords && post.keywords.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-slate-200">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Topics</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {post.keywords.slice(0, 8).map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-default"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* FAQ Section */}
                                {post.faq && post.faq.length > 0 && (
                                    <div className="mt-16 p-8 bg-slate-50 rounded-2xl">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                            <span className="text-3xl">❓</span>
                                            Frequently Asked Questions
                                        </h2>
                                        <div className="space-y-6">
                                            {post.faq.map((item, index) => (
                                                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                                                    <h3 className="font-bold text-lg text-slate-900 mb-3">{item.question}</h3>
                                                    <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Share */}
                                <div className="mt-12 pt-8 border-t border-slate-200">
                                    <ShareButtons
                                        url={`https://www.youtubetoolshub.com/blog/${post.slug}`}
                                        title={post.title}
                                        description={post.metaDescription}
                                    />
                                </div>
                            </article>
                        </div>

                        {/* Sidebar - Visible on Desktop */}
                        <aside className="hidden lg:block lg:col-span-4 space-y-8 lg:order-1">
                            <div className="sticky top-24 space-y-8">
                                <SidebarAd />
                            </div>
                        </aside>
                    </div>
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
