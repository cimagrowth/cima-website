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
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />
      
      <motion.div 
        className="container-wide relative z-10 py-12 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-display-xl lg:text-[4rem] text-foreground mb-4 md:mb-6 leading-tight"
          >
            Every missed follow-up costs your clinic patients.{" "}
            <span className="text-gradient-accent">GrowthOS makes sure it never happens.</span>
          </motion.h1>

          {/* CTAs - shown on all devices, positioned early for mobile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <Link to="/demo">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto md:size-xl">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto md:size-xl">
                Sign Up
              </Button>
            </Link>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl"
          >
            GrowthOS uses a custom-trained AI to respond instantly, follow up consistently, 
            and keep patients engaged until your team steps in. The platform around it keeps 
            every conversation organized, tracked, and measurable so nothing gets lost.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground mb-4 md:mb-6"
          >
            See the AI handle real patient inquiries • $999/month or $9,999/year
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent-orange flex-shrink-0" />
                <span className="text-sm md:text-base text-foreground">{outcome}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;