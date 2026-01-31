import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect your lead sources",
      description: "Integrate your website forms, ad platforms, and communication channels.",
    },
    {
      number: "02",
      title: "Train the AI on your clinic's voice",
      description: "Configure approved messaging, tone, and workflows for your practice.",
    },
    {
      number: "03",
      title: "AI responds, nurtures, and hands off",
      description: "Every inquiry is engaged instantly and nurtured automatically over time.",
    },
    {
      number: "04",
      title: "Your team focuses on ready patients",
      description: "Staff steps in only when patients are qualified and ready to book.",
    },
  ];

  return (
    <section className="section-padding bg-tan relative overflow-hidden">
      {/* Connecting line decoration */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            How it <span className="text-gradient-accent">works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground text-heading-sm font-bold mb-6 shadow-card">
                {step.number}
              </div>
              <h3 className="text-heading-sm text-foreground mb-3">{step.title}</h3>
              <p className="text-body text-muted-foreground">{step.description}</p>
              
              {/* Connector arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 -right-4 w-8 items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-accent-orange" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/demo">
            <Button variant="hero" size="xl" className="group">
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;