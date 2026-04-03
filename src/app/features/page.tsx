import type { Metadata } from 'next';
import Features from '@/views/Features';

export const metadata: Metadata = {
  title: 'Platform Features – Cima Growth Solutions',
  description: 'Unified inbox, smart pipelines, AI follow-up, reactivation campaigns, and more — all in one system.',
  keywords: ['GrowthOS features', 'clinic CRM', 'patient engagement AI', 'healthcare automation', 'AI campaign builder', 'patient outreach'],
  alternates: { canonical: 'https://www.cimagrowth.com/features' },
  openGraph: {
    title: 'Platform Features – Cima Growth Solutions',
    description: 'Unified inbox, smart pipelines, AI follow-up, reactivation campaigns, and more — all in one system.',
    url: 'https://www.cimagrowth.com/features',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'Platform Features – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform Features – Cima Growth Solutions',
    description: 'Unified inbox, smart pipelines, AI follow-up, reactivation campaigns, and more — all in one system.',
    images: ['/og/og-features.png'],
  },
};

export default function Page() {
  return <Features />;
}
