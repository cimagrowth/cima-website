import type { Metadata } from 'next';
import Audit from '@/views/Audit';

export const metadata: Metadata = {
  title: 'Free Patient Acquisition Audit + 47 Frameworks Ebook – Cima Growth Solutions',
  description:
    'Free ebook + 3 AI tools to audit your clinic\u2019s patient acquisition funnel. No credit card. Unlimited access.',
  keywords: [
    'patient acquisition audit',
    'clinic marketing ebook',
    'fertility marketing',
    'med spa marketing',
    'HIPAA compliance scanner',
    'lead response audit',
    'GrowthOS AI tools',
  ],
  alternates: { canonical: 'https://www.cimagrowth.com/audit' },
  openGraph: {
    title: 'Free Patient Acquisition Audit + 47 Frameworks Ebook',
    description:
      'Free ebook + 3 AI tools to audit your clinic\u2019s patient acquisition funnel. No credit card.',
    url: 'https://www.cimagrowth.com/audit',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Free Patient Acquisition Audit + 47 Frameworks Ebook',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Patient Acquisition Audit + 47 Frameworks Ebook',
    description:
      'Free ebook + 3 AI tools to audit your clinic\u2019s patient acquisition funnel. No credit card.',
    images: ['/og/og-home.png'],
  },
};

export default function Page() {
  return <Audit />;
}
