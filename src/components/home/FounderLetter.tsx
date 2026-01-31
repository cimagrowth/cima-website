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
            Why I built GrowthOS
          </h3>
          
          <div className="space-y-6 text-body-lg text-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              I kept seeing clinics lose patients for reasons that had nothing to do with care quality.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              People were doing their best, but they were busy. Calls were missed. Follow-up slipped. Patients went quiet.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              So we built a system that doesn't rely on perfect timing or perfect memory.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              GrowthOS responds instantly, follows up consistently, and keeps every conversation organized in one place so your team always knows what's happening and what to do next.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-muted-foreground"
            >
              It's not meant to replace people. It's meant to back them up.
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