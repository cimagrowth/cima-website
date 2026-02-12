import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Loader2, Settings } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/components/seo/schemas";
import { useAuth } from "@/contexts/AuthContext";
import { useCheckout, type CheckoutCustomerInfo } from "@/hooks/useCheckout";
import PreCheckoutForm from "@/components/checkout/PreCheckoutForm";

const Pricing = () => {
  const { subscription, isCheckingSubscription } = useAuth();
  const { isLoading, pendingPlan, initiateCheckout, cancelCheckout, handleCheckout, handleManageSubscription } = useCheckout();

  const features = [
    "Custom-trained AI response and follow-up",
    "Unified inbox (AI + staff)",
    "Pipelines and patient journeys",
    "Automations and follow-up rules",
    "Reactivation campaigns",
    "Reporting and visibility",
    "Onboarding + configuration",
  ];

  const plans = [
    {
      name: "Monthly",
      planKey: "monthly" as const,
      price: "$999",
      period: "/ month",
      setup: "$999 one-time setup",
      description: "Full access to GrowthOS with flexible monthly billing.",
      savings: null,
      bonus: null,
      cta: "Start Monthly",
      ctaSubtext: "$999/mo + $999 setup",
      popular: false,
    },
    {
      name: "Annual",
      planKey: "annual" as const,
      price: "$9,999",
      period: "/ year",
      setup: "No setup fee",
      description: "Best value. Pay annually and save on setup.",
      savings: "Save on setup",
      bonus: "$500 Meta & Google Ads Credit",
      cta: "Start Annual",
      ctaSubtext: "$9,999/year, no setup fee",
      popular: true,
    },
  ];

  const faqItems = [
    {
      question: "What is the setup fee for monthly?",
      answer: "It covers initial configuration of your system and AI training.",
    },
    {
      question: "Is annual the same product?",
      answer: "Yes. Same system. Annual includes no setup fee.",
    },
    {
      question: "Are there any per-lead or usage fees?",
      answer: "No. Your subscription covers unlimited leads, AI conversations, and team members.",
    },
  ];

  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://cimagrowth.com" },
        { name: "Sign Up", url: "https://cimagrowth.com/sign-up" },
      ],
    }),
    generateFAQSchema({ questions: faqItems }),
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "GrowthOS",
      description: "AI-powered patient engagement platform for healthcare clinics with instant response, automated nurturing, and unified inbox.",
      brand: {
        "@type": "Brand",
        name: "Cima Growth Solutions",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Monthly Plan",
          price: "999",
          priceCurrency: "USD",
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          availability: "https://schema.org/InStock",
          url: "https://cimagrowth.com/sign-up",
        },
        {
          "@type": "Offer",
          name: "Annual Plan",
          price: "9999",
          priceCurrency: "USD",
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          availability: "https://schema.org/InStock",
          url: "https://cimagrowth.com/sign-up",
        },
      ],
    },
  ];

  const isCurrentPlan = (planKey: string) => {
    return subscription.subscribed && subscription.plan === planKey;
  };

  return (
    <Layout>
      <SEO
        title="Pricing – GrowthOS AI Patient Engagement Platform"
        description="Simple, transparent pricing for GrowthOS. $999/month or $9,999/year with no setup fee. Unlimited leads, AI conversations & team members. No per-lead charges. Full access to all features."
        ogImage="https://cimagrowth.com/og-pricing.png"
        keywords={[
          "GrowthOS pricing",
          "healthcare CRM pricing",
          "patient engagement software cost",
          "clinic software pricing",
          "med spa CRM cost",
          "fertility clinic software pricing",
          "AI healthcare software pricing",
          "medical practice management cost",
        ]}
        canonical="https://cimagrowth.com/sign-up"
      />
      <JsonLd schema={schemas} />

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
              Stop patient leakage with GrowthOS.{" "}
              <span className="text-gradient-accent">Choose monthly or annual.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground">
              One plan. Full access. No hidden fees or per-lead charges.
            </p>
            
            {subscription.subscribed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-center gap-2 bg-accent-orange/10 text-accent-orange px-4 py-2 rounded-full"
              >
                <Check className="w-4 h-4" />
                <span className="font-medium">
                  You're subscribed to the {subscription.plan} plan
                </span>
              </motion.div>
            )}
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
                  isCurrentPlan(plan.planKey)
                    ? "ring-2 ring-accent-orange bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground shadow-glow"
                    : plan.popular
                    ? "bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground shadow-glow"
                    : "bg-card border-2 border-border shadow-card hover:shadow-elevated"
                }`}
              >
                {isCurrentPlan(plan.planKey) ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent-orange text-white text-body-sm font-semibold px-5 py-1.5 rounded-full shadow-card">
                      Your Plan
                    </span>
                  </div>
                ) : plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent-orange text-white text-body-sm font-semibold px-5 py-1.5 rounded-full shadow-card">
                      Best Value
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-heading-sm mb-2 ${plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-body-sm mb-6 ${plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-display ${plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground/70" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground/70 text-body-sm font-medium" : "text-muted-foreground text-body-sm"}>
                    {plan.setup}
                  </p>

                  {plan.savings && (
                    <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-accent-orange/20 border border-accent-orange/30">
                      <Sparkles className="w-4 h-4 text-accent-orange flex-shrink-0" />
                      <span className="text-body-sm font-semibold text-primary-foreground">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  {plan.bonus && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/20">
                      <Sparkles className="w-4 h-4 text-accent-orange flex-shrink-0" />
                      <span className="text-body-sm font-semibold text-primary-foreground">
                        {plan.bonus}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular || isCurrentPlan(plan.planKey) ? "bg-accent-orange/20" : "bg-accent-orange/10"
                      }`}>
                        <Check className="w-3 h-3 text-accent-orange" />
                      </div>
                      <span className={`text-body-sm ${plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground" : "text-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {isCurrentPlan(plan.planKey) ? (
                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="lg"
                    className={`w-full group ${plan.popular ? "bg-accent-orange hover:brightness-110" : ""}`}
                    onClick={handleManageSubscription}
                    disabled={!!isLoading || isCheckingSubscription}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Settings className="w-4 h-4 mr-2" />
                    )}
                    Manage Subscription
                  </Button>
                ) : subscription.subscribed ? (
                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="lg"
                    className={`w-full group ${plan.popular ? "bg-accent-orange hover:brightness-110" : ""}`}
                    onClick={handleManageSubscription}
                    disabled={!!isLoading || isCheckingSubscription}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Switch Plan
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="lg"
                    className={`w-full group ${
                      plan.popular 
                        ? "bg-accent-orange hover:brightness-110" 
                        : "bg-primary hover:bg-primary-light"
                    }`}
                    onClick={() => initiateCheckout(plan.planKey)}
                    disabled={!!isLoading || isCheckingSubscription}
                  >
                    {isLoading === plan.planKey ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {plan.cta}
                    {isLoading !== plan.planKey && (
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </Button>
                )}
                
                <p className={`text-body-sm mt-3 text-center ${plan.popular || isCurrentPlan(plan.planKey) ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {isCurrentPlan(plan.planKey) 
                    ? `Renews ${subscription.subscriptionEnd ? new Date(subscription.subscriptionEnd).toLocaleDateString() : "soon"}`
                    : plan.ctaSubtext}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition */}
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
              Full access. No feature tiers.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Both billing options include every GrowthOS feature. The only difference is how you pay.
            </p>
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
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                <p className="text-body text-muted-foreground">{item.answer}</p>
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
              Ready to stop patient leakage?
            </h2>
            {subscription.subscribed ? (
              <Button 
                variant="hero" 
                size="xl" 
                className="group shadow-glow"
                onClick={handleManageSubscription}
                disabled={!!isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Settings className="w-5 h-5 mr-2" />}
                Manage Subscription
              </Button>
            ) : (
              <Button 
                variant="hero" 
                size="xl" 
                className="group shadow-glow"
                onClick={() => initiateCheckout("annual")}
                disabled={!!isLoading}
              >
                {isLoading === "annual" ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Get Started
                {!isLoading && <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      <PreCheckoutForm
        open={!!pendingPlan}
        onClose={cancelCheckout}
        onSubmit={(data) => pendingPlan && handleCheckout(pendingPlan, data)}
        planName={pendingPlan === "annual" ? "Annual" : "Monthly"}
        isLoading={!!isLoading}
      />
    </Layout>
  );
};

export default Pricing;
