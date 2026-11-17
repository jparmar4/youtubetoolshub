import { redirect } from "next/navigation";

interface VideoIdeasAliasPageProps {
  searchParams: Promise<{ topic?: string | string[] }>;
}

export default async function VideoIdeasGeneratorAliasPage({
  searchParams,
}: VideoIdeasAliasPageProps) {
  const resolved = await searchParams;
  const rawTopic = Array.isArray(resolved.topic)
    ? resolved.topic[0]
    : resolved.topic;
  const target = rawTopic?.trim()
    ? `/tools/youtube-video-ideas-generator?topic=${encodeURIComponent(rawTopic.trim())}`
    : "/tools/youtube-video-ideas-generator";

  redirect(target);
}
