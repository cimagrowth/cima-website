import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'healthcare-crm';
const TITLE = 'Healthcare CRM Built for Patient Acquisition | Cima';
const DESCRIPTION =
  'GrowthOS is the healthcare CRM that does not just store patients, it acquires and retains them. Built for fertility, aesthetics, and wellness clinics.';

const content: SolutionLandingProps = {
  eyebrow: 'Healthcare CRM',
  h1Lead: 'The healthcare CRM that acquires patients,',
  h1Accent: 'not just stores them.',
  subhead:
    'Your CRM stores patients. It does not acquire them. GrowthOS is the healthcare CRM built to generate demand, convert inquiries, and retain patients for specialty clinics.',
  problem: {
    eyebrow: 'The problem',
    heading: 'A CRM is a filing cabinet',
    accent: 'you still have to fill by hand.',
    paragraphs: [
      'Salesforce, HubSpot, and the generic medical CRMs were built to store contacts. They give you fields, pipelines, and reports, then hand the actual work back to you. Someone on your team still has to run the ads, answer the 9pm inquiry, send the seventh follow-up, and ask for the review. The records do not fill themselves.',
      'For a specialty clinic, that gap is expensive. A new patient inquiry is worth thousands of dollars in lifetime value, and the clinic that responds first usually wins. A CRM that only logs the lead after it goes cold is not acquisition software. It is a record of what you missed.',
    ],
    points: [
      'Generic CRMs log the inquiry but never answer it.',
      'Speed to lead decides who books, and manual follow-up is always too slow.',
      'Tool sprawl spreads patient data across an ads manager, a chatbot, an inbox, and a spreadsheet.',
      'Reporting tells you what happened last month, not who needs a reply right now.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'Everything a CRM does, plus the team that does the work inside it.',
    intro:
      'GrowthOS has the contacts, pipelines, scoring, inbox, and reporting you expect from a CRM. Then an AI team runs demand generation, conversion, and retention on top, so the records fill themselves.',
    features: [
      {
        icon: 'megaphone',
        title: 'Demand generation',
        body: 'AI plans, launches, and optimizes ads and outreach so new inquiries arrive every day, not just when you remember to run a campaign.',
      },
      {
        icon: 'zap',
        title: 'Instant speed to lead',
        body: 'Every inquiry gets a personal, accurate reply in seconds across web chat, SMS, email, and social, day or night.',
      },
      {
        icon: 'filter',
        title: 'Leak-stage follow-up',
        body: 'GrowthOS works each pipeline stage, chasing the inquiries that stall before a consultation instead of letting them go quiet.',
      },
      {
        icon: 'inbox',
        title: 'Unified inbox and pipelines',
        body: 'Web chat, SMS, WhatsApp, LINE, email, and DMs in one place, with visual pipelines, lead scoring, and clean records.',
      },
      {
        icon: 'repeat',
        title: 'Retention and reactivation',
        body: 'Rebooking, membership, and win-back campaigns keep existing patients active long after the first visit.',
      },
      {
        icon: 'chart',
        title: 'Reporting that drives action',
        body: 'Funnel and pipeline reporting show exactly where revenue leaks, and the AI acts on it rather than waiting for you to read a dashboard.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why specialty clinics',
    heading: 'Built for the clinics generic CRMs ignore.',
    intro:
      'A horizontal CRM treats a fertility patient, a med spa client, and a software trial the same way. Specialty care does not work like that. GrowthOS is built around the patient journey in regulated, high-consideration healthcare.',
    segments: [
      {
        title: 'Fertility and reproductive medicine',
        body: 'Long, emotional decision cycles need consistent, warm follow-up. GrowthOS keeps every inquiry engaged from first question to first consultation without burning out your front desk.',
      },
      {
        title: 'Aesthetics and med spa',
        body: 'High volume, fast decisions, and repeat treatments. GrowthOS handles rebooking, packages, and no-show recovery so revenue does not depend on manual reminders.',
      },
      {
        title: 'Regenerative medicine',
        body: 'High-ticket consults need education and trust before a patient commits. GrowthOS nurtures inquiries with the right information at the right moment.',
      },
      {
        title: 'Wellness and longevity',
        body: 'Membership and program models live or die on retention. GrowthOS keeps members engaged and renews them on schedule.',
      },
    ],
  },
  proofPoints: [
    'Built for specialty clinics',
    'HIPAA-grade data handling',
    'Multi-channel by default',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is a healthcare CRM?',
      answer:
        'A healthcare CRM is software that manages patient and prospective-patient relationships, including contact records, pipelines, communication history, and reporting. GrowthOS goes further than a traditional CRM by actively acquiring and retaining patients, not just storing their data.',
    },
    {
      question: 'How is GrowthOS different from Salesforce or HubSpot?',
      answer:
        'Salesforce and HubSpot are horizontal CRMs that store contacts and leave the work to your team. GrowthOS is purpose-built for specialty clinics and includes an AI team that runs demand generation, instant follow-up, and retention inside the CRM, so the records fill themselves.',
    },
    {
      question: 'Is GrowthOS suitable for a small clinic?',
      answer:
        'Yes. GrowthOS is designed for independent and multi-location specialty clinics that do not have a large marketing or front-desk team. It does the work a bigger staff would, which is exactly where small clinics lose the most patients today.',
    },
    {
      question: 'Can GrowthOS work with the CRM we already use?',
      answer:
        'Yes. You can run GrowthOS on top of an existing CRM through its API, migrate at your own pace, or replace your stack entirely. Most clinics find they no longer need a separate CRM once GrowthOS is live.',
    },
    {
      question: 'How quickly can a healthcare CRM be live?',
      answer:
        'GrowthOS is typically live in about 48 hours because it ships pre-built for your specialty, rather than requiring weeks of configuration and an agency to set it up.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro: 'See how the healthcare CRM fits into the wider patient acquisition system.',
    links: [
      {
        href: '/patient-acquisition',
        label: 'Patient acquisition',
        description: 'The full system for filling your calendar with specialty-clinic patients.',
      },
      {
        href: '/patient-engagement-platform',
        label: 'Patient engagement platform',
        description: 'Multi-channel engagement that converts and retains, not just messages.',
      },
      {
        href: '/medical-practice-marketing',
        label: 'Medical practice marketing',
        description: 'Replace the agency, ads manager, and chatbot with one platform.',
      },
      {
        href: '/product',
        label: 'See the GrowthOS platform',
        description: 'Contacts, pipelines, inbox, and the AI team that runs them.',
      },
    ],
  },
  closing: {
    heading: 'See the healthcare CRM that does the work.',
    body: 'Twenty minutes. We will show the AI team handling real patient inquiries in your specialty, inside the CRM, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'healthcare CRM',
    'medical CRM',
    'patient CRM',
    'CRM for clinics',
    'healthcare CRM software',
    'fertility clinic CRM',
    'med spa CRM',
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
  const schema = buildSolutionSchema({
    slug: SLUG,
    name: TITLE,
    description: DESCRIPTION,
    faqs: content.faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SolutionLanding {...content} />
    </>
  );
}
