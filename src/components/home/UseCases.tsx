import { TrendingUp, Clock, Users, RefreshCw, BarChart3 } from "lucide-react";

const UseCases = () => {
  const useCases = [
    { icon: TrendingUp, text: "Increase booked consults without increasing lead volume" },
    { icon: Clock, text: "Stop losing after-hours inquiries" },
    { icon: Users, text: "Create consistent follow-up without new hires" },
    { icon: RefreshCw, text: "Reactivate cold inquiries and no-shows" },
    { icon: BarChart3, text: "Gain clarity into marketing and pipeline performance" },
  ];

  return (
    <section className="section-padding bg-background-soft">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            What you can achieve
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-lg bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-body text-foreground font-medium">{useCase.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
