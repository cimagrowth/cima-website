import { KEEP_COPY } from "@/content/map-copy";
import type { Specialty } from "@/content/specialty";

// Home page copy per specialty. Fertility holds today's strings, moved verbatim
// from the home sections. The live Map data (stage names, leaks, features) is
// specialized separately in src/lib/specialty-map.ts.

export interface StoryCard {
  title: string;
  body: string;
  /** Stage page the card links to. */
  href: string;
}

export interface HomeCopy {
  hero: { pill: string; h1: string; sub: string };
  /** PlatformProof labels. `paidTreatment` shows the fertility-only 120 to 32 figure. */
  proof: { paidTreatment: boolean; reply: string; clinics: string; conversations: string };
  /** The problem, what GrowthOS does, and the result. */
  story: {
    problem: { title: string; body: string };
    does: { title: string; lead: string; cards: StoryCard[]; ehr: string };
    result: { title: string; body: string; showFertilityResult: boolean };
  };
  /** Keep record panel, also used on /keep. */
  beyond: {
    side: string;
    /** Show the after_cycle research stat cards. */
    showStats: boolean;
    keepTitle: string;
    keepBody: string;
    panelCaption: string;
    tiles: [string, string][];
    rows: { label: string; value: string; warn: boolean }[];
  };
  healthcare: { hipaa: { title: string; body: string }; grief: { title: string; body: string } };
}

const EHR_LINE = "And it all connects to your EHR and practice systems, so nothing is typed twice.";

/** The six "what GrowthOS does" cards. Only cards 4 to 6 vary by specialty. */
const storyCards = (person: string, ready: string, track: string, back: string): StoryCard[] => [
  {
    title: "They reach out",
    body: "AI trained on your clinic answers every text, call, WhatsApp, chat and form in seconds, in your voice, 24/7.",
    href: "/map/first-response",
  },
  {
    title: "They get qualified",
    body: `It asks your screening questions, scores fit and books qualified ${person} on your real calendar.`,
    href: "/map/nurture-and-qualify",
  },
  {
    title: "They don't fall off",
    body: `Follow-up runs at every pipeline stage, so a stalled ${person.replace(/s$/, "")} gets a nudge before they go cold.`,
    href: "/map/book-and-show-up",
  },
  { title: "They get ready", body: ready, href: "/map/consult-to-commitment" },
  { title: "They stay on track", body: track, href: "/map/in-treatment" },
  { title: "They come back and refer", body: back, href: "/map/advocate-and-return" },
];

const PROBLEM_TITLE = "When clinics get busy, patients stop hearing from you.";
const DOES_TITLE = "GrowthOS automates the manual work that falls through the cracks.";
const DOES_LEAD =
  "One platform covers every step a patient takes with your clinic. Your team sets the rules and steps in whenever they want.";
const RESULT_TITLE = "More patients. More revenue. In less time.";
const RESULT_BODY =
  "When every patient gets an answer and a next step, more of them reach treatment, and they get there faster.";

const PROOF: HomeCopy["proof"] = {
  paidTreatment: false,
  reply: "Median first reply to a patient message, day or night",
  clinics: "Clinic accounts live in 5 countries",
  conversations: "Patient conversations handled in the last 90 days",
};

const fertility: HomeCopy = {
  hero: {
    pill: "The front-end operating system for fertility clinics",
    h1: "Every patient answered, followed up and moved to treatment. Automatically.",
    sub: "GrowthOS automates the entire patient journey outside the lab, from the first message to paid treatment and beyond. AI trained on your clinic answers in seconds, qualifies every inquiry and follows up at every stage, so no patient slips through when your team gets busy.",
  },
  proof: { ...PROOF, paidTreatment: true },
  story: {
    problem: {
      title: PROBLEM_TITLE,
      body: "It is the first thing to break. The inquiry that came in at 9pm waits until morning. The patient who wasn't ready never gets a second message. Consents sit unsigned, a cycle-timed test gets missed, and nobody asks the happy patient for a review. None of it is medicine. All of it costs you patients.",
    },
    does: {
      title: DOES_TITLE,
      lead: DOES_LEAD,
      cards: storyCards(
        "patients",
        "Consents, education videos, records requests and payment links go out and get tracked to done.",
        "Cycle Coordinator books cycle-timed tests in the right window and checks in until they're done.",
        "Review requests, storage check-ins for eggs and embryos, and past-patient updates go out on schedule.",
      ),
      ehr: EHR_LINE,
    },
    result: { title: RESULT_TITLE, body: RESULT_BODY, showFertilityResult: true },
  },
  beyond: {
    side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who froze eggs in 2021 and never came back, or the family with two embryos left in storage. GrowthOS does.",
    showStats: true,
    keepTitle: "Turn the eggs and embryos in your tanks into patients who come back.",
    keepBody: KEEP_COPY.body,
    panelCaption: "PATIENT RECORD · KEEP",
    tiles: [
      ["Embryos stored", "3"],
      ["Eggs stored", "0"],
      ["In storage since", "March 2022"],
    ],
    rows: [
      { label: "Anniversary check-in", value: "Scheduled", warn: false },
      { label: "Consent renewal", value: "Due in 21 days", warn: true },
      { label: "Patient decision link", value: "Opened", warn: false },
    ],
  },
  healthcare: {
    hipaa: { title: "HIPAA and BAA", body: "Patient data handled to clinical standard, with a signed BAA." },
    grief: { title: "Grief-aware", body: "Automated messages pause after a loss, and tone follows the patient." },
  },
};

export const HOME_COPY: Record<Specialty, HomeCopy> = {
  fertility,
  aesthetics: {
    hero: {
      pill: "The front-end operating system for aesthetics and med spa clinics",
      h1: "Every client answered, followed up and booked. Automatically.",
      sub: "GrowthOS automates the entire client journey outside the treatment room, from the first message to booked treatment and the next visit. AI trained on your med spa answers in seconds, qualifies every inquiry and follows up at every stage, so no client slips through when your team gets busy.",
    },
    proof: {
      ...PROOF,
      reply: "Median first reply to a client message, day or night",
      conversations: "Client conversations handled in the last 90 days",
    },
    story: {
      problem: {
        title: "When med spas get busy, clients stop hearing from you.",
        body: "It is the first thing to break. The inquiry that came in at 9pm waits until morning. The client who wasn't ready never gets a second message. Consents sit unsigned, a touch-up window gets missed, and nobody asks the happy client for a review. None of it is the treatment. All of it costs you clients.",
      },
      does: {
        title: DOES_TITLE,
        lead: "One platform covers every step a client takes with your med spa. Your team sets the rules and steps in whenever they want.",
        cards: storyCards(
          "clients",
          "Consents, education videos and payment links go out and get tracked to done.",
          "Treatment Coordinator books the next session in the right window and checks in until the plan is done.",
          "Review requests, reminders before packages and memberships expire, and past-client updates go out on schedule.",
        ),
        ehr: EHR_LINE,
      },
      result: {
        title: "More clients. More revenue. In less time.",
        body: "When every client gets an answer and a next step, more of them book treatment, and they get there faster.",
        showFertilityResult: false,
      },
    },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the client who bought a six-session package and stopped after two, or the member whose results faded three months ago. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every package, membership and credit your clients already paid for.",
      keepBody:
        "Keep records the packages, memberships, product credit and gift cards each client holds, sends scheduled reminders before they expire and when results typically fade, and gives clients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "CLIENT RECORD · KEEP",
      tiles: [
        ["Sessions left", "4"],
        ["Membership", "Active"],
        ["Last treatment", "March 2022"],
      ],
      rows: [
        { label: "Touch-up check-in", value: "Scheduled", warn: false },
        { label: "Package expiring", value: "Due in 21 days", warn: true },
        { label: "Client link", value: "Opened", warn: false },
      ],
    },
    healthcare: {
      hipaa: { title: "HIPAA and BAA", body: "Client data handled to clinical standard, with a signed BAA." },
      grief: { title: "Outcome-aware", body: "Never promises a result, and drops the review ask when a client is unhappy." },
    },
  },
  regenerative: {
    hero: {
      pill: "The front-end operating system for regenerative medicine clinics",
      h1: "Every patient answered, followed up and moved to treatment. Automatically.",
      sub: "GrowthOS automates the entire patient journey outside the treatment room, from the first message to paid treatment and the final follow-up. AI trained on your clinic answers in seconds, qualifies every inquiry and follows up at every stage, so no patient slips through when your team gets busy.",
    },
    proof: PROOF,
    story: {
      problem: {
        title: PROBLEM_TITLE,
        body: "It is the first thing to break. The inquiry that came in at 9pm waits until morning. The patient who wasn't ready never gets a second message. Consents sit unsigned, the next phase of a protocol gets missed, and nobody asks the happy patient for a review. None of it is medicine. All of it costs you patients.",
      },
      does: {
        title: DOES_TITLE,
        lead: DOES_LEAD,
        cards: storyCards(
          "patients",
          "Consents, education videos, records requests and payment links go out and get tracked to done.",
          "Treatment Coordinator books the next phase of each protocol in the right window and checks in until it is done.",
          "Review requests, check-ins about banked cells and unfinished series, and past-patient updates go out on schedule.",
        ),
        ehr: EHR_LINE,
      },
      result: { title: RESULT_TITLE, body: RESULT_BODY, showFertilityResult: false },
    },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who banked cells two years ago and never came back, or the one who stopped halfway through a series. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every banked vial, series and membership your patients already hold.",
      keepBody:
        "Keep records the banked cells, treatment series and memberships each patient holds, sends scheduled reminders before they renew or expire and at the follow-up windows you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "PATIENT RECORD · KEEP",
      tiles: [
        ["Vials banked", "2"],
        ["Sessions left", "3"],
        ["Banked since", "March 2022"],
      ],
      rows: [
        { label: "Follow-up check-in", value: "Scheduled", warn: false },
        { label: "Storage renewal", value: "Due in 21 days", warn: true },
        { label: "Patient link", value: "Opened", warn: false },
      ],
    },
    healthcare: {
      hipaa: fertility.healthcare.hipaa,
      grief: {
        title: "Evidence-aware",
        body: "Never promises a cure or a result, and keeps claims within what your evidence supports.",
      },
    },
  },
  wellness: {
    hero: {
      pill: "The front-end operating system for wellness and integrative clinics",
      h1: "Every patient answered, followed up and booked. Automatically.",
      sub: "GrowthOS automates the entire patient journey outside the treatment room, from the first message to a started program and the next visit. AI trained on your practice answers in seconds, qualifies every inquiry and follows up at every stage, so no patient slips through when your team gets busy.",
    },
    proof: PROOF,
    story: {
      problem: {
        title: "When practices get busy, patients stop hearing from you.",
        body: "It is the first thing to break. The inquiry that came in at 9pm waits until morning. The patient who wasn't ready never gets a second message. Intake forms sit unsigned, a follow-up visit gets missed, and nobody asks the happy patient for a review. None of it is medicine. All of it costs you patients.",
      },
      does: {
        title: DOES_TITLE,
        lead: "One platform covers every step a patient takes with your practice. Your team sets the rules and steps in whenever they want.",
        cards: storyCards(
          "patients",
          "Consents, education videos, records requests and payment links go out and get tracked to done.",
          "Treatment Coordinator books the next visit on each care plan in the right window and checks in until it is done.",
          "Review requests, reminders before packages and memberships expire, and past-patient updates go out on schedule.",
        ),
        ehr: EHR_LINE,
      },
      result: { title: RESULT_TITLE, body: RESULT_BODY, showFertilityResult: false },
    },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who bought a ten-session IV package and used three, or the member who stopped coming in after the holidays. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every package, membership and session your patients already paid for.",
      keepBody:
        "Keep records the packages, memberships and IV therapy sessions each patient holds, sends scheduled reminders before they expire and on the check-in schedule you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "PATIENT RECORD · KEEP",
      tiles: [
        ["Sessions left", "7"],
        ["Membership", "Active"],
        ["Last visit", "March 2022"],
      ],
      rows: [
        { label: "Next visit check-in", value: "Scheduled", warn: false },
        { label: "Package expiring", value: "Due in 21 days", warn: true },
        { label: "Patient link", value: "Opened", warn: false },
      ],
    },
    healthcare: {
      hipaa: fertility.healthcare.hipaa,
      grief: { title: "Outcome-aware", body: "Never promises a health outcome, and tone follows the patient." },
    },
  },
};

/** The Leak Map call to action, used on every page that shows it. */
export const LEAK_CTA: Record<Specialty, { title: string; body: string }> = {
  fertility: {
    title: "Find out where your clinic is losing patients.",
    body: "Your free Leak Map shows where patients drop off, benchmarked against clinics on GrowthOS, and what it is worth to fix. It lands in your inbox in a few minutes.",
  },
  aesthetics: {
    title: "Find out where your med spa is losing clients.",
    body: "Your free Leak Map shows where clients drop off, benchmarked against clinics on GrowthOS, and what it is worth to fix. It lands in your inbox in a few minutes.",
  },
  // The fertility strings are already neutral.
  regenerative: {
    title: "Find out where your clinic is losing patients.",
    body: "Your free Leak Map shows where patients drop off, benchmarked against clinics on GrowthOS, and what it is worth to fix. It lands in your inbox in a few minutes.",
  },
  wellness: {
    title: "Find out where your practice is losing patients.",
    body: "Your free Leak Map shows where patients drop off, benchmarked against clinics on GrowthOS, and what it is worth to fix. It lands in your inbox in a few minutes.",
  },
};
