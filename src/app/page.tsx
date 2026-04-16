import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from '@/components/seo/schemas';

export const metadata: Metadata = {
  title: 'AI Patient Acquisition Platform for Healthcare Clinics – GrowthOS by Cima',
  description: 'The complete patient acquisition engine for fertility, aesthetics, and wellness clinics. Generate demand, convert inquiries, stop leakage, and retain patients in one platform. Replaces your agency, CRM, ads manager, and chatbot — for $999/mo.',
  keywords: [
    'patient engagement software', 'healthcare CRM', 'AI patient communication',
    'fertility clinic software', 'med spa CRM', 'wellness center management',
    'regenerative medicine software', 'patient follow-up automation',
    'healthcare lead nurturing', 'patient leakage prevention',
    'clinic growth software', 'medical practice AI',
    'automated patient response', 'healthcare marketing automation',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com' },
  openGraph: {
    title: 'Not a chatbot. Not a CRM. The operating system your clinic runs on.',
    description: 'The complete patient acquisition engine for fertility, aesthetics, and wellness clinics. Generate demand, convert inquiries, stop leakage, and retain patients in one platform. Replaces your agency, CRM, ads manager, and chatbot — for $999/mo.',
    url: 'https://www.cimagrowth.com',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'AI Patient Acquisition Platform for Healthcare Clinics – GrowthOS by Cima',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Not a chatbot. Not a CRM. The operating system your clinic runs on.',
    description: 'The complete patient acquisition engine for fertility, aesthetics, and wellness clinics. Generate demand, convert inquiries, stop leakage, and retain patients in one platform. Replaces your agency, CRM, ads manager, and chatbot — for $999/mo.',
    images: ['/og/og-home.png'],
  },
};

export default function HomePage() {
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareSchema(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Index />
    </>
  );
}
