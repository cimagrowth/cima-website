'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getAttribution, pushLeadEvent } from '@/lib/attribution';
import { SPEAKING_FORMAT_OPTIONS, SPEAKING_TOPIC_OPTIONS, TOPIC_BY_TALK_ID } from '@/content/speaking';

// GrowthOS form "Cima Website Speaker Inquiry". Field keys and option strings
// are read by the contact record and the Executive Assistant agent.
const FORM_ID = '4ddcd28d-6ca7-434f-af7f-6fce03610bf2';
const ENDPOINT = 'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/form-submit';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const SMS_CONSENT_TEXT =
  'I agree to receive SMS messages from Cima Growth Solutions at the phone number provided regarding consultation scheduling, GrowthOS onboarding updates, and educational resources. Up to 4 msgs/month. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help. View our Privacy Policy.';

const inputClasses =
  'h-12 rounded-lg border border-[#E3E7ED] bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-accent-orange';

const selectClasses = cn(
  inputClasses,
  'flex w-full appearance-none pr-10 outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:[&>option]:bg-[#182028]',
);

const labelClasses = 'mb-2 block text-sm font-medium text-[#5a6b7e] dark:text-white/80';

function RequiredMark() {
  return <span className="ml-0.5 text-accent-orange">*</span>;
}

function Optional() {
  return <span className="text-muted-foreground/70"> (optional)</span>;
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) || '').trim();
}

function Select({
  id,
  options,
  value,
  onChange,
  disabled,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(selectClasses, !value && 'text-muted-foreground/70 dark:text-white/40')}
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-foreground">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a6b7e] dark:text-white/60"
      />
    </div>
  );
}

function InquiryForm({ topicParam }: { topicParam: string | null }) {
  const [status, setStatus] = useState<Status>('idle');
  const [smsConsent, setSmsConsent] = useState(false);
  const [format, setFormat] = useState('');
  const [topic, setTopic] = useState(() => (topicParam && TOPIC_BY_TALK_ID[topicParam]) || '');
  const isSubmitting = status === 'submitting';

  // "Ask for this talk" links set ?topic=<talk id> on the same page.
  useEffect(() => {
    const preset = topicParam ? TOPIC_BY_TALK_ID[topicParam] : undefined;
    if (preset) setTopic(preset);
  }, [topicParam]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus('submitting');

    const formData = new FormData(e.currentTarget);

    if (formData.get('website')) {
      setStatus('success');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const attribution = getAttribution();
    // Same shape as the Contact form: attribution first so answers win.
    const payload = {
      form_id: FORM_ID,
      data: {
        ...attribution,
        first_name: text(formData, 'first_name'),
        last_name: text(formData, 'last_name'),
        email: text(formData, 'email').toLowerCase(),
        phone: text(formData, 'phone'),
        company_name: text(formData, 'company_name'),
        speaking_event_name: text(formData, 'speaking_event_name'),
        speaking_format: format,
        speaking_topic: topic,
        speaking_event_dates: text(formData, 'speaking_event_dates'),
        speaking_event_location: text(formData, 'speaking_event_location'),
        speaking_audience: text(formData, 'speaking_audience'),
        speaking_details: text(formData, 'speaking_details'),
        sms_consent_given: smsConsent,
        sms_consent_timestamp: new Date().toISOString(),
        sms_consent_text: SMS_CONSENT_TEXT,
      },
      source_url: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: params.get('utm_source') || attribution.utm_source || '',
      utm_medium: params.get('utm_medium') || attribution.utm_medium || '',
      utm_campaign: params.get('utm_campaign') || attribution.utm_campaign || '',
      utm_content: params.get('utm_content') || attribution.utm_content || '',
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        console.error('Speaker inquiry error:', res.status, j);
        setStatus('error');
        return;
      }

      pushLeadEvent('speaking', attribution);
      setStatus('success');
    } catch (err) {
      console.error('Speaker inquiry network error:', err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-[#E3E7ED] bg-white p-8 shadow-soft dark:border-white/10 dark:bg-white/5"
      >
        <h3 className="font-ui text-2xl font-semibold text-primary dark:text-white">Inquiry sent.</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground dark:text-white/80">
          Thank you. Brandon reviews every speaking inquiry and replies within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="first_name" className={labelClasses}>
            First name
            <RequiredMark />
          </Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            required
            maxLength={100}
            autoComplete="given-name"
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>
        <div>
          <Label htmlFor="last_name" className={labelClasses}>
            Last name
            <RequiredMark />
          </Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            required
            maxLength={100}
            autoComplete="family-name"
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className={labelClasses}>
          Email
          <RequiredMark />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          maxLength={320}
          autoComplete="email"
          disabled={isSubmitting}
          className={inputClasses}
        />
      </div>

      <div>
        <Label htmlFor="phone" className={labelClasses}>
          Phone
          <Optional />
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          autoComplete="tel"
          disabled={isSubmitting}
          className={inputClasses}
        />
      </div>

      {/* SMS Consent: TCR / A2P 10DLC compliance. DO NOT REMOVE */}
      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          id="sms_consent"
          name="sms_consent"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          disabled={isSubmitting}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-[#173B4F]/30 text-accent-orange accent-accent-orange focus:ring-2 focus:ring-accent-orange/40 dark:border-white/20"
        />
        <label
          htmlFor="sms_consent"
          className="cursor-pointer text-sm leading-relaxed text-[#173B4F]/80 dark:text-white/80"
        >
          I agree to receive SMS messages from Cima Growth Solutions at the phone number
          provided regarding consultation scheduling, GrowthOS onboarding updates, and
          educational resources. Up to 4 msgs/month. Consent is not a condition of purchase.
          Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. View our{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-accent-orange">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      <div>
        <Label htmlFor="company_name" className={labelClasses}>
          Organization
          <RequiredMark />
        </Label>
        <Input
          id="company_name"
          name="company_name"
          type="text"
          required
          maxLength={200}
          autoComplete="organization"
          disabled={isSubmitting}
          className={inputClasses}
        />
      </div>

      <div>
        <Label htmlFor="speaking_event_name" className={labelClasses}>
          Event or show name
          <RequiredMark />
        </Label>
        <Input
          id="speaking_event_name"
          name="speaking_event_name"
          type="text"
          required
          maxLength={200}
          disabled={isSubmitting}
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="speaking_format" className={labelClasses}>
            Speaking format
            <RequiredMark />
          </Label>
          <Select
            id="speaking_format"
            options={SPEAKING_FORMAT_OPTIONS}
            value={format}
            onChange={setFormat}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="speaking_topic" className={labelClasses}>
            Topic of interest
            <RequiredMark />
          </Label>
          <Select
            id="speaking_topic"
            options={SPEAKING_TOPIC_OPTIONS}
            value={topic}
            onChange={setTopic}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="speaking_event_dates" className={labelClasses}>
            Event dates
            <Optional />
          </Label>
          <Input
            id="speaking_event_dates"
            name="speaking_event_dates"
            type="text"
            maxLength={200}
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>
        <div>
          <Label htmlFor="speaking_event_location" className={labelClasses}>
            Event location (city, or virtual)
            <Optional />
          </Label>
          <Input
            id="speaking_event_location"
            name="speaking_event_location"
            type="text"
            maxLength={200}
            disabled={isSubmitting}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="speaking_audience" className={labelClasses}>
          Audience (who attends, roughly how many)
          <Optional />
        </Label>
        <Input
          id="speaking_audience"
          name="speaking_audience"
          type="text"
          maxLength={300}
          disabled={isSubmitting}
          className={inputClasses}
        />
      </div>

      <div>
        <Label htmlFor="speaking_details" className={labelClasses}>
          Anything else about the event or show
          <Optional />
        </Label>
        <Textarea
          id="speaking_details"
          name="speaking_details"
          rows={5}
          maxLength={4000}
          disabled={isSubmitting}
          className="min-h-[140px] rounded-lg border border-[#E3E7ED] bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-accent-orange"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
        >
          Something went wrong sending your inquiry. Please try again in a moment.
        </div>
      )}

      {status === 'rate_limited' && (
        <div
          role="alert"
          className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
        >
          Too many requests. Please wait a moment and try again.
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto md:px-10"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send inquiry'
          )}
        </Button>
      </div>

      <p className="pt-4 text-xs text-[#173B4F]/60 dark:text-white/60">
        By submitting this form you agree to our{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-accent-orange">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function InquiryFormWithQuery() {
  const searchParams = useSearchParams();
  return <InquiryForm topicParam={searchParams.get('topic')} />;
}

export default function SpeakerInquiryForm() {
  // The prerendered HTML carries the full form; the query-aware copy takes
  // over on the client so the page stays static.
  return (
    <Suspense fallback={<InquiryForm topicParam={null} />}>
      <InquiryFormWithQuery />
    </Suspense>
  );
}
