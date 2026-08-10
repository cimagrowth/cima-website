// Host-conditioned redirects for the retired sendafertility.com domain.
// DNS for sendafertility.com must point at this deployment for any of these
// to fire. Covers both the apex and the www host.
const SENDA_HOSTS = ['sendafertility.com', 'www.sendafertility.com'];
const CONSENT_URL = 'https://cimagrowth.com/consent';

function sendafertilityRedirects() {
  return SENDA_HOSTS.flatMap((host) => {
    const has = [{ type: 'host', value: host }];
    return [
      // Named paths map to their cimagrowth equivalents.
      { source: '/walkthrough', has, destination: 'https://cimagrowth.com/demo', permanent: true },
      { source: '/sign-up', has, destination: CONSENT_URL, permanent: true },
      { source: '/privacy', has, destination: 'https://cimagrowth.com/privacy', permanent: true },
      { source: '/terms', has, destination: 'https://cimagrowth.com/terms', permanent: true },
      // Everything else lands on /consent, including the root. /baa is
      // deliberately excluded: it may be linked from a signed agreement, so
      // that path is left serving rather than redirected.
      { source: '/', has, destination: CONSENT_URL, permanent: true },
      { source: '/:path((?!baa(?:/|$)).*)', has, destination: CONSENT_URL, permanent: true },
    ];
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No output: 'export'. Vercel handles SSR/SSG natively
  experimental: {
    serverComponentsExternalPackages: ['isomorphic-dompurify'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'momssbzlofjodqodvvvk.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cimagrowth.com',
      },
    ],
  },
  // Preserve existing redirects from vercel.json
  async redirects() {
    return [
      // Canonical host: 308-redirect www → non-www (never the reverse)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.cimagrowth.com' }],
        destination: 'https://cimagrowth.com/:path*',
        permanent: true,
      },
      { source: '/home-6335', destination: '/', permanent: true },
      { source: '/demo870629', destination: '/demo', permanent: true },
      { source: '/demo-4386', destination: '/demo', permanent: true },
      { source: '/calendar-4597', destination: '/demo', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },
      // Self-serve signup and checkout are retired. GrowthOS is sold through
      // Deal Desk, so every former signup and plan path routes to the demo.
      { source: '/sign-up', destination: '/demo', permanent: true },
      { source: '/sign-up/register', destination: '/demo', permanent: true },
      { source: '/starter-plan', destination: '/demo', permanent: true },
      { source: '/grow-plan', destination: '/demo', permanent: true },
      { source: '/scale-plan', destination: '/demo', permanent: true },
      { source: '/sales-team', destination: '/', permanent: true },
      { source: '/ads-system', destination: '/', permanent: true },
      { source: '/clinic-growth-engine', destination: '/', permanent: true },
      { source: '/b/:slug', destination: '/blog', permanent: true },
      { source: '/2024/:month/:day/:slug', destination: '/blog', permanent: true },
      // Retired sendafertility.com domain -> /consent (host-conditioned).
      ...sendafertilityRedirects(),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
