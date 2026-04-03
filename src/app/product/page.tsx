import type { Metadata } from 'next';
import Product from '@/views/Product';

export const metadata: Metadata = {
  title: 'GrowthOS Platform – AI Follow-Up Engine for Clinics',
  description: 'Explore GrowthOS: AI instant response, automated nurturing, unified inbox, pipeline management, and reporting. Works with Salesforce, HubSpot, or standalone.',
  keywords: [
    'GrowthOS features', 'healthcare CRM features', 'AI patient engagement',
    'clinic automation software', 'patient pipeline management',
    'healthcare unified inbox', 'medical practice automation',
    'patient reactivation campaigns', 'Salesforce healthcare integration',
    'HubSpot clinic integration',
  ],
  alternates: { canonical: 'https://cimagrowth.com/product' },
  openGraph: {
    title: 'GrowthOS Platform – AI Follow-Up Engine for Clinics',
    description: 'Explore GrowthOS: AI instant response, automated nurturing, unified inbox, pipeline management, and reporting.',
    url: 'https://cimagrowth.com/product',
    images: [{ url: '/og-product.png' }],
  },
};

export default function Page() {
  return <Product />;
}
