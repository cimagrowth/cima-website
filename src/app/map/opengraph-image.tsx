import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'The GrowthOS Map: the patient journey and where clinics leak patients';

export default function Image() {
  return renderOgCard({
    eyebrow: 'The GrowthOS Map',
    title: 'The patient journey, and every place it leaks.',
    sub: 'Eight stages, from the first search to the last stored embryo.',
  });
}
