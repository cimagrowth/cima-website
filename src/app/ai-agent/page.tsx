import type { Metadata } from 'next';
import AIAgent from '@/views/AIAgent';

export const metadata: Metadata = {
  title: 'AI Agent for Healthcare Clinics – Responds in Seconds, Nurtures for Weeks',
  description: 'Your clinic\'s AI front desk — responds in under 3 seconds, qualifies leads, books appointments 24/7, and hands off with full context. Starting at $297/mo.',
  keywords: [
    'AI agent', 'clinic AI', 'patient engagement', 'GoHighLevel AI',
    'medical spa AI', 'fertility clinic automation', 'appointment booking AI',
    'HIPAA compliant AI',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/ai-agent' },
  openGraph: {
    title: 'AI Agent for Healthcare Clinics – Responds in Seconds, Nurtures for Weeks',
    description: 'Your clinic\'s AI front desk — responds in under 3 seconds, qualifies leads, books appointments 24/7, and hands off with full context. Starting at $297/mo.',
    url: 'https://www.cimagrowth.com/ai-agent',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-ai-agent.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent for Healthcare Clinics – Responds in Seconds, Nurtures for Weeks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent for Healthcare Clinics – Responds in Seconds, Nurtures for Weeks',
    description: 'Your clinic\'s AI front desk — responds in under 3 seconds, qualifies leads, books appointments 24/7, and hands off with full context. Starting at $297/mo.',
    images: ['/og/og-ai-agent.png'],
  },
};

export default function Page() {
  return <AIAgent />;
}
