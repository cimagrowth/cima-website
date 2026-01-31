import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const FinalCTA = () => {
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
      
      {/* Parallax decorative elements */}
      <motion.div 
        style={{ y: y1, scale: scale1, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2, scale: scale2, opacity: opacity1 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" 
      />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-heading-lg md:text-display text-primary-foreground mb-4">
            If your clinic wants predictable growth, it starts with{" "}
            <span className="text-accent-orange">predictable follow-up.</span>
          </h2>
          <Link to="/demo" className="mt-8 inline-block">
            <Button 
              variant="hero" 
              size="xl" 
              className="group shadow-glow bg-accent-orange hover:brightness-110"
            >
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;