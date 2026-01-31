import { motion } from "framer-motion";
import { Layers, Plug, Replace } from "lucide-react";

const IntegrationFlexibility = () => {
  const deploymentModes = [
    {
      icon: Plug,
      title: "Plug-In Mode",
      subtitle: "Keep your CRM",
      description: "GrowthOS sits on top of Salesforce, HubSpot, Zoho, or any CRM. The AI handles patient engagement while your team works in familiar tools.",
      audience: "For enterprise groups and established clinics",
      gradient: "from-primary to-primary-light",
    },
    {
      icon: Layers,
      title: "Hybrid Mode",
      subtitle: "Use what matters",
      description: "Pick the modules you need—AI follow-up, unified inbox, pipelines—and integrate with your existing stack via API.",
      audience: "For clinics with partial systems in place",
      gradient: "from-secondary to-accent-orange",
    },
    {
      icon: Replace,
      title: "Full Platform",
      subtitle: "Replace everything",
      description: "GrowthOS becomes your complete patient management infrastructure. No more spreadsheets, no more tool juggling.",
      audience: "For clinics ready to consolidate",
      gradient: "from-accent-orange to-secondary",
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
            Works with what you have—<span className="text-gradient">or becomes everything you need.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're running Salesforce across 50 locations, using HubSpot at a growing practice, 
            or managing leads in a spreadsheet—GrowthOS adapts to your reality.
          </p>
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
                className="card-elevated p-6 md:p-8 text-center group hover:shadow-glow transition-all duration-500"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-card`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{mode.title}</h3>
                <p className="text-sm font-medium text-accent-orange mb-3">{mode.subtitle}</p>
                <p className="text-sm md:text-base text-muted-foreground mb-4">{mode.description}</p>
                <p className="text-xs md:text-sm text-muted-foreground/70 italic">{mode.audience}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CRM Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Integrates with the tools you already use</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-60">
            <span className="text-lg md:text-xl font-semibold text-foreground">Salesforce</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">HubSpot</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">Zoho</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">Keap</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">+ API</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationFlexibility;
