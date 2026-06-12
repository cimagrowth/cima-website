"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Plan = {
  name: string;
  planKey: "monthly" | "annual";
  price: string;
  period: string;
  setup: string;
  description: string;
  cta: string;
  ctaSubtext: string;
  popular: boolean;
  bonus?: string;
  savings?: string;
};

const plans: Plan[] = [
  {
    name: "Monthly",
    planKey: "monthly",
    price: "$999",
    period: "/ month",
    setup: "$999 one-time setup",
    description: "Full access to GrowthOS with flexible monthly billing.",
    cta: "Start Monthly",
    ctaSubtext: "$999/mo + $999 setup",
    popular: false,
  },
  {
    name: "Annual",
    planKey: "annual",
    price: "$9,999",
    period: "/ year",
    setup: "No setup fee",
    description:
      "Best value. Two months effectively free, and setup is waived.",
    savings: "Save on setup",
    bonus: "$500 Meta & Google Ads Credit",
    cta: "Start Annual",
    ctaSubtext: "$9,999/year, no setup fee",
    popular: true,
  },
];

const includedHighlights = [
  "Your whole AI growth team — DRIVE, CAPTURE, GROW",
  "Unified inbox, every channel, 24/7",
  "Pipelines, automations, and reactivation campaigns",
  "HIPAA-grade handling, BAA, and clinical guardrails",
  "Onboarding, configuration, and AI training",
  "Unlimited leads, conversations, and team members",
];

const ValueStack = () => {
  return (
    <section
      id="pricing"
      className="section-padding bg-background relative overflow-hidden scroll-mt-20"
    >
      <div className="container-wide relative z-10">
        {/* Lead-in headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
            Pricing
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground mb-4">
            One price. One login. One AI team.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            No tiers for features we gate. No per-user surcharges. Choose
            monthly or annual.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-10 md:mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.planKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className={`relative rounded-xl2 p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "bg-teal text-paper shadow-[var(--shadow)]"
                  : "bg-paper border border-sand shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent-orange text-white text-xs md:text-sm font-semibold px-5 py-1.5 rounded-full shadow-card">
                    Best Value
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl md:text-2xl font-semibold mb-2 ${
                    plan.popular ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`font-ui text-4xl md:text-5xl font-bold ${
                      plan.popular ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.popular
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm font-medium ${
                    plan.popular
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.setup}
                </p>

                {plan.savings && (
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-accent-orange/20 border border-accent-orange/30">
                    <Sparkles className="w-4 h-4 text-accent-orange flex-shrink-0" />
                    <span className="text-sm font-semibold text-primary-foreground">
                      {plan.savings}
                    </span>
                  </div>
                )}

                {plan.bonus && (
                  <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/20">
                    <Sparkles className="w-4 h-4 text-accent-orange flex-shrink-0" />
                    <span className="text-sm font-semibold text-primary-foreground">
                      {plan.bonus}
                    </span>
                  </div>
                )}
              </div>

              <Link
                href={`/sign-up/register?plan=${plan.planKey}`}
                className="block"
              >
                <Button
                  variant="hero"
                  size="lg"
                  className={`w-full group ${
                    plan.popular
                      ? "bg-accent-orange hover:brightness-110"
                      : "bg-primary hover:bg-primary-light"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <p
                className={`text-sm mt-3 text-center ${
                  plan.popular
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {plan.ctaSubtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Included recap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-paper rounded-xl2 border border-sand shadow-[var(--shadow-sm)] p-6 md:p-8 mb-8"
        >
          <p className="text-center text-sm md:text-base font-semibold text-foreground mb-5">
            Everything your AI team does, included in both plans:
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {includedHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-snug"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-accent-orange/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent-orange" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Trust line */}
        <p className="text-center text-sm md:text-base text-muted-foreground mb-8">
          Live in 48 hours. Cancel anytime.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button variant="hero" size="lg" className="group">
              Get Started
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="hero-outline" size="lg">
              Book a Demo First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValueStack;
