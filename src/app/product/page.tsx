import type { Metadata } from 'next';
import Product from '@/views/Product';

export const metadata: Metadata = {
  title: 'Product Overview – Cima Growth Solutions',
  description: 'The complete AI-powered growth operating system for healthcare clinics.',
  keywords: [
    'GrowthOS features', 'healthcare CRM features', 'AI patient engagement',
    'clinic automation software', 'patient pipeline management',
    'healthcare unified inbox', 'medical practice automation',
    'patient reactivation campaigns', 'Salesforce healthcare integration',
    'HubSpot clinic integration',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/product' },
  openGraph: {
    title: 'Product Overview – Cima Growth Solutions',
    description: 'The complete AI-powered growth operating system for healthcare clinics.',
    url: 'https://www.cimagrowth.com/product',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-product.png',
        width: 1200,
        height: 630,
        alt: 'Product Overview – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Overview – Cima Growth Solutions',
    description: 'The complete AI-powered growth operating system for healthcare clinics.',
    images: ['/og/og-product.png'],
  },
};

export default function Page() {
  return <Product />;
}
