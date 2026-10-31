import type { StageKey } from "@/lib/growthos-map";

// Editorial copy for each stage of the GrowthOS Map (Appendix A of the rebuild
// spec). Written to match get_public_platform_map; stage names, leak names,
// features and stats always come from the RPC, not from here.
export const STAGE_COPY: Record<StageKey, { leak: string; fix: string }> = {
  get_found: {
    leak: "You don't show up when patients search. The right patients never find you, and nobody can tell which ad spend brought one in.",
    fix: "Campaign builder drafts the landing page, ad copy for your own ad accounts, and follow-up messages for people who inquire, for your team to review. Ads Manager connects your clinic's own Google and Meta ad accounts and measures spend against booked consults, not clicks, without sending health data to an ad platform. Referral Partners tracks the referring doctors and partner practices your team already works with.",
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
    fix: "Appointments syncs every booking and sends reminders on the channel the patient chose. Consult briefings give your team a written summary before each consult. The Waiting Room and Telehealth run the visit itself.",
  },
  commit: {
    leak: "The consult happens, the commitment does not. Paperwork, records and cost stall the yes.",
    fix: "Pipeline follow-ups flag a stalled decision before it goes cold. ChartAI sends records requests and tracks them until the records arrive. Consent and education sends documents and education before the visit. Payment links send a payment link.",
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
    fix: "Reviews brings your Google reviews into one place with AI-drafted replies and asks for new ones at the right pipeline stage. Referral Partners tracks and thanks the doctors who send you patients.",
  },
};

/** Stage page hero: the outcome (H1) and how GrowthOS gets there (after the problem line). */
export const STAGE_HERO: Record<StageKey, { outcome: string; how: string }> = {
  get_found: {
    outcome: "Turn searches into inquiries you can trace to booked consults.",
    how: "GrowthOS drafts your service pages and ad copy for your team to approve, and shows which ad dollars became booked consults, without sending health data to ad platforms.",
  },
  first_response: {
    outcome: "Every inquiry answered in seconds, day or night.",
    how: "AI trained on your clinic replies on text, WhatsApp, chat, email and social, qualifies the patient and books them on your real calendar before they call the next clinic.",
  },
  nurture: {
    outcome: "Patients who aren't ready yet keep hearing from you.",
    how: "GrowthOS qualifies every lead with your own questions, gives each one an owner and a next step, and follows up by email and text, with consent, until they book or opt out.",
  },
  book: {
    outcome: "More booked consults that actually show up.",
    how: "Patients book in one conversation, get reminders on the channel they chose, and are followed up automatically if they miss. Your team walks in with a summary of what each patient said.",
  },
  commit: {
    outcome: "More consults turn into treatment, and payment.",
    how: "GrowthOS sends consents before the visit, chases outside records, sends the payment link at the right moment, and flags any patient who goes quiet before they go cold.",
  },
  treatment: {
    outcome: "No missed test windows. No patient left wondering what's next.",
    how: "GrowthOS works out when each patient is due, books the test inside the window, checks in until it's done, and gets urgent messages to the right person with full context.",
  },
  after_cycle: {
    outcome: "Patients with stored eggs and embryos come back to use them.",
    how: "GrowthOS keeps a record of what each patient has stored, sends renewal and anniversary check-ins, pauses after a loss, and gives each patient a private link to tell you what's next.",
  },
  advocate: {
    outcome: "More reviews, more referrals, more patients who come back.",
    how: "GrowthOS asks for a Google review at the right moment, drafts your replies for approval, thanks referring doctors, and keeps past patients who opted in hearing from you.",
  },
};

/** Product pages that go deeper on a stage. Linked from /map/[stage]. */
export const STAGE_CROSS_LINKS: Partial<Record<StageKey, { href: string; label: string }[]>> = {
  get_found: [
    { href: "/ads", label: "Ads Manager" },
  ],
  first_response: [{ href: "/ai-agent", label: "AI front desk" }],
  commit: [
    { href: "/consent", label: "Consent and education" },
    { href: "/chartai", label: "ChartAI" },
  ],
  after_cycle: [{ href: "/keep", label: "Keep" }],
};

export const KEEP_COPY = {
  body: "Keep records what each patient has stored, sends scheduled reminders on storage anniversaries and renewal dates, and gives patients a secure link to see what they have and decide what comes next. Automated messages pause after a loss. Every touch is logged, so you can measure who returns.",
};
