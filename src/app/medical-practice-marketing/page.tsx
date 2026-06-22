import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'medical-practice-marketing';
const TITLE = 'Medical Practice Marketing That Fills Your Calendar | Cima';
const DESCRIPTION =
  'Medical practice marketing that replaces the agency, the ads manager, the chatbot, and the CRM with one platform. Generate demand, convert inquiries, stop leakage.';

const content: SolutionLandingProps = {
  eyebrow: 'Medical practice marketing',
  h1Lead: 'Medical practice marketing that',
  h1Accent: 'fills your calendar, not your inbox.',
  subhead:
    'Most clinics buy more marketing. They do not buy marketing that works together. GrowthOS replaces the agency, the ads manager, the chatbot, and the CRM with one platform that runs the full funnel.',
  problem: {
    eyebrow: 'The problem',
    heading: 'You are paying four retainers',
    accent: 'for tools that do not talk.',
    paragraphs: [
      'A typical clinic stack looks like this: an agency runs the ads, a chatbot answers the website, a CRM stores the contacts, and a staff member stitches it all together by hand. Each piece bills you separately, and none of them owns the result. Leads fall through the seams.',
      'More activity is not more infrastructure. Running campaigns is not the same as having a system that turns a click into a booked consultation. When the pieces are disconnected, you pay for demand you never convert and blame the ads when the real leak is everything that happens after the click.',
    ],
    points: [
      'The agency reports on clicks, not booked patients.',
      'The chatbot deflects questions instead of booking consultations.',
      'The CRM stores the lead but never follows up.',
      'No single owner is accountable for revenue from inquiry to consult.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'One platform for the entire funnel.',
    intro:
      'GrowthOS runs demand generation, conversion, leak-stage follow-up, and retention in one place. The same system that creates the inquiry also answers it, books it, and brings the patient back.',
    features: [
      {
        icon: 'megaphone',
        title: 'Generate demand',
        body: 'AI builds, launches, and optimizes ads and outreach across channels, so qualified inquiries arrive consistently instead of in bursts.',
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
        body: 'Automated rebooking, membership, and reactivation campaigns keep patients coming back and lift lifetime value.',
      },
      {
        icon: 'layers',
        title: 'Replace the patchwork',
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
      'A generic marketing agency runs the same playbook for a plumber and a fertility clinic. Specialty care is high-consideration and regulated. GrowthOS is built for the way patients research, hesitate, and choose in healthcare.',
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
        body: 'Programs and memberships depend on retention. GrowthOS keeps members engaged and renewing without manual outreach.',
      },
    ],
  },
  proofPoints: [
    'Replaces agency, ads, chatbot, and CRM',
    'Built for specialty clinics',
    'HIPAA-grade data handling',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What does medical practice marketing include?',
      answer:
        'Effective medical practice marketing covers the full funnel: generating demand through ads and outreach, converting inquiries into booked consultations, following up on leads that stall, and retaining existing patients. GrowthOS runs all four in one platform instead of across separate vendors.',
    },
    {
      question: 'Can GrowthOS replace our marketing agency?',
      answer:
        'Yes. GrowthOS runs the ads, answers inquiries, follows up, and reports on booked patients, which is the work most clinics outsource to an agency. You keep ownership of the results and the data, and you stop paying a retainer for disconnected activity.',
    },
    {
      question: 'How is this different from hiring a chatbot or an ads tool?',
      answer:
        'A chatbot only answers the website and an ads tool only manages campaigns. Neither owns the outcome. GrowthOS connects demand, conversion, follow-up, and retention so a click actually becomes a booked consultation.',
    },
    {
      question: 'Do we need technical staff to run it?',
      answer:
        'No. GrowthOS ships pre-built for your specialty and the AI team does the day-to-day work. Your staff oversees results rather than operating four separate tools.',
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
        description: 'Ads, inbox, CRM, and the AI team that runs them in one place.',
      },
    ],
  },
  closing: {
    heading: 'See marketing that fills the calendar.',
    body: 'Twenty minutes. We will show the AI team running ads, answering inquiries, and booking consults in your specialty, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'medical practice marketing',
    'healthcare marketing',
    'clinic marketing',
    'medical marketing agency alternative',
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
