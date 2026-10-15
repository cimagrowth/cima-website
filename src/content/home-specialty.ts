import { KEEP_COPY } from "@/content/map-copy";
import type { Specialty } from "@/content/specialty";

// Home page copy per specialty. Fertility holds today's strings, moved verbatim
// from the home sections. The live Map data (stage names, leaks, features) is
// specialized separately in src/lib/specialty-map.ts.

export interface HomeCopy {
  hero: { pill: string; h1: string; sub: string; footnote: string };
  /** PlatformProof labels. `conversations` uses {days}. */
  proof: { reply: string; under60: string; conversations: string };
  map: { title: string };
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
  research: { show: boolean };
  team: { keepStage: string; nurture: string; keep: string; reputation: string };
  healthcare: { hipaa: { title: string; body: string }; grief: { title: string; body: string } };
}

const fertility: HomeCopy = {
  hero: {
    pill: "The front-end operating system for fertility and specialty clinics",
    h1: "Your clinic leaks patients at eight stages. GrowthOS closes every one.",
    sub: "From the first search to years after treatment. One system runs your ads, answers every inquiry, keeps patients moving through consult and treatment, and brings them back for the eggs and embryos they already stored.",
    footnote:
      "See where your clinic leaks, benchmarked against the clinics we run. Your report arrives in your inbox in a few minutes.",
  },
  proof: {
    reply: "median first reply to a patient message",
    under60: "of patient messages answered in under 60 seconds",
    conversations: "patient conversations handled in the last {days} days",
  },
  map: { title: "One map, from the first search to the last stored embryo." },
  beyond: {
    side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who froze eggs in 2021 and never came back, or the family with two embryos left in storage. GrowthOS does.",
    showStats: true,
    keepTitle: "Keep. For every egg, embryo and sample still in your tanks.",
    keepBody: KEEP_COPY.body,
    panelCaption: "PATIENT RECORD · KEEP",
    tiles: [
      ["Embryos stored", "[#]"],
      ["Eggs stored", "[#]"],
      ["In storage since", "[DATE]"],
    ],
    rows: [
      { label: "Anniversary check-in", value: "Scheduled", warn: false },
      { label: "Consent renewal", value: "Due in [N] days", warn: true },
      { label: "Patient decision link", value: "Opened", warn: false },
    ],
  },
  research: { show: true },
  team: {
    keepStage: "STAGE 7 · AFTER THE CYCLE",
    nurture: "Follows up across days and weeks, adapting tone to where the patient is emotionally.",
    keep: "Checks in with every patient who has eggs, embryos or samples in storage, for as long as they are stored.",
    reputation: "Asks happy patients for reviews at the right moment and drafts your replies.",
  },
  healthcare: {
    hipaa: { title: "HIPAA and BAA", body: "Patient data handled to clinical standard, with a signed BAA." },
    grief: { title: "Grief-aware", body: "Outreach pauses after a loss, and tone follows the patient." },
  },
};

const OTHER_PROOF: HomeCopy["proof"] = {
  reply: "median first reply to an inbound message",
  under60: "of inbound messages answered in under 60 seconds",
  conversations: "conversations handled in the last {days} days",
};

export const HOME_COPY: Record<Specialty, HomeCopy> = {
  fertility,
  aesthetics: {
    hero: {
      pill: "The front-end operating system for aesthetics and med spa clinics",
      h1: "Your med spa leaks clients at eight stages. GrowthOS closes every one.",
      sub: "From the first search to the next touch-up. One system runs your ads, answers every inquiry, moves clients from consult to booked treatment, and brings them back when results fade and packages sit unused.",
      footnote:
        "See where your med spa leaks, benchmarked against the clinics we run. Your report arrives in your inbox in a few minutes.",
    },
    proof: OTHER_PROOF,
    map: { title: "One map, from the first search to the next rebooking." },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the client who bought a six-session package and stopped after two, or the member whose results faded three months ago. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every package, membership and credit your clients already paid for.",
      keepBody:
        "Keep records the packages, memberships, product credit and gift cards each client holds, reaches out before they expire and when results typically fade, and gives clients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "CLIENT RECORD · KEEP",
      tiles: [
        ["Sessions left", "[#]"],
        ["Membership", "[STATUS]"],
        ["Last treatment", "[DATE]"],
      ],
      rows: [
        { label: "Touch-up check-in", value: "Scheduled", warn: false },
        { label: "Package expiring", value: "Due in [N] days", warn: true },
        { label: "Client link", value: "Opened", warn: false },
      ],
    },
    research: { show: false },
    team: {
      keepStage: "STAGE 7 · BETWEEN TREATMENTS",
      nurture: "Follows up across days and weeks, adapting tone to where the client is in their decision.",
      keep: "Checks in with every client who has sessions, credit or a membership waiting, and brings them back at the right interval.",
      reputation: "Asks happy clients for reviews at the right moment and drafts your replies.",
    },
    healthcare: {
      hipaa: { title: "HIPAA and BAA", body: "Client data handled to clinical standard, with a signed BAA." },
      grief: { title: "Outcome-aware", body: "Never promises a result, and drops the review ask when a client is unhappy." },
    },
  },
  regenerative: {
    hero: {
      pill: "The front-end operating system for regenerative medicine clinics",
      h1: "Your clinic leaks patients at eight stages. GrowthOS closes every one.",
      sub: "From the first search to the last session of the protocol. One system runs your ads, answers every inquiry, moves patients from consult to treatment start, and brings them back for the series, memberships and banked cells they already hold.",
      footnote:
        "See where your clinic leaks, benchmarked against the clinics we run. Your report arrives in your inbox in a few minutes.",
    },
    proof: OTHER_PROOF,
    map: { title: "One map, from the first search to the final follow-up." },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who banked cells two years ago and never came back, or the one who stopped halfway through a series. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every banked vial, series and membership your patients already hold.",
      keepBody:
        "Keep records the banked cells, treatment series and memberships each patient holds, reaches out before they renew or expire and at the follow-up windows you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "PATIENT RECORD · KEEP",
      tiles: [
        ["Vials banked", "[#]"],
        ["Sessions left", "[#]"],
        ["Banked since", "[DATE]"],
      ],
      rows: [
        { label: "Follow-up check-in", value: "Scheduled", warn: false },
        { label: "Storage renewal", value: "Due in [N] days", warn: true },
        { label: "Patient link", value: "Opened", warn: false },
      ],
    },
    research: { show: false },
    team: {
      ...fertility.team,
      keepStage: "STAGE 7 · BETWEEN PHASES",
      keep: "Checks in with every patient who has cells banked, sessions left or a membership running, for as long as they hold them.",
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
      h1: "Your practice leaks patients at eight stages. GrowthOS closes every one.",
      sub: "From the first search to the next visit. One system runs your ads, answers every inquiry, moves patients from first visit to a started program, and brings them back for the packages and memberships they already have.",
      footnote:
        "See where your practice leaks, benchmarked against the clinics we run. Your report arrives in your inbox in a few minutes.",
    },
    proof: OTHER_PROOF,
    map: { title: "One map, from the first search to the next visit." },
    beyond: {
      side: "A chatbot can answer a lead. A CRM can hold a record. Neither notices the patient who bought a ten-session IV package and used three, or the member who stopped coming in after the holidays. GrowthOS does.",
      showStats: false,
      keepTitle: "Keep. For every package, membership and session your patients already paid for.",
      keepBody:
        "Keep records the packages, memberships and IV therapy sessions each patient holds, reaches out before they expire and on the check-in schedule you choose, and gives patients a secure link to see what they have and decide what comes next. Every touch is logged, so you can measure who returns.",
      panelCaption: "PATIENT RECORD · KEEP",
      tiles: [
        ["Sessions left", "[#]"],
        ["Membership", "[STATUS]"],
        ["Last visit", "[DATE]"],
      ],
      rows: [
        { label: "Next visit check-in", value: "Scheduled", warn: false },
        { label: "Package expiring", value: "Due in [N] days", warn: true },
        { label: "Patient link", value: "Opened", warn: false },
      ],
    },
    research: { show: false },
    team: {
      ...fertility.team,
      keepStage: "STAGE 7 · BETWEEN VISITS",
      keep: "Checks in with every patient who has sessions, a package or a membership waiting, and brings them back on their plan.",
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
    title: "Where does your clinic leak?",
    body: "Get your free Leak Map: where your clinic loses patients, scored against the clinics we run, your 90-day recovery number, and the fixes in order. Your report arrives in your inbox in a few minutes.",
  },
  aesthetics: {
    title: "Where does your med spa leak?",
    body: "Get your free Leak Map: where your med spa loses clients, scored against the clinics we run, your 90-day recovery number, and the fixes in order. Your report arrives in your inbox in a few minutes.",
  },
  // The fertility strings are already neutral.
  regenerative: {
    title: "Where does your clinic leak?",
    body: "Get your free Leak Map: where your clinic loses patients, scored against the clinics we run, your 90-day recovery number, and the fixes in order. Your report arrives in your inbox in a few minutes.",
  },
  wellness: {
    title: "Where does your practice leak?",
    body: "Get your free Leak Map: where your practice loses patients, scored against the clinics we run, your 90-day recovery number, and the fixes in order. Your report arrives in your inbox in a few minutes.",
  },
};
