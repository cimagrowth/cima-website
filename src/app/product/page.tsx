import type { Metadata } from 'next';
import Product from '@/views/Product';

export const metadata: Metadata = {
  title: 'Platform – Everything a CRM does. None of the work. | GrowthOS by Cima',
  description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect from a CRM. Plus an AI team that actually does the work inside them. Built for healthcare clinics. Compare against HubSpot and GoHighLevel.',
  keywords: [
    'GrowthOS platform', 'healthcare CRM alternative', 'HubSpot alternative for clinics',
    'GoHighLevel alternative healthcare', 'AI patient engagement platform',
    'clinic automation software', 'patient pipeline management',
    'healthcare unified inbox', 'medical practice automation',
    'patient reactivation campaigns', 'Salesforce healthcare integration',
    'HubSpot clinic integration', 'HIPAA CRM',
  ],
  alternates: { canonical: 'https://cimagrowth.com/product' },
  openGraph: {
    title: 'Platform – Everything a CRM does. None of the work. | GrowthOS by Cima',
    description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect. Plus an AI team that actually does the work inside them. Compare against HubSpot and GoHighLevel.',
    url: 'https://cimagrowth.com/product',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-product.png',
        width: 1200,
        height: 630,
        alt: 'GrowthOS Platform – Everything a CRM does. None of the work.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform – Everything a CRM does. None of the work. | GrowthOS by Cima',
    description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect. Plus an AI team that actually does the work inside them.',
    images: ['/og/og-product.png'],
  },
};

export default function Page() {
  return <Product />;
}
