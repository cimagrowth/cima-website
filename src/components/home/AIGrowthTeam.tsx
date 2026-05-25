"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Mail,
  MessagesSquare,
  Repeat,
  Star,
} from "lucide-react";

type Pillar = "DRIVE" | "CAPTURE" | "GROW";

type Role = {
  title: string;
  pillar: Pillar;
  description: string;
  icon: typeof Megaphone;
};

const roles: Role[] = [
  {
    title: "AI Media Buyer",
    pillar: "DRIVE",
    description:
      "Builds, launches, and optimizes your Google and Meta ads with healthcare-compliant copy. No agency retainer.",
    icon: Megaphone,
  },
  {
    title: "AI Outreach Rep",
    pillar: "DRIVE",
    description:
      "Runs cold outreach in your voice using the Peer Insight framework, and reactivates patients who went quiet months ago.",
    icon: Mail,
  },
  {
    title: "AI Front Desk",
    pillar: "CAPTURE",
    description:
      "Answers every inquiry in seconds, on every channel, 24/7 — qualifies, books, and knows when to hand off to a human.",
    icon: MessagesSquare,
  },
  {
    title: "AI Nurture Rep",
    pillar: "CAPTURE",
    description:
      "Follows up 7–12 times across days and weeks, adapting tone to where the patient is emotionally. Never forgets, never fades.",
    icon: Repeat,
  },
  {
    title: "AI Reputation Manager",
    pillar: "GROW",
    description:
      "Turns happy patients into reviews and referrals automatically.",
    icon: Star,
  },
];

const pillarStyles: Record<
  Pillar,
  { bg: string; text: string; iconBg: string; iconText: string }
> = {
  DRIVE: {
    bg: "bg-[#3E6E86]/10",
    text: "text-[#3E6E86]",
    iconBg: "bg-[#3E6E86]/12",
    iconText: "text-[#3E6E86]",
  },
  CAPTURE: {
    bg: "bg-primary/10",
    text: "text-primary",
    iconBg: "bg-primary/12",
    iconText: "text-primary",
  },
  GROW: {
    bg: "bg-[#E95931]/10",
    text: "text-[#E95931]",
    iconBg: "bg-[#E95931]/12",
    iconText: "text-[#E95931]",
  },
};

const AIGrowthTeam = () => {
  return (
    <section
      id="ai-growth-team"
      className="bg-background py-20 md:py-28 relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            The Team
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            A growth team that never sleeps, never quits, and{" "}
            <span className="text-gradient-accent">
              never lets a lead go cold.
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            You&rsquo;re not buying software you have to run. You&rsquo;re
            staffing a department with AI employees &mdash; each trained on
            your specialty and your clinic, each doing a job you&rsquo;d
            otherwise hire, manage, and hope shows up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const styles = pillarStyles[role.pillar];
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="bg-card rounded-2xl border border-border p-7 md:p-8 shadow-card flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}
                  >
                    <Icon
                      className={`w-6 h-6 ${styles.iconText}`}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] ${styles.bg} ${styles.text} px-2.5 py-1 rounded-full`}
                  >
                    {role.pillar}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                  {role.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-14 text-center text-base md:text-lg text-muted-foreground max-w-3xl mx-auto italic"
        >
          And when something high-stakes happens &mdash; a patient in crisis,
          a new booking, a hot lead identifying themselves &mdash; the senior
          specialists step in.
        </motion.p>
      </div>
    </section>
  );
};

export default AIGrowthTeam;
