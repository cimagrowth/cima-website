import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
  generateFounderSchema,
} from '@/components/seo/schemas';

export const revalidate = 3600;

const TITLE = 'GrowthOS by Cima: every patient answered, followed up and moved to treatment';
const DESCRIPTION =
  'GrowthOS automates everything that happens to a patient outside the lab. AI trained on your clinic answers in seconds, qualifies every inquiry and follows up at every stage, so no patient slips through when your team gets busy.';

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
