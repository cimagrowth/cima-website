import type { Metadata } from 'next';
import HowItWorksPage from '@/views/HowItWorks';

export const metadata: Metadata = {
  title: 'How GrowthOS Works – AI-Powered Patient Growth Engine',
  description: 'Clinics lose 30–40% of leads between first inquiry and booked appointment. GrowthOS closes that gap with AI-powered capture, nurture, convert, and grow — on autopilot.',
  keywords: ['patient leakage', 'clinic growth platform', 'AI patient engagement', 'healthcare CRM', 'GrowthOS'],
  alternates: { canonical: 'https://cimagrowth.com/how-it-works' },
  openGraph: {
    title: 'How GrowthOS Works – AI-Powered Patient Growth Engine',
    description: 'Clinics lose 30–40% of leads between first inquiry and booked appointment. GrowthOS closes that gap with AI-powered capture, nurture, convert, and grow — on autopilot.',
    url: 'https://cimagrowth.com/how-it-works',
    images: [{ url: '/og-product.png' }],
  },
};

export default function Page() {
  return <HowItWorksPage />;
}
