// Shared FAQ content for the /consent page.
// Imported by the client view (rendered accordion) and the server page
// (FAQPage JSON-LD), so both stay in exact sync.

export interface ConsentFaq {
  question: string;
  answer: string;
}

export const CONSENT_FAQS: ConsentFaq[] = [
  {
    question: "Do we have to make our own videos?",
    answer:
      "The 15 fertility modules come with topics, order, and comprehension questions already built. You upload the video for each one, which means patients hear it from your clinicians rather than from stock footage recorded for another practice. If you would rather not film, ask us about production.",
  },
  {
    question: "Do patients need an account?",
    answer:
      "No. Each patient gets a personal, expiring link. No password. If they lose it, they can request a new one with their email address.",
  },
  {
    question: "Can patients stop and come back?",
    answer:
      "Yes. Progress saves automatically. They resume where they left off, including part way through the videos.",
  },
  {
    question: "Can we use our own consent documents?",
    answer:
      "Yes. Edit any document in the library and your version replaces the default for your clinic. You can also send us your existing forms to digitise.",
  },
  {
    question: "Has this been reviewed by an attorney?",
    answer:
      "The library is a complete set of drafts built on standard clinical disclosure practice. We expect every clinic to have its own counsel review and adopt them, and we make that easy. If you already have attorney-approved consents, we will load those instead.",
  },
  {
    question: "What about partner and witness signatures?",
    answer:
      "Built in. You set the order, and each signer gets their own link. The next signer is only invited once the previous one finishes.",
  },
  {
    question: "Do we have to use the rest of GrowthOS?",
    answer:
      "No. Consent works standalone. It is significantly more useful when it can fire from your pipeline.",
  },
];
