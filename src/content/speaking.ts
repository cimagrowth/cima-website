// Copy and data for /speaking. Edit this file to change the speaker page.
// Rules: no em dashes, no statistics, no client names, no product pitch.

export const SPEAKER = {
  name: "Brandon Hensinger",
  title: "Founder and CEO, Cima Growth Solutions",
  headshot: "/brandon-hensinger.jpg", // 2000 x 1599, already in /public
  headshotAlt: "Brandon Hensinger, founder and CEO of Cima Growth Solutions",
  oneLiner:
    "Brandon shows clinic leaders where patients leak out of the journey, from the first search to long after treatment, and how to build a front office that keeps them.",
  shortBio:
    "Brandon Hensinger is the founder and CEO of Cima Growth Solutions and the builder of GrowthOS, the AI front office used by fertility, aesthetics, regenerative medicine and wellness clinics. He has spent more than 15 years in the fertility industry, began in international sales and partnerships, and speaks five languages.",
  longBio:
    "Brandon Hensinger has spent more than 15 years in the fertility industry, starting in international sales and partnerships before founding Cima Growth Solutions. Cima builds GrowthOS, a platform that runs the front end of a clinic: answering every inquiry, screening and booking patients, following up when they go quiet, and measuring every step from first search to long after treatment. GrowthOS serves fertility, aesthetics and med spa, regenerative medicine and wellness clinics. Brandon speaks five languages and works with clinics across the Americas, Europe and Asia. His current research looks at where patients leak out of the clinic journey and what it costs.",
  languagesNote: "Presents in English. Speaks five languages.",
  email: "brandon@cimagrowth.com",
};

export type Talk = { id: string; title: string; vertical: string; formats: string; summary: string; takeaways: string[] };
export const TALKS: Talk[] = [
  {
    id: "leaking-clinic",
    title: "The Leaking Clinic",
    vertical: "Fertility and IVF",
    formats: "Keynote or breakout, 20 to 45 minutes",
    summary:
      "The lab got an upgrade. The front door did not. A walk through the eight stages of the fertility patient journey, the published evidence on where patients drop out at each one, and the five jobs a front-end operating system has to do: respond, remember, sequence, escalate and measure. Educational and vendor neutral.",
    takeaways: [
      "Where your patients leave, stage by stage",
      "Eight numbers a clinic should be able to produce in five minutes",
      "A 30-day plan to close the biggest leak",
    ],
  },
  {
    id: "leaking-practice-aesthetics",
    title: "The Leaking Practice: aesthetics and med spa",
    vertical: "Aesthetics and med spa",
    formats: "Keynote, breakout or hands-on workshop",
    summary:
      "Practices spend heavily to create inquiries, then lose them quietly: the late reply, the consult that never books, the no-show and the patient who never returns for a second treatment. Attendees map their own journey and leave with a follow-up plan.",
    takeaways: ["Find the two stages that cost you the most", "Know your real speed to lead, nights and weekends included", "Five numbers to track every month"],
  },
  {
    id: "leaking-practice-regen",
    title: "The Leaking Practice: regenerative medicine",
    vertical: "Regenerative medicine",
    formats: "Keynote, breakout or panel",
    summary:
      "Cash-pay patients research for weeks and decide fast. The same leak framework applied to regenerative and longevity practices: education before the consult, follow-up after it, and keeping patients through a multi-visit protocol.",
    takeaways: ["Where cash-pay patients drop out", "Follow-up that respects a long decision", "Measuring the full protocol, not just the first visit"],
  },
  {
    id: "research",
    title: "Research in progress: measuring the patient journey",
    vertical: "All three",
    formats: "Scientific session, abstract or panel",
    summary:
      "Brandon's research program measures the patient journey inside clinics running GrowthOS: where and when patients drop out, which front-office steps AI handles as well as people, and what happens to patients after treatment. Findings will be presented as they are published.",
    takeaways: ["How the data is gathered", "What clinics can measure themselves today"],
  },
];

export const PANEL_TOPICS = [
  "AI in the clinic front office",
  "Patient experience before the first consult",
  "Measuring the patient journey",
  "Building a clinic patients do not leave",
];

export type Appearance = { event: string; date: string; dateLabel: string; role: string; place?: string; url?: string };
// Newest first. Upcoming = date >= today, computed at render.
export const APPEARANCES: Appearance[] = [
  { event: "i3, International IVF Initiative", date: "2026-11-10", dateLabel: "November 10, 2026", role: "Talk: The Leaking Clinic" },
  { event: "MRSi 2026, Midwest Reproductive Symposium International", date: "2026-07-26", dateLabel: "July 26, 2026", role: "Panel: speed and patient leakage", place: "The Drake Hotel, Chicago", url: "https://mrsimeeting.org" },
];

export const FORMATS = ["Keynote", "Breakout or workshop", "Panel", "Podcast or interview", "Webinar", "Internal team session"];
export const FORMATS_NOTE = "In person or virtual. Travel from the US East Coast.";

// Inquiry form options. These strings are stored on the GrowthOS contact and
// read by the Executive Assistant agent: do not reword them.
export const SPEAKING_FORMAT_OPTIONS = [...FORMATS, "Other"];
export const SPEAKING_TOPIC_OPTIONS = [
  "The Leaking Clinic (fertility)",
  "The Leaking Practice (aesthetics and med spa)",
  "The Leaking Practice (regenerative medicine)",
  "Patient journey research",
  "AI in the clinic front office",
  "Not sure yet",
];

/** Talk id (used in ?topic=) to the topic option it pre-selects. */
export const TOPIC_BY_TALK_ID: Record<string, string> = {
  "leaking-clinic": "The Leaking Clinic (fertility)",
  "leaking-practice-aesthetics": "The Leaking Practice (aesthetics and med spa)",
  "leaking-practice-regen": "The Leaking Practice (regenerative medicine)",
  research: "Patient journey research",
};
