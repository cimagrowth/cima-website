import { HOME_COPY } from "@/content/home-specialty";
import { KEEP_COPY } from "@/content/map-copy";
import { CONSENT_FAQS } from "@/lib/consent-faqs";
import type { Specialty } from "@/content/specialty";

// Per-specialty copy for /keep, /consent, /ai-agent, /ads and form
// placeholders. Fertility entries are today's strings, verbatim.

export interface KeepPageCopy {
  h1: string;
  body: string;
  featuresTitle: string;
  ctaTitle: string;
  ctaBody: string;
}

export const KEEP_PAGE: Record<Specialty, KeepPageCopy> = {
  fertility: {
    h1: "Keep. For every egg, embryo and sample still in your tanks.",
    body: KEEP_COPY.body,
    featuresTitle: "A ledger, a voice and a record for every stored specimen.",
    ctaTitle: "See Keep on your own storage list.",
    ctaBody:
      "Keep is included in every plan. Book a demo and we will walk through how it syncs with your lab system and what your patients would see.",
  },
  aesthetics: {
    h1: "Keep. For every package, membership and credit your clients already paid for.",
    body: HOME_COPY.aesthetics.beyond.keepBody,
    featuresTitle: "A ledger, a voice and a record for every package and membership.",
    ctaTitle: "See Keep on your own client list.",
    ctaBody:
      "Keep is included in every plan. Book a demo and we will walk through how it reads the packages and memberships you already sell, and what your clients would see.",
  },
  regenerative: {
    h1: "Keep. For every banked vial, series and membership your patients already hold.",
    body: HOME_COPY.regenerative.beyond.keepBody,
    featuresTitle: "A ledger, a voice and a record for every banked vial and series.",
    ctaTitle: "See Keep on your own patient list.",
    ctaBody:
      "Keep is included in every plan. Book a demo and we will walk through how it reads your banked cells, series and memberships, and what your patients would see.",
  },
  wellness: {
    h1: "Keep. For every package, membership and session your patients already paid for.",
    body: HOME_COPY.wellness.beyond.keepBody,
    featuresTitle: "A ledger, a voice and a record for every package and membership.",
    ctaTitle: "See Keep on your own patient list.",
    ctaBody:
      "Keep is included in every plan. Book a demo and we will walk through how it reads the packages and memberships you already sell, and what your patients would see.",
  },
};

export interface ConsentPageCopy {
  /** "What is included" cards. */
  cards: { title: string; items: string[] }[];
  /** First bullet of the education framework. */
  education: string;
  /** Pipeline mock clinic name. */
  clinic: string;
  signedBy: string;
  document: string;
  educationRow: string;
  comprehensionRow: string;
  /** Visible answer to the first FAQ. */
  faqVideos: string;
}

const AESTHETICS_CARD = {
  title: "Aesthetics and med spa",
  items: [
    "16 documents covering neurotoxin, filler, laser, peels, microneedling, and body contouring",
    "Photograph and media release with five separately granted permissions",
    "Off-label use disclosure and aftercare acknowledgment",
  ],
};

export const CONSENT_PAGE: Record<Specialty, ConsentPageCopy> = {
  fertility: {
    cards: [
      {
        title: "Fertility",
        items: [
          "18 consent documents covering intake through embryo transfer",
          "Packet presets mapped to each stage: intake, financial, baseline, IVF cycle, retrieval, transfer",
          "Multi-party signing for partner and witness, in order",
          "Embryo disposition directive with all ten circumstances addressed",
        ],
      },
      AESTHETICS_CARD,
    ],
    education:
      "15 pre-built fertility education modules with topics, running order, and stage mapping already set",
    clinic: "Northlake Fertility",
    signedBy: "Emily Carter · Patient",
    document: "IVF Treatment Consent · v1.0",
    educationRow: "15 of 15 modules acknowledged",
    comprehensionRow: "15 of 15 answered correctly",
    faqVideos: CONSENT_FAQS[0].answer,
  },
  aesthetics: {
    cards: [AESTHETICS_CARD],
    education:
      "An education framework for every treatment: topics, running order and stage mapping you set, then your own video in each module",
    clinic: "Northlake Aesthetics",
    signedBy: "Emily Carter · Client",
    document: "Dermal Filler Treatment Consent · v1.0",
    educationRow: "4 of 4 modules acknowledged",
    comprehensionRow: "4 of 4 answered correctly",
    faqVideos:
      "You set the topics and order for each treatment and add a comprehension question to each module. You upload the video for each one, which means clients hear it from your own team rather than from stock footage recorded for another practice. If you would rather not film, ask us about production.",
  },
  regenerative: {
    cards: [
      {
        title: "Regenerative medicine",
        items: [
          "PRP, orthobiologic and cell-based procedure consents",
          "An outcomes and follow-up acknowledgment, so expectations are on record before treatment",
          "The general set alongside: consent to care, HIPAA authorization, telehealth and financial responsibility",
        ],
      },
    ],
    education:
      "An education framework for every protocol: topics, running order and stage mapping you set, then your own video in each module",
    clinic: "Northlake Regenerative",
    signedBy: "Emily Carter · Patient",
    document: "Platelet-Rich Plasma (PRP) Treatment Consent · v1.0",
    educationRow: "4 of 4 modules acknowledged",
    comprehensionRow: "4 of 4 answered correctly",
    faqVideos:
      "You set the topics and order for each protocol and add a comprehension question to each module. You upload the video for each one, which means patients hear it from your clinicians rather than from stock footage recorded for another practice. If you would rather not film, ask us about production.",
  },
  wellness: {
    cards: [
      {
        title: "Wellness and integrative",
        items: [
          "Consent to care, HIPAA authorization and notice of privacy practices",
          "Telehealth consent, financial responsibility and email and SMS communications consent",
          "Add your own program and IV therapy consents, and they sign the same way",
        ],
      },
    ],
    education:
      "An education framework for every program: topics, running order and stage mapping you set, then your own video in each module",
    clinic: "Northlake Wellness",
    signedBy: "Emily Carter · Patient",
    document: "Patient Consent to Care · v1.0",
    educationRow: "4 of 4 modules acknowledged",
    comprehensionRow: "4 of 4 answered correctly",
    faqVideos:
      "You set the topics and order for each program and add a comprehension question to each module. You upload the video for each one, which means patients hear it from your clinicians rather than from stock footage recorded for another practice. If you would rather not film, ask us about production.",
  },
};

/** The "The GrowthOS AI front desk:" comparison paragraph on /ai-agent. */
export const AI_AGENT_EXAMPLE: Record<Specialty, string> = {
  fertility:
    "Reads the emotional context of every message. Knows that a patient asking about egg freezing at 11 PM is probably anxious and needs reassurance, not a pricing sheet. Nurtures across days or weeks. Then hands off with the complete conversation history.",
  aesthetics:
    "Reads the emotional context of every message. Knows that a client asking about filler at 11 PM wants a warm, clear answer about results and downtime, not a pricing sheet. Nurtures across days or weeks. Then hands off with the complete conversation history.",
  regenerative:
    "Reads the emotional context of every message. Knows that a patient asking about PRP for a knee at 11 PM is weighing cost and doubt, and needs credible answers, not a pricing sheet. Nurtures across days or weeks. Then hands off with the complete conversation history.",
  wellness:
    "Reads the emotional context of every message. Knows that a patient asking about hormone therapy at 11 PM wants to feel understood, not handed a pricing sheet. Nurtures across days or weeks. Then hands off with the complete conversation history.",
};

/** /ads: the first pain point and the optimizer log's "cut" entry. */
export const ADS_PAGE: Record<Specialty, { painPoint: string; cutTitle: string }> = {
  fertility: {
    painPoint:
      "Generic ad tools don't understand fertility compliance, healthcare keyword restrictions, or why your landing page needs to say different things to an egg freezing patient vs. an IUI patient",
    cutTitle: "Budget rule applied: PMAX · IVF · Bay Area",
  },
  aesthetics: {
    painPoint:
      "Generic ad tools don't understand healthcare ad rules, med spa keyword restrictions, or why your landing page needs to say different things to a first-time neurotoxin client vs. a laser package client",
    cutTitle: "Budget rule applied: PMAX · Filler · Bay Area",
  },
  regenerative: {
    painPoint:
      "Generic ad tools don't understand healthcare ad rules, regenerative medicine keyword restrictions, or why your landing page needs to say different things to a PRP joint patient vs. a sports medicine patient",
    cutTitle: "Budget rule applied: PMAX · PRP · Bay Area",
  },
  wellness: {
    painPoint:
      "Generic ad tools don't understand healthcare ad rules, wellness keyword restrictions, or why your landing page needs to say different things to a hormone therapy patient vs. an IV therapy patient",
    cutTitle: "Budget rule applied: PMAX · IV Therapy · Bay Area",
  },
};

/** Clinic name placeholders in forms. */
export const PLACEHOLDERS: Record<Specialty, { audit: string; demoChat: string; checkout: string }> = {
  fertility: { audit: "Bay Area Fertility", demoChat: "Sunrise Fertility Clinic", checkout: "Bright Fertility Clinic" },
  aesthetics: { audit: "Bay Area Med Spa", demoChat: "Sunrise Med Spa", checkout: "Bright Aesthetics" },
  regenerative: { audit: "Bay Area Regenerative", demoChat: "Sunrise Regenerative Clinic", checkout: "Bright Regenerative" },
  wellness: { audit: "Bay Area Wellness", demoChat: "Sunrise Wellness", checkout: "Bright Wellness" },
};

/** The value each form submits for a specialty. Submitted values never change. */
export const FORM_SPECIALTY_VALUES: Record<
  "growth" | "audit" | "demo" | "demoChat" | "adsIntake",
  Record<Specialty, string>
> = {
  growth: { fertility: "fertility", aesthetics: "aesthetics", regenerative: "regenerative", wellness: "wellness" },
  audit: {
    fertility: "Fertility",
    aesthetics: "Aesthetics / Med Spa",
    regenerative: "Regenerative",
    wellness: "IV & Wellness",
  },
  demo: {
    fertility: "fertility",
    aesthetics: "aesthetics",
    regenerative: "regenerative_medicine",
    wellness: "wellness",
  },
  demoChat: { fertility: "fertility", aesthetics: "med_spa", regenerative: "regenerative", wellness: "other" },
  adsIntake: {
    fertility: "Fertility/IVF",
    aesthetics: "Aesthetics/Med Spa",
    regenerative: "Regenerative Medicine",
    wellness: "Wellness",
  },
};

/**
 * General lines on /consent, /ai-agent and /ads that name fertility or use
 * "cycle" in its everyday sense. Fertility visitors keep the original text;
 * the other specialties see the swap. Keyed by the exact original string.
 */
export const GENERAL_LINE_SWAPS: Record<string, string> = {
  "Enterprise sales cycle to get started": "Enterprise sales process to get started",
  "Pre-loaded with fertility, med spa, aesthetic, regenerative, and wellness conversation frameworks. Then fine-tuned on YOUR clinic's specific services, policies, and voice.":
    "Pre-loaded with med spa, aesthetic, regenerative, and wellness conversation frameworks. Then fine-tuned on YOUR clinic's specific services, policies, and voice.",
  "Specialty-specific copy for fertility, aesthetics, wellness, and regenerative services. Written to convert patients, not impressions.":
    "Specialty-specific copy for aesthetics, wellness, and regenerative services. Written to convert patients, not impressions.",
  "Budget changes are capped at 25% per cycle. Campaigns are never deleted, only paused. And the system waits 14 full days before making its first move, so Google's ML has time to learn.":
    "Budget changes are capped at 25% per optimization run. Campaigns are never deleted, only paused. And the system waits 14 full days before making its first move, so Google's ML has time to learn.",
  "Fertility/IVF, aesthetics/med spa, wellness, regenerative medicine, hormone therapy, and more.":
    "Aesthetics/med spa, wellness, regenerative medicine, hormone therapy, and more.",
};
