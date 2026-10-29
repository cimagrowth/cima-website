import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "Ads Manager for clinics | GrowthOS";

export default function Image() {
  return renderOgCard({
    eyebrow: "Ads Manager · Stage 1 · Get found",
    title: "Your clinic's own Google and Meta accounts in one place.",
    sub: "Changes your team approves, measured against booked consults, not clicks.",
  });
}
