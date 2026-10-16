import type { Specialty } from "@/content/specialty";
import type { StageKey } from "@/lib/growthos-map";

// Per-specialty overrides for the GrowthOS Map (stages, features, foundation,
// the /map intro and the stage copy). Anything not listed keeps the live RPC
// value or the fertility STAGE_COPY value. Feature keys are live RPC names.

export interface FeatureOverride {
  name?: string;
  description?: string;
}

export interface StageOverride {
  name?: string;
  /** Full replacement of the stage's leaks. */
  leaks?: { name: string; description: string }[];
  patient_says?: string;
  ideal?: string;
  metrics?: string[];
  nostat?: string;
  /** Keyed by live RPC feature name. */
  features?: Record<string, FeatureOverride>;
  /** STAGE_COPY.leak override. */
  leak?: string;
  /** STAGE_COPY.fix override. */
  fix?: string;
}

export type OtherSpecialty = Exclude<Specialty, "fertility">;

export const STAGE_OVERRIDES: Record<OtherSpecialty, Partial<Record<StageKey, StageOverride>>> = {
  aesthetics: {
    get_found: {
      leak: "You never show up at the search. Clients looking for a treatment never find you, and the promotions meant to reach them run unwatched.",
      fix: "Campaigns drafts the landing page, emails, texts and ads together for each treatment and promotion. Ads Manager watches spend against booked consults, not clicks, without sending health data to an ad platform. Outreach reaches your referral partners.",
    },
    first_response: {
      leak: "A message lands at 9pm on a Friday and waits until Monday. By then the client has booked with the med spa that answered first.",
      fix: "The AI front desk answers every message in seconds, on text, WhatsApp, web chat, email and social, in your voice. The forms already on your website feed straight in. It answers treatment questions, books on your real calendar and hands off with the full history.",
    },
    nurture: {
      leak: "Clients who are not ready to book today never hear from you again.",
      fix: "Sequences follow up over days and weeks on every channel. The Qualification Agent checks fit with your own questions, on forms and in chat. Reactivation works the lapsed client list instead of letting it go cold.",
    },
    book: {
      leak: "The consult is booked, then missed, and the chair sits empty.",
      fix: "Appointments syncs every booking and sends reminders on the channel the client chose. AI Staff hands your team a written briefing before each consult. The Waiting Room and Telehealth run the visit itself.",
    },
    commit: {
      leak: "The consult happens, the treatment never gets booked. \"Let me think about it\" turns into silence.",
      fix: "Pipeline flags a client who consulted but has not booked, before they go cold. Consent sends forms and aftercare education before the visit. Invoicing sends a payment link for treatments and packages.",
      patient_says: "I love the idea. Now I have to decide, and pay.",
      nostat:
        "No published benchmark we trust yet for consult-to-treatment drop-off in aesthetics. GrowthOS stage timing can produce one.",
    },
    treatment: {
      leak: "A series stalls after the second session, or the client quietly stops coming in.",
      fix: "Treatment Coordinator tracks each client's series and maintenance timing, books the next session in the right window and checks in until it is done. Escalations reach a person with context in minutes.",
      patient_says: "I want to know it's working, and when I'm due next.",
      ideal: "No session in a series is missed, and every escalation reaches a person with context in minutes.",
      metrics: ["Missed session windows", "Escalations resolved", "Clients who stopped mid-series"],
      nostat:
        "No published benchmark we trust yet for mid-series drop-off in aesthetics. GrowthOS stage timing can produce one.",
      features: {
        "Cycle and Treatment Coordinator": {
          name: "Treatment Coordinator",
          description:
            "Timed plans for every series and maintenance schedule, drafted from the clinic's own protocol and started from a pipeline stage.",
        },
      },
    },
    after_cycle: {
      name: "Between treatments",
      leaks: [{ name: "The Faded Result", description: "Packages unused, results faded, client gone quiet" }],
      leak: "Results fade, packages sit half used, and the client books the next touch-up somewhere else.",
      fix: "Keep records the packages, memberships, product credit and gift cards each client holds, reaches out before they expire and when results typically fade, and gives clients a secure link to see what they have and decide what comes next. Every touch is logged.",
      patient_says: "I still have three sessions left. I just never got around to booking.",
      ideal:
        "Every package, membership and credit has an owner and an expiry date, and every client heard from the clinic before results faded.",
      metrics: ["Clients who came back", "Requests from the private link", "Time to reply"],
      nostat:
        "No benchmark we trust yet for how many prepaid sessions go unused. The Keep research log is built to measure it.",
      features: {
        "What each patient has with you": {
          name: "What each client has with you",
          description:
            "Packages, memberships, product credit and gift cards: what each client has and when it renews or expires. Imported, entered by hand, or added when an invoice is paid.",
        },
        "Storage and return outreach": {
          name: "Renewal and return outreach",
          description: "A note before a package or membership expires, and a check-in on the schedule you choose.",
        },
        "A private link for every patient": {
          name: "A private link for every client",
          description:
            "Opened with a date of birth check, it shows what the client has with you. One tap asks your team to talk about using it, and the request lands on the Requests tab.",
        },
        "Results you can publish": {
          description:
            "Clients reached, links opened, requests made and clients who came back, logged touch by touch in a structure built for publication.",
        },
      },
    },
    advocate: {
      leak: "Happy clients are never asked for a review, a referral or a return visit.",
      fix: "Reviews brings your Google reviews into one place with AI-drafted replies and asks for new ones at the right pipeline stage. Referral Accounts tracks and thanks the partners who send you clients.",
      patient_says: "I love how it looks. I'm telling my friends.",
    },
  },

  regenerative: {
    commit: {
      leak: "The consult happens, treatment never starts. Cost and skepticism stall the yes.",
      patient_says: "I want this to work. Now I have to decide, and pay.",
      nostat:
        "No published benchmark we trust yet for consult-to-treatment drop-off in regenerative medicine. GrowthOS stage timing can produce one.",
    },
    treatment: {
      leak: "A phase of the protocol is missed, a follow-up window passes, or the patient quietly stops.",
      fix: "Treatment Coordinator tracks each patient's protocol series, books the next phase in the right window and checks in on how they are doing until it is done. Escalations reach a person with context in minutes.",
      patient_says: "I need to know what happens next, and whether it's working.",
      ideal: "No protocol phase or follow-up window is missed, and every escalation reaches a person with context in minutes.",
      metrics: ["Missed protocol windows", "Escalations resolved", "Mid-protocol discontinuation"],
      nostat: "No published benchmark we trust yet for mid-protocol drop-off. GrowthOS stage timing can produce one.",
      features: {
        "Cycle and Treatment Coordinator": {
          name: "Treatment Coordinator",
          description:
            "Timed plans for every protocol series and follow-up window, drafted from the clinic's own protocol and started from a pipeline stage.",
        },
      },
    },
    after_cycle: {
      name: "Between phases",
      leaks: [{ name: "The Unfinished Protocol", description: "Cells banked, series unfinished, patient gone quiet" }],
      leak: "Banked cells sit unused and treatment series go unfinished while the patient goes quiet.",
      fix: "Keep records the banked cells, treatment series and memberships each patient holds, reaches out before they renew or expire and at the follow-up windows you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged.",
      patient_says: "I still have cells banked. I'm not sure what to do next.",
      ideal:
        "Every banked vial and unfinished series has an owner, a renewal date, and a patient who heard from the clinic this year.",
      metrics: ["Patients who came back", "Requests from the private link", "Time to reply"],
      nostat:
        "No benchmark we trust yet for how many banked cells and prepaid series go unused. The Keep research log is built to measure it.",
      features: {
        "What each patient has with you": {
          description:
            "Banked cells, treatment series and memberships: what each patient has, where it is kept and when it renews or expires. Imported, entered by hand, or added when an invoice is paid.",
        },
        "Storage and return outreach": {
          description:
            "A note before storage renews or a series or membership expires, and a check-in on the schedule you choose.",
        },
      },
    },
  },

  wellness: {
    book: {
      leak: "The first visit is booked, then missed, and nobody follows up.",
    },
    commit: {
      leak: "The consult happens, the program never starts. Cost and time commitment stall the yes.",
      fix: "Pipeline flags a stalled decision before it goes cold. ChartAI requests outside records for you. Consent sends documents and education before the visit. Invoicing sends a payment link for programs and packages.",
      nostat: "No published benchmark we trust yet for consult-to-program drop-off. GrowthOS stage timing can produce one.",
    },
    treatment: {
      leak: "Visits get spaced out, the plan loses momentum, or the patient quietly stops.",
      fix: "Treatment Coordinator tracks each patient's care plan cadence, books the next visit in the right window and checks in until it is done. Escalations reach a person with context in minutes.",
      patient_says: "Life got busy. I want to stay on track.",
      ideal: "No visit in the care plan is missed, and every escalation reaches a person with context in minutes.",
      metrics: ["Missed visit windows", "Escalations resolved", "Patients who stopped mid-plan"],
      nostat: "No published benchmark we trust yet for mid-plan drop-off. GrowthOS stage timing can produce one.",
      features: {
        "Cycle and Treatment Coordinator": {
          name: "Treatment Coordinator",
          description:
            "Timed plans for every care plan and program, drafted from the clinic's own protocol and started from a pipeline stage.",
        },
      },
    },
    after_cycle: {
      name: "Between visits",
      leaks: [{ name: "The Lapsed Plan", description: "Packages unused, membership lapsed, patient gone quiet" }],
      leak: "Packages sit unused and memberships lapse while the patient drifts away.",
      fix: "Keep records the packages, memberships and IV therapy sessions each patient holds, reaches out before they expire and on the check-in schedule you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged.",
      patient_says: "I still have sessions on my package. I keep meaning to book.",
      ideal:
        "Every package and membership has an owner and an expiry date, and every patient heard from the clinic before their plan lapsed.",
      metrics: ["Patients who came back", "Requests from the private link", "Time to reply"],
      nostat:
        "No benchmark we trust yet for how many prepaid sessions go unused. The Keep research log is built to measure it.",
      features: {
        "What each patient has with you": {
          description:
            "Packages, memberships and IV therapy sessions: what each patient has and when it renews or expires. Imported, entered by hand, or added when an invoice is paid.",
        },
        "Storage and return outreach": {
          name: "Renewal and return outreach",
          description: "A note before a package or membership expires, and a check-in on the schedule you choose.",
        },
      },
    },
  },
};

export const FOUNDATION_OVERRIDES: Record<OtherSpecialty, Record<string, FeatureOverride>> = {
  aesthetics: {
    "EHR and CRM integrations": {
      description: "Your EHR, booking system and Salesforce kept in sync, so staff work in one place.",
    },
  },
  regenerative: {
    "EHR and CRM integrations": { description: "Your EHR and Salesforce kept in sync, so staff work in one place." },
  },
  wellness: {
    "EHR and CRM integrations": { description: "Your EHR and Salesforce kept in sync, so staff work in one place." },
  },
};

/** The /map intro. `body` uses {stages}, {leaks} and {features} for the live totals. */
export const MAP_INTRO: Record<Specialty, { h1: string; body: string }> = {
  fertility: {
    h1: "The patient journey, and every place it leaks.",
    body: "Patient leakage rarely happens in one place. It happens in the gaps between stages: the search that never finds you, the inquiry nobody answers, the consult that never becomes a commitment, the embryos that stay in storage while the patient goes quiet. The GrowthOS Map names {stages} stages and {leaks} leaks, and the {features} modules that close them. Your onboarding, your reports and your Leak Map all follow it.",
  },
  aesthetics: {
    h1: "The client journey, and every place it leaks.",
    body: "Client leakage rarely happens in one place. It happens in the gaps between stages: the search that never finds you, the inquiry nobody answers, the consult that never becomes a booked treatment, the package that sits half used while the client books elsewhere. The GrowthOS Map names {stages} stages and {leaks} leaks, and the {features} modules that close them. Your onboarding, your reports and your Leak Map all follow it.",
  },
  regenerative: {
    h1: "The patient journey, and every place it leaks.",
    body: "Patient leakage rarely happens in one place. It happens in the gaps between stages: the search that never finds you, the inquiry nobody answers, the consult that never becomes a treatment start, the banked cells and unfinished series while the patient goes quiet. The GrowthOS Map names {stages} stages and {leaks} leaks, and the {features} modules that close them. Your onboarding, your reports and your Leak Map all follow it.",
  },
  wellness: {
    h1: "The patient journey, and every place it leaks.",
    body: "Patient leakage rarely happens in one place. It happens in the gaps between stages: the search that never finds you, the inquiry nobody answers, the consult that never becomes a started program, the membership that lapses while the patient drifts away. The GrowthOS Map names {stages} stages and {leaks} leaks, and the {features} modules that close them. Your onboarding, your reports and your Leak Map all follow it.",
  },
};
