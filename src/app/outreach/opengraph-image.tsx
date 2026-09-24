import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "AI Outreach Engine | GrowthOS";

export default function Image() {
  return renderOgCard({
    eyebrow: "Outreach Engine · Stage 1 · Get found",
    title: "Turn a spreadsheet of prospects into warm conversations.",
    sub: "Every email written from the prospect's own website, in your voice.",
  });
}
