import type { Metadata } from 'next';
import HipaaSafeTracking from '@/views/HipaaSafeTracking';

const SLUG = 'hipaa-safe-tracking';
const TITLE = 'HIPAA-Safe Ad Tracking for Specialty Clinics | Cima GrowthOS';
const DESCRIPTION =
  'See which ads bring in patients, without sending health data to Meta or Google. GrowthOS strips patient details before any conversion event leaves your clinic and gives you one dashboard for spend, leads, and ROI.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'HIPAA-safe tracking',
    'HIPAA compliant ad tracking',
    'clinic ad tracking',
    'server-side tracking healthcare',
    'PHI-safe analytics',
    'specialty clinic marketing',
  ],
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://cimagrowth.com/${SLUG}`,
    siteName: 'Cima Growth Solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <HipaaSafeTracking />;
}
