import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const outcomes = [
    "Instant response",
    "Auto follow-up",
    "Full context handoff",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] md:min-h-[90vh] flex flex-col justify-between md:justify-center overflow-hidden bg-background">
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute top-10 right-0 w-56 h-56 md:w-72 md:h-72 bg-accent-orange/25 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 -left-10 w-40 h-40 md:w-48 md:h-48 bg-secondary/40 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-32 right-[20%] w-64 h-64 md:w-96 md:h-96 bg-primary-light/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <motion.div 
        className="container-wide relative z-10 flex-1 flex flex-col justify-center py-6 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* MOBILE: Giant headline taking up screen */}
        <div className="md:max-w-4xl">
          <motion.h1 
            variants={itemVariants}
            className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-display-xl lg:text-[4.5rem] text-foreground font-bold mb-4 md:mb-6 tracking-tight"
          >
            <span className="block">Every missed</span>
            <span className="block">follow-up costs</span>
            <span className="block">your clinic</span>
            <span className="block text-gradient-accent">patients.</span>
          </motion.h1>

          {/* Desktop only: subhead and description */}
          <motion.p
            variants={itemVariants}
            className="hidden md:block text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
          >
            GrowthOS is a patient engagement platform with a custom-trained AI that responds 
            instantly across every channel—web, phone, text, email, WhatsApp, Instagram, TikTok, 
            and more—then nurtures leads until your team steps in.
          </motion.p>

          {/* Desktop CTAs inline */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-row gap-4 mb-8"
          >
            <Link to="/demo">
              <Button variant="hero" size="lg" className="group text-base md:size-xl shadow-glow">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="lg" className="text-base md:size-xl">
                Sign Up
              </Button>
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="hidden md:block text-base text-secondary font-medium mb-6"
          >
            ⚡ Live onboarding in 24–48 hours • Desktop + mobile app
          </motion.p>

          {/* Desktop outcomes */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex flex-row gap-4"
          >
            {["Patients get a response immediately", "Follow-up continues automatically", "Your team steps in with full context"].map((outcome, index) => (
              <div key={index} className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50">
                <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0" />
                <span className="text-base text-foreground font-medium">{outcome}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* MOBILE ONLY: Bottom section with CTAs */}
      <motion.div 
        className="md:hidden relative z-10 px-6 pb-8 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Compact outcomes row */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center mb-2">
          {outcomes.map((outcome, index) => (
            <span 
              key={index} 
              className="inline-flex items-center gap-1.5 text-sm text-foreground/90 bg-card/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/40"
            >
              <CheckCircle className="w-3.5 h-3.5 text-accent-orange" />
              {outcome}
            </span>
          ))}
        </motion.div>

        {/* Full-width stacked CTAs */}
        <motion.div variants={itemVariants}>
          <Link to="/demo" className="block">
            <Button variant="hero" size="lg" className="w-full text-lg py-6 shadow-glow group">
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/pricing" className="block">
            <Button 
              variant="hero-outline" 
              size="lg" 
              className="w-full text-lg py-6 border-2 border-secondary text-foreground hover:border-secondary hover:bg-secondary/15 shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--secondary)/0.7)] transition-shadow"
            >
              Sign Up
            </Button>
          </Link>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-sm text-secondary font-medium pt-2">
          ⚡ Live in 24–48 hours
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;