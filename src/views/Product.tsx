'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FinalCTA from "@/components/home/FinalCTA";
import IntegrationsPanel from "@/components/map/IntegrationsPanel";
import { GrowthSide, JourneyCards } from "@/components/home/WhatGrowthOSDoes";
import ProductFeatures from "@/views/ProductFeatures";
import { HOME_COPY } from "@/content/home-specialty";
import { PERSON } from "@/content/specialty";
import { useSpecialty } from "@/contexts/SpecialtyContext";
import {
  ArrowRight,
  Check,
  Users,
  GitBranch,
  Gauge,
  Inbox,
  Workflow,
  CalendarCheck,
  LayoutTemplate,
  Mail,
  BarChart3,
  Smartphone,
  Webhook,
  Replace,
  Layers,
  Plug,
  X,
  Minus,
} from "lucide-react";

type Capability = {
  icon: typeof Users;
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  {
    icon: Users,
    title: "Contacts & data",
    body: "Unified contact records, custom fields, segmentation, and tags.",
  },
  {
    icon: GitBranch,
    title: "Pipelines",
    body: "Visual pipelines, custom stages, drag-and-drop, multiple pipelines.",
  },
  {
    icon: Gauge,
    title: "Lead scoring",
    body: "Behavioral and automated lead scoring out of the box.",
  },
  {
    icon: Inbox,
    title: "Unified inbox",
    body: "Web chat, SMS, WhatsApp, email, Facebook and Instagram DMs in one place.",
  },
  {
    icon: Workflow,
    title: "Automations",
    body: "Sequences, triggers, and a full workflow builder.",
  },
  {
    icon: CalendarCheck,
    title: "Booking",
    body: "Calendar sync, appointment types, and booking on your real calendar.",
  },
  {
    icon: LayoutTemplate,
    title: "Forms & landing pages",
    body: "Lead capture forms and conversion landing pages.",
  },
  {
    icon: Mail,
    title: "Email & SMS",
    body: "Sending, sequences, templates, and approvals.",
  },
  {
    icon: BarChart3,
    title: "Reporting & analytics",
    body: "Pipeline and funnel reporting, performance dashboards.",
  },
  {
    icon: Smartphone,
    title: "Mobile + desktop apps",
    body: "Same inbox and pipelines, wherever your team works.",
  },
  {
    icon: Webhook,
    title: "API / webhooks",
    body: "Integrate with anything in your stack.",
  },
];

type CompareValue = "yes" | "no" | "limited" | "manual" | "workarounds" | string;

type CompareRow = {
  label: string;
  growthos: CompareValue;
  hubspot: CompareValue;
  ghl: CompareValue;
};

const compareRows: CompareRow[] = [
  {
    label: "Built specifically for healthcare clinics",
    growthos: "yes",
    hubspot: "no",
    ghl: "no",
  },
  {
    label: "HIPAA-grade PHI handling + BAA",
    growthos: "yes",
    hubspot: "Limited / add-on",
    ghl: "Workarounds",
  },
  {
    label: "A2P 10DLC + clinical consent built in",
    growthos: "yes",
    hubspot: "Manual",
    ghl: "Manual",
  },
  {
    label: "EHR / EMR integration",
    growthos: "yes",
    hubspot: "no",
    ghl: "no",
  },
  {
    label: "Clinical AI guardrails by specialty",
    growthos: "yes",
    hubspot: "no",
    ghl: "no",
  },
  {
    label: "Built-in AI for inquiries, follow-up and ad account management",
    growthos: "yes",
    hubspot: "no",
    ghl: "no",
  },
  {
    label: "Pre-built for your specialty",
    growthos: "yes",
    hubspot: "Weeks of setup",
    ghl: "Weeks of setup",
  },
  {
    label: "Contacts, pipelines, scoring, reporting",
    growthos: "yes",
    hubspot: "yes",
    ghl: "yes",
  },
];

const renderCell = (value: CompareValue) => {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-orange/15 text-accent-orange">
        <Check className="w-4 h-4" aria-label="Yes" />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground/70">
        <X className="w-4 h-4" aria-label="No" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Minus className="w-3.5 h-3.5" aria-hidden="true" />
      {value}
    </span>
  );
};

type Mode = {
  icon: typeof Replace;
  title: string;
  subtitle: string;
  description: string;
  featured?: boolean;
};

const modes: Mode[] = [
  {
    icon: Layers,
    title: "Transition Mode",
    subtitle: "Switch on your schedule",
    description:
      "Already on HubSpot, Salesforce, or Tebra? Import tools move contacts, deals, workflows and email templates at your pace, with field mapping and a parallel run while your team keeps working.",
    featured: true,
  },
  {
    icon: Plug,
    title: "Integration Mode",
    subtitle: "Keep your CRM, add the AI",
    description:
      "GrowthOS sits on top of your existing CRM via API. Pick the AI capabilities you need, from front desk to follow-up and ad management, and leave your records and reporting where they live today.",
  },
  {
    icon: Replace,
    title: "Full Platform",
    subtitle: "Replace the patchwork entirely",
    description:
      "GrowthOS becomes your one platform, with contacts, pipelines, inbox, automations, ads, and reporting in one place, operated by your team, with AI automation.",
  },
];

const Product = () => {
  const { specialty } = useSpecialty();
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl lg:max-w-5xl mx-auto text-center"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              The Platform
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              No patient falls through the cracks,{" "}
              <span className="text-clay">
                even when your clinic gets busy.
              </span>
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              GrowthOS automates everything that happens to a patient outside
              the lab: answering, qualifying and booking in seconds, following up
              at every stage, and handling consents, payment links and reviews.
              More patients and more revenue, in less of your team&rsquo;s time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="hero" size="xl" className="group">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/growth">
                <Button
                  variant="hero-outline"
                  size="xl"
                >
                  Get your free Leak Map
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What GrowthOS does, and the growth side (shared with the home page) */}
      <JourneyCards does={HOME_COPY[specialty].story.does} />
      <GrowthSide person={PERSON[specialty].one} people={PERSON[specialty].many} />

      {/* Feature parity grid */}
      <section
        id="feature-parity"
        className="section-padding bg-tan relative overflow-hidden"
      >
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              The Boxes You Came To Check
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-foreground leading-tight mb-6">
              Everything you&rsquo;d verify on a CRM switcher checklist.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The fundamentals are all here. No surprises mid-migration, no
              &ldquo;that&rsquo;s on our roadmap.&rdquo;
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                  className="bg-paper rounded-xl2 border border-sand p-6 shadow-[var(--shadow-sm)] flex gap-4"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon
                      className="w-5 h-5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-ui text-base md:text-lg font-semibold text-foreground mb-1 leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {cap.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The pivot */}
      <section
        id="system-of-action"
        className="bg-background section-padding relative overflow-hidden"
      >
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative pl-6 md:pl-10 border-l-2 border-accent-orange/70">
              <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
                System Of Action
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-foreground leading-tight mb-6">
                But a CRM is{" "}
                <span className="text-clay">
                  a filing cabinet you fill by hand.
                </span>
              </h2>
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                Every CRM gives you the boxes. Then it hands you the work.
                GrowthOS automates the routine steps, answering inquiries,
                sending follow-up reminders and requesting reviews, so records
                fill themselves.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison table */}
      <section
        id="comparison"
        className="section-padding bg-tan relative overflow-hidden"
      >
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              Stack Up
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-foreground leading-tight mb-6">
              GrowthOS vs HubSpot vs GoHighLevel
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The basics are a tie. The healthcare depth and the built-in automation aren&rsquo;t.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border shadow-card bg-card">
            <table className="w-full text-sm md:text-base min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-teal text-paper">
                  <th
                    scope="col"
                    className="text-left font-semibold px-4 md:px-6 py-4 rounded-tl-2xl"
                  >
                    Capability
                  </th>
                  <th
                    scope="col"
                    className="text-center font-semibold px-3 md:px-6 py-4 bg-teal"
                  >
                    GrowthOS
                  </th>
                  <th
                    scope="col"
                    className="text-center font-semibold px-3 md:px-6 py-4"
                  >
                    HubSpot
                  </th>
                  <th
                    scope="col"
                    className="text-center font-semibold px-3 md:px-6 py-4 rounded-tr-2xl"
                  >
                    GoHighLevel
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i < compareRows.length - 1
                        ? "border-b border-border/60"
                        : ""
                    }
                  >
                    <td className="px-4 md:px-6 py-4 text-foreground font-medium">
                      {row.label}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-center bg-primary/[0.04]">
                      {renderCell(row.growthos)}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-center">
                      {renderCell(row.hubspot)}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-center">
                      {renderCell(row.ghl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-xs md:text-sm text-muted-foreground italic">
            Cells reflect typical out-of-the-box capability for a healthcare
            clinic; some HubSpot and GoHighLevel items can be approximated with
            paid add-ons, custom builds, or third-party tools.
          </p>
        </div>
      </section>

      {/* Migration / modes */}
      <section
        id="migration"
        className="section-padding bg-background relative overflow-hidden"
      >
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              Migration
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-foreground leading-tight mb-6">
              Switch on your schedule.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Three ways to roll out, depending on what you&rsquo;re running today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className={`relative card-elevated p-7 md:p-8 text-center group transition-all duration-500 ${
                    mode.featured ? "ring-1 ring-clay/50" : ""
                  }`}
                >
                  {mode.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-paper border border-sand text-clay shadow-[var(--shadow-sm)] text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-teal flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[var(--shadow-sm)]">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-1">
                    {mode.title}
                  </h3>
                  <p
                    className={`text-sm font-medium mb-4 ${
                      mode.featured ? "text-accent-orange" : "text-muted-foreground"
                    }`}
                  >
                    {mode.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {mode.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-12 md:mt-14 text-center"
          >
            <IntegrationsPanel className="max-w-3xl mx-auto text-left" />
            <p className="mt-8 text-base">
              <Link href="#features" className="font-semibold text-teal underline underline-offset-2">
                See every GrowthOS feature
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <ProductFeatures />

      {/* Closing CTA */}
      <section className="section-padding bg-teal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-paper mb-6 leading-tight">
              See it run on your clinic.
            </h2>
            <p className="text-base md:text-lg text-paper/80 mb-8 max-w-2xl mx-auto">
              Thirty minutes. See the software handle sample patient inquiries in
              your specialty, not a generic demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="hero" size="xl" className="group">
                  Book a Demo
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/growth">
                <Button
                  variant="hero-outline"
                  size="xl"
                  className="border border-paper/40 bg-transparent text-paper hover:bg-paper/10"
                >
                  Get your free Leak Map
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default Product;
