'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  MessageSquare,
  Calendar,
  Users,
  Brain,
  ShieldCheck,
  Inbox,
  Globe,
  ChevronDown,
  Plug,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AI_AGENT_EXAMPLE } from "@/content/specialty-pages";
import { useSpecialty } from "@/contexts/SpecialtyContext";
import SpecialtyText from "@/components/specialty/SpecialtyText";

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
    description:
      "Link your HubSpot, Salesforce or GoHighLevel account. Your data stays yours.",
  },
  {
    icon: Brain,
    title: "Train Your AI Front Desk",
    description:
      "Upload your services, FAQs, booking rules, and qualification criteria. The AI learns your clinic's tone and wording.",
  },
];

const integrations = [
  { name: "GoHighLevel" },
  { name: "HubSpot" },
  { name: "Salesforce" },
];

const features = [
  {
    icon: Clock,
    title: "24/7 Instant Response",
    description:
      "Replies in seconds on every channel. Day or night, weekday or holiday.",
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
      "SMS, email, web chat, WhatsApp, Instagram DM, Facebook Messenger, one AI brain, every channel.",
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


const faqItems = [
  {
    question: "Does this work with my CRM?",
    answer:
      "Connects to HubSpot, Salesforce or GoHighLevel. Or use it inside GrowthOS as the full platform, no external CRM needed.",
  },
  {
    question: "How is this different from the chatbot that came with my CRM?",
    answer:
      "Most CRM chatbots match keywords to canned responses. The GrowthOS AI front desk is trained on your specialty, adapts tone to patient emotion, nurtures across days/weeks, scores leads behaviorally, and hands off with full context. It's the difference between an FAQ page and an AI assistant your team configures.",
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
      "You control personality, tone, FAQs, booking rules, qualification criteria, and escalation triggers. It uses your clinic's tone and wording.",
  },
];

export interface AIAgentFigures {
  medianSeconds: number;
  clinics: string;
  conversations: string;
  windowDays: number;
}

const AIAgent = ({ figures }: { figures: AIAgentFigures }) => {
  const { specialty } = useSpecialty();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>

      {/* HERO */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl lg:max-w-5xl mx-auto"
          >
            <span className="inline-block bg-paper border border-sand shadow-[var(--shadow-sm)] text-clay font-ui text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Now Available
            </span>
            <h1 className="font-display font-semibold tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6">
              Every patient inquiry answered, qualified and booked{" "}
              <span className="text-clay">in seconds, day or night.</span>
            </h1>
            <p className="text-body-lg text-teal-deep/80 max-w-3xl mx-auto mb-10">
              AI trained on your clinic replies on text, chat, email, WhatsApp and
              social, books consults into your calendar, and hands off to your team
              with the full conversation, inside GrowthOS or the CRM you already use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="group">
                <a href="/demo">
                  Book a demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
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
      <section className="section-padding bg-tan">
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
                stat: `${figures.medianSeconds} sec`,
                text: "median GrowthOS first reply to a patient message",
              },
              {
                stat: figures.clinics,
                text: "clinic accounts live in 5 countries",
              },
              {
                stat: figures.conversations,
                text: `patient conversations handled in the last ${figures.windowDays} days`,
              },
              {
                stat: "24/7",
                text: "24/7 replies to your patients, supervised by your staff",
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
          <p className="mt-8 text-center text-xs text-teal-deep/75">
            Live GrowthOS figures, active clinic accounts only, last {figures.windowDays} days.
          </p>
        </div>
      </section>

      {/* DIFFERENTIATOR: Not a Chatbot */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl lg:max-w-4xl mx-auto"
          >
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-6 text-center">
              Not a FAQ chatbot.{" "}
              <span className="text-clay">An AI front desk your team controls.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="card-premium p-6 border-l-4 border-muted-foreground/30">
                <p className="font-ui text-sm font-semibold text-muted-foreground uppercase tracking-[.16em] mb-3">A chatbot:</p>
                <p className="text-body text-muted-foreground">
                  Matches keywords to canned responses. When it doesn't understand, it says "Let me connect you with a team member," and that team member is unavailable until morning.
                </p>
              </div>
              <div className="card-premium p-6 border-l-4 border-clay">
                <p className="font-ui text-sm font-semibold text-clay uppercase tracking-[.16em] mb-3">The GrowthOS AI front desk:</p>
                <p data-sv-region className="text-body text-foreground">
                  {AI_AGENT_EXAMPLE[specialty]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS: Setup */}
      <section id="how-it-works" className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              No Code. No IT.
            </h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
                <span className="font-ui text-xs font-semibold text-clay uppercase tracking-[.16em]">
                  Step {i + 1}
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
      <section className="section-padding bg-background">
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
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Everything Your Front Desk Does,{" "}
              <span className="text-clay">Without the Hold Music.</span>
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
                  <SpecialtyText text={feature.description} />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full platform */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Full Platform upsell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl lg:max-w-5xl mx-auto mt-8"
          >
            <div className="rounded-xl2 p-6 bg-paper border border-sand shadow-[var(--shadow-sm)] text-center">
              <p className="text-body font-semibold text-foreground mb-2">
                Want the full platform?
              </p>
              <p className="text-body-sm text-muted-foreground mb-4">
                GrowthOS adds pipelines, scheduling, forms, consent, reporting and EHR integration on top of the AI front desk. Pricing depends on your clinic and is shared in your demo. Monthly, six-month and annual terms.
              </p>
              <Button asChild variant="hero-outline" size="lg" className="group">
                <a href="/demo">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
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
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
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
                    <SpecialtyText text={item.answer} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-teal text-paper">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-paper mb-4">
              Every Hour Without an AI Front Desk Is an Hour of Leads Going to Your Competitor.
            </h2>
            <p className="text-body-lg text-paper/70 max-w-xl mx-auto mb-8">
              The clinic that responds first usually wins the patient. Your AI front desk responds in seconds.
            </p>
            <Button
              asChild
              variant="hero"
              size="lg"
              className="group"
            >
              <a href="/demo">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <p className="text-sm text-paper/75 mt-4">
              Monthly, six-month and annual terms.
            </p>
          </motion.div>
        </div>
      </section>

    </>
  );
};

export default AIAgent;
