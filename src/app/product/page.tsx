import type { Metadata } from 'next';
import Product from '@/views/Product';

export const metadata: Metadata = {
  title: 'Platform: Everything a CRM does, with AI automation built in | GrowthOS by Cima',
  description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect from a CRM. Plus AI automation that handles routine work inside them. Built for healthcare clinics. Compare against HubSpot and GoHighLevel.',
  keywords: [
    'GrowthOS platform', 'healthcare CRM alternative', 'HubSpot alternative for clinics',
    'GoHighLevel alternative healthcare', 'AI patient engagement platform',
    'clinic automation software', 'patient pipeline management',
    'healthcare unified inbox', 'medical practice automation',
    'patient follow-up automation', 'Salesforce healthcare integration',
    'HubSpot clinic integration', 'HIPAA CRM',
  ],
  alternates: { canonical: 'https://cimagrowth.com/product' },
  openGraph: {
    title: 'Platform: Everything a CRM does, with AI automation built in | GrowthOS by Cima',
    description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect. Plus AI automation that handles routine work inside them. Compare against HubSpot and GoHighLevel.',
    url: 'https://cimagrowth.com/product',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platform: Everything a CRM does, with AI automation built in | GrowthOS by Cima',
    description: 'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you\'d expect. Plus AI automation that handles routine work inside them.',
  },
};

export default function Page() {
  return <Product />;
}
