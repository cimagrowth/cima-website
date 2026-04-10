import type { Metadata } from 'next';
import ChartAI from '@/views/ChartAI';

export const metadata: Metadata = {
  title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
  description: 'Stop chasing faxes. ChartAI retrieves medical records automatically — your staff fills the request, the patient signs via email, and records arrive in your system. Included with GrowthOS.',
  keywords: [
    'medical records retrieval', 'ChartAI', 'HIPAA records request',
    'electronic medical records', 'patient records automation',
    'GrowthOS', 'fertility clinic records', 'healthcare records',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/chartai' },
  openGraph: {
    title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
    description: 'Stop chasing faxes. ChartAI retrieves medical records automatically — your staff fills the request, the patient signs via email, and records arrive in your system.',
    url: 'https://www.cimagrowth.com/chartai',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'ChartAI – Automated Medical Records Retrieval',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChartAI – Automated Medical Records Retrieval | GrowthOS by Cima Growth',
    description: 'Stop chasing faxes. ChartAI retrieves medical records automatically — your staff fills the request, the patient signs via email, and records arrive in your system.',
    images: ['/og/og-home.png'],
  },
};

export default function Page() {
  return <ChartAI />;
}
