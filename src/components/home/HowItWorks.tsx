import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Patient reaches out",
      description: "From any channel — web form, call, text, or ad.",
    },
    {
      number: "02",
      title: "AI responds instantly",
      description: "No delays. Every inquiry gets immediate engagement.",
    },
    {
      number: "03",
      title: "AI follows up consistently",
      description: "The conversation continues over days or weeks.",
    },
    {
      number: "04",
      title: "Staff steps in at the right moment",
      description: "Your team takes over with full context when ready.",
    },
    {
      number: "05",
      title: "Everything is tracked",
      description: "Every message, lead, and outcome visible in one system.",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-tan relative overflow-hidden">
      {/* Connecting line decoration - desktop only */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            How it <span className="text-gradient-accent">works</span>
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
          <Link to="/demo">
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