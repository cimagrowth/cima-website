'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  MessageSquare,
  Calendar,
  Users,
  Brain,
  ShieldCheck,
  Inbox,
  Globe,
  ChevronDown,
  Loader2,
  Plug,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

const AGENT_PLAN_IDS = {
  starter_monthly: "plan_KlfeYTy8fJrH1",
  starter_annual: "plan_1L1PC2cyC3Md0",
  pro_monthly: "plan_2NrtqXfZv9Hf3",
  pro_annual: "plan_d1pO9lw8rdQzN",
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  {
    icon: Plug,
    title: "Connect Your CRM",
    time: "2 minutes",
    description:
      "Link your GoHighLevel account with a single click. No code, no IT team required.",
  },
  {
    icon: Brain,
    title: "Train Your Agent",
    time: "5 minutes",
    description:
      "Tell your agent about your services, FAQs, and booking rules. It learns your clinic's voice instantly.",
  },
  {
    icon: Zap,
    title: "Go Live",
    time: "Instant",
    description:
      "Your AI agent starts responding to leads, qualifying patients, and booking appointments immediately.",
  },
];

const integrations = [
  { name: "GoHighLevel", status: "Live", statusColor: "bg-green-500" },
  { name: "HubSpot", status: "Coming Q3", statusColor: "bg-amber-500" },
  { name: "Salesforce", status: "Coming Q4", statusColor: "bg-amber-500" },
];

const features = [
  {
    icon: Clock,
    title: "24/7 Instant Response",
    description:
      "Never miss a lead again. Your AI agent responds to inquiries within seconds, day or night.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description:
      "Automatically qualifies incoming leads based on your criteria — service interest, budget, and timeline.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description:
      "Books consultations directly into your calendar. Handles rescheduling and confirmations automatically.",
  },
  {
    icon: Globe,
    title: "Multi-Channel",
    description:
      "Engages patients across SMS, email, web chat, and social DMs from a single AI brain.",
  },
  {
    icon: Sparkles,
    title: "Specialty-Trained",
    description:
      "Pre-trained on fertility, med spa, and aesthetic clinic workflows. Understands your patients' language.",
  },
  {
    icon: MessageSquare,
    title: "Human Escalation",
    description:
      "Seamlessly hands off complex conversations to your staff with full context — no patient repeats themselves.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    description:
      "Built with healthcare privacy at the core. All patient data is encrypted and handled per HIPAA guidelines.",
  },
  {
    icon: Inbox,
    title: "Real-Time Inbox",
    description:
      "Monitor every AI conversation in real time. Jump in anytime, or let the agent handle it end to end.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: 297,
    annualPrice: 247,
    planKeyMonthly: "starter_monthly" as const,
    planKeyAnnual: "starter_annual" as const,
    description: "For clinics ready to automate patient follow-up",
    features: [
      "1 AI agent",
      "Up to 500 conversations/mo",
      "GoHighLevel integration",
      "Lead qualification",
      "Appointment booking",
      "Email & SMS channels",
      "Real-time inbox",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 497,
    annualPrice: 414,
    planKeyMonthly: "pro_monthly" as const,
    planKeyAnnual: "pro_annual" as const,
    description: "For multi-location clinics and high-volume practices",
    features: [
      "Everything in Starter",
      "Unlimited conversations",
      "All CRM integrations",
      "Multi-channel (SMS, email, web chat, social)",
      "Custom AI training",
      "Human escalation workflows",
      "Advanced analytics",
      "Priority support",
    ],
    highlighted: true,
  },
];

const faqItems = [
  {
    question: "Does this work with my CRM?",
    answer:
      "We currently integrate natively with GoHighLevel (GHL). HubSpot integration is coming in Q3 and Salesforce in Q4. If you use a different CRM, contact us — we may be able to build a custom connection.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most clinics are live in under 10 minutes. You connect your CRM (2 min), configure your agent's knowledge base (5 min), and go live instantly. No developer or IT team needed.",
  },
  {
    question: "Can my staff see what the AI is saying?",
    answer:
      "Absolutely. Every conversation appears in your real-time inbox. Staff can monitor, jump in at any time, or review conversation history. You stay in full control.",
  },
  {
    question: "What if the AI can't answer a question?",
    answer:
      "Your agent is trained to recognize when it's out of its depth. It seamlessly escalates to a human team member with the full conversation context, so the patient never has to repeat themselves.",
  },
  {
    question: "Is this HIPAA compliant?",
    answer:
      "Yes. All patient data is encrypted in transit and at rest. We follow HIPAA guidelines for data handling, and we sign BAAs (Business Associate Agreements) with all healthcare clients.",
  },
  {
    question: "Can I customize what the AI says?",
    answer:
      "Yes. You control your agent's personality, tone, FAQs, booking rules, and escalation triggers. It speaks in your clinic's voice, not generic AI-speak.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can switch between Starter and Pro at any time. Changes take effect on your next billing cycle. No penalties or hidden fees.",
  },
];

const AIAgent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>

      {/* ═══════════ HERO ═══════════ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block bg-accent-orange/10 text-accent-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Now Available
            </span>
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              Your Clinic's AI Front Desk —{" "}
              <span className="text-gradient-accent">
                Works Inside the CRM You Already Use
              </span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Stop losing patients to slow response times. Cima AI Agent handles
              inquiries, qualifies leads, and books appointments 24/7 — no
              platform switch required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                className="group shadow-glow"
                onClick={() => scrollTo("pricing")}
              >
                Start Your AI Agent
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => scrollTo("how-it-works")}
              >
                See it in Action ↓
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PROBLEM STATEMENT ═══════════ */}
      <section className="py-16 md:py-20 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                stat: "73%",
                text: "of patients choose the clinic that responds first.",
              },
              {
                stat: "24/7",
                text: "Your staff can't be available around the clock. Your AI agent can.",
              },
              {
                stat: "15–20",
                text: "potential patients lost per month to slow or missed follow-ups.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-display font-bold text-accent-orange mb-2">
                  {item.stat}
                </div>
                <p className="text-body text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Live in Under 10 Minutes
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Three steps. No code. No IT department.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-premium p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-accent-orange/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-accent-orange" />
                </div>
                <span className="text-xs font-semibold text-accent-orange uppercase tracking-wider">
                  Step {i + 1} — {step.time}
                </span>
                <h3 className="text-heading-sm text-foreground mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CRM INTEGRATIONS ═══════════ */}
      <section className="py-12 md:py-16 bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-heading text-foreground mb-2">
              CRM Integrations
            </h2>
            <p className="text-body text-muted-foreground">
              Works with the tools you already use.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((crm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-premium px-6 py-4 flex items-center gap-3"
              >
                <span className="text-body font-semibold text-foreground">
                  {crm.name}
                </span>
                <span
                  className={`${crm.statusColor} text-white text-xs font-semibold px-2.5 py-0.5 rounded-full`}
                >
                  {crm.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Everything Your Front Desk Does —{" "}
              <span className="text-gradient-accent">Automated</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Your AI agent handles patient communication so your team can focus
              on care.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-premium p-6"
              >
                <div className="w-11 h-11 mb-4 rounded-xl bg-accent-orange/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent-orange" />
                </div>
                <h3 className="text-heading-sm text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section id="pricing" className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              No setup fees. No hidden costs. Cancel anytime.
            </p>

            {/* Monthly/Annual Toggle */}
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full p-1.5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-accent-orange text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual
                    ? "bg-accent-orange text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <span className="ml-1.5 text-xs opacity-80">Save 17%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground border-2 border-accent-orange shadow-glow relative"
                    : "card-premium"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-orange text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3
                  className={`text-heading-sm mb-1 ${
                    tier.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-body-sm mb-6 ${
                    tier.highlighted
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-display font-bold ${
                      tier.highlighted ? "text-white" : "text-foreground"
                    }`}
                  >
                    ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  </span>
                  <span
                    className={`text-body-sm ${
                      tier.highlighted
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    /mo
                  </span>
                  {isAnnual && (
                    <span
                      className={`block text-body-sm mt-1 ${
                        tier.highlighted
                          ? "text-white/50"
                          : "text-muted-foreground"
                      }`}
                    >
                      Billed annually
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.highlighted
                            ? "text-accent-orange"
                            : "text-accent-orange"
                        }`}
                      />
                      <span
                        className={`text-body-sm ${
                          tier.highlighted
                            ? "text-white/90"
                            : "text-muted-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlighted ? "hero" : "hero-outline"}
                  size="lg"
                  className="w-full group"
                  onClick={() =>
                    setCheckoutPlan(
                      AGENT_PLAN_IDS[
                        isAnnual ? tier.planKeyAnnual : tier.planKeyMonthly
                      ]
                    )
                  }
                >
                  Start {tier.name}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-premium overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-body font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-60 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-5 text-body text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-heading-lg md:text-display text-white mb-4">
              Ready to Stop Losing Patients?
            </h2>
            <p className="text-body-lg text-white/70 max-w-xl mx-auto mb-8">
              Join clinics that respond to every lead in seconds — not hours.
              Start your AI agent today.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="group shadow-glow"
              onClick={() =>
                setCheckoutPlan(
                  AGENT_PLAN_IDS[
                    isAnnual ? "starter_annual" : "starter_monthly"
                  ]
                )
              }
            >
              Start Your AI Agent — $297/mo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-white/50 mt-4">
              No setup fee. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CHECKOUT MODAL ═══════════ */}
      {checkoutPlan && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCheckoutPlan(null);
          }}
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Complete Your Purchase
              </h3>
              <button
                onClick={() => setCheckoutPlan(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <WhopCheckoutEmbed
              planId={checkoutPlan}
              returnUrl="https://os.cimagrowth.com/agent-welcome"
              theme="light"
              fallback={
                <div className="text-center py-8 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading secure checkout...
                </div>
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AIAgent;
