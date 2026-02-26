import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionSuccess = () => {
  return (
    <Layout>
      <SEO
        title="Welcome to GrowthOS – Book Your Onboarding"
        description="Thank you for signing up for GrowthOS. Book your onboarding session to get started."
        noindex
      />

      <section className="section-padding bg-background">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-accent-orange/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent-orange" />
            </div>

            <h1 className="text-display-lg text-foreground mb-4">
              Thank You for Signing Up
            </h1>

            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-4">
              Your GrowthOS subscription is confirmed. The next step is to book your onboarding session below so our team can get you up and running.
            </p>

            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-accent-orange flex-shrink-0" />
              <span>Check your email for a confirmation receipt and detailed next steps on what to prepare.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <iframe
              src="https://bookwith.org/book?onboarding_id=recFgAdPQ8jfj7e0z"
              width="100%"
              height="800"
              style={{ border: "none" }}
              title="Book Onboarding Session"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link to="/">
              <Button variant="ghost" size="lg" className="group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SubscriptionSuccess;
