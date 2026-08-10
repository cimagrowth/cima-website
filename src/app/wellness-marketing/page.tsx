import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'wellness-marketing';
const TITLE = 'Wellness Center Marketing Software for Clinics | Cima';
const OG_TITLE = 'Wellness Center Marketing Software for Clinics';
const DESCRIPTION =
  'Wellness center marketing software that fills the calendar and keeps members active. GrowthOS runs ads, instant follow-up, rebooking, and reactivation.';

const content: SolutionLandingProps = {
  eyebrow: 'Wellness marketing',
  h1Lead: 'Wellness marketing that fills the calendar and',
  h1Accent: 'keeps members coming back.',
  subhead:
    'Wellness is a relationship, not a one-time visit. GrowthOS brings new clients in, answers every inquiry instantly, and keeps members rebooking and renewing, so your recurring revenue grows instead of leaking every month.',
  problem: {
    eyebrow: 'The problem',
    heading: 'Wellness clinics do not lose clients loudly.',
    accent: 'They lose them quietly.',
    paragraphs: [
      'A prospective client fills out a form after seeing your post, hears nothing back for a day, and moves on. That is the visible leak. The bigger one is invisible: members who quietly stop booking, packages that go unused, and lapsed clients who would happily return if anyone reached out. Wellness lives on lifetime value, and lifetime value dies from silence, not from a bad visit.',
      'Most clinics lean on a busy front desk to handle intake, reminders, rebooking, and win-backs by hand. It slips, every week, and the recurring revenue you already earned walks out the door.',
    ],
    points: [
      'New inquiries arrive after hours and never get a timely reply.',
      'Members drift away with no one re-engaging them.',
      'Unused packages and memberships quietly expire.',
      'Reviews and referrals, your cheapest growth, never get asked for.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'The same engine, tuned for wellness.',
    intro:
      'GrowthOS runs demand generation, instant follow-up, retention, and reactivation for your wellness clinic in one platform. It books new clients fast and keeps existing members active and renewing.',
    features: [
      {
        icon: 'zap',
        title: 'Instant inquiry response',
        body: 'Every new lead answered in seconds across web chat, SMS, WhatsApp, email, and social DMs, booked before they cool off.',
      },
      {
        icon: 'repeat',
        title: 'Membership retention & rebooking',
        body: "Automated flows that keep members active, prompt the next visit, and flag when someone's engagement is slipping so you can act before they lapse.",
      },
      {
        icon: 'bell',
        title: 'Reactivation campaigns',
        body: 'Wins back lapsed clients and unused packages with timely, personal outreach, recovering revenue you already earned.',
      },
      {
        icon: 'megaphone',
        title: 'Ads that fill the calendar',
        body: 'Healthcare-compliant Google and Meta campaigns that bring in the right clients, without an agency retainer.',
      },
      {
        icon: 'star',
        title: 'Review velocity',
        body: 'Requests reviews automatically at the right moment after a visit, building the local reputation that drives more wellness clients.',
      },
      {
        icon: 'inbox',
        title: 'One unified inbox',
        body: 'Every client conversation across every channel in one place, with clean handoff to your team when a human is needed.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why wellness clinics',
    heading: 'Built for how wellness clinics actually grow.',
    intro:
      'Wellness runs on relationships and recurring revenue, not one-time transactions. Clients return often, buy packages and memberships, and stay for years when someone keeps in touch. GrowthOS is tuned for that model.',
    segments: [
      {
        title: 'Functional & integrative medicine',
        body: 'Long client relationships nurtured with consistent, personal follow-up at scale.',
      },
      {
        title: 'Hormone therapy & weight management',
        body: "Keep clients on-program with reminders, refills, and rebooking that don't depend on the front desk remembering.",
      },
      {
        title: 'IV therapy & recovery',
        body: 'Turn one-time visits into memberships and repeat bookings with automated follow-up.',
      },
      {
        title: 'Multi-service wellness centers',
        body: 'One system across every service line, location, and provider, consistent voice, unified reporting.',
      },
    ],
  },
  proofPoints: [
    'Instant multi-channel response',
    'Membership retention and rebooking',
    'Reactivation built in',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is wellness center marketing software?',
      answer:
        'Wellness center marketing software helps clinics attract new clients, respond to inquiries instantly, and keep members active. GrowthOS combines ads, instant follow-up, rebooking, reactivation, and review requests in one platform built for wellness.',
    },
    {
      question: 'How does GrowthOS improve member retention?',
      answer:
        'It automates rebooking and membership nurture, and flags members whose engagement is slipping so you can re-engage them before they lapse, protecting the recurring revenue you already earned.',
    },
    {
      question: 'Can it reactivate lapsed clients automatically?',
      answer:
        'Yes. GrowthOS runs automated reactivation campaigns that win back dormant clients and unused packages with timely, personal outreach.',
    },
    {
      question: 'Does it respond to inquiries across every channel?',
      answer:
        'Yes. GrowthOS answers web chat, SMS, WhatsApp, email, and social DMs in seconds from one unified inbox, so new clients book with you instead of the clinic that replied first.',
    },
    {
      question: 'Is GrowthOS HIPAA compliant?',
      answer:
        'Yes. Patient data is encrypted and handled to clinical standard with a Business Associate Agreement (BAA), plus texting compliance and clinical AI guardrails.',
    },
    {
      question: 'Does it work with our existing tools?',
      answer:
        'Yes. GrowthOS integrates with common EHRs and can sit on top of Salesforce, HubSpot, or Zoho, or replace your CRM entirely.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro:
      'See how wellness marketing connects to the wider acquisition system, and read the playbooks behind it.',
    links: [
      {
        href: '/blog/why-your-clinic-loses-40-percent-of-inquiries',
        label: 'Why Your Clinic Loses 40% of Inquiries',
        description: 'The slow-response gap that quietly hands new clients to faster clinics.',
      },
      {
        href: '/blog/hidden-cost-tool-sprawl-clinic-disorganization',
        label: 'The Hidden Cost of Tool Sprawl',
        description: 'How scattered tools create the disorganization that leaks recurring revenue.',
      },
      {
        href: '/blog/patients-do-respond-debunking-unreachable-lead-myth',
        label: 'Patients Do Respond',
        description: 'Debunking the unreachable-lead myth behind lapsed clients and dead leads.',
      },
      {
        href: '/ai-agent',
        label: 'See the AI agent',
        description: 'The AI team that answers, rebooks, and reactivates clients around the clock.',
      },
      {
        href: '/features',
        label: 'Explore the features',
        description: 'Ads, unified inbox, retention, and reactivation in one platform.',
      },
      {
        href: '/demo',
        label: 'Book a demo',
        description: 'See the AI team run a real wellness journey, not a generic walkthrough.',
      },
    ],
  },
  closing: {
    heading: 'Every quiet month is recurring revenue walking out the door.',
    body: 'See results in 30 days or we will work with you until you do. Setup fee waived on annual plans. Live in 48 hours.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'wellness center marketing',
    'wellness clinic CRM',
    'functional medicine marketing',
    'hormone therapy marketing',
    'wellness patient retention',
    'wellness center marketing software',
  ],
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: OG_TITLE,
    description: DESCRIPTION,
    url: `https://cimagrowth.com/${SLUG}`,
    siteName: 'Cima Growth Solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
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
