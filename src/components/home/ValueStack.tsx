"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

const valueItems = [
  { feature: "AI Patient Agent", replaces: "Chatbot + after-hours answering service", cost: "$500-1,500/mo" },
  { feature: "Behavioral Lead Scoring", replaces: "Manual lead qualification", cost: "$200-500/mo" },
  { feature: "Multi-Channel Unified Inbox", replaces: "4-6 separate platforms", cost: "$300-800/mo" },
  { feature: "AI Outreach Engine", replaces: "SDR or outreach agency", cost: "$3,000-5,000/mo" },
  { feature: "AI Campaign Builder", replaces: "Marketing agency", cost: "$5,000-10,000/mo" },
  { feature: "Google & Facebook Ads Manager", replaces: "Ads agency", cost: "$2,000-5,000/mo" },
  { feature: "AI Landing Page Builder", replaces: "Landing page tool + designer", cost: "$200-500/mo" },
  { feature: "Pipeline & Patient Journey Management", replaces: "CRM platform", cost: "$150-300/mo" },
  { feature: "EHR Integration", replaces: "Integration middleware", cost: "$500-1,000/mo" },
  { feature: "Reactivation Campaigns", replaces: "Re-engagement agency", cost: "$1,000-2,000/mo" },
  { feature: "Custom Domain + Branding", replaces: "Web developer", cost: "$1,000+ setup" },
  { feature: "Desktop + Mobile App", replaces: "—", cost: "Included" },
  { feature: "A2P 10DLC Compliance", replaces: "Compliance consultant", cost: "$500+ setup" },
  { feature: "Multi-Language Support", replaces: "Translation service", cost: "$200-500/mo" },
];

const ValueStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section id="value-stack" ref={sectionRef} className="py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <motion.div
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl hidden md:block"
      />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            One Platform Replaces Your{" "}
            <span className="text-gradient-accent">Entire Marketing Stack.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Here's everything included in GrowthOS at $999/month:
          </p>
        </div>

        {/* Value table */}
        <div className="overflow-x-auto rounded-2xl border border-border shadow-card mb-8 md:mb-12">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tl-2xl">What You Get</th>
                <th className="text-left px-4 md:px-6 py-4 font-semibold hidden sm:table-cell">What It Replaces</th>
                <th className="text-right px-4 md:px-6 py-4 font-semibold text-accent-orange rounded-tr-2xl">Separate Cost</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {valueItems.map((item, i) => (
                <tr
                  key={i}
                  className={i < valueItems.length - 1 ? "border-b border-border" : ""}
                >
                  <td className="px-4 md:px-6 py-3 font-medium text-foreground">{item.feature}</td>
                  <td className="px-4 md:px-6 py-3 text-muted-foreground hidden sm:table-cell">{item.replaces}</td>
                  <td className="px-4 md:px-6 py-3 text-right text-muted-foreground">{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price anchor */}
        <div className="text-center space-y-3 mb-8 md:mb-12">
          <p className="text-base md:text-lg text-muted-foreground">
            Total value if purchased separately: <span className="font-bold text-foreground">$13,550-$27,600/month</span>
          </p>
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            GrowthOS: <span className="text-accent-orange">$999/month.</span>
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            No setup fee. Live in 48 hours. Cancel anytime.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sign-up">
            <Button variant="hero" size="lg" className="group shadow-glow">
              Start Now
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="hero-outline" size="lg">
              Book a Demo First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValueStack;
