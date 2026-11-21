import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";

import { authors, getAuthorBySlug, resolveAuthor } from "@/config/blog/authors";
import { getIndexableBlogPosts, toBlogIsoDate } from "@/config/blog";
import { siteConfig } from "@/config/site";
import {
    combineSchemasToGraph,
    getBreadcrumbSchema,
    getGlobalAlternates,
    getPersonSchema,
} from "@/lib/seo";
import { DATA_LAST_REVIEWED } from "@/lib/seo-data";

export const dynamicParams = false;

export function generateStaticParams() {
    return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const author = getAuthorBySlug(slug);
    if (!author) {
        return { title: "Author Not Found", robots: { index: false, follow: false } };
    }

    const title = `${author.name} — ${author.role} at YouTube Tools Hub`;
    return {
        title: { absolute: title },
        description: author.bio,
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
        alternates: getGlobalAlternates(`/blog/author/${slug}`),
        openGraph: {
            title,
            description: author.bio,
            type: "profile",
            url: `${siteConfig.url}/blog/author/${slug}`,
        },
        twitter: {
            card: "summary",
            title,
            description: author.bio,
        },
    };
}

export default async function AuthorPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const author = getAuthorBySlug(slug);
    if (!author) notFound();

    // Posts written under any of this profile's bylines (legacy names included).
    const posts = getIndexableBlogPosts().filter(
        (post) => resolveAuthor(post.author).slug === author.slug,
    );

    const authorUrl = `${siteConfig.url}/blog/author/${author.slug}`;

    const personSchema = getPersonSchema({
        name: author.name,
        url: authorUrl,
        jobTitle: author.role,
        description: author.bio,
        image: author.photo ? `${siteConfig.url}${author.photo}` : undefined,
        sameAs: [siteConfig.url, ...(author.socialLinks ?? []).map((link) => link.url)],
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Blog", url: `${siteConfig.url}/blog` },
        { name: author.name, url: authorUrl },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(combineSchemasToGraph(personSchema, breadcrumbSchema)),
                }}
            />

            <div className="min-h-screen bg-slate-50">
                <header className="py-12 lg:py-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/50 backdrop-blur-3xl -z-10" />
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 group transition-colors font-medium"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-5 mb-6">
                            {author.photo ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={author.photo}
                                    alt={`${author.name} — ${author.role} at ${siteConfig.name}`}
                                    className="w-16 h-16 rounded-full object-cover shadow-md shrink-0"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
                                    {author.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                    {author.name}
                                </h1>
                                <p className="text-purple-700 font-semibold">{author.role}</p>
                            </div>
                        </div>

                        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">{author.bio}</p>
                        {author.socialLinks && author.socialLinks.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {author.socialLinks.map((link) => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="me noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        )}
                        <p className="mt-4 text-sm text-slate-500">
                            Founder and sole author of <Link href="/about" className="text-purple-600 font-medium hover:underline">{siteConfig.name}</Link>. Every
                            guide on the site is written and maintained by {author.name} — last full review{" "}
                            {DATA_LAST_REVIEWED}.
                        </p>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 border-t border-slate-200 pt-8">
                        Guides by {author.name} ({posts.length})
                    </h2>
                    <div className="grid gap-4">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group block bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:shadow-purple-900/5 hover:border-purple-200 transition-all"
                            >
                                <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                                    <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <FaCalendar className="w-3 h-3 text-purple-500" />
                                        <time dateTime={toBlogIsoDate(post.date)}>{post.date}</time>
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mt-1">{post.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
