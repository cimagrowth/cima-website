"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AIStudio = () => {
  return (
    <section id="ai-studio" className="section-padding bg-mist relative overflow-hidden">
      <div className="container-wide relative z-10">
        <div className="relative max-w-4xl lg:max-w-5xl mx-auto">
          <div className="bg-paper rounded-xl2 border border-sand shadow-[var(--shadow)] p-8 md:p-12 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-teal flex items-center justify-center mx-auto mb-5 md:mb-6">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-paper" />
            </div>
            <h2 className="font-display font-[340] tracking-tight text-2xl md:text-3xl lg:text-4xl text-teal-deep mb-4">
              Want a preview of how our AI is built?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto">
              Get access to the Cima AI Studio, a free toolkit that shows how we design
              patient-safe, clinic-approved messaging.
            </p>
            <a href="https://www.CimaAIStudio.com" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="text-base md:size-xl">
                Get the Free AI Studio
              </Button>
            </a>
            <p className="text-sm text-muted-foreground mt-4">Preview our AI approach</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;