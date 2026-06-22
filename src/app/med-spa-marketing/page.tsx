import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'med-spa-marketing';
const TITLE = 'Med Spa Marketing Software for Aesthetic Clinics | Cima';
const DESCRIPTION =
  'Med spa marketing software for aesthetic clinics. GrowthOS runs ads, instant follow-up, membership, rebooking, no-show recovery, and review velocity in one platform.';

const content: SolutionLandingProps = {
  eyebrow: 'Med spa marketing',
  h1Lead: 'Med spa marketing that',
  h1Accent: 'books the chair and keeps it full.',
  subhead:
    'An empty chair is lost revenue you never get back. GrowthOS runs the ads, answers every inquiry instantly, and keeps clients rebooking, so your aesthetic clinic stays full without manual chasing.',
  problem: {
    eyebrow: 'The problem',
    heading: 'In aesthetics, the fast clinic wins',
    accent: 'and the slow one stays empty.',
    paragraphs: [
      'Med spa clients decide quickly and shop around. They message three clinics on Instagram on a Friday night and book with whoever answers first. If your front desk replies on Monday, the appointment is already gone. Speed is not a nice-to-have in aesthetics, it is the whole game.',
      'Then there is the back half of the business. No-shows, unfilled gaps, and clients who never rebook quietly drain revenue every week. Memberships and packages only pay off if someone keeps them active. Most clinics rely on a busy front desk to do all of that by hand, and it slips.',
    ],
    points: [
      'Inquiries arrive after hours and on weekends, when nobody is at the desk.',
      'No-shows leave gaps that never get filled.',
      'Clients finish a treatment and are never invited back.',
      'Reviews, the lifeblood of local aesthetics, get requested inconsistently.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'The same engine, tuned for aesthetics.',
    intro:
      'GrowthOS runs demand generation, instant follow-up, retention, and reviews for your med spa in one platform. It books new clients fast and keeps existing ones coming back.',
    features: [
      {
        icon: 'zap',
        title: 'Instant inquiry response',
        body: 'Every DM, form, and text gets a real reply in seconds, day or night, so you win the clients who book with whoever answers first.',
      },
      {
        icon: 'megaphone',
        title: 'Ads that fill the calendar',
        body: 'AI builds and optimizes promotions and ads for treatments and packages, so new bookings arrive consistently.',
      },
      {
        icon: 'calendar',
        title: 'No-show recovery',
        body: 'Automated reminders and rebooking flows fill gaps and recover appointments before they become lost revenue.',
      },
      {
        icon: 'repeat',
        title: 'Membership and rebooking',
        body: 'GrowthOS keeps members and package clients active with timely rebooking and reactivation, lifting lifetime value.',
      },
      {
        icon: 'star',
        title: 'Review velocity',
        body: 'Automatically request reviews at the right moment to build the local reputation that drives more aesthetic clients.',
      },
      {
        icon: 'inbox',
        title: 'One unified inbox',
        body: 'Instagram, SMS, WhatsApp, web chat, and email in one place, so no inquiry slips through the cracks.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why aesthetic clinics',
    heading: 'Built for how med spa clients actually buy.',
    intro:
      'Aesthetics moves faster than almost any other specialty. Clients decide in minutes, return often, and trust the clinics their friends review well. GrowthOS is tuned for that pace.',
    segments: [
      {
        title: 'Single-location med spas',
        body: 'Compete with bigger clinics on speed. GrowthOS answers every inquiry instantly so a small team never loses a booking to a slow reply.',
      },
      {
        title: 'Multi-location aesthetics',
        body: 'Consistent response, rebooking, and reviews across every location, managed from one platform with one inbox.',
      },
      {
        title: 'Injectables and skin',
        body: 'Repeat-treatment models live on rebooking. GrowthOS keeps clients on schedule for their next appointment automatically.',
      },
      {
        title: 'Wellness and body',
        body: 'Package and membership programs depend on retention. GrowthOS keeps clients engaged and renewing without manual outreach.',
      },
    ],
  },
  proofPoints: [
    'Instant DM and SMS response',
    'No-show recovery and rebooking',
    'Review velocity built in',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is med spa marketing software?',
      answer:
        'Med spa marketing software helps aesthetic clinics attract new clients, respond to inquiries, and keep clients rebooking. GrowthOS combines ads, instant follow-up, membership, no-show recovery, and review requests in one platform built for aesthetics.',
    },
    {
      question: 'How does GrowthOS help with no-shows?',
      answer:
        'GrowthOS sends automated reminders and rebooking flows that confirm appointments and fill gaps when a client cancels, so empty slots get recovered instead of becoming lost revenue.',
    },
    {
      question: 'Can it respond to Instagram and SMS inquiries automatically?',
      answer:
        'Yes. GrowthOS answers Instagram DMs, SMS, WhatsApp, web chat, and email in seconds from one unified inbox, which is critical in aesthetics where clients book with whoever replies first.',
    },
    {
      question: 'Does GrowthOS help get more reviews?',
      answer:
        'Yes. GrowthOS requests reviews automatically at the right moment after a visit, building the local reputation and review velocity that drives more aesthetic clients.',
    },
    {
      question: 'How quickly can a med spa get started?',
      answer:
        'GrowthOS is typically live in about 48 hours because it ships pre-built for aesthetics, so you can start responding to inquiries and recovering no-shows right away.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro: 'See how med spa marketing connects to the wider acquisition system.',
    links: [
      {
        href: '/patient-acquisition',
        label: 'Patient acquisition',
        description: 'The full system for filling your calendar with specialty-clinic clients.',
      },
      {
        href: '/medical-practice-marketing',
        label: 'Medical practice marketing',
        description: 'Replace the agency, ads manager, and chatbot with one platform.',
      },
      {
        href: '/patient-engagement-platform',
        label: 'Patient engagement platform',
        description: 'Multi-channel engagement that converts and retains, not just messages.',
      },
      {
        href: '/product',
        label: 'See the GrowthOS platform',
        description: 'Ads, inbox, rebooking, and the AI team that runs them.',
      },
    ],
  },
  closing: {
    heading: 'See your med spa stay full.',
    body: 'Twenty minutes. We will show the AI team answering inquiries, recovering no-shows, and rebooking clients for an aesthetic clinic, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'med spa marketing',
    'med spa marketing software',
    'aesthetic clinic marketing',
    'medical spa marketing',
    'med spa software',
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
