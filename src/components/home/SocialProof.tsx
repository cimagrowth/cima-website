import { motion } from "framer-motion";

const SocialProof = () => {
  const verticals = [
    "Fertility",
    "IVF",
    "REI",
    "Regenerative",
    "Wellness",
  ];

  return (
    <section className="py-12 bg-primary relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light/20 to-primary opacity-50" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <span className="text-body-sm text-primary-foreground/70 font-medium">
            Built for:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {verticals.map((vertical, index) => (
              <motion.span
                key={vertical}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-body font-medium text-primary-foreground"
              >
                {vertical}
                {index < verticals.length - 1 && (
                  <span className="ml-3 md:ml-6 text-primary-foreground/30">•</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
