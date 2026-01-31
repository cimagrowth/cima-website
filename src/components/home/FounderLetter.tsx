import { motion } from "framer-motion";

const FounderLetter = () => {
  return (
    <section className="section-padding bg-background relative">
      {/* Subtle side accent */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-accent-orange to-transparent" />
      
      <div className="container-tight relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-body-sm font-semibold text-accent-orange uppercase tracking-widest mb-8">
            From the Founder
          </h3>
          
          <div className="space-y-6 text-body-lg text-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              I built GrowthOS after watching clinics lose patients for reasons that had nothing to do with care quality.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              The real problem wasn't marketing. It was leakage. Patients reached out, and no one responded fast enough. Or follow-up stopped too soon. Or staff was stretched thin.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              GrowthOS is built around a simple belief: humans shouldn't be the first line of defense against patient loss.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              So we built a custom AI system that responds instantly, nurtures consistently, and supports clinic teams instead of replacing them.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              The inboxes, pipelines, and reports exist for one reason: to make sure the AI works transparently, safely, and in alignment with your clinic.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-muted-foreground"
            >
              If GrowthOS feels calm and intentional, that's because it's designed to remove pressure from people and put it on systems.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="font-semibold text-foreground text-lg">— Brandon Hensinger</p>
            <p className="text-body-sm text-muted-foreground mt-1">
              Founder, Cima Growth Solutions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderLetter;