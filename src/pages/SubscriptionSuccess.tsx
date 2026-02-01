import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/seo/SEO";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { refreshSubscription, subscription } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySubscription = async () => {
      // Give Stripe a moment to process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await refreshSubscription();
      setIsLoading(false);
    };

    if (sessionId) {
      verifySubscription();
    } else {
      setIsLoading(false);
    }
  }, [sessionId, refreshSubscription]);

  return (
    <Layout>
      <SEO
        title="Subscription Confirmed – GrowthOS"
        description="Welcome to GrowthOS! Your subscription is now active."
      />
      
      <section className="section-padding bg-background min-h-[70vh] flex items-center">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <h1 className="text-heading text-foreground">
                  Processing your subscription...
                </h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment.
                </p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-6 bg-accent-orange/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-accent-orange" />
                </div>

                <h1 className="text-display-lg text-foreground mb-4">
                  Welcome to GrowthOS!
                </h1>

                <p className="text-body-lg text-muted-foreground mb-2">
                  Your {subscription.plan === "annual" ? "annual" : "monthly"} subscription is now active.
                </p>

                {subscription.subscriptionEnd && (
                  <p className="text-body text-muted-foreground mb-8">
                    Your subscription renews on{" "}
                    <span className="font-medium text-foreground">
                      {new Date(subscription.subscriptionEnd).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                )}

                <div className="bg-card border border-border rounded-xl p-8 mb-8 max-w-md mx-auto">
                  <h2 className="text-heading-sm text-foreground mb-4">What's Next?</h2>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Our team will reach out within 24-48 hours to schedule onboarding
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        You'll receive access credentials to your GrowthOS dashboard
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Check your email for a confirmation receipt from Stripe
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/demo">
                    <Button variant="hero" size="lg" className="group">
                      Book Onboarding Call
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="hero-outline" size="lg">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SubscriptionSuccess;
