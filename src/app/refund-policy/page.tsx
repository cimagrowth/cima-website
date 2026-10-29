import type { Metadata } from 'next';
import RefundPolicy from '@/views/RefundPolicy';

export const metadata: Metadata = {
  title: 'Refund Policy | Cima Growth Solutions, LLC',
  description: 'GrowthOS refund policy: a full refund within 14 days of your initial purchase, for any reason.',
  keywords: ['refund policy', 'GrowthOS cancellation', 'subscription refund'],
  alternates: { canonical: 'https://cimagrowth.com/refund-policy' },
  openGraph: {
    title: 'Refund Policy | Cima Growth Solutions, LLC',
    description: 'GrowthOS refund policy: a full refund within 14 days of your initial purchase, for any reason.',
    url: 'https://cimagrowth.com/refund-policy',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-refund.png',
        width: 1200,
        height: 630,
        alt: 'Refund Policy | Cima Growth Solutions, LLC',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund Policy | Cima Growth Solutions, LLC',
    description: 'GrowthOS refund policy: a full refund within 14 days of your initial purchase, for any reason.',
    images: ['/og/og-refund.png'],
  },
};

export default function Page() {
  return <RefundPolicy />;
}
