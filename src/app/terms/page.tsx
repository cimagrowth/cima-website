import type { Metadata } from 'next';
import TermsOfService from '@/views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service – Cima Growth Solutions',
  description: 'Cima Growth Solutions terms of service.',
  keywords: ['terms of service', 'GrowthOS terms', 'Cima Growth Solutions agreement'],
  alternates: { canonical: 'https://www.cimagrowth.com/terms' },
  openGraph: {
    title: 'Terms of Service – Cima Growth Solutions',
    description: 'Cima Growth Solutions terms of service.',
    url: 'https://www.cimagrowth.com/terms',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-terms.png',
        width: 1200,
        height: 630,
        alt: 'Terms of Service – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service – Cima Growth Solutions',
    description: 'Cima Growth Solutions terms of service.',
    images: ['/og/og-terms.png'],
  },
};

export default function Page() {
  return <TermsOfService />;
}
