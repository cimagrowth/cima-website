import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from '@/components/seo/schemas';

export const metadata: Metadata = {
  title: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
  description: 'GrowthOS responds instantly across every channel, nurtures leads automatically, and hands off to your team with full context.',
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
    title: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
    description: 'GrowthOS responds instantly across every channel, nurtures leads automatically, and hands off to your team with full context.',
    url: 'https://www.cimagrowth.com',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
    description: 'GrowthOS responds instantly across every channel, nurtures leads automatically, and hands off to your team with full context.',
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
