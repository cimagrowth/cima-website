import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'regenerative-medicine-marketing';
const TITLE = 'Regenerative Medicine Marketing Software for Clinics | Cima';
const OG_TITLE = 'Regenerative Medicine Marketing Software for Clinics';
const DESCRIPTION =
  'Regenerative medicine marketing software for high-ticket clinics. GrowthOS runs compliant ads, instant response, and education-led nurture that books consults.';

const content: SolutionLandingProps = {
  eyebrow: 'Regenerative medicine marketing',
  h1Lead: 'Regenerative marketing that educates, builds trust, and',
  h1Accent: 'books the consult.',
  subhead:
    'Regenerative treatments are high-ticket and high-consideration, patients research for weeks and need to trust you before they commit. GrowthOS answers instantly, nurtures with the right education at the right time, and stays compliant, so serious patients book the consult instead of drifting to a competitor.',
  problem: {
    eyebrow: 'The problem',
    heading: 'In regenerative medicine, trust is the whole sale',
    accent: 'and trust takes follow-up.',
    paragraphs: [
      "A patient considering PRP, stem cell, or peptide therapy is spending real money on a decision they don't fully understand yet. They read everything, compare clinics, and hesitate. They need education, reassurance, and answers, delivered patiently over time. One fast reply won't close them, and neither will a hard sell. What closes them is a clinic that shows up consistently, informs them, and earns trust across the whole decision.",
      "Most clinics can't do that by hand. The inquiry comes in, someone replies once, and the follow-up that would have built trust never happens, so a high-value patient quietly goes cold.",
    ],
    points: [
      'High-ticket inquiries get one reply, then silence.',
      'Patients need education and reassurance the front desk has no time to send.',
      'Compliance risk is high, the wrong claim in a message is a real liability.',
      'Consult no-shows and unfollowed leads waste expensive traffic.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'The same engine, tuned for regenerative medicine.',
    intro:
      'GrowthOS runs compliant demand generation, instant response, education-led nurture, and consult protection for your regenerative clinic in one platform, built for a long, high-consideration, high-ticket decision.',
    features: [
      {
        icon: 'zap',
        title: 'Instant response, then patient nurture',
        body: 'Answers every inquiry in seconds, then follows up over days and weeks with the education and reassurance a high-consideration decision requires.',
      },
      {
        icon: 'sparkles',
        title: 'Education-led follow-up',
        body: 'Delivers the right explainer, proof point, or answer at the right stage, building the trust that turns a researcher into a booked consult.',
      },
      {
        icon: 'shield',
        title: 'Compliant by design',
        body: 'Clinical AI guardrails know what regenerative marketing must never claim, keeping every message on the right side of the line.',
      },
      {
        icon: 'megaphone',
        title: 'Ads that reach serious patients',
        body: 'Healthcare-compliant Google and Meta campaigns that bring in high-intent, high-ticket inquiries, without an agency retainer.',
      },
      {
        icon: 'calendar',
        title: 'Consult protection & reactivation',
        body: 'Reminders and rebooking that reduce expensive no-shows, plus reactivation of leads who went quiet mid-decision.',
      },
      {
        icon: 'inbox',
        title: 'One unified inbox',
        body: 'Every patient conversation across every channel in one place, with clean handoff to your team when a human is needed.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why regenerative clinics',
    heading: 'Built for how regenerative patients actually decide.',
    intro:
      'Regenerative medicine is a high-ticket, education-heavy, compliance-sensitive decision unlike almost any other specialty. Patients research for weeks, compare clinics, and commit only once they trust you. GrowthOS is tuned for that reality.',
    segments: [
      {
        title: 'Orthopedic & joint regeneration',
        body: 'Nurture patients weighing PRP or cell therapy against surgery with education that builds confidence.',
      },
      {
        title: 'Stem cell & cellular therapy',
        body: 'Long, research-heavy decisions supported with consistent, compliant follow-up.',
      },
      {
        title: 'PRP & peptide therapy',
        body: 'Convert curiosity into consults with timely answers and proof at each stage.',
      },
      {
        title: 'Multi-location regenerative groups',
        body: 'Consistent voice, compliance, and reporting across every location and provider.',
      },
    ],
  },
  proofPoints: [
    'Instant multi-channel response',
    'Education-led nurture',
    'Compliant by design with a BAA',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is regenerative medicine marketing software?',
      answer:
        'Regenerative medicine marketing software helps high-ticket clinics attract patients, respond instantly, and nurture them through a long, education-heavy decision. GrowthOS combines compliant ads, instant response, education-led follow-up, and reactivation in one platform.',
    },
    {
      question: 'How does GrowthOS handle a long, high-consideration decision?',
      answer:
        'It follows up over days and weeks with the right education and reassurance at each stage, building the trust a high-ticket regenerative decision requires instead of relying on a single reply.',
    },
    {
      question: 'How does it stay compliant with regenerative marketing rules?',
      answer:
        'GrowthOS uses clinical AI guardrails that know what your treatments must never claim, keeping messaging compliant while still being helpful and persuasive.',
    },
    {
      question: 'Can it respond to inquiries automatically across channels?',
      answer:
        'Yes. GrowthOS answers web chat, SMS, WhatsApp, email, and social DMs in seconds from one unified inbox, critical for high-ticket patients who reward the clinic that responds first and best.',
    },
    {
      question: 'Is GrowthOS HIPAA compliant?',
      answer:
        'Yes. Patient data is encrypted and handled to clinical standard with a Business Associate Agreement (BAA), plus A2P 10DLC texting compliance and clinical AI guardrails.',
    },
    {
      question: 'Does it work with our EHR or existing CRM?',
      answer:
        'Yes. GrowthOS integrates with common EHRs and can sit on top of Salesforce, HubSpot, or Zoho, or replace your CRM entirely.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro:
      'See how regenerative medicine marketing connects to the wider acquisition system, and read the playbooks behind it.',
    links: [
      {
        href: '/blog/the-13-hour-patient-fertility-clinic-patient-leakage',
        label: 'The 13-Hour Patient',
        description: 'Where high-ticket clinics leak patients between inquiry and booked consult.',
      },
      {
        href: '/blog/trust-stack-hipaa-badge-form-abandonment-fertility-clinics',
        label: 'The T.R.U.S.T. Stack',
        description: 'How HIPAA signals and form design build the trust a high-ticket decision needs.',
      },
      {
        href: '/blog/why-your-clinic-loses-40-percent-of-inquiries',
        label: 'Why Your Clinic Loses 40% of Inquiries',
        description: 'The slow-response gap that quietly hands expensive leads to faster clinics.',
      },
      {
        href: '/ai-agent',
        label: 'See the AI agent',
        description: 'The AI team that answers, educates, and nurtures high-ticket patients around the clock.',
      },
      {
        href: '/features',
        label: 'Explore the features',
        description: 'Compliant ads, unified inbox, education-led nurture, and reactivation in one platform.',
      },
      {
        href: '/demo',
        label: 'Book a demo',
        description: 'See the AI team run a real regenerative journey, not a generic walkthrough.',
      },
    ],
  },
  closing: {
    heading: "Every high-ticket lead you don't follow up with is a competitor's consult.",
    body: 'Our commitment, in writing: every lead answered in under 60 seconds, every patient followed up at every stage. Miss it and your next month is credited. Implementation included on annual plans. Live in 48 hours.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'regenerative medicine marketing',
    'regenerative medicine CRM',
    'stem cell clinic marketing',
    'PRP marketing',
    'regenerative patient acquisition',
    'regenerative medicine marketing software',
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
