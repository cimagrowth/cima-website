import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'GrowthOS automates everything that happens to a patient outside the lab.';

export default function Image() {
  return renderOgCard({
    eyebrow: 'GrowthOS',
    title: 'Every patient answered, followed up and moved to treatment. Automatically.',
    sub: 'GrowthOS automates everything that happens to a patient outside the lab.',
  });
}
