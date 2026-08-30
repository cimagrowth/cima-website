"use client";

import { motion } from "framer-motion";

const Reframe = () => {
  return (
    <section
      id="reframe"
      className="bg-background section-padding relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative pl-6 md:pl-10 border-l-2 border-accent-orange/70"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              The Real Problem
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-8 md:mb-10">
              Your growth shouldn&rsquo;t depend on someone{" "}
              <span className="text-gradient-accent">
                remembering to do it.
              </span>
            </h2>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                A slow reply at 9pm is what you notice. What you don&rsquo;t see
                is everything upstream and downstream of it. The ads that need
                a media buyer watching them. The outreach no one has time to
                send. The seven follow-ups a patient needs before they book, and the front desk that stops at one. The reviews you
                never ask for.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="text-foreground font-medium"
              >
                All of it depends on humans who are stretched thin, or an
                agency that bills you whether or not the work happened.
                That&rsquo;s not a clinic problem. It&rsquo;s a
                staffing-and-reliability problem, and you can&rsquo;t
                fix it by spending more on ads.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reframe;
