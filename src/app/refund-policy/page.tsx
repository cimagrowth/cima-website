import type { Metadata } from 'next';
import RefundPolicy from '@/views/RefundPolicy';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund and cancellation policy for GrowthOS subscriptions by Cima Growth Solutions. 14-day cancellation window, conditions, and chargeback procedures.',
  keywords: ['refund policy', 'GrowthOS cancellation', 'subscription refund'],
  alternates: { canonical: 'https://cimagrowth.com/refund-policy' },
  openGraph: {
    title: 'Refund Policy – Cima Growth Solutions',
    description: 'Refund and cancellation policy for GrowthOS subscriptions.',
    url: 'https://cimagrowth.com/refund-policy',
    images: [{ url: '/og-refund.png' }],
  },
};

export default function Page() {
  return <RefundPolicy />;
}
