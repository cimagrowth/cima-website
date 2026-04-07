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
      "Link your GoHighLevel, HubSpot (Q3), or Salesforce (Q4) account. One click. Your data stays yours.",
  },
  {
    icon: Brain,
    title: "Train Your Agent",
    time: "5 minutes",
    description:
      "Upload your services, FAQs, booking rules, and qualification criteria. The AI learns your clinic's voice instantly.",
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
      "Under 3 seconds. Every channel. Every time. Day or night, weekday or holiday.",
  },
  {
    icon: Users,
    title: "Emotionally Intelligent Qualification",
    description:
      "AI asks the right questions without feeling like an interrogation. Adjusts tone based on specialty and patient sentiment. Scores leads as Hot, Warm, or Cold.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description:
      "Books consultations directly into your calendar. Handles rescheduling and confirmations. Sends reminders.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Engagement",
    description:
      "SMS, email, web chat, WhatsApp, Instagram DM, Facebook Messenger — one AI brain, every channel.",
  },
  {
    icon: Sparkles,
    title: "Specialty-Trained",
    description:
      "Pre-loaded with fertility, med spa, aesthetic, regenerative, and wellness conversation frameworks. Then fine-tuned on YOUR clinic's specific services, policies, and voice.",
  },
  {
    icon: MessageSquare,
    title: "Seamless Human Escalation",
    description:
      "When a patient needs a human, your staff gets alerted on desktop or mobile with the full conversation. The patient never starts over.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    description:
      "All data encrypted. BAA available. Built for healthcare.",
  },
  {
    icon: Inbox,
    title: "Real-Time Inbox",
    description:
      "Monitor every AI conversation live. Jump in anytime, or let the agent handle it end to end.",
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
      "Multi-channel (SMS, email, web chat, WhatsApp, social DMs)",
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
      "Native GoHighLevel integration today. HubSpot in Q3, Salesforce in Q4. Or use it inside GrowthOS as the full platform — no external CRM needed.",
  },
  {
    question: "How is this different from the chatbot that came with my CRM?",
    answer:
      "Most CRM chatbots match keywords to canned responses. The Cima AI Agent is trained on your specialty, adapts tone to patient emotion, nurtures across days/weeks, scores leads behaviorally, and hands off with full context. It's the difference between an FAQ page and an AI employee.",
  },
  {
    question: "Can my staff see what the AI is saying?",
    answer:
      "Every conversation appears in your real-time inbox. Staff can monitor, jump in, or review history. You're always in control.",
  },
  {
    question: "What if the AI can't answer something?",
    answer:
      "It recognizes when it's out of its depth and escalates to your team with full context. The patient never repeats themselves.",
  },
  {
    question: "Is this HIPAA compliant?",
    answer:
      "Yes. Encrypted in transit and at rest. BAA available.",
  },
  {
    question: "Can I customize what the AI says?",
    answer:
      "You control personality, tone, FAQs, booking rules, qualification criteria, and escalation triggers. It speaks in your voice.",
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

      {/* HERO */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl lg:max-w-5xl mx-auto"
          >
            <span className="inline-block bg-accent-orange/10 text-accent-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Now Available
            </span>
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              Your Clinic's AI Front Desk —{" "}
              <span className="text-gradient-accent">
                Responds in Seconds, Nurtures for Weeks, Hands Off With Full Context.
              </span>
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              Stop losing patients to slow response times. The Cima AI Agent
              handles inquiries, qualifies leads, and books appointments 24/7 —
              inside the CRM you already use, or inside GrowthOS.
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
                See it in Action
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROOF BAR */}
      <section className="py-16 md:py-20 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                stat: "78%",
                text: "of patients choose the first clinic to respond",
              },
              {
                stat: "24/7",
                text: "Coverage your staff physically can't provide",
              },
              {
                stat: "15-20",
                text: "potential patients lost per month to slow follow-up",
              },
              {
                stat: "< 3 sec",
                text: "average AI response time",
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

      {/* DIFFERENTIATOR — Not a Chatbot */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl lg:max-w-4xl mx-auto"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-6 text-center">
              Most "AI Chatbots" Are Glorified FAQ Pages.{" "}
              <span className="text-gradient-accent">This Is an AI Employee.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="card-premium p-6 border-l-4 border-muted-foreground/30">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">A chatbot:</p>
                <p className="text-body text-muted-foreground">
                  Matches keywords to canned responses. When it doesn't understand, it says "Let me connect you with a team member" — and that team member is unavailable until morning.
                </p>
              </div>
              <div className="card-premium p-6 border-l-4 border-accent-orange">
                <p className="text-sm font-semibold text-accent-orange uppercase tracking-wider mb-3">The Cima AI Agent:</p>
                <p className="text-body text-foreground">
                  Reads the emotional context of every message. Knows that a patient asking about egg freezing at 11 PM is probably anxious and needs reassurance, not a pricing sheet. Nurtures across days or weeks. Then hands off with the complete conversation history.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS — Setup */}
      <section id="how-it-works" className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Live in Under 10 Minutes. No Code. No IT.
            </h2>
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

      {/* CRM INTEGRATIONS */}
      <section className="py-12 md:py-16 bg-background">
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

      {/* FEATURES */}
      <section className="section-padding bg-tan">
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
              <span className="text-gradient-accent">Without the Hold Music.</span>
            </h2>
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

      {/* PRICING */}
      <section id="pricing" className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Simple Pricing. No Setup Fees. Cancel Anytime.
            </h2>

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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl lg:max-w-6xl mx-auto">
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
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-orange"
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

          {/* Full Platform upsell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl lg:max-w-5xl mx-auto mt-8"
          >
            <div className="rounded-xl p-6 bg-tan border border-border text-center">
              <p className="text-body font-semibold text-foreground mb-2">
                Full Platform — $999/month
              </p>
              <p className="text-body-sm text-muted-foreground">
                Everything in Pro + the entire GrowthOS platform: outreach engine, campaign builder, ad manager, landing pages, pipeline management, lead scoring, EHR integration, and more. For clinics that want the complete patient acquisition system.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-tan">
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

      {/* FINAL CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-heading-lg md:text-display text-white mb-4">
              Every Hour Without an AI Agent Is an Hour of Leads Going to Your Competitor.
            </h2>
            <p className="text-body-lg text-white/70 max-w-xl mx-auto mb-8">
              The clinic that responds first wins 78% of the time. Your AI agent responds in under 3 seconds.
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

      {/* CHECKOUT MODAL */}
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
                &times;
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
