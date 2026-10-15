"use client";

import Link from "next/link";
import { BTN_OUTLINE, BTN_PRIMARY, WRAP } from "@/components/map/ui";
import { LEAK_CTA } from "@/content/home-specialty";
import { useSpecialty } from "@/contexts/SpecialtyContext";

export default function LeakMapCTA() {
  const { specialty } = useSpecialty();
  const copy = LEAK_CTA[specialty];
  return (
    <section aria-labelledby="leakmap-title" className="pt-20 md:pt-24">
      <div className={WRAP}>
        <div className="grid items-center gap-8 rounded-[26px] bg-clay-wash p-7 md:p-16 lg:grid-cols-12 lg:gap-10">
          <div data-sv-region className="flex flex-col gap-4 lg:col-span-8">
            <h2
              id="leakmap-title"
              className="font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-teal-deep"
            >
              {copy.title}
            </h2>
            <p className="text-lg leading-relaxed text-teal-deep/80">{copy.body}</p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <Link href="/growth" className={`${BTN_PRIMARY} md:text-[17px]`}>
              Get my Leak Map
            </Link>
            <Link href="/demo" className={`${BTN_OUTLINE} md:text-[17px]`}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
