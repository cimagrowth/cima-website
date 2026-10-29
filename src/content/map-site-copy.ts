import type { StageKey } from "@/lib/growthos-map";

// Website wording for the GrowthOS Map. The RPC is shared with the product,
// so the site rewrites a few module names and descriptions here to describe
// GrowthOS as software the clinic's own team operates, messaging only its own
// patients and inquirers. Applied to every map read (RPC and snapshot) before
// any specialty override. Keys are live RPC names.

export interface SiteFeatureCopy {
  name?: string;
  description?: string;
}

/** Features the website never lists (sold only through Deal Desk). */
export const HIDDEN_FEATURES = new Set(["Website management and SEO"]);

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
    name: "Referral intake",
    description: "Referring doctors send patients in and are thanked automatically.",
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
    description:
      "Lets your team re-contact past inquirers and patients who opted in, with opt-out on every message.",
  },
  Newsletters: {
    name: "Patient updates",
    description: "Drag-and-drop email to opted-in patients, with unsubscribe enforced.",
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
    name: "Alumni check-ins",
    description: "Outcome-aware check-ins with opted-in alumni, so a graduate hears from the clinic without a sales pitch.",
  },
  "Newsletters to alumni": {
    name: "Updates to opted-in alumni",
    description: "The same drag-and-drop patient updates keep opted-in graduates close to the clinic between visits.",
  },
};

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
