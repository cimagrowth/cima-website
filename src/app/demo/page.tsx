import type { Metadata } from 'next';
import Demo from '@/views/Demo';

export const metadata: Metadata = {
  title: 'Book a Demo – Cima Growth Solutions',
  description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
  keywords: [
    'GrowthOS demo', 'book a demo', 'healthcare CRM demo',
    'patient engagement demo', 'AI healthcare software trial', 'clinic software demo',
  ],
  alternates: { canonical: 'https://cimagrowth.com/demo' },
  openGraph: {
    title: 'Book a Demo – Cima Growth Solutions',
    description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
    url: 'https://cimagrowth.com/demo',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Demo – Cima Growth Solutions',
    description: 'See how GrowthOS transforms patient acquisition for fertility clinics, med spas, and wellness centers.',
  },
};

export default function Page() {
  return <Demo />;
}
