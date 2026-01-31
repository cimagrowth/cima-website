import { useRef } from "react";
import { Inbox, Settings, RefreshCw, BarChart3 } from "lucide-react";
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

  const systems = [
    {
      icon: Inbox,
      title: "Unified Inbox",
      description: "All patient conversations in one place (AI + staff) so nothing slips.",
    },
    {
      icon: Settings,
      title: "Pipelines and Patient Journeys",
      description: "Clear stages so every lead is tracked and managed properly.",
    },
    {
      icon: RefreshCw,
      title: "Follow-Up Rules and Automations",
      description: "Set the standards once. The system enforces them daily.",
    },
    {
      icon: BarChart3,
      title: "Reactivation Campaigns",
      description: "Bring cold leads back with scheduled SMS and email outreach.",
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2, scale: scale1, opacity: opacity1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl" 
      />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            The platform that makes the AI work{" "}
            <span className="text-gradient-accent">cleanly across your entire clinic.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground mt-4">
            The AI is the engine. GrowthOS is the system it runs inside. That means every 
            message, every lead, and every outcome is visible, organized, and actionable. 
            Your clinic can finally operate with consistency instead of hero effort.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 flex gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-heading-sm text-foreground mb-2">{system.title}</h3>
                  <p className="text-body text-muted-foreground">{system.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Authority;