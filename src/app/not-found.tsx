import type { Metadata } from 'next';
import NotFound from '@/views/NotFound';

export const metadata: Metadata = {
  title: 'Page Not Found | GrowthOS',
  description: "The page you're looking for doesn't exist. Return to the GrowthOS homepage to explore our AI-powered patient engagement platform.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
