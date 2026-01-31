import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const Hero = () => {
  const outcomes = [
    "Faster response to every inquiry",
    "Consistent follow-up without staff overload",
    "Clear visibility into what actually drives bookings",
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-body-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full" />
            For Fertility & Regenerative Clinics
          </div>

          {/* Headline */}
          <h1 className="text-display-lg md:text-display-xl text-foreground mb-6 animate-fade-up">
            GrowthOS is the all-in-one growth operating system for clinics that want more booked patients.
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up delay-100">
            Capture leads, respond instantly, nurture automatically, and track what converts. 
            GrowthOS replaces fragmented tools with one unified system built specifically for 
            fertility and regenerative clinics.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up delay-200">
            <Link to="/demo">
              <Button variant="hero" size="xl">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="xl">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Microcopy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-body-sm text-muted-foreground animate-fade-up delay-300">
            <span>30 minutes. No sales pressure.</span>
            <span className="hidden sm:inline">•</span>
            <span>Simple. Transparent.</span>
          </div>

          {/* Outcome bullets */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 animate-fade-up delay-400">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-left p-4 rounded-lg bg-accent/50"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-body text-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
