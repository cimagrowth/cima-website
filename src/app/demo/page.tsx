import type { Metadata } from 'next';
import Demo from '@/views/Demo';

export const metadata: Metadata = {
  title: 'See GrowthOS in Action – Interactive Demo',
  description: 'No sales call required. Answer a few quick questions and get instant access to a voice-guided interactive tour of GrowthOS.',
  keywords: [
    'GrowthOS demo', 'interactive demo', 'healthcare CRM demo',
    'patient engagement demo', 'AI healthcare software trial', 'clinic software demo',
  ],
  alternates: { canonical: 'https://cimagrowth.com/demo' },
  openGraph: {
    title: 'See GrowthOS in Action – Interactive Demo',
    description: 'No sales call required. Answer a few quick questions and get instant access to a voice-guided interactive tour of GrowthOS.',
    url: 'https://cimagrowth.com/demo',
    images: [{ url: '/og-demo.png' }],
  },
};

export default function Page() {
  return <Demo />;
}
