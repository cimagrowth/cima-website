import type { Metadata } from 'next';
import Audit from '@/views/Audit';

const TITLE =
  'Free Clinic Audit \u2014 See Where You\u2019re Losing Patients in 90 Seconds';
const DESCRIPTION =
  'Three free AI tools that audit your website, intake response, and compliance exposure \u2014 plus The Seven-Figure Leak, a free 108-page book on where fertility patients fall out of the journey and how AI fixes it. No credit card.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'clinic website audit',
    'patient acquisition audit',
    'lead response audit',
    'HIPAA compliance scanner',
    'fertility clinic marketing',
    'med spa marketing audit',
    'GrowthOS AI tools',
    'The Seven-Figure Leak',
  ],
  alternates: { canonical: 'https://cimagrowth.com/audit' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/audit',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Clinic Audit \u2014 Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <Audit />;
}
