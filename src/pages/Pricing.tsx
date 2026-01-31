import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-wide relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              Simple pricing built for{" "}
              <span className="text-gradient-accent">real clinics.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground">
              No hidden fees. No per-lead charges. Just straightforward monthly plans 
              that scale with your practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28 lg:pb-32 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`rounded-2xl p-8 md:p-10 relative transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground shadow-glow"
                    : "bg-card border-2 border-border shadow-card hover:shadow-elevated"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent-orange text-white text-body-sm font-semibold px-5 py-1.5 rounded-full shadow-card">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-heading-sm mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-body-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-display ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={plan.popular ? "text-primary-foreground/70 text-body-sm" : "text-muted-foreground text-body-sm"}>
                    {plan.setup}
                  </p>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-accent-orange/20" : "bg-accent-orange/10"
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? "text-accent-orange" : "text-accent-orange"}`} />
                      </div>
                      <span className={plan.popular ? "text-primary-foreground" : "text-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/demo">
                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="lg"
                    className={`w-full group ${plan.popular ? "bg-accent-orange hover:brightness-110" : ""}`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Plans */}
      <section className="section-padding-sm bg-tan">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-heading text-foreground mb-4">
              Annual plans available
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Save with annual billing and get discounted setup.
            </p>
            <Link to="/demo">
              <Button variant="hero-outline" size="lg">
                Ask About Annual Pricing
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-heading text-foreground text-center mb-12"
          >
            Common questions
          </motion.h2>
          
          <div className="space-y-4">
            {[
              {
                q: "What's included in the setup fee?",
                a: "One-time configuration of workflows, pipelines, and integrations. We handle the technical setup so your team can focus on patients."
              },
              {
                q: "Are there any per-lead or usage fees?",
                a: "No. Your monthly subscription covers unlimited leads, conversations, and team members."
              },
              {
                q: "What if I need to cancel?",
                a: "Monthly plans can be canceled anytime. Annual plans are billed upfront with a discount on setup and monthly rate."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <h4 className="font-semibold text-foreground mb-2">{item.q}</h4>
                <p className="text-body text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
        
        <div className="container-wide relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-heading-lg text-primary-foreground mb-6">
              Ready to grow your clinic?
            </h2>
            <Link to="/demo">
              <Button variant="hero" size="xl" className="group shadow-glow">
                Book a Demo
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
