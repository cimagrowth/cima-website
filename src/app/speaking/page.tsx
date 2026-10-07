import type { Metadata } from 'next';
import SpeakingView from '@/views/Speaking';
import { generateBreadcrumbSchema, generateFounderSchema } from '@/components/seo/schemas';
import { SPEAKER } from '@/content/speaking';

export const revalidate = 3600;

const TITLE = 'Brandon Hensinger, speaker on patient leakage and the clinic front office | Cima';
const DESCRIPTION =
  'Talks for fertility, aesthetics and regenerative medicine audiences on where patients leak out of the clinic journey and how to keep them. Bios, headshot, past appearances and a form to invite Brandon.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/speaking' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/speaking',
    siteName: 'Cima Growth Solutions',
    type: 'profile',
    locale: 'en_US',
    images: [{ url: SPEAKER.headshot, width: 2000, height: 1599, alt: SPEAKER.headshotAlt }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [SPEAKER.headshot] },
};

export default function SpeakingPage() {
  const schema = [
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: 'https://cimagrowth.com' },
        { name: 'Speaking', url: 'https://cimagrowth.com/speaking' },
      ],
    }),
    {
      ...generateFounderSchema(),
      description: SPEAKER.shortBio,
      knowsAbout: [
        'Patient leakage',
        'Clinic front office operations',
        'Fertility clinic patient journey',
        'AI in healthcare front office',
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SpeakingView />
    </>
  );
}
