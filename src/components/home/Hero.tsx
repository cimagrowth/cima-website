"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PatientLeakageFunnel from "@/components/home/PatientLeakageFunnel";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between md:justify-center overflow-hidden bg-cream"
    >
      <motion.div
        className="container-wide relative z-10 flex-1 flex flex-col justify-center py-[clamp(48px,6vw,80px)] md:py-[clamp(96px,12vw,160px)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left column: copy */}
          <div>
            <motion.h1
              variants={itemVariants}
              className="font-display font-[340] text-[clamp(46px,7vw,92px)] leading-[1.02] tracking-[-.02em] text-teal-deep mb-6 md:mb-8"
            >
              Stop losing patients to <em className="italic text-clay">slow</em>{" "}
              follow-up.
            </motion.h1>

            {/* Desktop only: subhead */}
            <motion.p
              variants={itemVariants}
              className="hidden md:block font-body text-lg md:text-xl text-teal-deep/85 mb-5 max-w-[60ch] leading-relaxed"
            >
              Every clinic leaks patients twice &mdash; first when inquiries
              come in and don&apos;t get a timely response, then again after
              first contact when the patient goes quiet. GrowthOS closes both
              gaps with an AI chat that answers the second a patient reaches
              out &mdash; on any channel, trained on your specialty and your
              clinic, smart enough to qualify, nurture, follow up, and book
              without anyone on your team touching the keyboard.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="hidden md:block font-body text-sm text-teal-deep/70 mb-10 max-w-[60ch] leading-relaxed"
            >
              But slow follow-up is only the symptom. The deeper problem: every
              part of your growth &mdash; getting found, bringing leads in,
              answering them, following up, earning reviews &mdash; runs on
              people who get overwhelmed, agencies you can&rsquo;t see working,
              and manual steps that quietly fail. GrowthOS replaces all of it
              with a team of AI employees that drives patients in, answers the
              second they reach out, and never lets one go cold. Built for
              fertility, aesthetics, regenerative medicine, and wellness
              clinics.
            </motion.p>

            {/* Desktop CTAs inline */}
            <motion.div
              variants={itemVariants}
              className="hidden md:flex flex-row gap-4"
            >
              <Link href="/sign-up">
                <Button variant="hero" size="lg" className="group text-base">
                  Get Started
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="hero-outline" size="lg" className="text-base">
                  Book a Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right column on desktop, below copy on tablet/mobile: leakage funnel */}
          <motion.div variants={itemVariants}>
            <PatientLeakageFunnel />
          </motion.div>
        </div>
      </motion.div>

      {/* MOBILE ONLY: Bottom section with subhead, microcopy, CTAs */}
      <motion.div
        className="md:hidden relative z-10 px-6 pb-6 space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="font-body text-base text-teal-deep/85 leading-relaxed"
        >
          Every clinic leaks patients twice &mdash; first when inquiries come
          in and don&apos;t get a timely response, then again after first
          contact when the patient goes quiet. GrowthOS closes both gaps with
          an AI chat that answers the second a patient reaches out &mdash; on
          any channel, trained on your specialty and your clinic, smart enough
          to qualify, nurture, follow up, and book without anyone on your team
          touching the keyboard.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-body text-xs text-teal-deep/70 leading-relaxed"
        >
          But slow follow-up is only the symptom. The deeper problem: every
          part of your growth &mdash; getting found, bringing leads in,
          answering them, following up, earning reviews &mdash; runs on people
          who get overwhelmed, agencies you can&rsquo;t see working, and manual
          steps that quietly fail. GrowthOS replaces all of it with a team of
          AI employees that drives patients in, answers the second they reach
          out, and never lets one go cold. Built for fertility, aesthetics,
          regenerative medicine, and wellness clinics.
        </motion.p>

        {/* Full-width stacked CTAs */}
        <motion.div variants={itemVariants}>
          <Link href="/sign-up" className="block">
            <Button
              variant="hero"
              size="lg"
              className="w-full text-lg py-6 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/demo" className="block">
            <Button
              variant="hero-outline"
              size="lg"
              className="w-full text-lg py-6"
            >
              Book a Demo
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
