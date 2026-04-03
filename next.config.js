/** @type {import('next').NextConfig} */
const nextConfig = {
  // No output: 'export' — Vercel handles SSR/SSG natively
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
      { source: '/home-6335', destination: '/', permanent: true },
      { source: '/demo870629', destination: '/demo', permanent: true },
      { source: '/demo-4386', destination: '/demo', permanent: true },
      { source: '/calendar-4597', destination: '/demo', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },
      { source: '/starter-plan', destination: '/sign-up', permanent: true },
      { source: '/grow-plan', destination: '/sign-up', permanent: true },
      { source: '/scale-plan', destination: '/sign-up', permanent: true },
      { source: '/sales-team', destination: '/', permanent: true },
      { source: '/ads-system', destination: '/', permanent: true },
      { source: '/clinic-growth-engine', destination: '/', permanent: true },
      { source: '/b/:slug', destination: '/blog', permanent: true },
      { source: '/2024/:month/:day/:slug', destination: '/blog', permanent: true },
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
