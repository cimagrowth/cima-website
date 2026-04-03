import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy – Cima Growth Solutions',
  description: 'Cima Growth Solutions privacy policy.',
  keywords: ['privacy policy', 'HIPAA compliance', 'healthcare data protection', 'GrowthOS privacy'],
  alternates: { canonical: 'https://www.cimagrowth.com/privacy' },
  openGraph: {
    title: 'Privacy Policy – Cima Growth Solutions',
    description: 'Cima Growth Solutions privacy policy.',
    url: 'https://www.cimagrowth.com/privacy',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-privacy.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy – Cima Growth Solutions',
    description: 'Cima Growth Solutions privacy policy.',
    images: ['/og/og-privacy.png'],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
