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
    <section id="cta" ref={sectionRef} className="section-padding relative overflow-hidden bg-mist">
      {/* Parallax decorative elements - hidden on mobile */}
      <motion.div
        style={{ y: y1, scale: scale1, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-paper/60 rounded-full blur-3xl hidden md:block"
      />
      <motion.div
        style={{ y: y2, scale: scale2, opacity: opacity1 }}
        className="absolute bottom-0 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-teal/5 rounded-full blur-3xl hidden md:block"
      />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center px-2">
          <h2 className="font-display font-[340] tracking-tight text-[clamp(28px,4vw,48px)] leading-[1.15] text-teal-deep mb-5 md:mb-7">
            See where your clinic is leaking patients.
          </h2>
          <p className="text-base md:text-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            Get a free growth audit. We analyze your current response times, channel coverage, and conversion paths, and show you specifically where patients are slipping through and what GrowthOS would change.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo" className="inline-block">
              <Button
                variant="hero"
                size="lg"
                className="group text-base"
              >
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/sign-up" className="inline-block">
              <Button
                variant="hero-outline"
                size="lg"
                className="text-base"
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
