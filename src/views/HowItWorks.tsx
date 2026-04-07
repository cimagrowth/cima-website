'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  DollarSign,
  MessageSquare,
  Zap,
  Users,
  Rocket,
  Brain,
  Shield,
  Layers,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HowItWorksPage = () => {
  const comparisonRows = [
    { metric: "Lead response time", before: "4-24 hours", after: "Under 5 seconds" },
    { metric: "Follow-up completion rate", before: "60%", after: "100%" },
    { metric: "Patient leakage", before: "35-40%", after: "Under 5%" },
    { metric: "Campaign launch time", before: "2-4 weeks (agency)", after: "2 minutes (AI)" },
    { metric: "Cost per campaign", before: "$5,000+ (agency)", after: "$0.28 (AI-generated)" },
    { metric: "Outreach cost per prospect", before: "$50+ (SDR hire)", after: "$0.07 (AI enrichment)" },
    { metric: "Channels monitored", before: "2-3 (email + phone)", after: "11 (every channel)" },
    { metric: "After-hours coverage", before: "None", after: "24/7/365" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light opacity-90" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            The Front End of Medicine Is{" "}
            <span className="text-accent-orange">Broken.</span> We Fix It.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            Clinics lose 30-40% of leads between first inquiry and booked
            appointment. Not because of bad marketing. Because of what happens AFTER
            someone raises their hand. GrowthOS is the AI-powered platform that
            closes that gap — instant response, emotionally intelligent nurture,
            and a full patient acquisition pipeline that runs whether your team is
            at the desk or not.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/demo">
              <Button variant="hero" size="lg" className="text-base md:text-lg px-8 group">
                See It In Action
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1: The Problem — With Numbers */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="max-w-3xl mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                You're Spending Thousands to Attract Patients —{" "}
                <span className="text-gradient-accent">Then Losing Them to Silence.</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground">
                <p>
                  You run Google Ads. You invest in SEO. You build referral programs. Leads come in.
                </p>
                <p>
                  Then they disappear. They fill out a form and never hear back. They call and get voicemail. They email and wait 3 days.
                </p>
                <p>
                  <strong className="text-foreground">This is patient leakage. And it's the most expensive problem your clinic doesn't track.</strong>
                </p>
              </div>
            </motion.div>

            {/* Metric table */}
            <motion.div variants={itemVariants} className="overflow-x-auto rounded-2xl border border-border shadow-card mb-12">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tl-2xl">Metric</th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold">Your Clinic Today</th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tr-2xl">Industry Average</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { metric: "Lead response time", yours: "4-24 hours", industry: "47 hours (Harvard Business Review)" },
                    { metric: "Follow-up completion rate", yours: "~60%", industry: "Under 50% at most clinics" },
                    { metric: "Patient leakage rate", yours: "Unknown (that's the problem)", industry: "35-40%" },
                    { metric: "Revenue lost per month", yours: "$50K+ for a mid-size clinic", industry: "$500K+/year" },
                  ].map((row, i, arr) => (
                    <tr key={row.metric} className={i < arr.length - 1 ? "border-b border-border" : ""}>
                      <td className="px-4 md:px-6 py-4 font-medium text-foreground">{row.metric}</td>
                      <td className="px-4 md:px-6 py-4 text-muted-foreground">{row.yours}</td>
                      <td className="px-4 md:px-6 py-4 text-muted-foreground">{row.industry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: Clock,
                  stat: "5 min",
                  label: "Respond within 5 minutes = 21x more likely to qualify the lead",
                },
                {
                  icon: Zap,
                  stat: "< 5 sec",
                  label: "GrowthOS average response time",
                },
                {
                  icon: DollarSign,
                  stat: "$500K+",
                  label: "Average revenue lost per year from patient leakage",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.stat}
                    variants={itemVariants}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-orange" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {item.stat}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">{item.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/demo">
                <Button variant="hero" size="lg" className="group">
                  Stop the Leak — Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The System — 4 Stages */}
      <section className="py-16 md:py-24 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                One Platform. Every Touchpoint.{" "}
                <span className="text-gradient-accent">AI-Powered.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                {
                  step: "Stage 1",
                  title: "Capture",
                  icon: MessageSquare,
                  description:
                    "AI chatbot on your website qualifies leads 24/7. Answers clinical questions with specialty-specific knowledge. Books appointments. Captures leads from ads, landing pages, forms, and social DMs. Every inquiry gets a response in seconds — not days.",
                },
                {
                  step: "Stage 2",
                  title: "Nurture",
                  icon: Brain,
                  description:
                    "AI generates personalized email, SMS, and WhatsApp sequences for every lead. Multi-step campaigns fire automatically based on the patient's behavior, engagement signals, and lead score. Not one follow-up — a 7-to-12 touchpoint nurture sequence that adapts tone and channel.",
                },
                {
                  step: "Stage 3",
                  title: "Convert",
                  icon: Users,
                  description:
                    "Unified inbox lets your team respond across all channels from one screen. Behavioral lead scoring shows who's Hot, Warm, and Cold. AI alerts your team before a warm lead goes cold. Full conversation history means staff steps in with context — the patient never repeats themselves.",
                },
                {
                  step: "Stage 4",
                  title: "Grow",
                  icon: Rocket,
                  description:
                    "AI Campaign Builder generates complete campaigns in 2 minutes — landing page, email drip, SMS sequence, and Google Ads copy. Outreach Engine enriches cold prospects and writes personalized 12-step sequences. Reactivation campaigns bring dormant leads back automatically.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    variants={itemVariants}
                    className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-accent-orange uppercase tracking-wider mb-1">
                          {item.step}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link href="/features">
                <Button variant="hero" size="lg" className="group">
                  See the Full Platform
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: What Makes GrowthOS Different */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                This Isn't Another CRM.{" "}
                <span className="text-gradient-accent">It's an AI Growth Engine Built for Healthcare.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                {
                  icon: Zap,
                  title: "AI Does the Work — You Don't \"Figure It Out\"",
                  description:
                    "Other platforms give you tools and leave you alone. GrowthOS generates campaigns, writes emails, enriches prospects, scores leads, manages ads, and monitors performance — autonomously. Your team focuses on patients.",
                },
                {
                  icon: Shield,
                  title: "Built for Healthcare From Day One",
                  description:
                    "HIPAA-aware. EHR integration (ModMed, FertEHR, HL7). Patient journey mapping designed for fertility, aesthetics, and wellness workflows. The AI understands that a scared fertility patient and a confident Botox client need completely different conversations.",
                },
                {
                  icon: TrendingDown,
                  title: "Not an Agency. Not Just Software.",
                  description:
                    "Agencies charge $10K/month and move slowly. DIY software overwhelms your team. GrowthOS gives you agency-level output at software pricing — powered by AI trained on 47 proprietary direct response frameworks developed across 100+ real client engagements.",
                },
                {
                  icon: Layers,
                  title: "Everything Connects",
                  description:
                    "Chatbot, inbox, pipeline, campaigns, ads, landing pages, and EHR — all sharing the same data. When a patient fills out a form, it creates a contact, scores the lead, adds them to a pipeline, enrolls them in a nurture sequence, and notifies your team. Automatically.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-orange" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link href="/demo">
                <Button variant="hero" size="lg" className="group">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Before/After Table */}
      <section className="py-16 md:py-24 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Changes When You{" "}
                <span className="text-gradient-accent">Close the Gap</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="overflow-x-auto rounded-2xl border border-border shadow-card mb-12">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tl-2xl">
                      Metric
                    </th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold">
                      Before GrowthOS
                    </th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold text-accent-orange rounded-tr-2xl">
                      After GrowthOS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.metric}
                      className={
                        i < comparisonRows.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <td className="px-4 md:px-6 py-4 font-medium text-foreground">
                        {row.metric}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-muted-foreground">
                        {row.before}
                      </td>
                      <td className="px-4 md:px-6 py-4 font-semibold text-accent-orange">
                        {row.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Link href="/demo">
                <Button variant="hero" size="lg" className="group">
                  Start Growing — Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Three Steps to Start */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Three Steps.{" "}
                <span className="text-gradient-accent">That's It.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {[
                {
                  number: "01",
                  title: "Book a Demo or Try the Interactive Demo",
                  description:
                    "See GrowthOS in action. Voice-guided tour, real features, sample data. Takes 15 minutes.",
                },
                {
                  number: "02",
                  title: "We Set Everything Up",
                  description:
                    "We build your brand profile, connect your EHR, import your data, configure your AI agent, and register your A2P messaging. You're live in 24-48 hours — not months.",
                },
                {
                  number: "03",
                  title: "Patients Start Flowing",
                  description:
                    "AI campaigns launch. Outreach sequences fire. Your chatbot qualifies leads 24/7. Your pipeline fills. Your team closes.",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  variants={itemVariants}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white text-xl font-bold mb-6 shadow-card">
                    {item.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    Book a Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                    See the Full Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksPage;
