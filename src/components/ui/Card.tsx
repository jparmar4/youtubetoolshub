"use client";

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
        card-3d
        rounded-2xl
        ${hover ? "hover:shadow-xl transition-all duration-300" : ""}
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
    <Link href={href} className="block h-full group" prefetch={true}>
      <Card
        hover={false}
        className={`p-6 h-full cursor-pointer relative overflow-hidden flex flex-col justify-between ${
          className || ""
        }`}
      >
        {/* Top Specular Gradient Rim on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Subtle Corner Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div>
          {/* Top Row: 3D Icon Cube + Badges + Favorite Star */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="icon-cube-3d shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-600 text-xl">
              {icon}
            </div>

            <div className="flex items-center gap-2">
              {isAI && (
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-full shadow-xs">
                  AI Studio
                </span>
              )}
              <div
                className="relative z-10"
                onClick={(e) => e.preventDefault()}
              >
                <ToolFavoriteButton toolSlug={slug} toolName={title} compact={true} />
              </div>
            </div>
          </div>

          {/* Full Readable Tool Title + Description */}
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight leading-snug mb-2 line-clamp-2 font-outfit">
            {title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-200/70 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 group-hover:text-purple-700 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Free · Instant
          </span>
          <span className="inline-flex items-center gap-1 text-purple-700 font-bold text-xs px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300 shadow-2xs whitespace-nowrap">
            <span>Launch Tool</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
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
    <Link href={`/blog/${slug}`} className="block h-full group">
      <Card className={`overflow-hidden cursor-pointer h-full flex flex-col justify-between ${className || ""}`}>
        <div>
          {coverImage && (
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-200/70">
              <Image
                src={coverImage}
                alt={coverAlt || title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold bg-white/95 backdrop-blur-md text-purple-700 rounded-full shadow-md border border-white/60">
                {category}
              </span>
            </div>
          )}
          <div className="p-6 pb-4">
            {!coverImage && (
              <span className="inline-block px-3 py-1 text-xs font-bold bg-fuchsia-500/10 text-fuchsia-700 rounded-full mb-3 border border-fuchsia-500/20">
                {category}
              </span>
            )}
            <h3
              className={`font-bold text-lg mb-2.5 group-hover:text-purple-600 transition-colors line-clamp-2 tracking-tight leading-snug font-outfit ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-sm line-clamp-2 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}
            >
              {excerpt}
            </p>
          </div>
        </div>
        <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
          <span className="text-xs font-medium text-slate-500">{date}</span>
          <span className="shrink-0 inline-flex items-center gap-1 text-purple-700 font-bold text-xs px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 group-hover:bg-purple-600 group-hover:text-white transition-all">
            Read Guide →
          </span>
        </div>
      </Card>
    </Link>
  );
}
