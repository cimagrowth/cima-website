import type { Metadata } from 'next';
import { Suspense } from 'react';
import Register from '@/views/Register';

export const metadata: Metadata = {
  title: 'Sign Up – GrowthOS',
  description: 'Set up your clinic on GrowthOS. Fill out your details and continue to checkout.',
  alternates: { canonical: 'https://cimagrowth.com/sign-up/register' },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
      <Register />
    </Suspense>
  );
}
