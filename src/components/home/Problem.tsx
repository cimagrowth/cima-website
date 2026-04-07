"use client";

import { useRef } from "react";
import Link from "next/link";
import { Clock, Phone, Users, Database, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

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

  const gapItems = [
    { icon: Clock, title: "After-hours inquiries with no response", cost: "35% of leads never get a reply within 24 hours" },
    { icon: Phone, title: "Slow follow-up after first contact", cost: "78% of patients choose the first clinic to respond" },
    { icon: Users, title: "Manual nurturing that fades after day 3", cost: "The average patient needs 7-12 touchpoints to book" },
    { icon: Database, title: "Front desk overwhelmed with admin", cost: "Your highest-paid patient-facing staff is doing data entry" },
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
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-display text-foreground mb-4 md:mb-6">
            You're Not Losing Patients to Better Clinics.{" "}
            <span className="text-gradient-accent">You're Losing Them to Silence.</span>
          </h2>
          <div className="text-base md:text-lg text-muted-foreground space-y-3 text-left max-w-2xl mx-auto">
            <p>
              A woman spends weeks deciding to call a fertility clinic. She finally fills out a form at 9:47 PM.
            </p>
            <p>
              Your office is closed. She doesn't hear back until 11 AM the next day.
            </p>
            <p>
              By then, she's already booked with the clinic that texted her back in 12 seconds.
            </p>
            <p className="font-semibold text-foreground">
              This happens 15-20 times per month at the average clinic. That's not a marketing problem. It's a $500K/year revenue leak.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {gapItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="card-premium p-5 md:p-6 group cursor-default"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-accent-orange/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent-orange" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-foreground font-medium mb-1">{item.title}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.cost}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <Link href="/demo">
            <Button variant="hero" size="lg" className="group">
              Book a Demo — See the Leak in Your Clinic
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Problem;
