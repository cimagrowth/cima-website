import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import cimaLogoLightImg from '@/assets/cima-logo-light.png';

const cimaLogo =
  typeof cimaLogoLightImg === 'string'
    ? cimaLogoLightImg
    : cimaLogoLightImg.src;

export const metadata: Metadata = {
  title: "You're verified \u00B7 Cima Growth Solutions",
  robots: { index: false, follow: false },
};

type Status =
  | 'verified'
  | 'already_verified'
  | 'invalid_link'
  | 'expired'
  | 'rate_limited'
  | 'error';

type Variant = {
  icon: 'success' | 'warning';
  headline: string;
  subcopy: string;
  secondary?: string;
  cta?: { label: string; href: string };
};

const KNOWN_STATUSES: Status[] = [
  'verified',
  'already_verified',
  'invalid_link',
  'expired',
  'rate_limited',
  'error',
];

function sanitizeName(raw: string | string[] | undefined): string {
  if (typeof raw !== 'string') return '';
  return raw.trim().replace(/[<>]/g, '').slice(0, 60);
}

function resolveStatus(raw: string | string[] | undefined): Status {
  if (typeof raw !== 'string') return 'error';
  return (KNOWN_STATUSES as string[]).includes(raw) ? (raw as Status) : 'error';
}

function getVariant(status: Status, name: string): Variant {
  const displayName = name || 'there';

  switch (status) {
    case 'verified':
      return {
        icon: 'success',
        headline: `You're in, ${displayName}.`,
        subcopy:
          'Your 47 Frameworks ebook is on its way \u2014 check the email we just sent.',
        secondary: 'The email also has a link to your free AI tools dashboard.',
      };
    case 'already_verified':
      return {
        icon: 'success',
        headline: `Welcome back, ${displayName}.`,
        subcopy:
          'Looks like you already verified this email. We just re-sent your ebook and login link \u2014 check your inbox.',
      };
    case 'invalid_link':
      return {
        icon: 'warning',
        headline: "This link doesn't look right.",
        subcopy:
          "Your verification link may have been mistyped or from a different browser. The easiest fix: sign up again at the link below \u2014 you'll get a fresh email in seconds.",
        cta: { label: 'Sign up again \u2192', href: '/audit' },
      };
    case 'expired':
      return {
        icon: 'warning',
        headline: 'This link has expired.',
        subcopy:
          "Verification links last 24 hours. No problem \u2014 sign up again and we'll send a fresh one.",
        cta: { label: 'Sign up again \u2192', href: '/audit' },
      };
    case 'rate_limited':
      return {
        icon: 'warning',
        headline: 'One moment.',
        subcopy:
          "We've seen a lot of verify attempts from this network. Give it about an hour, then try again. If you never asked to sign up, you can safely ignore the emails.",
      };
    case 'error':
    default:
      return {
        icon: 'warning',
        headline: 'Something went wrong.',
        subcopy:
          'We hit an issue finishing your signup. Please try signing up again \u2014 if it keeps failing, email brandon@cimagrowth.com.',
        cta: { label: 'Sign up again \u2192', href: '/audit' },
      };
  }
}

type Props = {
  searchParams: { status?: string | string[]; name?: string | string[] };
};

export default function AuditWelcomePage({ searchParams }: Props) {
  const status = resolveStatus(searchParams.status);
  const safeName = sanitizeName(searchParams.name);
  const variant = getVariant(status, safeName);

  const isSuccess = variant.icon === 'success';
  const iconBg = isSuccess ? 'bg-[#1B4D5C]/10' : 'bg-[#F97316]/10';
  const iconColor = isSuccess ? 'text-[#1B4D5C]' : 'text-[#F97316]';
  const IconComponent = isSuccess ? CheckCircle2 : AlertTriangle;

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-[#FDFBF7] flex items-center justify-center px-6 py-16">
      <div className="max-w-[560px] w-full bg-white rounded-2xl shadow-sm border border-[#1B4D5C]/10 p-8 md:p-10 text-center">
        <div className="flex justify-center mb-8">
          <img
            src={cimaLogo}
            alt="Cima Growth Solutions"
            className="h-9 w-auto"
          />
        </div>

        <div
          className={`mx-auto w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-6`}
        >
          <IconComponent className={`w-9 h-9 ${iconColor}`} strokeWidth={2} />
        </div>

        <h1
          className="font-display font-bold text-[#1B4D5C] text-[1.75rem] md:text-[2rem] leading-tight tracking-tight mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {variant.headline}
        </h1>

        <p
          className="text-[1rem] md:text-[1.0625rem] leading-relaxed text-[#444] mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {variant.subcopy}
        </p>

        {variant.secondary && (
          <p
            className="text-[0.9375rem] leading-relaxed text-[#444]/80 mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {variant.secondary}
          </p>
        )}

        {variant.cta && (
          <div className="mt-8">
            <Link
              href={variant.cta.href}
              className="inline-flex items-center justify-center rounded-lg bg-[#F97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#F97316]/90 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
            >
              {variant.cta.label}
            </Link>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-[#1B4D5C]/10">
          <Link
            href="/"
            className="text-sm text-[#1B4D5C]/70 hover:text-[#1B4D5C] transition-colors"
          >
            {'Back to cimagrowth.com \u2192'}
          </Link>
        </div>
      </div>
    </section>
  );
}
