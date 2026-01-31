import { Clock, MessageSquare, Users, Database, BarChart3 } from "lucide-react";

const Problem = () => {
  const painPoints = [
    { icon: Clock, text: "After-hours inquiries go unanswered" },
    { icon: MessageSquare, text: "Messages live in too many places" },
    { icon: Users, text: "Follow-up depends on memory" },
    { icon: Database, text: "Old leads are never reactivated" },
    { icon: BarChart3, text: "Reporting lacks clarity" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-heading-lg md:text-display text-foreground mb-6">
            Your clinic isn't losing leads because of care. It's losing them because of inconsistency.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Most clinics rely on disconnected tools, manual follow-up, and busy staff to manage 
            patient inquiries. The result is slow response times, missed opportunities, and no 
            clear picture of what is working.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="card-premium p-6 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-body-sm text-foreground font-medium">{point.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
