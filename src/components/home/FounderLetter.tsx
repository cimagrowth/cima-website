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
              I didn't build GrowthOS to be another piece of software.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              I built it after watching too many clinics lose patients for reasons 
              that had nothing to do with care quality.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Over the last decade, I've worked inside fertility and regenerative clinics 
              around the world. The pattern was always the same. Great doctors. Great teams. 
              But leads were missed. Follow-up was inconsistent. Systems didn't talk to each other.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="font-semibold text-gradient-accent inline-block"
            >
              GrowthOS is the system I wish clinics had years ago.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              It's intentionally simple. Every feature exists to help clinics respond faster, 
              follow up longer, and convert more patients without burning out their teams.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-muted-foreground"
            >
              If GrowthOS feels calm and focused, that's not accidental. It's what clinics need.
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
            <p className="text-body-sm text-accent-orange font-medium">
              Helping clinics grow since 2013
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderLetter;
