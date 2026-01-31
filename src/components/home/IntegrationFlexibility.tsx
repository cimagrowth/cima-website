import { motion } from "framer-motion";
import { Layers, Plug, Replace } from "lucide-react";

const IntegrationFlexibility = () => {
  const deploymentModes = [
    {
      icon: Replace,
      title: "Full Platform",
      subtitle: "Recommended",
      description: "Ditch the complexity. GrowthOS replaces your CRM entirely—one simple platform for patient engagement, pipelines, and follow-up. No more juggling tools.",
      audience: "Most clinics choose this path",
      gradient: "from-accent-orange to-secondary",
      featured: true,
    },
    {
      icon: Layers,
      title: "Transition Mode",
      subtitle: "Moving away from your CRM",
      description: "Already stuck in HubSpot, Salesforce, or Tebra? We'll help you migrate at your own pace while GrowthOS handles the heavy lifting.",
      audience: "For clinics ready to simplify",
      gradient: "from-secondary to-accent-orange",
      featured: false,
    },
    {
      icon: Plug,
      title: "Integration Mode",
      subtitle: "When you must stay",
      description: "Enterprise mandates or multi-location requirements? GrowthOS can sit alongside existing CRMs via API—but most clients realize they don't need them.",
      audience: "For enterprise groups with legacy systems",
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
            Enterprise power. <span className="text-gradient">Zero bloat.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for teams that want enterprise-grade capabilities without the six-month implementation, 
            bloated feature sets, or dedicated admin staff. GrowthOS delivers power without the complexity.
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
                <p className={`text-sm font-medium mb-3 ${mode.featured ? "text-accent-orange" : "text-muted-foreground"}`}>{mode.subtitle}</p>
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
          <p className="text-sm text-muted-foreground mb-6">Migrating from or integrating with</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-60">
            <span className="text-lg md:text-xl font-semibold text-foreground">Salesforce</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">HubSpot</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">Zoho</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">Keap</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">Tebra</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">DearDoc</span>
            <span className="text-lg md:text-xl font-semibold text-foreground">+ API</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationFlexibility;
