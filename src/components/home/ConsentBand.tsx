"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const ConsentBand = () => {
  return (
    <section id="consent-band" className="section-padding-sm bg-cream relative overflow-hidden">
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-white rounded-xl2 border border-sand shadow-[var(--shadow-sm)] p-8 md:p-11"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal" aria-hidden="true" />
            </span>
            <span className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay">
              New: consent that fires from your pipeline.
            </span>
          </div>

          <h2 className="font-display text-[clamp(24px,3.4vw,40px)] font-[340] tracking-tight text-foreground leading-tight mb-4">
            Branded video education and multi-party e-signature, running inside
            your CRM instead of beside it.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-7 max-w-2xl">
            Full fertility and aesthetics libraries included.
          </p>

          <Link
            href="/consent"
            className="group inline-flex items-center gap-2 font-ui text-base font-semibold text-teal hover:text-teal-deep transition-colors"
          >
            See how it works
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsentBand;
