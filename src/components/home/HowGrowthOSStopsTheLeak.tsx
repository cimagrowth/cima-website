"use client";

import { AlertTriangle, UserPlus, Sparkles } from "lucide-react";

type AgentCard = {
  icon: typeof AlertTriangle;
  title: string;
  body: string;
};

const agents: AgentCard[] = [
  {
    icon: AlertTriangle,
    title: "AI staff member: Crisis Triage",
    body: "Fires when a patient signals distress, a complaint, or a safety concern. Reads their full history, produces a one-page urgent briefing for your office, and escalates within minutes.",
  },
  {
    icon: UserPlus,
    title: "AI staff member: Patient Onboarding",
    body: "Fires when a new patient books. Reads their intake, gets your brand context, and sends a warm personalized pre-visit email that addresses what they actually said. Your team gets a copy.",
  },
  {
    icon: Sparkles,
    title: "AI staff member: High-Intent Patient",
    body: "Fires when a hot lead identifies themselves on chat. Looks them up, researches their context, and produces a sales briefing so your team knows exactly who they are and what to lead with on the callback.",
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
            The Specialists
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            When something important happens,{" "}
            <span className="text-gradient-accent">a specialist takes over.</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed space-y-5 mb-12 md:mb-16">
          <p>
            Your AI growth team handles the day-to-day &mdash; the front-desk
            AI fields most patient questions in seconds. For the moments that
            matter most &mdash; a patient in crisis, a new booking that needs
            a warm welcome, a hot lead identifying themselves &mdash; the
            senior specialists step in. These specialists do 60 to 90 seconds
            of deep work in the background &mdash; reading the full patient
            history, researching context, drafting tailored outreach &mdash;
            and produce a written briefing your team gets by email and inside
            the GrowthOS inbox. Nothing falls through the cracks because
            nothing has to live in someone&rsquo;s head.
          </p>
        </div>

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
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                  {agent.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {agent.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowGrowthOSStopsTheLeak;
