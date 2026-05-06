import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book your GrowthOS demo | Cima Growth Solutions',
  description:
    'Pick a time for your 30-minute live demo of GrowthOS with Brandon Hensinger.',
  robots: { index: false, follow: false },
};

const BOOKING_BASE = 'https://os.cimagrowth.com/book/cima-growth/growthos-demo';

const INDUSTRY_LABELS: Record<string, string> = {
  fertility: 'fertility',
  wellness: 'wellness',
  aesthetics: 'aesthetics',
  regenerative_medicine: 'regenerative medicine',
  other: 'your specialty',
};

function param(value: string | string[] | undefined): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, 200);
}

function escapeHtmlText(value: string): string {
  return value.replace(/[<>]/g, '');
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ScheduledPage({ searchParams }: Props) {
  const email = param(searchParams.email);
  const first_name = escapeHtmlText(param(searchParams.first_name));
  const last_name = escapeHtmlText(param(searchParams.last_name));
  const company = escapeHtmlText(param(searchParams.company));
  const industry = param(searchParams.industry);
  const role = param(searchParams.role);
  const primary_goal = param(searchParams.primary_goal);

  if (!email) {
    return (
      <section className="min-h-[calc(100vh-8rem)] bg-[#FDFBF7] flex items-center justify-center px-6 py-16">
        <div className="max-w-[560px] w-full bg-white rounded-2xl shadow-sm border border-[#1B4D5C]/10 p-8 md:p-10 text-center">
          <h1 className="font-display font-bold text-[#1B4D5C] text-[1.75rem] md:text-[2rem] leading-tight tracking-tight mb-4">
            We couldn't find your registration.
          </h1>
          <p className="text-[1rem] md:text-[1.0625rem] leading-relaxed text-[#444] mb-6">
            Please restart from the demo form so we can pre-fill your details on
            the booking page.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-[#F97316] text-white font-semibold hover:bg-[#F97316]/90 transition-colors"
          >
            Restart from the demo form →
          </Link>
        </div>
      </section>
    );
  }

  const bookingUrl = new URL(BOOKING_BASE);
  bookingUrl.searchParams.set('email', email);
  if (first_name) bookingUrl.searchParams.set('first_name', first_name);
  if (last_name) bookingUrl.searchParams.set('last_name', last_name);
  if (company) bookingUrl.searchParams.set('company', company);
  if (industry) bookingUrl.searchParams.set('industry', industry);
  if (role) bookingUrl.searchParams.set('role', role);
  if (primary_goal) bookingUrl.searchParams.set('primary_goal', primary_goal);

  const industryLabel = INDUSTRY_LABELS[industry] || 'your specialty';
  const greetingName = first_name || 'there';

  return (
    <section className="bg-[#FDFBF7] py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="font-display font-bold text-[#1B4D5C] text-[2rem] md:text-[2.5rem] leading-tight tracking-tight mb-4">
            Pick a time, {greetingName} →
          </h1>
          <p className="text-[1.0625rem] md:text-[1.125rem] leading-relaxed text-[#444] max-w-2xl mx-auto mb-3">
            You're one step away. Choose a 30-minute slot that works for you.
          </p>
          <p className="text-[0.9375rem] md:text-[1rem] leading-relaxed text-[#444]/80 max-w-2xl mx-auto">
            After our call, you'll get access to a personalized GrowthOS
            account seeded with sample data for {industryLabel}, so you can
            explore on your own.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#1B4D5C]/10 overflow-hidden">
          <iframe
            src={bookingUrl.toString()}
            title="Book your GrowthOS demo"
            style={{
              width: '100%',
              minHeight: '780px',
              border: 'none',
              background: 'transparent',
            }}
            loading="eager"
          />
        </div>

        <p className="text-center text-[0.875rem] md:text-[0.9375rem] text-[#444]/70 mt-6">
          Need to reschedule later? Use the link in your calendar invite or
          email{' '}
          <a
            href="mailto:brandon@cimagrowth.com"
            className="text-[#F97316] font-medium hover:underline"
          >
            brandon@cimagrowth.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
