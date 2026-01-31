import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Authority = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
      
      {/* Parallax decorative elements */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2, scale: scale1, opacity: opacity1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl" 
      />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-heading-lg md:text-display text-primary-foreground mb-6">
            Built for clinics,{" "}
            <span className="text-accent-orange">not generic businesses.</span>
          </h2>
          <p className="text-body-lg text-primary-foreground/80">
            Cima Growth Solutions has worked exclusively with fertility and regenerative clinics 
            for over a decade. GrowthOS is built from real-world clinic workflows, not SaaS theory.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
