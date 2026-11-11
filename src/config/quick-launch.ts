import {
    FaDollarSign,
    FaDownload,
    FaTags,
    FaClock,
    FaHandshake,
} from "react-icons/fa";

/**
 * Flagship tool shortlist shared by the desktop sidebar dock (BlogSidebar)
 * and the mobile quick-links strip (MobileQuickLinks) so both surfaces stay
 * in sync.
 */
export const QUICK_LAUNCH_TOOLS = [
    {
        name: "YouTube Earnings Calculator",
        href: "/tools/youtube-earnings-calculator",
        badge: "Tier-1",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: FaDollarSign,
        iconBg: "from-emerald-500 to-teal-600",
    },
    {
        name: "4K Thumbnail Downloader",
        href: "/tools/youtube-thumbnail-downloader",
        badge: "UHD",
        badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
        icon: FaDownload,
        iconBg: "from-pink-500 to-rose-600",
    },
    {
        name: "Viral Video Tag Generator",
        href: "/tools/youtube-tag-generator",
        badge: "AI",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        icon: FaTags,
        iconBg: "from-purple-600 to-fuchsia-600",
    },
    {
        name: "4,000 Watch Hours Planner",
        href: "/tools/youtube-watch-hours-calculator",
        badge: "YPP",
        badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
        icon: FaClock,
        iconBg: "from-sky-500 to-indigo-600",
    },
    {
        name: "Sponsorship Rate Calculator",
        href: "/tools/youtube-sponsorship-calculator",
        badge: "Pro",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        icon: FaHandshake,
        iconBg: "from-amber-500 to-orange-600",
    },
];
