"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Kickoff Call",
      description: "A 45-minute session where we collect your FAQ, voice, services, scheduling rules, and appointment types. You give us what your best front-desk person already knows.",
    },
    {
      number: "02",
      title: "Specialty + Clinic Training",
      description: "We train the AI on your field: fertility, aesthetics, regenerative, wellness. Then we layer in your clinic specifics. Everything is reviewable in the dashboard before it goes live.",
    },
    {
      number: "03",
      title: "Calendar + Channels Wired",
      description: "Real calendar integration, appointment types, and the chat widget embedded on your site. SMS, WhatsApp, email, and social DMs queued up to turn on when you’re ready.",
    },
    {
      number: "04",
      title: "Web Chat Goes Live",
      description: "Within 24 hours of kickoff, the AI is replying to inquiries in your voice, qualifying patients, and booking on your real calendar.",
    },
    {
      number: "05",
      title: "First AI-Booked Appointment",
      description: "Most clinics see one the same day. You watch every conversation in the GrowthOS inbox and correct anything you don’t like. The lesson sticks for every future patient.",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-tan relative overflow-hidden">
      {/* Connecting line decoration - desktop only */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl lg:max-w-4xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            Live in your clinic{" "}
            <span className="text-gradient-accent">within 24 hours.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-left md:text-center">
            We train the AI on your clinic in the first few hours. The bot goes live on web chat the same day. SMS, WhatsApp, email, and social channels turn on as you&rsquo;re ready. Most clinics see their first AI-booked appointment inside the first 24 hours. You don&rsquo;t replace any of your existing tools to start. GrowthOS works alongside them and can take over the pieces you&rsquo;re tired of paying for.
          </p>
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
