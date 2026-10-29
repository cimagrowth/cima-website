import type { Metadata } from 'next';
import AdsPage from '@/views/AdsPage';

const TITLE = "Ads Manager for Clinics: Your Google and Meta Accounts in One Place";
const DESCRIPTION =
  "Manage your clinic's own Google and Meta ad accounts from GrowthOS: AI drafts campaigns, your team reviews and approves, and every result is tracked to booked consults.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'clinic ad account dashboard', 'Google Ads reporting software',
    'Meta Ads reporting for clinics',
  ],
  alternates: { canonical: 'https://cimagrowth.com/ads' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/ads',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <AdsPage />;
}
