import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { countryCPMData } from "@/lib/cpm-data";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
};

const MCP_TOOLS = [
  {
    name: "list_youtube_tools",
    description:
      "List or search all 44 free YouTube creator tools on YouTube Tools Hub by category or keyword.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Optional tool category filter (thumbnail-media, seo-metadata, channel-growth, analytics-earnings, utility-fun).",
        },
        query: {
          type: "string",
          description: "Optional search keyword to filter tools.",
        },
      },
    },
  },
  {
    name: "estimate_youtube_earnings",
    description:
      "Estimate YouTube AdSense revenue (RPM and CPM) by views and country (52 countries supported).",
    inputSchema: {
      type: "object",
      properties: {
        views: {
          type: "number",
          description: "Number of video views to calculate earnings for.",
        },
        country: {
          type: "string",
          description:
            "Country slug or code (e.g. 'usa', 'uk', 'canada', 'australia', 'germany', 'india'). Defaults to 'usa'.",
        },
      },
      required: ["views"],
    },
  },
  {
    name: "get_country_cpm_rates",
    description:
      "Retrieve 2026 YouTube CPM and RPM benchmark ranges across 52 countries.",
    inputSchema: {
      type: "object",
      properties: {
        country: {
          type: "string",
          description:
            "Optional country name, code, or slug to filter (e.g. 'US', 'usa', 'United Kingdom').",
        },
      },
    },
  },
  {
    name: "get_youtube_thumbnail_urls",
    description:
      "Resolve direct 4K/HD/SD YouTube thumbnail image URLs for any YouTube video ID or URL.",
    inputSchema: {
      type: "object",
      properties: {
        videoIdOrUrl: {
          type: "string",
          description: "YouTube video URL or 11-character video ID.",
        },
      },
      required: ["videoIdOrUrl"],
    },
  },,
  {
    name: "estimate_sponsorship_rate",
    description:
      "Estimate recommended YouTube brand deal / sponsor fee and CPM benchmarks based on expected video views and niche.",
    inputSchema: {
      type: "object",
      properties: {
        views: {
          type: "number",
          description: "Expected average video views (e.g. 25000).",
        },
        niche: {
          type: "string",
          description:
            "Creator niche: 'finance', 'tech', 'business', 'education', 'fitness', 'lifestyle', 'gaming'. Defaults to 'tech'.",
        },
        placement: {
          type: "string",
          description:
            "Placement format: 'integration_60s' (60-90s mid-roll), 'mention_30s', 'dedicated' (full video), 'shorts'. Defaults to 'integration_60s'.",
        },
      },
      required: ["views"],
    },
  },
  {
    name: "estimate_channel_valuation",
    description:
      "Calculate YouTube channel asset sale valuation multiple (24x-36x monthly net earnings) based on combined AdSense and sponsor revenue.",
    inputSchema: {
      type: "object",
      properties: {
        monthlyRevenue: {
          type: "number",
          description: "Average total monthly net income from AdSense, sponsors, and affiliates (USD).",
        },
        contentStyle: {
          type: "string",
          description:
            "Channel operating style: 'faceless' (higher transferability) or 'personal_brand'. Defaults to 'faceless'.",
        },
      },
      required: ["monthlyRevenue"],
    },
  },
  {
    name: "estimate_shorts_earnings",
    description:
      "Calculate YouTube Shorts AdSense revenue based on views and 2026 Shorts RPM benchmarks ($0.03 - $0.07 per 1,000 views).",
    inputSchema: {
      type: "object",
      properties: {
        views: {
          type: "number",
          description: "Number of YouTube Shorts views.",
        },
        rpm: {
          type: "number",
          description: "Optional custom Shorts RPM in USD (defaults to $0.05).",
        },
      },
      required: ["views"],
    },
  },
  {
    name: "calculate_youtube_tax_deductions",
    description:
      "Calculate estimated eligible business tax write-offs, taxable income reduction, and tax savings for YouTube creators.",
    inputSchema: {
      type: "object",
      properties: {
        annualRevenue: {
          type: "number",
          description: "Gross annual creator revenue from YouTube and sponsors (USD).",
        },
        equipmentAndGear: {
          type: "number",
          description: "Annual spending on cameras, lighting, audio, PCs, and gear (USD).",
        },
        softwareAndSubscriptions: {
          type: "number",
          description: "Annual spending on Adobe, Canva, hosting, music, plugins, and AI tools (USD).",
        },
        homeStudioRent: {
          type: "number",
          description: "Estimated annual home office / studio deduction (USD).",
        },
        contractorsAndEditors: {
          type: "number",
          description: "Annual spending on video editors, thumbnail designers, and contractors (USD).",
        },
      },
      required: ["annualRevenue"],
    },
  },
];

function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

export async function GET() {
  const baseUrl = siteConfig.url;
  return NextResponse.json(
    {
      name: "youtubetoolshub-mcp",
      title: "YouTube Tools Hub MCP Server",
      version: "1.0.0",
      protocolVersion: "2025-03-26",
      endpoint: `${baseUrl}/api/mcp`,
      serverCard: `${baseUrl}/.well-known/mcp/server-card.json`,
      capabilities: {
        tools: { listChanged: false },
        resources: { subscribe: false, listChanged: false },
        prompts: { listChanged: false },
      },
      tools: MCP_TOOLS,
    },
    { headers: CORS_HEADERS },
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  const baseUrl = siteConfig.url;
  let body: {
    jsonrpc?: string;
    id?: string | number | null;
    method?: string;
    params?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error: Invalid JSON" },
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const id = body.id ?? null;
  const method = body.method || "";
  const params = body.params || {};

  if (method === "initialize") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2025-03-26",
          capabilities: {
            tools: { listChanged: false },
            resources: { subscribe: false, listChanged: false },
            prompts: { listChanged: false },
          },
          serverInfo: {
            name: "youtubetoolshub-mcp",
            title: "YouTube Tools Hub MCP Server",
            version: "1.0.0",
          },
        },
      },
      { headers: CORS_HEADERS },
    );
  }

  if (method === "notifications/initialized") {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }

  if (method === "ping") {
    return NextResponse.json(
      { jsonrpc: "2.0", id, result: {} },
      { headers: CORS_HEADERS },
    );
  }

  if (method === "tools/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: { tools: MCP_TOOLS },
      },
      { headers: CORS_HEADERS },
    );
  }

  if (method === "tools/call") {
    const toolName = String(params.name || "");
    const args = (params.arguments as Record<string, unknown>) || {};

    if (toolName === "list_youtube_tools") {
      const catFilter = String(args.category || "").toLowerCase();
      const queryFilter = String(args.query || "").toLowerCase();
      const filtered = tools
        .filter((t) => {
          if (catFilter && t.category.toLowerCase() !== catFilter) return false;
          if (
            queryFilter &&
            !t.name.toLowerCase().includes(queryFilter) &&
            !t.shortDescription.toLowerCase().includes(queryFilter)
          ) {
            return false;
          }
          return true;
        })
        .map((t) => ({
          name: t.name,
          slug: t.slug,
          category: t.category,
          isAI: Boolean(t.isAI),
          description: t.shortDescription,
          url: `${baseUrl}/tools/${t.slug}`,
        }));

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { count: filtered.length, tools: filtered },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "estimate_youtube_earnings") {
      const views = Math.max(0, Number(args.views || 10000));
      const countryKey = String(args.country || "usa").toLowerCase();
      const country =
        countryCPMData.find(
          (c) =>
            c.slug.toLowerCase() === countryKey ||
            c.code.toLowerCase() === countryKey ||
            c.name.toLowerCase() === countryKey,
        ) || countryCPMData[0];

      const minUsd = (views / 1000) * country.rpmRange.min;
      const avgUsd = (views / 1000) * country.rpmRange.avg;
      const maxUsd = (views / 1000) * country.rpmRange.max;

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    views,
                    country: country.name,
                    countryCode: country.code,
                    rpmRangeUsd: country.rpmRange,
                    cpmRangeUsd: country.cpmRange,
                    estimatedEarningsUsd: {
                      min: Number(minUsd.toFixed(2)),
                      avg: Number(avgUsd.toFixed(2)),
                      max: Number(maxUsd.toFixed(2)),
                    },
                    calculatorUrl: `${baseUrl}/tools/youtube-earnings-calculator/${country.slug}`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "get_country_cpm_rates") {
      const filter = String(args.country || "").toLowerCase();
      const matches = countryCPMData
        .filter((c) => {
          if (!filter) return true;
          return (
            c.slug.toLowerCase() === filter ||
            c.code.toLowerCase() === filter ||
            c.name.toLowerCase().includes(filter)
          );
        })
        .map((c) => ({
          name: c.name,
          code: c.code,
          slug: c.slug,
          cpmRangeUsd: c.cpmRange,
          rpmRangeUsd: c.rpmRange,
          url: `${baseUrl}/tools/youtube-earnings-calculator/${c.slug}`,
        }));

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  { count: matches.length, countries: matches },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "get_youtube_thumbnail_urls") {
      const videoId = extractYouTubeId(String(args.videoIdOrUrl || ""));
      if (!videoId) {
        return NextResponse.json(
          {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [
                {
                  type: "text",
                  text: "Invalid YouTube video URL or 11-character video ID.",
                },
              ],
            },
          },
          { headers: CORS_HEADERS },
        );
      }

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    videoId,
                    thumbnails: {
                      maxresdefault_hd: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                      sddefault: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
                      hqdefault: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                      mqdefault: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                    },
                    toolUrl: `${baseUrl}/tools/youtube-thumbnail-downloader`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

        if (toolName === "estimate_sponsorship_rate") {
      const views = Math.max(100, Number(args.views) || 10000);
      const niche = String(args.niche || "tech").toLowerCase();
      const placement = String(args.placement || "integration_60s").toLowerCase();

      const nicheMultipliers: Record<string, { name: string; multiplier: number }> = {
        finance: { name: "Personal Finance & Investing", multiplier: 2.2 },
        business: { name: "Business, Career & SaaS", multiplier: 1.8 },
        tech: { name: "Technology & Software", multiplier: 1.4 },
        education: { name: "Education & How-To", multiplier: 1.25 },
        fitness: { name: "Health & Fitness", multiplier: 1.2 },
        lifestyle: { name: "Lifestyle & Travel", multiplier: 1.1 },
        gaming: { name: "Gaming & Entertainment", multiplier: 0.85 },
      };

      const placementMultipliers: Record<string, { name: string; multiplier: number }> = {
        integration_60s: { name: "60-90s Mid-Roll Integration", multiplier: 1.0 },
        mention_30s: { name: "30s Preroll / Shoutout", multiplier: 0.55 },
        dedicated: { name: "Full Dedicated Video", multiplier: 2.8 },
        shorts: { name: "YouTube Shorts (60s Vertical)", multiplier: 0.35 },
      };

      const nm = nicheMultipliers[niche] || nicheMultipliers.tech;
      const pm = placementMultipliers[placement] || placementMultipliers.integration_60s;

      const baseCpmMin = 22;
      const baseCpmMax = 35;
      const effectiveCpmMin = +(baseCpmMin * nm.multiplier * pm.multiplier).toFixed(2);
      const effectiveCpmMax = +(baseCpmMax * nm.multiplier * pm.multiplier).toFixed(2);

      const feeMin = Math.round((views / 1000) * effectiveCpmMin);
      const feeMax = Math.round((views / 1000) * effectiveCpmMax);
      const feeMid = Math.round((feeMin + feeMax) / 2);

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    views,
                    niche: nm.name,
                    placement: pm.name,
                    recommendedSponsorFeeUsd: {
                      low: feeMin,
                      average: feeMid,
                      high: feeMax,
                    },
                    effectiveCpmRangeUsd: `${effectiveCpmMin} – ${effectiveCpmMax}`,
                    pricingAdvice:
                      "Always quote the high end and include 30-day usage rights or a pinned comment link as negotiation concessions.",
                    toolUrl: `${baseUrl}/tools/youtube-sponsorship-calculator`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "estimate_channel_valuation") {
      const monthly = Math.max(0, Number(args.monthlyRevenue) || 2500);
      const style = String(args.contentStyle || "faceless").toLowerCase();
      const isFaceless = style.includes("faceless");

      const lowMultiple = isFaceless ? 26 : 22;
      const midMultiple = isFaceless ? 32 : 28;
      const highMultiple = isFaceless ? 38 : 34;

      const annualRevenue = monthly * 12;
      const valLow = monthly * lowMultiple;
      const valMid = monthly * midMultiple;
      const valHigh = monthly * highMultiple;

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    monthlyNetRevenueUsd: monthly,
                    annualizedNetRevenueUsd: annualRevenue,
                    contentStyle: isFaceless ? "Faceless / Systematized (Higher Multiple)" : "Personal Brand (Founder Dependent)",
                    valuationRangeUsd: {
                      conservative_24x: valLow,
                      median_30x: valMid,
                      premium_36x: valHigh,
                    },
                    valuationMultiples: `${lowMultiple}x – ${highMultiple}x monthly net profit`,
                    brokerBenchmark:
                      "Faceless channels with diversified traffic trade between 28x and 36x monthly net earnings on marketplaces like Empire Flippers and Flippa.",
                    toolUrl: `${baseUrl}/tools/youtube-channel-valuation-calculator`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "estimate_shorts_earnings") {
      const views = Math.max(1, Number(args.views) || 100000);
      const rpmCustom = args.rpm !== undefined ? Number(args.rpm) : null;
      const rpmAvg = rpmCustom !== null && !isNaN(rpmCustom) ? rpmCustom : 0.05;
      const rpmMin = 0.03;
      const rpmMax = 0.07;

      const estMin = +( (views / 1000) * rpmMin ).toFixed(2);
      const estAvg = +( (views / 1000) * rpmAvg ).toFixed(2);
      const estMax = +( (views / 1000) * rpmMax ).toFixed(2);

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    views,
                    shortsRpmBenchmarkUsd: {
                      lowTier: rpmMin,
                      average: rpmAvg,
                      highTier: rpmMax,
                    },
                    estimatedAdSenseRevenueUsd: {
                      minimum: estMin,
                      expected: estAvg,
                      maximum: estMax,
                    },
                    monetizationBenchmark:
                      "YouTube Shorts revenue pool pays between $0.03 and $0.07 per 1,000 views. 1,000,000 Shorts views generates approximately $30 to $70 in AdSense earnings.",
                    toolUrl: `${baseUrl}/tools/youtube-shorts-monetization-calculator`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    if (toolName === "calculate_youtube_tax_deductions") {
      const annualRev = Math.max(0, Number(args.annualRevenue) || 50000);
      const gear = Math.max(0, Number(args.equipmentAndGear) || 0);
      const software = Math.max(0, Number(args.softwareAndSubscriptions) || 0);
      const homeStudio = Math.max(0, Number(args.homeStudioRent) || 0);
      const contractors = Math.max(0, Number(args.contractorsAndEditors) || 0);

      const totalDeductions = gear + software + homeStudio + contractors;
      const taxableNetProfit = Math.max(0, annualRev - totalDeductions);
      const estimatedTaxSavingsUsd = +(totalDeductions * 0.30).toFixed(2);

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    grossAnnualRevenueUsd: annualRev,
                    deductionsBreakdownUsd: {
                      gearAndEquipment: gear,
                      softwareAndSubscriptions: software,
                      homeStudioAndUtilities: homeStudio,
                      contractorsAndEditors: contractors,
                      totalDeductions,
                    },
                    adjustedTaxableNetProfitUsd: taxableNetProfit,
                    estimatedTaxSavingsUsd,
                    effectiveTaxBracketUsed: "30% (15.3% SE tax + ~15% federal/state bracket)",
                    advisoryNote:
                      "Legitimate creator write-offs must be ordinary and necessary business expenses per IRS Section 162. Keep digital receipts for all gear and subscription purchases.",
                    toolUrl: `${baseUrl}/tools/youtube-tax-deduction-calculator`,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        },
        { headers: CORS_HEADERS },
      );
    }

    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Unknown tool: ${toolName}` },
      },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  if (method === "resources/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          resources: [
            {
              uri: `${baseUrl}/llms.txt`,
              name: "YouTube Tools Hub LLMs Summary",
              mimeType: "text/plain",
            },
            {
              uri: `${baseUrl}/api/ai-context`,
              name: "YouTube Tools Hub AI Context & CPM Dataset",
              mimeType: "application/json",
            },
            {
              uri: `${baseUrl}/index.md`,
              name: "YouTube Tools Hub Markdown Homepage",
              mimeType: "text/markdown",
            },
          ],
        },
      },
      { headers: CORS_HEADERS },
    );
  }

  if (method === "prompts/list") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          prompts: [
            {
              name: "youtube-seo-audit",
              description:
                "Generate a YouTube video title, tag, and thumbnail optimization plan.",
              arguments: [
                {
                  name: "topic",
                  description: "The video topic or working title.",
                  required: true,
                },
              ],
            },
          ],
        },
      },
      { headers: CORS_HEADERS },
    );
  }

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    },
    { status: 404, headers: CORS_HEADERS },
  );
}
