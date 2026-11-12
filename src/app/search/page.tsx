import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/config/tools";
import { getIndexableBlogPosts } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, noIndexRobots } from "@/lib/seo";
import { FaSearch, FaTools, FaBookOpen, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
    title: { absolute: "Search YouTube Tools & Guides – YouTube Tools Hub" },
    description:
        `Search across all ${tools.length} free YouTube tools and expert blog guides. Find the right tool or strategy for your channel growth in 2026.`,
    // Thin/dynamic result pages — must not appear in Google index
    robots: noIndexRobots,
    alternates: {
        canonical: "/search",
    },
};

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q: query } = await searchParams;
    const searchQuery = (query || "").trim().toLowerCase();

    // Filter tools
    const matchedTools = searchQuery
        ? tools.filter(
            (tool) =>
                tool.name.toLowerCase().includes(searchQuery) ||
                tool.shortDescription.toLowerCase().includes(searchQuery) ||
                tool.keywords?.some((kw: string) =>
                    kw.toLowerCase().includes(searchQuery),
                ),
        )
        : [];

    // Filter blog posts
    const allPosts = getIndexableBlogPosts();
    const matchedPosts = searchQuery
        ? allPosts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery) ||
                post.metaDescription.toLowerCase().includes(searchQuery) ||
                post.keywords?.some((kw: string) =>
                    kw.toLowerCase().includes(searchQuery),
                ),
        )
        : [];

    const totalResults = matchedTools.length + matchedPosts.length;

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: siteConfig.url },
        { name: "Search", url: `${siteConfig.url}/search` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <div className="min-h-screen bg-slate-50 relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

                {/* Hero */}
                <section className="relative py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter font-outfit">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                                Search
                            </span>{" "}
                            Results
                        </h1>

                        {/* Search Form */}
                        <form action="/search" method="GET" className="max-w-2xl mx-auto mb-12">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative group flex-1">
                                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue={query || ""}
                                        placeholder="Search tools, guides, strategies..."
                                        className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-slate-200 bg-white text-base sm:text-lg font-outfit font-medium text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all shadow-md"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-3d-primary px-7 py-4 rounded-2xl font-bold text-base inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                >
                                    <FaSearch className="w-4 h-4" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </form>

                        {searchQuery && (
                            <p className="text-lg text-slate-600 font-outfit">
                                {totalResults === 0
                                    ? `No results found for "${query}"`
                                    : `${totalResults} result${totalResults !== 1 ? "s" : ""} for "${query}"`}
                            </p>
                        )}
                    </div>
                </section>

                {/* Results */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
                    {/* Tools Results */}
                    {matchedTools.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <FaTools className="text-purple-500 w-5 h-5" />
                                <h2 className="text-2xl font-black text-slate-900 font-outfit">
                                    Tools ({matchedTools.length})
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {matchedTools.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        className="group block"
                                    >
                                        <div className="card-3d rounded-2xl p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                                                    <tool.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1 font-outfit">
                                                        {tool.name}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm line-clamp-2">
                                                        {tool.shortDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Blog Results */}
                    {matchedPosts.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <FaBookOpen className="text-purple-500 w-5 h-5" />
                                <h2 className="text-2xl font-black text-slate-900 font-outfit">
                                    Blog Guides ({matchedPosts.length})
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {matchedPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block"
                                    >
                                        <div className="card-3d rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs text-slate-600 font-medium">
                                                    {post.date}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1 font-outfit">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-2">
                                                {post.metaDescription}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* No Results State */}
                    {searchQuery && totalResults === 0 && (
                        <div className="text-center py-14">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="w-9 h-9 text-slate-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-outfit">
                                No results found
                            </h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                Try searching for &quot;thumbnail&quot;, &quot;earnings&quot;,
                                &quot;SEO&quot;, or &quot;tags&quot; to find relevant tools and guides.
                            </p>
                            <Link
                                href="/tools"
                                className="btn-3d-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold"
                            >
                                Browse All Tools
                                <FaArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {/* Empty State (no query) */}
                    {!searchQuery && (
                        <div className="text-center py-14">
                            <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center mx-auto mb-6">
                                <FaSearch className="w-9 h-9 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-outfit">
                                Search our entire suite
                            </h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                Find the perfect YouTube tool or growth strategy from our collection
                                of {tools.length} free creator tools and expert guides.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {["thumbnail", "earnings", "SEO", "tags", "hashtag", "title"].map(
                                    (suggestion) => (
                                        <Link
                                            key={suggestion}
                                            href={`/search?q=${suggestion}`}
                                            className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:border-purple-400 hover:text-purple-700 transition-all shadow-2xs"
                                        >
                                            {suggestion}
                                        </Link>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
