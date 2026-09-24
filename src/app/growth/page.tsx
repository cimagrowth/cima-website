import type { Metadata } from 'next';
import Growth from '@/views/Growth';

const TITLE = 'Free Patient Leakage Audit for Clinics | Cima Growth Solutions';
const DESCRIPTION =
  'Find out where your clinic loses patients you already paid for. A free leak map of every stage benchmarked against real clinic data, delivered in 48 hours.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://cimagrowth.com/growth' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/growth',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og-growth.png',
        width: 1200,
        height: 630,
        alt: 'Patient Leakage Audit by Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-growth.png'],
  },
};

export default function Page() {
  return <Growth />;
}
