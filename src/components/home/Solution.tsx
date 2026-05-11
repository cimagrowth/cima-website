"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessagesSquare,
  HeartHandshake,
  GraduationCap,
  Building2,
  PenLine,
  Workflow,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

type Feature = {
  icon: typeof MessagesSquare;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: MessagesSquare,
    title: "Instant response on every channel",
    body: "Web chat, SMS, WhatsApp, email, Facebook and Instagram DMs, lead forms, and inside GoHighLevel / HubSpot / Salesforce. One brain, every channel.",
  },
  {
    icon: HeartHandshake,
    title: "Emotionally aware",
    body: "Knows the emotional context patients are in when they reach out — grief, anxiety, hope, curiosity — and responds in the way your specialty requires.",
  },
  {
    icon: GraduationCap,
    title: "Trained on your specialty",
    body: "Fertility, aesthetics, regenerative medicine, wellness. Clinical language, safety guardrails, and the things your kind of clinic must never say.",
  },
  {
    icon: Building2,
    title: "Trained on your clinic",
    body: "Your FAQ, your services, your pricing approach, your qualification questions, your scheduling rules, your voice.",
  },
  {
    icon: PenLine,
    title: "Retrainable in plain English",
    body: "Type “if a patient wants to book with Dr. Patel, check his calendar and offer three open slots” and the bot follows that rule on the next message. Correct any reply with one click; the lesson sticks across every future conversation.",
  },
  {
    icon: Workflow,
    title: "Connects to your CRM",
    body: "Power conversations directly inside GoHighLevel, HubSpot, or Salesforce. Your existing workflows keep working — the AI just makes them faster.",
  },
];

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
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center mb-4 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-display text-foreground mb-4 md:mb-6">
            An AI chat that actually{" "}
            <span className="text-gradient">understands your clinic.</span>
          </h2>
        </div>

        <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10 md:mb-16">
          The reason chatbots fail isn&rsquo;t speed &mdash; it&rsquo;s that they sound generic, say the wrong things, and don&rsquo;t know your business. GrowthOS is different. The chat goes live on web, SMS, WhatsApp, email, social DMs, your lead forms, and inside any CRM you already use. It answers in seconds, in your voice, with the answers you&rsquo;d give. It qualifies leads with the same questions your best front-desk person would ask. It books on your real calendar with your real appointment types. It follows up when a patient goes quiet. And it knows when not to talk &mdash; handing off to your team the moment a conversation is beyond its scope.
        </p>

        {/* 6-feature row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10 md:mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card-elevated p-6 md:p-7 border-l-4 border-accent-orange hover:shadow-glow transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-4">
                  <Icon
                    className="w-5 h-5 text-accent-orange"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>

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
