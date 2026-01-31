import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AIStudio = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-1 rounded-2xl bg-gradient-to-br from-accent-orange via-secondary to-primary max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-xl p-8 md:p-12 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-6 shadow-glow"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-heading-lg text-foreground mb-4">
              Want a preview of how we think?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get access to the Cima AI Studio, a free AI-powered toolkit designed for 
              clinic marketing and patient communication.
            </p>
            <Button variant="hero" size="xl" className="pulse-glow">
              Get the Free AI Studio
            </Button>
            <p className="text-body-sm text-muted-foreground mt-4">Instant access</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIStudio;
