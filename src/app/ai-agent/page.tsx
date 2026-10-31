import type { Metadata } from 'next';
import AIAgent from '@/views/AIAgent';
import { formatClinics, formatConversations, getPlatformStats } from '@/lib/growthos-map';

export const metadata: Metadata = {
  title: 'AI Front Desk for Healthcare Clinics: Replies in Seconds, Follows Up for Weeks',
  description: 'Your clinic\'s AI front desk. Responds in seconds, qualifies leads, books appointments 24/7, and hands off with full context.',
  keywords: [
    'AI agent', 'clinic AI', 'patient engagement', 'GoHighLevel AI',
    'medical spa AI', 'fertility clinic automation', 'appointment booking AI',
    'HIPAA compliant AI',
  ],
  alternates: { canonical: 'https://cimagrowth.com/ai-agent' },
  openGraph: {
    title: 'AI Front Desk for Healthcare Clinics: Replies in Seconds, Follows Up for Weeks',
    description: 'Your clinic\'s AI front desk. Responds in seconds, qualifies leads, books appointments 24/7, and hands off with full context.',
    url: 'https://cimagrowth.com/ai-agent',
    siteName: 'Cima Growth Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Front Desk for Healthcare Clinics: Replies in Seconds, Follows Up for Weeks',
    description: 'Your clinic\'s AI front desk. Responds in seconds, qualifies leads, books appointments 24/7, and hands off with full context.',
  },
};

export const revalidate = 3600;

export default async function Page() {
  const stats = await getPlatformStats();
  return (
    <AIAgent
      figures={{
        medianSeconds: stats.median_first_reply_seconds,
        clinics: formatClinics(stats.clinics_active),
        conversations: formatConversations(stats.patient_conversations),
        windowDays: stats.window_days,
      }}
    />
  );
}
