'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTopOnNavigate = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTopOnNavigate;
