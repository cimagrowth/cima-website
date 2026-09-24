import type { Metadata } from 'next';
import Index from '@/views/Index';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateSoftwareSchema,
  generateFounderSchema,
} from '@/components/seo/schemas';

export const revalidate = 3600;

const TITLE = 'GrowthOS by Cima: the patient journey operating system for clinics';
const DESCRIPTION =
  'Clinics lose patients at eight stages, from the first search to years after treatment. GrowthOS closes every one: ads, instant AI response, nurture, booking, consent, cycle coordination, stored-specimen follow-up and reviews in one platform.';

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
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/og-home.png'],
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
