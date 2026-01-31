import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Inbox, GitBranch, Zap, RefreshCw, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Product = () => {
  const modules = [
    {
      icon: Inbox,
      title: "Unified Inbox",
      description: "All patient conversations — calls, texts, emails, web forms — in a single timeline. Never lose context, never miss a message.",
      features: ["Multi-channel aggregation", "Conversation threading", "Team assignment", "Response tracking"],
      gradient: "from-primary to-primary-light",
    },
    {
      icon: GitBranch,
      title: "Pipelines and Patient Journeys",
      description: "Visual pipeline stages that match your actual patient flow. Know exactly where every inquiry stands.",
      features: ["Custom stage configuration", "Automatic stage progression", "Stale lead alerts", "Conversion tracking"],
      gradient: "from-accent-orange to-secondary",
    },
    {
      icon: Zap,
      title: "Automations and Nurture",
      description: "Follow-up that runs even when your team is offline. Immediate response, timed reminders, and long-term nurturing.",
      features: ["Missed-call text back", "Appointment reminders", "No-show sequences", "Long-term nurture drips"],
      gradient: "from-secondary to-primary-light",
    },
    {
      icon: RefreshCw,
      title: "Reactivation Campaigns",
      description: "Turn dormant leads into consults. Monthly SMS and email campaigns targeting cold inquiries and past patients.",
      features: ["Segmented targeting", "Multi-touch sequences", "Opt-out management", "Response tracking"],
      gradient: "from-primary-light to-accent-orange",
    },
    {
      icon: BarChart3,
      title: "Reporting and Attribution",
      description: "Know exactly what is driving booked patients. Clear dashboards that show performance at every stage.",
      features: ["Source attribution", "Stage conversion rates", "Response time metrics", "Team performance"],
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        
        <div className="container-wide relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              GrowthOS is your clinic's{" "}
              <span className="text-gradient-accent">growth command center.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-10">
              One unified system for patient communication, follow-up automation, 
              and growth analytics — built specifically for fertility and regenerative clinics.
            </p>
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl" />
        
        <div className="container-wide relative z-10">
          <div className="space-y-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-elevated p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center hover:shadow-glow transition-all duration-500"
                >
                  <div className={isEven ? "" : "md:order-2"}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-6 shadow-card`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-heading text-foreground mb-4">{module.title}</h2>
                    <p className="text-body-lg text-muted-foreground">{module.description}</p>
                  </div>
                  <div className={`bg-gradient-to-br from-accent/50 to-tan rounded-xl p-6 border border-border ${isEven ? "" : "md:order-1"}`}>
                    <h4 className="text-body-sm font-semibold text-accent-orange uppercase tracking-wider mb-4">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {module.features.map((feature, fIndex) => (
                        <motion.li 
                          key={fIndex} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + fIndex * 0.1 }}
                          className="flex items-center gap-3 text-body text-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-orange to-secondary flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl" />
        
        <div className="container-wide relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-heading-lg md:text-display text-primary-foreground mb-6">
              Ready to see GrowthOS in action?
            </h2>
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group shadow-glow">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
