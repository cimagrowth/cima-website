"use client";

import { Megaphone, MessageCircle, Calendar, Heart } from "lucide-react";

type Stage = {
  label: string;
  tagline: string;
  icon: typeof Megaphone;
  bullets: string[];
};

const stages: Stage[] = [
  {
    label: "ATTRACT",
    tagline: "Fill the top of your funnel.",
    icon: Megaphone,
    bullets: [
      "Google Ads automation with healthcare-compliant keyword sync",
      "Meta & Facebook Ads with auto-generated creative",
      "Landing pages built for fertility, aesthetics, and wellness conversion",
      "SEO gap analysis and content tools",
    ],
  },
  {
    label: "ENGAGE",
    tagline: "Talk to every inquiry instantly, 24/7.",
    icon: MessageCircle,
    bullets: [
      "7-specialty AI chatbot trained on your clinic\u2019s voice",
      "Cold outreach campaigns with the Peer Insight framework",
      "Email and SMS sequences that feel human",
      "Multi-language support (English, Spanish, Portuguese)",
    ],
  },
  {
    label: "CONVERT",
    tagline: "Turn conversations into consults.",
    icon: Calendar,
    bullets: [
      "Smart CRM with automated lead scoring",
      "Integrated booking and calendar sync",
      "Campaign builder with pre-built fertility playbooks",
      "Pipeline management your team will actually use",
    ],
  },
  {
    label: "RETAIN",
    tagline: "Keep patients and build referral flywheels.",
    icon: Heart,
    bullets: [
      "Review AI that turns happy patients into marketing",
      "Nurture sequences for every patient stage",
      "ChartAI medical records retrieval",
      "EHR integration (ModMed and more)",
    ],
  },
];

const PatientJourney = () => {
  return (
    <section id="patient-journey" className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            The Complete Journey
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Every tool your agency uses. Every system your clinic needs. One login.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Most platforms solve one piece of the funnel. GrowthOS owns all four stages
            &mdash; so nothing falls through the cracks between them.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.label}
                className="bg-card rounded-2xl border border-border p-8 shadow-card flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                  {stage.label}
                </p>
                <p className="italic text-foreground mb-5">{stage.tagline}</p>
                <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                  {stage.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 leading-snug">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-orange flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-16 text-center text-lg text-muted-foreground max-w-3xl mx-auto">
          Every module is built into one platform. Everything talks to everything.
          No Zapier. No integration fees. No &ldquo;that&rsquo;s on our roadmap.&rdquo;
        </p>
      </div>
    </section>
  );
};

export default PatientJourney;
