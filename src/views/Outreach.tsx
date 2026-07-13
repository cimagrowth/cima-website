'use client';

import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Brain,
  Send,
  Search,
  Mail,
  Mic,
  MessageSquare,
  Users,
  BarChart3,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

const stats = [
  { value: "40%", label: "More replies vs. generic outreach" },
  { value: "12", label: "Personalized follow-ups per prospect, each with a different angle" },
  { value: "Usage-based", label: "Pay only for the prospects you enrich" },
  { value: "100%", label: "Personalized, no templates, no mail merge" },
];

const steps = [
  {
    icon: Upload,
    title: "Import Prospects",
    description:
      "Upload a CSV or add contacts manually. Just include a website URL — the AI handles the rest.",
  },
  {
    icon: Brain,
    title: "AI Enriches and Writes",
    description:
      "Every prospect's website gets scraped, analyzed for pain points and personalization hooks, and matched with the best outreach angle. Then AI writes a custom 12-step cold email sequence — in your voice, with your positioning, using a different persuasion angle on every follow-up.",
  },
  {
    icon: Send,
    title: "Send and Manage",
    description:
      "Launch sequences with per-email click tracking. Track opens, replies, and conversions. Manage every conversation from a unified inbox with CC/BCC support. Toggle formal or informal tone per campaign. Configure CTA as link or reply.",
  },
];

const features = [
  {
    icon: Search,
    title: "AI Prospect Enrichment (Gemini 2.5 Flash)",
    description:
      "Website scraping + AI analysis identifies pain points, competitive positioning, tech stack, and the best angle for your first email. Not a template — a strategy per prospect.",
  },
  {
    icon: Mail,
    title: "12-Step Personalized Sequences",
    description:
      "Each prospect gets a unique sequence. Every follow-up uses a different angle — not just \"checking in.\" All written in your configured voice.",
  },
  {
    icon: Mic,
    title: "Voice Configuration",
    description:
      "Define tone, authority level, and positioning once. Toggle formal/informal per campaign. Every email sounds like you wrote it.",
  },
  {
    icon: MessageSquare,
    title: "Unified Inbox",
    description:
      "Email, SMS, and WhatsApp in one place. Full conversation history. CC/BCC support. Reply without switching tabs.",
  },
  {
    icon: Users,
    title: "Contact & Company Management",
    description:
      "Full CRM with companies, contacts, tags, notes, and activity timeline. Import from CSV. Merge fields auto-populate.",
  },
  {
    icon: BarChart3,
    title: "Outreach Analytics",
    description:
      "Enrichment progress, delivery rates, opens, replies, click tracking, and pipeline conversion — across your entire prospect list.",
  },
];

const faqItems = [
  {
    question: "What's included?",
    answer:
      "The full outreach platform: AI prospect enrichment, 12-step personalized sequences, brand voice configuration, unified inbox, contact management, analytics, and CSV import. You pay only for the prospects you enrich.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Simple usage-based pricing: pay only for the prospects you enrich. No monthly fee, no contracts. Enrichment stops when you want it to, so there are no surprise charges.",
  },
  {
    question: "Can I upgrade to the full GrowthOS platform later?",
    answer:
      "Yes. Upgrade anytime to GrowthOS for AI campaign building, landing pages, Google Ads management, pipeline deals, and more. Your outreach data carries over seamlessly.",
  },
];

const Outreach = () => {
  return (
    <>

      {/* HERO */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl lg:max-w-5xl mx-auto text-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-sand shadow-[var(--shadow-sm)] text-clay font-ui text-body-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                AI-Powered B2B Outreach
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-[340] tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6"
            >
              Turn a Spreadsheet of Prospects Into a{" "}
              <span className="italic text-clay">Pipeline of Warm Conversations.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto"
            >
              Import your list. AI scrapes every prospect's website, identifies
              their pain points, and writes a personalized 12-step email
              sequence in your voice. You pay only for the prospects you enrich.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
              <Link href="/demo">
                <Button variant="hero" size="xl" className="group">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-body-sm text-teal-deep/80">
                No monthly fee. No contracts.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl lg:max-w-5xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center card-premium p-6 rounded-xl"
              >
                <p className="text-heading-lg text-accent-orange font-bold">
                  {stat.value}
                </p>
                <p className="text-body-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              How It Works
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Three Steps to a Full Pipeline
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-premium rounded-xl p-8 text-center relative"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="absolute top-4 right-4 text-body-sm font-bold text-accent-orange/40">
                  0{i + 1}
                </span>
                <h3 className="text-heading-sm text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/demo">
              <Button variant="hero" size="lg" className="group">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              What You Get
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground">
              Everything to Run Outreach at Scale — Without an Outreach Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl lg:max-w-6xl mx-auto">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mb-5">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-heading-sm text-foreground mb-3">
                  {feat.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              Pricing
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Simple, Usage-Based Pricing.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Pay only for the prospects you enrich. No monthly fee, no
              contracts. Scale up when it works, and never pay for volume you do
              not use.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-10"
          >
            <Link href="/demo">
              <Button variant="hero" size="lg" className="group">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* GrowthOS upsell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="rounded-xl2 p-6 bg-paper border border-sand shadow-[var(--shadow-sm)]">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                <p className="text-body text-muted-foreground">
                  <strong className="text-foreground">Ready for the full patient acquisition platform?</strong>{" "}
                  Upgrade to GrowthOS anytime. Your outreach data carries over seamlessly.
                </p>
              </div>
            </div>
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
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-premium p-6 rounded-xl"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {item.question}
                </h4>
                <p className="text-body text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-teal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-paper mb-4">
              Your Pipeline Won't Fill Itself.
            </h2>
            <p className="text-body-lg text-paper/80 mb-10 max-w-xl mx-auto">
              An SDR sends generic templates and takes months to ramp. The
              Outreach Engine writes sequences that sound like you, and you pay
              only for the prospects you enrich.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/demo">
                <Button variant="hero" size="xl" className="group">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Outreach;
