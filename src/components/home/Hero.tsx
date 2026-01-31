import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const outcomes = [
    "Patients get a response immediately",
    "Follow-up continues automatically",
    "Your team steps in with full context",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="hero" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Mobile-enhanced background with animated glows */}
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Animated glow orbs - visible on all devices */}
      <motion.div 
        className="absolute top-10 right-[5%] w-40 h-40 md:w-72 md:h-72 bg-accent-orange/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-[10%] w-32 h-32 md:w-48 md:h-48 bg-secondary/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-[15%] w-48 h-48 md:w-96 md:h-96 bg-primary-light/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Subtle grid pattern overlay for mobile texture */}
      <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <motion.div 
        className="container-wide relative z-10 py-8 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.h1 
            variants={itemVariants}
            className="text-[1.85rem] leading-[1.15] sm:text-4xl md:text-display-xl lg:text-[4rem] text-foreground font-bold mb-5 md:mb-6"
          >
            Every missed follow-up costs your clinic patients.{" "}
            <span className="text-gradient-accent">GrowthOS makes sure it never happens.</span>
          </motion.h1>

          {/* CTAs - Enhanced for mobile with glow effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <Link to="/demo" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto text-base md:size-xl shadow-glow">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="w-full sm:w-auto text-base md:size-xl border-2 border-secondary/60 hover:border-secondary hover:bg-secondary/10"
              >
                Sign Up
              </Button>
            </Link>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-muted-foreground mb-5 md:mb-8 max-w-3xl leading-relaxed"
          >
            GrowthOS is a patient engagement platform with a custom-trained AI that responds 
            instantly across every channel—web, phone, text, email, WhatsApp, Instagram, TikTok, 
            and more—then nurtures leads until your team steps in.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-secondary font-medium mb-5 md:mb-6"
          >
            ⚡ Live onboarding in 24–48 hours • Desktop + mobile app
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            {outcomes.map((outcome, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2.5 bg-card/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground font-medium">{outcome}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;