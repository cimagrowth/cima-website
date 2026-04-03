import type { Metadata } from 'next';
import Pricing from '@/views/Pricing';

export const metadata: Metadata = {
  title: 'Get Started with GrowthOS – Cima Growth Solutions',
  description: 'Start acquiring patients with AI today. Live onboarding in 24–48 hours.',
  keywords: [
    'GrowthOS pricing', 'healthcare CRM pricing', 'patient engagement software cost',
    'clinic software pricing', 'med spa CRM cost', 'fertility clinic software pricing',
    'AI healthcare software pricing', 'medical practice management cost',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/sign-up' },
  openGraph: {
    title: 'Get Started with GrowthOS – Cima Growth Solutions',
    description: 'Start acquiring patients with AI today. Live onboarding in 24–48 hours.',
    url: 'https://www.cimagrowth.com/sign-up',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-sign-up.png',
        width: 1200,
        height: 630,
        alt: 'Get Started with GrowthOS – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started with GrowthOS – Cima Growth Solutions',
    description: 'Start acquiring patients with AI today. Live onboarding in 24–48 hours.',
    images: ['/og/og-sign-up.png'],
  },
};

export default function Page() {
  return <Pricing />;
}
