import type { Metadata } from 'next';
import ZoomIntegration from '@/views/ZoomIntegration';

export const metadata: Metadata = {
  title: 'Zoom Integration | GrowthOS',
  description:
    'How to connect, use, and remove the GrowthOS Zoom integration. Required reading for users connecting their Zoom account to GrowthOS for automatic meeting link generation.',
  alternates: { canonical: 'https://www.cimagrowth.com/docs/zoom-integration' },
  openGraph: {
    title: 'Zoom Integration — GrowthOS',
    description: 'How to connect, use, and remove the GrowthOS Zoom integration.',
    url: 'https://www.cimagrowth.com/docs/zoom-integration',
    siteName: 'Cima Growth Solutions',
    type: 'article',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ZoomIntegration />;
}
