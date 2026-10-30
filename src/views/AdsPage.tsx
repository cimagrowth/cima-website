'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  ShieldAlert,
  SlidersHorizontal,
  CircleDollarSign,
  ClipboardList,
  Link,
  Rocket,
  Pencil,
  Search,
  Target,
  LayoutDashboard,
  MonitorSmartphone,
  Bot,
  Globe,
  BarChart3,
  Palette,
  MessageSquare,
  Sparkles,
  Check,
  Baby,
  Syringe,
  HeartPulse,
  Dna,
  TrendingUp,
  ShieldCheck,
  Gauge,
  FileText,
  LineChart,
  CheckCircle2,
  Clock,
  XCircle,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADS_PAGE } from "@/content/specialty-pages";
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

const painPoints = [
  {
    icon: ShieldAlert,
    text: "Generic ad tools don't understand fertility compliance, healthcare keyword restrictions, or why your landing page needs to say different things to an egg freezing patient vs. an IUI patient",
  },
  {
    icon: CircleDollarSign,
    text: "You pay for ads but can't tell what's actually driving booked appointments vs. tire-kicker clicks",
  },
  {
    icon: SlidersHorizontal,
    text: "Google Ads Manager is built for marketers, not clinic owners",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Complete Your Brand Intake (15 minutes)",
    description:
      "AI learns your clinic's tone and wording, services, differentiators, and ideal patients.",
  },
  {
    icon: Link,
    title: "Connect Your Own Google & Meta Accounts (One click)",
    description:
      "Your clinic owns its ad accounts. GrowthOS connects to them, and your team stays in control.",
  },
  {
    icon: Rocket,
    title: "AI Drafts, Your Team Approves and Publishes",
    description:
      "AI drafts headlines, keywords, audience signals, ad copy, and AI-generated ad images. Your team reviews, approves and publishes in your own accounts, with healthcare keyword compliance checks built in, including Google's medical exemption process.",
  },
];

const features = [
  {
    icon: Pencil,
    title: "AI-Generated Ad Copy",
    description:
      "Specialty-specific copy for fertility, aesthetics, wellness, and regenerative services. Written to convert patients, not impressions.",
  },
  {
    icon: ShieldAlert,
    title: "Healthcare Keyword Compliance",
    description:
      "Google restricts medical advertising terms. GrowthOS handles the two-step exemption process automatically.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Ad Images",
    description:
      "AI-generated ad images tailored to your specialty, for your team to review. No stock photos. No designer needed.",
  },
  {
    icon: Target,
    title: "Smart Audience Targeting",
    description:
      "AI-built audience signals based on demographics, intent, behavior, and in-market signals for your specialty.",
  },
  {
    icon: LayoutDashboard,
    title: "Google Search + Performance Max",
    description:
      "Manage both campaign types in your own Google Ads account from one dashboard, with AI-suggested settings and sitelinks.",
  },
  {
    icon: MonitorSmartphone,
    title: "Facebook & Instagram Campaigns",
    description:
      "Create and manage campaigns in your own Meta account. AI suggests creative, targeting, and budget allocation for your team to approve.",
  },
  {
    icon: Globe,
    title: "AI Landing Page Builder",
    description:
      "Build high-converting landing pages using 37 evidence-based conversion rules. Custom subdomain included. Conversion tracking configured automatically.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Performance Dashboard",
    description:
      "Live dashboard plus one-click performance reports with campaign verdicts, AI insights, 30-day projections, and a log of every change in your account.",
  },
  {
    icon: Bot,
    title: "AI Optimization Assistant",
    description:
      "Scores every campaign 0-100 each night and applies budget rules you set, with caps, that suggest or apply changes in your own account. Tracks the actual impact 7 days later. Full change log in your report.",
  },
  {
    icon: Palette,
    title: "Your Clinic's Tone and Wording",
    description:
      "Drafts match your practice. AI learns your tone, positioning, and differentiators during brand intake.",
  },
];

const optimizationFeatures = [
  {
    icon: TrendingUp,
    title: "Budget Rules You Set",
    description:
      "Every campaign is scored nightly on a 0-100 scale. Budget rules you set, with caps, suggest or apply changes in your own account, and you see exactly why in your report.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Rails Built In",
    description:
      "Budget changes are capped at 25% per cycle. Campaigns are never deleted, only paused. And the system waits 14 full days before making its first move, so Google's ML has time to learn.",
  },
  {
    icon: Gauge,
    title: "Closed-Loop Impact Tracking",
    description:
      "Seven days after every change, GrowthOS measures whether it actually worked. Your report shows, for example: \"Budget rule applied: projected +6 booked consults, actual: +5.\"",
  },
];

type ActivityStatus = "success" | "pending" | "cut";

const activityFeed: {
  timestamp: string;
  status: ActivityStatus;
  title: string;
  change: string;
  reason: string;
  note: string;
}[] = [
  {
    timestamp: "Apr 15 · 2:04 AM",
    status: "success",
    title: "Budget rule applied: Leads-Search-English",
    change: "$40/day → $55/day",
    reason: "Lowest CPA in the account, limited by impressions",
    note: "Projected: +6 booked consults/week",
  },
  {
    timestamp: "Apr 15 · 2:04 AM",
    status: "cut",
    title: "Cut PMAX · IVF · Bay Area budget",
    change: "$55/day → $40/day",
    reason: "21 days of spend, no conversions",
    note: "Status: Applied by a rule your team approved",
  },
  {
    timestamp: "Apr 15 · 2:05 AM",
    status: "pending",
    title: "Pending approval: Pause Leads-Search-Korean",
    change: "$40/day → Paused",
    reason: "No landing page, no conversions in 21 days",
    note: "",
  },
];

const reportTypes = [
  {
    icon: FileText,
    title: "Campaign Report",
    badge: "Included in GrowthOS",
    bullets: [
      "Per-campaign performance with spend, clicks, CTR, conversions, CPA",
      "Daily trend chart",
      "Campaign verdicts: Winner / Watch / Cut",
      "Log of every change in your account, made by your team or by rules you approved",
    ],
    quote: "\"What did my ads do this month?\" Answered in seconds.",
  },
  {
    icon: LineChart,
    title: "Advanced Report",
    badge: "Included in GrowthOS",
    bullets: [
      "Everything in Campaign Report, plus:",
      "Geographic and service-line breakdowns",
      "AI-generated insights (what's winning, what's failing, what to do)",
      "30-day projections: current trajectory vs with planned optimizations",
      "Planned changes with timelines and projected impact",
      "Transparent assumptions block: shows the math, not just the answer",
    ],
    quote: "\"What should I do next?\" The report tells you.",
  },
];

const beforeAfter = {
  before: [
    { label: "Wasted ad spend (non-converting campaigns)", value: "Unknown until someone checks" },
    { label: "Time spent reviewing ad performance", value: "Hours every week" },
  ],
  after: [
    { label: "Monthly wasted spend", value: "Flagged daily", sub: "with fixes your team approves" },
    { label: "Time spent reviewing performance", value: "One click", sub: "one-click report" },
  ],
};

const specialties = [
  {
    key: "fertility",
    label: "Fertility & IVF",
    icon: Baby,
    tagline: "Reach patients at their most important moment, with copy that balances hope and clinical credibility.",
    headlines: [
      "Ready to Start Your Family? Personal IVF Care From Your First Visit",
      "Egg Freezing on Your Terms: Free Consultation, Flexible Financing",
      "PGT Testing for Peace of Mind. Book Your Fertility Assessment Today",
    ],
  },
  {
    key: "aesthetics",
    label: "Aesthetics & Med Spa",
    icon: Syringe,
    tagline: "Drive bookings with urgency and aspiration. AI knows the difference between Botox and a body contouring campaign.",
    headlines: [
      "Natural-Looking Botox & Fillers. Book a Free Consultation",
      "Body Contouring Without Surgery. See Results in One Session",
      "Skin Rejuvenation Specialists: Free Consultation This Week Only",
    ],
  },
  {
    key: "wellness",
    label: "Wellness & Hormone Therapy",
    icon: HeartPulse,
    tagline: "Speak to patients exploring options: educational tone that builds trust before asking for the booking.",
    headlines: [
      "Tired of Feeling Tired? Hormone Optimization Changed Everything",
      "IV Therapy for Peak Performance. Walk-Ins Welcome",
      "Medical Weight Management: Doctor-Supervised, Real Results",
    ],
  },
  {
    key: "regen",
    label: "Regenerative Medicine",
    icon: Dna,
    tagline: "Position cutting-edge treatments with authority. AI highlights clinical differentiation.",
    headlines: [
      "PRP Joint Therapy: Avoid Surgery, Recover Faster",
      "Stem Cell Treatments for Chronic Pain. Schedule Your Evaluation",
      "Sports Medicine Meets Regenerative Science. Athletes Trust Us",
    ],
  },
];

const faqItems = [
  {
    question: "Do I need a Google Ads account?",
    answer:
      "Yes, you'll connect your clinic's own account. Don't have one? Guided setup walks you through creating an ad account.",
  },
  {
    question: "Can I use my own landing pages?",
    answer:
      "Yes! Build landing pages right inside the platform with our AI-powered page builder, or paste any external URL.",
  },
  {
    question: "What about Facebook/Instagram?",
    answer:
      "Fully supported. Connect your clinic's own Meta account and manage campaigns for both platforms from one dashboard.",
  },
  {
    question: "Who controls the ad accounts?",
    answer:
      "Your clinic does. GrowthOS connects to your own Google and Meta accounts, AI drafts campaigns in minutes, and your team approves every change. Pricing is tailored to your clinic and shared in your demo.",
  },
  {
    question: "Can I upgrade to GrowthOS later?",
    answer:
      "Yes. Your brand intake, ad accounts, and campaign history all carry over.",
  },
  {
    question: "What specialties does this work for?",
    answer:
      "Fertility/IVF, aesthetics/med spa, wellness, regenerative medicine, hormone therapy, and more.",
  },
];

const upgradePaths = [
  {
    icon: MessageSquare,
    title: "AI Agent",
    description: "Convert website visitors into booked consultations 24/7 with emotionally intelligent conversation.",
  },
  {
    icon: Sparkles,
    title: "Full GrowthOS",
    description: "Landing pages, campaigns, pipeline, inbox, lead scoring, EHR integration: all of GrowthOS. All your ad data carries over.",
  },
];

const AdsPage = () => {
  const [activeSpecialty, setActiveSpecialty] = useState("fertility");
  const { specialty } = useSpecialty();
  const adsCopy = ADS_PAGE[specialty];

  // The headline tabs start on the visitor's specialty. Clicking a tab here
  // does not change the site specialty.
  useEffect(() => {
    setActiveSpecialty(specialty === "regenerative" ? "regen" : specialty);
  }, [specialty]);

  return (
    <>

      {/* ────────── HERO ────────── */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="visible"
            className="max-w-3xl lg:max-w-5xl mx-auto text-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-sand shadow-[var(--shadow-sm)] text-clay font-ui text-body-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                Ads Manager for Google & Meta
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-semibold tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6"
            >
              Know which ads bring in booked patients,{" "}
              <span className="text-clay">not just clicks.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto"
            >
              Run Google and Meta ads in your clinic&apos;s own accounts. GrowthOS
              drafts campaigns, your team approves them, and you see which ad spend
              turned into booked consults.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="/demo">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-body-sm text-teal-deep/80 mt-4">
              Included in GrowthOS
            </motion.p>
            <motion.p variants={itemVariants} className="text-body-sm mt-2">
              <a href="/hipaa-safe-tracking" className="font-semibold text-teal underline underline-offset-2">
                How tracking works without sending health data
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ────────── PROBLEM ────────── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              The Problem
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground">
              See which ads bring in booked consults.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl lg:max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-premium rounded-xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-5">
                  <point.icon className="w-7 h-7 text-white" />
                </div>
                {i === 0 ? (
                  <p data-sv-region className="text-body text-muted-foreground">{adsCopy.painPoint}</p>
                ) : (
                  <p className="text-body text-muted-foreground">{point.text}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── HOW IT WORKS ────────── */}
      <section className="section-padding bg-background">
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
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              From Brand Intake to Approved Campaigns.
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
            <Button asChild variant="hero" size="lg" className="group">
              <a href="/demo">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── FEATURES ────────── */}
      <section className="section-padding bg-tan relative overflow-hidden">
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
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground">
              Everything Your Team Needs to Manage Ads That Convert Patients. Not Just Clicks.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl lg:max-w-6xl mx-auto">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mb-5">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-heading-sm text-foreground mb-3">
                  {feat.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  <SpecialtyText text={feat.description} />
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
            <Button asChild variant="hero" size="lg" className="group">
              <a href="/demo">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── AUTO-OPTIMIZATION ENGINE ────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-14"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              How It's Different
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Your Ads Are Checked Every Night.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Your team manages your ads. GrowthOS monitors them and recommends changes
              you approve, flags wasted spend, and applies only the budget rules
              your team has set.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            {/* Left: feature blocks */}
            <div className="space-y-6">
              {optimizationFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-premium rounded-xl p-6 md:p-7 flex gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center flex-shrink-0">
                    <feat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-sm text-foreground mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-body text-muted-foreground">
                      <SpecialtyText text={feat.description} />
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Engine Activity mock card */}
            <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-teal-deep/75">Illustrative example</p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-teal rounded-xl2 p-6 md:p-7 shadow-[var(--shadow)] border border-paper/10"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
                  <Moon className="w-3.5 h-3.5" />
                  engine-activity.log
                </div>
              </div>

              <div className="space-y-5 font-mono text-sm">
                {activityFeed.map((entry, i) => {
                  const StatusIcon =
                    entry.status === "success"
                      ? CheckCircle2
                      : entry.status === "cut"
                      ? XCircle
                      : Clock;
                  const statusColor =
                    entry.status === "success"
                      ? "text-emerald-400"
                      : entry.status === "cut"
                      ? "text-red-400"
                      : "text-amber-400";
                  const borderColor =
                    entry.status === "success"
                      ? "border-emerald-400/60"
                      : entry.status === "cut"
                      ? "border-red-400/60"
                      : "border-amber-400/60";

                  return (
                    <div
                      key={i}
                      className={`pl-4 border-l-2 ${borderColor}`}
                    >
                      <div className="text-white/40 text-xs mb-1.5">
                        [{entry.timestamp}]
                      </div>
                      <div className={`flex items-start gap-2 ${statusColor} mb-1.5`}>
                        <StatusIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {entry.status === "cut" ? (
                          <span data-sv-region className="text-white font-medium leading-snug">
                            {adsCopy.cutTitle}
                          </span>
                        ) : (
                          <span className="text-white font-medium leading-snug">
                            {entry.title}
                          </span>
                        )}
                      </div>
                      <div className="text-white/70 pl-6 leading-relaxed">
                        {entry.change}
                      </div>
                      <div className="text-white/50 pl-6 leading-relaxed text-xs mt-1">
                        Reason: {entry.reason}
                      </div>
                      {entry.note && (
                        <div className={`pl-6 text-xs mt-1 ${statusColor}`}>
                          {entry.note}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button asChild variant="hero" size="lg" className="group">
              <a href="/demo">
                See This Working on Your Account
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── REPORTING ────────── */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-14"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              Proof, Not Promises
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              One-click performance reports for your ad accounts.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Generate ad reports in seconds. Not spreadsheets. Documents with
              campaign breakdowns, AI insights, change logs, and 30-day projections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reportTypes.map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-premium rounded-2xl p-8 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center flex-shrink-0">
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-sm text-foreground leading-tight">
                      {report.title}
                    </h3>
                    <span className="text-body-sm text-accent-orange font-semibold">
                      {report.badge}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {report.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-accent-orange/10">
                        <Check className="w-2.5 h-2.5 text-accent-orange" />
                      </div>
                      <span className="text-body-sm text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-body italic text-muted-foreground border-l-4 border-accent-orange pl-4">
                  {report.quote}
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
            <Button asChild variant="hero" size="lg" className="group">
              <a href="/demo">
                Generate Your First Report
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── BEFORE & AFTER ────────── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-14"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              Real Results
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground">
              What Changes When Your Team Has One Ad Dashboard.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-premium rounded-2xl p-8 border-l-4 border-muted-foreground/30"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-body-sm font-semibold mb-6">
                Before GrowthOS
              </span>
              <div className="space-y-5">
                {beforeAfter.before.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 pb-4 border-b border-border last:border-b-0 last:pb-0"
                  >
                    <span className="text-body-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-heading-sm text-foreground font-semibold">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-premium rounded-2xl p-8 border-l-4 border-accent-orange relative"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-body-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                After GrowthOS
              </span>
              <div className="space-y-5">
                {beforeAfter.after.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 pb-4 border-b border-border last:border-b-0 last:pb-0"
                  >
                    <span className="text-body-sm text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-heading-sm text-foreground font-semibold">
                      {row.value}
                    </span>
                    {row.sub && (
                      <span className="text-body-sm text-accent-orange">
                        {row.sub}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-body-lg text-muted-foreground mt-12 max-w-3xl mx-auto"
          >
            Your team manages your ads. GrowthOS monitors them and recommends changes
            you approve, and shows whether they are working. Every single month.
          </motion.p>
        </div>
      </section>

      {/* ────────── SPECIALTIES (TABBED) ────────── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              Built For Your Specialty
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Ad Drafts Tailored to Your Practice
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              See example AI-generated headlines for your specialty.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {specialties.map((spec) => (
              <button
                key={spec.key}
                onClick={() => setActiveSpecialty(spec.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-body-sm font-semibold transition-all duration-300 ${
                  activeSpecialty === spec.key
                    ? "bg-clay-deep text-paper shadow-[var(--shadow-sm)]"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <spec.icon className="w-4 h-4" />
                {spec.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div data-sv-region style={{ display: "contents" }}>
            {specialties
              .filter((spec) => spec.key === activeSpecialty)
              .map((spec) => (
                <motion.div
                  key={spec.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-3xl lg:max-w-5xl mx-auto"
                >
                  <p className="text-center text-body-lg text-muted-foreground mb-8">
                    {spec.tagline}
                  </p>
                  <div className="space-y-4">
                    {spec.headlines.map((headline, i) => (
                      <div
                        key={i}
                        className="card-premium rounded-xl p-6 border-l-4 border-accent-orange"
                      >
                        <p className="text-body font-medium text-foreground">
                          "{headline}"
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ────────── WHERE IT LIVES ────────── */}
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
              Where It Lives
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Included in GrowthOS.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Ads Manager is built into GrowthOS. Your ad accounts always stay
              yours. Pricing depends on your clinic and is shared in your demo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center"
          >
            <Button asChild variant="hero" size="lg" className="group">
              <a href="/demo">
                Book a Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── UPGRADE PATH ────────── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4 block">
              Grow With Us
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Ads Are Just the Beginning.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl lg:max-w-5xl mx-auto">
            {upgradePaths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-premium rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-heading-sm text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
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
                <p className="text-body text-muted-foreground"><SpecialtyText text={item.answer} /></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── FINAL CTA ────────── */}
      <section className="section-padding bg-teal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-sand mb-4 block">
              Ready?
            </span>
            <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-paper mb-4">
              Know which ad dollars bring in booked consults.
            </h2>
            <p className="text-body-lg text-paper/80 mb-10 max-w-xl mx-auto">
              See your own ad accounts, every change your team approves, and the
              booked appointments behind every dollar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="/demo">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdsPage;
