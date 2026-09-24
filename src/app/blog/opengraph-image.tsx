import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "Blog | Cima Growth Solutions";

export default function Image() {
  return renderOgCard({
    eyebrow: "The Cima blog",
    title: "Where clinics lose patients, and how to win them back.",
    sub: "Patient acquisition, patient journey and AI for specialty clinics.",
  });
}
