"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Routes that replace the shared closing band (and its first-reply stat) with their own. */
const OVERRIDES = ["/training"];

/** The pre-footer closing band, or the route's own version on the routes listed above. */
export default function RouteClosingBand({ shared, training }: { shared: ReactNode; training: ReactNode }) {
  const path = (usePathname() ?? "").replace(/\/+$/, "");
  return <>{OVERRIDES.includes(path) ? training : shared}</>;
}
