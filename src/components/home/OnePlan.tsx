import Link from "next/link";
import { BTN_PRIMARY, Eyebrow, WRAP } from "@/components/map/ui";

const ADD_ONS = [
  { name: "Voice AI" },
  { name: "Patient Waiting Room" },
  { name: "Telehealth" },
  { name: "Custom AI Agent" },
  { name: "Consent & Education" },
];

/** One plan, no prices. Pricing is shared in the demo. */
export default function OnePlan() {
  return (
    <section aria-labelledby="plan-title" className="pb-10 pt-20 md:pt-24">
      <div className={WRAP}>
        <div className="grid gap-10 rounded-[26px] bg-teal-deep p-6 text-paper md:p-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Eyebrow tone="soft">One plan</Eyebrow>
            <h2 id="plan-title" className="text-paper font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05]">
              One plan. The whole platform.
            </h2>
            <p className="text-[17px] leading-relaxed text-paper/85">
              Every step above, the AI and Keep, included. Pricing depends on your clinic and number of
              locations, and we share it in your demo. Monthly, six-month and annual terms.
            </p>
            <Link href="/demo" className={`${BTN_PRIMARY} mt-2 self-start md:text-[17px]`}>
              Book a demo
            </Link>
          </div>
          <div className="flex flex-col gap-3.5 lg:col-span-7">
            <h3 className="text-[13px] font-bold tracking-[0.08em] text-mist">ADD WHERE YOU NEED MORE</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ADD_ONS.map((a) => (
                <li key={a.name} className="flex flex-col gap-1 rounded-[14px] bg-white/10 px-5 py-4">
                  <span className="text-[17px] font-semibold">{a.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
