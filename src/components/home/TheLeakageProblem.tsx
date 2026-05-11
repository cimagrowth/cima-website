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
            The window is{" "}
            <span className="text-gradient-accent">
              shorter than you think.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start max-w-6xl mx-auto">
          {/* Left column: body */}
          <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              A patient who fills out your form at 9pm has booked somewhere
              else by 9:07pm. The average specialty clinic responds in four to
              twelve hours. By then the patient has been to three
              competitors&rsquo; websites and booked the one that called back
              first.
            </p>
            <p className="text-foreground font-medium">
              This isn&rsquo;t a marketing problem. It&rsquo;s a response-speed
              problem &mdash; and no amount of ad spend fixes it.
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
