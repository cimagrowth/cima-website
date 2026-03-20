import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/components/seo/schemas";

const GROWTHANOS_URL = "https://momssbzlofjodqodvvvk.supabase.co";
const ANON_KEY = import.meta.env.VITE_GROWTHANOS_ANON_KEY as string;
const FORM_ID = "059ef2d4-830d-403d-831f-23c4d82a91a6";

const industryOptions = [
  "Healthcare/Medical",
  "SaaS/Technology",
  "Agency/Consulting",
  "Finance",
  "Real Estate",
  "E-commerce",
  "Legal",
  "Other",
];

const primaryGoalOptions = [
  "Need more leads/patients",
  "Poor conversion rates",
  "No outreach system",
  "Marketing is too manual",
  "Cannot track ROI",
  "Other",
];

type FormData = {
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
  const [formData, setFormData] = useState<FormData>({
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch(`${GROWTHANOS_URL}/functions/v1/form-submit`, {
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
            company_website: formData.company_website,
            industry: formData.industry,
            role: formData.role,
            primary_goal: formData.primary_goal,
          },
          source_url: window.location.href,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        }),
      });

      const result = await response.json();

      if (result.verification_sent) {
        window.location.href = `https://os.cimagrowth.com/demo/verify?email=${encodeURIComponent(formData.email)}`;
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://cimagrowth.com" },
        { name: "Interactive Demo" },
      ],
    }),
    generateServiceSchema({
      name: "GrowthOS Interactive Demo",
      description: "See GrowthOS in action with a voice-guided interactive demo. No sales call required. Answer a few questions, verify your email, and explore the full platform.",
    }),
  ];

  return (
    <Layout>
      <SEO
        title="See GrowthOS in Action – Interactive Demo"
        description="No sales call required. Answer a few questions, verify your email, and explore GrowthOS with a voice-guided interactive tour. Free, instant access."
        ogImage="https://cimagrowth.com/og-demo.png"
        keywords={[
          "GrowthOS demo",
          "interactive demo",
          "healthcare CRM demo",
          "patient engagement demo",
          "AI healthcare software trial",
          "clinic software demo",
        ]}
        canonical="https://cimagrowth.com/demo"
      />
      <JsonLd schema={schemas} />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
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
                Interactive Demo — No Sales Call Required. Answer a few
                questions, verify your email, and explore the full platform
                with a voice-guided tour.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Zap, text: "Instant AI response across every channel" },
                  { icon: Clock, text: "Voice-guided tour at your own pace" },
                  { icon: Check, text: "See real pipelines, automations, and reporting" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-body text-foreground font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: ShieldCheck, text: "No credit card required" },
                  { icon: Zap, text: "2-minute setup" },
                  { icon: Clock, text: "Voice-guided tour" },
                ].map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border text-body-sm text-foreground font-medium"
                    >
                      <Icon className="w-4 h-4 text-accent-orange" />
                      {badge.text}
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange via-secondary to-primary rounded-2xl blur-sm opacity-20" />
              <div className="relative card-elevated p-8 md:p-10">
                <h2 className="text-heading text-foreground mb-6">
                  Get Instant Demo Access
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        First Name <span className="text-accent-orange">*</span>
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
                        Last Name <span className="text-accent-orange">*</span>
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
                      Company Name <span className="text-accent-orange">*</span>
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
                      <span className="text-muted-foreground">(optional)</span>
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
                      className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
                    >
                      <option value="" disabled>
                        Select your industry
                      </option>
                      {industryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
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
                      <span className="text-muted-foreground">(optional)</span>
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
                      className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
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

                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}

                  <Button
                    variant="hero"
                    size="xl"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? "Submitting..." : "Get Demo Access"}
                    {!isSubmitting && (
                      <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </Button>

                  <p className="text-body-sm text-muted-foreground text-center">
                    Check your email for a verification code. No credit card required.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demo;
