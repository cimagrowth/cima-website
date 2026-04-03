import type { Metadata } from 'next';
import AdsPage from '@/views/AdsPage';

export const metadata: Metadata = {
  title: 'Google Ads Management | AI-Powered Ad Campaigns | Cima Growth',
  description: 'AI-powered Google Ads management that drives real results. Smart bidding, conversion tracking, and expert optimization for healthcare, legal, home services, and more.',
  keywords: [
    'Google Ads management', 'AI Google Ads', 'PPC management',
    'Google Ads agency', 'paid search management',
    'Google Ads optimization', 'AI ad campaigns',
  ],
  alternates: { canonical: 'https://cimagrowth.com/ads' },
  openGraph: {
    title: 'Google Ads Management | AI-Powered Ad Campaigns',
    description: 'AI-powered Google Ads management that drives real results.',
    url: 'https://cimagrowth.com/ads',
  },
};

export default function Page() {
  return <AdsPage />;
}
