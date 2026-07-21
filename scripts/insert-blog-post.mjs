import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogPath = path.join(__dirname, "..", "src", "config", "blog.ts");
const raw = fs.readFileSync(blogPath, "utf8");

const markerMatch = raw.match(/export const blogPosts: BlogPost\[\]\s*=\s*\[/);
if (!markerMatch || markerMatch.index === undefined) {
  throw new Error("marker not found");
}
const insertAt = markerMatch.index + markerMatch[0].length;

if (raw.includes('slug: "youtube-media-kit-template-2026"')) {
  console.log("Post already exists");
  process.exit(0);
}

const post = `
  {
    slug: "youtube-media-kit-template-2026",
    title: "YouTube Media Kit Template 2026: What Brands Need to See",
    excerpt:
      "Build a YouTube media kit that wins sponsorships: essential sections, sample rate framing, metrics brands check, and a copy-paste template structure for 2026.",
    date: "July 19, 2026",
    category: "Monetization",
    author: "Alex Rivera",
    authorRole: "YouTube Monetization Expert",
    readTime: "13 min read",
    metaDescription:
      "YouTube media kit template 2026: sections brands expect, metrics to include, rate-card tips, and a practical structure to land sponsorships.",
    keywords: [
      "youtube media kit template",
      "youtube media kit",
      "creator media kit",
      "youtube sponsorship rates",
      "influencer media kit template",
      "youtube brand deal kit",
      "creator rate card",
      "youtube sponsorship media kit",
    ],
    coverImage: "/images/blog/youtube-payment-breakdown-2026.png",
    imageAlt:
      "Sample YouTube creator media kit layout with audience stats and sponsorship packages",
    content: \`
::: QUICK-ANSWER
A YouTube media kit is a one-stop PDF or page that shows brands **who you reach, how engaged they are, what you create, and how to work with you**. Include channel overview, audience demographics, top performance metrics, past collaborations, packages/rates (or “starting at”), deliverables, and clear contact. Keep it honest, visual, and updated quarterly.
:::

Sponsorships often pay more than AdSense—but brands buy **risk reduction**. A media kit is how you prove you are a safe, professional partner.

## What is a YouTube media kit?

A media kit (sometimes called a one-sheet or creator deck) summarizes:

1. Your **positioning** (niche + promise)  
2. Your **audience proof** (who watches)  
3. Your **performance proof** (views, CTR, retention where relevant)  
4. Your **offer** (what brands get)  
5. Your **process** (timeline, usage rights, contact)

It is not a novel. **1–2 pages** for early creators; **4–8 slides** for mid-size channels.

## Media kit template (copy this structure)

### 1. Cover / hero
- Channel name + logo  
- One-line value prop (“I help remote workers automate their work stack”)  
- Subscriber count + monthly views (last 28/90 days)  
- Location / primary language / content format  

### 2. About the creator
3–5 sentences: expertise, why the audience trusts you, content pillars.

### 3. Audience demographics
From YouTube Analytics (when available):
- Top countries  
- Age ranges  
- Gender split if meaningful  
- Devices / interest categories if relevant  

Brands care about **fit**, not vanity.

### 4. Performance snapshot
Pick metrics that match campaign goals:

| Metric | Why brands care |
|--------|-----------------|
| Avg views (last 10 videos) | Realistic reach |
| Subscriber growth rate | Momentum |
| Avg CTR (impressions) | Packaging strength |
| Avg view duration / retained | Attention quality |
| Engagement rate | Comments/likes vs views |

Use the free [engagement rate calculator](/tools/youtube-engagement-rate-calculator) to present a clean rate.

### 5. Content examples
3–6 thumbnails or titles of best-fit videos with links. Prefer videos in the **same category** as the brand’s product.

### 6. Past collaborations & social proof
Logos, quote from a brand, or “As seen with…” only if true. No fake brands.

### 7. Packages (sample—customize)

| Package | Deliverables | Best for |
|---------|--------------|----------|
| Spark | 1 integrated 60–90s mention + description link | Product launches |
| Standard | 1 dedicated mid-roll segment + pinned comment + 1 Short | Consideration campaigns |
| Campaign | 1 long-form integration + 2 Shorts + story/community post | Full-funnel pushes |

List **starting rates** or “custom quote” if you are still testing pricing. Never invent competitor prices as “market rates” without evidence.

### 8. What you need from the brand
Brief, talking points, do/don’t claims, tracking links, legal disclaimers, asset deadlines.

### 9. Contact
Professional email, response-time expectation, calendar link optional.

## How to price without guessing wildly

Early channels often underprice. A practical approach:

1. Estimate production hours × a fair hourly rate  
2. Add value for exclusivity / whitelisting / usage rights  
3. Cross-check against your typical AdSense for similar videos using the [earnings calculator](/tools/youtube-earnings-calculator)  
4. Raise prices when you are booked 2–3 weeks out  

Country CPM context helps brands understand audience value—share [CPM by country](/resources/youtube-cpm-rates) only when it supports your Tier-1 story.

## Metrics brands actually open the PDF for

- Audience **country** alignment with their market  
- Recent **average views**, not one viral outlier alone  
- **Brand safety** (no policy drama)  
- Clear **CTA capability** (links, codes, affiliate hygiene)  
- Professional **communication**

## Common media kit mistakes

- Inflating stats or using lifetime totals as “average views”  
- 20 pages of fluff  
- No packages (brands hate open-ended “what do you charge?”)  
- Broken links to sample videos  
- Outdated subscriber counts  

## Tools to assemble proof faster

- [Channel audit checklist](/tools/youtube-channel-audit)  
- [Engagement calculator](/tools/youtube-engagement-rate-calculator)  
- [Content calendar](/tools/youtube-content-calendar-generator) to show upcoming inventory  
- [Title generator](/tools/youtube-title-generator) when proposing concept angles  

## After you send the kit

1. Follow up once at day 5–7  
2. Offer one custom concept tied to their product  
3. Keep a simple CRM sheet of brands contacted  
4. Update the kit after every major milestone (10k, 50k, new format)  

## Related guides

- [Sponsorship guidelines](/blog/youtube-sponsorship-guidelines-2026)  
- [Monetization guide](/resources/youtube-monetization-guide)  
- [AdSense payment schedule](/blog/youtube-adsense-payment-schedule-2026)  
- [How much YouTube pays per view](/blog/youtube-pay-per-view-2026)
\`,
    faq: [
      {
        question: "What should be in a YouTube media kit?",
        answer:
          "Include your channel overview, audience demographics, key performance metrics, content examples, past brand work, packages or starting rates, deliverables, and contact details. Keep stats recent and honest.",
      },
      {
        question: "How long should a creator media kit be?",
        answer:
          "One to two pages (or 4–8 slides) is enough for most creators. Brands skim. Lead with proof and packages, not a long biography.",
      },
      {
        question: "Do I need a media kit before 10,000 subscribers?",
        answer:
          "Yes, if you want brand deals. Smaller channels with niche, high-intent audiences still land micro-sponsorships when the kit is clear and professional.",
      },
      {
        question: "Should I publish my rates publicly?",
        answer:
          "Either list starting packages or say rates are custom. Public starting ranges save time; fully fixed public rates can underprice you as you grow.",
      },
      {
        question: "What metrics do brands care about most?",
        answer:
          "Audience fit (especially country), average views on recent videos, engagement quality, and brand safety. A single viral video matters less than a reliable baseline.",
      },
      {
        question: "PDF or website page for a media kit?",
        answer:
          "PDF is still common for email outreach. A clean webpage works well if you update stats often. Many creators keep both: a page plus a downloadable PDF.",
      },
    ],
  },
`;

const out = raw.slice(0, insertAt) + post + raw.slice(insertAt);
fs.writeFileSync(blogPath, out);
console.log("Inserted youtube-media-kit-template-2026");
