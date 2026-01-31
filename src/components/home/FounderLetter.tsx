import { motion } from "framer-motion";

const FounderLetter = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative">
      {/* Subtle side accent - hidden on mobile */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-accent-orange to-transparent hidden md:block" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xs md:text-sm font-semibold text-accent-orange uppercase tracking-widest mb-6 md:mb-8">
            Why I built GrowthOS
          </h3>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-lg text-foreground">
            <p>
              I kept seeing clinics lose patients for reasons that had nothing to do with care quality.
            </p>
            
            <p>
              People were doing their best, but they were busy. Calls were missed. Follow-up slipped. Patients went quiet.
            </p>
            
            <p>
              So we built a system that doesn't rely on perfect timing or perfect memory.
            </p>
            
            <p>
              GrowthOS responds instantly, follows up consistently, and keeps every conversation organized in one place so your team always knows what's happening and what to do next.
            </p>
            
            <p className="text-muted-foreground">
              It's not meant to replace people. It's meant to back them up.
            </p>
          </div>

          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <p className="font-semibold text-foreground text-base md:text-lg">— Brandon Hensinger</p>
            <p className="text-sm text-muted-foreground mt-1">
              Founder, Cima Growth Solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderLetter;