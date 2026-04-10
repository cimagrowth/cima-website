import type { Metadata } from 'next';
import Features from '@/views/Features';

export const metadata: Metadata = {
  title: 'GrowthOS Features | AI Patient Engagement Platform for Clinics',
  description: 'One platform for AI patient engagement, CRM, marketing automation, reputation management, ad attribution, medical records retrieval, and multi-location management. HIPAA compliant.',
  keywords: ['GrowthOS features', 'clinic CRM', 'patient engagement AI', 'healthcare automation', 'HIPAA compliant CRM', 'medical records retrieval', 'multi-location clinic software'],
  alternates: { canonical: 'https://www.cimagrowth.com/features' },
  openGraph: {
    title: 'GrowthOS Features — Everything Your Clinic Needs in One Platform',
    description: 'AI patient engagement, CRM, marketing automation, reputation management, ads, reporting, and more. All HIPAA compliant.',
    url: 'https://cimagrowth.com/features',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-features.png',
        width: 1200,
        height: 630,
        alt: 'GrowthOS Features — Everything Your Clinic Needs in One Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthOS Features — Everything Your Clinic Needs in One Platform',
    description: 'AI patient engagement, CRM, marketing automation, reputation management, ads, reporting, and more. All HIPAA compliant.',
    images: ['/og/og-features.png'],
  },
};

export default function Page() {
  return <Features />;
}
