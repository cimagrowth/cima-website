import type { Metadata } from 'next';
import BlogEditor from '@/views/BlogEditor';

export const metadata: Metadata = {
  title: 'New Blog Post',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BlogEditor />;
}
