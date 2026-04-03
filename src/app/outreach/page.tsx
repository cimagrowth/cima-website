import type { Metadata } from 'next';
import Outreach from '@/views/Outreach';

export const metadata: Metadata = {
  title: 'B2B Outreach Engine | AI-Powered Prospect Enrichment & Cold Email | Cima Growth',
  description: 'Turn cold prospects into warm conversations. AI enriches every prospect, writes personalized 12-step email sequences, and manages your pipeline from first touch to closed deal.',
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
