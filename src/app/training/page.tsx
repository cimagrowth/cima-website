import type { Metadata } from 'next';
import Training from '@/views/Training';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'training';
const TITLE = 'Staff Training and Certification for Clinics | GrowthOS';
const DESCRIPTION =
  "Assign training by role, check understanding with short quizzes, and see who's certified, so service doesn't slip when your clinic is busy or short-staffed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'clinic staff training',
    'staff training and certification',
    'new hire onboarding for clinics',
    'front desk training',
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
