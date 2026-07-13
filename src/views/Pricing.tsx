'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PlansSection from "@/components/plans/PlansSection";

const Pricing = () => {
  const faqItems = [
    {
      question: "How does pricing work?",
      answer:
        "Pricing is tailored to your clinic and shared in your demo. We scope it to your locations, your patient volume, and the plan that fits. There are no public tiers to decode.",
    },
    {
      question: "What is included in every plan?",
      answer:
        "Every plan runs on the same fertility-tuned platform: CRM and pipeline, AI intake assistant, SMS and email sequences, follow-up automations, and Voice AI. Higher plans add done-for-you ad campaigns, funnels, outreach, and multi-location tooling.",
    },
    {
      question: "Can we move up a plan later?",
      answer:
        "Yes. Start where your clinic is today and expand as you grow. Your data, configuration, and history carry over when you move up.",
    },
    {
      question: "How fast can we go live?",
      answer:
        "Onboarding is typically live within 24 to 48 hours after we configure your account.",
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
              <span className="italic text-clay">Plans built around your clinic.</span>
            </h1>
            <p className="text-body-lg text-teal-deep/80">
              Three plans, one platform. Pricing is tailored to your clinic and shared in your demo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <PlansSection
        className="bg-background"
        eyebrow="Plans"
        heading="Choose the plan that matches your clinic."
        subhead="Every plan runs on the same fertility-tuned platform, with Voice AI included. Move up as you grow."
      />

      {/* FAQ */}
      <section className="section-padding bg-tan">
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
              <Link href="/demo">
                <Button variant="hero" size="xl" className="group">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
