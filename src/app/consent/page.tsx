import type { Metadata } from 'next';
import Consent from '@/views/Consent';
import { buildSolutionSchema } from '@/lib/solution-jsonld';
import { CONSENT_FAQS } from '@/lib/consent-faqs';

const SLUG = 'consent';
const TITLE = 'Patient Consent and Education for Clinics | Cima';
const DESCRIPTION =
  'Branded consent and video education that runs inside your CRM. Fires from your pipeline, gates on comprehension, and keeps an audit trail you can defend. Fertility and aesthetics libraries included.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'patient consent software',
    'e-consent for clinics',
    'patient education platform',
    'e-signature healthcare',
    'fertility consent forms',
    'med spa consent forms',
    'consent audit trail',
  ],
  alternates: { canonical: 'https://cimagrowth.com/consent' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/consent',
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
    faqs: CONSENT_FAQS,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Consent />
    </>
  );
}
