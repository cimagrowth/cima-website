import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect your lead sources",
      description: "Integrate your website forms, ad platforms, and communication channels.",
    },
    {
      number: "02",
      title: "Launch GrowthOS workflows",
      description: "Activate automated follow-up, nurture sequences, and reactivation campaigns.",
    },
    {
      number: "03",
      title: "Track performance and scale what works",
      description: "Use clear reporting to optimize your patient acquisition strategy.",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            How it works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-display text-primary/10 font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-heading-sm text-foreground mb-3">{step.title}</h3>
              <p className="text-body text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-12 h-px bg-border translate-x-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/demo">
            <Button variant="hero" size="xl">
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
