import type { Metadata } from 'next';
import ChartAI from '@/views/ChartAI';

export const metadata: Metadata = {
  title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
  description: 'Prior records in hand before the first consult, without a fax machine. Your staff enters the previous providers, the patient signs on their phone, and records arrive in the patient\'s chart. Included with GrowthOS.',
  keywords: [
    'medical records retrieval', 'ChartAI', 'HIPAA records request',
    'electronic medical records', 'patient records automation',
    'GrowthOS', 'fertility clinic records', 'healthcare records',
  ],
  alternates: { canonical: 'https://cimagrowth.com/chartai' },
  openGraph: {
    title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
    description: 'Prior records in hand before the first consult, without a fax machine. Your staff enters the previous providers, the patient signs on their phone, and records arrive in the patient\'s chart.',
    url: 'https://cimagrowth.com/chartai',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
    // Shared GrowthOS card from src/app/opengraph-image.tsx.
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
    title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
    description: 'Prior records in hand before the first consult, without a fax machine. Your staff enters the previous providers, the patient signs on their phone, and records arrive in the patient\'s chart.',
  },
};

export default function Page() {
  return <ChartAI />;
}
