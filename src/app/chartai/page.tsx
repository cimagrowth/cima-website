import type { Metadata } from 'next';
import ChartAI from '@/views/ChartAI';

export const metadata: Metadata = {
  title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
  description: 'Stop chasing faxes. ChartAI retrieves medical records automatically. Your staff fills the request, the patient signs via email, and records arrive in your system. Included with GrowthOS.',
  keywords: [
    'medical records retrieval', 'ChartAI', 'HIPAA records request',
    'electronic medical records', 'patient records automation',
    'GrowthOS', 'fertility clinic records', 'healthcare records',
  ],
  alternates: { canonical: 'https://cimagrowth.com/chartai' },
  openGraph: {
    title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
    description: 'Stop chasing faxes. ChartAI retrieves medical records automatically. Your staff fills the request, the patient signs via email, and records arrive in your system.',
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
    description: 'Stop chasing faxes. ChartAI retrieves medical records automatically. Your staff fills the request, the patient signs via email, and records arrive in your system.',
  },
};

export default function Page() {
  return <ChartAI />;
}
