'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, ShieldCheck, Mic, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

const SUPABASE_URL = "https://momssbzlofjodqodvvvk.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbXNzYnpsb2Zqb2Rxb2R2dnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzM0NDUsImV4cCI6MjA4NzM0OTQ0NX0.0fhNF9sTDBee9SOqM0OazVITv2wtfKkNsGz7GHPriTE";
const FORM_ID = "059ef2d4-830d-403d-831f-23c4d82a91a6";

const industryOptions = [
  { label: "Fertility", value: "fertility" },
  { label: "Wellness", value: "wellness" },
  { label: "Aesthetics", value: "aesthetics" },
  { label: "Regenerative Medicine", value: "regenerative_medicine" },
  { label: "Other", value: "other" },
];

const primaryGoalOptions = [
  "Need more leads/patients",
  "Poor conversion rates",
  "No outreach system",
  "Marketing is too manual",
  "Cannot track ROI",
  "Other",
];

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_website: string;
  industry: string;
  role: string;
  primary_goal: string;
};

const Demo = () => {
  const [formData, setFormData] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_website: "",
    industry: "",
    role: "",
    primary_goal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.company_name ||
      !formData.industry ||
      !formData.primary_goal
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/form-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON_KEY,
        },
        body: JSON.stringify({
          form_id: FORM_ID,
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            company_name: formData.company_name,
            company_website: formData.company_website || "",
            industry: formData.industry,
            role: formData.role || "",
            primary_goal: formData.primary_goal,
          },
          source_url: window.location.href,
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Something went wrong. Please try again.");
      }

      const result = await response.json();

      if (result.verification_sent) {
        window.location.href = `https://os.cimagrowth.com/demo/verify?email=${encodeURIComponent(
          formData.email
        )}`;
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: headline + trust content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
                See GrowthOS{" "}
                <span className="text-gradient-accent">in Action</span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-10">
                Answer a few quick questions and get instant access to a
                voice-guided interactive demo. No sales call required.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  {
                    icon: MonitorPlay,
                    title: "See real platform features",
                    detail: "Explore pipelines, automations, and the AI with sample data.",
                  },
                  {
                    icon: Mic,
                    title: "Voice-guided interactive tour",
                    detail: "A guided walkthrough at your own pace — no one watching.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Instant access — no sales call",
                    detail: "Verify your email and you're in. Takes under 2 minutes.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card mt-0.5">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-body font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="text-body-sm text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange via-secondary to-primary rounded-2xl blur-sm opacity-20" />
              <div className="relative card-elevated p-8 md:p-10">
                <h2 className="text-heading text-foreground mb-6">
                  Access the Demo
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        First Name{" "}
                        <span className="text-accent-orange">*</span>
                      </label>
                      <Input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        placeholder="John"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Last Name{" "}
                        <span className="text-accent-orange">*</span>
                      </label>
                      <Input
                        id="last_name"
                        name="last_name"
                        type="text"
                        required
                        placeholder="Smith"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Work Email <span className="text-accent-orange">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company_name"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Company Name{" "}
                      <span className="text-accent-orange">*</span>
                    </label>
                    <Input
                      id="company_name"
                      name="company_name"
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company_website"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Company Website{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="company_website"
                      name="company_website"
                      type="url"
                      placeholder="https://acmecorp.com"
                      value={formData.company_website}
                      onChange={handleChange}
                      className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Industry <span className="text-accent-orange">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-colors"
                    >
                      <option value="" disabled>
                        Select your specialty
                      </option>
                      {industryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Your Role{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="Marketing Director"
                      value={formData.role}
                      onChange={handleChange}
                      className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="primary_goal"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      What is your #1 growth challenge?{" "}
                      <span className="text-accent-orange">*</span>
                    </label>
                    <select
                      id="primary_goal"
                      name="primary_goal"
                      required
                      value={formData.primary_goal}
                      onChange={handleChange}
                      className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-colors"
                    >
                      <option value="" disabled>
                        Select your top challenge
                      </option>
                      {primaryGoalOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Inline error */}
                  {error && (
                    <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <Button
                    variant="hero"
                    size="xl"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verifying your email…
                      </>
                    ) : (
                      <>
                        Access the Demo
                        <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1">
                    {[
                      "Instant access — no sales call",
                      "Voice-guided interactive tour",
                      "See real platform features with sample data",
                    ].map((text) => (
                      <span
                        key={text}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-orange inline-block" />
                        {text}
                      </span>
                    ))}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
