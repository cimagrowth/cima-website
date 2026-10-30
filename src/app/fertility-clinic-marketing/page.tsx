import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import {
  getGrowthosMap,
  getPlatformStats,
  firstReplyCommitment,
  FIRST_REPLY_SOURCE_SHORT,
  FORMS_CONNECT_LINE,
} from '@/lib/growthos-map';
import MapExplorer from '@/components/home/MapExplorer';
import { buildExplorerStages, explorerSourceKeys } from '@/components/map/explorer-data';
import SourcesList from '@/components/map/SourcesList';
import { WRAP } from '@/components/map/ui';
import { ANY_EHR_LINE, EHR_SYSTEMS } from '@/content/integrations';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'fertility-clinic-marketing';
const TITLE = 'Fertility Clinic Marketing Software for IVF Practices | Cima';
const OG_TITLE = 'Fertility Clinic Marketing Software for IVF Practices';
const DESCRIPTION =
  'Fertility clinic marketing software for IVF and reproductive practices. GrowthOS handles instant follow-up, long-cycle nurture and ad account management that books consults, in one platform your team runs.';

const content: SolutionLandingProps = {
  eyebrow: 'Fertility clinic marketing',
  h1Lead: 'Fertility clinic software that',
  h1Accent: 'answers in seconds and follows up for months.',
  subhead:
    'A fertility patient may take months to decide, but they choose their shortlist in the first hour. GrowthOS answers every inquiry instantly, in the right tone, then nurtures patiently across the entire journey, so the patients who find you actually book the consult.',
  problem: {
    eyebrow: 'The problem',
    heading: 'In fertility, the clinic that responds first, and follows up longest',
    accent: 'wins.',
    paragraphs: [
      'Fertility patients research for weeks and reach out to several clinics at once, often late at night after a hard day. Whoever answers first, warmly, and with real information, earns the trust. If your front desk replies two days later, the patient has already booked elsewhere. But speed is only half of it: a fertility decision takes many conversations over weeks, and most clinics stop after one or two.',
      'Then there is everything a stretched front desk cannot keep up with. Inquiries that arrive after hours. Patients who go quiet mid-decision. Cycles that pause and never resume. Egg-freezing leads that were never followed up. Each one is a patient, and a high-value treatment, quietly lost.',
    ],
    points: [
      'Inquiries arrive after hours and on weekends, when no one is at the desk to reply.',
      'The follow-up a fertility decision needs is long and emotional, and it is done by hand, so it slips.',
      'Patients in a sensitive moment get generic, mistimed, or clinically wrong responses.',
      'Patients whose cycles paused never hear from the clinic again.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'The same engine, tuned for fertility.',
    intro:
      'GrowthOS handles instant replies, follow-up, rebooking and reviews in one platform your team runs, tuned for a long and emotional decision instead of a quick transaction.',
    features: [
      {
        icon: 'zap',
        title: 'Instant, emotionally-aware response',
        body: 'Every inquiry gets answered in seconds, on web chat, SMS, WhatsApp, email, and social DMs, in a tone trained for grief, hope, and anxiety, never a generic bot script.',
      },
      {
        icon: 'repeat',
        title: 'Long-cycle nurture that never fades',
        body: 'Follows up again and again across days and weeks, adapting to where the patient is in their journey and IVF cycle stage. It never forgets and never goes cold after day three.',
      },
      {
        icon: 'megaphone',
        title: 'Ads that bring qualified patients',
        body: 'Healthcare-compliant campaigns in your own Google and Meta accounts, measured against booked consults.',
      },
      {
        icon: 'bell',
        title: 'Follow-up for paused patients',
        body: 'Rebooking and follow-up messages to your own patients and inquirers who opted in, including patients whose cycles paused and egg-freezing inquirers who went quiet, on their own timeline.',
      },
      {
        icon: 'shield',
        title: 'HIPAA-grade handling + clinical guardrails',
        body: 'Patient data encrypted and handled to clinical standard with a BAA, and AI safety rules that know what a fertility conversation must never say.',
      },
      {
        icon: 'inbox',
        title: 'One unified inbox',
        body: 'Every patient conversation across every channel in one place, with clean handoff to your team the moment a conversation needs a human.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why fertility clinics',
    heading: 'Built for how fertility patients actually decide.',
    intro:
      'Fertility is a longer, higher-emotion decision than almost any other specialty. Patients research for weeks, choose their shortlist in the first hour, and commit only after many patient touchpoints. GrowthOS is tuned for that reality.',
    segments: [
      {
        title: 'Single-location fertility clinics',
        body: 'Punch above your size, instant response and tireless follow-up that competes with the big networks.',
      },
      {
        title: 'Multi-location fertility networks',
        body: 'Consistent tone, routing, and reporting across every location and provider.',
      },
      {
        title: 'IVF & reproductive endocrinology',
        body: 'Journeys mapped to real clinical reality, cycle stages, treatment series, and consult types, not blank automations.',
      },
      {
        title: 'Egg freezing & fertility preservation',
        body: 'Capture and nurture time-sensitive preservation leads that convert on a longer, self-paced timeline.',
      },
    ],
  },
  proofPoints: [
    'Instant multi-channel response',
    'Long-cycle nurture that keeps following up',
    'HIPAA-grade with a BAA',
    'Leads flowing on day one',
  ],
  faqs: [
    {
      question: 'What is fertility clinic marketing software?',
      answer:
        'Fertility clinic marketing software helps reproductive practices attract patients, respond to inquiries instantly, and nurture them through a long, emotional decision. GrowthOS combines ad account management, instant multi-channel replies, long-cycle nurture, and rebooking and follow-up messages to your own patients and inquirers who opted in in one platform built for fertility care.',
    },
    {
      question: 'How does GrowthOS handle the long fertility decision cycle?',
      answer:
        'It keeps following up across days and weeks, adapting tone and content to where the patient is emotionally and clinically, so patients who need time are nurtured patiently instead of forgotten after the first reply.',
    },
    {
      question: 'Is GrowthOS HIPAA compliant?',
      answer:
        'Yes. Patient data is encrypted and handled to clinical standard with a Business Associate Agreement (BAA), plus A2P 10DLC texting compliance and clinical AI guardrails built specifically for fertility.',
    },
    {
      question: 'Can it respond to inquiries automatically across channels?',
      answer:
        'Yes. GrowthOS answers web chat, SMS, WhatsApp, email, and social DMs in seconds from one unified inbox, which is critical in fertility where patients message several clinics and remember whoever responded first and best.',
    },
    {
      question: 'How does it help with patients who paused treatment?',
      answer:
        'GrowthOS sends rebooking and follow-up messages to your own patients and inquirers who opted in, including patients whose cycles paused, at the right moment, with opt-out on every message, so your team does not chase them manually.',
    },
    {
      question: 'Does it work with our EHR or existing CRM?',
      answer:
        `Yes. GrowthOS integrates with ${EHR_SYSTEMS.join(', ')}. ${ANY_EHR_LINE} It can sit on top of Salesforce, HubSpot, GoHighLevel or Zoho, or replace your CRM entirely.`,
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro:
      'See how fertility clinic marketing connects to the wider acquisition system, and read the playbooks behind it.',
    links: [
      {
        href: '/blog/13-hour-patient-fertility-clinic-response-time-revenue',
        label: 'The 13-Hour Patient',
        description: 'Where fertility clinics leak patients between inquiry and booked consult.',
      },
      {
        href: '/blog/why-your-clinic-loses-40-percent-of-inquiries',
        label: 'Why Clinics Lose Inquiries',
        description: 'The slow-response gap that quietly hands patients to faster clinics.',
      },
      {
        href: '/blog/hope-framework-ethical-automation-fertility-clinics',
        label: 'The H.O.P.E. Framework',
        description: 'Ethical automation for fertility clinics, tuned for a sensitive decision.',
      },
      {
        href: '/blog/trust-stack-hipaa-badge-form-abandonment-fertility-clinics',
        label: 'The T.R.U.S.T. Stack',
        description: 'How HIPAA signals and form design reduce abandonment in fertility.',
      },
      {
        href: '/ai-agent',
        label: 'See the AI agent',
        description: 'The AI assistant that answers and follows up with patients around the clock, supervised by your team.',
      },
      {
        href: '/product#features',
        label: 'Explore the features',
        description: 'Ad account management, unified inbox, nurture, and rebooking in one platform.',
      },
      {
        href: '/demo',
        label: 'Book a demo',
        description: 'See the software handle a sample fertility journey, not a generic walkthrough.',
      },
    ],
  },
  closing: {
    heading: 'When your clinic gets busy, GrowthOS keeps every fertility patient hearing from you.',
    // Filled from live platform figures in Page().
    body: '',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'Get your free Leak Map', href: '/growth' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'fertility clinic marketing',
    'fertility clinic marketing software',
    'fertility clinic CRM',
    'IVF marketing',
    'fertility patient acquisition',
    'fertility clinic software',
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

export const revalidate = 3600;

export default async function Page() {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const explorerStages = buildExplorerStages(map, stats);
  const mapSection = (
    <>
      <MapExplorer stages={explorerStages} defaultStage="after_cycle" />
      <div className={`${WRAP} pb-16`}>
        <SourcesList map={map} sourceKeys={explorerSourceKeys(explorerStages)} windowDays={stats.window_days} />
      </div>
    </>
  );
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
      <SolutionLanding
        {...content}
        closing={{
          ...content.closing,
          body: firstReplyCommitment(stats),
          note: FIRST_REPLY_SOURCE_SHORT,
          more: FORMS_CONNECT_LINE,
        }}
        mapSection={mapSection}
      />
    </>
  );
}
