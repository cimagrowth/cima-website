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
    <section ref={sectionRef} className="section-padding bg-tan relative overflow-hidden">
      {/* Parallax background pattern */}
      <div className="absolute inset-0 opacity-30">
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-6"
        >
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            An AI system that{" "}
            <span className="text-gradient">never forgets to follow up.</span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-body-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
        >
          GrowthOS is built around a custom-trained AI that responds the moment a patient 
          reaches out and continues the conversation over time. It communicates in your 
          clinic's voice, follows your rules, and hands off to your team when the patient is ready.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-8 flex gap-5 group hover:shadow-glow transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-heading-sm text-foreground mb-2">{capability.title}</h3>
                  <p className="text-body text-muted-foreground">{capability.description}</p>
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