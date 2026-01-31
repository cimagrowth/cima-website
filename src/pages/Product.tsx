import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Inbox, GitBranch, Zap, RefreshCw, BarChart3, ArrowRight } from "lucide-react";

const Product = () => {
  const modules = [
    {
      icon: Inbox,
      title: "Unified Inbox",
      description: "All patient conversations — calls, texts, emails, web forms — in a single timeline. Never lose context, never miss a message.",
      features: ["Multi-channel aggregation", "Conversation threading", "Team assignment", "Response tracking"],
    },
    {
      icon: GitBranch,
      title: "Pipelines and Patient Journeys",
      description: "Visual pipeline stages that match your actual patient flow. Know exactly where every inquiry stands.",
      features: ["Custom stage configuration", "Automatic stage progression", "Stale lead alerts", "Conversion tracking"],
    },
    {
      icon: Zap,
      title: "Automations and Nurture",
      description: "Follow-up that runs even when your team is offline. Immediate response, timed reminders, and long-term nurturing.",
      features: ["Missed-call text back", "Appointment reminders", "No-show sequences", "Long-term nurture drips"],
    },
    {
      icon: RefreshCw,
      title: "Reactivation Campaigns",
      description: "Turn dormant leads into consults. Monthly SMS and email campaigns targeting cold inquiries and past patients.",
      features: ["Segmented targeting", "Multi-touch sequences", "Opt-out management", "Response tracking"],
    },
    {
      icon: BarChart3,
      title: "Reporting and Attribution",
      description: "Know exactly what is driving booked patients. Clear dashboards that show performance at every stage.",
      features: ["Source attribution", "Stage conversion rates", "Response time metrics", "Team performance"],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              GrowthOS is your clinic's growth command center.
            </h1>
            <p className="text-body-lg text-muted-foreground mb-10">
              One unified system for patient communication, follow-up automation, 
              and growth analytics — built specifically for fertility and regenerative clinics.
            </p>
            <Link to="/demo">
              <Button variant="hero" size="xl">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="section-padding bg-background-soft">
        <div className="container-wide">
          <div className="space-y-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="card-elevated p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h2 className="text-heading text-foreground mb-4">{module.title}</h2>
                    <p className="text-body-lg text-muted-foreground">{module.description}</p>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-6">
                    <h4 className="text-body-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {module.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-body text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg md:text-display text-foreground mb-6">
              Ready to see GrowthOS in action?
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
    </Layout>
  );
};

export default Product;
