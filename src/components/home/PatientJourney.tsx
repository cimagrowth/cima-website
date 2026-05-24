"use client";

import { motion } from "framer-motion";
import { Rocket, MessageCircle, TrendingUp } from "lucide-react";

type Pillar = {
  label: "DRIVE" | "CAPTURE" | "GROW";
  tagline: string;
  icon: typeof Rocket;
  bullets: string[];
  accent: string;
  accentSoft: string;
  bullet: string;
};

const pillars: Pillar[] = [
  {
    label: "DRIVE",
    tagline: "Bring the patients in.",
    icon: Rocket,
    bullets: [
      "Google Ads automation with healthcare-compliant keyword sync",
      "Meta & Facebook Ads with auto-generated creative",
      "Cold outreach campaigns (Peer Insight framework)",
      "Landing pages built for fertility, aesthetics, and wellness conversion",
      "SEO gap analysis and content tools",
      "Dormant-patient reactivation campaigns",
    ],
    accent: "text-[#3E6E86]",
    accentSoft: "bg-[#3E6E86]/12",
    bullet: "bg-[#3E6E86]",
  },
  {
    label: "CAPTURE",
    tagline: "Answer, qualify, and book every inquiry — instantly.",
    icon: MessageCircle,
    bullets: [
      "7-specialty AI chat trained on your clinic’s voice, every channel, 24/7",
      "Email & SMS sequences that feel human",
      "Smart lead scoring + unified inbox",
      "Integrated booking and calendar sync",
      "Pipeline management your team will actually use",
      "Multi-language (English, Spanish, Portuguese)",
    ],
    accent: "text-primary",
    accentSoft: "bg-primary/12",
    bullet: "bg-primary",
  },
  {
    label: "GROW",
    tagline: "Keep patients and build referral flywheels.",
    icon: TrendingUp,
    bullets: [
      "Review AI that turns happy patients into marketing",
      "Nurture sequences for every patient stage",
      "ChartAI medical records retrieval",
      "EHR integration (ModMed and more)",
    ],
    accent: "text-[#E95931]",
    accentSoft: "bg-[#E95931]/12",
    bullet: "bg-[#E95931]",
  },
];

const PatientJourney = () => {
  return (
    <section id="patient-journey" className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            How The Team Works
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Drive. Capture. Grow.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto italic">
            Three pillars, one platform. Your AI team drives patients in,
            captures every inquiry the second it lands, and grows the
            relationships that turn into referrals.
          </p>
        </motion.div>

        {/* 3-column ascent: DRIVE → CAPTURE → GROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-end">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            // Visual ascent on desktop: each pillar steps up toward the summit
            const ascent = ["md:mt-12", "md:mt-6", "md:mt-0"][index];
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className={`bg-card rounded-2xl border border-border p-7 md:p-8 shadow-card flex flex-col ${ascent}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${pillar.accentSoft} flex items-center justify-center mb-4`}
                >
                  <Icon
                    className={`w-5 h-5 ${pillar.accent}`}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.18em] ${pillar.accent} mb-2`}
                >
                  {pillar.label}
                </p>
                <p className="italic text-foreground mb-5">{pillar.tagline}</p>
                <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 leading-snug">
                      <span
                        className={`mt-2 w-1.5 h-1.5 rounded-full ${pillar.bullet} flex-shrink-0`}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-16 text-center text-lg text-muted-foreground max-w-3xl mx-auto">
          Every module is built into one platform. Everything talks to
          everything. No Zapier. No integration fees. No &ldquo;that&rsquo;s on
          our roadmap.&rdquo;
        </p>
      </div>
    </section>
  );
};

export default PatientJourney;
