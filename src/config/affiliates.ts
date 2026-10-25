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
  opusclip: {
    id: "opusclip",
    name: "OpusClip AI",
    tagline: "Turn 1 long video into 10 viral Shorts with 1 click.",
    description: "AI analyzes video retention curves, picks viral hooks, adds animated dynamic captions, and resizes to 9:16 automatically.",
    badge: "Viral Shorts AI",
    link: "https://www.opus.pro/?via=creators",
    ctaText: "Generate Shorts Free →",
    logoBg: "from-violet-600 to-fuchsia-600",
    badgeBg: "bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-800 dark:text-violet-400",
    featured: true,
  },
  elevenlabs: {
    id: "elevenlabs",
    name: "ElevenLabs",
    tagline: "Studio-grade AI voiceovers and multilingual channel dubbing.",
    description: "Clone your voice or use realistic AI narrators in 29+ languages to scale your YouTube audience globally.",
    badge: "Voice & Dubbing",
    link: "https://elevenlabs.io/?from=youtubetoolshub",
    ctaText: "Try Voice AI Free →",
    logoBg: "from-sky-600 to-blue-700",
    badgeBg: "bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800 dark:text-sky-400",
    featured: true,
  },
  wise: {
    id: "wise",
    name: "Wise Business",
    tagline: "Save 3%–5% on YouTube AdSense & Brand Sponsor Wire Fees.",
    description: "Get local US, UK & Euro bank account details. Receive Google AdSense USD payments via zero-fee ACH without predatory bank wire fees.",
    badge: "Save FX Fees",
    link: "https://wise.com/invite/creators",
    ctaText: "Open Wise Account →",
    logoBg: "from-emerald-500 to-green-600",
    badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400",
    featured: true,
  },
  payoneer: {
    id: "payoneer",
    name: "Payoneer",
    tagline: "Global creator payouts from YouTube, Patreon & brands.",
    description: "Receive international brand sponsorship payments in USD/EUR and withdraw directly to your local bank account in 150+ countries.",
    badge: "Global Payouts",
    link: "https://www.payoneer.com/creators",
    ctaText: "Get $50 Reward →",
    logoBg: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400",
  },
  artlist: {
    id: "artlist",
    name: "Artlist Max",
    tagline: "Unlimited royalty-free music, sound effects, footage & templates.",
    description: "All-in-one creator subscription covering commercial YouTube monetization rights with lifetime coverage on published videos.",
    badge: "Unlimited Music & SFX",
    link: "https://artlist.io",
    ctaText: "Get 2 Months Free →",
    logoBg: "from-yellow-500 to-amber-600",
    badgeBg: "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:border-yellow-800 dark:text-yellow-400",
  },
};

export const DEFAULT_AFFILIATE_DISCLOSURE =
  "Disclosure: When you sign up through links on our site, we may earn an affiliate commission at zero additional cost to you.";
