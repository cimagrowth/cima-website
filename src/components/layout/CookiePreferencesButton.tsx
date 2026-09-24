'use client';

export default function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.reopenCookieConsent?.()} className={className}>
      Cookie Preferences
    </button>
  );
}
