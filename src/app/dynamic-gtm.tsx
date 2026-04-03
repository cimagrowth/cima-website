'use client';

import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export function DynamicGTM() {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    supabase
      .from("website_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["gtm_head_code", "gtm_body_code", "custom_head_code"])
      .then(({ data }) => {
        data?.forEach((s) => {
          if (!s.setting_value) return;

          if (s.setting_key === "gtm_head_code" || s.setting_key === "custom_head_code") {
            const container = document.createElement("div");
            container.innerHTML = s.setting_value;
            Array.from(container.childNodes).forEach((node) => {
              document.head.appendChild(node.cloneNode(true));
            });
          }

          if (s.setting_key === "gtm_body_code") {
            const container = document.createElement("div");
            container.innerHTML = s.setting_value;
            Array.from(container.childNodes).forEach((node) => {
              document.body.insertBefore(node.cloneNode(true), document.body.firstChild);
            });
          }
        });
      });
  }, []);

  return null;
}
