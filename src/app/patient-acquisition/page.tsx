import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'patient-acquisition';
const TITLE = 'Patient Acquisition for Specialty Clinics | GrowthOS';
const DESCRIPTION =
  'Patient acquisition for specialty clinics, end to end. GrowthOS generates demand, converts inquiries, stops leakage, and retains patients in one platform.';

const content: SolutionLandingProps = {
  eyebrow: 'Patient acquisition',
  h1Lead: 'Patient acquisition for specialty clinics,',
  h1Accent: 'from first click to rebooking.',
  subhead:
    'More leads is not the answer. A system that converts the leads you already get is. GrowthOS is the complete patient acquisition platform for fertility, aesthetics, regenerative, and wellness clinics.',
  problem: {
    eyebrow: 'The problem',
    heading: 'Most clinics do not have a lead problem.',
    accent: 'They have a leak problem.',
    paragraphs: [
      'Patient acquisition is the full path a stranger takes to becoming a booked, returning patient: demand, inquiry, response, consultation, treatment, and retention. Most clinics only invest in the first step. They buy more ads, get more inquiries, and then watch most of them slip away unanswered.',
      'The math is unforgiving. If you lose 40 percent of inquiries before anyone replies, doubling ad spend just doubles the leak. The fastest growth almost never comes from more leads. It comes from converting the demand you are already paying for, then keeping those patients longer.',
    ],
    points: [
      'Demand without fast response is wasted spend.',
      'A slow reply hands the patient to whoever answered first.',
      'Disconnected tools lose patients in the gaps between them.',
      'No retention plan means you re-buy patients you already had.',
    ],
  },
  solution: {
    eyebrow: 'The system',
    heading: 'Patient acquisition as one connected system.',
    intro:
      'GrowthOS runs every stage of acquisition in one platform, so the funnel does not leak between tools. This page is the hub. Each stage below has a dedicated solution you can dig into.',
    features: [
      {
        icon: 'megaphone',
        title: 'Generate demand',
        body: 'AI plans and runs ads and outreach so qualified inquiries arrive consistently. See medical practice marketing for the full approach.',
      },
      {
        icon: 'zap',
        title: 'Respond instantly',
        body: 'Every inquiry gets a real reply in seconds across every channel. Speed to lead is the single biggest lever in acquisition.',
      },
      {
        icon: 'message',
        title: 'Engage and convert',
        body: 'Multi-channel engagement and an AI patient bot move inquiries to booked consultations. See the patient engagement platform.',
      },
      {
        icon: 'filter',
        title: 'Stop the leakage',
        body: 'Leak-stage follow-up recovers the inquiries that stall, the ones a CRM would simply log and forget.',
      },
      {
        icon: 'users',
        title: 'Organize in one CRM',
        body: 'Contacts, pipelines, scoring, and reporting in a healthcare CRM that acquires and retains, not just stores.',
      },
      {
        icon: 'repeat',
        title: 'Retain and rebook',
        body: 'Membership, rebooking, and reactivation keep patients active, turning one visit into lifetime value.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why specialty clinics',
    heading: 'Acquisition built for high-consideration care.',
    intro:
      'Specialty patients research, hesitate, and choose carefully. Generic acquisition playbooks ignore that. GrowthOS is built around the real journey in each specialty.',
    segments: [
      {
        title: 'Fertility and reproductive medicine',
        body: 'Long, emotional decisions reward clinics that stay present. GrowthOS nurtures every inquiry from first search to first consult.',
      },
      {
        title: 'Aesthetics and med spa',
        body: 'Fast decisions and repeat visits demand speed and rebooking. See med spa marketing for the aesthetics-specific approach.',
      },
      {
        title: 'Regenerative medicine',
        body: 'High-ticket consults need trust and education before commitment. GrowthOS delivers the right proof at each step.',
      },
      {
        title: 'Wellness and longevity',
        body: 'Programs depend on retention. GrowthOS keeps members engaged and renewing on schedule.',
      },
    ],
  },
  proofPoints: [
    'Demand to retention in one platform',
    'Built for specialty clinics',
    'HIPAA-grade data handling',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is patient acquisition?',
      answer:
        'Patient acquisition is the complete process of turning a stranger into a booked, returning patient: generating demand, capturing inquiries, responding quickly, converting to a consultation, and retaining the patient over time. GrowthOS runs all of these stages in one connected system.',
    },
    {
      question: 'Why is speed to lead so important for patient acquisition?',
      answer:
        'Patients usually book with the clinic that responds first. When a reply takes hours, most inquiries go elsewhere. Responding in seconds is the highest-leverage improvement most clinics can make, which is why GrowthOS answers every inquiry instantly.',
    },
    {
      question: 'Do I just need more leads to grow?',
      answer:
        'Usually not. Most clinics already lose a large share of the inquiries they pay for. Converting and retaining existing demand grows revenue faster and cheaper than buying more leads, which is the core idea behind GrowthOS.',
    },
    {
      question: 'How does GrowthOS improve retention, not just acquisition?',
      answer:
        'GrowthOS continues engaging patients after the first visit with rebooking, membership, and reactivation campaigns. Retention raises lifetime value, so each acquired patient is worth more over time.',
    },
    {
      question: 'Which clinics is GrowthOS built for?',
      answer:
        'GrowthOS is built for specialty clinics in fertility, aesthetics and med spa, regenerative medicine, and wellness, where patient decisions are high-consideration and each patient is high-value.',
    },
  ],
  related: {
    heading: 'Explore the acquisition system',
    intro: 'Each stage of patient acquisition has a dedicated solution, plus deeper reading from the blog.',
    links: [
      {
        href: '/medical-practice-marketing',
        label: 'Medical practice marketing',
        description: 'Generate demand and replace the agency, ads manager, and chatbot.',
      },
      {
        href: '/patient-engagement-platform',
        label: 'Patient engagement platform',
        description: 'Multi-channel engagement that converts and retains.',
      },
      {
        href: '/healthcare-crm',
        label: 'Healthcare CRM',
        description: 'A CRM that acquires and retains patients, not just stores them.',
      },
      {
        href: '/med-spa-marketing',
        label: 'Med spa marketing',
        description: 'Aesthetics-specific acquisition, rebooking, and reviews.',
      },
      {
        href: '/blog/the-50k-revenue-leak-speed-to-lead-fertility-clinic',
        label: 'The $50K revenue leak',
        description: 'Why speed to lead is your entire business model.',
      },
      {
        href: '/blog/the-13-hour-patient-fertility-clinic-patient-leakage',
        label: 'The 13-hour patient',
        description: 'How clinics lose revenue to leakage while they sleep.',
      },
      {
        href: '/blog/why-your-clinic-loses-40-percent-of-inquiries',
        label: 'Losing 40% of inquiries',
        description: 'Where inquiries disappear before anyone picks up the phone.',
      },
      {
        href: '/blog/myth-of-more-leads-marketing-infrastructure',
        label: 'The myth of more leads',
        description: 'Why activity is not the same as marketing infrastructure.',
      },
      {
        href: '/blog/hidden-cost-tool-sprawl-clinic-disorganization',
        label: 'The hidden cost of tool sprawl',
        description: 'Why disconnected tools make busy clinics feel disorganized.',
      },
      {
        href: '/blog/loss-aversion-fertility-clinic-patient-acquisition',
        label: 'Loss aversion in acquisition',
        description: 'The psychology behind the revenue clinics quietly lose.',
      },
    ],
  },
  closing: {
    heading: 'See patient acquisition run end to end.',
    body: 'Twenty minutes. We will show the AI team generating demand, answering inquiries, and rebooking patients in your specialty, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'patient acquisition',
    'patient acquisition strategy',
    'patient acquisition software',
    'healthcare patient acquisition',
    'clinic patient acquisition',
    'specialty clinic growth',
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
