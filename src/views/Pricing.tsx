'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import EnterpriseInquiryModal from "@/components/enterprise/EnterpriseInquiryModal";

const Pricing = () => {
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);

  const features = [
    "Custom-trained AI response and follow-up",
    "Unified inbox (AI + staff)",
    "Pipelines and patient journeys",
    "Automations and follow-up rules",
    "Reactivation campaigns",
    "Reporting and visibility",
    "Onboarding + configuration",
  ];

  const plans = [
    {
      name: "Monthly",
      planKey: "monthly" as const,
      price: "$999",
      period: "/ month",
      setup: "$999 one-time setup",
      description: "Full access to GrowthOS with flexible monthly billing.",
      savings: null,
      bonus: null,
      cta: "Start Monthly",
      ctaSubtext: "$999/mo + $999 setup",
      popular: false,
    },
    {
      name: "Annual",
      planKey: "annual" as const,
      price: "$9,999",
      period: "/ year",
      setup: "No setup fee",
      description: "Best value. Pay annually and save on setup.",
      savings: "Save on setup",
      bonus: "$500 Meta & Google Ads Credit",
      cta: "Start Annual",
      ctaSubtext: "$9,999/year, no setup fee",
      popular: true,
    },
  ];

  const enterpriseFeatures = [
    "AI Patient Engagement across all locations",
    "CRM integration (Salesforce, HubSpot, or existing CRM)",
    "Dedicated enterprise dashboard & analytics",
    "Brand-specific AI training & customization",
    "Priority support & quarterly strategy reviews",
    "Custom onboarding & implementation",
  ];

  const faqItems = [
    {
      question: "What is the setup fee for monthly?",
      answer: "It covers initial configuration of your system and AI training.",
    },
    {
      question: "Is annual the same product?",
      answer: "Yes. Same system. Annual includes no setup fee.",
    },
    {
      question: "Are there any per-lead or usage fees?",
      answer: "No. Your subscription covers unlimited leads, AI conversations, and team members.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl lg:max-w-5xl mx-auto text-center"
          >
            <h1 className="font-display font-[340] tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6">
              Stop patient leakage with GrowthOS.{" "}
              <span className="italic text-clay">Choose monthly or annual.</span>
            </h1>
            <p className="text-body-lg text-teal-deep/80">
              One plan. Full access. No hidden fees or per-lead charges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28 lg:pb-32 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`rounded-xl2 p-8 md:p-10 relative transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-teal text-paper shadow-[var(--shadow)]"
                    : "bg-paper border border-sand shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-paper border border-sand text-clay text-body-sm font-semibold px-5 py-1.5 rounded-full shadow-[var(--shadow-sm)]">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-heading-sm mb-2 ${plan.popular ? "text-paper" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-body-sm mb-6 ${plan.popular ? "text-paper/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-display ${plan.popular ? "text-paper" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? "text-paper/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={plan.popular ? "text-paper/70 text-body-sm font-medium" : "text-muted-foreground text-body-sm"}>
                    {plan.setup}
                  </p>

                  {plan.savings && (
                    <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-paper/10 ring-1 ring-sand/40">
                      <Sparkles className="w-4 h-4 text-sand flex-shrink-0" />
                      <span className="text-body-sm font-semibold text-paper">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  {plan.bonus && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-paper/10 ring-1 ring-sand/40">
                      <Sparkles className="w-4 h-4 text-sand flex-shrink-0" />
                      <span className="text-body-sm font-semibold text-paper">
                        {plan.bonus}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-paper/10" : "bg-accent-orange/10"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-sand" : "text-accent-orange"}`} />
                      </div>
                      <span className={`text-body-sm ${plan.popular ? "text-paper" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={`/sign-up/register?plan=${plan.planKey}`}>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full group"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <p className={`text-body-sm mt-3 text-center ${plan.popular ? "text-paper/70" : "text-muted-foreground"}`}>
                  {plan.ctaSubtext}
                </p>
              </motion.div>
            ))}

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl2 p-8 md:p-10 relative transition-all duration-300 hover:-translate-y-2 bg-paper border border-clay/40 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-paper border border-sand text-clay text-body-sm font-semibold px-5 py-1.5 rounded-full shadow-[var(--shadow-sm)] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  ENTERPRISE
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-heading-sm mb-2 text-foreground">Enterprise</h3>
                <p className="text-body-sm mb-6 text-muted-foreground">
                  For multi-location clinics & healthcare networks
                </p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-display text-foreground">Custom</span>
                  <span className="text-muted-foreground">Pricing</span>
                </div>
                <p className="text-muted-foreground text-body-sm">
                  Tailored to your scale
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {enterpriseFeatures.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-accent-orange/10">
                      <Check className="w-3 h-3 text-accent-orange" />
                    </div>
                    <span className="text-body-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="hero"
                size="lg"
                className="w-full group"
                onClick={() => setEnterpriseModalOpen(true)}
              >
                Contact Us to Discuss
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-body-sm mt-3 text-center text-muted-foreground">
                Tailored to your organization's needs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <EnterpriseInquiryModal
        open={enterpriseModalOpen}
        onOpenChange={setEnterpriseModalOpen}
      />

      {/* Value proposition */}
      <section className="section-padding-sm bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="text-heading text-foreground mb-4">
              Full access. No feature tiers.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Both billing options include every GrowthOS feature. The only difference is how you pay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-heading text-foreground text-center mb-12"
          >
            Common questions
          </motion.h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                <p className="text-body text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-teal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display font-[340] tracking-tight text-heading-lg text-paper mb-6">
              Ready to stop patient leakage?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up/register?plan=monthly">
                <Button
                  variant="hero"
                  size="xl"
                  className="group"
                >
                  Get Started
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="hero-outline" size="xl" className="border border-paper/40 bg-transparent text-paper hover:bg-paper/10">
                  Book a Demo First
                </Button>
              </Link>
            </div>
            <p className="text-paper/60 text-sm mt-6">
              Want to learn more? <Link href="/product" className="underline hover:text-paper">See how GrowthOS works</Link> or <Link href="/features" className="underline hover:text-paper">explore all features</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
