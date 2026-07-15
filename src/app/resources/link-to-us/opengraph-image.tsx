import { ImageResponse } from "next/og";
import { MoneyShareImage, OG_SIZE } from "@/lib/og-money";

export const alt = "Link to YouTube Tools Hub — free badges & calculator embed";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <MoneyShareImage
        format="og"
        accent="purple"
        eyebrow="Partners · Embed free"
        title="Link to YouTube Tools Hub"
        subtitle="Copy HTML badges and the free Earnings Calculator card for your blog."
        bullets={[
          "No JavaScript required",
          "Calculator + CPM data links",
          "SVG badges included",
        ]}
      />
    ),
    { ...size },
  );
}
