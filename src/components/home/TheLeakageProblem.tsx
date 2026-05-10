"use client";

import { Clock, MessageSquare } from "lucide-react";

const TheLeakageProblem = () => {
  return (
    <section
      id="leakage-problem"
      className="bg-background py-20 md:py-28 relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            The Problem
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Your clinic is bleeding patients.{" "}
            <span className="text-gradient-accent">
              You just can&apos;t see it on a dashboard.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start max-w-6xl mx-auto">
          {/* Left column: body */}
          <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              The average clinic captures a patient inquiry, then takes 6 to 48
              hours to follow up. By then, that patient has booked with the
              clinic that called back first. The chatbot collected the info.
              Your CRM stored it. Your EHR is ready to schedule. But nothing in
              your stack actually does the work in between.
            </p>
            <p className="text-foreground font-medium">
              That&apos;s the gap where revenue dies:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  A patient escalates in chat with a real concern. Staff sees
                  the alert hours later, scrambles for context, calls back
                  cold.
                </span>
              </li>
              <li className="flex gap-3 leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  A new patient confirms an appointment. They get a generic
                  reminder. Show rate drops.
                </span>
              </li>
              <li className="flex gap-3 leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  A prospective patient asks three buying questions in chat.
                  Nobody on your team is paid to notice.
                </span>
              </li>
            </ul>
            <p>
              Multiply that across 50 inquiries a week. That&apos;s your
              leakage. That&apos;s the gap GrowthOS exists to close.
            </p>
          </div>

          {/* Right column: stylized "before" mockup */}
          <div className="relative">
            <div className="card-elevated p-5 md:p-6 bg-muted/40 border border-border/60 opacity-80">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Website chat
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-background/60 rounded-lg px-3 py-2 text-muted-foreground italic">
                  &ldquo;Hi — I had my IVF transfer 14 days ago and I&apos;m
                  spotting. Should I be worried?&rdquo;
                </div>
                <div className="bg-muted/70 rounded-lg px-3 py-2 text-muted-foreground">
                  &ldquo;Thanks for reaching out. I&apos;ll connect you with
                  staff.&rdquo;
                </div>
                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border/40 text-xs text-muted-foreground">
                  <Clock
                    className="w-3.5 h-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>Waiting for staff to see this — 4h 22m and counting…</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic text-center">
              The handoff that loses you patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLeakageProblem;
