'use client';

import { useState } from "react";
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
  Mail,
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
    text: "Generic agencies don't understand fertility compliance, healthcare keyword restrictions, or why your landing page needs to say different things to an egg freezing patient vs. an IUI patient",
  },
  {
    icon: CircleDollarSign,
    text: "You end up spending $3K-10K/month on ads, plus $2K-5K on the agency managing them, and can't tell what's actually driving booked appointments vs. tire-kicker clicks",
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
      "AI learns your clinic's voice, services, differentiators, and ideal patients.",
  },
  {
    icon: Link,
    title: "Connect Google & Facebook (One click)",
    description:
      "Your accounts stay 100% yours. We never lock you in.",
  },
  {
    icon: Rocket,
    title: "AI Generates, You Approve, It Launches",
    description:
      "AI generates headlines, keywords, audience signals, ad copy, and creative images (powered by Imagen). You review and approve. Campaigns launch with healthcare keyword compliance handled automatically, including Google's medical exemption process.",
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
      "Google restricts medical advertising terms. GrowthOS handles the two-step exemption process automatically. No rejected campaigns, no wasted time.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Creative (Imagen)",
    description:
      "AI creates ad images tailored to your specialty. No stock photos. No designer needed.",
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
      "Launch both campaign types from one dashboard with AI-optimized settings and sitelinks.",
  },
  {
    icon: MonitorSmartphone,
    title: "Facebook & Instagram Campaigns",
    description:
      "Create and manage campaigns for both platforms. AI handles creative, targeting, and budget allocation.",
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
      "Live dashboard plus one-click editorial-quality reports with campaign verdicts, AI insights, 30-day projections, and a full log of every optimization the system made.",
  },
  {
    icon: Bot,
    title: "AI Optimization Agent",
    description:
      "Nightly AI engine scores every campaign 0-100, automatically increases budgets on winners, cuts spend on losers, and tracks the actual impact 7 days later. Full change log in your report.",
  },
  {
    icon: Palette,
    title: "Brand Voice Match",
    description:
      "Every ad sounds like your practice. AI learns your tone, positioning, and differentiators during brand intake.",
  },
];

const optimizationFeatures = [
  {
    icon: TrendingUp,
    title: "Reward Winners, Starve Losers",
    description:
      "The optimization engine scores every campaign nightly on a 0-100 scale. Top performers get automatic budget increases. Underperformers get cut, and you see exactly why in your report.",
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
      "Seven days after every change, the engine measures whether it actually worked. Your report shows: \"We increased this budget → projected +6 conversions → actual: +8.\" That's accountability most agencies can't match.",
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
    title: "Increased Leads-Search-English budget",
    change: "$10/day → $40/day",
    reason: "Lowest CPA in account ($13.51), impression-constrained",
    note: "Projected: +6 conversions/week",
  },
  {
    timestamp: "Apr 15 · 2:04 AM",
    status: "cut",
    title: "Cut PMAX · IVF · Bay Area budget",
    change: "$12/day → $6/day",
    reason: "21 days, $180 spend, 0 conversions",
    note: "Status: Auto-executed",
  },
  {
    timestamp: "Apr 15 · 2:05 AM",
    status: "pending",
    title: "Pending approval: Pause Leads-Search-Korean",
    change: "$10/day → Paused",
    reason: "No landing page, 0 conversions in 30 days",
    note: "",
  },
];

const reportTypes = [
  {
    icon: FileText,
    title: "Campaign Report",
    badge: "Included in all plans",
    bullets: [
      "Per-campaign performance with spend, clicks, CTR, conversions, CPA",
      "Daily trend chart",
      "Campaign verdicts: Winner / Watch / Cut",
      "Full log of every change the optimization engine made",
    ],
    quote: "\"What did my ads do this month?\" Answered in 10 seconds.",
  },
  {
    icon: LineChart,
    title: "Advanced Report",
    badge: "Included in all plans",
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
    { label: "Avg response time to ad inquiries", value: "4.2 hours" },
    { label: "Monthly wasted ad spend (non-converting campaigns)", value: "$1,800" },
    { label: "Time spent reviewing ad performance", value: "6 hrs/week" },
    { label: "Report quality", value: "Screenshot of Google Ads Manager" },
  ],
  after: [
    { label: "Avg response time", value: "3 seconds", sub: "AI chatbot + ads = instant" },
    { label: "Monthly wasted spend", value: "Automatically cut", sub: "by optimization engine" },
    { label: "Time spent reviewing performance", value: "2 minutes", sub: "one-click report" },
    { label: "Report quality", value: "Client-ready document", sub: "with projections & insights" },
  ],
};

const specialties = [
  {
    key: "fertility",
    label: "Fertility & IVF",
    icon: Baby,
    tagline: "Reach patients at their most important moment, with copy that balances hope and clinical credibility.",
    headlines: [
      "Ready to Start Your Family? World-Class IVF. Success Rates Above National Average",
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
      "Look 10 Years Younger: Botox & Fillers Starting at $199",
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
      "Yes, you'll connect your existing account. Don't have one? We'll help you set one up during onboarding.",
  },
  {
    question: "Can I use my own landing pages?",
    answer:
      "Yes! Build landing pages right inside the platform with our AI-powered page builder, or paste any external URL.",
  },
  {
    question: "What about Facebook/Instagram?",
    answer:
      "Fully supported. Create campaigns for both platforms from one dashboard.",
  },
  {
    question: "How is this different from hiring an agency?",
    answer:
      "Agencies take weeks to launch and often control your ad accounts. Our AI generates campaigns in minutes, and you keep full control of your accounts. Pricing is tailored to your clinic and shared in your demo.",
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
    icon: Mail,
    title: "AI Outreach",
    description: "Find and nurture prospects with AI-enriched, personalized 12-step email sequences.",
  },
  {
    icon: Sparkles,
    title: "Full GrowthOS",
    description: "Landing pages, campaigns, pipeline, inbox, lead scoring, EHR integration: the complete patient acquisition operating system. All your ad data carries over.",
  },
];

const AdsPage = () => {
  const [activeSpecialty, setActiveSpecialty] = useState("fertility");

  return (
    <>

      {/* ────────── HERO ────────── */}
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
                AI-Powered Google & Facebook Ads
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-[340] tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6"
            >
              Let AI Run Your Ads.{" "}
              <span className="italic text-clay">Built for Healthcare.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto"
            >
              AI builds, launches, and optimizes your Google and Facebook ad
              campaigns, with healthcare compliance built in, so you get more
              booked consultations without touching Ads Manager.
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
              Included in GrowthOS Growth and available with the Cima AI Agent Pro plan
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground">
              Running Ads for a Medical Practice Is a Specialized Skill. Most Agencies Don't Have It.
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
                <p className="text-body text-muted-foreground">{point.text}</p>
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              From Brand Intake to Live Campaigns in Under an Hour.
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground">
              Everything to Run Ads That Actually Convert Patients. Not Just Clicks.
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
                  {feat.description}
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Your Ads Get Smarter Every Night While You Sleep.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Most platforms launch your ads and walk away. GrowthOS watches every
              campaign, every day, and automatically adjusts budgets, pauses waste,
              and doubles down on what's converting. No agency. No manual reviews.
              No wasted spend.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            {/* Left — feature blocks */}
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
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right — Engine Activity mock card */}
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
                        <span className="text-white font-medium leading-snug">
                          {entry.title}
                        </span>
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              One-Click Reports That Would Take an Agency Weeks.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Generate client-ready Google Ads reports in seconds. Not spreadsheets.
              Editorial-quality documents with campaign breakdowns, AI insights,
              change logs, and 30-day projections.
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

          {/* Contrast callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 max-w-5xl mx-auto"
          >
            <div className="relative rounded-xl2 p-8 md:p-10 overflow-hidden bg-teal text-paper shadow-[var(--shadow)]">
              <div className="relative z-10 grid md:grid-cols-2 gap-8">
                <div>
                  <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-sand/70 mb-3">
                    What GoHighLevel gives you
                  </p>
                  <p className="text-heading-sm text-paper/80">
                    A dashboard with numbers.
                  </p>
                </div>
                <div>
                  <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-sand mb-3">
                    What GrowthOS gives you
                  </p>
                  <p className="text-heading-sm text-paper">
                    A document you'd hand to your board, your investors, or your
                    partner. With projections, AI insights, and a record of every
                    optimization we made on your behalf.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground">
              What Happens When AI Manages Your Ad Spend.
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
            The AI doesn't just run your ads. It runs your ads, monitors your ads,
            optimizes your ads, and proves they're working. Every single month.
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              AI Ads Tailored to Your Practice
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
                    ? "bg-clay text-paper shadow-[var(--shadow-sm)]"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <spec.icon className="w-4 h-4" />
                {spec.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Part of the GrowthOS Growth Plan.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              AI Ads is built into the GrowthOS Growth plan, and it is available
              with the Cima AI Agent Pro plan. Your ad accounts always stay
              yours, and we never lock you in. Pricing is tailored to your clinic
              and shared in your demo.
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

      {/* ────────── VS AGENCY COMPARISON ────────── */}
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
              The Comparison
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Why Clinics Switch From Agencies to Cima AI Ads
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto rounded-2xl border border-border shadow-card max-w-3xl lg:max-w-5xl mx-auto"
          >
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-teal text-paper">
                  <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tl-2xl"></th>
                  <th className="text-left px-4 md:px-6 py-4 font-semibold">Marketing Agency</th>
                  <th className="text-left px-4 md:px-6 py-4 font-semibold text-sand rounded-tr-2xl">Cima AI Ads</th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {[
                  { label: "Campaign launch time", agency: "2-4 weeks", cima: "Under 1 hour" },
                  { label: "Healthcare compliance", agency: "Manual (error-prone)", cima: "Automatic" },
                  { label: "Ad account ownership", agency: "Often agency-controlled", cima: "Always yours" },
                  { label: "Landing pages", agency: "Extra cost", cima: "Included" },
                  { label: "Reporting", agency: "Monthly PDF", cima: "Real-time dashboard" },
                ].map((row, i, arr) => (
                  <tr key={row.label} className={i < arr.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 md:px-6 py-4 font-medium text-foreground">{row.label}</td>
                    <td className="px-4 md:px-6 py-4 text-muted-foreground">{row.agency}</td>
                    <td className="px-4 md:px-6 py-4 font-semibold text-accent-orange">{row.cima}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
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
                <p className="text-body text-muted-foreground">{item.answer}</p>
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
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-paper mb-4">
              Every Dollar of Ad Spend Without AI Optimization Is a Dollar Half-Wasted.
            </h2>
            <p className="text-body-lg text-paper/80 mb-10 max-w-xl mx-auto">
              Join clinics that launch campaigns in minutes, not weeks, and
              know exactly which dollars drive booked appointments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button asChild variant="hero" size="xl" className="group">
                <a href="/demo">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
            <p className="text-body-sm text-paper/60">
              Questions? Email brandon@cimagrowth.com
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdsPage;
