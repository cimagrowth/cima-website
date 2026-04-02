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
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import AdsIntakeModal, { type AdsPlanType } from "@/components/checkout/AdsIntakeModal";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/components/seo/schemas";

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
    text: "Generic agencies don't understand fertility/aesthetics compliance",
  },
  {
    icon: SlidersHorizontal,
    text: "Google Ads Manager is built for marketers, not clinic owners",
  },
  {
    icon: CircleDollarSign,
    text: "You're spending $3K-10K/mo on ads but can't tell what's working",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Complete Your Brand Intake",
    description:
      "Our AI learns your clinic's voice, services, and ideal patients in 15 minutes.",
  },
  {
    icon: Link,
    title: "Connect Google & Facebook",
    description:
      "One-click connection. Your accounts stay 100% yours.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimize",
    description:
      "AI generates headlines, keywords, audience signals, and ad copy. Review, approve, launch.",
  },
];

const features = [
  {
    icon: Pencil,
    title: "AI-Generated Ad Copy",
    description:
      "Custom ad copy for fertility, aesthetics, wellness, and regen services — written to convert patients, not clicks.",
  },
  {
    icon: Search,
    title: "Automated Keyword Research",
    description:
      "AI finds high-intent keywords and manages negative keywords so you stop paying for irrelevant traffic.",
  },
  {
    icon: Target,
    title: "Smart Audience Targeting",
    description:
      "AI-built audience signals reach the right patients based on demographics, intent, and behavior.",
  },
  {
    icon: LayoutDashboard,
    title: "Google Search & Performance Max",
    description:
      "Launch Search and Performance Max campaigns from one dashboard with AI-optimized settings.",
  },
  {
    icon: MonitorSmartphone,
    title: "Facebook & Instagram Campaigns",
    description:
      "Create and manage campaigns for both platforms from one place. AI handles creative and targeting.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Performance Dashboard",
    description:
      "See clicks, conversions, cost-per-lead, and ROI at a glance. No more digging through Ads Manager.",
  },
  {
    icon: Bot,
    title: "AI Optimization Agent",
    description:
      "Automatic recommendations to improve bids, pause underperformers, and scale winners.",
  },
  {
    icon: Globe,
    title: "AI Landing Page Builder",
    description:
      "Build high-converting landing pages with AI. Custom subdomain included. No coding required.",
  },
  {
    icon: Sparkles,
    title: "Conversion Tracking Setup",
    description:
      "Pixel and conversion tracking configured automatically so you know exactly what's driving results.",
  },
  {
    icon: Palette,
    title: "Brand Intake & Voice Match",
    description:
      "Every ad sounds like YOUR practice. AI learns your tone, positioning, and differentiators.",
  },
];

const specialties = [
  {
    key: "fertility",
    label: "Fertility & IVF",
    icon: Baby,
    tagline: "Reach patients at their most important moment.",
    headlines: [
      "Ready to Start Your Family? World-Class IVF — Success Rates Above National Average",
      "Egg Freezing on Your Terms — Free Consultation, Flexible Financing",
      "PGT Testing for Peace of Mind — Book Your Fertility Assessment Today",
    ],
  },
  {
    key: "aesthetics",
    label: "Aesthetics & Med Spa",
    icon: Syringe,
    tagline: "Fill your appointment book with high-value patients.",
    headlines: [
      "Look 10 Years Younger — Botox & Fillers Starting at $199",
      "Body Contouring Without Surgery — See Results in One Session",
      "Skin Rejuvenation Specialists — Free Consultation This Week Only",
    ],
  },
  {
    key: "wellness",
    label: "Wellness",
    icon: HeartPulse,
    tagline: "Attract patients seeking real, lasting health solutions.",
    headlines: [
      "Tired of Feeling Tired? Hormone Optimization Changed Everything",
      "IV Therapy for Peak Performance — Walk-Ins Welcome",
      "Medical Weight Management — Doctor-Supervised, Real Results",
    ],
  },
  {
    key: "regen",
    label: "Regenerative Medicine",
    icon: Dna,
    tagline: "Position your practice at the forefront of modern medicine.",
    headlines: [
      "PRP Joint Therapy — Avoid Surgery, Recover Faster",
      "Stem Cell Treatments for Chronic Pain — Schedule Your Evaluation",
      "Sports Medicine Meets Regenerative Science — Athletes Trust Us",
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
      "Agencies charge $2,000-5,000/mo and take weeks. Our AI generates campaigns in minutes for $399/mo. You maintain full control.",
  },
  {
    question: "Can I upgrade to GrowthOS later?",
    answer:
      "Yes — your brand intake, ad accounts, and campaign history all carry over.",
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
    title: "AI Chatbot",
    description: "Convert website visitors into booked consultations 24/7",
  },
  {
    icon: Mail,
    title: "AI Outreach",
    description: "Find and nurture prospects with personalized AI email sequences",
  },
  {
    icon: Sparkles,
    title: "Full GrowthOS",
    description: "Landing pages, email campaigns, patient pipeline, analytics — everything",
  },
];

const schemas = [
  generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://cimagrowth.com" },
      { name: "Google Ads Management", url: "https://cimagrowth.com/ads" },
    ],
  }),
  generateFAQSchema({ questions: faqItems }),
];

const AdsPage = () => {
  const [activeSpecialty, setActiveSpecialty] = useState("fertility");
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<AdsPlanType>("ads_monthly");

  const openIntake = (plan: AdsPlanType) => {
    setSelectedPlan(plan);
    setIntakeOpen(true);
  };

  return (
    <Layout>
      <SEO
        title="Google Ads Management | AI-Powered Ad Campaigns | Cima Growth"
        description="AI-powered Google Ads management that drives real results. Smart bidding, conversion tracking, and expert optimization for healthcare, legal, home services, and more."
        keywords={[
          "Google Ads management",
          "AI Google Ads",
          "PPC management",
          "Google Ads agency",
          "paid search management",
          "Google Ads optimization",
          "AI ad campaigns",
        ]}
        canonical="https://cimagrowth.com/ads"
      />
      <JsonLd schema={schemas} />

      {/* ────────── HERO ────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

        <div className="container-wide relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/10 text-accent-orange text-body-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                AI-Powered Google Ads
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-display-lg md:text-display-xl text-foreground mb-6"
            >
              Stop Wasting Ad Spend.{" "}
              <span className="text-gradient-accent">Start Converting Patients.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              AI builds, launches, and optimizes your Google & Facebook ad
              campaigns — so you get more consultations without touching Ads
              Manager.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="group shadow-glow" onClick={() => openIntake("ads_monthly")}>
                Start for $399/mo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl" className="group" onClick={() => openIntake("ads_annual")}>
                Save $789/yr — Go Annual
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-body-sm text-muted-foreground mt-4">
              Trusted by 100+ fertility & wellness clinics
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
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              The Problem
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground">
              Running ads for a medical practice is different.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Live in three simple steps
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              From brand intake to live campaigns in under an hour.
            </p>
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
            <Button variant="hero" size="lg" className="group" onClick={() => openIntake("ads_monthly")}>
              Get Started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ────────── FEATURES ────────── */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              What You Get
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground">
              Everything to run ads that actually work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
            <Button variant="hero" size="lg" className="group" onClick={() => openIntake("ads_monthly")}>
              See Pricing
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
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
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Built For Your Specialty
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              AI ads tailored to your practice
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
                    ? "bg-accent-orange text-white shadow-glow"
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
                className="max-w-3xl mx-auto"
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

      {/* ────────── PRICING ────────── */}
      <section id="pricing" className="section-padding bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Pricing
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              No hidden fees. No long-term contracts. Your ad accounts stay yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-premium rounded-2xl p-8 flex flex-col"
            >
              <h3 className="text-heading-sm font-bold text-foreground mb-1">Monthly</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-display font-bold text-foreground">$399</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="text-body-sm text-muted-foreground mb-6">
                No contracts. Cancel anytime.
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {["AI ad copy & keyword research", "Google & Facebook campaigns", "Performance dashboard", "AI optimization agent", "AI landing page builder", "Brand intake & voice match"].map((feat, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-accent-orange/10">
                      <Check className="w-2.5 h-2.5 text-accent-orange" />
                    </div>
                    <span className="text-body-sm text-foreground">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full group" onClick={() => openIntake("ads_monthly")}>
                Start for $399/mo
              </Button>
            </motion.div>

            {/* Annual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 flex flex-col relative bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground ring-2 ring-accent-orange shadow-glow"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent-orange text-white">
                Best Value
              </span>
              <h3 className="text-heading-sm font-bold text-primary-foreground mb-1">Annual</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-display font-bold text-primary-foreground">$333</span>
                <span className="text-primary-foreground/70">/mo</span>
              </div>
              <p className="text-body-sm text-primary-foreground/70 mb-1">
                Billed at $3,999/yr
              </p>
              <p className="text-body-sm font-semibold text-accent-orange mb-6">
                Save $789. Best value.
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {["Everything in Monthly", "Priority support", "Save $789 per year"].map((feat, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-accent-orange/20">
                      <Check className="w-2.5 h-2.5 text-accent-orange" />
                    </div>
                    <span className="text-body-sm text-primary-foreground">{feat}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" className="w-full group bg-accent-orange hover:brightness-110" onClick={() => openIntake("ads_annual")}>
                Save $789/yr — Go Annual
              </Button>
            </motion.div>
          </div>

          <p className="text-center text-body-sm text-muted-foreground mt-8 max-w-xl mx-auto">
            Your ad accounts stay yours. We never lock you in.
          </p>
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
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Grow With Us
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Ads are just the beginning.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Ready?
            </span>
            <h2 className="text-heading-lg md:text-display text-primary-foreground mb-4">
              Launch Your First AI Campaign Today
            </h2>
            <p className="text-body-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Join hundreds of clinics using AI to turn ad spend into booked
              consultations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button variant="hero" size="xl" className="group shadow-glow" onClick={() => openIntake("ads_monthly")}>
                Start for $399/mo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl" className="group border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => openIntake("ads_annual")}>
                Save $789/yr — Go Annual
              </Button>
            </div>
            <p className="text-body-sm text-primary-foreground/60">
              Questions? Email brandon@cimagrowth.com
            </p>
          </motion.div>
        </div>
      </section>
      <AdsIntakeModal
        open={intakeOpen}
        onClose={() => setIntakeOpen(false)}
        selectedPlan={selectedPlan}
      />
    </Layout>
  );
};

export default AdsPage;
