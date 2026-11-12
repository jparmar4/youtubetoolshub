"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaTelegram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaHeart,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { toolMeta } from "@/config/tool-meta";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import CurrentYear from "@/components/layout/CurrentYear";

// Icon + brand hover color per siteConfig.footerLinks.social icon name
const SOCIAL_LINK_META: Record<string, { Icon: typeof FaTelegram; hoverClass: string }> = {
  telegram: { Icon: FaTelegram, hoverClass: "hover:bg-[#0088cc]" },
  facebook: { Icon: FaFacebook, hoverClass: "hover:bg-[#1877F2]" },
  twitter: { Icon: FaTwitter, hoverClass: "hover:bg-[#1DA1F2]" },
  pinterest: { Icon: FaPinterest, hoverClass: "hover:bg-[#E60023]" },
};

const popularTools = [
  { name: "Thumbnail Downloader (HD & 4K)", href: "/tools/youtube-thumbnail-downloader" },
  { name: "YouTube Earnings Calculator", href: "/tools/youtube-earnings-calculator" },
  { name: "4,000 Watch Hours Countdown", href: "/tools/youtube-watch-hours-calculator" },
  { name: "Shorts vs. Long-Form Equivalence", href: "/tools/youtube-shorts-vs-long-form-calculator" },
  { name: "Milestone Countdown Calculator", href: "/tools/youtube-milestone-countdown-calculator" },
  { name: "Sponsorship Rate Calculator", href: "/tools/youtube-sponsorship-calculator" },
  { name: "US Tax Deduction Estimator", href: "/tools/youtube-tax-deduction-calculator" },
  { name: "LLC vs S-Corp Tax Savings", href: "/tools/youtube-llc-vs-s-corp-tax-savings-calculator" },
  { name: "Channel Valuation Calculator", href: "/tools/youtube-channel-valuation-calculator" },
  { name: "YouTube CPM Rates 2026", href: "/resources/youtube-cpm-rates" },
  { name: "Title Generator", href: "/tools/youtube-title-generator" },
  { name: "Tag Generator", href: "/tools/youtube-tag-generator" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-400">
      {/* Subtle dark grid texture (stays behind content) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 uhd-dark-grid" />
      {/* Top accent line (mirrors header) */}
      <div aria-hidden="true" className="relative h-[2px] w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-emerald-500" />

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="max-w-xl mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_12px_-2px_rgba(124,58,237,0.45)] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <FaYoutube className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight group-hover:text-purple-400 transition-colors">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {siteConfig.description}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {siteConfig.footerLinks.social.map((social) => {
                  const meta = SOCIAL_LINK_META[social.icon];
                  if (!meta) return null;
                  const SocialIcon = meta.Icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-white/10 text-slate-300 border border-white/10 ${meta.hoverClass} hover:text-white transition-all duration-300`}
                      aria-label={social.name}
                    >
                      <SocialIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">Popular Tools</h3>
              <ul className="space-y-2">
                {popularTools.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tools"
                    className="text-sm text-purple-400 inline-block transition-all duration-200 hover:text-purple-300 hover:translate-x-0.5 font-semibold"
                  >
                    View All {toolMeta.length} Tools →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {siteConfig.nav.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                  >
                    Creator FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                {siteConfig.footerLinks.resources?.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                {siteConfig.footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("open-cookie-consent"))}
                    className="text-sm text-slate-400 inline-block transition-all duration-200 hover:text-white hover:translate-x-0.5 text-left cursor-pointer"
                  >
                    Cookie Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © <CurrentYear /> {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-purple-500" /> for YouTube Creators Worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
