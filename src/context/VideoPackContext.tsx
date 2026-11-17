"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const VIDEO_PACK_STORAGE_KEY = "yt_hub_video_pack_v1";
const VIDEO_PACK_CHANGE_EVENT = "yt-hub-video-pack-change";

export interface VideoPack {
  topic: string;
  selectedTitle: string;
  titleVariants: string[];
  description: string;
  chapters: string[];
  tags: string[];
  thumbnailPrompt: string;
  notes: string;
  updatedAt: string;
}

export const EMPTY_VIDEO_PACK: VideoPack = {
  topic: "",
  selectedTitle: "",
  titleVariants: [],
  description: "",
  chapters: [],
  tags: [],
  thumbnailPrompt: "",
  notes: "",
  updatedAt: "",
};

function sanitizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of value) {
    if (typeof entry !== "string") continue;
    const trimmed = entry.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

function normalizeStoredPack(raw: unknown): VideoPack {
  if (!raw || typeof raw !== "object") return { ...EMPTY_VIDEO_PACK };
  const obj = raw as Record<string, unknown>;
  return {
    topic: typeof obj.topic === "string" ? obj.topic : "",
    selectedTitle: typeof obj.selectedTitle === "string" ? obj.selectedTitle : "",
    titleVariants: sanitizeStringArray(obj.titleVariants),
    description: typeof obj.description === "string" ? obj.description : "",
    chapters: sanitizeStringArray(obj.chapters),
    tags: sanitizeStringArray(obj.tags),
    thumbnailPrompt: typeof obj.thumbnailPrompt === "string" ? obj.thumbnailPrompt : "",
    notes: typeof obj.notes === "string" ? obj.notes : "",
    updatedAt: typeof obj.updatedAt === "string" ? obj.updatedAt : "",
  };
}

export function computeVideoPackItemCount(pack: VideoPack): number {
  let count = 0;
  if (pack.topic.trim()) count += 1;
  if (pack.titleVariants.length > 0) {
    count += pack.titleVariants.length;
    const selected = pack.selectedTitle.trim();
    if (selected && !pack.titleVariants.includes(selected)) {
      count += 1;
    }
  } else if (pack.selectedTitle.trim()) {
    count += 1;
  }
  if (pack.description.trim()) count += 1;
  if (pack.chapters.length > 0) count += 1;
  if (pack.tags.length > 0) count += 1;
  if (pack.thumbnailPrompt.trim()) count += 1;
  if (pack.notes.trim()) count += 1;
  return count;
}

export function formatVideoPackMarkdown(pack: VideoPack): string {
  const title = pack.selectedTitle.trim() || pack.topic.trim() || "Untitled YouTube Video Brief";
  const lines: string[] = [
    `# Video Brief: ${title}`,
    "",
    `> Generated with **YouTube Tools Hub** (youtubetoolshub.com)${
      pack.updatedAt ? ` · Last updated: ${new Date(pack.updatedAt).toLocaleString()}` : ""
    }`,
    "",
    "---",
    "",
    "## Topic / Core Angle",
    pack.topic.trim() || "_Not set yet_",
    "",
    "## Selected Title",
    pack.selectedTitle.trim() || "_Not selected yet_",
    "",
  ];

  if (pack.titleVariants.length > 0) {
    lines.push("## Title Variants");
    for (const variant of pack.titleVariants) {
      const marker = variant === pack.selectedTitle.trim() ? " *(selected)*" : "";
      lines.push(`- ${variant}${marker}`);
    }
    lines.push("");
  }

  lines.push("## SEO Description");
  lines.push(pack.description.trim() || "_No description saved yet_");
  lines.push("");

  lines.push("## Chapters / Timestamps");
  if (pack.chapters.length > 0) {
    for (const ch of pack.chapters) {
      lines.push(ch);
    }
  } else {
    lines.push("_No chapters saved yet_");
  }
  lines.push("");

  lines.push("## YouTube Tags");
  if (pack.tags.length > 0) {
    lines.push(pack.tags.join(", "));
  } else {
    lines.push("_No tags saved yet_");
  }
  lines.push("");

  lines.push("## Thumbnail Concept / Prompt");
  lines.push(pack.thumbnailPrompt.trim() || "_No thumbnail prompt saved yet_");
  lines.push("");

  lines.push("## Creator Notes");
  lines.push(pack.notes.trim() || "_No notes yet_");
  lines.push("");

  return lines.join("\n");
}

interface SaveIdeaInput {
  title: string;
  topic?: string;
  thumbnailPrompt?: string;
  notes?: string;
}

interface VideoPackContextValue {
  pack: VideoPack;
  isHydrated: boolean;
  isOpen: boolean;
  itemCount: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  updatePack: (patch: Partial<VideoPack>) => void;
  saveTitleVariant: (title: string, options?: { select?: boolean; topic?: string }) => void;
  saveTitleVariantsBatch: (titles: string[], topic?: string) => void;
  selectTitle: (title: string) => void;
  removeTitleVariant: (title: string) => void;
  saveDescription: (description: string, topic?: string) => void;
  saveTags: (tags: string[], topic?: string) => void;
  removeTag: (tag: string) => void;
  saveChapters: (chapters: string[], topic?: string) => void;
  saveIdea: (idea: SaveIdeaInput) => void;
  clearPack: () => void;
  exportBriefMarkdown: () => string;
}

const VideoPackContext = createContext<VideoPackContextValue | undefined>(undefined);

let cachedRawPack: string | null | undefined;
let cachedParsedPack: VideoPack = EMPTY_VIDEO_PACK;

function readPackSnapshot(): VideoPack {
  if (typeof window === "undefined") return EMPTY_VIDEO_PACK;
  try {
    const raw = window.localStorage.getItem(VIDEO_PACK_STORAGE_KEY);
    if (raw === cachedRawPack) return cachedParsedPack;
    cachedRawPack = raw;
    cachedParsedPack = raw ? normalizeStoredPack(JSON.parse(raw)) : EMPTY_VIDEO_PACK;
    return cachedParsedPack;
  } catch {
    return cachedParsedPack;
  }
}

function getServerPackSnapshot(): VideoPack {
  return EMPTY_VIDEO_PACK;
}

function subscribeToPack(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === VIDEO_PACK_STORAGE_KEY) {
      callback();
    }
  };
  const onLocalChange = () => callback();
  window.addEventListener("storage", onStorage);
  window.addEventListener(VIDEO_PACK_CHANGE_EVENT, onLocalChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(VIDEO_PACK_CHANGE_EVENT, onLocalChange);
  };
}

function subscribeNoop(): () => void {
  return () => {};
}

export function VideoPackProvider({ children }: { children: ReactNode }) {
  const pack = useSyncExternalStore(
    subscribeToPack,
    readPackSnapshot,
    getServerPackSnapshot,
  );
  const isHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);

  const persistPack = useCallback((updater: (prev: VideoPack) => VideoPack) => {
    const prev = readPackSnapshot();
    const next = updater(prev);
    const stamped: VideoPack = {
      ...next,
      updatedAt: new Date().toISOString(),
    };
    const serialized = JSON.stringify(stamped);
    cachedRawPack = serialized;
    cachedParsedPack = stamped;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(VIDEO_PACK_STORAGE_KEY, serialized);
      } catch {
        // Ignore quota/storage errors
      }
      window.dispatchEvent(new Event(VIDEO_PACK_CHANGE_EVENT));
    }
  }, []);

  const updatePack = useCallback(
    (patch: Partial<VideoPack>) => {
      persistPack((prev) => ({
        ...prev,
        ...patch,
        titleVariants:
          patch.titleVariants !== undefined
            ? sanitizeStringArray(patch.titleVariants)
            : prev.titleVariants,
        chapters:
          patch.chapters !== undefined
            ? sanitizeStringArray(patch.chapters)
            : prev.chapters,
        tags:
          patch.tags !== undefined ? sanitizeStringArray(patch.tags) : prev.tags,
      }));
    },
    [persistPack],
  );

  const saveTitleVariant = useCallback(
    (rawTitle: string, options?: { select?: boolean; topic?: string }) => {
      const title = rawTitle.trim();
      if (!title) return;
      persistPack((prev) => {
        const variants = prev.titleVariants.includes(title)
          ? prev.titleVariants
          : [title, ...prev.titleVariants];
        const shouldSelect = options?.select ?? !prev.selectedTitle.trim();
        return {
          ...prev,
          topic: prev.topic.trim() || options?.topic?.trim() || prev.topic,
          selectedTitle: shouldSelect ? title : prev.selectedTitle,
          titleVariants: variants,
        };
      });
    },
    [persistPack],
  );

  const saveTitleVariantsBatch = useCallback(
    (rawTitles: string[], topic?: string) => {
      const cleaned = sanitizeStringArray(rawTitles);
      if (cleaned.length === 0) return;
      persistPack((prev) => {
        const merged = sanitizeStringArray([...prev.titleVariants, ...cleaned]);
        return {
          ...prev,
          topic: prev.topic.trim() || topic?.trim() || prev.topic,
          selectedTitle: prev.selectedTitle.trim() || cleaned[0] || "",
          titleVariants: merged,
        };
      });
    },
    [persistPack],
  );

  const selectTitle = useCallback(
    (title: string) => {
      const trimmed = title.trim();
      persistPack((prev) => ({
        ...prev,
        selectedTitle: trimmed,
        titleVariants:
          trimmed && !prev.titleVariants.includes(trimmed)
            ? [trimmed, ...prev.titleVariants]
            : prev.titleVariants,
      }));
    },
    [persistPack],
  );

  const removeTitleVariant = useCallback(
    (title: string) => {
      persistPack((prev) => {
        const nextVariants = prev.titleVariants.filter((t) => t !== title);
        const nextSelected =
          prev.selectedTitle === title ? nextVariants[0] || "" : prev.selectedTitle;
        return {
          ...prev,
          selectedTitle: nextSelected,
          titleVariants: nextVariants,
        };
      });
    },
    [persistPack],
  );

  const saveDescription = useCallback(
    (description: string, topic?: string) => {
      const trimmed = description.trim();
      if (!trimmed) return;
      persistPack((prev) => ({
        ...prev,
        topic: prev.topic.trim() || topic?.trim() || prev.topic,
        description: trimmed,
      }));
    },
    [persistPack],
  );

  const saveTags = useCallback(
    (tags: string[], topic?: string) => {
      const cleaned = sanitizeStringArray(tags);
      if (cleaned.length === 0) return;
      persistPack((prev) => ({
        ...prev,
        topic: prev.topic.trim() || topic?.trim() || prev.topic,
        tags: cleaned,
      }));
    },
    [persistPack],
  );

  const removeTag = useCallback(
    (tag: string) => {
      persistPack((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }));
    },
    [persistPack],
  );

  const saveChapters = useCallback(
    (chapters: string[], topic?: string) => {
      const cleaned = sanitizeStringArray(chapters);
      if (cleaned.length === 0) return;
      persistPack((prev) => ({
        ...prev,
        topic: prev.topic.trim() || topic?.trim() || prev.topic,
        chapters: cleaned,
      }));
    },
    [persistPack],
  );

  const saveIdea = useCallback(
    (idea: SaveIdeaInput) => {
      const title = idea.title.trim();
      if (!title) return;
      persistPack((prev) => {
        const variants = prev.titleVariants.includes(title)
          ? prev.titleVariants
          : [title, ...prev.titleVariants];
        const nextTopic = idea.topic?.trim() || prev.topic.trim() || title;
        const incomingNote = idea.notes?.trim() || "";
        const nextNotes = incomingNote
          ? prev.notes.trim() && !prev.notes.includes(incomingNote)
            ? `${prev.notes.trim()}\n\n${incomingNote}`
            : incomingNote
          : prev.notes;

        return {
          ...prev,
          topic: nextTopic,
          selectedTitle: prev.selectedTitle.trim() || title,
          titleVariants: variants,
          thumbnailPrompt:
            idea.thumbnailPrompt?.trim() || prev.thumbnailPrompt,
          notes: nextNotes,
        };
      });
    },
    [persistPack],
  );

  const clearPack = useCallback(() => {
    cachedRawPack = null;
    cachedParsedPack = EMPTY_VIDEO_PACK;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(VIDEO_PACK_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
      window.dispatchEvent(new Event(VIDEO_PACK_CHANGE_EVENT));
    }
  }, []);

  const exportBriefMarkdown = useCallback(
    () => formatVideoPackMarkdown(pack),
    [pack],
  );

  const itemCount = useMemo(() => computeVideoPackItemCount(pack), [pack]);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo<VideoPackContextValue>(
    () => ({
      pack,
      isHydrated,
      isOpen,
      itemCount,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      updatePack,
      saveTitleVariant,
      saveTitleVariantsBatch,
      selectTitle,
      removeTitleVariant,
      saveDescription,
      saveTags,
      removeTag,
      saveChapters,
      saveIdea,
      clearPack,
      exportBriefMarkdown,
    }),
    [
      pack,
      isHydrated,
      isOpen,
      itemCount,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      updatePack,
      saveTitleVariant,
      saveTitleVariantsBatch,
      selectTitle,
      removeTitleVariant,
      saveDescription,
      saveTags,
      removeTag,
      saveChapters,
      saveIdea,
      clearPack,
      exportBriefMarkdown,
    ],
  );

  return (
    <VideoPackContext.Provider value={value}>
      {children}
    </VideoPackContext.Provider>
  );
}

export function useVideoPack(): VideoPackContextValue {
  const ctx = useContext(VideoPackContext);
  if (!ctx) {
    throw new Error("useVideoPack must be used inside a VideoPackProvider");
  }
  return ctx;
}
