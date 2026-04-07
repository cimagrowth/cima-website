import type { Metadata } from 'next';
import Features from '@/views/Features';

export const metadata: Metadata = {
  title: 'GrowthOS Features – Every Feature to Acquire, Engage, and Convert Patients',
  description: 'GrowthOS replaces your CRM, chatbot, phone system, email platform, landing page builder, ads manager, and marketing agency — powered by AI that actually does the work.',
  keywords: ['GrowthOS features', 'clinic CRM', 'patient engagement AI', 'healthcare automation', 'AI campaign builder', 'patient outreach'],
  alternates: { canonical: 'https://www.cimagrowth.com/features' },
  openGraph: {
    title: 'GrowthOS Features – Every Feature to Acquire, Engage, and Convert Patients',
    description: 'GrowthOS replaces your CRM, chatbot, phone system, email platform, landing page builder, ads manager, and marketing agency — powered by AI that actually does the work.',
    url: 'https://www.cimagrowth.com/features',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'GrowthOS Features – Every Feature to Acquire, Engage, and Convert Patients',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthOS Features – Every Feature to Acquire, Engage, and Convert Patients',
    description: 'GrowthOS replaces your CRM, chatbot, phone system, email platform, landing page builder, ads manager, and marketing agency — powered by AI that actually does the work.',
    images: ['/og/og-features.png'],
  },
};

export default function Page() {
  return <Features />;
}
