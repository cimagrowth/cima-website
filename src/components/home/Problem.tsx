import { useRef } from "react";
import { Link } from "react-router-dom";
import { Clock, Phone, Users, Database, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useVisitor } from "@/contexts/VisitorContext";

const Problem = () => {
  const { visitor } = useVisitor();
  const businessName = visitor?.businessName;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const leakagePoints = [
    { icon: Clock, text: "After-hours inquiries" },
    { icon: Phone, text: "Missed calls and slow responses" },
    { icon: Users, text: "Inconsistent follow-up" },
    { icon: Database, text: "Leads that quietly go cold" },
  ];

  return (
    <section id="problem" ref={sectionRef} className="py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Parallax decorative gradient - hidden on mobile for performance */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-secondary/10 rounded-full blur-3xl hidden md:block" 
      />
      <motion.div 
        style={{ y: y2, opacity: opacity1 }}
        className="absolute bottom-0 right-0 w-[300px] md:w-[400px] h-[200px] md:h-[300px] bg-accent-orange/5 rounded-full blur-3xl hidden md:block" 
      />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            {businessName ? (
              <>
                {businessName}'s patients deserve better.{" "}
                <span className="text-gradient-accent">So does your bottom line.</span>
              </>
            ) : (
              <>
                Patient loss doesn't happen all at once.{" "}
                <span className="text-gradient-accent">It happens in the gaps.</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            A patient reaches out and doesn't hear back quickly. Follow-up fades. 
            Life gets busy. They move on.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {leakagePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="card-premium p-5 md:p-6 text-center group cursor-default"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-secondary/10 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-orange" />
                </div>
                <p className="text-sm md:text-base text-foreground font-medium">{point.text}</p>
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

export default Problem;