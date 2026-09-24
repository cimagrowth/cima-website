import type { Metadata } from 'next';
import KeepView from '@/views/Keep';
import { generateBreadcrumbSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

const TITLE = 'Keep: follow-up for stored eggs and embryos | GrowthOS';
const DESCRIPTION =
  'Keep records what each patient has stored, reaches out on storage anniversaries and renewal dates, and gives patients a secure link to decide what comes next. Grief-aware, fully logged, and included in every GrowthOS plan.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['embryo storage follow-up', 'egg freezing patient follow-up', 'frozen embryo disposition', 'fertility clinic patient retention'],
  alternates: { canonical: '/keep' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/keep',
    siteName: 'Cima Growth Solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function KeepPage() {
  const schema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: 'https://cimagrowth.com' },
      { name: 'Keep', url: 'https://cimagrowth.com/keep' },
    ],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <KeepView />
    </>
  );
}
