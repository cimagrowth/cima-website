import type { Metadata } from 'next';
import AdsPage from '@/views/AdsPage';

export const metadata: Metadata = {
  title: 'AI-Powered Ad Campaigns – Cima Growth Solutions',
  description: 'Launch high-converting ad campaigns for your clinic in minutes, not weeks.',
  keywords: [
    'Google Ads management', 'AI Google Ads', 'PPC management',
    'Google Ads agency', 'paid search management',
    'Google Ads optimization', 'AI ad campaigns',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/ads' },
  openGraph: {
    title: 'AI-Powered Ad Campaigns – Cima Growth Solutions',
    description: 'Launch high-converting ad campaigns for your clinic in minutes, not weeks.',
    url: 'https://www.cimagrowth.com/ads',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-ads.png',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Ad Campaigns – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Ad Campaigns – Cima Growth Solutions',
    description: 'Launch high-converting ad campaigns for your clinic in minutes, not weeks.',
    images: ['/og/og-ads.png'],
  },
};

export default function Page() {
  return <AdsPage />;
}
