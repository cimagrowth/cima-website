import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "GrowthOS Core",
      price: "$499",
      period: "/ month",
      setup: "$999 one-time setup",
      description: "Everything you need to unify communication and automate follow-up.",
      features: [
        "Unified Inbox",
        "Custom pipelines",
        "Automations and follow-up",
        "Missed-call text back",
        "Lead tracking and reporting",
        "Team access",
        "Onboarding and training",
      ],
      cta: "Start with GrowthOS",
      popular: false,
    },
    {
      name: "GrowthOS Plus",
      price: "$999",
      period: "/ month",
      setup: "$999 one-time setup",
      description: "For clinics ready to optimize their entire patient acquisition funnel.",
      features: [
        "Everything in Core, plus:",
        "Managed ad system integration",
        "Funnel and conversion tracking",
        "Landing page and lead flow setup",
        "Ongoing optimization support",
        "Priority strategy access",
      ],
      cta: "Get GrowthOS Plus",
      popular: true,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              Simple pricing built for real clinics.
            </h1>
            <p className="text-body-lg text-muted-foreground">
              No hidden fees. No per-lead charges. Just straightforward monthly plans 
              that scale with your practice.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28 lg:pb-32 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 p-8 md:p-10 relative ${
                  plan.popular
                    ? "border-primary bg-card shadow-elevated"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-body-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-heading-sm text-foreground mb-2">{plan.name}</h3>
                  <p className="text-body-sm text-muted-foreground mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-display text-foreground">{plan.price}</span>
                    <span className="text-body text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-body-sm text-muted-foreground">{plan.setup}</p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-body text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/demo">
                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Plans */}
      <section className="section-padding-sm bg-background-soft">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading text-foreground mb-4">
              Annual plans available
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Save with annual billing and get discounted setup.
            </p>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                Ask About Annual Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tooltips / FAQ-style */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="text-heading text-foreground text-center mb-12">
            Common questions
          </h2>
          
          <div className="space-y-6">
            <div className="card-premium p-6">
              <h4 className="font-semibold text-foreground mb-2">What's included in the setup fee?</h4>
              <p className="text-body text-muted-foreground">
                One-time configuration of workflows, pipelines, and integrations. We handle 
                the technical setup so your team can focus on patients.
              </p>
            </div>
            
            <div className="card-premium p-6">
              <h4 className="font-semibold text-foreground mb-2">Are there any per-lead or usage fees?</h4>
              <p className="text-body text-muted-foreground">
                No. Your monthly subscription covers unlimited leads, conversations, and team members.
              </p>
            </div>
            
            <div className="card-premium p-6">
              <h4 className="font-semibold text-foreground mb-2">What if I need to cancel?</h4>
              <p className="text-body text-muted-foreground">
                Monthly plans can be canceled anytime. Annual plans are billed upfront with 
                a discount on setup and monthly rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-background-soft">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg text-foreground mb-6">
              Ready to grow your clinic?
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

export default Pricing;
