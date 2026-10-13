'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Optional step shown after the /growth audit is submitted. The backend holds
// the audit (revenue_step "offered") until this step posts or is skipped, and
// releases it on its own after 20 minutes. Nothing here may block the
// thank-you state: every outcome, including a failed request, calls onDone.
const INTAKE_URL =
  'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/audit-revenue-intake';
const POST_TIMEOUT_MS = 10000;
const MAX_CUSTOM_ROWS = 5;

type CatalogService = {
  key: string;
  label: string;
  unit?: string;
  has_benchmark?: boolean;
};

type RowValues = { revenue: string; share: string };
type CustomRow = RowValues & { id: number; label: string };

type CatalogState =
  | { status: 'loading' }
  | { status: 'ready'; services: CatalogService[]; conversionOptions: string[] }
  | { status: 'failed' };

const inputClasses =
  'h-11 min-h-[44px] w-full rounded-lg border border-sand bg-paper px-3 text-base text-foreground placeholder:text-teal-deep/60 focus:border-primary focus:outline-none focus:ring-0';
const smallLabelClasses = 'mb-1 block font-ui text-xs font-medium text-teal-deep/80';

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '').slice(0, 9);
}

function formatCurrency(digits: string): string {
  return digits ? Number(digits).toLocaleString('en-US') : '';
}

function clampPercent(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 3);
  if (!digits) return '';
  return String(Math.min(100, Number(digits)));
}

function toNumberOrNull(value: string): number | null {
  return value === '' ? null : Number(value);
}

function pushRevenueStepEvent(outcome: 'completed' | 'skipped') {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'audit_revenue_step', revenue_step: outcome });
  } catch {
    // Analytics must never affect the form.
  }
}

function ValueInputs({
  idPrefix,
  values,
  disabled,
  onChange,
}: {
  idPrefix: string;
  values: RowValues;
  disabled: boolean;
  onChange: (next: RowValues) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="flex flex-col justify-end">
        <label htmlFor={`${idPrefix}-revenue`} className={smallLabelClasses}>
          Average revenue per patient
        </label>
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-body text-base text-teal-deep/70"
          >
            $
          </span>
          <input
            id={`${idPrefix}-revenue`}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Not sure"
            value={formatCurrency(values.revenue)}
            onChange={(e) => onChange({ ...values, revenue: digitsOnly(e.target.value) })}
            disabled={disabled}
            className={`${inputClasses} pl-7`}
          />
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <label htmlFor={`${idPrefix}-share`} className={smallLabelClasses}>
          % of new patients
        </label>
        <input
          id={`${idPrefix}-share`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Optional"
          value={values.share}
          onChange={(e) => onChange({ ...values, share: clampPercent(e.target.value) })}
          disabled={disabled}
          className={inputClasses}
        />
      </div>
    </div>
  );
}

export default function RevenueStep({
  submissionKey,
  specialty,
  onDone,
}: {
  submissionKey: string;
  specialty: string;
  onDone: () => void;
}) {
  const [catalog, setCatalog] = useState<CatalogState>({ status: 'loading' });
  const [checked, setChecked] = useState<Record<string, RowValues>>({});
  const [customRows, setCustomRows] = useState<CustomRow[]>([]);
  const [conversion, setConversion] = useState('');
  const [inFlight, setInFlight] = useState(false);
  const nextCustomId = useRef(1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const url = `${INTAKE_URL}?specialty=${encodeURIComponent(specialty || 'general')}`;
    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (!data?.ok || !Array.isArray(data.services)) throw new Error('Bad catalog');
        setCatalog({
          status: 'ready',
          services: data.services.filter(
            (s: CatalogService) => s && typeof s.key === 'string' && typeof s.label === 'string',
          ),
          conversionOptions: Array.isArray(data.consult_to_treatment_options)
            ? data.consult_to_treatment_options.map(String)
            : [],
        });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setCatalog({ status: 'failed' });
        // Without the catalog the visitor can still name a service.
        setCustomRows((rows) =>
          rows.length ? rows : [{ id: nextCustomId.current++, label: '', revenue: '', share: '' }],
        );
      });
    return () => controller.abort();
  }, [specialty]);

  const services = catalog.status === 'ready' ? catalog.services : [];
  const conversionOptions = catalog.status === 'ready' ? catalog.conversionOptions : [];
  const namedCustomRows = customRows.filter((r) => r.label.trim());
  const hasSelection = Object.keys(checked).length > 0 || namedCustomRows.length > 0;

  function toggleService(key: string, on: boolean) {
    setChecked((prev) => {
      const next = { ...prev };
      if (on) next[key] = prev[key] ?? { revenue: '', share: '' };
      else delete next[key];
      return next;
    });
  }

  function addCustomRow() {
    setCustomRows((rows) =>
      rows.length >= MAX_CUSTOM_ROWS
        ? rows
        : [...rows, { id: nextCustomId.current++, label: '', revenue: '', share: '' }],
    );
  }

  function updateCustomRow(id: number, patch: Partial<CustomRow>) {
    setCustomRows((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function send(body: Record<string, unknown>, outcome: 'completed' | 'skipped') {
    if (inFlight) return;
    setInFlight(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), POST_TIMEOUT_MS);
    try {
      const res = await fetch(INTAKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!res.ok) console.warn('Audit revenue step was not saved:', res.status);
    } catch (err) {
      // The backend releases the audit on its own, so the visitor moves on.
      console.warn('Audit revenue step network error:', err);
    } finally {
      clearTimeout(timer);
    }
    pushRevenueStepEvent(outcome);
    onDone();
  }

  function submitServices() {
    if (!hasSelection) return;
    const selected = [
      ...services
        .filter((s) => checked[s.key])
        .map((s) => ({
          key: s.key,
          label: s.label,
          avg_revenue: toNumberOrNull(checked[s.key].revenue),
          share_pct: toNumberOrNull(checked[s.key].share),
        })),
      ...namedCustomRows.map((r) => ({
        key: 'custom',
        label: r.label.trim().slice(0, 100),
        avg_revenue: toNumberOrNull(r.revenue),
        share_pct: toNumberOrNull(r.share),
      })),
    ];
    send(
      {
        submission_key: submissionKey,
        skipped: false,
        services: selected,
        ...(conversion ? { consult_to_treatment: conversion } : {}),
      },
      'completed',
    );
  }

  function skip() {
    send({ submission_key: submissionKey, skipped: true }, 'skipped');
  }

  return (
    <div className="card-elevated p-6 md:p-10">
      <p className="mb-2 font-ui text-sm font-semibold text-teal">Your audit request is in.</p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-3 font-display text-3xl font-semibold tracking-tight text-teal-deep focus:outline-none"
      >
        Want your dollar number?
      </h2>
      <p className="mb-6 font-body text-base text-teal-deep/80 leading-relaxed">
        Tell us what you offer and roughly what each patient is worth. Your audit will show what the leak costs in revenue, not just consults. Takes about a minute, and you can skip it.
      </p>

      <fieldset className="space-y-3">
        <legend className="mb-3 font-ui text-base font-semibold text-teal-deep">
          Which services do you offer?
        </legend>

        {catalog.status === 'loading' && (
          <p className="flex items-center gap-2 font-body text-sm text-teal-deep/70" role="status">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Loading services...
          </p>
        )}

        {services.map((s) => {
          const values = checked[s.key];
          const inputId = `rev-${s.key}`;
          return (
            <div
              key={s.key}
              className={`rounded-lg border bg-paper px-4 py-3 ${values ? 'border-teal' : 'border-sand'}`}
            >
              <label
                htmlFor={inputId}
                className="flex min-h-[44px] cursor-pointer items-center gap-3 font-body text-[15px] text-teal-deep"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={Boolean(values)}
                  onChange={(e) => toggleService(s.key, e.target.checked)}
                  disabled={inFlight}
                  className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-teal/30 accent-orange"
                />
                {s.label}
              </label>
              {values && (
                <ValueInputs
                  idPrefix={inputId}
                  values={values}
                  disabled={inFlight}
                  onChange={(next) => setChecked((prev) => ({ ...prev, [s.key]: next }))}
                />
              )}
            </div>
          );
        })}

        {customRows.map((r, i) => {
          const idPrefix = `rev-custom-${r.id}`;
          return (
            <div key={r.id} className="rounded-lg border border-sand bg-paper px-4 py-3">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor={`${idPrefix}-name`} className={smallLabelClasses}>
                    Service name
                  </label>
                  <input
                    id={`${idPrefix}-name`}
                    type="text"
                    maxLength={100}
                    autoComplete="off"
                    placeholder={i === 0 && catalog.status === 'failed' ? 'e.g. your main treatment' : 'Service name'}
                    value={r.label}
                    onChange={(e) => updateCustomRow(r.id, { label: e.target.value })}
                    disabled={inFlight}
                    className={inputClasses}
                  />
                </div>
                {!(catalog.status === 'failed' && customRows.length === 1) && (
                  <button
                    type="button"
                    onClick={() => setCustomRows((rows) => rows.filter((x) => x.id !== r.id))}
                    disabled={inFlight}
                    className="min-h-[44px] px-1 font-ui text-sm font-semibold text-teal underline underline-offset-2"
                  >
                    Remove
                  </button>
                )}
              </div>
              <ValueInputs
                idPrefix={idPrefix}
                values={r}
                disabled={inFlight}
                onChange={(next) => updateCustomRow(r.id, next)}
              />
            </div>
          );
        })}

        {catalog.status !== 'loading' && customRows.length < MAX_CUSTOM_ROWS && (
          <button
            type="button"
            onClick={addCustomRow}
            disabled={inFlight}
            className="inline-flex min-h-[44px] items-center gap-1 font-ui text-sm font-semibold text-teal underline-offset-2 hover:underline"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add another service
          </button>
        )}

        <p className="font-body text-sm text-teal-deep/70">
          Not sure of a price? Leave it blank and we&apos;ll use the published average where one exists.
        </p>
      </fieldset>

      {conversionOptions.length > 0 && (
        <fieldset className="mt-8">
          <legend className="mb-3 font-ui text-base font-semibold text-teal-deep">
            Of the patients who have a consult, about how many start treatment?
          </legend>
          <div className="flex flex-wrap gap-2">
            {conversionOptions.map((opt) => (
              <label
                key={opt}
                className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-sand bg-cream px-4 py-2 font-body text-[15px] text-teal-deep transition-colors hover:border-teal/50 has-[:checked]:border-teal has-[:checked]:bg-mist has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal"
              >
                <input
                  type="radio"
                  name="consult_to_treatment"
                  value={opt}
                  checked={conversion === opt}
                  onChange={() => setConversion(opt)}
                  disabled={inFlight}
                  className="h-4 w-4 shrink-0 accent-teal"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
        <Button
          type="button"
          variant="hero"
          size="xl"
          onClick={submitServices}
          disabled={!hasSelection || inFlight}
          className="w-full sm:w-auto"
        >
          {inFlight ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Add this to my audit'
          )}
        </Button>
        <button
          type="button"
          onClick={skip}
          disabled={inFlight}
          className="min-h-[44px] font-ui text-sm font-semibold text-teal underline underline-offset-2 disabled:opacity-50"
        >
          Skip, send my audit
        </button>
      </div>
    </div>
  );
}
