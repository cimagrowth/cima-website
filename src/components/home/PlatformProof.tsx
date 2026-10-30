import { WRAP } from "@/components/map/ui";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { SITE_SHORT, SITE_STATS } from "@/lib/site-stats";

/** The home stat bar. Values come from lib/site-stats.ts; the sources sit directly under it. */
export default function PlatformProof({ copy = HOME_COPY.fertility.proof }: { copy?: HomeCopy["proof"] }) {
  const figures = [
    ...(copy.paidTreatment
      ? [
          {
            value: SITE_STATS.daysToPaidTreatment.value,
            label: "Average time from first contact to paid treatment, at a multi-location fertility network on GrowthOS",
          },
        ]
      : []),
    { value: SITE_STATS.firstReply.value, label: copy.reply },
    { value: SITE_SHORT.clinics, label: copy.clinics },
    { value: SITE_SHORT.conversations, label: copy.conversations },
  ];
  return (
    <section id="platform" aria-label="GrowthOS platform figures" className={WRAP}>
      <dl
        className={`grid grid-cols-2 gap-x-6 gap-y-8 rounded-[20px] border border-sand bg-paper px-6 py-8 md:px-10 lg:gap-8 ${
          figures.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col-reverse justify-end gap-1.5">
            <dt className="text-[15px] leading-snug text-teal-deep/80">{f.label}</dt>
            <dd className="font-display text-[clamp(32px,3.6vw,44px)] font-semibold text-teal">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-teal-deep/75">
        Live GrowthOS figures, active clinic accounts only, last 90 days. First reply measured on text,
        WhatsApp, web chat and social messages.
        {copy.paidTreatment &&
          " Paid-treatment figure: average days from first contact to treatment sold, one multi-location fertility network."}
      </p>
    </section>
  );
}
