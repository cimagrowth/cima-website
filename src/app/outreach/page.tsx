import type { Metadata } from 'next';
import Outreach from '@/views/Outreach';

export const metadata: Metadata = {
  title: 'AI-Powered Outreach Engine – Cima Growth Solutions',
  description: 'Prospect enrichment, personalized email generation, and automated follow-up that books meetings.',
  keywords: [
    'B2B outreach', 'AI cold email', 'prospect enrichment', 'cold email automation',
    'AI email sequences', 'B2B lead generation', 'outreach automation',
    'personalized cold email', 'sales engagement platform', 'AI prospecting tool',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/outreach' },
  openGraph: {
    title: 'AI-Powered Outreach Engine – Cima Growth Solutions',
    description: 'Prospect enrichment, personalized email generation, and automated follow-up that books meetings.',
    url: 'https://www.cimagrowth.com/outreach',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-outreach.png',
        width: 1200,
        height: 630,
        alt: 'AI-Powered Outreach Engine – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Outreach Engine – Cima Growth Solutions',
    description: 'Prospect enrichment, personalized email generation, and automated follow-up that books meetings.',
    images: ['/og/og-outreach.png'],
  },
};

export default function Page() {
  return <Outreach />;
}
