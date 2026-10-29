import type { StageKey } from "@/lib/growthos-map";

// Editorial copy for each stage of the GrowthOS Map (Appendix A of the rebuild
// spec). Written to match get_public_platform_map; stage names, leak names,
// features and stats always come from the RPC, not from here.
export const STAGE_COPY: Record<StageKey, { leak: string; fix: string }> = {
  get_found: {
    leak: "You never show up at the search. The right patients never find you, and the ads meant to reach them run unwatched.",
    fix: "Campaigns drafts the landing page, ad copy for your own ad accounts, and follow-up messages for people who inquire, for your team to review. Ads Manager connects your clinic's own Google and Meta ad accounts and measures spend against booked consults, not clicks, without sending health data to an ad platform. Referral Partners tracks the referring doctors and partner practices your team already works with.",
  },
  first_response: {
    leak: "An inquiry lands at 9pm and waits until morning. By then the patient has booked with the clinic that answered first.",
    fix: "The AI front desk answers every message in seconds, on text, WhatsApp, web chat, email and social, in your clinic's tone and wording. The forms already on your website feed straight in. It qualifies, books on your real calendar and hands off with the full history.",
  },
  nurture: {
    leak: "Patients who are not ready today never hear from you again.",
    fix: "Consent-based follow-up (email and SMS) continues over days and weeks. The Qualification Agent checks fit with your own questions, on forms and in chat. Re-engagement lets your team re-contact past inquirers and patients who opted in, with opt-out on every message.",
  },
  book: {
    leak: "The consult is booked, then missed, and nobody follows up.",
    fix: "Appointments syncs every booking and sends reminders on the channel the patient chose. Consult Briefings give your team a written summary before each consult. The Waiting Room and Telehealth run the visit itself.",
  },
  commit: {
    leak: "The consult happens, the commitment does not. Paperwork, records and cost stall the yes.",
    fix: "Pipeline flags a stalled decision before it goes cold. ChartAI sends records requests and tracks them until the records arrive. Consent sends documents and education before the visit. Invoicing sends a payment link.",
  },
  treatment: {
    leak: "A cycle-timed test is missed, the cycle slips a month, or the patient quietly stops.",
    fix: "Cycle Coordinator works out when each patient is due, books the test in the right window and checks in until it is done. Escalations reach a person with context in minutes.",
  },
  after_cycle: {
    leak: "Eggs and embryos sit in your tanks for years while the patient goes quiet.",
    fix: "Keep records what each patient has stored, sends scheduled reminders on storage anniversaries and renewal dates, and gives patients a secure link to decide what comes next. Automated messages pause after a loss, and every touch is logged.",
  },
  advocate: {
    leak: "Happy patients are never asked for a review, a referral or a return visit.",
    fix: "Reviews brings your Google reviews into one place with AI-drafted replies and asks for new ones at the right pipeline stage. Referral Accounts tracks and thanks the doctors who send you patients.",
  },
};

/** Product pages that go deeper on a stage. Linked from /map/[stage]. */
export const STAGE_CROSS_LINKS: Partial<Record<StageKey, { href: string; label: string }[]>> = {
  get_found: [
    { href: "/ads", label: "Ads Manager" },
  ],
  first_response: [{ href: "/ai-agent", label: "AI Agent" }],
  commit: [
    { href: "/consent", label: "Patient Consent" },
    { href: "/chartai", label: "ChartAI" },
  ],
  after_cycle: [{ href: "/keep", label: "Keep" }],
};

export const KEEP_COPY = {
  body: "Keep records what each patient has stored, sends scheduled reminders on storage anniversaries and renewal dates, and gives patients a secure link to see what they have and decide what comes next. Automated messages pause after a loss. Every touch is logged, so you can measure who returns.",
};
