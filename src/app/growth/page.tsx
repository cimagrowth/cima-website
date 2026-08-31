import type { Metadata } from 'next';
import Growth from '@/views/Growth';

const TITLE = 'Patient Leakage Audit | Cima Growth Solutions';
const DESCRIPTION =
  'Find out where your clinic is losing patients between first contact and first cycle. Free audit, results in 48 hours.';

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
