"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AIStudio = () => {
  return (
    <section id="ai-studio" className="py-12 md:py-24 lg:py-32 bg-tan relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-orange/5 rounded-full blur-3xl hidden md:block" />
      
      <div className="container-wide relative z-10">
        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-accent-orange via-secondary to-primary max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-glow">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Want a preview of how our AI is built?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              Get access to the Cima AI Studio, a free toolkit that shows how we design 
              patient-safe, clinic-approved messaging.
            </p>
            <a href="https://www.CimaAIStudio.com" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="pulse-glow text-base md:size-xl">
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