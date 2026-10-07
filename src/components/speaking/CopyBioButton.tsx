'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { BTN_OUTLINE } from '@/components/map/ui';

/** Copies a bio to the clipboard. Falls back to selecting the bio text. */
export default function CopyBioButton({ text, targetId, label }: { text: string; targetId: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  function selectText() {
    const el = document.getElementById(targetId);
    const selection = window.getSelection();
    if (!el || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      selectText();
    }
  }

  return (
    <button type="button" onClick={handleClick} aria-label={label} className={`${BTN_OUTLINE} gap-2 dark:border-white/60 dark:text-white dark:hover:bg-white/10`}>
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
