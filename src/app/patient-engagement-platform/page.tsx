import type { Metadata } from 'next';
import SolutionLanding, { type SolutionLandingProps } from '@/views/SolutionLanding';
import { buildSolutionSchema } from '@/lib/solution-jsonld';

const SLUG = 'patient-engagement-platform';
const TITLE = 'Patient Engagement Platform for Clinics | GrowthOS';
const DESCRIPTION =
  'GrowthOS is a patient engagement platform that converts and retains, not just messages. Multi-channel SMS, email, WhatsApp, LINE, web chat, and voice with an AI patient bot.';

const content: SolutionLandingProps = {
  eyebrow: 'Patient engagement platform',
  h1Lead: 'A patient engagement platform that',
  h1Accent: 'converts and retains, not just messages.',
  subhead:
    'Most engagement tools send messages. They do not move patients forward. GrowthOS engages every inquiry across every channel, responds in seconds, and follows up until the patient books and rebooks.',
  problem: {
    eyebrow: 'The problem',
    heading: 'Sending messages is not',
    accent: 'the same as engaging patients.',
    paragraphs: [
      'Plenty of platforms can blast an SMS or schedule an email. That is broadcasting, not engagement. Real engagement means the right reply, on the channel the patient chose, fast enough to matter, every single time. Most tools fall down on speed and consistency, which is exactly when patients lose interest.',
      'A patient who messages at 9:14pm does not want an auto-reply that says someone will be in touch. They want an answer. The clinic that responds in seconds with a real, accurate reply earns the consultation. The one that waits until morning loses it to whoever answered first.',
    ],
    points: [
      'After-hours inquiries go unanswered when staff are gone.',
      'Patients reach out on SMS, WhatsApp, LINE, web chat, and DMs, but tools cover only some of them.',
      'Generic auto-replies acknowledge the message without moving it forward.',
      'Follow-up depends on a busy human remembering to send it.',
    ],
  },
  solution: {
    eyebrow: 'How GrowthOS solves it',
    heading: 'Engagement that responds, converts, and retains.',
    intro:
      'GrowthOS engages patients on every channel with an AI patient bot that answers accurately, books consultations, and keeps following up. Speed and consistency are the product, not an afterthought.',
    features: [
      {
        icon: 'message',
        title: 'Multi-channel by default',
        body: 'SMS, email, WhatsApp, LINE, web chat, and voice in one platform, so patients reach you wherever they already are.',
      },
      {
        icon: 'bot',
        title: 'AI patient bot',
        body: 'A specialty-trained bot answers questions accurately, qualifies the inquiry, and books the consultation without a staff member online.',
      },
      {
        icon: 'zap',
        title: 'Seconds, not hours',
        body: 'Every inquiry gets a real reply in seconds, day or night, so you win the patients that go to whoever responds first.',
      },
      {
        icon: 'filter',
        title: 'Leak-stage follow-up',
        body: 'When a patient stalls before booking, GrowthOS keeps the conversation going at exactly the right moment instead of letting it die.',
      },
      {
        icon: 'repeat',
        title: 'Retention and rebooking',
        body: 'Reminders, rebooking, and reactivation keep patients engaged after the first visit, not just before it.',
      },
      {
        icon: 'inbox',
        title: 'One unified inbox',
        body: 'Every conversation across every channel lands in a single inbox your team can step into at any time.',
      },
    ],
  },
  whyClinics: {
    eyebrow: 'Why specialty clinics',
    heading: 'Engagement tuned to the patient journey.',
    intro:
      'Engagement in specialty care is not one message. It is the right sequence of touches across a long, often emotional decision. GrowthOS is built for that, by specialty.',
    segments: [
      {
        title: 'Fertility and reproductive medicine',
        body: 'Sensitive, high-stakes decisions need warm, consistent contact. GrowthOS keeps every inquiry supported from first question to first consult.',
      },
      {
        title: 'Aesthetics and med spa',
        body: 'Fast-moving clients respond to instant answers and easy rebooking. GrowthOS handles promotions, reminders, and no-show recovery.',
      },
      {
        title: 'Regenerative medicine',
        body: 'Patients need education before a high-ticket consult. GrowthOS engages with the right information at each step.',
      },
      {
        title: 'Wellness and longevity',
        body: 'Memberships depend on ongoing engagement. GrowthOS keeps members active and renewing on schedule.',
      },
    ],
  },
  proofPoints: [
    'SMS, email, WhatsApp, LINE, chat, and voice',
    'AI patient bot',
    'HIPAA-grade data handling',
    'Live in 48 hours',
  ],
  faqs: [
    {
      question: 'What is a patient engagement platform?',
      answer:
        'A patient engagement platform manages communication between a clinic and its patients across channels such as SMS, email, web chat, and voice. GrowthOS adds conversion and retention to that engagement, so it does not just message patients, it books and rebooks them.',
    },
    {
      question: 'Which channels does GrowthOS support?',
      answer:
        'GrowthOS engages patients across SMS, email, WhatsApp, LINE, web chat, social DMs, and voice, all from one unified inbox, so patients can reach you on whatever channel they prefer.',
    },
    {
      question: 'How fast does GrowthOS respond to inquiries?',
      answer:
        'GrowthOS responds in seconds, around the clock, including after hours and weekends. Because speed to lead is the strongest predictor of whether a patient books, responding instantly is the core of the platform.',
    },
    {
      question: 'Is the AI patient bot safe for healthcare conversations?',
      answer:
        'Yes. The AI bot is trained with specialty-specific guardrails and HIPAA-grade data handling, and your team can step into any conversation at any time through the unified inbox.',
    },
    {
      question: 'Does patient engagement help with retention?',
      answer:
        'Yes. GrowthOS continues engaging patients after the first visit with reminders, rebooking, and reactivation campaigns, which raises retention and lifetime value rather than focusing only on new inquiries.',
    },
  ],
  related: {
    heading: 'Keep exploring',
    intro: 'See how patient engagement connects to the wider acquisition system.',
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
        href: '/medical-practice-marketing',
        label: 'Medical practice marketing',
        description: 'Replace the agency, ads manager, and chatbot with one platform.',
      },
      {
        href: '/product',
        label: 'See the GrowthOS platform',
        description: 'The unified inbox and the AI team that runs your engagement.',
      },
    ],
  },
  closing: {
    heading: 'See engagement that books patients.',
    body: 'Twenty minutes. We will show the AI patient bot handling real inquiries across channels in your specialty, not a generic demo.',
    primaryCta: { label: 'Book a Demo', href: '/demo' },
    secondaryCta: { label: 'See GrowthOS', href: '/product' },
  },
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'patient engagement platform',
    'patient engagement software',
    'patient communication platform',
    'healthcare patient engagement',
    'clinic patient engagement',
    'AI patient bot',
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
