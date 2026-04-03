import type { Metadata } from 'next';
import AIAgent from '@/views/AIAgent';

export const metadata: Metadata = {
  title: 'AI Agent for Clinics — 24/7 Patient Engagement',
  description: 'AI-powered patient engagement agent for fertility clinics, med spas, and aesthetic practices. Plugs into GoHighLevel. Starting at $297/mo.',
  keywords: [
    'AI agent', 'clinic AI', 'patient engagement', 'GoHighLevel AI',
    'medical spa AI', 'fertility clinic automation', 'appointment booking AI',
    'HIPAA compliant AI',
  ],
  alternates: { canonical: 'https://cimagrowth.com/ai-agent' },
  openGraph: {
    title: 'AI Agent for Clinics — 24/7 Patient Engagement',
    description: 'AI-powered patient engagement agent for fertility clinics, med spas, and aesthetic practices.',
    url: 'https://cimagrowth.com/ai-agent',
  },
};

export default function Page() {
  return <AIAgent />;
}
