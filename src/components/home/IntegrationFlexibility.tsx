"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Plug, Replace } from "lucide-react";

const IntegrationFlexibility = () => {
  const deploymentModes = [
    {
      icon: Replace,
      title: "Full Platform",
      subtitle: "Most Popular",
      bestFor: "Clinics ready to simplify",
      whatHappens: "GrowthOS replaces your CRM entirely",
      integratesWith: "Native — nothing else needed",
      gradient: "from-accent-orange to-secondary",
      featured: true,
    },
    {
      icon: Layers,
      title: "Transition Mode",
      subtitle: "Migrating from another CRM",
      bestFor: "Clinics migrating from another CRM",
      whatHappens: "We migrate you at your pace while GrowthOS handles the heavy lifting",
      integratesWith: "HubSpot, Salesforce, Zoho, Keap, Tebra, DearDoc",
      gradient: "from-secondary to-accent-orange",
      featured: false,
    },
    {
      icon: Plug,
      title: "Integration Mode",
      subtitle: "Enterprise with legacy mandates",
      bestFor: "Enterprise groups with legacy mandates",
      whatHappens: "GrowthOS sits alongside your existing CRM via API",
      integratesWith: "Any system with an API",
      gradient: "from-primary to-primary-light",
      featured: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-display text-foreground mb-4 md:mb-6">
            Works However Your{" "}
            <span className="text-gradient">Clinic Works.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {deploymentModes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`card-elevated p-6 md:p-8 text-center group hover:shadow-glow transition-all duration-500 relative ${
                  mode.featured ? "ring-2 ring-accent-orange" : ""
                }`}
              >
                {mode.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-card`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{mode.title}</h3>
                <p className={`text-sm font-medium mb-4 ${mode.featured ? "text-accent-orange" : "text-muted-foreground"}`}>{mode.subtitle}</p>
                <div className="space-y-3 text-sm text-left">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Best for</p>
                    <p className="text-foreground">{mode.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What happens</p>
                    <p className="text-foreground">{mode.whatHappens}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Integrates with</p>
                    <p className="text-foreground">{mode.integratesWith}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationFlexibility;
