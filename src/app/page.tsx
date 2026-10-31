import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
  generateFounderSchema,
} from '@/components/seo/schemas';

export const revalidate = 3600;

const TITLE = 'GrowthOS: automate every patient touch outside the lab';
const DESCRIPTION =
  'GrowthOS automates everything that happens to a patient outside the lab: instant AI replies, qualification, follow-up at every stage, consents, cycle coordination and reviews. More patients, more revenue, in less time.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'patient journey', 'patient leakage', 'patient engagement software',
    'fertility clinic software', 'healthcare CRM', 'AI patient communication',
    'egg and embryo storage follow-up', 'clinic growth software',
  ],
  alternates: { canonical: 'https://cimagrowth.com' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HomePage() {
  const schemas = [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareSchema(),
    generateFounderSchema(),
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
