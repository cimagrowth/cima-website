"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.6, 0.6, 0.2]);

  return (
    <section id="solution" ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-tan relative overflow-hidden">
      {/* Parallax background pattern - hidden on mobile */}
      <div className="absolute inset-0 opacity-30 hidden md:block">
        <motion.div
          style={{ y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
          className="absolute top-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2, scale: scale1, opacity: opacity1 }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-display text-foreground mb-4 md:mb-6">
            This Isn't a Chatbot.{" "}
            <span className="text-gradient">It's an AI That Understands What Your Patients Are Feeling.</span>
          </h2>
        </div>

        <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10 md:mb-16">
          Most "AI chatbots" sound like a phone tree with a thesaurus. GrowthOS is different.
          The AI is trained on your specialty — fertility, aesthetics, regenerative medicine, wellness — and
          fine-tuned on YOUR clinic's voice, policies, procedures, and qualification criteria.
        </p>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10 md:mb-16">
          <div className="card-elevated p-5 md:p-8 border-l-4 border-muted-foreground/30">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Generic chatbot:</p>
            <p className="text-sm md:text-base text-muted-foreground italic">
              "Thank you for your inquiry. A team member will be in touch shortly. Please allow 24-48 hours for a response."
            </p>
          </div>
          <div className="card-elevated p-5 md:p-8 border-l-4 border-accent-orange hover:shadow-glow transition-all duration-500">
            <p className="text-sm font-semibold text-accent-orange uppercase tracking-wider mb-3">GrowthOS AI (fertility clinic, evening inquiry):</p>
            <p className="text-sm md:text-base text-foreground italic">
              "Hi Sarah — I know reaching out about fertility can feel like a big step, and I want you to know we're here for you. Dr. Ramirez's team specializes in patients just starting to explore their options. Can I ask a couple of quick questions so we can match you with the right consultation type?"
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
          The AI reads tone. It adapts. It nurtures a nervous first-time IVF patient differently than a returning Botox client.
          It follows up across days or weeks — never pushy, never robotic — until the patient is ready. Then it hands off to
          your team with the <strong className="text-foreground">full conversation history</strong>, so the patient never repeats themselves.
        </p>

        {/* CTA */}
        <div className="text-center">
          <Link href="/demo">
            <Button variant="hero" size="lg" className="group">
              See the AI in Action — Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solution;
