import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/config/blog";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
    title: "YouTube Growth Blog – FREE Tips, Tutorials & Strategies (2026)",
    description: "📈 Proven YouTube growth strategies from 6-figure creators. Thumbnails, SEO, monetization, viral titles & more. Updated weekly. 100% actionable tips!",
    alternates: {
        canonical: "/blog",
        languages: {
            "en": "/blog",
            "x-default": "/blog",
        },
    },
};

export default function BlogPage() {
    const blogPosts = getAllBlogPosts();
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-200/30 blur-[120px] rounded-full -z-10" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-fuchsia-200/30 blur-[80px] rounded-full -z-10" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-bold uppercase tracking-widest mb-6">
                            Insights & Tutorials
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                            The Creator&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Growth Hub</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Practical tips, honest advice, and in-depth guides from creators who&apos;ve been there.
                            No fluff, just what actually works for your channel.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="pb-16 pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-8">
                        <span className="h-px flex-1 bg-slate-200"></span>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-4">Featured Article</span>
                        <span className="h-px flex-1 bg-slate-200"></span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="block group">
                        <article className="grid lg:grid-cols-2 gap-8 items-center p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            {/* Decorative gradient inside card */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-50/50 to-transparent rounded-bl-full -z-0 opacity-50" />

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 text-xs font-bold bg-purple-100 text-purple-700 rounded-full mb-6">
                                    {featuredPost.category}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-slate-600 mb-8 text-lg leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                            <FaUser className="w-3 h-3" />
                                        </div>
                                        {featuredPost.author}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaClock className="w-4 h-4 text-purple-400" />
                                        {featuredPost.readTime}
                                    </span>
                                    <span>{featuredPost.date}</span>
                                </div>
                            </div>
                            <div className="relative h-64 lg:h-full min-h-[300px] rounded-2xl overflow-hidden group-hover:shadow-lg transition-all hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white">
                                    {/* Placeholder for image if one existed, or just a nice gradient area */}
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FaArrowRight className="w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                </div>
            </section>

            {/* Other Posts */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
                        Latest Articles
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                                <article className="h-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 hover:-translate-y-2 flex flex-col">
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-full group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                            {post.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-slate-400 pt-6 border-t border-slate-50 mt-auto">
                                        <span className="font-medium text-slate-500">{post.author}</span>
                                        <span className="flex items-center gap-1.5">
                                            <FaClock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-purple-100/50 blur-[100px] rounded-full -z-10" />

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Ready to Put These Tips into Action?
                    </h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                        Our free tools help you implement everything you&apos;ve learned. Generate titles,
                        download thumbnails, plan content, and more.
                    </p>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Explore Free Tools
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
}
