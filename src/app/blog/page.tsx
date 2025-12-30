import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/config/blog";
import { FaClock, FaUser, FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Blog - YouTube Growth Tips & Tutorials",
    description: "Practical tips, honest advice, and in-depth guides to help you grow your YouTube channel. Written by creators, for creators.",
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogPage() {
    const blogPosts = getAllBlogPosts();
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-16 lg:py-20">
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            The Creator&apos;s Blog
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Practical tips, honest advice, and in-depth guides from creators who&apos;ve been there.
                            No fluff, just what actually works.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <span className="text-sm font-medium text-red-500">Featured Article</span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`} className="block group">
                        <article className="grid lg:grid-cols-2 gap-8 items-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl hover:shadow-xl transition-shadow">
                            <div>
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-4">
                                    {featuredPost.category}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-red-500 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <FaUser className="w-4 h-4" />
                                        {featuredPost.author}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaClock className="w-4 h-4" />
                                        {featuredPost.readTime}
                                    </span>
                                    <span>{featuredPost.date}</span>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-center justify-center">
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                                    <FaArrowRight className="w-12 h-12 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </article>
                    </Link>
                </div>
            </section>

            {/* Other Posts */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        More Articles
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <article className="h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full mb-4">
                                        {post.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <span>{post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to Put These Tips into Action?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Our free tools help you implement everything you&apos;ve learned. Generate titles,
                        download thumbnails, plan content, and more.
                    </p>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                        Explore Free Tools
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
}
