import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "AI Ads for healthcare clinics | GrowthOS";

export default function Image() {
  return renderOgCard({
    eyebrow: "AI Ads · Stage 1 · Get found",
    title: "Let AI run your ads, with healthcare compliance built in.",
    sub: "Google and Meta campaigns measured against booked consults, not clicks.",
  });
}
