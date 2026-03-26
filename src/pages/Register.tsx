import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

const SUPABASE_URL = "https://momssbzlofjodqodvvvk.supabase.co";

const WHOP_PLAN_IDS = {
  monthly: "plan_YTMn2yZ62W5Xt",
  annual: "plan_gKhQsMZi7n1dB",
} as const;

function getUTMParam(param: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "";
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  clinic_name?: string;
}

const Register = () => {
  const [searchParams] = useSearchParams();
  const planType = searchParams.get("plan") === "annual" ? "annual" : "monthly";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    clinic_name: "",
    clinic_address: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Continue to Payment");
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.clinic_name.trim()) newErrors.clinic_name = "Clinic name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setButtonText("Saving...");
    setApiError(null);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/growthos-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          clinic_name: formData.clinic_name,
          clinic_address: formData.clinic_address || "",
          plan_type: planType,
          utm_source: getUTMParam("utm_source"),
          utm_medium: getUTMParam("utm_medium"),
          utm_campaign: getUTMParam("utm_campaign"),
          utm_content: getUTMParam("utm_content"),
          source_url: window.location.href,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStep(2);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setButtonText("Continue to Payment");
      setIsLoading(false);
    }
  };

  const planInfo =
    planType === "annual"
      ? { label: "GrowthOS Annual", price: "$9,999/year, no setup fee", badge: true }
      : { label: "GrowthOS Monthly", price: "$999/mo + $999 setup", badge: false };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-0 ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-border focus:border-accent-orange"
    }`;

  return (
    <Layout>
      <SEO
        title="Sign Up – GrowthOS"
        description="Set up your clinic on GrowthOS. Fill out your details and continue to checkout."
        canonical="https://cimagrowth.com/sign-up/register"
      />

      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            {/* Progress indicator */}
            {step < 3 && (
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? "bg-accent-orange text-white" : "bg-muted text-muted-foreground"
                  }`}>1</span>
                  <span className="text-sm">Clinic Info</span>
                </div>
                <div className="w-12 h-px bg-border" />
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? "bg-accent-orange text-white" : "bg-muted text-muted-foreground"
                  }`}>2</span>
                  <span className="text-sm">Payment</span>
                </div>
              </div>
            )}

            {/* Header - shown for steps 1 and 2 */}
            {step < 3 && (
              <div className="text-center mb-8">
                <h1 className="text-display-lg md:text-display-xl text-foreground mb-4">
                  {step === 1 ? "Almost there — set up your clinic." : "Complete Your Payment"}
                </h1>

                <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 shadow-card">
                  <span className="text-body font-semibold text-foreground">{planInfo.label}</span>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-body-sm text-muted-foreground">{planInfo.price}</span>
                  {planInfo.badge && (
                    <span className="bg-accent-orange text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Best Value
                    </span>
                  )}
                </div>

                {step === 1 && (
                  <div className="mt-3">
                    <Link
                      to="/sign-up"
                      className="text-sm text-accent-orange hover:underline font-medium"
                    >
                      Change plan
                    </Link>
                  </div>
                )}

                {step === 2 && (
                  <p className="text-sm text-muted-foreground mt-3">Secure checkout powered by Whop</p>
                )}
              </div>
            )}

            {/* ═══════════ STEP 1: Clinic Info Form ═══════════ */}
            {step === 1 && (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {apiError && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
                      {apiError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Dr. Jane Smith"
                      value={formData.full_name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClasses("full_name")}
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-500">{errors.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@yourclinic.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClasses("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClasses("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="clinic_name" className="block text-sm font-medium text-foreground mb-1.5">
                      Clinic Name *
                    </label>
                    <input
                      id="clinic_name"
                      name="clinic_name"
                      type="text"
                      placeholder="Your Clinic Name"
                      value={formData.clinic_name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClasses("clinic_name")}
                    />
                    {errors.clinic_name && (
                      <p className="mt-1 text-sm text-red-500">{errors.clinic_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="clinic_address" className="block text-sm font-medium text-foreground mb-1.5">
                      Clinic Address
                    </label>
                    <input
                      id="clinic_address"
                      name="clinic_address"
                      type="text"
                      placeholder="123 Main St, City, State ZIP"
                      value={formData.clinic_address}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-0 focus:border-accent-orange"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group shadow-glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {buttonText}
                    {!isLoading && (
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>

                <div className="mt-8 space-y-3">
                  {[
                    "100% secure — payment processed by Whop",
                    "Cancel anytime — no long-term contracts",
                    "Live in 24\u201348 hours after onboarding",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent-orange flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ═══════════ STEP 2: Whop Checkout Embed ═══════════ */}
            {step === 2 && (
              <div>
                <WhopCheckoutEmbed
                  planId={WHOP_PLAN_IDS[planType]}
                  theme="dark"
                  prefill={{ email: formData.email }}
                  disableEmail={true}
                  skipRedirect={true}
                  onComplete={(planId, receiptId) => {
                    console.log("Checkout complete:", planId, receiptId);
                    setStep(3);
                    setTimeout(() => {
                      window.location.href = "https://os.cimagrowth.com/welcome";
                    }, 3000);
                  }}
                  returnUrl="https://os.cimagrowth.com/welcome"
                  fallback={
                    <div className="text-center py-8 text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading secure checkout...
                    </div>
                  }
                  styles={{ container: { paddingX: 0 } }}
                />

                <button
                  onClick={() => {
                    setStep(1);
                    setIsLoading(false);
                    setButtonText("Continue to Payment");
                  }}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  &larr; Back to clinic info
                </button>
              </div>
            )}

            {/* ═══════════ STEP 3: Success / Redirect ═══════════ */}
            {step === 3 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to GrowthOS!</h2>
                <p className="text-muted-foreground">Setting up your account...</p>
                <p className="text-sm text-muted-foreground mt-4">
                  You'll be redirected in a moment. Check your email for your login link.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
