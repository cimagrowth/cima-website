'use client';

import { useEffect } from 'react';

const WIDGET_SRC =
  'https://momssbzlofjodqodvvvk.supabase.co/functions/v1/chat-widget?org=1372de10-066f-437e-941e-643deefebf2f';

const LOG = '[CimaChatWidget]';

export function CimaChatWidget() {
  useEffect(() => {
    if (document.querySelector('script[data-cima-chat-widget]')) {
      console.log(LOG, 'script already present, skipping');
      return;
    }

    console.log(LOG, 'injecting script', WIDGET_SRC);

    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.cimaChatWidget = 'true';

    script.onload = () => {
      console.log(LOG, 'script onload fired');
      setTimeout(() => {
        const toggle = document.querySelector('#gos-chat-toggle');
        console.log(
          LOG,
          'post-load check → #gos-chat-toggle:',
          toggle,
          'window.__cimaWidgetLoaded:',
          (window as unknown as { __cimaWidgetLoaded?: boolean }).__cimaWidgetLoaded,
        );
      }, 500);
    };

    script.onerror = (e) => {
      console.error(LOG, 'script onerror', e);
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
