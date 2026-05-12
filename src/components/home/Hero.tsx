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
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[90vh] flex flex-col justify-between md:justify-center overflow-hidden bg-background"
    >
      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-10 right-0 w-56 h-56 md:w-72 md:h-72 bg-accent-orange/25 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -left-10 w-40 h-40 md:w-48 md:h-48 bg-secondary/40 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 right-[20%] w-64 h-64 md:w-96 md:h-96 bg-primary-light/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <motion.div
        className="container-wide relative z-10 flex-1 flex flex-col justify-center py-4 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left column: copy */}
          <div>
            <motion.h1
              variants={itemVariants}
              className="font-display text-[2.2rem] leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-4 md:mb-6 tracking-tight"
            >
              Stop losing patients to{" "}
              <span className="text-gradient-accent">slow follow-up.</span>
            </motion.h1>

            {/* Desktop only: subhead */}
            <motion.p
              variants={itemVariants}
              className="hidden md:block text-lg md:text-xl text-foreground/90 mb-4 max-w-2xl leading-relaxed"
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
              className="hidden md:block text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              Built for fertility, aesthetics, regenerative medicine, and
              wellness clinics. Replaces 6+ tools with one operating system
              that actually runs the work.
            </motion.p>

            {/* Desktop CTAs inline */}
            <motion.div
              variants={itemVariants}
              className="hidden md:flex flex-row gap-4"
            >
              <Link href="/sign-up">
                <Button
                  variant="hero"
                  size="lg"
                  className="group text-base md:size-xl shadow-glow"
                >
                  Get Started
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="text-base md:size-xl border-2 border-secondary text-foreground hover:border-secondary hover:bg-secondary/15 shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.7)] transition-shadow"
                >
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
          className="text-base text-foreground/90 leading-relaxed"
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
          className="text-xs text-muted-foreground leading-relaxed"
        >
          Built for fertility, aesthetics, regenerative medicine, and wellness
          clinics. Replaces 6+ tools with one operating system that actually
          runs the work.
        </motion.p>

        {/* Full-width stacked CTAs */}
        <motion.div variants={itemVariants}>
          <Link href="/sign-up" className="block">
            <Button
              variant="hero"
              size="lg"
              className="w-full text-lg py-6 shadow-glow group"
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
              className="w-full text-lg py-6 border-2 border-secondary text-foreground hover:border-secondary hover:bg-secondary/15 shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.7)] transition-shadow"
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
