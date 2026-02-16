import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  label: string;
  videoSrc: string | null;
}

const features: Feature[] = [
  { id: "calendars", label: "Calendars", videoSrc: "/feature-videos/calendars.mp4" },
  { id: "call-recordings", label: "Call Recordings", videoSrc: "/feature-videos/call-recordings.mp4" },
  { id: "chat-widget", label: "Chat Widget", videoSrc: "/feature-videos/chat-widget.mp4" },
  { id: "contacts", label: "Contacts", videoSrc: "/feature-videos/contacts.mp4" },
  { id: "conversations", label: "Conversations", videoSrc: "/feature-videos/conversations.mp4" },
  { id: "email-builder", label: "Email Builder", videoSrc: "/feature-videos/email-builder.mp4" },
  { id: "invoicing", label: "Invoicing", videoSrc: "/feature-videos/invoicing.mp4" },
  { id: "opportunities", label: "Opportunities & Pipelines", videoSrc: "/feature-videos/opportunities.mp4" },
  { id: "payments", label: "Payments & Products", videoSrc: "/feature-videos/payments.mp4" },
  { id: "reporting", label: "Reporting", videoSrc: "/feature-videos/reporting.mp4" },
  { id: "reviews", label: "Reviews & Reputation", videoSrc: "/feature-videos/reviews.mp4" },
  { id: "social-media", label: "Social Media Planner", videoSrc: "/feature-videos/social-media-planner.mp4" },
  { id: "surveys", label: "Surveys & Forms", videoSrc: "/feature-videos/surveys.mp4" },
  { id: "website-builder", label: "Website & Funnel Builder", videoSrc: "/feature-videos/website-builder.mp4" },
  { id: "workflows", label: "Workflows", videoSrc: "/feature-videos/workflows.mp4" },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState("social-media");

  const current = features.find((f) => f.id === activeFeature)!;

  return (
    <Layout>
      <SEO
        title="What's Inside GrowthOS"
        description="Explore GrowthOS features — workflows, calendars, invoicing, conversations, and more. See each tool in action."
        keywords={["GrowthOS features", "clinic CRM", "patient management", "healthcare automation"]}
        canonical="https://cimagrowth.com/features"
        ogImage="https://cimagrowth.com/og-product.png"
      />

      <section className="py-12 md:py-20">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-display font-bold text-foreground mb-4">
              What's inside{" "}
              <span className="text-gradient-accent">GrowthOS</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              One platform to run your entire clinic's growth engine. Explore each feature below.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar tabs */}
            <nav className="lg:w-64 flex-shrink-0">
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      "relative whitespace-nowrap text-left text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 flex-shrink-0",
                      activeFeature === feature.id
                        ? "bg-accent-orange text-accent-orange-foreground shadow-card"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {feature.label}
                    {!feature.videoSrc && (
                      <span className="ml-2 text-[10px] opacity-50">soon</span>
                    )}
                  </button>
                ))}
              </div>
            </nav>

            {/* Video area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl overflow-hidden border border-border bg-card shadow-card"
                >
                  {current.videoSrc ? (
                    <video
                      key={current.videoSrc}
                      className="w-full aspect-video object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={current.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full aspect-video flex items-center justify-center bg-muted/30">
                      <p className="text-muted-foreground text-sm">
                        Video coming soon for <span className="font-medium text-foreground">{current.label}</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {current.label}
                </h2>
                <Link to="/demo">
                  <Button variant="hero" size="default" className="group">
                    Book a Demo
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
