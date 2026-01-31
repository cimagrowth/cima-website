import { Clock, MessageCircle, Users, RefreshCw, Eye } from "lucide-react";
import { motion } from "framer-motion";

const UseCases = () => {
  const useCases = [
    { icon: Clock, text: "Stop losing after-hours inquiries" },
    { icon: MessageCircle, text: "Ensure every lead is followed up consistently" },
    { icon: Users, text: "Reduce staff load without sacrificing experience" },
    { icon: RefreshCw, text: "Reactivate cold leads automatically" },
    { icon: Eye, text: "Gain visibility into patient leakage" },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            What you can <span className="text-gradient-accent">achieve</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-body text-foreground font-medium">{useCase.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;