import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useVisitor } from "@/contexts/VisitorContext";

const FinalCTA = () => {
  const { visitor } = useVisitor();
  const businessName = visitor?.businessName;
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
    <section id="cta" ref={sectionRef} className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
      
      {/* Parallax decorative elements - hidden on mobile */}
      <motion.div 
        style={{ y: y1, scale: scale1, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-accent-orange/20 rounded-full blur-3xl hidden md:block" 
      />
      <motion.div 
        style={{ y: y2, scale: scale2, opacity: opacity1 }}
        className="absolute bottom-0 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-secondary/30 rounded-full blur-3xl hidden md:block" 
      />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-display text-primary-foreground mb-6">
            {businessName ? (
              <>
                {businessName} deserves predictable growth. It starts with{" "}
                <span className="text-accent-orange">predictable follow-up.</span>
              </>
            ) : (
              <>
                If your clinic wants predictable growth, it starts with{" "}
                <span className="text-accent-orange">predictable follow-up.</span>
              </>
            )}
          </h2>
          <a href="https://os.cimagrowth.com/demo/register" className="inline-block">
            <Button
              variant="hero"
              size="lg"
              className="group shadow-glow bg-accent-orange hover:brightness-110 text-base md:size-xl"
            >
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;