'use client';

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const FORM_ID = '09a31a52-8149-479b-9c01-8df68c9c7527';
const ENDPOINT = 'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/form-submit';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

const inputClasses =
  'h-12 rounded-lg border border-[#E3E7ED] bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0';

const labelClasses = 'mb-2 block text-sm font-medium text-[#5a6b7e]';

function RequiredMark() {
  return <span className="ml-0.5 text-accent-orange">*</span>;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const isSubmitting = status === 'submitting';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);

    if (formData.get('website')) {
      setStatus('success');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const payload = {
      form_id: FORM_ID,
      data: {
        first_name: String(formData.get('first_name') || '').trim(),
        last_name: String(formData.get('last_name') || '').trim(),
        email: String(formData.get('email') || '').trim().toLowerCase(),
        phone: String(formData.get('phone') || '').trim(),
        question: String(formData.get('question') || '').trim(),
      },
      source_url: typeof window !== 'undefined' ? window.location.href : '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
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
        console.error('Contact form error:', res.status, j);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (err) {
      console.error('Contact form network error:', err);
      setStatus('error');
    }
  }

  return (
    <div className="bg-background">
      <div className="container-wide mx-auto max-w-[640px] px-4 py-16 md:px-6 md:py-24">
        <header className="mb-10 md:mb-12">
          <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
            Get in touch.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell us what you're working on. Brandon usually replies within one business day.
            For anything time-sensitive, you can also reach Brandon directly at{' '}
            <a
              href="mailto:brandon@cimagrowth.com"
              className="text-accent-orange underline underline-offset-4 hover:brightness-110"
            >
              brandon@cimagrowth.com
            </a>
            .
          </p>
        </header>

        {status === 'success' ? (
          <div className="rounded-xl border border-[#E3E7ED] bg-white p-8 shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-primary">
              Message sent.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Thanks for reaching out. Brandon usually replies within one business day.
              For anything time-sensitive, you can also email{' '}
              <a
                href="mailto:brandon@cimagrowth.com"
                className="text-accent-orange underline underline-offset-4 hover:brightness-110"
              >
                brandon@cimagrowth.com
              </a>{' '}
              directly.
            </p>
          </div>
        ) : (
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
                Phone <span className="text-muted-foreground/70">(optional)</span>
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

            <div>
              <Label htmlFor="question" className={labelClasses}>
                What is your question?
                <RequiredMark />
              </Label>
              <Textarea
                id="question"
                name="question"
                required
                rows={5}
                maxLength={4000}
                placeholder="Tell us what you're looking for. The more context the better."
                disabled={isSubmitting}
                className={cn(
                  'min-h-[140px] rounded-lg border border-[#E3E7ED] bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
            </div>

            {status === 'error' && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                Something went wrong sending your message. Please try again or email{' '}
                <a
                  href="mailto:brandon@cimagrowth.com"
                  className="font-medium underline underline-offset-2"
                >
                  brandon@cimagrowth.com
                </a>{' '}
                directly.
              </div>
            )}

            {status === 'rate_limited' && (
              <div
                role="alert"
                className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
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
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
