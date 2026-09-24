import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Keep: follow-up for stored eggs and embryos';

export default function Image() {
  return renderOgCard({
    eyebrow: 'Keep · Stage 7 · The Full Tank',
    title: 'Keep. For every egg, embryo and sample still in your tanks.',
    sub: 'Included in every GrowthOS plan.',
  });
}
