import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { getGrowthosMap } from '@/lib/growthos-map';
import MapStrip from '@/components/map/MapStrip';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'medical-practice-marketing';
const TITLE = 'Medical Practice Software That Fills Your Calendar';
const DESCRIPTION =
  'Medical practice software that combines inbox, CRM, booking and ad management in one platform your staff operates. Capture inquiries, convert them, stop leakage.';

const content: SolutionLandingProps = {
  eyebrow: 'Medical practice marketing',
  h1Lead: 'No patient falls through the cracks,',
  h1Accent: 'even on your busiest day.',
  subhead:
    'Most clinics add another tool. None of them talk to each other. GrowthOS automates replies, follow-up, reminders and rebooking in one platform your staff operates.',
  problem: {
    eyebrow: 'The problem',
    heading: 'You are paying for four tools',
    accent: 'for tools that do not talk.',
    paragraphs: [
      'A typical clinic stack looks like this: an ad tool here, a chatbot on the website, a CRM stores the contacts, and a staff member stitches it all together by hand. Each piece bills you separately, and none of them owns the result. Leads fall through the seams. Medical practice marketing only works when those pieces work together.',
      'More activity is not more infrastructure. Running campaigns is not the same as having a system that turns a click into a booked consultation. When the pieces are disconnected, you pay for demand you never convert and blame the ads when the real leak is everything that happens after the click.',
    ],
    points: [
      'Ad reports show clicks, not booked patients.',
      'The chatbot deflects questions instead of booking consultations.',
      'The CRM stores the lead but never follows up.',
      'No single owner is accountable for revenue from inquiry to consult.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'One platform for the entire funnel.',
    intro:
      'GrowthOS gives your team inquiry capture, conversion, leak-stage follow-up, and retention in one place. The same system that creates the inquiry also answers it, books it, and brings the patient back.',
    features: [
      {
        icon: 'megaphone',
        title: 'Manage your ad accounts',
        body: 'AI drafts ad copy and budgets that your team reviews and publishes in your own ad accounts.',
      },
      {
        icon: 'zap',
        title: 'Convert inquiries',
        body: 'Every inquiry gets an instant, accurate response and a clear path to book, before they call the clinic down the street.',
      },
      {
        icon: 'filter',
        title: 'Stop the leakage',
        body: 'GrowthOS follows up at every pipeline stage, recovering the inquiries that stall after the first message.',
      },
      {
        icon: 'repeat',
        title: 'Retain and rebook',
        body: 'Automated membership reminders, rebooking and follow-up messages to your own patients and inquirers who opted in, keep patients coming back and lift lifetime value.',
      },
      {
        icon: 'layers',
        title: 'One platform instead of four',
        body: 'Ads, inbox, CRM, booking, and reporting in one platform, so you stop paying four vendors to do one job.',
      },
      {
        icon: 'chart',
        title: 'Report on revenue',
        body: 'See the funnel end to end, from ad spend to booked consult, and let the AI act on the leaks instead of just charting them.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why specialty clinics',
    heading: 'Marketing built for how patients actually decide.',
    intro:
      'Generic software treats a plumber and a fertility clinic the same way. Specialty care is high-consideration and regulated. GrowthOS is built for the way patients research, hesitate, and choose in healthcare.',
    segments: [
      {
        title: 'Fertility and reproductive medicine',
        body: 'Long decision cycles reward clinics that stay present and reassuring. GrowthOS keeps every inquiry nurtured from first search to first consult.',
      },
      {
        title: 'Aesthetics and med spa',
        body: 'Fast decisions and repeat visits demand speed and rebooking. GrowthOS handles promotions, packages, and no-show recovery automatically.',
      },
      {
        title: 'Regenerative medicine',
        body: 'High-ticket consults need education before commitment. GrowthOS delivers the right proof at the right moment in the funnel.',
      },
      {
        title: 'Wellness and longevity',
        body: 'Programs and memberships depend on retention. GrowthOS keeps members engaged and renewing without manual follow-up.',
      },
    ],
  },
  proofPoints: [
    'Inbox, CRM, booking and ad management in one',
    'Built for specialty clinics',
    'HIPAA-grade data handling',
    'Leads flowing on day one',
  ],
  faqs: [
    {
      question: 'What does medical practice marketing include?',
      answer:
        'Effective medical practice marketing covers the full funnel: attracting patients through ads in your own accounts, converting inquiries into booked consultations, following up on leads that stall, and retaining existing patients. GrowthOS covers all four in one platform your staff operates instead of across separate vendors.',
    },
    {
      question: 'Can GrowthOS replace our separate tools?',
      answer:
        'Yes. GrowthOS gives your team one place to manage your ad accounts, answer inquiries, follow up and report on booked patients. You keep ownership of the results and the data.',
    },
    {
      question: 'How is this different from hiring a chatbot or an ads tool?',
      answer:
        'A chatbot only answers the website and an ads tool only manages campaigns. Neither owns the outcome. GrowthOS connects demand, conversion, follow-up, and retention so a click actually becomes a booked consultation.',
    },
    {
      question: 'Do we need technical staff to run it?',
      answer:
        'No. GrowthOS ships pre-built for your specialty. AI handles routine replies, and your staff stays in control rather than operating four separate tools.',
    },
    {
      question: 'How fast will we see booked consultations?',
      answer:
        'GrowthOS is typically live in about 48 hours and begins responding to inquiries immediately. Speed to lead improves from day one, which is the single biggest driver of booked consultations.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro: 'See how medical practice marketing connects to the rest of the system.',
    links: [
      {
        href: '/patient-acquisition',
        label: 'Patient acquisition',
        description: 'The full system for filling your calendar with specialty-clinic patients.',
      },
      {
        href: '/healthcare-crm',
        label: 'Healthcare CRM',
        description: 'The CRM that acquires and retains patients, not just stores them.',
      },
      {
        href: '/med-spa-marketing',
        label: 'Med spa marketing',
        description: 'Aesthetics-specific marketing for membership, rebooking, and reviews.',
      },
      {
        href: '/product',
        label: 'See the GrowthOS platform',
        description: 'Inbox, CRM, booking and ad management in one place.',
      },
    ],
  },
  closing: {
    heading: 'See marketing that fills the calendar.',
    body: 'Thirty minutes. See the software answer inquiries and help staff book consults in your specialty, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'Get your free Leak Map', href: '/growth' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'medical practice marketing',
    'healthcare marketing',
    'clinic marketing',
    'patient acquisition marketing',
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

export const revalidate = 3600;

export default async function Page() {
  const map = await getGrowthosMap();
  const mapSection = <MapStrip map={map} exclude={['after_cycle']} />;
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
      <SolutionLanding {...content} mapSection={mapSection} />
    </>
  );
}
