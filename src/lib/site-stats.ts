// The approved public stats, each with the source line rendered directly under
// it. Every page and component reads display values from here, so a figure
// never differs between pages or drifts with the live feed.

export interface SiteStat {
  /** Exact display value. */
  value: string;
  /** Source line, shown directly under the stat. */
  source: string;
}

export const SITE_STATS = {
  firstReply: {
    value: "9 sec",
    source:
      "Live GrowthOS data, active clinic accounts, last 90 days. Measured on text, WhatsApp, web chat and social messages.",
  },
  /** Fertility pages only. Always "average", "paid treatment", "a multi-location fertility network". */
  daysToPaidTreatment: {
    value: "120 to 32 days",
    source:
      "Average days from first contact to treatment sold (payment received), one multi-location fertility network using GrowthOS.",
  },
  clinicsLive: {
    value: "100+ in 5 countries",
    source: "Live GrowthOS data, active clinic accounts.",
  },
  conversations: {
    value: "36,200+ in the last 90 days",
    source: "Live GrowthOS data, active clinic accounts, last 90 days.",
  },
  missedAppointments: {
    value: "34% relative drop with reminders",
    source: "Hasvold and Wootton, J Telemed Telecare, 2011.",
  },
  stopPostponement: {
    value: "39% of reasons",
    source: "Gameiro et al., Hum Reprod Update, 2012.",
  },
  stopClinicProblems: {
    value: "19% of reasons",
    source: "Gameiro et al., Hum Reprod Update, 2012.",
  },
  noLaterFrozenTransfer: {
    value: "52.5%",
    source: "Christianson et al., F&S Reports, 2020.",
  },
  eggFreezersReturning: {
    value: "5.7% within 5 to 7 years",
    source: "Lee et al., Am J Obstet Gynecol, 2025.",
  },
  storedEmbryoConflict: {
    value: "39% report high conflict",
    source: "Lyerly et al., Human Reproduction, 2011.",
  },
} as const satisfies Record<string, SiteStat>;

/** Numbers behind the platform figures, for places that format them. */
export const SITE_NUMBERS = {
  medianFirstReplySeconds: 9,
  clinicsActive: 100,
  countries: 5,
  patientConversations: 36200,
  windowDays: 90,
} as const;

/** Short values for stat bars ("100+", "36,200+"). */
export const SITE_SHORT = {
  clinics: "100+",
  conversations: "36,200+",
} as const;
