import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

interface ToolCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
    isAI?: boolean;
    className?: string;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg 
        border border-gray-100 dark:border-gray-700
        ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

export function ToolCard({ icon, title, description, href, isAI, className }: ToolCardProps) {
    return (
        <Link href={href}>
            <Card className={`p-6 h-full cursor-pointer group ${className || ""}`}>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-xl group-hover:scale-110 transition-transform duration-300 border border-indigo-500/20">
                        {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-500 transition-colors">
                                {title}
                            </h3>
                            {isAI && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-sm">
                                    AI
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center text-indigo-500 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Use Tool
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </Card>
        </Link>
    );
}

export function BlogCard({
    title,
    excerpt,
    date,
    category,
    slug
}: {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
}) {
    return (
        <Link href={`/blog/${slug}`}>
            <Card className="p-6 cursor-pointer group h-full">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-3">
                    {category}
                </span>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {excerpt}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-500">{date}</span>
                    <span className="text-red-500 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Read More →
                    </span>
                </div>
            </Card>
        </Link>
    );
}
