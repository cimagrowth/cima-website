'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ScanLine,
  ShieldAlert,
  MessageSquareWarning,
  Ghost,
  Unplug,
  Scale,
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
  "OB-GYN",
  "Regenerative",
  "IV & Wellness",
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

const FORM_ANCHOR_ID = "audit-form";

function scrollToForm() {
  const el = document.getElementById(FORM_ANCHOR_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const firstField = el.querySelector<HTMLInputElement>("#clinic_url");
  if (firstField) {
    setTimeout(() => firstField.focus({ preventScroll: true }), 600);
  }
}

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

    if (
      !formData.full_name.trim() ||
      !formData.email.trim() ||
      !formData.clinic_url.trim()
    ) {
      setError(
        "Please add your name, email, and clinic website so I can send your audit link."
      );
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
      {/* ───────────── Section 1: Hero ───────────── */}
      <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="absolute top-20 left-[8%] w-72 h-72 bg-secondary/15 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-[8%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300 pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left column — copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <h1 className="font-display font-bold tracking-tight text-primary text-[2.25rem] leading-[1.08] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] mb-6">
                The average clinic loses{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">$8,000–$23,000 a month</span>
                  <span className="absolute left-0 right-0 bottom-1 h-3 bg-accent-orange/30 -z-0 rounded-sm" />
                </span>{" "}
                to leads that click, visit, and vanish.
                <br />
                <span className="text-foreground">
                  In 90 seconds, I&apos;ll show you exactly where yours is
                  bleeding.
                </span>
              </h1>

              <p className="text-body-lg text-muted-foreground max-w-2xl mb-6">
                Three free AI tools that audit your website, your intake
                response, and your compliance exposure — in the time it takes
                to make coffee. Built from 15 years inside 100+ fertility,
                aesthetics, and wellness practices. No credit card. No sales
                call. Keep them as long as you want.
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {[
                  "Used by 100+ clinics",
                  "HIPAA-conscious",
                  "Results in under 2 minutes",
                  "No credit card",
                ].map((label, i, arr) => (
                  <span key={label} className="flex items-center gap-2">
                    <span>{label}</span>
                    {i < arr.length - 1 && (
                      <span className="text-border">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right column — form (sticky on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="lg:sticky lg:top-24" id={FORM_ANCHOR_ID}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange via-secondary to-primary rounded-2xl blur-sm opacity-20" />
                  <div className="relative card-elevated p-6 md:p-8">
                    {success ? (
                      <SuccessCard
                        email={success.email}
                        returning={success.returning_user}
                      />
                    ) : (
                      <FormCard
                        formData={formData}
                        isSubmitting={isSubmitting}
                        error={error}
                        onChange={handleChange}
                        onCheckboxChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            opted_in_ebook: checked,
                          }))
                        }
                        onSubmit={handleSubmit}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Section 2: Pain agitation ───────────── */}
      <section className="bg-background-soft section-padding-sm">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display font-bold text-primary text-[2rem] md:text-[2.5rem] leading-tight tracking-tight mb-4">
              You know something is broken. You just can&apos;t see where.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Most clinic owners I talk to are running on instinct. They feel
              the revenue leak but can&apos;t point to the hole. Here&apos;s
              where it almost always is:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Ghost,
                title:
                  "Someone filled out your form yesterday. You'll never know they booked with the clinic two miles away.",
                body: "Your front desk took 4 hours to respond. They were polite, generic, and never asked for the appointment. The patient had already moved on.",
                tag: "Found by the Lead Response Grader.",
              },
              {
                icon: Unplug,
                title:
                  "Your homepage takes 6 seconds to load. Your pricing is three clicks deep. Your booking button is below the fold.",
                body: "Every second of load time costs you ~7% of visitors. Every unclear path costs you more. Most practice owners have never once audited their own site from a patient's perspective.",
                tag: "Found by the Patient Journey Audit.",
              },
              {
                icon: Scale,
                title:
                  "Your before-and-after gallery might violate HIPAA. Your treatment claims might violate FTC.",
                body: "A single complaint from a past patient or a disgruntled competitor can turn into a real investigation. Most clinics have no idea what their exposure even looks like.",
                tag: "Found by the Compliance Risk Scanner.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card-premium p-7 flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent-orange" />
                  </div>
                  <h3 className="font-display font-bold text-primary text-[1.125rem] leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground mb-4 flex-1">
                    {card.body}
                  </p>
                  <p className="text-xs italic text-accent-orange font-medium">
                    {card.tag}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Section 3: What you actually get ───────────── */}
      <section className="bg-card section-padding-sm">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display font-bold text-primary text-[2rem] md:text-[2.5rem] leading-tight tracking-tight mb-4">
              Three tools. Zero fluff. Unlimited use.
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Every practice owner I&apos;ve met says the same thing:
              &ldquo;I know something&apos;s wrong, I just can&apos;t see
              it.&rdquo; These three tools fix that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: ScanLine,
                name: "Patient Journey Audit",
                tagline: "See your clinic through a patient's eyes.",
                bullets: [
                  "Scores your website across 8 dimensions patients actually care about",
                  "Flags every friction point between \u201cI\u2019m curious\u201d and \u201cI booked\u201d",
                  "Benchmarks your performance against 100+ clinics from inside the industry",
                  "Runs in about 2 minutes",
                ],
              },
              {
                icon: ShieldAlert,
                name: "Compliance Risk Scanner",
                tagline:
                  "Find the HIPAA, FDA, and FTC risks on your site before a regulator does.",
                bullets: [
                  "Crawls your homepage + 4 internal pages",
                  "Flags specific regulatory red flags in plain English",
                  "Tells you which risks are \u201cfix today\u201d vs \u201cfix this month\u201d",
                  "Doesn\u2019t replace a compliance attorney, but will 10x what one catches",
                ],
              },
              {
                icon: MessageSquareWarning,
                name: "Lead Response Grader",
                tagline:
                  "Paste your last five lead replies. See exactly what's costing you bookings.",
                bullets: [
                  "Grades tone, speed, clarity, CTA strength, and objection handling",
                  "Scores each reply out of 100 with specific rewrites",
                  "Works for SMS, email, and chat responses",
                  "Most clinic owners find $30k+/year leaking here",
                ],
              },
            ].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card-premium p-7 flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-orange-600 flex items-center justify-center shadow-card mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-primary text-heading-sm mb-2">
                    {tool.name}
                  </h3>
                  <p className="font-display font-semibold text-primary/90 text-body mb-4 italic">
                    {tool.tagline}
                  </p>
                  <ul className="space-y-2.5 mt-auto">
                    {tool.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-body-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center font-display font-bold text-primary text-[1.25rem] md:text-[1.5rem] max-w-3xl mx-auto leading-snug">
            All three tools are free. No trial. No credit card. No expiry.
            Keep using them after the audit.
          </p>
        </div>
      </section>

      {/* ───────────── Section 4: Brandon credibility ───────────── */}
      <section className="bg-primary text-primary-foreground section-padding-sm">
        <div className="container-wide">
          <div className="max-w-4xl">
            <h2 className="font-display font-bold text-white text-[1.875rem] md:text-[2.5rem] leading-tight tracking-tight mb-6">
              15 years. 100+ clinics. One obsession: figuring out why leads
              click, visit, and disappear — and what to do about it.
            </h2>
            <div className="space-y-5 text-[1.0625rem] md:text-[1.125rem] leading-relaxed text-white/90">
              <p>
                I&apos;m Brandon Hensinger, founder of Cima Growth Solutions.
                I&apos;ve run marketing inside fertility clinics, med spas,
                OB/GYN practices, and wellness studios across the US and
                internationally. I&apos;ve seen every way a clinic can leak
                patients, and I&apos;ve built the fix for most of them.
              </p>
              <p>
                These three tools are the first 90 seconds of what I do when
                I walk into a new clinic. I packaged them up because most
                practice owners will never be able to afford the engagement
                — but they still deserve to know what&apos;s broken.
              </p>
              <p>
                If you want to fix it yourself, these tools plus the 47
                Frameworks ebook will get you 80% of the way. If you&apos;d
                rather I do it for you, there&apos;s a way for that too. But
                that&apos;s a conversation for later. Right now, just run
                your audit.
              </p>
            </div>
            <p className="mt-8 italic text-white/80 text-body-sm">— Brandon</p>
          </div>
        </div>
      </section>

      {/* ───────────── Section 5: FAQ ───────────── */}
      <section className="bg-card section-padding-sm">
        <div className="container-tight">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-primary text-[2rem] md:text-[2.5rem] leading-tight tracking-tight">
              Questions before you sign up
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="faq-1"
            className="w-full"
          >
            {[
              {
                id: "faq-1",
                q: "Is this really free? What's the catch?",
                a: "No catch. I give the tools away because clinic owners who use them become better customers for my bigger offerings — but 80% of people who run their audit never spend a dime with me, and that's fine. I'd rather you have the information.",
              },
              {
                id: "faq-2",
                q: "Will you call me, email-bomb me, or add me to a sales sequence?",
                a: "No sales call. You'll get your login email, the audit results, and occasionally a note from me when I ship something new. Unsubscribe anytime. No nurture sequence.",
              },
              {
                id: "faq-3",
                q: "How is this different from other audit tools?",
                a: "Most audit tools are built by generalists for generic SaaS. These are built for one thing — clinics that take insurance, cash, or a mix of both, and need more patients in chairs. Every dimension these tools score on is something I've watched cost real clinics real revenue.",
              },
              {
                id: "faq-4",
                q: "Do the tools store or train on my data?",
                a: "Only what you explicitly enter. We don't train on your lead responses, we don't share your compliance scan results, and you can delete your account any time. HIPAA-conscious by design.",
              },
              {
                id: "faq-5",
                q: "How long can I keep using the tools?",
                a: "As long as we exist. No trial timer, no credit card on file, no upgrade nag. The tools are a genuine free gift. Everything else at Cima is optional.",
              },
            ].map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-primary font-display font-semibold text-[1.0625rem] md:text-body-lg py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-body leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ───────────── Section 6: Final CTA ───────────── */}
      <section className="bg-background-soft section-padding-sm">
        <div className="container-tight text-center">
          <h2 className="font-display font-bold text-primary text-[2.5rem] md:text-[3.25rem] leading-tight tracking-tight mb-5">
            Still here?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The audit takes 90 seconds. Your login works forever. There&apos;s
            nothing to lose.
          </p>
          <Button
            variant="hero"
            size="xl"
            onClick={scrollToForm}
            className="group"
          >
            Run my free audit
            <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="mt-5 text-xs text-muted-foreground">
            100+ clinics. 15 years. Zero credit cards asked for.
          </p>
        </div>
      </section>
    </>
  );
};

/* ─────────────────────────────────────────────────────── */

type FormCardProps = {
  formData: FormState;
  isSubmitting: boolean;
  error: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onCheckboxChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const FormCard = ({
  formData,
  isSubmitting,
  error,
  onChange,
  onCheckboxChange,
  onSubmit,
}: FormCardProps) => (
  <form onSubmit={onSubmit} className="space-y-4" noValidate>
    <div>
      <h2 className="font-display font-bold text-primary text-[1.5rem] mb-1">
        Run my audit{" "}
        <ArrowRight className="inline-block w-5 h-5 -mt-1 text-accent-orange" />
      </h2>
      <p className="text-body-sm text-muted-foreground">
        Enter your clinic&apos;s URL. You&apos;ll get an instant login plus
        all three tools, unlocked forever.
      </p>
    </div>

    <div>
      <label
        htmlFor="clinic_url"
        className="block text-body-sm font-semibold text-foreground mb-2"
      >
        Your clinic&apos;s website{" "}
        <span className="text-accent-orange">*</span>
      </label>
      <Input
        id="clinic_url"
        name="clinic_url"
        type="url"
        required
        autoComplete="url"
        placeholder="https://yourclinic.com"
        value={formData.clinic_url}
        onChange={onChange}
        className="h-14 text-base border-border focus:border-accent-orange focus:ring-accent-orange"
      />
    </div>

    <div>
      <label
        htmlFor="email"
        className="block text-body-sm font-medium text-foreground mb-2"
      >
        Where should I send your audit link?{" "}
        <span className="text-accent-orange">*</span>
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourclinic.com"
        value={formData.email}
        onChange={onChange}
        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
      />
    </div>

    <div>
      <label
        htmlFor="full_name"
        className="block text-body-sm font-medium text-foreground mb-2"
      >
        Your name <span className="text-accent-orange">*</span>
      </label>
      <Input
        id="full_name"
        name="full_name"
        type="text"
        required
        autoComplete="name"
        placeholder="Dr. Jane Patel"
        value={formData.full_name}
        onChange={onChange}
        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="clinic_name"
          className="block text-body-sm font-medium text-foreground mb-2"
        >
          Practice name
        </label>
        <Input
          id="clinic_name"
          name="clinic_name"
          type="text"
          autoComplete="organization"
          placeholder="Bay Area Fertility"
          value={formData.clinic_name}
          onChange={onChange}
          className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
        />
      </div>
      <div>
        <label
          htmlFor="specialty"
          className="block text-body-sm font-medium text-foreground mb-2"
        >
          Specialty
        </label>
        <select
          id="specialty"
          name="specialty"
          value={formData.specialty}
          onChange={onChange}
          className="w-full h-12 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-colors"
        >
          <option value="">Choose one</option>
          {specialtyOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div>
      <label
        htmlFor="phone"
        className="block text-body-sm font-medium text-foreground mb-2"
      >
        Phone (optional)
      </label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        value={formData.phone}
        onChange={onChange}
        className="h-12 border-border focus:border-accent-orange focus:ring-accent-orange"
      />
    </div>

    <label className="flex items-start gap-3 cursor-pointer group pt-1">
      <Checkbox
        id="opted_in_ebook"
        checked={formData.opted_in_ebook}
        onCheckedChange={(checked) => onCheckboxChange(checked === true)}
        className="mt-0.5 border-primary data-[state=checked]:bg-accent-orange data-[state=checked]:border-accent-orange data-[state=checked]:text-white"
      />
      <span className="text-body-sm text-foreground/90 group-hover:text-foreground">
        Also send me the 47 Frameworks ebook — 15 years of what actually
        works.
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
          Running your audit setup…
        </>
      ) : (
        <>
          Run my free audit
          <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </Button>

    <p className="text-xs text-center text-muted-foreground">
      Instant access. No credit card. No sales call. Just tools.
    </p>
  </form>
);

const SuccessCard = ({
  email,
  returning,
}: {
  email: string;
  returning: boolean;
}) => (
  <div className="text-center py-6">
    <div className="mx-auto w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center mb-6">
      <CheckCircle2 className="w-9 h-9 text-accent-orange" />
    </div>
    <h2 className="font-display font-bold text-primary text-[1.5rem] md:text-[1.75rem] leading-tight mb-3">
      {returning
        ? "Welcome back. A fresh login link is in your inbox."
        : "Check your inbox. Your audit is waiting."}
    </h2>
    <p className="text-body text-muted-foreground mb-6">
      {returning
        ? `We just sent a one-click login link to ${email}.`
        : `I just sent a one-click login link to ${email}. Click it, paste your website URL into the Patient Journey Audit, and you'll have your first real diagnostic in about 2 minutes.`}
    </p>
    <p className="text-body-sm text-muted-foreground">
      Didn&apos;t see it in 60 seconds? Check spam, then email{" "}
      <a
        href="mailto:brandon@cimagrowth.com"
        className="text-accent-orange underline-offset-4 hover:underline"
      >
        brandon@cimagrowth.com
      </a>{" "}
      — I read every one.
    </p>
  </div>
);

export default Audit;
