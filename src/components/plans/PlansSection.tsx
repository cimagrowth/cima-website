"use client";

import Link from "next/link";
import { ArrowRight, Check, Mic, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  tagline: string;
  inheritsFrom?: string;
  highlights: string[];
  popular: boolean;
};

const plans: Plan[] = [
  {
    name: "GrowthOS Clinic",
    tagline: "For single-location clinics ready to stop patient leakage.",
    highlights: [
      "Fertility-tuned CRM and pipeline",
      "AI intake assistant",
      "SMS and email sequences",
      "Follow-up automations",
      "Voice AI included",
      "HIPAA-safe by design",
    ],
    popular: false,
  },
  {
    name: "GrowthOS Growth",
    tagline: "The full front-end operating system.",
    inheritsFrom: "Clinic",
    highlights: [
      "Done-for-you ad campaigns",
      "Landing pages and quiz funnels",
      "Call intelligence",
      "Outreach and lead discovery",
      "AI marketing engine",
      "Priority onboarding",
    ],
    popular: true,
  },
  {
    name: "GrowthOS Enterprise",
    tagline: "For multi-location groups and networks.",
    inheritsFrom: "Growth",
    highlights: [
      "One contract for the whole group with volume pricing",
      "Pooled usage across locations",
      "Dedicated implementation",
      "Custom EHR integrations",
      "Compliance and audit reporting",
    ],
    popular: false,
  },
];

interface PlansSectionProps {
  id?: string;
  className?: string;
  showHeader?: boolean;
  eyebrow?: string;
  heading?: React.ReactNode;
  subhead?: string;
}

const PlansSection = ({
  id,
  className = "bg-background",
  showHeader = true,
  eyebrow = "Plans",
  heading = "One operating system. Three ways to run it.",
  subhead = "Pick the plan that matches your clinic. Every plan is built on the same fertility-tuned platform.",
}: PlansSectionProps) => {
  return (
    <section
      id={id}
      className={`section-padding relative overflow-hidden scroll-mt-20 ${className}`}
    >
      <div className="container-wide relative z-10">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              {eyebrow}
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground mb-4">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subhead}
            </p>
          </motion.div>
        )}

        {/* Voice AI banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 rounded-full bg-teal text-paper px-6 py-3 shadow-[var(--shadow-sm)]">
            <Mic className="w-4 h-4 text-sand flex-shrink-0" />
            <span className="text-sm md:text-base font-semibold">
              Voice AI is included in every plan.
            </span>
          </div>
        </motion.div>

        {/* Plan columns */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col rounded-xl2 p-8 md:p-9 transition-all duration-300 ${
                plan.popular
                  ? "bg-teal text-paper shadow-[var(--shadow)] md:-translate-y-4 md:scale-[1.03] ring-2 ring-accent-orange/60 z-10"
                  : "bg-paper border border-sand shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap bg-accent-orange text-white text-xs md:text-sm font-semibold px-5 py-1.5 rounded-full shadow-card">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3
                className={`text-xl md:text-2xl font-semibold mb-2 ${
                  plan.popular ? "text-paper" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm md:text-base mb-6 leading-snug ${
                  plan.popular ? "text-paper/80" : "text-muted-foreground"
                }`}
              >
                {plan.tagline}
              </p>

              {plan.inheritsFrom && (
                <p
                  className={`text-sm font-semibold mb-4 ${
                    plan.popular ? "text-sand" : "text-clay"
                  }`}
                >
                  Everything in {plan.inheritsFrom}, plus:
                </p>
              )}

              <ul className="space-y-3 mb-8 flex-1">
                {plan.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular ? "bg-paper/10" : "bg-accent-orange/10"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular ? "text-sand" : "text-accent-orange"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-sm md:text-base leading-snug ${
                        plan.popular ? "text-paper" : "text-foreground"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/demo" className="block mt-auto">
                <Button
                  variant="hero"
                  size="lg"
                  className={`w-full group ${
                    plan.popular
                      ? "bg-accent-orange hover:brightness-110"
                      : ""
                  }`}
                >
                  Book a Demo
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tailored pricing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-center text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-10 md:mt-12"
        >
          Pricing is tailored to your clinic and shared in your demo. One
          recovered patient typically covers months of GrowthOS.
        </motion.p>
      </div>
    </section>
  );
};

export default PlansSection;
