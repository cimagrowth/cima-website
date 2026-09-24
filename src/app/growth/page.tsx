import type { Metadata } from 'next';
import Growth from '@/views/Growth';
import AuditMapPreview from '@/components/growth/AuditMapPreview';
import { getGrowthosMap } from '@/lib/growthos-map';

const TITLE = 'Free Leak Map: see where your clinic leaks on the GrowthOS Map | Cima';
const DESCRIPTION =
  'Answer a few questions about your patient journey. We place every answer on the GrowthOS Map, benchmark it against the clinics we run, and send a report of which stages are leaking and the modules that close each one. Results in 48 hours.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://cimagrowth.com/growth' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/growth',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og-growth.png',
        width: 1200,
        height: 630,
        alt: 'Patient Leakage Audit by Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-growth.png'],
  },
};

export const revalidate = 3600;

export default async function Page() {
  const map = await getGrowthosMap();
  return <Growth mapPreview={<AuditMapPreview map={map} />} />;
}
