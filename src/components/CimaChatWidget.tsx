'use client';

import { useEffect } from 'react';

const WIDGET_SRC =
  'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f';

export function CimaChatWidget() {
  useEffect(() => {
    if (document.querySelector('script[data-cima-chat-widget]')) return;

    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.cimaChatWidget = 'true';
    document.body.appendChild(script);
  }, []);

  return null;
}
