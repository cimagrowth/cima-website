import { Inbox, Zap, RefreshCw, TrendingUp } from "lucide-react";

const Solution = () => {
  const modules = [
    {
      icon: Inbox,
      title: "Unified Clinic Inbox and Pipeline Hub",
      description: "All patient conversations in one place with full visibility.",
    },
    {
      icon: Zap,
      title: "Automated Follow-Up and Nurture",
      description: "Immediate response, reminders, and long-term nurturing that runs automatically.",
    },
    {
      icon: RefreshCw,
      title: "Database Reactivation Engine",
      description: "Monthly SMS and email campaigns that turn dormant leads into consults.",
    },
    {
      icon: TrendingUp,
      title: "Attribution and Growth Reporting",
      description: "Know exactly what is driving booked patients.",
    },
  ];

  return (
    <section className="section-padding bg-background-soft">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            GrowthOS replaces chaos with clarity.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={index}
                className="card-elevated p-8 flex gap-5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-heading-sm text-foreground mb-2">{module.title}</h3>
                  <p className="text-body text-muted-foreground">{module.description}</p>
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
