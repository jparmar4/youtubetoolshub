import { ImageResponse } from "next/og";
import { tools } from "@/config/tools";

export const alt = "YouTube Tools Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
    return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function OGImage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                        color: "#fff",
                        fontSize: 48,
                        fontWeight: 800,
                    }}
                >
                    YouTube Tools Hub
                </div>
            ),
            { ...size },
        );
    }

    const categoryLabels: Record<string, string> = {
        "thumbnail-media": "Thumbnail & Media",
        "seo-metadata": "SEO & Metadata",
        "channel-growth": "Channel Growth",
        "analytics-earnings": "Analytics & Earnings",
        "utility-fun": "Utility & Fun",
    };

    const categoryLabel = categoryLabels[tool.category] || tool.category;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
                    padding: "60px 70px",
                    position: "relative",
                }}
            >
                {/* Decorative gradient circle */}
                <div
                    style={{
                        position: "absolute",
                        top: -120,
                        right: -120,
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
                        display: "flex",
                    }}
                />

                {/* Bottom accent line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: "linear-gradient(90deg, #a855f7, #7c3aed, #6366f1)",
                        display: "flex",
                    }}
                />

                {/* Category badge */}
                <div
                    style={{
                        display: "flex",
                        marginBottom: 30,
                    }}
                >
                    <div
                        style={{
                            background: "rgba(168,85,247,0.2)",
                            border: "1px solid rgba(168,85,247,0.4)",
                            borderRadius: 100,
                            padding: "8px 24px",
                            color: "#c084fc",
                            fontSize: 18,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            display: "flex",
                        }}
                    >
                        {categoryLabel}
                    </div>
                </div>

                {/* Tool name */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: tool.name.length > 30 ? 52 : 64,
                            fontWeight: 900,
                            color: "#ffffff",
                            lineHeight: 1.1,
                            letterSpacing: "-0.03em",
                            display: "flex",
                            marginBottom: 20,
                        }}
                    >
                        {tool.name}
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: "rgba(203,213,225,0.8)",
                            lineHeight: 1.5,
                            maxWidth: 800,
                            display: "flex",
                        }}
                    >
                        {tool.shortDescription.length > 120
                            ? tool.shortDescription.substring(0, 117) + "..."
                            : tool.shortDescription}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(148,163,184,0.2)",
                        paddingTop: 24,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 18,
                                fontWeight: 900,
                            }}
                        >
                            YT
                        </div>
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: 800,
                                color: "#e2e8f0",
                                letterSpacing: "-0.02em",
                                display: "flex",
                            }}
                        >
                            YouTube Tools Hub
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 16,
                                color: "#94a3b8",
                                fontWeight: 600,
                                display: "flex",
                            }}
                        >
                            100% Free • No Signup
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
