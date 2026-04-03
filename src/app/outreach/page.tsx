import type { Metadata } from 'next';
import Outreach from '@/views/Outreach';

export const metadata: Metadata = {
  title: 'AI-Powered B2B Outreach System | Cima Growth Solutions',
  description: 'Stop sending generic cold emails. Our AI scrapes prospect websites, identifies pain points, and generates personalized multi-step sequences. Starting at $49/mo.',
  keywords: [
    'B2B outreach', 'AI cold email', 'prospect enrichment', 'cold email automation',
    'AI email sequences', 'B2B lead generation', 'outreach automation',
    'personalized cold email', 'sales engagement platform', 'AI prospecting tool',
  ],
  alternates: { canonical: 'https://cimagrowth.com/outreach' },
  openGraph: {
    title: 'B2B Outreach Engine | AI-Powered Prospect Enrichment & Cold Email',
    description: 'Turn cold prospects into warm conversations. AI enriches every prospect, writes personalized 12-step email sequences.',
    url: 'https://cimagrowth.com/outreach',
    images: [{ url: '/og-outreach.png' }],
  },
};

export default function Page() {
  return <Outreach />;
}
