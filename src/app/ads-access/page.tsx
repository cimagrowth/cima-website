import type { Metadata } from 'next';
import AdsAccess from '@/views/AdsAccess';

export const metadata: Metadata = {
  title: 'Ads Access',
  description: 'Grant Cima Growth Solutions access to your ad accounts securely.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdsAccess />;
}
