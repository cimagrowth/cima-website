import type { Metadata } from 'next';
import Blog from '@/views/Blog';
import { getPublishedPosts } from '@/lib/blog-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog – Cima Growth Solutions',
  description: 'Insights on AI, patient acquisition strategies, and clinic growth.',
  keywords: [
    'clinic growth strategies', 'patient engagement tips', 'fertility clinic marketing',
    'med spa growth', 'healthcare marketing blog', 'patient retention strategies',
    'medical practice growth', 'wellness center marketing', 'regenerative medicine marketing',
  ],
  alternates: { canonical: 'https://cimagrowth.com/blog' },
  openGraph: {
    title: 'Blog – Cima Growth Solutions',
    description: 'Insights on AI, patient acquisition strategies, and clinic growth.',
    url: 'https://cimagrowth.com/blog',
    siteName: 'Cima Growth Solutions',
    images: [
      {
        url: '/og/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Blog – Cima Growth Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog – Cima Growth Solutions',
    description: 'Insights on AI, patient acquisition strategies, and clinic growth.',
    images: ['/og/og-blog.png'],
  },
};

export default async function Page() {
  const posts = await getPublishedPosts(24);
  return <Blog posts={posts} />;
}
