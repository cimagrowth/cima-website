import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "AI Agent for healthcare clinics | GrowthOS";

export default function Image() {
  return renderOgCard({
    eyebrow: "AI Agent · Stage 2 · First response",
    title: "Your clinic's AI front desk. Responds in seconds, nurtures for weeks.",
    sub: "Qualifies, books on your real calendar and hands off with the full history.",
  });
}
