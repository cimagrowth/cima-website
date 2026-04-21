// components/CookieConsent.tsx
//
// Cookie consent banner for cimagrowth.com.
//
// Where this goes:
//   components/CookieConsent.tsx  (or wherever your shared components live)
//
// How to wire it up:
//   1. Render <CookieConsent /> once in your root layout, outside any
//      route-specific wrappers, so it shows on every page:
//
//        // app/layout.tsx
//        import { CookieConsent } from '@/components/CookieConsent';
//        ...
//        <body>
//          {children}
//          <CookieConsent />
//        </body>
//
//   2. Add a "Cookie Preferences" link in your footer that calls the
//      exposed window function to reopen the settings panel:
//
//        <button onClick={() => window.reopenCookieConsent?.()}>
//          Cookie Preferences
//        </button>
//
//   3. Gate non-essential scripts (Google Analytics, Meta Pixel, etc.) on
//      consent. Listen for the 'cima:cookie-consent' CustomEvent and check
//      the stored value on page load:
//
//        // Example GA4 setup
//        window.addEventListener('cima:cookie-consent', (e) => {
//          const { analytics, marketing } = (e as CustomEvent).detail;
//          if (analytics) gtag('consent', 'update', { analytics_storage: 'granted' });
//          if (marketing) gtag('consent', 'update', { ad_storage: 'granted' });
//        });
//
//   4. Until a user interacts with the banner, only strictly necessary
//      cookies may be set. Do not load analytics or marketing scripts
//      before you see an event with that category set to true.
//
// Behaviour:
//   - Honors the browser Global Privacy Control signal (navigator.globalPrivacyControl):
//     if GPC is on we record a reject-all consent silently without showing the banner.
//   - Stores consent in localStorage with a 13-month TTL (CNIL guidance); after
//     that we re-prompt.
//   - Versioned storage key so you can invalidate stored consent by bumping
//     CONSENT_VERSION when categories change.
//   - Dispatches a 'cima:cookie-consent' CustomEvent with the choice whenever
//     consent is saved, so downstream scripts can react.
//   - Always treats "necessary" cookies as granted; they cannot be disabled
//     because the site will not function without them (session, CSRF).

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  version: number;
  categories: ConsentCategories;
  timestamp: number;
};

const STORAGE_KEY = 'cima_cookie_consent';
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 months
const EVENT_NAME = 'cima:cookie-consent';

const NECESSARY_ONLY: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ACCEPT_ALL: ConsentCategories = {
  necessary: true,
  analytics: true,
  marketing: true,
};

// ---------- Storage helpers ----------

function readStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (Date.now() - parsed.timestamp > CONSENT_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredConsent(categories: ConsentCategories) {
  if (typeof window === 'undefined') return;
  const value: StoredConsent = {
    version: CONSENT_VERSION,
    categories,
    timestamp: Date.now(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage disabled or quota exceeded; fail silently so the banner
    // keeps appearing rather than silently broken.
  }
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: categories }),
  );
}

function isGpcOn(): boolean {
  if (typeof navigator === 'undefined') return false;
  // GPC lives on navigator as a non-standard property in browsers that support it.
  return (navigator as unknown as { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true;
}

// ---------- Public hook (optional) ----------

/**
 * Read the current consent state. Returns null until the user has made a
 * choice or a GPC-driven default has been written.
 */
export function useCookieConsent(): ConsentCategories | null {
  const [state, setState] = useState<ConsentCategories | null>(
    () => readStoredConsent()?.categories ?? null,
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentCategories>).detail;
      setState(detail);
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  return state;
}

// ---------- Main component ----------

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [choices, setChoices] = useState<ConsentCategories>(NECESSARY_ONLY);
  const panelRef = useRef<HTMLDivElement>(null);

  // Initial mount: decide whether to show the banner
  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setChoices(stored.categories);
      // Re-emit on each page load so scripts that boot late can hear it
      window.dispatchEvent(
        new CustomEvent(EVENT_NAME, { detail: stored.categories }),
      );
      return;
    }
    if (isGpcOn()) {
      // GPC = implicit reject of optional categories, no banner shown
      writeStoredConsent(NECESSARY_ONLY);
      setChoices(NECESSARY_ONLY);
      return;
    }
    setOpen(true);
  }, []);

  // Expose a global function so footer links can reopen settings
  useEffect(() => {
    (window as unknown as {
      reopenCookieConsent?: () => void;
    }).reopenCookieConsent = () => {
      setCustomizing(true);
      setOpen(true);
      setChoices(readStoredConsent()?.categories ?? NECESSARY_ONLY);
    };
    return () => {
      delete (window as unknown as { reopenCookieConsent?: () => void })
        .reopenCookieConsent;
    };
  }, []);

  // ESC closes the customize dialog (returns user to banner) or dismisses banner
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (customizing) setCustomizing(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, customizing]);

  const handleAcceptAll = useCallback(() => {
    writeStoredConsent(ACCEPT_ALL);
    setChoices(ACCEPT_ALL);
    setOpen(false);
    setCustomizing(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    writeStoredConsent(NECESSARY_ONLY);
    setChoices(NECESSARY_ONLY);
    setOpen(false);
    setCustomizing(false);
  }, []);

  const handleSaveCustom = useCallback(() => {
    const toSave: ConsentCategories = {
      necessary: true,
      analytics: choices.analytics,
      marketing: choices.marketing,
    };
    writeStoredConsent(toSave);
    setOpen(false);
    setCustomizing(false);
  }, [choices]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4 sm:pb-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div
        ref={panelRef}
        className="w-full max-w-3xl rounded-2xl border border-black/5 bg-white shadow-[0_8px_40px_rgba(27,77,92,0.18)]"
        style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}
      >
        {!customizing ? (
          <BannerView
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
            onCustomize={() => setCustomizing(true)}
          />
        ) : (
          <CustomizeView
            choices={choices}
            setChoices={setChoices}
            onBack={() => setCustomizing(false)}
            onSave={handleSaveCustom}
            onRejectAll={handleRejectAll}
            onAcceptAll={handleAcceptAll}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Banner view ----------

function BannerView({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <h2
            id="cookie-consent-title"
            className="text-base font-semibold text-[#1B4D5C]"
            style={{
              fontFamily:
                "'Plus Jakarta Sans', 'DM Sans', sans-serif",
            }}
          >
            We use cookies
          </h2>
          <p
            id="cookie-consent-description"
            className="mt-1 text-sm leading-relaxed text-gray-700"
          >
            We use strictly necessary cookies to run this site, and optional
            cookies to measure how it performs and to support our marketing.
            You can accept all, reject all non-essential, or choose which
            categories to allow. See our{' '}
            <a
              href="/privacy"
              className="font-medium text-[#1B4D5C] underline underline-offset-2"
            >
              Privacy Policy
            </a>
            {' '}for details.
          </p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-3 sm:flex-shrink-0">
          <button
            type="button"
            onClick={onCustomize}
            className="inline-flex items-center justify-center rounded-lg border border-[#1B4D5C]/20 bg-white px-4 py-2 text-sm font-medium text-[#1B4D5C] transition hover:bg-[#1B4D5C]/5 focus:outline-none focus:ring-2 focus:ring-[#1B4D5C]/40"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex items-center justify-center rounded-lg bg-[#1B4D5C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#163d4a] focus:outline-none focus:ring-2 focus:ring-[#1B4D5C]/60"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Customize view ----------

function CustomizeView({
  choices,
  setChoices,
  onBack,
  onSave,
  onRejectAll,
  onAcceptAll,
}: {
  choices: ConsentCategories;
  setChoices: (c: ConsentCategories) => void;
  onBack: () => void;
  onSave: () => void;
  onRejectAll: () => void;
  onAcceptAll: () => void;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-base font-semibold text-[#1B4D5C]"
            style={{
              fontFamily:
                "'Plus Jakarta Sans', 'DM Sans', sans-serif",
            }}
          >
            Cookie preferences
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Choose which categories of cookies we may set on this device.
            Strictly necessary cookies are always on.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to summary"
          className="rounded-md p-1 text-gray-400 transition hover:text-[#1B4D5C] focus:outline-none focus:ring-2 focus:ring-[#1B4D5C]/40"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6l8 8M14 6l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <CategoryRow
          title="Strictly necessary"
          description="Required for login sessions, CSRF protection, and basic site functionality. Always on."
          checked
          disabled
          onChange={() => {}}
        />
        <CategoryRow
          title="Analytics"
          description="Anonymous usage statistics that help us understand how the site performs and improve it."
          checked={choices.analytics}
          onChange={(v) => setChoices({ ...choices, analytics: v })}
        />
        <CategoryRow
          title="Marketing"
          description="Cookies used to measure the effectiveness of our marketing and — if you connect — to deliver more relevant ads on Meta and Google."
          checked={choices.marketing}
          onChange={(v) => setChoices({ ...choices, marketing: v })}
        />
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={onRejectAll}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex items-center justify-center rounded-lg border border-[#1B4D5C]/20 bg-white px-4 py-2 text-sm font-medium text-[#1B4D5C] transition hover:bg-[#1B4D5C]/5 focus:outline-none focus:ring-2 focus:ring-[#1B4D5C]/40"
          >
            Accept all
          </button>
        </div>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center rounded-lg bg-[#1B4D5C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#163d4a] focus:outline-none focus:ring-2 focus:ring-[#1B4D5C]/60"
        >
          Save preferences
        </button>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 bg-[#FDFBF7] p-4">
      <div>
        <p className="text-sm font-semibold text-[#1B4D5C]">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
      <label
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition ${
          checked ? 'bg-[#1B4D5C]' : 'bg-gray-300'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={`${title} cookies`}
        />
        <span
          className={`absolute left-0.5 h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </label>
    </div>
  );
}

// Type augmentation so TypeScript knows about window.reopenCookieConsent
declare global {
  interface Window {
    reopenCookieConsent?: () => void;
  }
}
