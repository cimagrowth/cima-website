import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/components/seo/schemas";

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

const schemas = [
  generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://cimagrowth.com" },
      { name: "Google Ads Management", url: "https://cimagrowth.com/ads" },
    ],
  }),
];

const scrollToPricing = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("pricing");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const AdsPage = () => {
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
              Google Ads that{" "}
              <span className="text-gradient-accent">actually convert.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Placeholder hero description. Content coming in Phase 2.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
              <a href="#pricing" onClick={scrollToPricing}>
                <Button variant="hero" size="xl" className="group shadow-glow">
                  Get Started
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <p className="text-body-sm text-muted-foreground">
                No contracts. Cancel anytime.
              </p>
            </motion.div>
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
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              The Problem
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Placeholder problem headline
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Placeholder problem description. Content coming in Phase 2.
            </p>
          </motion.div>
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
              Placeholder how-it-works headline
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Placeholder how-it-works description. Content coming in Phase 2.
            </p>
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
              Features
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground">
              Placeholder features headline
            </h2>
          </motion.div>

          <p className="text-center text-body-lg text-muted-foreground">
            Feature cards coming in Phase 2.
          </p>
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
            className="text-center mb-16"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Specialties
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Placeholder specialties headline
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Tabbed specialty content coming in Phase 2.
            </p>
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
              Placeholder pricing headline
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              Pricing cards coming in Phase 2.
            </p>
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
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
              Upgrade Path
            </span>
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Placeholder upgrade path headline
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Upgrade path details coming in Phase 2.
            </p>
          </motion.div>
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

          <p className="text-center text-body-lg text-muted-foreground">
            FAQ items coming in Phase 2.
          </p>
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
              Placeholder final CTA headline
            </h2>
            <p className="text-body-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Placeholder final CTA description. Content coming in Phase 2.
            </p>
            <a href="#pricing" onClick={scrollToPricing}>
              <Button variant="hero" size="xl" className="group shadow-glow">
                Get Started
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdsPage;
