import { useState } from "react";
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
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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

const stats = [
  { value: "40%", label: "More replies vs. generic outreach" },
  { value: "12", label: "Personalized follow-ups per prospect" },
  { value: "$0.07", label: "Per AI-enriched prospect" },
];

const steps = [
  {
    icon: Upload,
    title: "Import prospects",
    description:
      "Upload a CSV or add contacts manually. Include a website URL and the AI handles the rest.",
  },
  {
    icon: Brain,
    title: "AI enriches & writes",
    description:
      "Each prospect gets scraped, analyzed, and receives a custom 12-step cold email sequence written in your voice.",
  },
  {
    icon: Send,
    title: "Send & manage",
    description:
      "Launch sequences, track opens and replies, and manage every conversation from a unified inbox.",
  },
];

const features = [
  {
    icon: Search,
    title: "AI Prospect Enrichment",
    description:
      "Every prospect's website gets scraped and analyzed. AI identifies pain points, personalization hooks, and the best angle for your outreach.",
  },
  {
    icon: Mail,
    title: "12-Step Email Sequences",
    description:
      "AI writes a personalized cold email plus 12 follow-ups per prospect. Each follow-up uses a different angle. All written in your voice.",
  },
  {
    icon: Mic,
    title: "Voice Configuration",
    description:
      "Define your tone, authority, and positioning once. Every email sounds like you wrote it, not a marketing agency.",
  },
  {
    icon: MessageSquare,
    title: "Unified Inbox",
    description:
      "Email, SMS, and WhatsApp in one place. Reply to prospects without switching tabs. Full conversation history at a glance.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Full CRM with companies, contacts, tags, notes, and activity timeline. Import from CSV or add manually.",
  },
  {
    icon: BarChart3,
    title: "Outreach Analytics",
    description:
      "Track enrichment progress, email delivery, open rates, reply rates, and pipeline conversion across your entire prospect list.",
  },
];

const tiers = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 490,
    enrichments: 100,
    checkoutMonthly: "https://whop.com/checkout/plan_8WMJxXcwU2441",
    checkoutAnnual: "https://whop.com/checkout/plan_lZMOa45Sn35zS",
    features: [
      "AI prospect enrichment",
      "12-step cold email sequences",
      "LinkedIn messages & SMS drafts",
      "Voice & tone configuration",
      "Unified communications inbox",
      "Contact management & CRM",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    monthlyPrice: 99,
    annualPrice: 990,
    enrichments: 300,
    checkoutMonthly: "https://whop.com/checkout/plan_tpb2iMaW93fu3",
    checkoutAnnual: "https://whop.com/checkout/plan_MTSodcfZg8R5S",
    features: ["Everything in Starter", "Priority enrichment queue"],
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 199,
    annualPrice: 1990,
    enrichments: 750,
    checkoutMonthly: "https://whop.com/checkout/plan_OOXxJ39eN7mbN",
    checkoutAnnual: "https://whop.com/checkout/plan_D8siMeTn8yikv",
    features: ["Everything in Growth", "Custom voice per campaign"],
    highlighted: true,
  },
  {
    name: "Agency",
    monthlyPrice: 399,
    annualPrice: 3990,
    enrichments: 2000,
    checkoutMonthly: "https://whop.com/checkout/plan_g0XgYS58Brx2Y",
    checkoutAnnual: "https://whop.com/checkout/plan_8NiPOkbs8Damg",
    features: ["Everything in Pro", "White-label outreach reports"],
    highlighted: false,
  },
  {
    name: "Enterprise",
    monthlyPrice: 799,
    annualPrice: 7990,
    enrichments: 5000,
    checkoutMonthly: "https://whop.com/checkout/plan_X2fieDfMPqgTz",
    checkoutAnnual: "https://whop.com/checkout/plan_n2TCrUobe2I9r",
    features: [
      "Everything in Agency",
      "Dedicated enrichment queue",
      "Custom AI training",
    ],
    highlighted: false,
  },
];

const faqItems = [
  {
    question: "What's included in each plan?",
    answer:
      "Every plan includes the full outreach platform: unified inbox, contact management, voice configuration, email sequence builder, analytics, and CSV import. Plans differ by enrichment volume — the number of prospects AI enriches per month.",
  },
  {
    question: "Are there overage charges?",
    answer:
      "No. When you hit your monthly enrichment limit, enrichment stops and you see a prompt to upgrade. No surprise charges. Usage resets on the 1st of each month.",
  },
  {
    question: "Can I upgrade to the full GrowthOS platform later?",
    answer:
      "Yes. Upgrade anytime to GrowthOS for AI campaign building, landing pages, Google Ads management, pipeline deals, and more. Your data carries over seamlessly.",
  },
];

const schemas = [
  generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://cimagrowth.com" },
      { name: "B2B Outreach Engine", url: "https://cimagrowth.com/outreach" },
    ],
  }),
  generateFAQSchema({ questions: faqItems }),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "B2B Outreach Engine by Cima Growth",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered B2B outreach platform that enriches prospects, writes personalized 12-step email sequences, and manages your pipeline from first touch to closed deal.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "49",
      highPrice: "799",
      priceCurrency: "USD",
      offerCount: "5",
      availability: "https://schema.org/InStock",
      url: "https://cimagrowth.com/outreach",
    },
    brand: {
      "@type": "Brand",
      name: "Cima Growth Solutions",
    },
  },
];

const scrollToPricing = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("pricing");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Outreach = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <Layout>
      <SEO
        title="B2B Outreach Engine | AI-Powered Prospect Enrichment & Cold Email | Cima Growth"
        description="Turn cold prospects into warm conversations. AI enriches every prospect, writes personalized 12-step email sequences, and manages your pipeline from first touch to closed deal."
        ogImage="https://cimagrowth.com/og-outreach.png"
        keywords={[
          "B2B outreach",
          "AI cold email",
          "prospect enrichment",
          "cold email automation",
          "AI email sequences",
          "B2B lead generation",
          "outreach automation",
          "personalized cold email",
          "sales engagement platform",
          "AI prospecting tool",
        ]}
        canonical="https://cimagrowth.com/outreach"
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
                AI-Powered B2B Outreach
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-display-lg md:text-display-xl text-foreground mb-6"
            >
              Stop guessing.{" "}
              <span className="text-gradient-accent">Start closing.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Import your prospect list. AI enriches every contact, writes
              personalized 12-step email sequences, and manages your entire
              pipeline from first touch to closed deal.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
              <a href="#pricing" onClick={scrollToPricing}>
                <Button variant="hero" size="xl" className="group shadow-glow">
                  Choose Your Plan
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <p className="text-body-sm text-muted-foreground">
                No contracts. Cancel anytime.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
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

      {/* ────────── HOW IT WORKS ────────── */}
      <section className="section-padding bg-tan">
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
              Three steps to a full pipeline
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Upload your list, let AI do the heavy lifting, and focus on the
              conversations that matter.
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

          {/* CTA after How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a href="#pricing" onClick={scrollToPricing}>
              <Button variant="hero" size="lg" className="group">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ────────── FEATURES GRID ────────── */}
      <section className="section-padding bg-background relative overflow-hidden">
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
              Everything to run outreach at scale
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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

          {/* CTA after Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <a href="#pricing" onClick={scrollToPricing}>
              <Button variant="hero" size="lg" className="group">
                See Pricing
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
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
              Start with outreach. Upgrade to the full platform when you're
              ready.
            </p>
          </motion.div>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-body font-medium transition-colors ${
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isAnnual ? "bg-accent-orange" : "bg-muted-foreground/30"
              }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 ${
                  isAnnual ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-body font-medium transition-colors ${
                isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-orange/10 text-accent-orange">
                Save ~17%
              </span>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto overflow-x-auto">
            {tiers.map((tier, i) => {
              const displayPrice = isAnnual
                ? Math.round(tier.annualPrice / 12)
                : tier.monthlyPrice;
              const billingNote = isAnnual
                ? `Billed at $${tier.annualPrice.toLocaleString()}/yr`
                : "Billed monthly";
              const checkoutUrl = isAnnual
                ? tier.checkoutAnnual
                : tier.checkoutMonthly;

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`rounded-2xl p-6 flex flex-col relative ${
                    tier.highlighted
                      ? "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground ring-2 ring-accent-orange shadow-glow"
                      : "card-premium"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent-orange text-white">
                      Most Popular
                    </span>
                  )}

                  <h3
                    className={`text-heading-sm font-bold mb-1 ${
                      tier.highlighted
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span
                      className={`text-display font-bold ${
                        tier.highlighted
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      ${displayPrice}
                    </span>
                    <span
                      className={
                        tier.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }
                    >
                      /mo
                    </span>
                  </div>

                  <p
                    className={`text-body-sm mb-4 ${
                      tier.highlighted
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {billingNote}
                  </p>

                  <p
                    className={`text-body font-semibold mb-4 ${
                      tier.highlighted
                        ? "text-accent-orange"
                        : "text-accent-orange"
                    }`}
                  >
                    {tier.enrichments.toLocaleString()} prospects/month
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            tier.highlighted
                              ? "bg-accent-orange/20"
                              : "bg-accent-orange/10"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 text-accent-orange" />
                        </div>
                        <span
                          className={`text-body-sm ${
                            tier.highlighted
                              ? "text-primary-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-auto"
                  >
                    <Button
                      variant={tier.highlighted ? "hero" : "outline"}
                      size="lg"
                      className={`w-full group ${
                        tier.highlighted
                          ? "bg-accent-orange hover:brightness-110"
                          : ""
                      }`}
                    >
                      Get Started
                    </Button>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Hard limit note */}
          <p className="text-center text-body-sm text-muted-foreground mt-8 max-w-xl mx-auto">
            No surprise charges — enrichment stops at your plan limit. Upgrade
            anytime.
          </p>

          {/* GrowthOS upsell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="rounded-xl p-6 bg-background border border-border">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                <p className="text-body text-muted-foreground">
                  Need landing pages, Google Ads, AI campaigns, and pipeline
                  management? Upgrade to the full GrowthOS platform anytime.
                  Your data carries over seamlessly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
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
              Your pipeline won't fill itself
            </h2>
            <p className="text-body-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Join hundreds of B2B teams using AI to turn cold prospects into
              warm conversations.
            </p>
            <a href="#pricing" onClick={scrollToPricing}>
              <Button variant="hero" size="xl" className="group shadow-glow">
                Choose Your Plan
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Outreach;
