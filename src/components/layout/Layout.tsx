import { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import DemoChatWidget from "@/components/demo/DemoChatWidget";
import { supabase } from "@/integrations/supabase/client";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const gtmInjected = useRef(false);

  useEffect(() => {
    if (gtmInjected.current) return;
    gtmInjected.current = true;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
      <DemoChatWidget />
    </div>
  );
};

export default Layout;
