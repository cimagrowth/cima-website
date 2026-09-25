'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
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

// For these fields the submitted value is read by the engine verbatim: never
// change a value. The label is only what the visitor reads.
type Choice = { value: string; label: string };

const monthlyLeadsOptions: Choice[] = [
  { value: 'Under 50', label: 'Fewer than 50' },
  { value: '50 to 150', label: '50 to 150' },
  { value: '150 to 400', label: '150 to 400' },
  { value: '400+', label: 'More than 400' },
  { value: 'Not sure', label: 'Not sure' },
];
const monthlyConsultsOptions: Choice[] = [
  { value: 'Under 10', label: 'Fewer than 10' },
  { value: '10 to 25', label: '10 to 25' },
  { value: '25 to 60', label: '25 to 60' },
  { value: '60+', label: 'More than 60' },
  { value: 'Not sure', label: 'Not sure' },
];
const leadResponderOptions: Choice[] = [
  { value: 'Front desk', label: 'Front desk staff' },
  { value: 'Dedicated coordinator', label: 'A dedicated patient coordinator' },
  { value: 'Chatbot', label: 'A chatbot on our website' },
  { value: 'AI agent', label: 'An AI assistant' },
  { value: 'Mix of these', label: 'A mix of these' },
];
const funnelSystemOptions: Choice[] = [
  { value: 'Marketing agency', label: 'A marketing agency' },
  { value: 'CRM', label: 'A CRM to track leads' },
  { value: 'Spreadsheets', label: 'Spreadsheets' },
  { value: 'Chatbot', label: 'A chatbot on our website' },
  { value: 'Online scheduling', label: 'Online booking' },
  { value: 'Call answering service', label: 'A call answering service' },
  { value: 'None of these', label: 'None of these' },
];
const locationOptions: Choice[] = [
  { value: '1', label: '1' },
  { value: '2 to 3', label: '2 to 3' },
  { value: '4+', label: '4 or more' },
];

const whatYouGet = [
  {
    icon: Map,
    title: 'Your GrowthOS Map',
    body: 'All eight stages of your patient journey, from the first search to years after treatment, each marked open, at risk or healthy.',
  },
  {
    icon: Calculator,
    title: 'Your 90-Day Recovery Number',
    body: 'The consults you are leaving on the table, with the method shown.',
  },
  {
    icon: ListOrdered,
    title: 'Your fix, stage by stage',
    body: 'For every open stage, the GrowthOS modules that close it and what each one does.',
  },
];

// Step 2: the GrowthOS Map questions. Option strings are read by the audit
// engine (run-patient-leakage-audit) character for character: never rename or
// re-case a value. Only the label is shown to the visitor.
type MapQuestion = {
  name: string;
  stage: string;
  question: string;
  options: Choice[];
  fertilityOnly?: boolean;
};

const mapQuestions: MapQuestion[] = [
  {
    name: 'map_ad_tracking',
    stage: '1 · Get found',
    question: 'Can you tell which ads or web pages bring in patients who actually book a consult?',
    options: [
      { value: 'Yes, by source', label: 'Yes, for every source' },
      { value: 'Partly', label: 'For some sources' },
      { value: 'No', label: 'No' },
      { value: 'We do not run ads', label: "We don't run ads" },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_form_fields',
    stage: '2 · First response',
    question: 'How many fields does the inquiry form on your website ask patients to fill in?',
    options: [
      { value: '3 or fewer', label: '3 or fewer' },
      { value: '4 to 7', label: '4 to 7' },
      { value: '8 or more', label: '8 or more' },
      { value: 'No form, phone only', label: 'We have no form, only a phone number' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_after_hours',
    stage: '2 · First response',
    question: 'When a patient sends an inquiry at night or on the weekend, how soon do they get a reply?',
    options: [
      { value: 'Answered within minutes', label: 'Within minutes, even after hours' },
      { value: 'Next business day', label: 'The next business day' },
      { value: 'It depends', label: 'It depends on who is working' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_follow_up',
    stage: '3 · Nurture and qualify',
    question: "When a new lead doesn't book on the first contact, how many more times does your team reach out?",
    options: [
      { value: 'None or one', label: 'Once or not at all' },
      { value: '2 to 4', label: '2 to 4 times' },
      { value: '5 or more, automated', label: '5 or more times, sent automatically' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_reminders',
    stage: '4 · Book and show up',
    question: 'How are patients reminded about a booked consultation?',
    options: [
      { value: 'Text and email', label: 'Text and email' },
      { value: 'Email only', label: 'Email only' },
      { value: 'Phone call only', label: 'A phone call from our staff' },
      { value: 'No reminders', label: 'No reminders are sent' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_post_consult',
    stage: '5 · Consult to commitment',
    question: 'When a patient leaves a consultation without deciding to start treatment, what does your team do next?',
    options: [
      { value: 'Structured follow-up until they decide', label: 'We follow up on a set schedule until they decide' },
      { value: 'A call or two', label: 'We call them once or twice' },
      { value: 'Nothing systematic', label: 'Nothing is set up' },
      { value: 'Not sure', label: 'Not sure' },
    ],
  },
  {
    name: 'map_financing',
    stage: '5 · Consult to commitment',
    question: 'Do patients hear about payment or financing options before or during the consultation?',
    options: [
      { value: 'Yes, before or at the consult', label: 'Yes, before or during the consult' },
      { value: 'Only if asked', label: 'Only if the patient asks' },
      { value: 'No', label: 'No' },
      { value: 'Not applicable', label: "Doesn't apply to us" },
    ],
  },
  {
    name: 'map_between_visits',
    stage: '6 · In treatment',
    question: 'Between visits or treatment cycles, does anyone on your team check in with patients?',
    options: [
      { value: 'Yes, on a schedule', label: 'Yes, on a set schedule' },
      { value: 'Only when they reach out', label: 'Only when the patient contacts us' },
      { value: 'No', label: 'No' },
      { value: 'Not applicable', label: 'Our treatment is a single visit' },
    ],
  },
  {
    name: 'map_stored_followup',
    stage: '7 · After the cycle',
    question: 'For patients with frozen eggs or embryos in storage, when did your clinic last contact them about next steps?',
    options: [
      { value: 'Within the last year', label: 'Within the last year' },
      { value: 'Only at storage billing', label: 'Only when we send the storage bill' },
      { value: 'Not sure', label: 'Not sure' },
      { value: 'We do not store', label: "We don't store eggs or embryos" },
    ],
    fertilityOnly: true,
  },
  {
    name: 'map_reviews',
    stage: '8 · Advocate and return',
    question: 'After treatment, are patients asked to leave a review or refer a friend?',
    options: [
      { value: 'Yes, automatically', label: 'Yes, every patient, automatically' },
      { value: 'Sometimes', label: 'Sometimes' },
      { value: 'No', label: 'No' },
    ],
  },
  {
    name: 'map_measure',
    stage: 'Measure',
    question: 'Can you see how many patients you lose at each step, from first inquiry to starting treatment?',
    options: [
      { value: 'Yes, by stage', label: 'Yes, for each step' },
      { value: 'Roughly', label: 'Roughly, not exactly' },
      { value: 'No', label: 'No' },
    ],
  },
];

const FORM_VERSION = 'map-v1';

/** Reports the first invalid control inside a step; true when the step is valid. */
function validateStep(container: HTMLElement | null): boolean {
  if (!container) return true;
  const controls = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input, select, textarea',
  );
  for (const el of Array.from(controls)) {
    if (!el.checkValidity()) {
      el.reportValidity();
      return false;
    }
  }
  return true;
}

function MapQuestionField({ q, disabled }: { q: MapQuestion; disabled: boolean }) {
  return (
    <fieldset className="rounded-xl2 border border-sand bg-paper p-4 md:p-5">
      <legend className="sr-only">{q.question}</legend>
      <p aria-hidden="true" className="mb-1 font-ui text-xs font-bold uppercase tracking-[0.1em] text-teal">
        {q.stage}
      </p>
      <p aria-hidden="true" className="mb-3 font-ui text-base font-semibold text-teal-deep">
        {q.question}
        <RequiredMark />
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {q.options.map((opt) => (
          <label
            key={opt.value}
            className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border border-sand bg-cream px-4 py-3 font-body text-[15px] text-teal-deep transition-colors hover:border-teal/50 has-[:checked]:border-teal has-[:checked]:bg-mist has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal"
          >
            <input
              type="radio"
              name={q.name}
              value={opt.value}
              required
              disabled={disabled}
              className="h-4 w-4 shrink-0 accent-teal"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// A2P 10DLC / TCR compliant opt-in disclosure. Kept as a single source of
// truth so the exact text shown to the user is also recorded with consent.
const SMS_CONSENT_TEXT =
  'I agree to receive text messages from Cima Growth Solutions at the mobile number provided about my Patient Leakage Audit, my results, and related follow-up. Up to 6 messages per month. Consent is not a condition of any purchase or service. Message and data rates may apply. Reply STOP to opt out, HELP for help.';

const labelClasses = 'mb-2 block font-ui text-sm font-medium text-teal-deep';
const controlClasses =
  'h-12 w-full rounded-lg border border-sand bg-paper px-4 text-base text-foreground placeholder:text-teal-deep/75 focus:border-primary focus:outline-none focus:ring-0';

function RequiredMark() {
  return <span className="ml-0.5 text-orange">*</span>;
}

export default function Growth({ mapPreview }: { mapPreview?: ReactNode } = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [step, setStep] = useState<1 | 2>(1);
  const [specialty, setSpecialty] = useState('');
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step1HeadingRef = useRef<HTMLParagraphElement>(null);
  const step2HeadingRef = useRef<HTMLParagraphElement>(null);
  const isFertility = specialty === 'fertility';
  const [smsConsent, setSmsConsent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isSubmitting = status === 'submitting';

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goToStep(next: 1 | 2) {
    setStep(next);
    // Move focus to the new step's heading once it is visible.
    requestAnimationFrame(() => {
      (next === 1 ? step1HeadingRef : step2HeadingRef).current?.focus();
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function continueToMap() {
    if (validateStep(step1Ref.current)) goToStep(2);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Enter on step 1 moves on instead of submitting.
    if (step === 1) {
      continueToMap();
      return;
    }
    if (!validateStep(step1Ref.current)) {
      goToStep(1);
      requestAnimationFrame(() => validateStep(step1Ref.current));
      return;
    }
    if (!validateStep(step2Ref.current)) return;

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
      // GrowthOS Map answers (form_version map-v1). The stored-specimen
      // question is fertility only: for other specialties the key is omitted.
      ...Object.fromEntries(
        mapQuestions
          .filter((q) => !q.fertilityOnly || isFertility)
          .map((q) => [q.name, String(formData.get(q.name) || '')]),
      ),
      form_version: FORM_VERSION,
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
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              Where does your clinic leak? See it on the GrowthOS Map.
            </h1>
            <p className="font-body text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Answer a few questions about your patient journey. We place every answer on the GrowthOS Map, benchmark it against the clinics we run, and send you a report showing which stages are leaking and the modules that close each one. Your report arrives in your inbox in a few minutes.
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
                Free audit. Your report arrives in your inbox in a few minutes. Includes The Seven-Figure Leak framework guide.
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
                  <p className="font-body text-sm md:text-base text-teal-deep/80 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sample Map preview (server-rendered from the live Map) */}
          {mapPreview}

          {/* Proof line */}
          <p className="mt-10 md:mt-12 mx-auto max-w-3xl text-center font-body text-base md:text-lg text-teal-deep/80 leading-relaxed">
            Benchmarked against thousands of real patient inquiries at clinics we operate for, plus published research for your specialty.
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
                <h2 className="font-display text-3xl font-semibold tracking-tight text-teal-deep mb-4">
                  Your audit is underway.
                </h2>
                <p className="font-body text-base md:text-lg text-teal-deep/80 leading-relaxed">
                  Your audit is underway. Check your email for The Seven-Figure Leak guide. Your report arrives in your inbox in a few minutes.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-teal-deep leading-tight mb-4">
                    Get My Free Audit
                  </h2>
                  <p className="font-body text-base md:text-lg text-teal-deep/80 leading-relaxed">
                    Free audit. Your report arrives in your inbox in a few minutes. Includes The Seven-Figure Leak framework guide.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

                  {/* Step 1: About your clinic. Kept mounted on step 2 (hidden) so
                      its values are still submitted. */}
                  <div ref={step1Ref} hidden={step !== 1} className="space-y-5">
                  <p
                    ref={step1HeadingRef}
                    tabIndex={-1}
                    className="font-ui text-sm font-semibold text-teal-deep/80 focus:outline-none"
                  >
                    Step 1 of 2 · About your clinic
                  </p>

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
                      <span className="text-teal-deep/75">(optional)</span>
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
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
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
                      New patient inquiries per month
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
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly consults */}
                  <div>
                    <label htmlFor="monthly_consults" className={labelClasses}>
                      Consultations per month
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
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
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
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Funnel systems */}
                  <fieldset>
                    <legend className={labelClasses}>
                      Which of these do you use to bring in or follow up with new patients?
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {funnelSystemOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-3 rounded-lg border border-sand bg-paper px-4 py-3 font-body text-sm text-foreground cursor-pointer hover:border-primary/50"
                        >
                          <input
                            type="checkbox"
                            name="funnel_systems"
                            value={opt.value}
                            disabled={isSubmitting}
                            className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 text-orange accent-orange focus:ring-2 focus:ring-orange/40"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* Locations */}
                  <div>
                    <label htmlFor="location_count" className={labelClasses}>
                      Number of clinic locations
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
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* EHR / practice system */}
                  <div>
                    <label htmlFor="primary_ehr" className={labelClasses}>
                      EHR or practice management system{' '}
                      <span className="text-teal-deep/75">(optional)</span>
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

                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="hero"
                      size="xl"
                      onClick={continueToMap}
                      className="group w-full md:w-auto"
                    >
                      Continue to the Map
                      <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                  </div>

                  {/* Step 2: Map your patient journey. */}
                  <div ref={step2Ref} hidden={step !== 2} className="space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p
                      ref={step2HeadingRef}
                      tabIndex={-1}
                      className="font-ui text-sm font-semibold text-teal-deep/80 focus:outline-none"
                    >
                      Step 2 of 2 · about 60 seconds
                    </p>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="min-h-[44px] font-ui text-sm font-semibold text-teal underline underline-offset-2"
                    >
                      Back
                    </button>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-teal-deep">Map your patient journey</h3>

                  {mapQuestions
                    .filter((q) => !q.fertilityOnly || isFertility)
                    .map((q) => (
                      <MapQuestionField key={q.name} q={q} disabled={isSubmitting} />
                    ))}

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
                    <p className="mt-4 font-body text-sm text-teal-deep/75">
                      Your report arrives in your inbox in a few minutes. No spam. No obligation.
                    </p>
                  </div>
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
