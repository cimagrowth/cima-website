'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
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

const SMS_CONSENT_TEXT =
  'I agree to receive text messages from Cima Growth Solutions about my audit. Message and data rates may apply. Reply STOP to opt out.';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const locationOptions = ['1', '2 to 3', '4+'];
const monthlyLeadsOptions = [
  'Under 50',
  '50 to 150',
  '150 to 400',
  '400+',
  'Not sure',
];
const monthlyConsultsOptions = [
  'Under 10',
  '10 to 25',
  '25 to 60',
  '60+',
  'Not sure',
];
const leadResponderOptions = [
  'Front desk',
  'Dedicated coordinator',
  'Marketing agency',
  'Chatbot',
  'Mix of these',
];
const funnelSystemOptions = [
  'Marketing agency',
  'CRM',
  'Chatbot',
  'Online scheduling',
  'Spreadsheets',
  'EHR only',
];

const auditDeliverables = [
  'A leak map of your funnel, stage by stage, scored against real clinic benchmarks',
  'Your three biggest leak stages, ranked by revenue at risk',
  'A fragmentation score: how many systems touch your funnel and where leads fall between them',
  'The campaigns that would recover the most patients first',
  'A projected 90-day recovery number',
];

const problemBlocks = [
  {
    title: 'Leads go unanswered.',
    body: 'The average clinic takes hours to respond to a new inquiry. By then, she has called two other clinics.',
  },
  {
    title: 'Follow-up falls through.',
    body: 'Consults that never book. Patients who go quiet mid-journey. Nobody owns the next touch.',
  },
  {
    title: 'Too many vendors, one funnel.',
    body: 'An agency runs ads. A chatbot answers the site. A CRM holds the leads. Nobody is accountable for the handoffs, and the handoffs are where patients disappear.',
  },
];

const labelClasses =
  'mb-2 block font-ui text-sm font-medium text-teal-deep';
const controlClasses =
  'h-12 w-full rounded-lg border border-sand bg-paper px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-0';

function RequiredMark() {
  return <span className="ml-0.5 text-accent-orange">*</span>;
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
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);

    const funnelSystems = formData.getAll('funnel_systems').map(String);

    const payload = {
      email: String(formData.get('email') || '').trim().toLowerCase(),
      phone: String(formData.get('phone') || '').trim(),
      first_name: String(formData.get('first_name') || '').trim(),
      last_name: String(formData.get('last_name') || '').trim(),
      clinic_name: String(formData.get('clinic_name') || '').trim(),
      location_count: String(formData.get('location_count') || ''),
      primary_ehr: String(formData.get('primary_ehr') || '').trim(),
      monthly_leads: String(formData.get('monthly_leads') || ''),
      monthly_consults: String(formData.get('monthly_consults') || ''),
      lead_responder: String(formData.get('lead_responder') || ''),
      funnel_systems: funnelSystems,
      biggest_frustration: String(formData.get('biggest_frustration') || '').trim(),
      sms_consent: smsConsent,
      page_path: PAGE_PATH,
      honeypot: String(formData.get('company_website') || ''),
    };

    try {
      const res = await fetch(`${ENDPOINT_BASE}/${WEBHOOK_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let ok = res.ok;
      if (ok) {
        const json = await res.json().catch(() => ({}));
        ok = json?.ok !== false;
      }

      if (!ok) {
        setStatus('error');
        return;
      }

      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'growth_audit_submitted' });
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-[340] tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              Your clinic is losing patients you already paid for. Find out where.
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              One in five leads books at the best-run clinics. What is your number?
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
              <p className="font-ui text-sm text-teal-deep/70">
                Free audit. Results in 48 hours. Includes the Stop the Leak framework guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {problemBlocks.map((block) => (
              <div key={block.title} className="card-elevated p-7 md:p-8">
                <h2 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-3">
                  {block.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the audit delivers */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-8 text-center">
              What the audit delivers
            </h2>
            <ul className="space-y-4">
              {auditDeliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-xl2 border border-sand bg-paper p-5 shadow-[var(--shadow-sm)]"
                >
                  <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-clay" />
                  <span className="text-base md:text-lg text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="audit-form"
        ref={formRef}
        className="section-padding bg-background relative overflow-hidden scroll-mt-24"
      >
        <div className="container-wide relative z-10">
          <div className="mx-auto max-w-[640px]">
            {status === 'success' ? (
              <div className="card-elevated p-8 md:p-10 text-center">
                <h2 className="font-display text-3xl font-[340] tracking-tight text-teal-deep mb-4">
                  Your audit is underway.
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Your audit is underway. Check your email for the Stop the Leak guide. Your results arrive within 48 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="font-display text-[clamp(28px,4vw,44px)] font-[340] tracking-tight text-foreground leading-tight mb-4">
                    Get My Free Audit
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Free audit. Results in 48 hours. Includes the Stop the Leak framework guide.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot: visually hidden, not type=hidden. Humans leave it empty. */}
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

                  {/* 1. Clinic name */}
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

                  {/* 2. Number of locations */}
                  <div>
                    <label htmlFor="location_count" className={labelClasses}>
                      Number of locations
                      <RequiredMark />
                    </label>
                    <select
                      id="location_count"
                      name="location_count"
                      required
                      defaultValue=""
                      disabled={isSubmitting}
                      className={controlClasses}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {locationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Primary EHR */}
                  <div>
                    <label htmlFor="primary_ehr" className={labelClasses}>
                      Primary EHR{' '}
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

                  {/* 4. Monthly inbound leads */}
                  <div>
                    <label htmlFor="monthly_leads" className={labelClasses}>
                      Monthly inbound leads, best estimate
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

                  {/* 5. New patient consults per month */}
                  <div>
                    <label htmlFor="monthly_consults" className={labelClasses}>
                      New patient consults per month
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

                  {/* 6. Who responds to new leads today */}
                  <div>
                    <label htmlFor="lead_responder" className={labelClasses}>
                      Who responds to new leads today
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

                  {/* 7. Systems touching your funnel today */}
                  <fieldset>
                    <legend className={labelClasses}>
                      Systems touching your funnel today
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {funnelSystemOptions.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 rounded-lg border border-sand bg-paper px-4 py-3 text-sm text-foreground cursor-pointer hover:border-primary/50"
                        >
                          <input
                            type="checkbox"
                            name="funnel_systems"
                            value={opt}
                            disabled={isSubmitting}
                            className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 text-accent-orange accent-accent-orange focus:ring-2 focus:ring-accent-orange/40"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Biggest frustration */}
                  <div>
                    <label htmlFor="biggest_frustration" className={labelClasses}>
                      What is your biggest frustration right now?{' '}
                      <span className="text-muted-foreground/70">(optional)</span>
                    </label>
                    <textarea
                      id="biggest_frustration"
                      name="biggest_frustration"
                      rows={4}
                      maxLength={2000}
                      disabled={isSubmitting}
                      className="min-h-[120px] w-full rounded-lg border border-sand bg-paper px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-0"
                    />
                  </div>

                  {/* 8. Name, work email, mobile */}
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

                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Mobile
                      <RequiredMark />
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                      disabled={isSubmitting}
                      className={controlClasses}
                    />
                  </div>

                  {/* SMS consent */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="sms_consent"
                      name="sms_consent"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      disabled={isSubmitting}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 text-accent-orange accent-accent-orange focus:ring-2 focus:ring-accent-orange/40"
                    />
                    <label
                      htmlFor="sms_consent"
                      className="cursor-pointer text-sm leading-relaxed text-teal/80"
                    >
                      {SMS_CONSENT_TEXT}
                    </label>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      Something went wrong. Email{' '}
                      <a
                        href="mailto:brandon@cimagrowth.com"
                        className="underline underline-offset-2"
                      >
                        brandon@cimagrowth.com
                      </a>{' '}
                      and we will run your audit manually.
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
                          Submitting
                        </>
                      ) : (
                        'Get My Free Audit'
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="section-padding-sm bg-tan relative overflow-hidden">
        <div className="container-wide relative z-10">
          <p className="mx-auto max-w-3xl text-center text-base md:text-lg text-teal-deep/80 leading-relaxed">
            Built by the team behind patient acquisition infrastructure for fertility clinics across Texas, California, the Midwest, Athens, and Buenos Aires.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      {status !== 'success' && (
        <section className="section-padding bg-cream relative overflow-hidden">
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-5xl font-[340] tracking-[-.02em] text-teal-deep mb-8 leading-tight">
                Your clinic is losing patients you already paid for. Find out where.
              </h2>
              <div className="flex justify-center">
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
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
