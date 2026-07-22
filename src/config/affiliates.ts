/**
 * Centralized Affiliate & Partner Tools Configuration
 * Update referral links and affiliate URLs here.
 */

export interface AffiliateTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  link: string;
  ctaText: string;
  logoBg: string;
  badgeBg: string;
  featured?: boolean;
}

export const AFFILIATE_TOOLS: Record<string, AffiliateTool> = {
  vidiq: {
    id: "vidiq",
    name: "VidIQ",
    tagline: "Double your YouTube views with AI keyword & competitor analysis.",
    description: "VidIQ helps creators find viral video ideas, optimize tags, and track channel analytics in real time.",
    badge: "Top Growth Tool",
    link: "https://vidiq.com/jitu",
    ctaText: "Try VidIQ Free →",
    logoBg: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400",
    featured: true,
  },
  tubebuddy: {
    id: "tubebuddy",
    name: "TubeBuddy",
    tagline: "Run Thumbnail A/B tests & bulk edit your YouTube videos.",
    description: "The #1 browser extension for YouTube SEO, automated A/B testing, and time-saving batch processing.",
    badge: "Official Extension",
    link: "https://www.Tubebuddy.com/pricing?a=jparmar4",
    ctaText: "Get TubeBuddy Free →",
    logoBg: "from-red-600 to-rose-600",
    badgeBg: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-800 dark:text-red-400",
    featured: true,
  },
  descript: {
    id: "descript",
    name: "Descript AI",
    tagline: "Edit YouTube videos as easily as editing a text document.",
    description: "Remove filler words ('um', 'uh'), generate studio-quality sound, and reframe videos for YouTube Shorts.",
    badge: "AI Video Editor",
    link: "https://www.descript.com", // Replace with your Descript affiliate referral link
    ctaText: "Start Free Trial →",
    logoBg: "from-purple-600 to-pink-600",
    badgeBg: "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800 dark:text-purple-400",
    featured: true,
  },
  epidemic: {
    id: "epidemic",
    name: "Epidemic Sound",
    tagline: "35,000+ copyright-free music tracks for YouTube creators.",
    description: "Monetize videos without copyright strikes. Unlimited access to high-quality music and sound effects.",
    badge: "Copyright Free",
    link: "https://www.epidemicsound.com", // Replace with your Epidemic Sound affiliate referral link
    ctaText: "Get 30 Days Free →",
    logoBg: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400",
  },
};

export const DEFAULT_AFFILIATE_DISCLOSURE =
  "Disclosure: When you sign up through links on our site, we may earn an affiliate commission at zero additional cost to you.";
