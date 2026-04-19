'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ClipboardCheck,
  ShieldAlert,
  MessageSquareText,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://momssbzlofjodqodvvvk.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const specialtyOptions = [
  "Fertility",
  "Aesthetics / Med Spa",
  "OB/GYN",
  "Regenerative",
  "IV / Wellness",
  "Other",
];

type FormState = {
  full_name: string;
  email: string;
  clinic_name: string;
  clinic_url: string;
  specialty: string;
  phone: string;
  opted_in_ebook: boolean;
};

type SignupResponse = {
  success: true;
  email: string;
  org_id: string;
  returning_user: boolean;
  ebook_url: string;
  message: string;
};

const initialState: FormState = {
  full_name: "",
  email: "",
  clinic_name: "",
  clinic_url: "",
  specialty: "",
  phone: "",
  opted_in_ebook: true,
};

const tools = [
  {
    icon: ClipboardCheck,
    title: "Patient Journey Audit",
    detail:
      "Score your website through a patient's eyes across 8 dimensions.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Risk Scanner",
    detail:
      "Find HIPAA, FTC, and FDA risks on your site before they find you.",
  },
  {
    icon: MessageSquareText,
    title: "Lead Response Grader",
    detail:
      "Paste a recent lead response. See exactly what's costing you bookings.",
  },
];

const Audit = () => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SignupResponse | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.full_name.trim() || !formData.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        email: formData.email.trim(),
        full_name: formData.full_name.trim(),
        clinic_name: formData.clinic_name.trim() || undefined,
        clinic_url: formData.clinic_url.trim() || undefined,
        specialty: formData.specialty || undefined,
        phone: formData.phone.trim() || undefined,
        opted_in_ebook: formData.opted_in_ebook,
        utm_source: params.get("utm_source") || undefined,
        utm_medium: params.get("utm_medium") || undefined,
        utm_campaign: params.get("utm_campaign") || undefined,
        utm_content: params.get("utm_content") || undefined,
        source_url: window.location.href,
      };

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/lead-magnet-signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Signup failed");
      }

      setSuccess(json as SignupResponse);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
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
            {/* Left: headline + value props */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft mb-6">
                <Sparkles className="h-3.5 w-3.5 text-accent-orange" />
                Free ebook + 3 AI tools
              </div>

              <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
                The 47 frameworks I used to build patient acquisition systems
                for{" "}
                <span className="text-gradient-accent">
                  100+ fertility, aesthetics, and wellness clinics
                </span>
              </h1>
              <p className="text-body-lg text-muted-foreground mb-10">
                Free ebook + 3 AI tools to audit your clinic&apos;s patient
                acquisition funnel. No credit card. Unlimited access to the
                tools.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: BookOpen,
                    title: "47 Frameworks ebook",
                    detail:
                      "The exact playbooks behind 100+ clinic launches — yours to keep.",
                  },
                  {
                    icon: Sparkles,
                    title: "3 AI tools, free forever",
                    detail:
                      "Patient Journey Audit, Compliance Scanner, Lead Response Grader.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "No credit card, no sales call",
                    detail:
                      "One-click magic link. You're inside GrowthOS in under a minute.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
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

            {/* Right: form (or success state) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:sticky lg:top-28"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange via-secondary to-primary rounded-2xl blur-sm opacity-20" />
              <div className="relative card-elevated p-8 md:p-10">
                {success ? (
                  <SuccessCard email={success.email} returning={success.returning_user} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-heading text-foreground mb-2">
                        Get Free Access
                      </h2>
                      <p className="text-body-sm text-muted-foreground">
                        Ebook + the 3 AI tools, sent to your inbox.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="full_name"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Full Name <span className="text-accent-orange">*</span>
                      </label>
                      <Input
                        id="full_name"
                        name="full_name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Dr. Jane Patel"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Email <span className="text-accent-orange">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@yourclinic.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="clinic_name"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Practice name{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="clinic_name"
                        name="clinic_name"
                        type="text"
                        autoComplete="organization"
                        placeholder="Bay Area Fertility"
                        value={formData.clinic_name}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="clinic_url"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Website URL{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="clinic_url"
                        name="clinic_url"
                        type="url"
                        autoComplete="url"
                        placeholder="https://yourclinic.com"
                        value={formData.clinic_url}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="specialty"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Specialty{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-colors"
                      >
                        <option value="">Select your specialty</option>
                        {specialtyOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-body-sm font-medium text-foreground mb-2"
                      >
                        Phone{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <Checkbox
                        id="opted_in_ebook"
                        checked={formData.opted_in_ebook}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            opted_in_ebook: checked === true,
                          }))
                        }
                        className="mt-1 border-primary data-[state=checked]:bg-accent-orange data-[state=checked]:border-accent-orange data-[state=checked]:text-white"
                      />
                      <span className="text-body-sm text-foreground group-hover:text-foreground/80">
                        Send me the 47 Frameworks ebook
                      </span>
                    </label>

                    {error && (
                      <p
                        role="alert"
                        className="text-sm text-red-600 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                      >
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
                          Creating your account…
                        </>
                      ) : (
                        <>
                          Get Free Access
                          <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-1">
                      No credit card. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="section-padding-sm bg-background-soft">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-heading-lg text-foreground mb-3">
              Three AI tools, unlocked the moment you sign up
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Built for fertility, aesthetics, OB/GYN, regenerative, and
              wellness clinics. Free forever — no upgrade prompts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card-premium p-7"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-orange-600 flex items-center justify-center shadow-card mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-sm text-foreground mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground">
                    {tool.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const SuccessCard = ({
  email,
  returning,
}: {
  email: string;
  returning: boolean;
}) => (
  <div className="text-center py-4">
    <div className="mx-auto w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center mb-6">
      <CheckCircle2 className="w-9 h-9 text-accent-orange" />
    </div>
    <h2 className="text-heading text-foreground mb-3">
      {returning ? "Welcome back" : "Check your inbox"}
    </h2>
    <p className="text-body text-muted-foreground mb-6">
      {returning
        ? "A fresh login link is in your inbox."
        : `I just sent your ebook and a one-click login link to ${email}. The login gets you into GrowthOS with all 3 AI tools unlocked.`}
    </p>
    <p className="text-body-sm text-muted-foreground">
      Didn&apos;t get it? Check spam, then email{" "}
      <a
        href="mailto:brandon@cimagrowth.com"
        className="text-accent-orange underline-offset-4 hover:underline"
      >
        brandon@cimagrowth.com
      </a>
    </p>
  </div>
);

export default Audit;
