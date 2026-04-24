import type { Metadata } from 'next';
import Script from 'next/script';
import '@/index.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ScrollToTopOnNavigate from '@/components/layout/ScrollToTopOnNavigate';
import DemoChatWidget from '@/components/demo/DemoChatWidget';
import { CookieConsent } from '@/components/CookieConsent';
import { DynamicGTM } from './dynamic-gtm';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cimagrowth.com'),
  title: {
    default: 'Cima Growth Solutions – AI Patient Engagement for Healthcare Clinics',
    template: '%s',
  },
  description: 'GrowthOS is an AI-powered patient engagement platform for fertility clinics, med spas, wellness centers, and regenerative medicine clinics.',
  keywords: ['patient engagement software', 'healthcare CRM', 'AI patient communication', 'fertility clinic software', 'med spa CRM'],
  authors: [{ name: 'Cima Growth Solutions' }],
  openGraph: {
    type: 'website',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    images: [
      {
        url: '/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Cima Growth Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/og-home.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#1B4D5C',
    'msapplication-TileColor': '#1B4D5C',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TCKBWVR');`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCKBWVR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <ScrollToTopOnNavigate />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
            <ScrollToTop />
            <DemoChatWidget />
          </div>
          <DynamicGTM />
        </Providers>
        {/* GrowthOS AI Chat Widget */}
        <Script
          src="https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f"
          strategy="afterInteractive"
        />
        <CookieConsent />
      </body>
    </html>
  );
}
