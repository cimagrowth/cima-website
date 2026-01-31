import { useRef } from "react";
import { Clock, Users, Zap, RefreshCw, Eye } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const UseCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const useCases = [
    {
      icon: Clock,
      title: "Stop losing after-hours inquiries",
      description: "AI responds immediately, even when your team is offline.",
    },
    {
      icon: Users,
      title: "Reduce pressure on front desk staff",
      description: "Let the AI handle initial engagement so your team can focus on ready patients.",
    },
    {
      icon: Zap,
      title: "Keep follow-up going without manual effort",
      description: "Consistent nurturing that doesn't depend on someone remembering.",
    },
    {
      icon: RefreshCw,
      title: "Reactivate cold leads and no-shows",
      description: "Bring dormant inquiries back into motion with automated outreach.",
    },
    {
      icon: Eye,
      title: "Know exactly what's happening with every inquiry",
      description: "Full visibility into where patients are and where they drop off.",
    },
  ];

  return (
    <section id="use-cases" ref={sectionRef} className="py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Parallax decoration - hidden on mobile */}
      <motion.div 
        style={{ y: y1, opacity: opacity1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl hidden md:block" 
      />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            What GrowthOS <span className="text-gradient-accent">solves for clinics</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="card-premium p-5 md:p-6 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-orange" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{useCase.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
