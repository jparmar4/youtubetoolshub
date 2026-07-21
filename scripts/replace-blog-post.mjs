/**
 * Replace a full blog post object (matched by slug) with new object source.
 * Usage: node scripts/replace-blog-post.mjs <slug> <path-to-json-or-js-export>
 * Or embed replacements below and run: node scripts/replace-blog-post.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogPath = path.join(__dirname, "..", "src", "config", "blog.ts");

/** Full post objects as TS object literals (without trailing comma issues) */
const REPLACEMENTS = {
  "youtube-monetization-truths-cpm-rpm": `{
    slug: "youtube-monetization-truths-cpm-rpm",
    title: "How Much Will YouTube Pay For 1 Million Views? (2026 Rates)",
    excerpt:
      "What 1 million YouTube views can earn in 2026: RPM math, finance vs gaming ranges, country effects, and a free calculator—without fake guarantees.",
    date: "July 19, 2026",
    category: "Monetization",
    author: "Sarah Jenkins",
    authorRole: "Finance Creator",
    readTime: "14 min read",
    metaDescription:
      "How much will YouTube pay for 1 million views in 2026? See RPM math by niche, country effects, Shorts vs long-form, and estimate with a free calculator.",
    keywords: [
      "how much will youtube pay for 1 million views",
      "youtube earnings 1 million views",
      "how much youtube pays",
      "cpm vs rpm",
      "youtube monetization rates",
      "youtube revenue calculator",
      "youtube cpm explained",
      "youtube earnings per view",
      "youtube ad revenue breakdown",
      "youtube payout rates",
    ],
    coverImage: "/images/blog/monetization-truths.png",
    imageAlt: "YouTube Monetization Truths - 1 million views earnings",
    content: \`
::: QUICK-ANSWER
YouTube does **not** pay a fixed amount for 1 million views. Plan with **RPM**: earnings ≈ (views ÷ 1,000) × RPM. At **$3 RPM**, 1M views ≈ **$3,000**. At **$10 RPM**, ≈ **$10,000**. At **$20 RPM**, ≈ **$20,000**. Niche, audience country, ad formats, and seasonality drive the gap. Always verify in YouTube Studio.
:::

“How much does YouTube pay for 1 million views?” is the wrong first question. The right one is: **what RPM can my audience and niche support?**

## The only formula you need

**Estimated AdSense ≈ (Views ÷ 1,000) × RPM**

- **CPM** = advertiser cost per 1,000 **ad impressions**
- **RPM** = your revenue per 1,000 **video views** after YouTube’s share and unmonetized views

Standard long-form ad split is often cited as about **55% creator / 45% YouTube**, but RPM is still the planning number because not every view shows an ad.

Deep dives: [RPM vs CPM](/blog/youtube-rpm-vs-cpm-explained) · [CPM by country](/resources/youtube-cpm-rates) · [earnings calculator](/tools/youtube-earnings-calculator)

## 1 million views — planning table

| RPM | Est. earnings on 1M views |
|-----|---------------------------|
| $1 | $1,000 |
| $3 | $3,000 |
| $5 | $5,000 |
| $8 | $8,000 |
| $12 | $12,000 |
| $20 | $20,000 |
| $30 | $30,000 |

These are **illustrative**. Your Studio Revenue report is ground truth.

## Niche hierarchy (directional long-form)

### Higher-intent (often higher RPM)
Finance, investing, B2B software, career skills, high-ticket tools. Peak US finance RPMs are frequently cited much higher than entertainment—but **peaks are not averages**.

### Mid range
Education how-tos, health & fitness (compliance-sensitive), lifestyle with product intent.

### Volume-first (often lower RPM)
Gaming, broad comedy, pure entertainment. You can still win with scale, memberships, and brand deals.

Related: [high CPM niches](/blog/high-cpm-youtube-niches-2026) · [best niches 2026](/blog/best-youtube-niches-2026)

## Country multiplies (or divides) the result

The same niche with a US-heavy audience usually out-earns an identical video watched mostly in lower-CPM regions. See the [full country CPM table](/resources/youtube-cpm-rates).

## Shorts vs long-form on “1 million views”

1M **Shorts** views rarely equals 1M **long-form** dollars. Guide: [Shorts monetization 2026](/blog/youtube-shorts-monetization-2026).

## How to raise RPM without waiting for luck

1. Higher-intent topics inside your niche
2. Mid-rolls when videos genuinely deserve 8+ minutes
3. Enable eligible ad formats in Studio
4. Tier-1 language and examples when authentic
5. Q4 planning when advertiser spend often rises
6. Retention so more ads can play without rage-quits

## Beyond AdSense

For many channels, sponsorships, affiliates, and products exceed AdSense. Payment timing: [AdSense payment schedule](/blog/youtube-adsense-payment-schedule-2026).

## Action plan this week

1. Studio → Revenue → note RPM and top countries
2. Run scenarios in the [earnings calculator](/tools/youtube-earnings-calculator)
3. Script next 3 videos toward higher-intent keywords
4. Audit packaging with [title generator](/tools/youtube-title-generator)

## Related reading

- [How much YouTube pays per view](/blog/youtube-pay-per-view-2026)
- [Monetization guide](/resources/youtube-monetization-guide)
- [Pay per 1,000 views](/blog/how-much-youtube-pays-per-1000-views-2026)
\`,
    faq: [
      {
        question: "How much does YouTube pay for 1 million views?",
        answer:
          "It depends on RPM. At $3 RPM, about $3,000; at $10 RPM, about $10,000; at $20 RPM, about $20,000. Niche, country mix, ad fill, and format change the outcome. Check YouTube Studio for your real RPM.",
      },
      {
        question: "What is the difference between CPM and RPM?",
        answer:
          "CPM is what advertisers pay per 1,000 ad impressions. RPM is what you earn per 1,000 video views after YouTube’s share and unmonetized views. Plan creator income with RPM.",
      },
      {
        question: "Which YouTube niches pay the most?",
        answer:
          "Finance, investing, business, software, and other high commercial-intent topics usually attract higher advertiser bids than broad entertainment or gaming—especially with Tier 1 audiences.",
      },
      {
        question: "Does YouTube pay for Shorts views?",
        answer:
          "Yes, eligible Partner Program creators can earn from Shorts, but effective pay per view is often much lower than long-form with mid-rolls. Compare both in Studio.",
      },
      {
        question: "How can I increase my channel's RPM?",
        answer:
          "Improve audience geography toward higher-CPM countries when authentic, cover higher-intent topics, enable eligible ad formats, use mid-rolls on longer videos, and protect retention.",
      },
      {
        question: "Is 1 million views enough to quit a job?",
        answer:
          "Not by itself. One million views at a low RPM may be only a few thousand dollars before taxes and expenses. Look at monthly RPM × monthly views and diversify income.",
      },
    ],
  }`,

  "youtube-shorts-monetization-2026": `{
    slug: "youtube-shorts-monetization-2026",
    title: "YouTube Shorts Monetization 2026: Complete Guide to Earning Money",
    excerpt:
      "How YouTube Shorts monetization works in 2026: YPP paths, revenue pool basics, realistic RPM ranges, music impact, and how to use Shorts to grow long-form income.",
    date: "July 19, 2026",
    category: "Monetization",
    author: "Alex Rivera",
    authorRole: "YouTube Monetization Expert",
    readTime: "15 min read",
    metaDescription:
      "YouTube Shorts monetization 2026: eligibility (1,000 subs + 10M Shorts views or watch hours), RPM ranges, music impact, and strategies to earn more.",
    keywords: [
      "youtube shorts monetization",
      "youtube shorts money",
      "shorts revenue",
      "shorts rpm",
      "how much does shorts pay",
      "shorts monetization requirements",
      "youtube shorts earnings",
      "shorts ad revenue",
      "youtube shorts income",
      "make money from shorts",
    ],
    coverImage: "/images/blog/youtube-shorts-monetization-2026.png",
    imageAlt: "YouTube Shorts monetization guide 2026",
    content: \`
::: QUICK-ANSWER
YouTube Shorts can pay through the Partner Program, but **per-view rates are usually much lower than long-form**. Creators typically need **1,000 subscribers** plus either **10 million valid Shorts views in 90 days** or **4,000 long-form watch hours in 12 months**. Shorts often use a **feed ad revenue pool** model; music licensing can reduce your share. Treat Shorts as **growth + testing**, and long-form as **higher RPM revenue**.
:::

Yes—you can earn from Shorts. No—you should not expect long-form RPMs on vertical clips.

## How Shorts monetization works (plain English)

1. Ads appear in the **Shorts feed** (not the same as classic mid-rolls on every Short).  
2. Revenue is collected and distributed under YouTube’s Shorts monetization rules (including creator share that can differ from classic long-form splits).  
3. Your earnings scale with **eligible views**, **audience geography**, **niche**, and **whether music rights take a cut**.

Always confirm live rules in YouTube’s official Partner Program docs—product details change.

## Eligibility paths (typical YPP)

| Path | Common requirement |
|------|--------------------|
| Classic | 1,000 subscribers + 4,000 public watch hours (12 months) |
| Shorts-focused | 1,000 subscribers + 10 million valid public Shorts views (90 days) |

Once in YPP, eligible features (ads, memberships, Super Thanks, etc.) depend on what you enable and policy status.

Full monetization overview: [YouTube monetization guide](/resources/youtube-monetization-guide).

## How much do Shorts pay?

Public creator reports often land **well under long-form RPM**—think cents on many views, not dollars per 1,000 in every niche. Planning ranges you will see online commonly sit around **roughly $0.02–$0.15 per 1,000 Shorts views** depending on country and topic, but **your Studio number wins**.

### Planning examples (illustrative)

| Shorts views | At $0.04 RPM | At $0.08 RPM | At $0.12 RPM |
|--------------|--------------|--------------|--------------|
| 100,000 | $4 | $8 | $12 |
| 1,000,000 | $40 | $80 | $120 |
| 10,000,000 | $400 | $800 | $1,200 |

To model mixed channel income, use the [earnings calculator](/tools/youtube-earnings-calculator) with conservative Shorts RPM and separate long-form RPM.

## Shorts vs long-form (strategy)

| | Shorts | Long-form |
|--|--------|-----------|
| Discovery | Often faster | Steady Search/Suggested |
| RPM | Usually lower | Usually higher |
| Role | Top-of-funnel | Revenue + depth |
| Best use | Hooks, tests, clips | Full tutorials, reviews |

**Smart default:** Shorts find people; long-form pays better per attentive hour.

## Music and originality

Licensed commercial music can reduce what you keep. Prefer:
- YouTube Audio Library / cleared catalogs  
- Original voice + text-led formats  
- Clear rights on every clip  

Faceless Shorts are allowed when policy-compliant—see [faceless channel ideas](/blog/faceless-youtube-channel-ideas-2026).

## Seven ways to improve Shorts outcomes

1. **Hook in the first second** — motion + clear promise  
2. **Original or cleared audio** — protect payout share  
3. **Tier-1 relevant examples** when authentic (USD, tools, workflows)  
4. **Consistency** — 3–7 Shorts/week beats random bursts for most people  
5. **Pin a long-form CTA** — route curiosity to higher RPM videos  
6. **Repurpose winners** — clip best long-form moments with [Shorts script planner](/tools/youtube-shorts-script-planner)  
7. **Hashtags with restraint** — #Shorts + niche terms via [hashtag generator](/tools/youtube-hashtag-generator)

## Payment timing

Shorts ad earnings still flow through **AdSense** monthly after thresholds and verification. See [AdSense payment schedule](/blog/youtube-adsense-payment-schedule-2026).

## Related resources

- [Pay per view guide](/blog/youtube-pay-per-view-2026)  
- [CPM rates by country](/resources/youtube-cpm-rates)  
- [Title generator](/tools/youtube-title-generator) for hook lines  
- Free [tools suite](/tools)
\`,
    faq: [
      {
        question: "How much does YouTube Shorts pay per 1,000 views?",
        answer:
          "Shorts usually pay much less per 1,000 views than long-form. Public planning ranges often fall roughly around a few cents to low tens of cents of RPM depending on niche and country. Your YouTube Studio revenue metrics are the only accurate source for your channel.",
      },
      {
        question: "Is the YouTube Shorts Fund still available in 2026?",
        answer:
          "The original Shorts Fund bonus program ended years ago and was replaced by ongoing Shorts revenue sharing for eligible Partner Program creators. Rely on current YouTube Partner Program documentation, not Fund-era screenshots.",
      },
      {
        question: "Can you make a living from YouTube Shorts alone?",
        answer:
          "It is difficult from Shorts ads alone because RPM is typically low. Most sustainable creators use Shorts for growth and monetize with long-form ads, affiliates, products, or brand deals.",
      },
      {
        question: "Why are my YouTube Shorts earnings so low?",
        answer:
          "Common reasons: lower Shorts economics vs long-form, audience geography, music licensing splits, low commercial intent niches, and comparing Shorts RPM to long-form mid-roll RPM.",
      },
      {
        question: "How do I increase my YouTube Shorts revenue?",
        answer:
          "Improve audience quality, avoid costly music splits when possible, post consistently, target higher-intent topics, and funnel viewers into longer videos with higher RPM.",
      },
      {
        question: "When do you get paid from YouTube Shorts?",
        answer:
          "Eligible earnings pay out through Google AdSense on its monthly schedule after you meet the payment threshold and verification requirements. Check AdSense → Payments for exact timing.",
      },
      {
        question: "Can I monetize Shorts without showing my face?",
        answer:
          "Yes, if you meet Partner Program eligibility and follow content and copyright policies. Faceless formats using original packaging and cleared assets are common.",
      },
    ],
  }`,
};

function findPostRange(raw, slug) {
  const needle = `slug: "${slug}"`;
  const slugPos = raw.indexOf(needle);
  if (slugPos < 0) return null;
  // walk backward to opening brace of object
  let start = slugPos;
  while (start > 0 && raw[start] !== "{") start--;
  // walk forward with brace depth
  let depth = 0;
  let inStr = null;
  let escape = false;
  for (let i = start; i < raw.length; i++) {
    const c = raw[i];
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === "\\\\") {
        escape = true;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "\`") {
      inStr = "\`";
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      continue;
    }
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  return null;
}

let raw = fs.readFileSync(blogPath, "utf8");
for (const [slug, replacement] of Object.entries(REPLACEMENTS)) {
  const range = findPostRange(raw, slug);
  if (!range) {
    console.error("Not found:", slug);
    continue;
  }
  raw = raw.slice(0, range.start) + replacement + raw.slice(range.end);
  console.log("Replaced", slug);
}
fs.writeFileSync(blogPath, raw);
console.log("Done");
