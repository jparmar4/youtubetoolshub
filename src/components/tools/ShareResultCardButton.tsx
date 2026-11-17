"use client";

import { useState } from "react";
import { FaCheck, FaDownload } from "react-icons/fa";

export interface ShareResultMetric {
  label: string;
  value: string;
}

export interface ShareResultCardButtonProps {
  badgeText?: string;
  headline: string;
  subtitle?: string;
  metrics: ShareResultMetric[];
  accent?: "emerald" | "purple" | "blue" | "amber";
  filename?: string;
  buttonLabel?: string;
  className?: string;
}

const ACCENT_PALETTE: Record<
  NonNullable<ShareResultCardButtonProps["accent"]>,
  {
    stripeStart: string;
    stripeEnd: string;
    pillBg: string;
    pillBorder: string;
    pillText: string;
    glow: string;
    valueText: string;
  }
> = {
  emerald: {
    stripeStart: "#10b981",
    stripeEnd: "#14b8a6",
    pillBg: "rgba(16, 185, 129, 0.16)",
    pillBorder: "rgba(52, 211, 153, 0.45)",
    pillText: "#6ee7b7",
    glow: "rgba(16, 185, 129, 0.18)",
    valueText: "#34d399",
  },
  purple: {
    stripeStart: "#a855f7",
    stripeEnd: "#ec4899",
    pillBg: "rgba(168, 85, 247, 0.18)",
    pillBorder: "rgba(192, 132, 252, 0.45)",
    pillText: "#e9d5ff",
    glow: "rgba(168, 85, 247, 0.2)",
    valueText: "#c084fc",
  },
  blue: {
    stripeStart: "#3b82f6",
    stripeEnd: "#06b6d4",
    pillBg: "rgba(59, 130, 246, 0.18)",
    pillBorder: "rgba(96, 165, 250, 0.45)",
    pillText: "#bfdbfe",
    glow: "rgba(59, 130, 246, 0.18)",
    valueText: "#60a5fa",
  },
  amber: {
    stripeStart: "#f59e0b",
    stripeEnd: "#f97316",
    pillBg: "rgba(245, 158, 11, 0.18)",
    pillBorder: "rgba(251, 191, 36, 0.45)",
    pillText: "#fde68a",
    glow: "rgba(245, 158, 11, 0.18)",
    valueText: "#fbbf24",
  },
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
      if (lines.length === maxLines - 1) {
        // Append remainder truncated cleanly if hitting maxLines
        const rest = [current, ...words.slice(i + 1)].join(" ");
        let trimmed = rest;
        while (
          trimmed.length > 4 &&
          ctx.measureText(`${trimmed}...`).width > maxWidth
        ) {
          trimmed = trimmed.slice(0, -1);
        }
        lines.push(trimmed === rest ? trimmed : `${trimmed}...`);
        return lines;
      }
    }
  }
  lines.push(current);
  return lines.slice(0, maxLines);
}

function renderBenchmarkCardPng(props: {
  badgeText: string;
  headline: string;
  subtitle?: string;
  metrics: ShareResultMetric[];
  accent: NonNullable<ShareResultCardButtonProps["accent"]>;
}): HTMLCanvasElement {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const palette = ACCENT_PALETTE[props.accent];

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D canvas unavailable");
  }

  // Deep studio gradient background
  const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bgGrad.addColorStop(0, "#090d16");
  bgGrad.addColorStop(0.55, "#0f172a");
  bgGrad.addColorStop(1, "#090f1c");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle ambient glow
  const glowGrad = ctx.createRadialGradient(960, 120, 20, 960, 120, 480);
  glowGrad.addColorStop(0, palette.glow);
  glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Outer card frame
  drawRoundedRect(ctx, 44, 38, WIDTH - 88, HEIGHT - 76, 30);
  ctx.fillStyle = "rgba(15, 23, 42, 0.86)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
  ctx.stroke();

  // Top accent bar clipped inside top of frame
  const stripeGrad = ctx.createLinearGradient(80, 38, WIDTH - 80, 38);
  stripeGrad.addColorStop(0, palette.stripeStart);
  stripeGrad.addColorStop(1, palette.stripeEnd);
  drawRoundedRect(ctx, 74, 38, WIDTH - 148, 6, 3);
  ctx.fillStyle = stripeGrad;
  ctx.fill();

  // Badge pill
  const badgeLabel = props.badgeText.toUpperCase();
  ctx.font = "800 16px system-ui, -apple-system, Segoe UI, sans-serif";
  const badgeW = Math.min(540, ctx.measureText(badgeLabel).width + 40);
  drawRoundedRect(ctx, 90, 82, badgeW, 38, 19);
  ctx.fillStyle = palette.pillBg;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = palette.pillBorder;
  ctx.stroke();
  ctx.fillStyle = palette.pillText;
  ctx.textBaseline = "middle";
  ctx.fillText(badgeLabel, 110, 101);

  // Headline
  ctx.font = "900 54px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillStyle = "#f8fafc";
  ctx.textBaseline = "top";
  const headlineLines = wrapTextLines(ctx, props.headline, WIDTH - 180, 2);
  let cursorY = 148;
  for (const line of headlineLines) {
    ctx.fillText(line, 90, cursorY);
    cursorY += 66;
  }

  // Optional subtitle
  if (props.subtitle) {
    ctx.font = "500 22px system-ui, -apple-system, Segoe UI, sans-serif";
    ctx.fillStyle = "#94a3b8";
    const subLines = wrapTextLines(ctx, props.subtitle, WIDTH - 180, 2);
    for (const sLine of subLines) {
      ctx.fillText(sLine, 90, cursorY + 4);
      cursorY += 30;
    }
  }

  // 3 Key Metric Cards
  const displayMetrics = props.metrics.slice(0, 3);
  const boxY = 330;
  const boxH = 166;
  const gap = 22;
  const totalInnerW = WIDTH - 180;
  const cardW =
    displayMetrics.length > 0
      ? (totalInnerW - gap * (displayMetrics.length - 1)) / displayMetrics.length
      : totalInnerW;

  displayMetrics.forEach((metric, idx) => {
    const x = 90 + idx * (cardW + gap);
    drawRoundedRect(ctx, x, boxY, cardW, boxH, 20);
    ctx.fillStyle = "rgba(30, 41, 59, 0.78)";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
    ctx.stroke();

    // Metric Label
    ctx.font = "700 15px system-ui, -apple-system, Segoe UI, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.textBaseline = "top";
    const labelLines = wrapTextLines(
      ctx,
      metric.label.toUpperCase(),
      cardW - 44,
      1,
    );
    ctx.fillText(labelLines[0] || "", x + 22, boxY + 26);

    // Metric Value
    ctx.font = "900 34px system-ui, -apple-system, Segoe UI, sans-serif";
    ctx.fillStyle = idx === 0 ? palette.valueText : "#f8fafc";
    const valLines = wrapTextLines(ctx, metric.value, cardW - 44, 2);
    valLines.forEach((vl, li) => {
      ctx.fillText(vl, x + 22, boxY + 62 + li * 40);
    });
  });

  // Footer divider + badge
  ctx.beginPath();
  ctx.moveTo(90, 528);
  ctx.lineTo(WIDTH - 90, 528);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
  ctx.stroke();

  ctx.font = "700 17px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.textBaseline = "middle";
  ctx.fillText("2026 Creator Benchmark Card", 90, 560);

  const footerText = "Calculated free at YouTubeToolsHub.com";
  ctx.font = "800 17px system-ui, -apple-system, Segoe UI, sans-serif";
  const footerW = ctx.measureText(footerText).width + 32;
  const pillX = WIDTH - 90 - footerW;
  drawRoundedRect(ctx, pillX, 541, footerW, 38, 19);
  ctx.fillStyle = palette.pillBg;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.pillBorder;
  ctx.stroke();
  ctx.fillStyle = palette.pillText;
  ctx.fillText(footerText, pillX + 16, 560);

  return canvas;
}

export default function ShareResultCardButton({
  badgeText = "Creator Benchmark",
  headline,
  subtitle,
  metrics,
  accent = "emerald",
  filename = "youtubetoolshub-benchmark.png",
  buttonLabel = "Download Benchmark Card (PNG)",
  className = "",
}: ShareResultCardButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (typeof document === "undefined") return;
    try {
      const canvas = renderBenchmarkCardPng({
        badgeText,
        headline,
        subtitle,
        metrics,
        accent,
      });

      const triggerAnchor = (href: string, revokeAfter?: () => void) => {
        const link = document.createElement("a");
        link.href = href;
        link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (revokeAfter) setTimeout(revokeAfter, 1500);
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2600);
      };

      if (typeof canvas.toBlob === "function") {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            triggerAnchor(url, () => URL.revokeObjectURL(url));
          } else {
            triggerAnchor(canvas.toDataURL("image/png"));
          }
        }, "image/png");
      } else {
        triggerAnchor(canvas.toDataURL("image/png"));
      }
    } catch {
      // Ignore transient canvas failures in restricted headless environments
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shadow-xs ${
        downloaded
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-slate-900 hover:bg-slate-800 text-white border-slate-800"
      } ${className}`}
    >
      {downloaded ? (
        <FaCheck className="w-3.5 h-3.5 text-emerald-200" aria-hidden="true" />
      ) : (
        <FaDownload className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
      )}
      <span>{downloaded ? "Downloaded 1200×630 PNG!" : buttonLabel}</span>
    </button>
  );
}
