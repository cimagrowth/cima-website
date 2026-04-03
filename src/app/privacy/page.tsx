import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the GrowthOS platform by Cima Growth Solutions. Covers data collection, HIPAA compliance, PHI handling, and patient data protection.',
  keywords: ['privacy policy', 'HIPAA compliance', 'healthcare data protection', 'GrowthOS privacy'],
  alternates: { canonical: 'https://cimagrowth.com/privacy' },
  openGraph: {
    title: 'Privacy Policy – Cima Growth Solutions',
    description: 'Privacy Policy for the GrowthOS platform by Cima Growth Solutions.',
    url: 'https://cimagrowth.com/privacy',
    images: [{ url: '/og-privacy.png' }],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
