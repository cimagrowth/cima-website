"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

type CtaLink = {
  label: string;
  href: string;
  variant?: "hero" | "hero-outline";
};

interface FinalCTAProps {
  heading?: string;
  description?: string;
  ctas?: CtaLink[];
}

const DEFAULT_HEADING = "The Patient Leakage Audit";
const DEFAULT_DESCRIPTION =
  "Free audit. We benchmark your lead-to-consult rate against the best-run clinics we work with, map your leak stages, and show you the projected recovery. Results in 48 hours.";
const DEFAULT_CTAS: CtaLink[] = [
  { label: "Get Your Free Audit", href: "/growth", variant: "hero" },
  { label: "See How It Works", href: "/how-it-works", variant: "hero-outline" },
];

const FinalCTA = ({
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  ctas = DEFAULT_CTAS,
}: FinalCTAProps = {}) => {
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
            {heading}
          </h2>
          <p className="text-base md:text-lg text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {ctas.map((cta, i) => (
              <Link key={cta.href} href={cta.href} className="inline-block">
                <Button
                  variant={cta.variant ?? (i === 0 ? "hero" : "hero-outline")}
                  size="lg"
                  className={(cta.variant ?? (i === 0 ? "hero" : "hero-outline")) === "hero" ? "group text-base" : "text-base"}
                >
                  {cta.label}
                  {(cta.variant ?? (i === 0 ? "hero" : "hero-outline")) === "hero" && (
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
