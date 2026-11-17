import { extractVideoId } from "@/lib/utils";

export type OmniInputMode = "video" | "channel" | "topic" | "empty";

export interface OmniRouteResolution {
  mode: OmniInputMode;
  destination: string;
  extracted: string;
  label: string;
}

const YOUTUBE_VIDEO_URL_PATTERN =
  /(?:^https?:\/\/)?(?:[\w-]+\.)?(?:youtube\.com\/(?:watch\b|shorts\/|live\/|embed\/|v\/)|youtu\.be\/)/i;

const HANDLE_IN_URL_PATTERN = /(?:^|https?:\/\/|[\w-]+\.)youtube\.com\/@([A-Za-z0-9_.-]{1,64})/i;
const LEADING_HANDLE_PATTERN = /^@([A-Za-z0-9_.-]{1,64})(?:\s|$|\/|\?|#)/;

export function extractChannelHandle(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const urlMatch = trimmed.match(HANDLE_IN_URL_PATTERN);
  if (urlMatch?.[1]) {
    return `@${urlMatch[1]}`;
  }

  if (trimmed.startsWith("@")) {
    const directMatch = trimmed.match(LEADING_HANDLE_PATTERN);
    if (directMatch?.[1]) {
      return `@${directMatch[1]}`;
    }
  }

  return null;
}

export function resolveOmniInputRoute(rawInput: string): OmniRouteResolution {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      mode: "empty",
      destination: "",
      extracted: "",
      label: "",
    };
  }

  if (YOUTUBE_VIDEO_URL_PATTERN.test(trimmed)) {
    const videoId = extractVideoId(trimmed);
    if (videoId) {
      return {
        mode: "video",
        destination: `/watch?v=${encodeURIComponent(videoId)}`,
        extracted: videoId,
        label: "Video X-Ray Audit",
      };
    }
  }

  const handle = extractChannelHandle(trimmed);
  if (handle) {
    return {
      mode: "channel",
      destination: `/tools/channel-outlier-scanner?handle=${encodeURIComponent(handle)}`,
      extracted: handle,
      label: "Channel Outlier Scanner",
    };
  }

  return {
    mode: "topic",
    destination: `/tools/video-ideas-generator?topic=${encodeURIComponent(trimmed)}`,
    extracted: trimmed,
    label: "Video Ideas Generator",
  };
}
