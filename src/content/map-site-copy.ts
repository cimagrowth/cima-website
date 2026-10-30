import type { StageKey } from "@/lib/growthos-map";

// Website wording for the GrowthOS Map. The RPC is shared with the product,
// so the site rewrites a few module names and descriptions here to describe
// GrowthOS as software the clinic's own team operates, messaging only its own
// patients and inquirers. Applied to every map read (RPC and snapshot) before
// any specialty override. Keys are live RPC names. Two features renamed to the
// same name in one stage are merged into one card, descriptions joined
// (identical descriptions are kept once).

export interface SiteFeatureCopy {
  name?: string;
  description?: string;
}

/** Features the website never lists (sold only through Deal Desk). */
export const HIDDEN_FEATURES = new Set(["Website management and SEO"]);

const RE_ENGAGEMENT = "Re-contacts past inquirers and patients who opted in, with opt-out on every message.";
const PIPELINE_FOLLOW_UPS = "Flags a patient who stalls at any step and follows up before they go cold.";
const PAST_PATIENTS = "Keeps past patients who opted in hearing from your clinic.";

export const SITE_FEATURE_COPY: Record<string, SiteFeatureCopy> = {
  "Campaign engine": {
    name: "Campaign builder",
    description:
      "One brief in: a landing page, ad copy for your own Google and Meta accounts, and consent-based follow-up messages for people who inquire, drafted for your team to review.",
  },
  "Ads Manager and AI Ad Optimizer": {
    name: "Ads Manager",
    description:
      "Connects your clinic's own Google and Meta ad accounts, flags wasted spend and suggests fixes your team approves.",
  },
  "Landing pages": {
    description:
      "Service pages in the clinic's colors, tone and wording, on its own domain, edited by chatting with them.",
  },
  "Quiz funnels": {
    description:
      "Intake quizzes that collect the patient's answers and route the inquiry to your team, sorting every lead hot, warm or cold into the right stage for follow-up.",
  },
  "Doctor referral campaigns": {
    name: "Referral Partners",
    description: "Referring doctors send patients in and are thanked automatically.",
  },
  "Qualification Agent": {
    description:
      "Checks each lead's fit using your own questions and rules, on forms and in chat, and flags red and yellow answers for your team.",
  },
  "Workflows and automations": {
    description: "Build your own automations that send, tag, move and assign patients based on what they do.",
  },
  "Referral Partners": {
    description:
      "A CRM for your physician liaison team: every referring practice with its visits, notes, follow-ups and the patients it sends, plus HubSpot import.",
  },
  "AI front desk": {
    description:
      "Answers the web chat, SMS, email, WhatsApp, Messenger and Instagram messages patients send the clinic, in seconds, day or night, trained on the clinic.",
  },
  "Voice AI": {
    description:
      "Answers inbound calls to your clinic's own line 24/7, tells callers it is an AI assistant, books appointments and hands off to your staff. An add-on to any plan.",
  },
  "Phone trees": {
    name: "Call routing for your clinic's own lines",
  },
  "Call intelligence": {
    name: "Call notes",
    description:
      "Transcripts and summaries of your clinic's recorded inbound calls: new patient or not, what they asked about, whether they booked, and why not.",
  },
  "Email and SMS sequences": {
    name: "Consent-based follow-up (email and SMS)",
  },
  "Reactivation campaigns": {
    name: "Re-engagement",
    description: RE_ENGAGEMENT,
  },
  Newsletters: {
    name: "Re-engagement",
    description: RE_ENGAGEMENT,
  },
  "Booking and appointment automations": {
    name: "Appointments",
  },
  "Pipelines with leak stages": {
    name: "Pipeline follow-ups",
    description: PIPELINE_FOLLOW_UPS,
  },
  "Leak Stages": {
    name: "Pipeline follow-ups",
    description: PIPELINE_FOLLOW_UPS,
  },
  "Stage-to-stage timing": {
    description: "Shows how long patients take between each step, so you can see where they slow down.",
  },
  "Billing automation": {
    name: "Payment links",
  },
  "Cycle and Treatment Coordinator": {
    name: "Cycle Coordinator",
  },
  "Crisis Triage Agent": {
    name: "Escalations",
    description: "Sends urgent patient messages to the right person on your team, with the full history.",
  },
  "Results you can publish": {
    name: "Return reporting",
    description: "See which patients with stored specimens came back.",
  },
  "Google reviews and replies": {
    name: "Reviews",
  },
  "ChartAI records retrieval": {
    description: "Sends outside records requests and tracks them until the records arrive, organized before the consult.",
  },
  "Storage and return outreach": {
    name: "Storage reminders and check-ins",
    description:
      "Sends scheduled reminders before storage renews or a package expires, and a check-in on the schedule you choose. Automated messages pause after a known loss until a person reviews.",
  },
  "Alumni journeys and retargeting": {
    name: "Past patient check-ins",
    description: PAST_PATIENTS,
  },
  "Newsletters to alumni": {
    name: "Past patient check-ins",
    description: PAST_PATIENTS,
  },
};

/** Leaks the website never lists (unsourced), by RPC name. */
export const HIDDEN_LEAKS = new Set(["The 13-Hour Patient"]);

/** Leak description rewrites, by RPC leak name. */
export const SITE_LEAK_COPY: Record<string, string> = {
  "The Form That Kills": "Forms and calls that never reach the right person",
};

/** Cards the website adds to a stage that the RPC does not list. */
export const SITE_EXTRA_FEATURES: Partial<Record<StageKey, { name: string; description: string }[]>> = {
  book: [
    {
      name: "Consult briefings",
      description: "Gives your team a written summary of what each patient said before the consult.",
    },
  ],
};

/** Features shown as one line under a stage's grid instead of as cards. */
export const SITE_ALSO_USED: Partial<Record<StageKey, { hide: string[]; line: string }>> = {
  treatment: {
    hide: ["EHR integrations", "GrowthOS mobile app"],
    line: "Also used here: EHR integrations and the GrowthOS mobile app.",
  },
};

/** Stat label rewrites, keyed "stage_key:source_key". */
export const SITE_STAT_LABELS: Record<string, string> = {
  "commit:gameiro": "of the reasons patients give for stopping fertility treatment are postponement",
  "after_cycle:lyerly": "of patients with stored embryos report high conflict over what to do with them",
};

/** Foundation item renames, by RPC name. */
export const SITE_FOUNDATION_NAMES: Record<string, string> = {
  "Agents under control": "Your team stays in control",
};

/** Phrase rewrites applied to every stage's text (leaks, ideal, metrics, nostat, feature descriptions). */
export const SITE_PHRASES: [string, string][] = [
  ["follow up starts", "follow-up starts"],
  ["nobody arrives as a stranger", "your team walks in already knowing the patient"],
  ["Deals in a leak stage", "Patients stalled at a step"],
  ["Patient Continuity research log", "Keep"],
  ["Referral Accounts", "Referral Partners"],
  ["Stop The Leak", "Pipeline follow-ups"],
  ["Cycle and Treatment Coordinator", "Cycle Coordinator"],
  ["Crisis Triage Agent", "Escalations"],
  ["Billing automation", "Payment links"],
];

/** Phrase-level rewrites for stage text (ideal, metrics). */
export const SITE_STAGE_PHRASES: Partial<Record<StageKey, [string, string][]>> = {
  get_found: [
    [
      "Every service line has a campaign in market and a page that sounds like the clinic, and every dollar",
      "Every service line has its own page and, where the clinic advertises, a campaign tracked to booked consults, and every dollar",
    ],
  ],
  nurture: [
    ["Dormant lists get worked, not deleted.", "Past inquirers who opted in hear from the clinic again."],
    ["Reactivated leads", "Re-engaged leads"],
  ],
};
