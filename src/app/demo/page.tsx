import type { Metadata } from 'next';
import Demo from '@/views/Demo';

export const metadata: Metadata = {
  title: 'Book a Demo – Cima Growth Solutions',
  description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
  keywords: [
    'GrowthOS demo', 'interactive demo', 'healthcare CRM demo',
    'patient engagement demo', 'AI healthcare software trial', 'clinic software demo',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/demo' },
  openGraph: {
    title: 'Book a Demo – Cima Growth Solutions',
    description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
    url: 'https://www.cimagrowth.com/demo',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-demo.png',
        width: 1200,
        height: 630,
        alt: 'Book a Demo – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Demo – Cima Growth Solutions',
    description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
    images: ['/og/og-demo.png'],
  },
};

export default function Page() {
  return <Demo />;
}
