import type { Metadata } from 'next';
import Training from '@/views/Training';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'training';
const TITLE = 'Training and Certification for B2B | Cima';
const DESCRIPTION =
  'Build onboarding, training, and certification programs for the companies you sell to. Video, knowledge checks, graded assignments, and verifiable certificates, automated off your pipeline.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'B2B training platform',
    'customer training and certification',
    'customer onboarding software',
    'partner certification program',
    'LMS alternative',
    'automated onboarding',
    'verifiable certificates',
  ],
  alternates: { canonical: 'https://cimagrowth.com/training' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/training',
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
  const schema = buildSolutionSchema({
    slug: SLUG,
    name: TITLE,
    description: DESCRIPTION,
    faqs: [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Training />
    </>
  );
}
