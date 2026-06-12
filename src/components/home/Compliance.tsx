"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MessageSquareLock,
  Network,
  Stethoscope,
  Map,
} from "lucide-react";

type ComplianceCard = {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
};

const cards: ComplianceCard[] = [
  {
    icon: ShieldCheck,
    title: "HIPAA-grade PHI handling + BAA",
    body: "Patient data encrypted and handled to clinical standard, with a Business Associate Agreement. Not a bolt-on.",
  },
  {
    icon: MessageSquareLock,
    title: "A2P 10DLC + clinical consent built in",
    body: "Texting compliance and consent language designed for healthcare, configured for you.",
  },
  {
    icon: Network,
    title: "EHR / EMR integration",
    body: "Connects to ModMed and more. Horizontal platforms won’t touch this.",
  },
  {
    icon: Stethoscope,
    title: "Clinical AI guardrails",
    body: "The AI knows what your specialty must never say. Safety rules baked into every reply.",
  },
  {
    icon: Map,
    title: "Pre-built clinical patient journeys",
    body: "Mapped to real clinical reality (e.g. IVF cycle stages, treatment series) — not blank automations you build from scratch.",
  },
];

const Compliance = () => {
  return (
    <section
      id="compliance"
      className="bg-background section-padding relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
            Built For Healthcare
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-6">
            Built for healthcare from day one &mdash;{" "}
            <span className="text-gradient-accent">
              not a generic tool with a medical coat of paint.
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            HubSpot and GoHighLevel were built for everyone, which means they
            were built for no one in particular. The things a clinic actually
            needs are afterthoughts there &mdash; and workarounds for you. For
            us they&rsquo;re the foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="bg-paper rounded-xl2 border border-sand p-7 md:p-8 shadow-[var(--shadow-sm)] flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon
                    className="w-6 h-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Compliance;
