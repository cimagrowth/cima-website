import type { Metadata } from 'next';
import Pricing from '@/views/Pricing';

export const metadata: Metadata = {
  title: 'Pricing – GrowthOS Plans for Clinics',
  description: 'GrowthOS pricing: $999/month or $9,999/year. Unlimited leads, AI conversations & team members. No per-lead charges. Full platform access.',
  keywords: [
    'GrowthOS pricing', 'healthcare CRM pricing', 'patient engagement software cost',
    'clinic software pricing', 'med spa CRM cost', 'fertility clinic software pricing',
    'AI healthcare software pricing', 'medical practice management cost',
  ],
  alternates: { canonical: 'https://cimagrowth.com/sign-up' },
  openGraph: {
    title: 'Pricing – GrowthOS Plans for Clinics',
    description: 'GrowthOS pricing: $999/month or $9,999/year. Unlimited leads, AI conversations & team members.',
    url: 'https://cimagrowth.com/sign-up',
    images: [{ url: '/og-pricing.png' }],
  },
};

export default function Page() {
  return <Pricing />;
}
