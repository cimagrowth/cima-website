"use client";

import { AlertTriangle, UserPlus, Sparkles } from "lucide-react";

type AgentCard = {
  icon: typeof AlertTriangle;
  title: string;
  trigger: string;
  body: string;
};

const agents: AgentCard[] = [
  {
    icon: AlertTriangle,
    title: "Crisis Triage Agent",
    trigger: "Fires the moment a patient escalates in chat.",
    body: "Pulls her full history, her last labs, her current meds, and the relevant clinical protocol. Drafts a one-page triage briefing. Emails it to your on-call staff in 90 seconds — so when they pick up the phone, they're already informed.",
  },
  {
    icon: UserPlus,
    title: "Patient Onboarding Agent",
    trigger: "Fires when a patient books an appointment.",
    body: "Sends a warm, brand-aligned pre-visit email tailored to whatever they wrote in their intake — not a generic template. Patients feel seen from the first touch. Show rates climb.",
  },
  {
    icon: Sparkles,
    title: "High-Intent Patient Agent",
    trigger: "Fires when chat detects a patient ready to book.",
    body: "Catches the moments when someone is clearly evaluating you — asking about timing, pricing, protocols, or specific treatments. Researches their context, drafts a personalized follow-up briefing, and arms your patient coordinator with the right next step.",
  },
];

const HowGrowthOSStopsTheLeak = () => {
  return (
    <section
      id="how-growthos-stops-the-leak"
      className="bg-tan py-20 md:py-28 relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            The Fix
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            An operating system is the only thing that can{" "}
            <span className="text-gradient-accent">close the gap.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed space-y-5 mb-12 md:mb-16">
          <p>
            A chatbot can&apos;t research a patient&apos;s history. A CRM
            can&apos;t draft a triage briefing. An EHR can&apos;t notice when a
            patient is ready to book. You need something that sits across all
            of them and runs the work end-to-end — the way a great employee
            would, if you could clone your best one and have her work 24/7.
          </p>
          <p className="text-foreground font-medium">
            That&apos;s GrowthOS. And the reason it works is the AI staff that
            comes built in.
          </p>
        </div>

        <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-accent-orange mb-6">
          Three agents. Three moments of patient leakage stopped.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.title}
                className="bg-card rounded-2xl border border-border p-7 md:p-8 shadow-card flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-5">
                  <Icon
                    className="w-6 h-6 text-accent-orange"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">
                  {agent.title}
                </h3>
                <p className="italic text-foreground/90 mb-4">
                  {agent.trigger}
                </p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {agent.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 md:mt-16 max-w-3xl mx-auto text-center font-display text-xl md:text-2xl italic text-primary leading-snug">
          &ldquo;This is the staff your clinic always needed but couldn&apos;t
          afford. Now they&apos;re standard.&rdquo;
        </p>
      </div>
    </section>
  );
};

export default HowGrowthOSStopsTheLeak;
