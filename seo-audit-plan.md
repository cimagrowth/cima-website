# SEO Audit Plan — cimagrowth.com

**Date:** 2026-03-06
**Auditor:** Claude (AI SEO Specialist)
**Site:** https://cimagrowth.com
**Business:** Cima Growth Solutions – GrowthOS AI Patient Engagement Platform

---

## 1. Framework Identification

| Property | Value |
|----------|-------|
| **Framework** | React 18.3 + Vite 5.4 (Single Page Application) |
| **Routing** | react-router-dom 6.30 (client-side BrowserRouter) |
| **Rendering** | **100% Client-Side Rendered (CSR)** — No SSR/SSG |
| **Styling** | Tailwind CSS 3.4 + shadcn/ui (Radix primitives) |
| **State** | React Query (TanStack), React Context |
| **SEO Tooling** | react-helmet-async (client-side meta injection) |
| **Backend** | Supabase (auth, database, edge functions) |
| **Build** | Vite → static SPA bundle |
| **TypeScript** | 5.8 |

### Critical Rendering Issue
This is a **Vite + React SPA**. The entire site is client-side rendered:
- `index.html` contains only `<div id="root"></div>` + a script tag
- All content is rendered via JavaScript after page load
- Search engine crawlers (especially Bing, non-JS-executing bots) see an empty page
- While Googlebot can execute JS, it has a "second wave" indexing delay and may miss dynamic content
- react-helmet-async injects meta tags via JS — crawlers may not see them reliably
- **This is NOT a Next.js project** — there is no `next.config.js`, no App Router, no Pages Router

**Implication:** Converting to Next.js (SSR/SSG) would be a major rewrite. The pragmatic approach for this audit is to:
1. Keep Vite + React but implement **pre-rendering** via `vite-plugin-ssr` or a static pre-rendering plugin
2. OR use a headless pre-rendering service (Prerender.io, Rendertron)
3. OR migrate to Next.js (most thorough but highest effort)

**Recommended approach for this audit:** Implement **static pre-rendering at build time** using `vite-plugin-prerender` (or equivalent) to generate static HTML for all known routes. This gives crawlers full HTML without a framework migration.

---

## 2. File Structure Map

### Page Components (16 pages)
```
src/pages/
├── Index.tsx          → /              (Homepage)
├── Product.tsx        → /product       (Product details)
├── Features.tsx       → /features      (Feature showcase)
├── Pricing.tsx        → /sign-up       (Pricing plans)
├── Demo.tsx           → /demo          (Demo booking)
├── Blog.tsx           → /blog          (Blog listing)
├── BlogPost.tsx       → /blog/:slug    (Individual posts)
├── TermsOfService.tsx → /terms         (Legal)
├── PrivacyPolicy.tsx  → /privacy       (Legal)
├── RefundPolicy.tsx   → /refund-policy (Legal)
├── NotFound.tsx       → *              (404)
├── AdminLogin.tsx     → /admin/login   (Admin)
├── AdminBlog.tsx      → /admin/blog    (Admin)
├── BlogEditor.tsx     → /admin/blog/*  (Admin)
├── AdsAccess.tsx      → /ads-access    (Internal)
└── SubscriptionSuccess.tsx → /success  (Post-checkout)
```

### Layout Components
```
src/components/layout/
├── Layout.tsx              (Main wrapper: Header + Footer + Chat Widget)
├── Header.tsx              (Navigation)
├── Footer.tsx              (Footer with links)
├── ScrollToTop.tsx         (Scroll button)
└── ScrollToTopOnNavigate.tsx (Auto-scroll on route change)
```

### SEO Components
```
src/components/seo/
├── SEO.tsx          (react-helmet-async wrapper for meta tags)
├── JsonLd.tsx       (JSON-LD schema renderer via Helmet)
└── schemas.ts       (Schema generator functions)
```

### Home Page Section Components
```
src/components/home/
├── Hero.tsx, SocialProof.tsx, Problem.tsx, Solution.tsx,
├── IntegrationFlexibility.tsx, HowItWorks.tsx, Authority.tsx,
├── UseCases.tsx, AIStudio.tsx, FounderLetter.tsx, FinalCTA.tsx
```

### Static Assets
```
public/
├── robots.txt       (exists)
├── sitemap.xml      (exists, static)
├── favicon.ico, favicon.png
├── og-image.png, og-blog.png, og-demo.png, og-pricing.png,
│   og-product.png, og-privacy.png, og-terms.png, og-refund.png
├── blog-images/     (5 JPG images)
├── feature-videos/  (22 MP4 videos)
├── llms.txt, llms-full.txt
└── placeholder.svg
```

### Config Files
```
vite.config.ts, tsconfig.json, tailwind.config.ts,
postcss.config.js, eslint.config.js, vitest.config.ts
```

---

## 3. Rendering Analysis

### Current State: Pure Client-Side Rendering
- **index.html** has hardcoded meta tags for the homepage ONLY
- react-helmet-async dynamically updates `<head>` tags via JavaScript
- When a crawler requests `/product`, `/demo`, etc., it receives the same `index.html` with homepage meta tags
- The SPA JavaScript must execute to:
  - Parse the URL route
  - Render the correct page component
  - Inject the correct Helmet meta tags
- **Googlebot** may eventually index correctly (JS rendering), but with delays
- **Bingbot, social media crawlers, AI crawlers** may not execute JS → see homepage meta on all pages

### What Needs to Change
1. **Pre-render all static routes at build time** → generates `/product/index.html`, `/demo/index.html`, etc. with full HTML + correct meta tags
2. Blog posts (dynamic `/blog/:slug`) need either:
   - Pre-rendering at build time if post slugs are known
   - OR a pre-rendering middleware/service for dynamic routes
3. The existing `index.html` hardcoded meta tags should remain as fallback but Helmet-injected tags should match

---

## 4. Existing SEO Inventory

### Page-by-Page Current State

#### Homepage `/` (Index.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "GrowthOS – AI Patient Engagement Platform for Healthcare Clinics \| GrowthOS by Cima Growth Solutions" | Too long (93 chars with suffix) |
| Description | "Stop patient leakage with GrowthOS. AI-powered patient engagement that responds instantly across web, phone, text, email & social media. Built for fertility clinics, med spas, wellness centers & regenerative medicine. Live in 24-48 hours." | Too long (241 chars) |
| H1 | "Every missed follow-up costs {your clinic} patients." | Dynamic, keyword-weak |
| Canonical | "https://cimagrowth.com" | OK |
| OG Tags | Default og-image.png | OK |
| JSON-LD | WebSite, Organization, SoftwareApplication | Good |
| Keywords | 14 keywords | OK |

#### Product `/product` (Product.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Product – GrowthOS AI Patient Engagement & CRM Platform \| GrowthOS by Cima Growth Solutions" | Too long (91 chars) |
| Description | "Explore GrowthOS features: AI-powered instant response, automated patient nurturing..." (162 chars) | OK |
| H1 | "GrowthOS is the AI follow-up engine plus the platform your clinic runs it on." | Long, OK |
| Canonical | "https://cimagrowth.com/product" | OK |
| OG Image | og-product.png | OK |
| JSON-LD | Breadcrumb, SoftwareApp, FAQ | Good |

#### Features `/features` (Features.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "What's Inside GrowthOS \| GrowthOS by Cima Growth Solutions" | 58 chars — OK |
| Description | "Explore GrowthOS features — workflows, calendars, invoicing, conversations, and more. See each tool in action." (111 chars) | Too short |
| H1 | "What's inside GrowthOS" | OK |
| Canonical | "https://cimagrowth.com/features" | OK |
| OG Image | og-product.png (reused) | OK |
| JSON-LD | **MISSING** | Needs fix |

#### Pricing `/sign-up` (Pricing.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Pricing – GrowthOS AI Patient Engagement Platform \| GrowthOS by Cima Growth Solutions" | Too long (86 chars) |
| Description | "Simple, transparent pricing for GrowthOS. $999/month or $9,999/year..." (166 chars) | Slightly long |
| H1 | "Stop patient leakage with GrowthOS. Choose monthly or annual." | OK |
| Canonical | "https://cimagrowth.com/sign-up" | OK |
| OG Image | og-pricing.png | OK |
| JSON-LD | Breadcrumb, FAQ, Product/Offer | Good |
| URL issue | `/sign-up` is not descriptive for pricing — should be `/pricing` | Needs redirect |

#### Demo `/demo` (Demo.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Book a Demo – See GrowthOS AI Patient Engagement in Action \| GrowthOS by Cima Growth Solutions" | Too long (95 chars) |
| Description | "Schedule a 30-minute walkthrough of GrowthOS..." (243 chars) | Way too long |
| H1 | "See GrowthOS handle real patient inquiries in real time." | OK |
| Canonical | **"https://inquiry-to-consult.lovable.app/demo"** | **CRITICAL BUG — wrong domain** |
| OG Image | og-demo.png | OK |
| JSON-LD | Breadcrumb, Service | Good |

#### Blog `/blog` (Blog.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Blog – Insights for Clinic Growth \| GrowthOS" | OK (46 chars) |
| Description | "Expert strategies, industry insights, and actionable advice..." (191 chars) | Too long |
| H1 | "Insights for Clinic Growth" | OK |
| Canonical | "https://cimagrowth.com/blog" | OK |
| JSON-LD | Breadcrumb, Blog | Good |

#### Blog Post `/blog/:slug` (BlogPost.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | Dynamic from post data | OK |
| Description | Dynamic from post data | OK |
| H1 | Post title | OK |
| Canonical | "https://cimagrowth.com/blog/${slug}" | OK |
| JSON-LD | Breadcrumb, Article | Good |

#### Terms `/terms` (TermsOfService.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Terms of Service \| GrowthOS by Cima Growth Solutions" | OK (52 chars) |
| Description | "Terms of Service and Master Services Agreement for Cima Growth Solutions GrowthOS platform." | OK |
| H1 | "Terms of Service and Master Services Agreement" | OK |
| Canonical | "https://cimagrowth.com/terms" | OK |
| JSON-LD | **MISSING** | Low priority |

#### Privacy `/privacy` (PrivacyPolicy.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Privacy Policy \| GrowthOS by Cima Growth Solutions" | OK (50 chars) |
| Description | "Privacy Policy for Cima Growth Solutions LLC healthcare-focused SaaS platform." | Short (78 chars) |
| H1 | "Healthcare Enterprise Privacy Policy" | OK |
| Canonical | "https://cimagrowth.com/privacy" | OK |
| JSON-LD | **MISSING** | Low priority |

#### Refund Policy `/refund-policy` (RefundPolicy.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Refund Policy \| GrowthOS by Cima Growth Solutions" | OK (50 chars) |
| Description | "Refund Policy for Cima Growth Solutions GrowthOS subscriptions and associated services." | Short (88 chars) |
| H1 | "Refund Policy" | OK |
| Canonical | "https://cimagrowth.com/refund-policy" | OK |
| JSON-LD | **MISSING** | Low priority |

#### 404 Page (NotFound.tsx)
| Element | Current Value | Status |
|---------|--------------|--------|
| Title | "Page Not Found \| GrowthOS" | OK |
| noindex | true | Correct |
| H1 | "Page not found" | OK |

#### Admin/Internal Pages
- AdminLogin, AdminBlog, BlogEditor: Minimal/no SEO — **correct** (should be noindex)
- AdsAccess: noindex=true — correct
- SubscriptionSuccess: noindex=true — correct

### Existing Static Files
- **robots.txt**: Exists but allows ALL crawlers including AI training bots (GPTBot, CCBot, Google-Extended) — should block training bots per spec
- **sitemap.xml**: Exists with 8 URLs, static file — missing `/features` page, doesn't include blog posts dynamically

---

## 5. Complete Audit Checklist

### A. Technical / Infrastructure (Critical Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| A1 | Site is 100% CSR — crawlers see empty HTML | Critical | Vite SPA, no pre-rendering | Add vite-plugin-prerender for static HTML generation at build time |
| A2 | robots.txt allows AI training crawlers | Medium | GPTBot, CCBot, Google-Extended all allowed | Block training bots, keep retrieval bots |
| A3 | sitemap.xml is static, missing pages | High | 8 URLs, missing /features, no blog posts | Generate comprehensive sitemap at build time |
| A4 | No www→non-www redirect configured | High | Needs server/hosting config | Add redirect config (Vercel/hosting level) + document |
| A5 | No security headers | High | None configured | Add headers via vite plugin or hosting config |
| A6 | No trailing slash consistency | Medium | Not enforced | Ensure consistent URL format |
| A7 | Demo page canonical points to wrong domain | Critical | lovable.app domain | Fix to cimagrowth.com/demo |
| A8 | Broken URL redirects needed | High | /home-6335, /demo870629 return 404 | Add redirect config |
| A9 | Footer links to /about which doesn't exist | Medium | 404 link | Remove or create About page |
| A10 | /sign-up URL for pricing page | Medium | Non-descriptive URL | Keep /sign-up but add /pricing redirect or rename |
| A11 | `poweredByHeader` equivalent not set | Low | N/A for Vite (no X-Powered-By) | N/A — Vite doesn't add this |

### B. On-Page SEO (High Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| B1 | Homepage title too long | High | 93 chars with suffix | Shorten to ~60 chars |
| B2 | Homepage description too long | High | 241 chars | Shorten to 150-160 chars |
| B3 | Homepage H1 is generic/dynamic | Medium | "Every missed follow-up costs your clinic patients" | Make keyword-rich and static |
| B4 | Product page title too long | Medium | 91 chars | Shorten |
| B5 | Features page description too short | Medium | 111 chars | Expand to 140-160 chars |
| B6 | Features page missing JSON-LD | Medium | None | Add Breadcrumb + SoftwareApp schema |
| B7 | Pricing page title too long | Medium | 86 chars | Shorten |
| B8 | Demo page title too long | Medium | 95 chars | Shorten |
| B9 | Demo page description too long | High | 243 chars | Shorten to 150-160 chars |
| B10 | Blog page description too long | Medium | 191 chars | Shorten |
| B11 | Privacy description too short | Low | 78 chars | Expand |
| B12 | Refund description too short | Low | 88 chars | Expand |
| B13 | Title suffix inconsistency | Medium | Some use "GrowthOS by Cima Growth Solutions", spec wants "Cima Growth Solutions" | Standardize to "– Cima Growth Solutions" |
| B14 | Legal pages missing keywords | Low | No keywords on terms/privacy/refund | Add relevant keywords |

### C. Structured Data (High Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| C1 | JSON-LD not escaped for XSS | High | Uses JSON.stringify without < escaping | Add .replace(/</g, '\\u003c') |
| C2 | Organization schema missing @id | Medium | No @id identifier | Add @id for cross-referencing |
| C3 | WebSite schema missing @id | Medium | No @id | Add @id |
| C4 | SoftwareApp missing applicationSubCategory | Low | Missing | Add "Healthcare Marketing Automation" |
| C5 | BreadcrumbList last item has URL | Low | All items have URL | Remove URL from last item per spec |
| C6 | Features page missing all schemas | Medium | No JSON-LD | Add Breadcrumb + relevant schema |
| C7 | Legal pages missing schemas | Low | No JSON-LD | Add Breadcrumb schemas |
| C8 | Organization missing knowsAbout, areaServed | Low | Not present | Add per spec |
| C9 | Article schema author should be Person | Medium | Uses Organization | Add Person type with details |
| C10 | WebApplication schema not on homepage | Medium | Uses SoftwareApplication | Add WebApplication per spec |

### D. Images (Medium Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| D1 | Header/Footer logo alt text is just "Cima" | Low | alt="Cima" | Change to "Cima Growth Solutions logo" |
| D2 | Blog images are JPG, not WebP | Low | .jpg files in public/blog-images/ | Convert or let hosting optimize |
| D3 | Images use `<img>` not optimized component | Medium | Standard img tags | Consider lazy loading attributes |
| D4 | Blog post featured images may lack dimensions | Medium | No width/height specified | Add explicit dimensions |
| D5 | No priority loading on hero/LCP images | Low | No images in hero (text-based) | N/A for homepage; check other pages |

### E. Internal Linking (Medium Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| E1 | Footer links to /about (404) | Medium | Broken link | Fix or remove |
| E2 | Pricing page has no internal links | Medium | Only external checkout links | Add links to /demo, /, /product |
| E3 | Demo page has no internal links | Medium | Only iframe embed | Add links to /sign-up, /product |
| E4 | Terms/Privacy/Refund minimal internal links | Low | Privacy links to /terms only | Add cross-links |
| E5 | Features page only links to /demo | Low | Single internal link | Add more contextual links |
| E6 | External links missing rel attributes | Medium | Footer social links | Add rel="noopener noreferrer" target="_blank" |
| E7 | Footer uses `<a>` tags not `<Link>` for internal links | Medium | href-based links | Convert to react-router Link |

### F. Performance (Low Priority)

| # | Issue | Severity | Current State | Fix |
|---|-------|----------|--------------|-----|
| F1 | Google Fonts loaded via external link | Medium | Preconnect exists | Consider self-hosting or inlining critical CSS |
| F2 | Google Tag Manager blocks rendering | Low | In head, synchronous-ish | Already async, acceptable |
| F3 | 22 feature videos may impact load | Low | In /feature-videos/ | Already lazy-loaded on features page |
| F4 | viewport disables user scaling | Low | user-scalable=no | Remove user-scalable=no (accessibility) |

---

## 6. Implementation Plan (Phase 2 Order)

### Step 2A: Rendering & Infrastructure (Critical)
1. Install and configure `vite-plugin-prerender` (or equivalent like `vite-plugin-ssr-ssg`, `prerender-spa-plugin`) for static pre-rendering of all known routes
2. Update `robots.txt` — block AI training crawlers (GPTBot, CCBot, Google-Extended), keep retrieval crawlers allowed
3. Generate comprehensive `sitemap.xml` at build time (script or plugin) including all public routes + blog posts
4. Add security headers via Vite plugin (`vite-plugin-html` for injection or hosting platform config)
5. Fix Demo page canonical URL (critical bug)
6. Document www→non-www redirect requirement (hosting-level config)
7. Add redirect mappings for broken URLs (/home-6335 → /, /demo870629 → /demo) — document for hosting config
8. Fix or remove /about link in Footer

### Step 2B: Meta Tags & SEO Component Updates (Critical)
1. Update SEO.tsx title template to use "– Cima Growth Solutions" format
2. Fix all title tags to be 50-60 characters
3. Fix all meta descriptions to be 140-160 characters
4. Add missing keywords to legal pages
5. Ensure all pages have proper canonical URLs

### Step 2C: Structured Data Fixes (High)
1. Fix JSON-LD XSS escaping in JsonLd.tsx
2. Add @id identifiers to Organization, WebSite, WebApplication schemas
3. Fix BreadcrumbList last item (no URL)
4. Add missing schemas to Features page
5. Add Breadcrumb schemas to legal pages
6. Enhance Organization schema with knowsAbout, areaServed
7. Update Article schema author to Person type
8. Add WebApplication schema to homepage

### Step 2D: Heading Hierarchy (High)
1. Audit and fix H1 tags on all pages for keyword optimization
2. Ensure single H1 per page
3. Verify H2/H3 hierarchy (no level skipping)

### Step 2E: Image Optimization (Medium)
1. Fix alt text on all images
2. Add width/height attributes where missing
3. Add loading="lazy" to below-fold images

### Step 2F: Internal Linking (Medium)
1. Fix broken /about link
2. Add internal links to Pricing, Demo, Features pages
3. Add cross-links to legal pages
4. Fix external link rel attributes
5. Convert `<a>` internal links to `<Link>` where applicable

### Step 2G: Performance (Low)
1. Fix viewport meta (remove user-scalable=no)
2. Verify font loading strategy

### Step 2H: Build & Verify
1. Run build, check for errors
2. Verify pre-rendered HTML output
3. Validate JSON-LD in output
4. Check meta tags in generated HTML

---

## 7. Files That Will Be Modified

| File | Changes |
|------|---------|
| `vite.config.ts` | Add pre-rendering plugin, security headers plugin |
| `package.json` | Add pre-rendering dependency |
| `index.html` | Fix viewport meta, update fallback meta |
| `public/robots.txt` | Block AI training crawlers |
| `public/sitemap.xml` | Regenerate with all pages |
| `src/components/seo/SEO.tsx` | Update title template format |
| `src/components/seo/JsonLd.tsx` | Add XSS escaping |
| `src/components/seo/schemas.ts` | Add @id, enhance schemas |
| `src/pages/Index.tsx` | Fix title, description length |
| `src/pages/Product.tsx` | Fix title length |
| `src/pages/Features.tsx` | Fix description, add JSON-LD |
| `src/pages/Pricing.tsx` | Fix title length, add internal links |
| `src/pages/Demo.tsx` | Fix canonical URL (critical), fix title/description |
| `src/pages/Blog.tsx` | Fix description length |
| `src/pages/BlogPost.tsx` | Enhance article schema |
| `src/pages/TermsOfService.tsx` | Add keywords, JSON-LD breadcrumb |
| `src/pages/PrivacyPolicy.tsx` | Fix description, add keywords, JSON-LD |
| `src/pages/RefundPolicy.tsx` | Fix description, add keywords, JSON-LD |
| `src/components/layout/Footer.tsx` | Fix /about link, external link rels |
| `src/components/layout/Header.tsx` | Fix logo alt text |
| `src/components/home/Hero.tsx` | Potentially improve H1 |

### New Files
| File | Purpose |
|------|---------|
| `scripts/generate-sitemap.ts` | Build-time sitemap generation (if needed) |
| `seo-audit-report.md` | Audit findings and change documentation |

---

## 8. Out of Scope / Requires External Action

These items cannot be fixed in code alone and require manual/external configuration:

1. **www→non-www 301 redirects** — Requires DNS/hosting configuration (Vercel, Netlify, or CDN)
2. **Legacy URL redirects** (/home-6335, /demo870629) — Requires hosting redirect rules
3. **Google Search Console** — Submit sitemap, monitor indexing
4. **Bing Webmaster Tools** — Submit sitemap
5. **Google Rich Results Test** — Manual testing after deployment
6. **SecurityHeaders.com** — Verify after deployment
7. **Content writing** — If About page should exist, content must be authored
8. **Social media handles** — Need actual Twitter/LinkedIn handles for meta tags
9. **Blog post SEO fields** — Authors need to fill in meta_title, meta_description, meta_keywords in CMS
10. **Image format conversion** — Blog images should be converted to WebP (manual or CI pipeline)

---

## 9. Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Pre-rendering plugin may not work with react-router-dom | Test thoroughly; fall back to build script approach |
| Helmet meta tags may conflict with index.html hardcoded tags | Ensure Helmet overrides are working |
| Build size increase from pre-rendered HTML | Acceptable trade-off for SEO |
| Breaking existing functionality | Test all routes after changes; run existing tests |
| Dynamic blog posts can't be pre-rendered at build time | Use index.html fallback + document pre-rendering service need |

---

**Awaiting approval to proceed to Phase 2 (Implementation).**
