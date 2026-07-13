import type { Metadata } from 'next';
import AdsPage from '@/views/AdsPage';

export const metadata: Metadata = {
  title: 'AI Ads for Healthcare – Let AI Run Your Ads',
  description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Included in GrowthOS Growth and available with the Cima AI Agent Pro plan.',
  keywords: [
    'Google Ads management', 'AI Google Ads', 'PPC management',
    'Google Ads agency', 'paid search management',
    'Google Ads optimization', 'AI ad campaigns',
  ],
  alternates: { canonical: 'https://cimagrowth.com/ads' },
  openGraph: {
    title: 'AI Ads for Healthcare – Let AI Run Your Ads',
    description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Included in GrowthOS Growth and available with the Cima AI Agent Pro plan.',
    url: 'https://cimagrowth.com/ads',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-ads.png',
        width: 1200,
        height: 630,
        alt: 'AI Ads for Healthcare – Let AI Run Your Ads',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ads for Healthcare – Let AI Run Your Ads',
    description: 'AI builds, launches, and optimizes your Google and Facebook ad campaigns with healthcare compliance built in. Included in GrowthOS Growth and available with the Cima AI Agent Pro plan.',
    images: ['/og/og-ads.png'],
  },
};

export default function Page() {
  return <AdsPage />;
}
