import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-heading-lg md:text-display text-primary-foreground mb-8">
            Growth doesn't require more effort.{" "}
            <span className="text-accent-orange">It requires better systems.</span>
          </h2>
          <Link to="/demo">
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
