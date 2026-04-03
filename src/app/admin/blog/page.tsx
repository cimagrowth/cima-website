import type { Metadata } from 'next';
import AdminBlog from '@/views/AdminBlog';

export const metadata: Metadata = {
  title: 'Blog Management',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminBlog />;
}
