import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "GrowthOS features for healthcare clinics";

export default function Image() {
  return renderOgCard({
    eyebrow: "GrowthOS features",
    title: "One platform. Everything your clinic needs.",
    sub: "AI patient engagement, CRM, marketing automation, reviews, ads and reporting.",
  });
}
