# SPEC: Protect the Eva Chat Widget on cimagrowth.com

**Scope:** Any frontend work on the `cimagrowth.com` Next.js repo.
**Read this BEFORE touching `src/app/layout.tsx`, any root-level layout file, `<head>` configuration, or anything under `src/app/` that renders globally.**

---

## Context You Must Know

- cimagrowth.com embeds an AI chat widget ("Eva") that is the **#1 inbound lead capture mechanism** on the site.
- The widget is a **one-line `<Script>` tag** that loads a self-bootstrapping JS bundle from a Supabase edge function.
- All widget behavior (colors, greeting, lead capture, KB, contact/deal creation) lives in Supabase — **not** in this repo. The repo contains exactly one artifact: the `<Script>` tag.
- The widget has been **accidentally deleted before** during "cleanup" passes. This spec exists to prevent that.

---

## The Protected Code (Do Not Remove)

**File:** `src/app/layout.tsx`
**Location:** Inside `<body>`, as the last child, above `</body>`.

```tsx
import Script from 'next/script'

// ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* CIMA EVA CHAT WIDGET — DO NOT REMOVE. See SPEC-protect-eva-chat-widget.md */}
        <Script
          src="https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
```

The comment on the line above the `<Script>` tag is part of the contract. Keep it.

---

## Grep-First Discovery (run BEFORE any edits to layout/head)

```bash
# Confirm the widget is present
grep -rn "chat-widget" src/app/ --include="*.tsx" --include="*.ts"
grep -rn "momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget" src/app/

# Confirm the org ID is correct (must be Cima's agency org)
grep -rn "1372de10-066f-437e-941e-643deefebf2f" src/app/
```

If any of the above return **zero results**, the widget has already been deleted. **STOP and flag this to Brandon before proceeding with any other work.** Do not attempt to restore it silently — he needs to know it was missing.

---

## DO NOT

- **DO NOT** remove the `<Script>` tag, even if linting, prettier, or an "unused import" check flags `next/script` as unused.
- **DO NOT** change the `src` URL. Not the domain (`momssbzlofjodqodvvvk.supabase.co`), not the path (`/functions/v1/chat-widget`), not the query param name (`org`), not the org ID value (`1372de10-066f-437e-941e-643deefebf2f`).
- **DO NOT** change `strategy="lazyOnload"` to `afterInteractive`, `beforeInteractive`, `worker`, or anything else. Lazy load is intentional — it keeps the widget off the critical render path.
- **DO NOT** move the `<Script>` tag into a client component, a provider, a `<head>` tag, or any nested layout. It belongs in `src/app/layout.tsx` inside `<body>` as the last child.
- **DO NOT** wrap it in a conditional (`process.env.NODE_ENV === 'production'`, feature flag, A/B test, etc.) without explicit written approval from Brandon. The widget must run in production and in previews so we can verify it on every deploy.
- **DO NOT** "consolidate" it with other `<Script>` tags (analytics, GTM, etc.) into a component. It stays standalone with its sentinel comment.
- **DO NOT** delete the `{/* CIMA EVA CHAT WIDGET — DO NOT REMOVE. See SPEC-protect-eva-chat-widget.md */}` comment. That comment is how future agents (including you) know not to touch this.
- **DO NOT** replace it with a React component wrapper like `<EvaWidget />` unless you are explicitly building a new widget system. Added indirection makes it harder for the next Claude Code session to recognize what this is.

---

## When You Actually Need to Modify It

The only legitimate reasons to change this block:

1. Brandon explicitly asked you to change the org ID (e.g., testing a different subaccount).
2. Brandon explicitly asked you to migrate off the chat-widget edge function to a new endpoint.
3. The edge function URL itself has changed (confirm by asking — do not guess).

In all three cases: make the change, keep the sentinel comment, and **update this spec file in the same commit** so the next session has accurate context.

---

## Pre-Commit Verification Checklist

Run these before you commit ANY change to `src/app/layout.tsx`, `src/app/head.tsx`, or root-level layout files:

```bash
# 1. Widget script tag is still present
grep -n "chat-widget" src/app/layout.tsx || { echo "❌ EVA WIDGET MISSING"; exit 1; }

# 2. Correct Supabase project URL
grep -n "momssbzlofjodqodvvvk" src/app/layout.tsx || { echo "❌ WRONG SUPABASE PROJECT"; exit 1; }

# 3. Correct Cima org ID
grep -n "1372de10-066f-437e-941e-643deefebf2f" src/app/layout.tsx || { echo "❌ WRONG ORG ID"; exit 1; }

# 4. Sentinel comment is still there
grep -n "CIMA EVA CHAT WIDGET" src/app/layout.tsx || { echo "❌ SENTINEL COMMENT MISSING"; exit 1; }

# 5. next/script is still imported
grep -n "from 'next/script'" src/app/layout.tsx || { echo "❌ next/script IMPORT MISSING"; exit 1; }

echo "✅ Eva widget intact"
```

Paste the output of this block into the PR description or commit message. If any line prints ❌, **do not commit**.

---

## Post-Deploy Smoke Test

After any deploy to cimagrowth.com, verify in the browser:

1. Visit `https://cimagrowth.com` in an incognito window.
2. Scroll to the bottom-right corner. Within ~3 seconds, the orange `#F97316` chat bubble should appear.
3. Click it. Eva should greet you with: *"Hey there! 👋 I'm Eva from Cima Growth Solutions…"*
4. Send a test message ("what do you do?"). Eva should reply within 5 seconds.
5. Open DevTools → Network tab. Filter by `chat-widget`. You should see a 200 response from the Supabase edge function.

If any step fails, the widget is broken and this is a P0 issue — tell Brandon immediately.

---

## Emergency Recovery (If You Find It Deleted)

If `grep -rn "chat-widget" src/app/` returns nothing, paste this back into `src/app/layout.tsx`:

```tsx
{/* CIMA EVA CHAT WIDGET — DO NOT REMOVE. See SPEC-protect-eva-chat-widget.md */}
<Script
  src="https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f"
  strategy="lazyOnload"
/>
```

Make sure `import Script from 'next/script'` is at the top of the file. Commit with the message: `fix: restore Eva chat widget (accidentally removed)`.

---

## Acceptance Criteria

A frontend pass on this repo is only considered complete when:

- [ ] Widget `<Script>` tag is present in `src/app/layout.tsx`
- [ ] Sentinel comment is present immediately above it
- [ ] `src` URL matches exactly: `https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f`
- [ ] `strategy="lazyOnload"` is set
- [ ] `next/script` import is present
- [ ] All 5 pre-commit grep checks pass
- [ ] Post-deploy smoke test passes in production
