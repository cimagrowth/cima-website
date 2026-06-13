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
      className="relative overflow-hidden bg-cream"
    >
      <motion.div
        className="container-wide relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-[clamp(40px,5vw,64px)] md:py-[clamp(48px,6vw,72px)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Copy column — first in DOM = CTA above the fold on mobile */}
        <div>
          <motion.h1
            variants={itemVariants}
            className="font-display font-[340] text-[clamp(40px,7vw,92px)] leading-[1.02] tracking-[-.02em] text-teal-deep mb-6 md:mb-8"
          >
            Stop losing patients to <em className="italic text-clay">slow</em>{" "}
            follow-up.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-xl text-teal-deep/85 mb-8 md:mb-10 max-w-[60ch] leading-relaxed"
          >
            Your clinic leaks patients twice &mdash; at the inquiry, then again
            when follow-up fades. GrowthOS is an AI growth platform that answers
            in seconds, follows up for weeks, and books &mdash; on every
            channel, trained on your specialty.
          </motion.p>

          {/* CTAs — stacked on mobile, inline on larger screens */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link href="/sign-up" className="block">
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto group text-base"
              >
                Launch Today
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/demo" className="block">
              <Button
                variant="hero-outline"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                Book a Demo
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Funnel column — side-by-side on desktop, below the fold on mobile */}
        <motion.div variants={itemVariants} className="w-full">
          <PatientLeakageFunnel />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
