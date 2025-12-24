"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTwitter, FaWhatsapp, FaLinkedin, FaFacebook, FaCopy, FaTimes, FaCheck } from "react-icons/fa";
import { useState } from "react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    text: string;
    url?: string;
}

export default function ShareModal({ isOpen, onClose, title, text, url = "https://youtubetoolshub.com" }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const fullText = `${text}\n\n${url}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: FaTwitter,
            color: "bg-[#1DA1F2] hover:bg-[#1a91da]",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        },
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            color: "bg-[#25D366] hover:bg-[#22bf5b]",
            href: `https://wa.me/?text=${encodeURIComponent(fullText)}`
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            color: "bg-[#0A66C2] hover:bg-[#095baf]",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        },
        {
            name: "Facebook",
            icon: FaFacebook,
            color: "bg-[#1877F2] hover:bg-[#166fe5]",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl pointer-events-auto border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Preview Box */}
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 font-mono text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                {fullText}
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {shareLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${link.color} text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md`}
                                    >
                                        <link.icon className="text-xl" />
                                        {link.name}
                                    </a>
                                ))}
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={handleCopy}
                                className={`w-full py-3 px-4 rounded-xl font-bold border-2 flex items-center justify-center gap-2 transition-all ${copied
                                        ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {copied ? <FaCheck /> : <FaCopy />}
                                {copied ? "Copied to Clipboard!" : "Copy Text"}
                            </button>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
