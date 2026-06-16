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
        className="container-wide relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(2rem,4vw,4rem)] py-[clamp(3rem,6vh,5rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Copy column — first in DOM = CTA above the fold on mobile */}
        <div>
          <motion.p
            variants={itemVariants}
            className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-3"
          >
            Not a chatbot. Not a CRM. The operating system your clinic runs on.
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display font-[340] text-[clamp(2.25rem,3.4vw,3.25rem)] leading-[1.08] tracking-[-.02em] text-teal-deep mb-4 md:mb-5"
          >
            Your clinic is leaking patients. This is the operating system that{" "}
            <em className="italic text-orange">seals it.</em>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-xl text-teal-deep/85 mb-4 max-w-[60ch] leading-relaxed"
          >
            The platform that <span className="text-orange">drives</span>{" "}
            patients in, <span className="text-orange">captures</span> every
            inquiry the second it lands, and{" "}
            <span className="text-orange">grows</span> them into referrals
            &mdash; one system, not another AI bolt-on.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-body text-sm md:text-base text-teal-deep/70 mb-6 md:mb-7 max-w-[60ch] leading-relaxed"
          >
            A clinic doesn&rsquo;t leak patients in one place. It leaks at every
            stage &mdash; the ads no one&rsquo;s optimizing, the inquiry that
            sits for hours, the follow-up that stops at one, the patient who
            quietly disappears, the review you never ask for. GrowthOS runs all
            of it on one brain: acquisition, conversion, and retention in a
            single platform. Not five disconnected tools. Not a chatbot with a
            medical coat of paint. The system your clinic actually runs on.
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
