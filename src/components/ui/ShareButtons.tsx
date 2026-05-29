"use client";

import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaCheck, FaWhatsapp, FaRedditAlien } from "react-icons/fa";
import { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || "");

    const shareLinks = [
        {
            name: "Twitter",
            icon: FaTwitter,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-sky-500",
            bg: "bg-sky-50 text-sky-600",
        },
        {
            name: "Facebook",
            icon: FaFacebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-blue-600",
            bg: "bg-blue-50 text-blue-600",
        },
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:bg-green-500",
            bg: "bg-green-50 text-green-600",
        },
        {
            name: "Reddit",
            icon: FaRedditAlien,
            href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
            color: "hover:bg-orange-500",
            bg: "bg-orange-50 text-orange-600",
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
            color: "hover:bg-blue-700",
            bg: "bg-blue-50 text-blue-700",
        },
    ];

    const handleShare = async () => {
        // Use Web Share API on mobile if available
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title, text: description, url });
                return;
            } catch {
                // User cancelled or error — fall through to clipboard
            }
        }
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500 mr-1">Share:</span>

            {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl ${link.bg} ${link.color} hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                        aria-label={`Share on ${link.name}`}
                        title={`Share on ${link.name}`}
                    >
                        <Icon className="w-4 h-4" />
                    </a>
                );
            })}

            <button
                onClick={handleShare}
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                    copied
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                aria-label={copied ? "Link copied!" : "Copy link"}
                title={copied ? "Copied!" : "Copy link"}
            >
                {copied ? <FaCheck className="w-4 h-4" /> : <FaLink className="w-4 h-4" />}
            </button>
        </div>
    );
}
