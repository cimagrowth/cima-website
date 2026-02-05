import { useRef } from "react";
import { Link } from "react-router-dom";
import { Inbox, Settings, RefreshCw, BarChart3, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <section id="platform" ref={sectionRef} className="py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Parallax decorative elements - hidden on mobile */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl hidden md:block" 
      />
      <motion.div 
        style={{ y: y2, scale: scale1, opacity: opacity1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl hidden md:block" 
      />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            The platform that makes the AI work{" "}
            <span className="text-gradient-accent">cleanly across your entire clinic.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            The AI is the engine. GrowthOS is the system it runs inside. Every 
            message, lead, and outcome is visible, organized, and actionable.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <div
                key={index}
                className="card-premium p-5 md:p-6 flex gap-4 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{system.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{system.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <Link to="/demo">
            <Button variant="hero" size="lg" className="group">
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Authority;