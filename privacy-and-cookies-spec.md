# Privacy Page — Additive Updates + Cookie Banner Integration

## ⚠️ Critical rule — read before anything else

The existing `/privacy` page on cimagrowth.com contains required language for GrowthOS (including HIPAA/BAA disclosures and other carefully reviewed content). That content **must be preserved verbatim**. This spec only ADDS missing sections required for Meta App Review compliance and optional sections for completeness. It never rewrites, reorders, consolidates, or deletes existing content. If unsure whether a change counts as additive or destructive, choose additive.

This spec supersedes any previous instructions about the privacy page. Do not copy any earlier draft file over the existing page. Use only the named content blocks below, and only when they are missing from the existing page.

Two deliverables in this spec:
1. **Phase A** — add only the missing Meta-required sections to the existing privacy page.
2. **Phase B** — add the new cookie consent banner component site-wide.

Source file for Phase B lives alongside this spec in the same directory:
- `CookieConsent.tsx` — drop-in component, do not modify

---

## Step 1 — Locate and fully read the existing page

```bash
# Find the existing privacy page
find app/privacy src/app/privacy -name "page.tsx" -o -name "page.mdx" -o -name "page.md" 2>/dev/null
grep -rln "Privacy Policy\|Effective" app/privacy src/app/privacy 2>/dev/null

# Find the root layout (for the cookie banner render)
find app src/app -maxdepth 2 -name "layout.tsx" 2>/dev/null

# Find the footer (for the Cookie Preferences link)
grep -rln "<footer\|className=\"footer\|Footer(" --include="*.tsx" components src/components app src/app 2>/dev/null | head -10

# Find the components directory (for CookieConsent.tsx placement)
find . -maxdepth 3 -type d -name "components" 2>/dev/null | grep -v node_modules

# Audit: existing analytics scripts that may need to move behind consent
grep -rn "gtag\|google-analytics\|googletagmanager\|GA_MEASUREMENT_ID\|fbq\|_fbq\|hotjar\|mixpanel\|posthog\|segment" --include="*.tsx" --include="*.ts" --include="*.html" app src/app components src/components public 2>/dev/null
```

**Before any edits, read the existing privacy page file end to end.** Then report back:

1. Path to the privacy page file.
2. The heading structure as a flat list — every `<h1>`, `<h2>`, `<h3>` text verbatim, in order.
3. Whether the page is `.tsx`, `.mdx`, or `.md`, and how it composes its content (inline JSX, MDX, imported data array, etc.).
4. The gap audit below — answer each row with yes/no and a one-line justification.

**Do not edit anything until you have reported back and the user has confirmed.**

---

## Step 2 — Gap audit

For each row below, determine whether the existing page already covers the topic. A "yes" means the topic is addressed in any form, even differently from the content blocks provided here. When in doubt, mark it "no" and propose the insertion for the user to confirm.

| # | Required for | Topic | How to check | If missing |
|---|---|---|---|---|
| 1 | Meta App Review (hard requirement) | Per-permission disclosure for Meta scopes | grep the page for `ads_management`, `pages_show_list`, `Facebook Login`, `Meta Platform`. Look for a section listing each scope and what we do with it. | Insert **Block A** |
| 2 | Google API compliance (if Google Ads is in use) | Google API Services User Data Policy / Limited Use acknowledgment | grep for `Google API Services User Data Policy` or `Limited Use` | Insert **Block B** |
| 3 | Meta + general completeness | Subprocessor list | grep for `subprocessor`, `service providers`, `sub-processor`, or a section listing third-party vendors | If a list exists but Meta is not on it: append Meta to the existing list using the exact formatting of the existing entries. If no list exists: insert **Block C**. |
| 4 | Meta App Review (hard requirement) | Data deletion with Meta-specific instructions | grep for `Facebook Business Integrations`, `deauthorize`, or any section telling users how to remove Meta access | Insert **Block D** |
| 5 | Cookie banner consistency | Cookies section referencing a consent mechanism | grep for `cookie`, `consent`, `tracking technologies` | If missing AND Phase B will be added: insert **Block E**. If a cookies section already exists: do NOT insert Block E; instead, leave it alone — the new banner works regardless of what the cookies section says. |
| 6 | All compliance | Effective date is current | Find the effective date line | Update in place to today's date |

Rows 1 and 4 are non-negotiable — without them Meta App Review fails. Rows 2, 3, and 5 are strongly recommended. Row 6 is trivial.

---

## Step 3 — Insertion rules

1. **Never modify existing text.** Treat the existing file as read-only paragraphs with seams between them where new sections may be inserted.
2. **Insert at logical seams.** If the page has numbered sections, insert new sections at the end of the body — before any Contact or Changes section if those exist — not in the middle, to avoid re-numbering.
3. **If the existing numbering accommodates a letter suffix** (e.g., Section 5 is about third-party services), it is acceptable to insert `5A`, `5B` to keep the logical grouping. This is a judgment call — default to end-of-document insertion if there's any risk of touching adjacent content.
4. **Match the existing file's syntax** — if the file is MDX or uses a data array, write insertions in that format. If it's a plain `.tsx` with JSX paragraphs, write JSX paragraphs. Do not introduce a new content format.
5. **Match existing typography** — if existing section headings use a specific component (`<H2>`, `<SectionHeading>`, etc.), use the same. If they use raw HTML tags, use raw HTML tags. Do not introduce inline `style={{ fontFamily }}` overrides or other one-off styling unless the existing page already uses that exact pattern.
6. **Match existing link styling** — if links use a shared `<Link>` component or a specific className, use it. Do not hard-code new classes.
7. **Update the effective date line in place.** That is the only edit to pre-existing text that is permitted.

---

## Content blocks

Insert only the blocks identified as missing in Step 2. Adapt section numbering and styling to fit the existing page. The prose below is the content to insert — styling and component choices should mirror whatever the existing page uses.

### Block A — Meta Platform data (scope-by-scope disclosure)

Heading: **Meta Platform (Facebook, Instagram, WhatsApp)**

When a clinic connects their Meta account to our Services for advertising purposes, we use Meta's Facebook Login for Business flow and request the following permissions. For each permission we describe what we access, why, and how long we retain it.

- **ads_management, ads_read** — we create, manage, and read ad campaigns, ad sets, creatives, and performance insights for the ad account you select, so our platform can publish campaigns on your behalf and show you analytics. Retained while your connection is active.
- **business_management** — we identify the Meta Business Manager assets you have access to so you can select the correct ad account and Facebook Page.
- **pages_show_list** — we list the Facebook Pages you manage so you can choose which Page your ads will run from. Every Meta ad must reference a Page.
- **pages_read_engagement** — we read Page engagement metrics to inform ad targeting and reporting.
- **instagram_basic** — we identify the Instagram Business account, if any, linked to your Page so we can serve ads to Instagram placements.
- **whatsapp_business_management, whatsapp_business_messaging** — used only for Click-to-WhatsApp advertising features when you explicitly enable them; we read WhatsApp Business Account metadata and phone number status to enable this ad format.

We store the Facebook user ID of the person who authorized the connection, long-lived access tokens (encrypted at rest), the selected ad account ID, Facebook Page ID, and Instagram Business account ID (if applicable). We do not access, store, or process any Meta user's personal content (messages, posts, photos) beyond what is strictly necessary to operate the ad features you enable.

### Block B — Google API Limited Use acknowledgment

Heading: **Google Services**

When a customer connects Google Ads, Gmail, Google Calendar, or Google Business Profile, we request only the OAuth scopes necessary for the feature being used. Our use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

### Block C — Subprocessor list (insert only if no list exists)

Heading: **Third-Party Service Providers**

We use the following third-party service providers (subprocessors) to operate the Services. A current list is available on request to privacy@cimagrowth.com and includes, at the time this Policy was last updated:

- **Supabase** — database, authentication, storage, and serverless function hosting
- **Anthropic** — Claude large-language-model API for AI features; inputs are not used to train Anthropic's models under our API terms
- **Google (Google Cloud, Vertex AI)** — Gemini API for specific text-generation tasks
- **SendGrid** — transactional and marketing email delivery
- **Twilio** — SMS and voice messaging infrastructure
- **Whop, GoHighLevel, Stripe** — billing and subscription management
- **Meta Platforms, Google** — advertising delivery and measurement, when a customer connects those platforms

We require each subprocessor to provide appropriate contractual protections and technical safeguards, including Business Associate Agreements where the subprocessor will handle protected health information.

**If a subprocessor list already exists but Meta is absent**, do not insert Block C. Instead, append a single line matching the existing format, example:
- **Meta Platforms** — advertising delivery and measurement when a customer connects their Facebook or Instagram ad account

### Block D — Data deletion quick reference

Heading: **Data Deletion**

You can request deletion of your information at any time:

1. **For your Cima Growth Solutions account**, email privacy@cimagrowth.com from the address on file. We will verify your identity and complete the deletion within 30 days.

2. **For Meta Platform data specifically**, remove our application from [Facebook Business Integrations](https://www.facebook.com/settings?tab=business_tools), or use Facebook's data deletion option in your account settings. When you do, our systems will automatically receive a signed request from Meta, delete your Facebook user ID, access tokens, and selected account information, and return a confirmation code you can use to verify the status of your deletion.

3. **For information held by a clinic customer about you as a patient**, contact the clinic directly. The clinic is the data controller of that information under HIPAA and applicable state laws.

### Block E — Cookies and tracking (only if banner is being added AND no cookies section exists)

Heading: **Cookies and Tracking Technologies**

We use strictly necessary cookies for login sessions and security; these cannot be disabled without breaking core functionality. We use analytics and marketing cookies only with your consent. On your first visit you will be asked to accept all, reject all, or customize your choices; you can change those preferences at any time by clicking **Cookie Preferences** in the site footer. We honor the Global Privacy Control (GPC) signal where legally required — when your browser sends GPC we automatically reject non-essential cookies without prompting.

---

## Phase B — Add the cookie consent component

Source file is `CookieConsent.tsx` in this directory. Do not modify it.

1. Copy `CookieConsent.tsx` into the components directory identified in Step 1 (likely `components/` or `src/components/`). Keep the filename and casing exact.

2. Open the root layout file and add the import + render, placed after `{children}` and before `</body>`:
   ```tsx
   import { CookieConsent } from '@/components/CookieConsent'; // adjust path to your alias
   // ...
   <body>
     {children}
     <CookieConsent />
   </body>
   ```
   If the project does not use the `@/` alias, use a relative path that resolves correctly. Do not invent a new alias.

3. Open the footer component. Add a "Cookie Preferences" button matching the existing footer link styling exactly — do not introduce new typography, color, or spacing. Use a `<button>` element because it triggers a runtime function:
   ```tsx
   <button
     type="button"
     onClick={() => window.reopenCookieConsent?.()}
     className="{copy the exact className from a neighboring footer link}"
   >
     Cookie Preferences
   </button>
   ```

---

## Phase C — Gate existing analytics behind the consent event

Only applies if the Step 1 audit returned analytics or tracking scripts. If it returned nothing, skip this phase.

The banner dispatches a `cima:cookie-consent` CustomEvent on every save and re-emits it on every page load. The event detail has shape:
```ts
{ necessary: true, analytics: boolean, marketing: boolean }
```

For each tracker currently loading:
1. Remove the unconditional script or loader.
2. Replace with a listener that loads it only when the relevant category is true. Also check `localStorage['cima_cookie_consent']` on mount in case the listener misses the initial dispatch.

Example pattern for GA4 with Consent Mode v2 (place in a dedicated `<AnalyticsLoader />` client component, imported once from the root layout):

```tsx
'use client';
import { useEffect } from 'react';

export function AnalyticsLoader() {
  useEffect(() => {
    const apply = (cat: { analytics: boolean; marketing: boolean }) => {
      if (cat.analytics && !(window as any).__gaLoaded) {
        (window as any).__gaLoaded = true;
        const s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
        s.async = true;
        document.head.appendChild(s);
        // gtag init here
      }
      if (cat.analytics) (window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' });
      if (cat.marketing) (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'
      });
    };
    const onEvent = (e: Event) => apply((e as CustomEvent).detail);
    window.addEventListener('cima:cookie-consent', onEvent);
    try {
      const raw = localStorage.getItem('cima_cookie_consent');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.categories) apply(parsed.categories);
      }
    } catch {}
    return () => window.removeEventListener('cima:cookie-consent', onEvent);
  }, []);
  return null;
}
```

Apply the same shape to any Meta Pixel, Hotjar, PostHog, Mixpanel, or Segment currently loading. Preserve existing tracking IDs and init calls exactly — just move them inside the appropriate `if (category)` block.

---

## DO NOT

- **DO NOT delete, rewrite, reword, shorten, consolidate, or reorder any existing content on the privacy page.** Adding only. The existing content includes GrowthOS-required language that has been reviewed and must not be altered.
- **DO NOT copy any earlier `privacy-policy-page.tsx` or similar draft over the existing page.** No such replacement file is authoritative — only this spec's named content blocks are.
- **DO NOT change the URL of the privacy page.** Meta and Google App Review will reference `/privacy`; changing it requires resubmission.
- **DO NOT renumber or restructure existing sections to accommodate inserts.** If inserts don't fit cleanly mid-document, append them at the end (before any Contact section).
- **DO NOT introduce inline `style={{ fontFamily }}` overrides** or other one-off styling in the new blocks unless the existing page uses that exact pattern.
- **DO NOT install any cookie consent library.** Use `CookieConsent.tsx` as-is.
- **DO NOT pre-check analytics or marketing toggles.** GDPR requires explicit opt-in.
- **DO NOT load analytics scripts before the cookie event fires** or while only necessary consent is granted.
- **DO NOT change the `STORAGE_KEY`, `CONSENT_VERSION`, or `EVENT_NAME` constants** inside `CookieConsent.tsx`. External listeners depend on them.
- **DO NOT guess whether content exists.** If the gap audit in Step 2 is ambiguous for any row, ask before inserting.

---

## Acceptance criteria

1. The existing privacy page file has **every pre-existing paragraph and section intact**, byte-for-byte, except for the effective date line.
2. Any sections determined missing in the gap audit have been inserted verbatim from the content blocks, adapted to the file's existing syntax and styling conventions.
3. `/privacy` renders at `https://cimagrowth.com/privacy` without hydration warnings, broken layout, or missing components.
4. On a fresh incognito session the cookie banner appears at the bottom of every page.
5. Accept all / Reject all / Customize each persist to `localStorage` under key `cima_cookie_consent` and dismiss the banner. Reload does not show it again.
6. Footer "Cookie Preferences" reopens the banner in Customize mode with the current state pre-populated.
7. Browser GPC enabled + cleared storage: banner does NOT appear; storage is silently populated with `analytics: false, marketing: false`.
8. No analytics, marketing, or tracking script loads on first page view before a choice is made (verify in DevTools Network tab).
9. The diff of the privacy page shows ONLY added sections and the updated effective date line — no edits to existing paragraphs.

---

## If you hit a dead end

- **The existing page is in MDX with frontmatter** — add the new sections as MDX using the same heading syntax (`##`, `###`) the existing page uses. Keep any frontmatter untouched.
- **The existing page is a long data array (objects with `title` and `body` fields)** — append new objects to the array in the same shape.
- **The existing page already has a Meta section but it's vague or high-level** — do NOT rewrite it. Append Block A below the existing Meta section as a subsection titled "Permissions requested and purpose" or similar.
- **The existing page has a subprocessor list but the entries use a different format** — match that format when appending Meta. Do not switch the list to Block C's format.
- **The existing page lacks a Cookies section and Phase B is being added** — insert Block E. If a Cookies section already exists, leave it alone and don't insert Block E.
- **Tailwind arbitrary value classes (`bg-[#FDFBF7]`) in `CookieConsent.tsx` aren't being applied** — confirm the Tailwind config's `content` glob covers the components directory. If the project uses CSS Modules or styled-jsx instead of Tailwind, convert the classNames in `CookieConsent.tsx` to the project's styling system, preserving the exact color values and spacing.
