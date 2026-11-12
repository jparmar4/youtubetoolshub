import Link from "next/link";
import { Metadata } from "next";
import { FaHome, FaTools, FaSearch } from "react-icons/fa";
import { noIndexRobots } from "@/lib/seo";
import { tools } from "@/config/tools";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found (404) | YouTube Tools Hub" },
  description:
    `The page you're looking for doesn't exist or has been moved. Browse our ${tools.length} free creator tools or return to the homepage.`,
  // noindex so 404s never rank; follow so links on the page still pass signals
  robots: noIndexRobots,
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center px-4 py-16">
      <div className="nebula-bg" />
      <div className="text-center max-w-xl relative z-10">
        <div className="mb-6">
          <span className="text-7xl md:text-8xl font-black font-outfit tracking-tighter text-gradient">
            404
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 font-outfit tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 mb-8 text-base sm:text-lg leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/"
            className="btn-3d-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl"
          >
            <FaHome aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/tools"
            className="btn-3d-glass inline-flex w-full sm:w-auto items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl"
          >
            <FaTools aria-hidden="true" />
            Browse Tools
          </Link>
        </div>

        <div className="card-3d p-6 rounded-3xl">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center justify-center gap-2 font-outfit">
            <FaSearch className="w-4 h-4 text-purple-600" />
            Popular Pages
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: "Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader" },
              { name: "Title Generator", href: "/tools/youtube-title-generator" },
              { name: "Tag Generator", href: "/tools/youtube-tag-generator" },
              { name: "Earnings Calculator", href: "/tools/youtube-earnings-calculator" },
              { name: `All ${tools.length} Tools`, href: "/tools" },
              { name: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-purple-50 hover:text-purple-700 border border-slate-200/70 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
