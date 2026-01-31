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

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />
      
      <div className="container-wide relative z-10 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-display-lg md:text-display-xl lg:text-[4rem] text-foreground mb-6 leading-tight">
              Every missed follow-up costs your clinic patients.{" "}
              <span className="text-gradient-accent">GrowthOS makes sure it never happens.</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-body-lg md:text-xl text-muted-foreground mb-8 max-w-3xl"
          >
            GrowthOS uses a custom-trained AI to respond instantly, follow up consistently, 
            and keep patients engaged until your team steps in. The platform around it keeps 
            every conversation organized, tracked, and measurable so nothing gets lost.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Sign Up
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-body-sm text-muted-foreground mb-6"
          >
            See the AI handle real patient inquiries • $999/month or $9,999/year
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0" />
                <span className="text-body-sm text-foreground">{outcome}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;