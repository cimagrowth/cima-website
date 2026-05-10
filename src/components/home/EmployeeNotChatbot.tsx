"use client";

import { AlertTriangle, FileText, MessageSquare } from "lucide-react";

const briefingPoints = [
  "Patient: Jessica P. — IVF cycle 2, transfer day +14",
  'Exact words: "bleeding heavily at 6 weeks pregnant after IVF"',
  "Last beta HCG: 1,842 mIU/mL (drawn 3 days ago)",
  "Current meds: estradiol 2mg BID, progesterone 200mg TID",
  "Suggested talking points + clinical references attached",
];

const EmployeeNotChatbot = () => {
  return (
    <section
      id="employee-not-chatbot"
      className="bg-background py-20 md:py-28 relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left column: copy */}
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
              The Difference
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              A chatbot collects information.{" "}
              <span className="text-gradient-accent">An employee uses it.</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                When a fertility patient types{" "}
                <span className="text-foreground italic">
                  &ldquo;I&apos;m bleeding heavily at 6 weeks pregnant after
                  IVF&rdquo;
                </span>{" "}
                into your website chat, a chatbot will say{" "}
                <span className="italic">&ldquo;I&apos;ll connect you with staff&rdquo;</span>{" "}
                and dump a transcript on someone&apos;s desk. Your staff member
                then spends 8 minutes opening the chart, checking HCG levels,
                looking up the protocol, and figuring out what to say — while a
                scared patient waits.
              </p>
              <p>
                GrowthOS runs an AI agent the moment that escalation happens. By
                the time your staff member sees the alert, the briefing is
                already in their inbox: patient name, exact words, last beta
                HCG, current medications, suggested talking points, clinical
                references. They pick up the phone already informed.
              </p>
              <p className="text-foreground font-medium">
                That&apos;s the operating system. Chat handles the conversation,
                agents handle the follow-through, the OS coordinates them —
                across every clinic event, automatically.
              </p>
            </div>
          </div>

          {/* Right column: split-screen visual */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3 relative">
              {/* Without GrowthOS — chatbot transcript */}
              <div className="card-elevated p-5 md:p-6 bg-muted/40 border border-border/60 opacity-70">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare
                    className="w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Without GrowthOS
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-background/60 rounded-lg px-3 py-2 text-muted-foreground italic">
                    &ldquo;I&apos;m bleeding heavily at 6 weeks pregnant after
                    IVF&rdquo;
                  </div>
                  <div className="bg-muted/60 rounded-lg px-3 py-2 text-muted-foreground">
                    &ldquo;I&apos;ll connect you with staff.&rdquo;
                  </div>
                  <div className="pt-2 mt-3 border-t border-border/40 text-xs text-muted-foreground">
                    Transcript queued. No context. 8 min to triage.
                  </div>
                </div>
              </div>

              {/* With GrowthOS — briefing card */}
              <div className="card-elevated p-5 md:p-6 border-l-4 border-accent-orange shadow-glow bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle
                    className="w-4 h-4 text-accent-orange"
                    aria-hidden="true"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
                    With GrowthOS
                  </p>
                </div>
                <div className="flex items-start gap-2 mb-3">
                  <FileText
                    className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-bold text-foreground leading-snug">
                    URGENT: Triage briefing for Jessica P.
                  </p>
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-foreground/90">
                  {briefingPoints.map((point) => (
                    <li key={point} className="flex gap-2 leading-snug">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 mt-4 border-t border-border/40 text-xs text-primary font-semibold">
                  Delivered in &lt; 2 min. Staff picks up informed.
                </div>
              </div>

              {/* Vertical divider with label - desktop only */}
              <div
                className="hidden sm:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-px flex-1 bg-border/60" />
                <div className="my-2 px-2 py-1 rounded-md bg-background border border-border text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
                  Without / With
                </div>
                <div className="w-px flex-1 bg-border/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeNotChatbot;
