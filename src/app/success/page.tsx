import type { Metadata } from 'next';
import SubscriptionSuccess from '@/views/SubscriptionSuccess';

export const metadata: Metadata = {
  title: 'Welcome to GrowthOS – Book Your Onboarding',
  description: 'Thank you for signing up for GrowthOS. Book your onboarding session to get started.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SubscriptionSuccess />;
}
