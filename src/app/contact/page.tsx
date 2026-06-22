import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact | Cima Growth Solutions',
  description:
    "Get in touch with Cima Growth Solutions. Tell us what you're working on and we'll get back to you within one business day.",
  alternates: { canonical: 'https://cimagrowth.com/contact' },
  openGraph: {
    title: 'Contact Cima Growth Solutions',
    description: 'Get in touch with Cima Growth Solutions.',
    url: 'https://cimagrowth.com/contact',
    siteName: 'Cima Growth Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Cima Growth Solutions',
    description: 'Get in touch with Cima Growth Solutions.',
  },
};

export default function Page() {
  return <Contact />;
}
