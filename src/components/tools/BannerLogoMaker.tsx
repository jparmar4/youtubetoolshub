"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaDownload, FaImage, FaRedo } from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LimitReachedModal from "@/components/ui/LimitReachedModal";
import UsageBanner from "@/components/ui/UsageBanner";
import { useUsage } from "@/hooks/useUsage";

type BannerStyle = "spotlight" | "stripes" | "minimal";

const faq = [
    {
        question: "What size is the exported YouTube banner?",
        answer: "The exported banner is 2560 by 1440 pixels. The optional guide shows the central safe area where important text should remain visible across devices.",
    },
    {
        question: "Does this tool upload my branding?",
        answer: "No. The preview and image exports are created locally in your browser.",
    },
    {
        question: "Can I use the logo export as my channel avatar?",
        answer: "Yes. The square logo export is designed as a simple starting point for a channel avatar. Review it before publishing to make sure it matches your brand.",
    },
];

function getInitials(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("") || "YT";
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

export default function BannerLogoMaker() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [channelName, setChannelName] = useState("Creator Studio");
    const [tagline, setTagline] = useState("Videos every week");
    const [background, setBackground] = useState("#111827");
    const [accent, setAccent] = useState("#ef4444");
    const [textColor, setTextColor] = useState("#ffffff");
    const [style, setStyle] = useState<BannerStyle>("spotlight");
    const [showGuide, setShowGuide] = useState(true);
    const { checkLimit, increment, limitReachedTool, closeLimitModal } = useUsage();

    const drawBanner = useCallback((withGuide: boolean) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (style === "spotlight") {
            const gradient = ctx.createRadialGradient(520, 720, 30, 520, 720, 1050);
            gradient.addColorStop(0, accent);
            gradient.addColorStop(1, background);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (style === "stripes") {
            ctx.save();
            ctx.globalAlpha = 0.72;
            ctx.fillStyle = accent;
            for (let x = -600; x < canvas.width + 600; x += 240) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x + 520, 0);
                ctx.lineTo(x - 160, canvas.height);
                ctx.lineTo(x - 680, canvas.height);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        if (style === "minimal") {
            ctx.fillStyle = accent;
            ctx.fillRect(0, canvas.height - 38, canvas.width, 38);
        }

        const safeX = (canvas.width - 1546) / 2;
        const safeY = (canvas.height - 423) / 2;
        const badgeSize = 250;
        const badgeX = safeX + 70;
        const badgeY = canvas.height / 2;

        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(badgeX + badgeSize / 2, badgeY, badgeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "700 96px Arial";
        ctx.fillText(getInitials(channelName), badgeX + badgeSize / 2, badgeY + 6);

        ctx.textAlign = "left";
        ctx.font = "700 126px Arial";
        ctx.fillText(channelName || "Your Channel", badgeX + badgeSize + 70, badgeY - 40);
        ctx.font = "400 56px Arial";
        ctx.globalAlpha = 0.9;
        ctx.fillText(tagline || "Your channel tagline", badgeX + badgeSize + 76, badgeY + 78);
        ctx.globalAlpha = 1;

        if (withGuide) {
            ctx.save();
            ctx.strokeStyle = "#fbbf24";
            ctx.lineWidth = 8;
            ctx.setLineDash([28, 22]);
            ctx.strokeRect(safeX, safeY, 1546, 423);
            ctx.setLineDash([]);
            ctx.fillStyle = "#fbbf24";
            ctx.font = "700 34px Arial";
            ctx.textAlign = "left";
            ctx.fillText("SAFE AREA PREVIEW", safeX, safeY - 28);
            ctx.restore();
        }
    }, [accent, background, channelName, style, tagline, textColor]);

    useEffect(() => {
        drawBanner(showGuide);
    }, [drawBanner, showGuide]);

    const downloadBanner = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!checkLimit("youtube-banner-logo-maker")) return;

        drawBanner(false);
        downloadCanvas(canvas, "youtube-channel-banner.png");
        drawBanner(showGuide);
        increment("youtube-banner-logo-maker");
    };

    const downloadLogo = () => {
        if (!checkLimit("youtube-banner-logo-maker")) return;

        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(400, 400, 282, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "700 240px Arial";
        ctx.fillText(getInitials(channelName), 400, 425);
        downloadCanvas(canvas, "youtube-channel-logo.png");
        increment("youtube-banner-logo-maker");
    };

    const reset = () => {
        setChannelName("Creator Studio");
        setTagline("Videos every week");
        setBackground("#111827");
        setAccent("#ef4444");
        setTextColor("#ffffff");
        setStyle("spotlight");
        setShowGuide(true);
    };

    return (
        <ToolPageLayout
            title="YouTube Banner and Logo Maker"
            slug="youtube-banner-logo-maker"
            description="Create a simple YouTube channel banner and matching logo locally in your browser, with a safe-area preview for important text."
            faq={faq}
        >
            <div className="space-y-6">
                <UsageBanner toolSlug="youtube-banner-logo-maker" />
                <LimitReachedModal isOpen={!!limitReachedTool} onClose={closeLimitModal} toolSlug={limitReachedTool} />

                <div className="grid gap-5 md:grid-cols-2">
                    <Input label="Channel name" value={channelName} maxLength={24} onChange={(event) => setChannelName(event.target.value)} />
                    <Input label="Tagline" value={tagline} maxLength={42} onChange={(event) => setTagline(event.target.value)} />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <ColorField label="Background" value={background} onChange={setBackground} />
                    <ColorField label="Accent" value={accent} onChange={setAccent} />
                    <ColorField label="Text" value={textColor} onChange={setTextColor} />
                </div>

                <div className="grid gap-5 md:grid-cols-[1fr_auto]">
                    <label className="block text-sm font-medium text-slate-700">
                        Layout style
                        <select
                            value={style}
                            onChange={(event) => setStyle(event.target.value as BannerStyle)}
                            className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none"
                        >
                            <option value="spotlight">Spotlight</option>
                            <option value="stripes">Diagonal stripes</option>
                            <option value="minimal">Minimal</option>
                        </select>
                    </label>
                    <label className="flex items-end gap-2 pb-3 text-sm font-medium text-slate-700">
                        <input type="checkbox" checked={showGuide} onChange={(event) => setShowGuide(event.target.checked)} className="h-4 w-4 accent-purple-600" />
                        Show safe area guide
                    </label>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <canvas ref={canvasRef} width={2560} height={1440} className="block h-auto w-full" aria-label="YouTube banner preview" />
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button onClick={downloadBanner}>
                        <FaDownload className="mr-2" />
                        Download Banner
                    </Button>
                    <Button variant="secondary" onClick={downloadLogo}>
                        <FaImage className="mr-2" />
                        Download Logo
                    </Button>
                    <Button variant="ghost" onClick={reset}>
                        <FaRedo className="mr-2" />
                        Reset
                    </Button>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">
                    The yellow safe-area guide is preview-only and is excluded from the exported banner. Use your own brand name and confirm that you have rights to any text or assets you publish.
                </p>
            </div>
        </ToolPageLayout>
    );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
    return (
        <label className="block text-sm font-medium text-slate-700">
            {label}
            <span className="mt-2 flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-3 py-2">
                <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-10 cursor-pointer border-0 bg-transparent" />
                <span className="font-mono text-sm uppercase text-slate-700">{value}</span>
            </span>
        </label>
    );
}
