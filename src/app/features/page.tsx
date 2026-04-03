import type { Metadata } from 'next';
import Features from '@/views/Features';

export const metadata: Metadata = {
  title: 'GrowthOS Features – AI-Powered Patient Acquisition & Growth',
  description: 'Every feature you need to acquire, engage, and convert patients. GrowthOS replaces your CRM, email platform, chatbot, phone system, and marketing agency — all powered by AI.',
  keywords: ['GrowthOS features', 'clinic CRM', 'patient engagement AI', 'healthcare automation', 'AI campaign builder', 'patient outreach'],
  alternates: { canonical: 'https://cimagrowth.com/features' },
  openGraph: {
    title: 'GrowthOS Features – AI-Powered Patient Acquisition & Growth',
    description: 'Every feature you need to acquire, engage, and convert patients.',
    url: 'https://cimagrowth.com/features',
    images: [{ url: '/og-product.png' }],
  },
};

export default function Page() {
  return <Features />;
}
