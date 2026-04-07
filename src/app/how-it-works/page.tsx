import type { Metadata } from 'next';
import HowItWorksPage from '@/views/HowItWorks';

export const metadata: Metadata = {
  title: 'How GrowthOS Works – The Front End of Medicine Is Broken. We Fix It.',
  description: 'Clinics lose 30-40% of leads between inquiry and appointment. GrowthOS closes the gap with instant AI response, intelligent nurture, and a full patient acquisition pipeline.',
  keywords: ['patient leakage', 'clinic growth platform', 'AI patient engagement', 'healthcare CRM', 'GrowthOS'],
  alternates: { canonical: 'https://www.cimagrowth.com/how-it-works' },
  openGraph: {
    title: 'How GrowthOS Works – The Front End of Medicine Is Broken. We Fix It.',
    description: 'Clinics lose 30-40% of leads between inquiry and appointment. GrowthOS closes the gap with instant AI response, intelligent nurture, and a full patient acquisition pipeline.',
    url: 'https://www.cimagrowth.com/how-it-works',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-how-it-works.png',
        width: 1200,
        height: 630,
        alt: 'How GrowthOS Works – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How GrowthOS Works – The Front End of Medicine Is Broken. We Fix It.',
    description: 'Clinics lose 30-40% of leads between inquiry and appointment. GrowthOS closes the gap with instant AI response, intelligent nurture, and a full patient acquisition pipeline.',
    images: ['/og/og-how-it-works.png'],
  },
};

export default function Page() {
  return <HowItWorksPage />;
}
