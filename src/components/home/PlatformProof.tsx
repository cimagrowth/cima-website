import {
  formatClinics,
  formatConversations,
  formatPct,
  type PlatformStats,
} from "@/lib/growthos-map";
import { WRAP } from "@/components/map/ui";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";

/** Four live figures from get_public_platform_stats. Nothing here is hardcoded. */
export default function PlatformProof({
  stats,
  copy = HOME_COPY.fertility.proof,
}: {
  stats: PlatformStats;
  copy?: HomeCopy["proof"];
}) {
  const figures = [
    { value: `${stats.median_first_reply_seconds} sec`, label: copy.reply },
    {
      value: formatPct(stats.pct_first_reply_under_60s),
      label: copy.under60,
    },
    {
      value: formatConversations(stats.patient_conversations),
      label: copy.conversations.replace("{days}", String(stats.window_days)),
    },
    { value: formatClinics(stats.clinics_active), label: `clinic accounts live in ${stats.countries} countries` },
  ];
  return (
    <section id="platform" aria-label="GrowthOS platform figures" className={WRAP}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-[20px] border border-sand bg-paper px-6 py-8 md:px-10 lg:grid-cols-4 lg:gap-8">
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col-reverse justify-end gap-1.5">
            <dt className="text-[15px] leading-snug text-teal-deep/80">{f.label}</dt>
            <dd className="font-display text-[clamp(32px,3.6vw,44px)] font-semibold text-teal">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-teal-deep/75">
        Live GrowthOS figures, active clinic accounts only, last {stats.window_days} days. First reply
        measured on text, WhatsApp, web chat and social messages.
      </p>
    </section>
  );
}
