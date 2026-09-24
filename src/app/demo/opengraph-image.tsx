import { renderOgCard, OG_SIZE } from '@/lib/og-card';

// File-convention route: Next.js injects og:image and twitter:image.
export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "Book a demo of GrowthOS | Cima Growth Solutions";

export default function Image() {
  return renderOgCard({
    eyebrow: "Book a demo",
    title: "See GrowthOS run a real patient journey in your specialty.",
    sub: "Pricing is tailored to your clinic and shared in your demo.",
  });
}
