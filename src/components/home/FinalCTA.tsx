import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="section-padding bg-background-soft">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            Growth doesn't require more effort. It requires better systems.
          </h2>
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

export default FinalCTA;
