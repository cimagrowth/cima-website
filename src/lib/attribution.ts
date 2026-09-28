// Records how a visitor arrived so every GrowthOS-bound form can send it.
//
// Session touch (sessionStorage, cima_attr_session): written on the first page
// of a session, then replaced only when a later page arrives with a new UTM or
// click ID (a second ad click in the same session).
//
// First touch (localStorage, cima_attr_first): written once and kept 90 days,
// only while the consent banner reports analytics consent. Removed if analytics
// consent is later withdrawn.
//
// Every storage call is wrapped: private mode or blocked storage must never
// break the page or a form submission. If storage is unavailable, the current
// page's values are kept in memory for this page view.

import {
  COOKIE_CONSENT_EVENT,
  hasAnalyticsConsent,
} from '@/components/CookieConsent';

const SESSION_KEY = 'cima_attr_session';
const FIRST_KEY = 'cima_attr_first';
const FIRST_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 2000;

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'] as const;
const QUERY_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS];

// Query parameters that may carry personal data (for example our own
// /demo/scheduled?email=...). They are stripped from any URL we store or send.
const PERSONAL_PARAM = /(e-?mail|phone|name|company|address|token)/i;

export type Attribution = Partial<
  Record<
    | (typeof QUERY_KEYS)[number]
    | 'referrer'
    | 'landing_url'
    | 'first_seen_at',
    string
  >
>;

type StoredFirstTouch = { stored_at: number; touch: Attribution };

let memorySession: Attribution | null = null;
let consentListenerAttached = false;

function clean(value: string | null | undefined): string | undefined {
  const v = (value || '').trim();
  if (!v) return undefined;
  return v.slice(0, MAX_VALUE_LENGTH);
}

function compact(obj: Record<string, string | undefined>): Attribution {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v) out[k] = v;
  }
  return out as Attribution;
}

function stripPersonalParams(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    for (const key of Array.from(url.searchParams.keys())) {
      if (PERSONAL_PARAM.test(key)) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return '';
  }
}

function isInternalHost(host: string): boolean {
  const h = host.toLowerCase();
  return (
    h === window.location.hostname.toLowerCase() ||
    h === 'cimagrowth.com' ||
    h.endsWith('.cimagrowth.com')
  );
}

function externalReferrer(): string | undefined {
  const ref = document.referrer;
  if (!ref) return undefined;
  try {
    if (isInternalHost(new URL(ref).hostname)) return undefined;
  } catch {
    return undefined;
  }
  return clean(stripPersonalParams(ref));
}

/** The attribution this page view would record as a new touch. */
function currentTouch(): { touch: Attribution; hasCampaignParams: boolean } {
  const params = new URLSearchParams(window.location.search);
  const fromQuery: Record<string, string | undefined> = {};
  for (const key of QUERY_KEYS) fromQuery[key] = clean(params.get(key));
  const hasCampaignParams = QUERY_KEYS.some((k) => fromQuery[k]);

  const touch = compact({
    ...fromQuery,
    referrer: externalReferrer(),
    landing_url: clean(stripPersonalParams(window.location.href)),
    first_seen_at: new Date().toISOString(),
  });
  return { touch, hasCampaignParams };
}

function readJson<T>(storage: 'local' | 'session', key: string): T | null {
  try {
    const store = storage === 'local' ? window.localStorage : window.sessionStorage;
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: 'local' | 'session', key: string, value: unknown) {
  try {
    const store = storage === 'local' ? window.localStorage : window.sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked or full. The in-memory copy still serves this page.
  }
}

function removeFirstTouch() {
  try {
    window.localStorage.removeItem(FIRST_KEY);
  } catch {
    // Nothing to do.
  }
}

function readFirstTouch(): Attribution | null {
  const stored = readJson<StoredFirstTouch>('local', FIRST_KEY);
  if (!stored || typeof stored.stored_at !== 'number' || !stored.touch) return null;
  if (Date.now() - stored.stored_at > FIRST_MAX_AGE_MS) return null;
  return stored.touch;
}

/** Writes the first touch once, and only with analytics consent. */
function maybeWriteFirstTouch(touch: Attribution | null) {
  if (!touch || !hasAnalyticsConsent()) return;
  if (readFirstTouch()) return;
  const value: StoredFirstTouch = { stored_at: Date.now(), touch };
  writeJson('local', FIRST_KEY, value);
}

function readSessionTouch(): Attribution | null {
  return readJson<Attribution>('session', SESSION_KEY) ?? memorySession;
}

function attachConsentListener() {
  if (consentListenerAttached) return;
  consentListenerAttached = true;
  window.addEventListener(COOKIE_CONSENT_EVENT, (e: Event) => {
    try {
      const detail = (e as CustomEvent<{ analytics?: boolean }>).detail;
      if (detail?.analytics) {
        // Consent granted after landing: the session touch is the first touch.
        maybeWriteFirstTouch(readSessionTouch());
      } else {
        removeFirstTouch();
      }
    } catch {
      // Never let attribution break the consent flow.
    }
  });
}

/** Call on every page view. Safe to call repeatedly. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    attachConsentListener();

    const { touch, hasCampaignParams } = currentTouch();
    const existing = readSessionTouch();

    let session = existing;
    if (!existing || hasCampaignParams) {
      session = touch;
      memorySession = touch;
      writeJson('session', SESSION_KEY, touch);
    }

    maybeWriteFirstTouch(session);
  } catch {
    // Attribution is best effort.
  }
}

/**
 * Flat attribution for a form payload. Session-touch values under their own
 * names; first-touch values under a first_ prefix when they exist and differ.
 * The first touch's timestamp is sent as first_touch_at. Empty values are
 * omitted. Never throws.
 */
export function getAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    let session = readSessionTouch();
    if (!session) {
      captureAttribution();
      session = readSessionTouch();
    }
    const out: Record<string, string> = { ...(session || {}) } as Record<string, string>;

    const first = hasAnalyticsConsent() ? readFirstTouch() : null;
    if (first) {
      for (const [key, value] of Object.entries(first)) {
        if (!value) continue;
        if (key === 'first_seen_at') {
          if (value !== out.first_seen_at) out.first_touch_at = value;
          continue;
        }
        if (value !== out[key]) out[`first_${key}`] = value;
      }
    }
    return out;
  } catch {
    return {};
  }
}

/** Current page URL with any personal query parameters removed. */
export function currentPageUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    return stripPersonalParams(window.location.href);
  } catch {
    return '';
  }
}

/**
 * GTM conversion event, pushed only after a successful submission. Carries no
 * personal data: the form name and the session's utm_source only.
 */
export function pushLeadEvent(formName: string, attribution?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  try {
    const attr = attribution ?? getAttribution();
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'generate_lead',
      form_name: formName,
      lead_source: attr.utm_source || '(none)',
    });
  } catch {
    // Analytics must never affect the form.
  }
}
