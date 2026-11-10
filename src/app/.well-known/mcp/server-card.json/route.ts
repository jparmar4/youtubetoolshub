import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const baseUrl = siteConfig.url;
  const mcpEndpoint = `${baseUrl}/api/mcp`;

  const serverCard = {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    schemaVersion: "1.0",
    mcpVersion: "2025-03-26",
    protocolVersion: "2025-03-26",
    name: "youtubetoolshub-mcp",
    title: "YouTube Tools Hub MCP Server",
    version: "1.0.0",
    description: `Official Model Context Protocol (MCP) server for ${siteConfig.name} (${baseUrl}). Provides direct agent access to ${tools.length} free YouTube creator tools, 52-country AdSense CPM/RPM calculators, thumbnail URL resolvers, and YouTube growth benchmarks.`,
    homepage: baseUrl,
    documentationUrl: `${baseUrl}/llms-full.txt`,
    url: mcpEndpoint,
    endpoint: mcpEndpoint,
    endpoints: {
      streamableHttp: mcpEndpoint,
      http: mcpEndpoint,
    },
    transport: {
      type: "streamable-http",
      url: mcpEndpoint,
      endpoint: mcpEndpoint,
    },
    remotes: [
      {
        type: "streamable-http",
        url: mcpEndpoint,
      },
    ],
    serverInfo: {
      name: "youtubetoolshub-mcp",
      title: "YouTube Tools Hub MCP Server",
      version: "1.0.0",
      websiteUrl: baseUrl,
    },
    provider: {
      name: siteConfig.name,
      url: baseUrl,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.telephone,
    },
    authentication: {
      required: false,
      type: "none",
      schemes: [],
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
    tools: [
      {
        name: "list_youtube_tools",
        description:
          `List or search all ${tools.length} free YouTube creator tools on YouTube Tools Hub by category or keyword.`,
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
        },
      },
      {
        name: "estimate_youtube_earnings",
        description:
          "Estimate YouTube AdSense revenue (RPM and CPM) by monthly/daily views and country (52 countries supported).",
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
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
        },annotations: {
          readOnlyHint: true,
          openWorldHint: false,
        },
      },
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
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
        annotations: {
          readOnlyHint: true,
          openWorldHint: false,
        },
      },
    ],
    resources: [
      {
        uri: `${baseUrl}/llms.txt`,
        name: "YouTube Tools Hub LLMs Summary",
        description:
          `Concise Markdown index of all ${tools.length} YouTube creator tools and resources.`,
        mimeType: "text/plain",
      },
      {
        uri: `${baseUrl}/api/ai-context`,
        name: "YouTube Tools Hub AI Context & CPM Dataset",
        description:
          "Structured JSON knowledge graph, 52-country CPM/RPM dataset, and FAQs.",
        mimeType: "application/json",
      },
      {
        uri: `${baseUrl}/index.md`,
        name: "YouTube Tools Hub Markdown Homepage",
        description: "Clean Markdown representation of the homepage for AI agents.",
        mimeType: "text/markdown",
      },
    ],
    prompts: [
      {
        name: "youtube-seo-audit",
        description:
          "Generate a YouTube video title, tag, and thumbnail optimization plan using YouTube Tools Hub.",
        arguments: [
          {
            name: "topic",
            description: "The video topic or working title.",
            required: true,
          },
        ],
      },
    ],
  };

  return NextResponse.json(serverCard, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=7200, stale-while-revalidate=43200",
      "X-Robots-Tag": "index, follow, noarchive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });
}
