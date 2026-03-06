/**
 * Build-time prerender script — generates static HTML for each route
 * Uses vite-node + jsdom + React SSR (MemoryRouter + renderToString)
 *
 * Run: npx vite-node scripts/prerender.ts
 */
import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const SITE_URL = 'https://cimagrowth.com';

// ──────────────────────────────────────────────────────────
// 1. Set up browser globals BEFORE any React imports
// ──────────────────────────────────────────────────────────
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: SITE_URL,
  pretendToBeVisual: true,
});
const g = globalThis as any;
const w = dom.window as any;

for (const key of [
  'window', 'document', 'HTMLElement', 'Element', 'Node', 'localStorage',
  'MutationObserver', 'getComputedStyle', 'DOMParser', 'Text',
  'DocumentFragment', 'Event', 'CustomEvent', 'KeyboardEvent', 'MouseEvent',
  'FocusEvent', 'SVGElement', 'HTMLImageElement', 'HTMLVideoElement', 'Image',
]) {
  try {
    Object.defineProperty(g, key, { value: w[key], writable: true, configurable: true });
  } catch {}
}
try {
  Object.defineProperty(g, 'navigator', { value: w.navigator, writable: true, configurable: true });
} catch {}

g.requestAnimationFrame = (cb: Function) => setTimeout(cb, 0);
g.cancelAnimationFrame = (id: number) => clearTimeout(id);
g.scrollTo = () => {};
g.scrollBy = () => {};
g.PointerEvent = w.PointerEvent || w.MouseEvent;
g.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} };
g.ResizeObserver = class { observe() {} disconnect() {} unobserve() {} };
g.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
});

// ──────────────────────────────────────────────────────────
// 2. Dynamic imports AFTER globals are in place
// ──────────────────────────────────────────────────────────
const { renderToString } = await import('react-dom/server');
const React = (await import('react')).default;
const { MemoryRouter, Routes, Route } = await import('react-router-dom');
const { HelmetProvider, HelmetData } = await import('react-helmet-async');
const { QueryClient, QueryClientProvider } = await import('@tanstack/react-query');
const { ThemeProvider } = await import('@/contexts/ThemeContext');
const { VisitorProvider } = await import('@/contexts/VisitorContext');
const { AuthProvider } = await import('@/contexts/AuthContext');
const { TooltipProvider } = await import('@/components/ui/tooltip');

// Page components
const Index = (await import('@/pages/Index')).default;
const Product = (await import('@/pages/Product')).default;
const Features = (await import('@/pages/Features')).default;
const Pricing = (await import('@/pages/Pricing')).default;
const Demo = (await import('@/pages/Demo')).default;
const Blog = (await import('@/pages/Blog')).default;
const TermsOfService = (await import('@/pages/TermsOfService')).default;
const PrivacyPolicy = (await import('@/pages/PrivacyPolicy')).default;
const RefundPolicy = (await import('@/pages/RefundPolicy')).default;

// ──────────────────────────────────────────────────────────
// 3. Route config — mirrors the SEO props in each page
// ──────────────────────────────────────────────────────────
interface RouteConfig {
  path: string;
  component: any;
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown>[];
}

const ROUTES: RouteConfig[] = [
  {
    path: '/',
    component: Index,
    title: 'AI Patient Engagement for Healthcare Clinics – Cima Growth Solutions',
    description: 'GrowthOS responds instantly to patient inquiries across web, phone, text, email & social. AI-powered engagement for fertility clinics and med spas.',
    canonical: SITE_URL,
    keywords: ['patient engagement software', 'healthcare CRM', 'AI patient communication', 'fertility clinic software', 'med spa CRM'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Cima Growth Solutions',
        url: SITE_URL,
        description: 'AI-powered patient engagement and marketing automation platform for fertility clinics, med spas, and regenerative medicine practices.',
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'support@cimagrowth.com', availableLanguage: 'English' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'GrowthOS by Cima Growth Solutions',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#application`,
        name: 'GrowthOS',
        description: 'AI-powered patient engagement platform that responds instantly across every channel.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        offers: { '@type': 'Offer', price: '999', priceCurrency: 'USD' },
        provider: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  },
  {
    path: '/product',
    component: Product,
    title: 'GrowthOS Platform – AI Follow-Up Engine for Clinics – Cima Growth Solutions',
    description: 'Explore GrowthOS: AI instant response, automated nurturing, unified inbox, pipeline management, and reporting. Works with Salesforce, HubSpot, or standalone.',
    canonical: `${SITE_URL}/product`,
    keywords: ['GrowthOS platform', 'AI patient engagement', 'healthcare CRM', 'clinic automation'],
  },
  {
    path: '/features',
    component: Features,
    title: 'GrowthOS Features – Workflows, CRM & Automation Tools – Cima Growth Solutions',
    description: 'See every GrowthOS tool in action: workflows, calendars, invoicing, conversations, pipelines, and more. One platform to run your clinic\'s growth engine.',
    canonical: `${SITE_URL}/features`,
    keywords: ['GrowthOS features', 'clinic CRM', 'patient management', 'healthcare automation'],
  },
  {
    path: '/sign-up',
    component: Pricing,
    title: 'Pricing – GrowthOS Plans for Clinics – Cima Growth Solutions',
    description: 'GrowthOS pricing: $999/month or $9,999/year. Unlimited leads, AI conversations & team members. No per-lead charges. Full platform access.',
    canonical: `${SITE_URL}/sign-up`,
    keywords: ['GrowthOS pricing', 'healthcare CRM pricing', 'clinic software pricing'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'GrowthOS',
        description: 'AI-powered patient engagement platform for healthcare clinics.',
        brand: { '@type': 'Brand', name: 'Cima Growth Solutions' },
        offers: [
          { '@type': 'Offer', name: 'Monthly Plan', price: '999', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/sign-up` },
          { '@type': 'Offer', name: 'Annual Plan', price: '9999', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/sign-up` },
        ],
      },
    ],
  },
  {
    path: '/demo',
    component: Demo,
    title: 'Book a Demo – See GrowthOS in Action – Cima Growth Solutions',
    description: 'Schedule a 30-minute GrowthOS walkthrough. Watch AI respond to patient inquiries in real-time across web, phone, text & social. Free consultation.',
    canonical: `${SITE_URL}/demo`,
    keywords: ['GrowthOS demo', 'healthcare CRM demo', 'patient engagement demo'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'GrowthOS Demo & Consultation',
        description: 'Book a 30-minute walkthrough to see GrowthOS handle real patient inquiries with AI-powered engagement and follow-up automation.',
        provider: { '@type': 'Organization', name: 'Cima Growth Solutions' },
        areaServed: 'United States',
      },
    ],
  },
  {
    path: '/blog',
    component: Blog,
    title: 'Blog – Healthcare Marketing Insights – Cima Growth Solutions',
    description: 'Expert strategies and actionable advice for fertility clinics, med spas, and regenerative medicine. Patient engagement best practices and growth tips.',
    canonical: `${SITE_URL}/blog`,
    keywords: ['clinic growth strategies', 'patient engagement tips', 'healthcare marketing blog'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'GrowthOS Blog – Insights for Clinic Growth',
        url: `${SITE_URL}/blog`,
        publisher: { '@type': 'Organization', name: 'Cima Growth Solutions', url: SITE_URL },
      },
    ],
  },
  {
    path: '/terms',
    component: TermsOfService,
    title: 'Terms of Service – Cima Growth Solutions',
    description: 'Terms of Service and Master Services Agreement for the GrowthOS platform by Cima Growth Solutions. Covers SaaS access, HIPAA compliance, and data handling.',
    canonical: `${SITE_URL}/terms`,
  },
  {
    path: '/privacy',
    component: PrivacyPolicy,
    title: 'Privacy Policy – Cima Growth Solutions',
    description: 'Privacy Policy for the GrowthOS platform by Cima Growth Solutions. Covers data collection, HIPAA compliance, PHI handling, and patient data protection.',
    canonical: `${SITE_URL}/privacy`,
  },
  {
    path: '/refund-policy',
    component: RefundPolicy,
    title: 'Refund Policy – Cima Growth Solutions',
    description: 'Refund and cancellation policy for GrowthOS subscriptions by Cima Growth Solutions. 14-day cancellation window, conditions, and chargeback procedures.',
    canonical: `${SITE_URL}/refund-policy`,
  },
];

// ──────────────────────────────────────────────────────────
// 4. Read the built HTML template
// ──────────────────────────────────────────────────────────
const templatePath = join(DIST_DIR, 'index.html');
if (!existsSync(templatePath)) {
  console.error('dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}
const template = readFileSync(templatePath, 'utf-8');

// Save the SPA shell as fallback for non-prerendered routes (e.g. /blog/:slug)
const fallbackPath = join(DIST_DIR, '_spa-fallback.html');
copyFileSync(templatePath, fallbackPath);
console.log('Saved SPA fallback → dist/_spa-fallback.html');

// ──────────────────────────────────────────────────────────
// 5. Render each route
// ──────────────────────────────────────────────────────────
function escapeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function injectHeadAndBody(templateHtml: string, route: RouteConfig, bodyHtml: string): string {
  let html = templateHtml;

  // Replace the static <title> with the route-specific title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

  // Replace static meta tags
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );
  html = html.replace(
    /<meta name="title" content="[^"]*" \/>/,
    `<meta name="title" content="${route.title}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Replace keywords if defined
  if (route.keywords?.length) {
    html = html.replace(
      /<meta name="keywords" content="[^"]*" \/>/,
      `<meta name="keywords" content="${route.keywords.join(', ')}" />`
    );
  }

  // Inject JSON-LD scripts before </head>
  if (route.jsonLd?.length) {
    const jsonLdTags = route.jsonLd
      .map((s) => `    <script type="application/ld+json">${escapeJsonLd(s)}</script>`)
      .join('\n');
    html = html.replace('</head>', `${jsonLdTags}\n  </head>`);
  }

  // Inject rendered body into root
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${bodyHtml}</div>`
  );

  return html;
}

let successCount = 0;
let failCount = 0;

for (const route of ROUTES) {
  const helmetData = new HelmetData({});
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, enabled: false } },
  });

  try {
    const appHtml = renderToString(
      React.createElement(
        HelmetProvider,
        { context: helmetData },
        React.createElement(
          QueryClientProvider,
          { client: queryClient },
          React.createElement(
            ThemeProvider,
            null,
            React.createElement(
              VisitorProvider,
              null,
              React.createElement(
                AuthProvider,
                null,
                React.createElement(
                  TooltipProvider,
                  null,
                  React.createElement(
                    MemoryRouter,
                    { initialEntries: [route.path] },
                    React.createElement(
                      Routes,
                      null,
                      React.createElement(Route, {
                        path: route.path,
                        element: React.createElement(route.component),
                      })
                    )
                  )
                )
              )
            )
          )
        )
      )
    );

    const html = injectHeadAndBody(template, route, appHtml);

    // Determine output path
    const outputDir = route.path === '/' ? DIST_DIR : join(DIST_DIR, route.path);
    const outputFile =
      route.path === '/' ? join(DIST_DIR, 'index.html') : join(outputDir, 'index.html');

    mkdirSync(dirname(outputFile), { recursive: true });
    writeFileSync(outputFile, html, 'utf-8');

    const size = Buffer.byteLength(html, 'utf-8');
    const hasH1 = appHtml.includes('<h1');
    const hasJsonLd = html.includes('application/ld+json');
    const hasContent = appHtml.length > 500;
    console.log(
      `  ✓ ${route.path.padEnd(20)} → ${outputFile.replace(DIST_DIR, 'dist').padEnd(35)} (${(size / 1024).toFixed(1)}KB, h1:${hasH1}, jsonLd:${hasJsonLd}, content:${hasContent})`
    );
    successCount++;
  } catch (err: any) {
    console.error(`  ✗ ${route.path.padEnd(20)} → ERROR: ${err.message}`);
    failCount++;
  }
}

console.log(`\nPrerender complete: ${successCount} succeeded, ${failCount} failed`);

if (failCount > 0) {
  console.log('Failed routes will use the SPA fallback (_spa-fallback.html).');
}

process.exit(0);
