import { Inbox, Zap, RefreshCw, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Solution = () => {
  const modules = [
    {
      icon: Inbox,
      title: "Unified Clinic Inbox and Pipeline Hub",
      description: "All patient conversations in one place with full visibility.",
      gradient: "from-primary to-primary-light",
    },
    {
      icon: Zap,
      title: "Automated Follow-Up and Nurture",
      description: "Immediate response, reminders, and long-term nurturing that runs automatically.",
      gradient: "from-accent-orange to-secondary",
    },
    {
      icon: RefreshCw,
      title: "Database Reactivation Engine",
      description: "Monthly SMS and email campaigns that turn dormant leads into consults.",
      gradient: "from-secondary to-primary-light",
    },
    {
      icon: TrendingUp,
      title: "Attribution and Growth Reporting",
      description: "Know exactly what is driving booked patients.",
      gradient: "from-primary-light to-accent-orange",
    },
  ];

  return (
    <section className="section-padding bg-tan relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            GrowthOS replaces chaos with{" "}
            <span className="text-gradient">clarity.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-8 flex gap-5 group hover:shadow-glow transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-heading-sm text-foreground mb-2">{module.title}</h3>
                  <p className="text-body text-muted-foreground">{module.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;
