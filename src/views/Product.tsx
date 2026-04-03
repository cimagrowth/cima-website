'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, MessageCircle, Brain, UserCheck, Inbox, GitBranch, Settings, RefreshCw, BarChart3, ArrowRight, Plug, Layers, Replace } from "lucide-react";
import { motion } from "framer-motion";

const Product = () => {
  const aiEngine = [
    {
      icon: Zap,
      title: "Instant response",
      description: "Every inquiry gets immediate engagement, no matter when it comes in.",
    },
    {
      icon: MessageCircle,
      title: "Automated nurturing",
      description: "Follow-up continues over days or weeks without manual effort.",
    },
    {
      icon: Brain,
      title: "Clinic voice + rules",
      description: "The AI communicates using your approved messaging and tone.",
    },
    {
      icon: UserCheck,
      title: "Staff handoff with context",
      description: "When patients are ready, your team steps in with the full conversation.",
    },
  ];

  const systemModules = [
    {
      icon: Inbox,
      title: "Unified inbox (AI + staff)",
      description: "All patient conversations in one place so nothing slips.",
      features: ["Multi-channel aggregation", "Conversation threading", "Team assignment"],
    },
    {
      icon: GitBranch,
      title: "Pipelines and patient journeys",
      description: "Clear stages so every lead is tracked and managed properly.",
      features: ["Custom stage configuration", "Automatic progression", "Stale lead alerts"],
    },
    {
      icon: Settings,
      title: "Follow-up rules and automations",
      description: "Set the standards once. The system enforces them daily.",
      features: ["Missed-call text back", "Appointment reminders", "No-show sequences"],
    },
    {
      icon: RefreshCw,
      title: "Reactivation campaigns",
      description: "Bring cold leads back with scheduled SMS and email outreach.",
      features: ["Segmented targeting", "Multi-touch sequences", "Response tracking"],
    },
    {
      icon: BarChart3,
      title: "Reporting and visibility",
      description: "See response speed, conversion movement, and where patients drop off.",
      features: ["Source attribution", "Stage conversion rates", "Team performance"],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              GrowthOS is the AI follow-up engine{" "}
              <span className="text-gradient-accent">plus the platform your clinic runs it on.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Instant response, consistent nurturing, and clean staff handoff — powered by a
              custom-trained AI. Works with your existing CRM or becomes your complete infrastructure.
              Use the pieces that matter, or adopt the full platform.
            </p>
            <Link href="/demo">
              <Button variant="hero" size="xl" className="group">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI Engine Section */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              The AI Engine
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              A custom-trained AI that responds instantly and nurtures consistently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiEngine.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-6 text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange to-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-card">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-sm text-foreground mb-2">{item.title}</h3>
                  <p className="text-body text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Around It */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              The System Around It
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Everything your clinic needs to operate with consistency instead of hero effort.
            </p>
          </motion.div>

          <div className="space-y-6">
            {systemModules.map((module, index) => {
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
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 shadow-card">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-heading text-foreground mb-3">{module.title}</h3>
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

      {/* Integration Flexibility */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-heading-lg md:text-display text-foreground mb-4">
              Fits Your Infrastructure
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're running enterprise CRMs across multiple locations or managing leads in spreadsheets—GrowthOS adapts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Plug,
                title: "Plug-In Mode",
                subtitle: "Keep your CRM",
                description: "GrowthOS sits on top of Salesforce, HubSpot, Zoho, or any system. The AI handles patient engagement while your team works in familiar tools.",
                gradient: "from-primary to-primary-light",
              },
              {
                icon: Layers,
                title: "Hybrid Mode",
                subtitle: "Use what matters",
                description: "Pick the modules you need—AI follow-up, unified inbox, pipelines—and integrate with your existing stack via API.",
                gradient: "from-secondary to-accent-orange",
              },
              {
                icon: Replace,
                title: "Full Platform",
                subtitle: "Replace everything",
                description: "GrowthOS becomes your complete patient management infrastructure. No more spreadsheets, no more tool juggling.",
                gradient: "from-accent-orange to-secondary",
              },
            ].map((mode, index) => {
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
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-card`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-heading-sm text-foreground mb-1">{mode.title}</h3>
                  <p className="text-sm font-medium text-accent-orange mb-3">{mode.subtitle}</p>
                  <p className="text-body text-muted-foreground">{mode.description}</p>
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
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-6">Integrates with the tools you already use</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-60">
              <span className="text-lg font-semibold text-foreground">Salesforce</span>
              <span className="text-lg font-semibold text-foreground">HubSpot</span>
              <span className="text-lg font-semibold text-foreground">Zoho</span>
              <span className="text-lg font-semibold text-foreground">Keap</span>
              <span className="text-lg font-semibold text-foreground">+ API</span>
            </div>
          </motion.div>
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
            <Link href="/demo">
              <Button variant="hero" size="xl" className="group shadow-glow">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Product;
