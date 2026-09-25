/**
 * YouTube creator glossary — AEO/GEO data asset.
 *
 * Each definition is written as the direct answer to "what is X" in 30–60
 * words: the exact format answer engines (AI Overviews, ChatGPT, Perplexity)
 * extract and cite. Terms are ordered alphabetically on the page.
 */

export interface GlossaryTerm {
  term: string;
  definition: string;
  /** Loose grouping for scannability */
  group: "monetization" | "analytics" | "content" | "growth" | "policy";
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "A/B Testing (Thumbnails)",
    definition:
      "Showing different thumbnail versions to split audiences and comparing click-through rates. YouTube's built-in Test & Compare runs up to three candidates; the winner needs a statistically meaningful CTR advantage, not a one-day lead.",
    group: "growth",
  },
  {
    term: "AdSense",
    definition:
      "Google's advertising program that pays YouTube creators their share of ad revenue. YouTube keeps 45% of long-form ad revenue; the creator's 55% is paid monthly via AdSense once earnings pass the payment threshold.",
    group: "monetization",
  },
  {
    term: "Audience Retention",
    definition:
      "The percentage of a video viewers watch on average, shown per-video in YouTube Analytics. Higher retention tells YouTube audiences value the video, which drives more recommendations. Drops at hooks, intros, and mid-rolls are the first places to edit.",
    group: "analytics",
  },
  {
    term: "Average View Duration (AVD)",
    definition:
      "The average amount of time viewers spend watching a video, in minutes and seconds. AVD multiplied by views approximates total watch time. Raising AVD — tighter hooks, shorter intros, better pacing — is the most direct ranking lever creators control.",
    group: "analytics",
  },
  {
    term: "B-roll",
    definition:
      "Supplementary footage layered over the main shot to illustrate claims, hide cuts, and hold visual attention. Strong B-roll coverage during talking-head segments is one of the most reliable retention improvements on explainer channels.",
    group: "content",
  },
  {
    term: "Brand Account",
    definition:
      "A Google-managed channel identity that multiple people can operate without sharing the owner's Google login. Brand accounts can have their own managers, handle, and permissions, and can be renamed without affecting your personal account.",
    group: "growth",
  },
  {
    term: "Browse Features",
    definition:
      "A YouTube Analytics traffic source grouping views from the homepage, subscription feed, and Watch Later. High browse traffic means YouTube is actively recommending your videos to subscribers and likely-similar viewers.",
    group: "analytics",
  },
  {
    term: "CPM (Cost Per Mille)",
    definition:
      "The amount advertisers pay YouTube for 1,000 ad impressions. Creator CPM discussions usually mean the advertiser-facing rate; actual creator earnings derive from RPM, which subtracts YouTube's 45% share and non-monetized views.",
    group: "monetization",
  },
  {
    term: "Channel Audit",
    definition:
      "A structured review of a channel's packaging, metadata, upload consistency, and top-performing videos to find growth bottlenecks. A good audit checks titles and thumbnails for CTR, descriptions for search, and analytics for retention patterns.",
    group: "growth",
  },
  {
    term: "Chapters (Video Timestamps)",
    definition:
      "Timestamped sections listed under a video, created by writing timestamps like 0:00 in the description or adding chapter markers. Chapters improve navigation, can surface as 'key moments' in Google Search, and require at least three timestamps starting at 0:00.",
    group: "content",
  },
  {
    term: "Clickbait",
    definition:
      "Packaging that overpromises relative to what the video delivers. Clickbait raises short-term CTR but crashes retention when viewers leave disappointed, which suppresses future recommendations — the opposite of the outcome packaging aims for.",
    group: "growth",
  },
  {
    term: "Community Tab",
    definition:
      "A channel feed for text posts, images, and polls shown to subscribers. Polls and teaser posts maintain engagement between uploads and can measurably boost launch-day views by priming the subscription feed.",
    group: "growth",
  },
  {
    term: "Content ID",
    definition:
      "YouTube's automated system that scans uploads against a database of copyrighted audio and video filed by rights holders. A match can block the video, mute audio, or reroute revenue to the rights holder — usually a claim, not a strike.",
    group: "policy",
  },
  {
    term: "Copyright Claim",
    definition:
      "A rights holder's Content ID match on your video. Claims commonly redirect ad revenue or block playback in some regions but do not penalize the channel. Disputes are possible if your use is licensed, fair, or royalty-free.",
    group: "policy",
  },
  {
    term: "Copyright Strike",
    definition:
      "A formal legal takedown request from a rights holder. Three strikes within 90 days terminate the channel and all its content. Strikes are far more serious than claims and can be resolved by takedown, retraction, or counter-notification.",
    group: "policy",
  },
  {
    term: "CTR (Click-Through Rate)",
    definition:
      "The percentage of people who see a video's thumbnail and click it. For most channels a healthy CTR lands between 4% and 10%, though impressions shown far off-target can legitimately run lower. Pair CTR with retention — a high CTR that drops viewers is packaging, not quality.",
    group: "analytics",
  },
  {
    term: "Demonetization",
    definition:
      "YouTube limiting or removing ads from a video for advertiser-friendliness or policy reasons. A yellow icon means limited ads (revenue drops sharply); full demonetization runs no ads. Creators can request human review of the decision.",
    group: "policy",
  },
  {
    term: "Description (YouTube)",
    definition:
      "The text under a video, up to 5,000 characters. The first 100–150 characters show in search and are the most valuable SEO real estate; the rest supports context, links, timestamps, and disclosures. Keyword stuffing adds nothing — YouTube reads for relevance, not density.",
    group: "content",
  },
  {
    term: "End Screen",
    definition:
      "The final 5–20 seconds of a video where creators place elements linking to other videos, playlists, or a subscribe button. End screens convert a finishing viewer into another view instead of a session exit.",
    group: "content",
  },
  {
    term: "Engagement Rate",
    definition:
      "Interactions (likes, comments, shares, subscribes) divided by views, expressed as a percentage. It benchmarks how strongly content resonates — roughly 4–6% combined is solid for most niches — and is a key metric brands check before sponsorships.",
    group: "analytics",
  },
  {
    term: "Evergreen Content",
    definition:
      "Videos answering questions people search year-round — tutorials, comparisons, explainers — rather than news that decays. Evergreen videos accumulate views and search traffic for years, making them the backbone of most sustainably growing channels.",
    group: "content",
  },
  {
    term: "Faceless Channel",
    definition:
      "A channel that never shows the creator's face — using voiceover, stock footage, animation, or screen recordings instead. Faceless formats scale faster and protect privacy, but rely heavily on strong scripts and audio quality to build trust.",
    group: "content",
  },
  {
    term: "Fair Use",
    definition:
      "A US legal doctrine permitting limited copyrighted material use for commentary, criticism, education, or parody. It is a defense decided case-by-case, not a license — reaction and review channels should add substantial original commentary rather than assume protection.",
    group: "policy",
  },
  {
    term: "Handle (@username)",
    definition:
      "A channel's unique @-name used for mentions, URLs (youtube.com/@handle), and Shorts attribution. Handles must be unique across YouTube and can be changed twice every 14 days; the old handle immediately becomes claimable by others.",
    group: "growth",
  },
  {
    term: "Hook (First 15 Seconds)",
    definition:
      "The opening of a video designed to confirm the click and preview the payoff before context. Most audience loss happens in the first 30 seconds; channels that state the outcome, stakes, or promise immediately consistently retain more viewers.",
    group: "content",
  },
  {
    term: "Impressions",
    definition:
      "The number of times a video's thumbnail was shown to viewers on YouTube. Impressions × CTR ≈ views from YouTube surfaces. A video with many impressions but low CTR has a packaging problem; few impressions is a topic or momentum problem.",
    group: "analytics",
  },
  {
    term: "Memberships (Channel Memberships)",
    definition:
      "A YouTube feature letting creators charge monthly recurring fees for perks like badges, emojis, and members-only videos. Eligible channels set their own tier prices; YouTube keeps 30%, with reduced fees on the mobile apps' lower tiers.",
    group: "monetization",
  },
  {
    term: "Metadata",
    definition:
      "The text that describes a video to YouTube's systems: title, description, tags, category, and captions. Metadata helps YouTube understand what a video is about and when to suggest it, but behavioral signals — CTR and watch time — outweigh it once a video has traffic.",
    group: "content",
  },
  {
    term: "Mid-roll Ads",
    definition:
      "Ad breaks placed inside videos rather than before or after. Long-form videos over 8 minutes can run multiple mid-rolls, which raises revenue but can interrupt flow if placed carelessly; well-timed mid-rolls at natural pauses cost little retention.",
    group: "monetization",
  },
  {
    term: "Niche",
    definition:
      "A defined topic area a channel consistently serves — e.g., 'budget home studio gear' rather than 'tech'. Focus builds recommendation momentum because YouTube learns exactly which viewers to try your videos on, and libraries of related videos compound.",
    group: "growth",
  },
  {
    term: "Pinned Comment",
    definition:
      "A comment the creator fixes to the top of the comment section. Pinned comments commonly add corrections, links, or a discussion prompt, and giving the first comment a question measurably increases comment volume.",
    group: "content",
  },
  {
    term: "Playlists",
    definition:
      "Ordered video collections on a channel. Playlists create continuous watch sessions — when one video ends, the next starts — and rank in search independently, making them useful both for session time and for organizing a channel's topical structure.",
    group: "content",
  },
  {
    term: "RPM (Revenue Per Mille)",
    definition:
      "The revenue a creator actually earns per 1,000 video views after YouTube's 45% share and non-monetized views are removed. RPM is the honest planning number: multiply your monthly views by RPM to estimate AdSense income.",
    group: "monetization",
  },
  {
    term: "Shorts Revenue",
    definition:
      "Money earned from YouTube Shorts through the Creator Pool: ad revenue from Shorts feed ads funds a pool, a music-licensing share is deducted, then creators earn 45% of their allocated portion. Effective Shorts RPMs run far below long-form — commonly $0.01–$0.07 per 1,000 views.",
    group: "monetization",
  },
  {
    term: "Sitelinks / Key Moments",
    definition:
      "Google Search features that deep-link into specific parts of a video using its chapters. Descriptive chapter names and accurate timestamps make a video eligible for key moments, which can dramatically increase search visibility for tutorial queries.",
    group: "growth",
  },
  {
    term: "Sponsorship (Brand Deal)",
    definition:
      "A paid integration where a brand compensates a creator for featuring its product. Rates scale with engaged niche audience rather than raw subscriber count; US benchmarks commonly run $20–$25 per 1,000 expected views for integrated segments.",
    group: "monetization",
  },
  {
    term: "Sub4Sub",
    definition:
      "An arrangement where creators subscribe to each other to inflate counts. It violates YouTube's fake-engagement policy, produces dead subscribers who never watch (hurting recommendation testing), and risks removal of artificially inflated subscribers.",
    group: "policy",
  },
  {
    term: "Super Thanks",
    definition:
      "A one-time viewer tip available on videos and Shorts, alongside Super Chat (live chat highlights) and Super Stickers. YouTube keeps 30% of Super Thanks purchases; the rest reaches the creator after standard fees.",
    group: "monetization",
  },
  {
    term: "Tags (YouTube Tags)",
    definition:
      "Keywords added in upload settings (500-character limit) that help YouTube resolve misspellings and understand topic breadth. Tags are a minor ranking factor in 2026 — useful for accuracy, not a substitute for a keyword-rich title and strong CTR.",
    group: "content",
  },
  {
    term: "Traffic Sources",
    definition:
      "YouTube Analytics reports showing where views originate: Browse, Suggested, Search, Shorts feed, External, Playlists, and more. Reading traffic sources tells you why a video grew — search traffic compounds slowly, suggested traffic spikes fast and fades.",
    group: "analytics",
  },
  {
    term: "Watch Time (Hours)",
    definition:
      "Total time viewers spent watching a channel's videos. Watch time — not raw views — was the metric that replaced view-count-based discovery in 2012, and 4,000 public watch hours per 12 months remains a core YouTube Partner Program eligibility threshold.",
    group: "analytics",
  },
  {
    term: "YouTube Partner Program (YPP)",
    definition:
      "YouTube's revenue-sharing program for eligible creators. Standard entry requires 1,000 subscribers plus 4,000 public watch hours in 12 months or 10 million Shorts views in 90 days; a 500-subscriber tier unlocks fan funding earlier. Acceptance adds AdSense revenue, memberships, and Super Thanks.",
    group: "monetization",
  },
  {
    term: "YouTube Studio",
    definition:
      "YouTube's creator dashboard for uploading, editing metadata, viewing analytics, managing comments, and monitoring monetization. The Research tab inside Studio is the platform's own keyword tool, showing what your niche's audiences search for.",
    group: "growth",
  },
  {
    term: "YouTube Shorts",
    definition:
      "YouTube's short-form vertical video feed, accepting videos up to 3 minutes in 9:16 format. Shorts are distributed to non-subscribers by default, making them the platform's fastest discovery surface — with monetization rates far below long-form video.",
    group: "content",
  },
];
