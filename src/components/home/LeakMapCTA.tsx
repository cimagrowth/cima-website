import Link from "next/link";
import { BTN_OUTLINE, BTN_PRIMARY, WRAP } from "@/components/map/ui";

export default function LeakMapCTA() {
  return (
    <section aria-labelledby="leakmap-title" className="pt-20 md:pt-24">
      <div className={WRAP}>
        <div className="grid items-center gap-8 rounded-[26px] bg-clay-wash p-7 md:p-16 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-8">
            <h2
              id="leakmap-title"
              className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-teal-deep"
            >
              Where does your clinic leak?
            </h2>
            <p className="text-lg leading-relaxed text-teal-deep/80">
              Get your free Leak Map: where your clinic loses patients, scored against the clinics we run,
              your 90-day recovery number, and the fixes in order. Results in 48 hours.
            </p>
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
