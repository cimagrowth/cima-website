import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "GrowthOS platform for healthcare clinics";

export default function Image() {
  return renderOgCard({
    eyebrow: "The GrowthOS platform",
    title: "Everything a CRM does, with AI automation built in.",
    sub: "AI automation that handles routine work inside your pipeline, built for healthcare clinics.",
  });
}
