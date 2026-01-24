import Link from "next/link";
import { FaYoutube, FaTelegram, FaFacebook, FaHeart } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

const popularTools = [
    { name: "Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader" },
    { name: "Title Generator", href: "/tools/youtube-title-generator" },
    { name: "Tag Generator", href: "/tools/youtube-tag-generator" },
    { name: "Earnings Calculator", href: "/tools/youtube-earnings-calculator" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
            {/* Newsletter Section */}
            <div className="border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-xl mx-auto">
                        <NewsletterSignup />
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                                <FaYoutube className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">
                                {siteConfig.name}
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm mb-4">
                            {siteConfig.description}
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://t.me/youtubetoolshub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-surface-200 hover:bg-[#0088cc] hover:text-white transition-all duration-300"
                                aria-label="Telegram"
                            >
                                <FaTelegram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61585430621256"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-surface-200 hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Popular Tools</h3>
                        <ul className="space-y-2">
                            {popularTools.map((tool) => (
                                <li key={tool.name}>
                                    <Link
                                        href={tool.href}
                                        className="text-sm hover:text-purple-600 transition-colors"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/tools"
                                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                                >
                                    View All Tools →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            {siteConfig.nav.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm hover:text-purple-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                {/* Resources Links */}
                <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
                    <ul className="space-y-2">
                        {/* Resources are optional */}
                        {siteConfig.footerLinks.resources?.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm hover:text-purple-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
                    <ul className="space-y-2">
                        {siteConfig.footerLinks.legal.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="text-sm hover:text-purple-400 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">
                    © {currentYear} {siteConfig.name}. All rights reserved.
                </p>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                    Made with <FaHeart className="text-purple-500" /> for YouTube Creators
                </p>
            </div>
        </div>
        </footer >
    );
}
