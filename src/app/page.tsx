import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from '@/components/seo/schemas';

export const metadata: Metadata = {
  title: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
  description: 'GrowthOS responds instantly to patient inquiries across web, phone, text, email & social. AI-powered engagement for fertility clinics and med spas.',
  keywords: [
    'patient engagement software', 'healthcare CRM', 'AI patient communication',
    'fertility clinic software', 'med spa CRM', 'wellness center management',
    'regenerative medicine software', 'patient follow-up automation',
    'healthcare lead nurturing', 'patient leakage prevention',
    'clinic growth software', 'medical practice AI',
    'automated patient response', 'healthcare marketing automation',
  ],
  alternates: { canonical: 'https://cimagrowth.com' },
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
