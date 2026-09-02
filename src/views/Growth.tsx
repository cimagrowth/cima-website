'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Loader2, ArrowRight, Map, Calculator, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const ENDPOINT_BASE =
  'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/inbound-webhook';
const WEBHOOK_TOKEN = process.env.NEXT_PUBLIC_GROWTH_WEBHOOK_TOKEN || '';
const PAGE_PATH = '/growth';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// specialty is the only field whose value differs from its display label.
const specialtyOptions: { value: string; label: string }[] = [
  { value: 'fertility', label: 'Fertility / IVF' },
  { value: 'aesthetics', label: 'Aesthetics / med spa' },
  { value: 'cosmetic_surgery', label: 'Cosmetic surgery' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'regenerative', label: 'Regenerative / orthobiologics' },
  { value: 'wellness', label: 'Wellness / functional / hormone' },
  { value: 'dental', label: 'Dental / orthodontics' },
  { value: 'general', label: 'Other' },
];

// For these fields the value IS the label. Copied verbatim from the engine contract.
const monthlyLeadsOptions = ['Under 50', '50 to 150', '150 to 400', '400+', 'Not sure'];
const monthlyConsultsOptions = ['Under 10', '10 to 25', '25 to 60', '60+', 'Not sure'];
const leadResponderOptions = [
  'Front desk',
  'Dedicated coordinator',
  'Chatbot',
  'AI agent',
  'Mix of these',
];
const funnelSystemOptions = [
  'Marketing agency',
  'CRM',
  'Spreadsheets',
  'Chatbot',
  'Online scheduling',
  'Call answering service',
  'None of these',
];
const locationOptions = ['1', '2 to 3', '4+'];

const whatYouGet = [
  {
    icon: Map,
    title: 'Your Leak Map',
    body: 'Nine stages, where patients fall out, benchmarked against real clinic data.',
  },
  {
    icon: Calculator,
    title: 'Your 90-Day Recovery Number',
    body: 'The consults you are leaving on the table, with the method shown.',
  },
  {
    icon: ListOrdered,
    title: 'The Fix, In Order',
    body: 'The numbered frameworks that plug each leak.',
  },
];

// A2P 10DLC / TCR compliant opt-in disclosure. Kept as a single source of
// truth so the exact text shown to the user is also recorded with consent.
const SMS_CONSENT_TEXT =
  'I agree to receive text messages from Cima Growth Solutions at the mobile number provided about my Patient Leakage Audit, my results, and related follow-up. Up to 6 messages per month. Consent is not a condition of any purchase or service. Message and data rates may apply. Reply STOP to opt out, HELP for help.';

const labelClasses = 'mb-2 block font-ui text-sm font-medium text-teal-deep';
const controlClasses =
  'h-12 w-full rounded-lg border border-sand bg-paper px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-0';

function RequiredMark() {
  return <span className="ml-0.5 text-orange">*</span>;
}

export default function Growth() {
  const [status, setStatus] = useState<Status>('idle');
  const [smsConsent, setSmsConsent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isSubmitting = status === 'submitting';

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Honeypot: if filled, silently skip submission and show success anyway.
    if (String(formData.get('company_website') || '').trim() !== '') {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    const websiteRaw = String(formData.get('website') || '').trim();
    const website =
      websiteRaw && !/^https?:\/\//i.test(websiteRaw)
        ? `https://${websiteRaw}`
        : websiteRaw;

    const payload = {
      first_name: String(formData.get('first_name') || '').trim(),
      last_name: String(formData.get('last_name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      clinic_name: String(formData.get('clinic_name') || '').trim(),
      website,
      specialty: String(formData.get('specialty') || ''),
      monthly_leads: String(formData.get('monthly_leads') || ''),
      monthly_consults: String(formData.get('monthly_consults') || ''),
      lead_responder: String(formData.get('lead_responder') || ''),
      funnel_systems: formData.getAll('funnel_systems').map(String),
      location_count: String(formData.get('location_count') || ''),
      primary_ehr: String(formData.get('primary_ehr') || '').trim(),
      sms_consent: smsConsent,
      sms_consent_text: smsConsent ? SMS_CONSENT_TEXT : '',
      sms_consent_timestamp: smsConsent ? new Date().toISOString() : '',
      page_path: PAGE_PATH,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const res = await fetch(`${ENDPOINT_BASE}/${WEBHOOK_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('Growth audit submission failed:', res.status, body);
        setStatus('error');
        return;
      }

      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'growth_audit_requested' });
      }

      setStatus('success');
    } catch (err) {
      console.error('Growth audit submission network error:', err);
      setStatus('error');
    }
  }

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-[340] tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              Your clinic is losing patients you already paid for. Find out where.
            </h1>
            <p className="font-body text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              One in five leads books a consult at the best-run clinics. What is your number?
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                type="button"
                variant="hero"
                size="xl"
                className="group"
                onClick={scrollToForm}
              >
                Get My Free Audit
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="font-body text-sm text-teal-deep/70 max-w-2xl">
                Free audit. Results in 48 hours. Includes The Seven-Figure Leak framework guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {whatYouGet.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="card-elevated p-7 md:p-8">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-orange/10">
                    <Icon className="h-5 w-5 text-orange" aria-hidden="true" />
                  </span>
                  <h2 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-2">
                    {card.title}
                  </h2>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Proof line */}
          <p className="mt-10 md:mt-12 mx-auto max-w-3xl text-center font-body text-base md:text-lg text-teal-deep/80 leading-relaxed">
            Built from 6,427 real patient inquiries at clinics we operate for, plus published benchmarks for your specialty.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        id="audit-form"
        ref={formRef}
        className="section-padding relative overflow-hidden scroll-mt-24"
      >
        <div className="container-wide relative z-10">
          <div className="mx-auto max-w-[640px]">
            {status === 'success' ? (
              <div className="card-elevated p-8 md:p-10 text-center">
                <h2 className="font-display text-3xl font-[340] tracking-tight text-teal-deep mb-4">
                  Your audit is underway.
                </h2>
                <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                  Your audit is underway. Check your email for The Seven-Figure Leak guide. Your results arrive within 48 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="font-display text-[clamp(28px,4vw,44px)] font-[340] tracking-tight text-teal-deep leading-tight mb-4">
                    Get My Free Audit
                  </h2>
                  <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                    Free audit. Results in 48 hours. Includes The Seven-Figure Leak framework guide.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot: visually hidden, must stay empty. */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="company_website">Company website</label>
                    <input
                      type="text"
                      id="company_website"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* First / last name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="first_name" className={labelClasses}>
                        First name
                        <RequiredMark />
                      </label>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="given-name"
                        disabled={isSubmitting}
                        className={controlClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className={labelClasses}>
                        Last name
                        <RequiredMark />
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="family-name"
                        disabled={isSubmitting}
                        className={controlClasses}
                      />
                    </div>
                  </div>

                  {/* Work email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Work email
                      <RequiredMark />
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={320}
                      autoComplete="email"
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Mobile{' '}
                      <span className="text-muted-foreground/70">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 555 123 4567"
                      autoComplete="tel"
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* Clinic name */}
                  <div>
                    <label htmlFor="clinic_name" className={labelClasses}>
                      Clinic name
                      <RequiredMark />
                    </label>
                    <input
                      id="clinic_name"
                      name="clinic_name"
                      type="text"
                      required
                      maxLength={200}
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* Clinic website */}
                  <div>
                    <label htmlFor="website" className={labelClasses}>
                      Clinic website
                      <RequiredMark />
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      inputMode="url"
                      required
                      maxLength={300}
                      placeholder="yourclinic.com"
                      autoComplete="url"
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label htmlFor="specialty" className={labelClasses}>
                      What kind of clinic?
                      <RequiredMark />
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      required
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {specialtyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly leads */}
                  <div>
                    <label htmlFor="monthly_leads" className={labelClasses}>
                      New leads per month
                      <RequiredMark />
                    </label>
                    <select
                      id="monthly_leads"
                      name="monthly_leads"
                      required
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {monthlyLeadsOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly consults */}
                  <div>
                    <label htmlFor="monthly_consults" className={labelClasses}>
                      Consults per month
                      <RequiredMark />
                    </label>
                    <select
                      id="monthly_consults"
                      name="monthly_consults"
                      required
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {monthlyConsultsOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lead responder */}
                  <div>
                    <label htmlFor="lead_responder" className={labelClasses}>
                      Who answers new inquiries first?
                      <RequiredMark />
                    </label>
                    <select
                      id="lead_responder"
                      name="lead_responder"
                      required
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {leadResponderOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Funnel systems */}
                  <fieldset>
                    <legend className={labelClasses}>
                      What touches your funnel today?
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {funnelSystemOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 rounded-lg border border-sand bg-paper px-4 py-3 font-body text-sm text-foreground cursor-pointer hover:border-primary/50"
                        >
                          <input
                            type="checkbox"
                            name="funnel_systems"
                            value={opt}
                            disabled={isSubmitting}
                            className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 text-orange accent-orange focus:ring-2 focus:ring-orange/40"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Locations */}
                  <div>
                    <label htmlFor="location_count" className={labelClasses}>
                      Locations
                    </label>
                    <select
                      id="location_count"
                      name="location_count"
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="">Select one</option>
                      {locationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* EHR / practice system */}
                  <div>
                    <label htmlFor="primary_ehr" className={labelClasses}>
                      EHR / practice system{' '}
                      <span className="text-muted-foreground/70">(optional)</span>
                    </label>
                    <input
                      id="primary_ehr"
                      name="primary_ehr"
                      type="text"
                      maxLength={200}
                      placeholder="e.g. eIVF, Artisan, ModMed"
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* SMS consent (A2P 10DLC / TCR). Optional, unchecked by
                      default. Consent is never a condition of the audit. */}
                  <div className="flex items-start gap-3 rounded-lg border border-sand bg-paper px-4 py-4">
                    <input
                      type="checkbox"
                      id="sms_consent"
                      name="sms_consent"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      disabled={isSubmitting}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 text-orange accent-orange focus:ring-2 focus:ring-orange/40"
                    />
                    <label
                      htmlFor="sms_consent"
                      className="cursor-pointer font-body text-sm leading-relaxed text-teal-deep/80"
                    >
                      {SMS_CONSENT_TEXT} See our{' '}
                      <a
                        href="/privacy"
                        className="underline underline-offset-2 hover:text-orange"
                      >
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-800"
                    >
                      That did not go through. Please try again, or email{' '}
                      <a
                        href="mailto:brandon@cimagrowth.com"
                        className="underline underline-offset-2"
                      >
                        brandon@cimagrowth.com
                      </a>
                      .
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        'Get My Free Audit'
                      )}
                    </Button>
                    <p className="mt-4 font-body text-sm text-teal-deep/70">
                      Your results arrive by email within 48 hours. No spam. No obligation.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer signature */}
      <section className="section-padding-sm bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <p className="text-center font-ui text-sm font-medium text-teal-deep/70">
            Cima Growth Solutions. Built on The 47 Frameworks.
          </p>
        </div>
      </section>
    </div>
  );
}
