"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.8, 1.2]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section id="cta" ref={sectionRef} className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />

      {/* Parallax decorative elements - hidden on mobile */}
      <motion.div
        style={{ y: y1, scale: scale1, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-accent-orange/20 rounded-full blur-3xl hidden md:block"
      />
      <motion.div
        style={{ y: y2, scale: scale2, opacity: opacity1 }}
        className="absolute bottom-0 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-secondary/30 rounded-full blur-3xl hidden md:block"
      />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center px-2">
          <h2 className="text-xl sm:text-2xl md:text-display text-primary-foreground mb-4 md:mb-6">
            See Results in 30 Days or We'll Work With You Until You Do.
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-4 max-w-2xl mx-auto">
            Every GrowthOS client gets live onboarding, AI configuration tuned to your clinic, and a 30-day performance review. If your lead response time hasn't improved and your pipeline isn't more organized, we'll keep working with you at no extra cost until it is.
          </p>
          <p className="text-base md:text-lg font-semibold text-accent-orange mb-8">
            Every day without GrowthOS is another day of patients choosing the clinic that responded first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="inline-block">
              <Button
                variant="hero"
                size="lg"
                className="group shadow-glow bg-accent-orange hover:brightness-110 text-base md:size-xl"
              >
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/sign-up" className="inline-block">
              <Button
                variant="hero-outline"
                size="lg"
                className="text-base md:size-xl border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Start Now — Live in 48 Hours
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
