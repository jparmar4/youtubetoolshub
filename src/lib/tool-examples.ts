/** Editorial examples, not measured outcomes or market benchmarks. */
export const toolExamples: Record<string, { title: string; input: string; output: string; explanation: string }> = {
    "youtube-thumbnail-downloader": {
        title: "Which thumbnail size should I download?",
        input: "Paste a public YouTube video or Shorts URL, then preview the available images.",
        output: "Choose the largest image that actually loads. A maximum-resolution image is often 1280 × 720; availability depends on the video.",
        explanation: "The downloader retrieves available images; it does not upscale them or guarantee 4K. Downloading an image does not grant permission to republish it.",
    },
    "youtube-title-generator": {
        title: "Example: turn a broad topic into a specific title",
        input: "Topic: a beginner tutorial showing how to light a desk recording setup with one lamp.",
        output: "Illustrative title: How to Light Your YouTube Setup With One Desk Lamp",
        explanation: "The title identifies the viewer, task and constraint. Treat generated titles as drafts and choose one your video delivers on. This example is editorial, not a measured CTR result.",
    },
    "youtube-tag-generator": {
        title: "Example: choose tags that describe the actual video",
        input: "Video: a step-by-step OBS screen recording tutorial for beginners.",
        output: "Illustrative tags: OBS screen recording, OBS tutorial for beginners, record screen with OBS.",
        explanation: "Keep only tags that match the tutorial. Tags do not guarantee rankings or suggested-video reach. Review the title, thumbnail and description alongside the tag list.",
    },
    "youtube-sponsorship-calculator": {
        title: "Worked example: a 25,000-view sponsorship quote",
        input: "25,000 views, Tech niche (1.8×), standard integration (1×), pinned link (+10%), USD.",
        output: "$1,260 base fee; $126 add-on; $1,386 target quote. Rounded quote range: $1,081–$1,871.",
        explanation: "The model uses 25,000 ÷ 1,000 × $28 × 1.8, then adds 10%. The range is 78%–135% of the target. These are calculator assumptions, not observed brand offers; negotiate scope, audience fit and usage rights separately.",
    },
    "youtube-channel-valuation-calculator": {
        title: "Worked example: valuing a profitable creator business",
        input: "$2,500 AdSense net, $1,800 sponsorship net and $700 affiliate net per month; steady growth; faceless model.",
        output: "$5,000 monthly profit × the capped 45× multiple = $225,000 illustrative value.",
        explanation: "The model starts at 28× and applies 1.25× growth, 1.2× operating model and 1.12× diversification factors, capped at 45×. Use profit after allocating costs. A buyer may price the business differently after reviewing its records and transfer risks.",
    },
    "youtube-tax-deduction-calculator": {
        title: "Worked example: an expense planning scenario",
        input: "$45,000 revenue, $18,400 entered expenses and a user-selected 30% rate assumption.",
        output: "$26,600 revenue less expenses; $5,520 illustrative tax reduction.",
        explanation: "The simplified reduction is min(revenue, entered expenses) × assumed rate. It does not determine deductible amounts or tax owed. Equipment depreciation, personal-use allocation, losses and local rules require separate review.",
    },
    "thumbnail-critique": {
        title: "Worked example: catching a mobile text-overload issue",
        input: "1280×720 thumbnail containing 8 words repeating the title verbatim + title 'How I Grew My Channel in 30 Days'.",
        output: "Illustrative score: 58/100 Overall, 46/100 Mobile Legibility, detectedTextWords: 8 (warning >4 words), redundancyAlert: true.",
        explanation: "Cutting the thumbnail overlay down to 3 bold words ('DAY 1 vs 30') removes title repetition and improves instant 168px mobile feed glance comprehension.",
    },
    "ab-packaging-studio": {
        title: "Worked example: 3 distinct angles for one developer video",
        input: "Topic: Switching to a $199 Linux laptop for 30 days. Audience: Software developers.",
        output: "Variant A (Curiosity Gap): 'Why I Locked Away My MacBook' | Variant B (Proof): '$199 Linux Laptop: 30-Day Code Test' | Variant C (Contrarian): 'Stop Buying $2,500 Dev Laptops'.",
        explanation: "Each Test & Compare variant isolates a different viewer motivation alongside a matching 2–4 word thumbnail overlay and AI image prompt.",
    },
    "channel-outlier-scanner": {
        title: "Worked example: separating long-form outliers from Shorts",
        input: "Handle: @ChannelHandle with 22 recent uploads (median 18,500 views when Shorts <=60s are excluded).",
        output: "Top video at 85,100 views scores a 4.6x Outlier Multiplier and highlights in emerald for one-click title remixing.",
        explanation: "Excluding Shorts prevents vertical feed volume spikes from skewing your long-form packaging benchmark.",
    },
    "hook-auditor": {
        title: "Worked example: cutting a slow channel greeting",
        input: "Title: 'Edit 3x Faster in Premiere' · Intro: 'Hey guys, welcome back to the channel, before we start hit subscribe...'",
        output: "Retention Score: 52/100 · Promise Confirmation: FAIL · 2 fluff clichés highlighted + 3 direct-start rewrites.",
        explanation: "Replacing 14 seconds of throat-clearing with an immediate time-saving proof claim keeps cold Browse viewers past the 30-second drop-off cliff.",
    },
    "youtube-loudness-checker": {
        title: "Worked example: normalizing an under-leveled voiceover mix",
        input: "Local voiceover WAV export (-19.2 LUFS integrated, -3.4 dBTP True Peak, 0 clipped samples).",
        output: "+5.2 dB Gain Needed for YouTube -14 LUFS · Safe Limiter Recommendation: Cap Hard Limiter at -1.0 dBTP before boosting.",
        explanation: "Because +5.2 dB gain would push -3.4 dBTP peaks past 0 dBFS, placing a -1.0 dB limiter ahead of the boost raises perceived loudness without clipping.",
    },
    "shorts-series-planner": {
        title: "Worked example: 5-part Shorts binge series for an AI coding challenge",
        input: "Topic: Building a profitable SaaS MVP in 7 days using zero ad spend · Episodes: 5 · Tone: Case Study / Finance.",
        output: "5 linked episodes (Part 1/5 to Part 5/5) each containing a <2s opening hook, 3 storyboard beats, and a cliffhanger bridge driving 'Watch Series' taps.",
        explanation: "Ending Part 1 with an unresolved metric question funnels Shorts viewers directly into Part 2 via YouTube's Watch Series link instead of losing them to swipe decay.",
    },
    "creator-partnership-boost-calculator": {
        title: "Worked example: pricing a brand deal + 60-day paid Ad Boost license",
        input: "50,000 avg views, Tech/AI ($28 CPM), 65% Tier-1 audience share, 60-Day Paid Partnership Boost (+50%).",
        output: "Base Integration: ~$1,526 | 60-Day Boost License (+50%): +$763 | Total Package Quote: ~$2,289 with ready-to-send usage clause.",
        explanation: "Brands running your integration as a YouTube Creator Partnership Ad must license paid ad whitelisting separately from organic upload fees.",
    },
};
