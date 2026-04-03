import type { Metadata } from 'next';
import Blog from '@/views/Blog';

export const metadata: Metadata = {
  title: 'Blog – Healthcare Marketing Insights',
  description: 'Expert strategies and actionable advice for fertility clinics, med spas, and regenerative medicine. Patient engagement best practices and growth tips.',
  keywords: [
    'clinic growth strategies', 'patient engagement tips', 'fertility clinic marketing',
    'med spa growth', 'healthcare marketing blog', 'patient retention strategies',
    'medical practice growth', 'wellness center marketing', 'regenerative medicine marketing',
  ],
  alternates: { canonical: 'https://cimagrowth.com/blog' },
  openGraph: {
    title: 'Blog – Healthcare Marketing Insights',
    description: 'Expert strategies and actionable advice for fertility clinics, med spas, and regenerative medicine.',
    url: 'https://cimagrowth.com/blog',
    images: [{ url: '/og-blog.png' }],
  },
};

export default function Page() {
  return <Blog />;
}
