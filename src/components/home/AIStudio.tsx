import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const AIStudio = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="card-elevated p-8 md:p-12 max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-heading-lg text-foreground mb-4">
            Want a preview of how we think?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get access to the Cima AI Studio, a free AI-powered toolkit designed for 
            clinic marketing and patient communication.
          </p>
          <Button variant="hero" size="xl">
            Get the Free AI Studio
          </Button>
          <p className="text-body-sm text-muted-foreground mt-4">Instant access</p>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;
