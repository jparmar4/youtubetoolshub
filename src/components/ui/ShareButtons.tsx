"use client";

import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaCheck } from "react-icons/fa";
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
            color: "hover:bg-blue-500",
        },
        {
            name: "Facebook",
            icon: FaFacebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-blue-600",
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
            color: "hover:bg-blue-700",
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Share:</span>

            {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-gray-100 text-gray-600 ${link.color} hover:text-white transition-colors`}
                        aria-label={`Share on ${link.name}`}
                    >
                        <Icon className="w-4 h-4" />
                    </a>
                );
            })}

            <button
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-colors ${copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                aria-label="Copy link"
            >
                {copied ? <FaCheck className="w-4 h-4" /> : <FaLink className="w-4 h-4" />}
            </button>
        </div>
    );
}
