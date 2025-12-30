import Link from "next/link";
import { FaHome, FaTools, FaSearch } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 hero-gradient-light dark:hero-gradient">
            <div className="text-center max-w-lg">
                {/* 404 Number */}
                <div className="mb-8">
                    <span className="text-8xl md:text-9xl font-bold gradient-text">404</span>
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            <FaHome className="mr-2" />
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/tools">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <FaTools className="mr-2" />
                            Browse Tools
                        </Button>
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                        <FaSearch className="w-4 h-4" />
                        Popular Pages
                    </h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {[
                            { name: "Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader" },
                            { name: "Title Generator", href: "/tools/youtube-title-generator" },
                            { name: "Tag Generator", href: "/tools/youtube-tag-generator" },
                            { name: "About Us", href: "/about" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
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
