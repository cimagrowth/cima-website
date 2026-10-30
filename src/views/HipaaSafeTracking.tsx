'use client';

import { motion } from "framer-motion";
import FinalCTA from "@/components/home/FinalCTA";

type Section = {
  heading: string;
  body: string;
  link?: { href: string; label: string };
};

const sections: Section[] = [
  {
    heading: "The problem nobody fixed",
    body: "Meta and Google will not sign a business associate agreement. The moment a standard pixel sends a patient's visit to a health page, that data is exposed. Clinics that turned it off lost the ability to measure a single dollar of ad spend.",
  },
  {
    heading: "How GrowthOS handles it",
    body: "Visitor activity flows through GrowthOS first. Patient-identifying details are stripped and contact details are encrypted before any event reaches Meta or Google. The platforms receive only what they need to attribute a conversion. Patient details are removed before any event is sent to an ad platform. There is no pixel to install and no tag manager to configure. Connect Meta, Google Ads and Analytics, and compliant tracking switches on automatically from the moment you connect.",
  },
  {
    heading: "Your numbers, in one place",
    body: "Because the data is first-party and server-side, your real performance lives in GrowthOS. Spend, leads, booked consults, and ROI in one view. The ad platforms' own dashboards will show smaller numbers, by design, for health accounts. GrowthOS is your scoreboard.",
    link: { href: "/ads", label: "See how Ads Manager uses it" },
  },
];

const HipaaSafeTracking = () => {
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
              For specialty clinics
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              See which ads bring in patients,{" "}
              <span className="text-clay">without sending health data to Meta or Google.</span>
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 max-w-3xl mx-auto leading-relaxed">
              GrowthOS strips patient details before any conversion event leaves your clinic, so you can measure ad spend to booked consults and keep tracking switched on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections, alternating backgrounds */}
      {sections.map((section, index) => (
        <section
          key={section.heading}
          className={`section-padding relative overflow-hidden ${
            index % 2 === 0 ? "bg-background" : "bg-tan"
          }`}
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
                <h2 className="font-display text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-foreground leading-tight mb-6">
                  {section.heading}
                </h2>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {section.body}
                </p>
                {section.link && (
                  <a href={section.link.href} className="mt-4 inline-block font-semibold text-teal underline underline-offset-2">
                    {section.link.label}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <FinalCTA
        heading="See where your patients are leaking out"
        description="Your free Leak Map shows where patients drop off, benchmarked against clinics on GrowthOS, and what it is worth to fix."
        ctas={[
          { label: "Book a demo", href: "/demo", variant: "hero" },
          { label: "Get your free Leak Map", href: "/growth", variant: "hero-outline" },
        ]}
      />
    </>
  );
};

export default HipaaSafeTracking;
