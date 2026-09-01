import type { Metadata } from 'next';
import Growth from '@/views/Growth';

const TITLE = 'Free Patient Leakage Audit for Clinics | Cima Growth Solutions';
const DESCRIPTION =
  'Find out where your clinic loses patients you already paid for. A free nine-stage leak map benchmarked against real clinic data, delivered in 48 hours.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://cimagrowth.com/growth' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/growth',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <Growth />;
}
