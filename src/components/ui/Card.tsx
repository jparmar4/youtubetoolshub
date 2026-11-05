import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolFavoriteButton from "@/components/tools/ToolFavoriteButton";

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
        glass-premium
        rounded-2xl shadow-lg 
        ${hover ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function ToolCard({ icon, title, description, href, isAI, className }: ToolCardProps) {
  const slug = href.replace(/^\/tools\//, "");

  return (
    <div className="relative group h-full">
      <Card
        className={`p-6 h-full cursor-pointer relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-purple-500/30 ${
          className || ""
        }`}
      >
        {/* Full-Card Click Target Link */}
        <Link
          href={href}
          className="absolute inset-0 z-0 rounded-2xl"
          aria-label={title}
          prefetch={true}
        />

        {/* Card Content (z-10, pointer-events-none so click passes through to Link) */}
        <div className="relative z-10 pointer-events-none">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 text-xl group-hover:scale-110 transition-transform duration-300 border border-purple-200">
              {icon}
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900 truncate group-hover:text-purple-600 transition-colors">
                  {title}
                </h3>
                {isAI && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full shadow-sm">
                    AI
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
            </div>
          </div>
        </div>

        {/* Quick Star Pin Button in top-right (z-20, pointer-events-auto) */}
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
          <ToolFavoriteButton toolSlug={slug} toolName={title} compact={true} />
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 pointer-events-none mt-4 flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
          <span>Use Tool</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </div>
  );
}

export function BlogCard({
  title,
  excerpt,
  date,
  category,
  slug,
  coverImage,
  coverAlt,
  className,
  dark = false,
}: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  coverImage?: string;
  coverAlt?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className={`overflow-hidden cursor-pointer group h-full ${className || ""}`}>
        {coverImage && (
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
            <Image
              src={coverImage}
              alt={coverAlt || title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-fuchsia-500/10 text-fuchsia-700 rounded-full mb-3 border border-fuchsia-500/20">
            {category}
          </span>
          <h3
            className={`font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm mb-4 line-clamp-2 ${dark ? "text-slate-300" : "text-slate-600"}`}
          >
            {excerpt}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className={`text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>{date}</span>
            <span className="shrink-0 text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              Read More -&gt;
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
