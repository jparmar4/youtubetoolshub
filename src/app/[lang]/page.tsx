import Link from "next/link";
import { FaArrowRight, FaRocket, FaCheck, FaBolt, FaStar } from "react-icons/fa";
import { ToolCard, BlogCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import { getFeaturedTools } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/config/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};


// Get the 3 most recent blog posts
const blogPosts = getAllBlogPosts().slice(0, 3);

const benefits = [
  { icon: FaRocket, title: "Save Time", description: "Automate tedious tasks and focus on creating content" },
  { icon: FaBolt, title: "Boost Growth", description: "Optimize your SEO with AI-powered suggestions" },
  { icon: FaStar, title: "Daily Free Credits", description: "Get generous daily limits for all our powerful AI tools" },
  { icon: FaCheck, title: "Free & Pro Plans", description: "Start for free, then upgrade for higher limits and priority" },
];

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient-light dark:hero-gradient py-20 lg:py-28">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="gradient-text">{siteConfig.tagline}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Supercharge your YouTube channel with powerful automation tools. Generate titles,
              download thumbnails, analyze earnings, and more – all completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse All Tools
                  <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/tools/youtube-thumbnail-downloader">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Try Thumbnail Downloader
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "16+", label: "Free Tools" },
              { value: "AI", label: "Powered" },
              { value: "100%", label: "Free Forever" },
              { value: "Fast", label: "& Easy" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdPlaceholder size="banner" />
      </div>

      {/* Featured Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start with our most popular tools loved by thousands of creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                icon={<tool.icon />}
                title={tool.name}
                description={tool.shortDescription}
                href={`/tools/${tool.slug}`}
                isAI={tool.isAI}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/tools">
              <Button variant="secondary">
                View All 16+ Tools
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider text-sm">
              Smart Workflows
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              From Idea to Upload in 5 Minutes ⚡
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stop switching tabs. Our tools talk to each other to automate your entire creative process.
            </p>
          </div>

          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-center">Find an Idea</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Use <strong>Video Ideas Generator</strong> to find a high-potential topic.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-center">Get a Title</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Click <strong>"Generate Titles"</strong> to get viral options instantly.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-center">Write Desc</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Click <strong>"Write Description"</strong> to create SEO-optimized text.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-center">Create Visual</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Click <strong>"Create Thumbnail"</strong> to get the perfect AI prompt.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/tools/youtube-video-ideas-generator">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-purple-500/30">
                  <FaRocket className="mr-2" /> Start the Chain
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Use {siteConfig.name}?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to grow your YouTube channel in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tips, tricks, and guides to help you succeed on YouTube
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                slug={post.slug}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/blog">
              <Button variant="ghost">
                View All Articles
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient-light dark:hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Grow Your Channel?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who use our free tools to save time and grow their audience.
          </p>
          <Link href="/tools">
            <Button size="lg">
              Get Started – It&apos;s Free
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
