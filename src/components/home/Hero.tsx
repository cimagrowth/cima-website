import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const outcomes = [
    "Faster response to every inquiry",
    "Consistent follow-up without staff overload",
    "Clear visibility into what actually drives bookings",
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Parallax decorative elements */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2, scale: scale2, opacity: opacity1 }}
        className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y3, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-1/3 left-[15%] w-48 h-48 bg-primary/5 rounded-full blur-2xl" 
      />
      <motion.div 
        style={{ y: y1, scale: scale2 }}
        className="absolute bottom-1/4 right-[20%] w-32 h-32 bg-secondary/15 rounded-full blur-2xl" 
      />
      
      <div className="container-wide relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium mb-8 shadow-card"
          >
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
            For Fertility & Regenerative Clinics
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-lg md:text-display-xl text-foreground mb-6"
          >
            GrowthOS is the all-in-one growth operating system for clinics that want{" "}
            <span className="text-gradient-accent">more booked patients.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Capture leads, respond instantly, nurture automatically, and track what converts. 
            GrowthOS replaces fragmented tools with one unified system built specifically for 
            fertility and regenerative clinics.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="xl">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Microcopy */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-body-sm text-muted-foreground mb-16"
          >
            <span>30 minutes. No sales pressure.</span>
            <span className="hidden sm:inline text-border">•</span>
            <span>Simple. Transparent.</span>
          </motion.div>

          {/* Outcome bullets */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 text-left p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-6 h-6 rounded-full bg-accent-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent-orange" />
                </div>
                <span className="text-body text-foreground font-medium">{outcome}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
