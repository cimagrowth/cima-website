import type { Metadata } from 'next';
import AIAgent from '@/views/AIAgent';

export const metadata: Metadata = {
  title: 'AI Agent for Patient Engagement – Cima Growth Solutions',
  description: 'An emotionally intelligent AI that responds, nurtures, and qualifies patients 24/7 across every channel.',
  keywords: [
    'AI agent', 'clinic AI', 'patient engagement', 'GoHighLevel AI',
    'medical spa AI', 'fertility clinic automation', 'appointment booking AI',
    'HIPAA compliant AI',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/ai-agent' },
  openGraph: {
    title: 'AI Agent for Patient Engagement – Cima Growth Solutions',
    description: 'An emotionally intelligent AI that responds, nurtures, and qualifies patients 24/7 across every channel.',
    url: 'https://www.cimagrowth.com/ai-agent',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-ai-agent.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent for Patient Engagement – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent for Patient Engagement – Cima Growth Solutions',
    description: 'An emotionally intelligent AI that responds, nurtures, and qualifies patients 24/7 across every channel.',
    images: ['/og/og-ai-agent.png'],
  },
};

export default function Page() {
  return <AIAgent />;
}
