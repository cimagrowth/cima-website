"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Patient Reaches Out",
      description: "Any channel. Any time. Web form, phone call, text, email, WhatsApp, Instagram, TikTok, Facebook, or Google My Business.",
    },
    {
      number: "02",
      title: "AI Responds in Seconds",
      description: "Not a template. The AI reads the context, adapts its tone to the patient's emotional state, and responds with empathy and precision — trained on your clinic's exact services and policies.",
    },
    {
      number: "03",
      title: "AI Qualifies and Scores",
      description: "Behavioral lead scoring categorizes every inquiry as Hot, Warm, or Cold. The AI asks the right qualification questions without feeling like an interrogation.",
    },
    {
      number: "04",
      title: "AI Nurtures Over Days or Weeks",
      description: "Multi-channel follow-up that doesn't stop after one message. The AI varies its approach — different angles, different channels — until the patient is ready or disengages.",
    },
    {
      number: "05",
      title: "Your Team Steps In With Full Context",
      description: "Real-time alert on desktop or mobile. One click opens the full conversation history. Your team closes with confidence — the patient never repeats themselves.",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-tan relative overflow-hidden">
      {/* Connecting line decoration - desktop only */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            From Inquiry to Appointment in{" "}
            <span className="text-gradient-accent">5 Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-10 md:mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground text-base md:text-lg font-bold mb-4 md:mb-6 shadow-card">
                {step.number}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">{step.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>

              {/* Connector arrow - desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-6 md:top-8 -right-2 md:-right-4 w-6 md:w-8 items-center justify-center">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-accent-orange" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/demo">
            <Button variant="hero" size="lg" className="group text-base md:size-xl">
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
