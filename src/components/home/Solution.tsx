import { useRef } from "react";
import { Zap, MessageCircle, Brain, UserCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.6, 0.6, 0.2]);

  const capabilities = [
    {
      icon: Zap,
      title: "Immediate responses to every inquiry",
      description: "Patients never wait. Every lead gets an instant, human-sounding reply.",
      gradient: "from-accent-orange to-secondary",
    },
    {
      icon: MessageCircle,
      title: "Ongoing follow-up across days or weeks",
      description: "The AI keeps the conversation going until the patient is ready.",
      gradient: "from-secondary to-primary-light",
    },
    {
      icon: Brain,
      title: "Common questions, next steps, and nudges to book",
      description: "It communicates in your clinic's voice and follows your rules.",
      gradient: "from-primary to-primary-light",
    },
    {
      icon: UserCheck,
      title: "Clean handoff to staff with full conversation history",
      description: "When a patient is ready, your team steps in with complete context.",
      gradient: "from-primary-light to-accent-orange",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-tan relative overflow-hidden">
      {/* Parallax background pattern - hidden on mobile */}
      <div className="absolute inset-0 opacity-30 hidden md:block">
        <motion.div 
          style={{ y: y1, rotate: rotate1, scale: scale1, opacity: opacity1 }}
          className="absolute top-10 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: y2, scale: scale1, opacity: opacity1 }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl" 
        />
      </div>
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-display text-foreground mb-4 md:mb-6">
            An AI system that{" "}
            <span className="text-gradient">never forgets to follow up.</span>
          </h2>
        </div>

        <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10 md:mb-16">
          GrowthOS is built around a custom-trained AI that responds the moment a patient 
          reaches out and continues the conversation over time. It communicates in your 
          clinic's voice, follows your rules, and hands off to your team when the patient is ready.
        </p>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className="card-elevated p-5 md:p-8 flex gap-4 md:gap-5 group hover:shadow-glow transition-all duration-500"
              >
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{capability.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solution;