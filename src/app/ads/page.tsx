import type { Metadata } from 'next';
import AdsPage from '@/views/AdsPage';

export const metadata: Metadata = {
  title: 'AI Ads for Healthcare – Stop Paying Agencies $5,000/Month. Use AI for $399.',
  description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Agency-level output at software pricing.',
  keywords: [
    'Google Ads management', 'AI Google Ads', 'PPC management',
    'Google Ads agency', 'paid search management',
    'Google Ads optimization', 'AI ad campaigns',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/ads' },
  openGraph: {
    title: 'AI Ads for Healthcare – Stop Paying Agencies $5,000/Month. Use AI for $399.',
    description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Agency-level output at software pricing.',
    url: 'https://www.cimagrowth.com/ads',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-ads.png',
        width: 1200,
        height: 630,
        alt: 'AI Ads for Healthcare – Stop Paying Agencies $5,000/Month. Use AI for $399.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ads for Healthcare – Stop Paying Agencies $5,000/Month. Use AI for $399.',
    description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Agency-level output at software pricing.',
    images: ['/og/og-ads.png'],
  },
};

export default function Page() {
  return <AdsPage />;
}
