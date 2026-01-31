import { useRef } from "react";
import { Clock, MessageSquare, Users, Database, BarChart3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const painPoints = [
    { icon: Clock, text: "After-hours inquiries go unanswered" },
    { icon: MessageSquare, text: "Messages live in too many places" },
    { icon: Users, text: "Follow-up depends on memory" },
    { icon: Database, text: "Old leads are never reactivated" },
    { icon: BarChart3, text: "Reporting lacks clarity" },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Parallax decorative gradient */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 rounded-full blur-3xl" 
      />
      <motion.div 
        style={{ y: y2, opacity: opacity1 }}
        className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent-orange/5 rounded-full blur-3xl" 
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
            Your clinic isn't losing leads because of care.{" "}
            <span className="text-gradient-accent">It's losing them because of inconsistency.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Most clinics rely on disconnected tools, manual follow-up, and busy staff to manage 
            patient inquiries. The result is slow response times, missed opportunities, and no 
            clear picture of what is working.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 text-center group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-accent-orange" />
                </div>
                <p className="text-body-sm text-foreground font-medium">{point.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
