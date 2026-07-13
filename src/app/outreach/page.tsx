import type { Metadata } from 'next';
import Outreach from '@/views/Outreach';

export const metadata: Metadata = {
  title: 'AI Outreach Engine – Turn Prospects Into Warm Conversations',
  description: 'Import your list. AI scrapes every prospect, identifies pain points, and writes a personalized 12-step email sequence in your voice. Simple usage-based pricing: pay only for the prospects you enrich.',
  keywords: [
    'B2B outreach', 'AI cold email', 'prospect enrichment', 'cold email automation',
    'AI email sequences', 'B2B lead generation', 'outreach automation',
    'personalized cold email', 'sales engagement platform', 'AI prospecting tool',
  ],
  alternates: { canonical: 'https://cimagrowth.com/outreach' },
  openGraph: {
    title: 'AI Outreach Engine – Turn Prospects Into Warm Conversations',
    description: 'Import your list. AI scrapes every prospect, identifies pain points, and writes a personalized 12-step email sequence in your voice. Simple usage-based pricing: pay only for the prospects you enrich.',
    url: 'https://cimagrowth.com/outreach',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-outreach.png',
        width: 1200,
        height: 630,
        alt: 'AI Outreach Engine – Turn Prospects Into Warm Conversations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Outreach Engine – Turn Prospects Into Warm Conversations',
    description: 'Import your list. AI scrapes every prospect, identifies pain points, and writes a personalized 12-step email sequence in your voice. Simple usage-based pricing: pay only for the prospects you enrich.',
    images: ['/og/og-outreach.png'],
  },
};

export default function Page() {
  return <Outreach />;
}
