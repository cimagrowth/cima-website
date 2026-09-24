import Link from "next/link";
import type { GrowthosMap } from "@/lib/growthos-map";
import { BTN_OUTLINE, BTN_PRIMARY, WRAP } from "@/components/map/ui";

export default function HeroMap({ map }: { map: GrowthosMap }) {
  return (
    <section aria-labelledby="hero-title" className="pb-14 pt-12 md:pb-[72px] md:pt-24">
      <div className={`${WRAP} grid items-center gap-10 lg:grid-cols-12 lg:gap-6`}>
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-mist px-3.5 py-2 text-sm font-semibold text-teal">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-clay-deep" />
            The front-end operating system for fertility and specialty clinics
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(40px,6vw,72px)] font-medium leading-[1.02] tracking-[-0.025em] text-teal-deep"
          >
            Your clinic leaks patients at eight stages. GrowthOS closes every one.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-teal-deep/80 md:text-[21px]">
            From the first search to years after treatment. One system runs your ads, answers every
            inquiry, keeps patients moving through consult and treatment, and brings them back for the
            eggs and embryos they already stored.
          </p>
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link href="/growth" className={`${BTN_PRIMARY} md:text-[17px]`}>
              Get your free Leak Map
            </Link>
            <Link href="/demo" className={`${BTN_OUTLINE} md:text-[17px]`}>
              Book a demo
            </Link>
          </div>
          <p className="text-sm text-teal-deep/75">
            See where your clinic leaks, benchmarked against the clinics we run. Results in 48 hours.
          </p>
        </div>

        <div className="flex flex-col gap-3.5 rounded-[22px] bg-teal-deep p-5 text-paper md:p-7 lg:col-span-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-mist">
              <Link href="/map" className="hover:underline">
                The GrowthOS Map
              </Link>
            </p>
            <p className="text-[13px] text-mist">
              {map.totals.stages} stages · {map.totals.leaks} leaks
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {map.stages.map((s) => (
              <li key={s.stage_key} className="flex items-center gap-3.5 rounded-xl bg-paper/[0.05] p-3">
                <span
                  aria-hidden="true"
                  className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-mist/70 text-[13px] font-bold"
                >
                  {s.number}
                </span>
                <span className="flex-1 text-base font-semibold">
                  <span className="sr-only">Stage {s.number}: </span>
                  {s.name}
                </span>
                <span className="text-right text-[13px] text-clay-soft">{s.leaks[0]?.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
