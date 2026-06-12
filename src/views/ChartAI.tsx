'use client';

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Mail,
  Layers,
  Search,
  Activity,
  Paintbrush,
  ClipboardList,
  PenTool,
  FileCheck,
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

const steps = [
  {
    icon: ClipboardList,
    title: "Staff Fills the Request",
    description:
      "Enter patient details and previous providers. Search existing contacts or enter manually. Under 2 minutes.",
  },
  {
    icon: PenTool,
    title: "Patient Signs via Email",
    description:
      "Secure HIPAA authorization link sent to patient. They sign on their phone — 30 seconds.",
  },
  {
    icon: FileCheck,
    title: "Records Delivered",
    description:
      "Records retrieved from previous providers and delivered to your system. 5–14 business days.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    description:
      "End-to-end encrypted. Signed consent PDFs. Full audit trail.",
  },
  {
    icon: Mail,
    title: "E-Signature via Email",
    description:
      "Patients sign on phone. No app. SMS backup available.",
  },
  {
    icon: Layers,
    title: "Multi-Provider Requests",
    description:
      "Request from multiple providers in one submission.",
  },
  {
    icon: Search,
    title: "Patient Search",
    description:
      "Auto-fill from your existing patient database.",
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    description:
      "Status badges, document counts, timeline visibility.",
  },
  {
    icon: Paintbrush,
    title: "White-Labeled",
    description:
      "Patient-facing emails show your clinic name, not ours.",
  },
];

const builtFor = [
  {
    title: "Fertility Clinics",
    description: "IVF, IUI, egg freezing",
  },
  {
    title: "Regenerative Medicine",
    description: "PRP, stem cell, longevity",
  },
  {
    title: "OB/GYN Practices",
    description: "Maternal-fetal, general OB",
  },
  {
    title: "Wellness Clinics",
    description: "Integrative, functional",
  },
];

const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link href="/demo">
      <Button variant="hero" size="lg" className="group">
        Book a Demo
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
    <a href="https://os.cimagrowth.com" target="_blank" rel="noopener noreferrer">
      <Button variant="hero-outline" size="lg">
        Sign Up for GrowthOS
      </Button>
    </a>
  </div>
);

const ChartAI = () => {
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
              <span className="inline-block bg-paper border border-sand shadow-[var(--shadow-sm)] text-clay font-ui text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Medical Records Retrieval
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-[340] tracking-[-.02em] text-display-lg md:text-display-xl text-teal-deep mb-6"
            >
              Stop chasing faxes.{" "}
              <span className="italic text-clay">
                ChartAI retrieves records automatically.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-body-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto"
            >
              Your staff fills out the request. The patient signs via email.
              Records arrive in your system. That&apos;s it.
            </motion.p>

            <motion.div variants={itemVariants}>
              <CTAButtons />
              <p className="text-body-sm text-teal-deep/80 mt-4">
                ChartAI is included with every GrowthOS subscription
              </p>
            </motion.div>
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
              Three Steps. No Fax Machine Required.
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
        </div>
      </section>

      {/* FEATURES */}
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
              Features
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground">
              Everything You Need to Retrieve Records —{" "}
              <span className="italic text-clay">Without the Hassle</span>
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

      {/* BUILT FOR */}
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
              Built For
            </span>
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              Designed for Clinics That Need Records Fast
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {builtFor.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-premium rounded-xl p-6 text-center"
              >
                <h3 className="text-heading-sm text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display font-[340] tracking-tight text-heading-lg md:text-display text-foreground mb-4">
              <span className="italic text-clay">$35 per records request</span>{" "}
              · No monthly fees · No contracts
            </h2>
            <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Included with GrowthOS — our AI-powered patient acquisition platform
            </p>
            <CTAButtons />
          </motion.div>
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
              Ready to ditch the fax machine?
            </h2>
            <p className="text-body-lg text-paper/80 mb-10 max-w-xl mx-auto">
              Join clinics that retrieve medical records in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="hero" size="lg" className="group">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="https://os.cimagrowth.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="border border-paper/40 bg-transparent text-paper hover:bg-paper/10"
                >
                  Sign Up for GrowthOS
                </Button>
              </a>
            </div>

            {/* Footer note */}
            <p className="text-sm text-paper/50 mt-10">
              Records retrieval powered by{" "}
              <a
                href="https://predoc.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-paper/70 transition-colors"
              >
                PreDoc
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ChartAI;
