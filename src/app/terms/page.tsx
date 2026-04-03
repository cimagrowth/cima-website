import type { Metadata } from 'next';
import TermsOfService from '@/views/TermsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and Master Services Agreement for the GrowthOS platform by Cima Growth Solutions. Covers SaaS access, HIPAA compliance, and data handling.',
  keywords: ['terms of service', 'GrowthOS terms', 'Cima Growth Solutions agreement'],
  alternates: { canonical: 'https://cimagrowth.com/terms' },
  openGraph: {
    title: 'Terms of Service – Cima Growth Solutions',
    description: 'Terms of Service and Master Services Agreement for the GrowthOS platform.',
    url: 'https://cimagrowth.com/terms',
    images: [{ url: '/og-terms.png' }],
  },
};

export default function Page() {
  return <TermsOfService />;
}
