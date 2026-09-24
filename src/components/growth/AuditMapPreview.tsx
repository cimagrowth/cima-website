import type { GrowthosMap } from "@/lib/growthos-map";

type PreviewStatus = "open" | "at-risk";

// Example statuses for the sample report, in stage order. Illustrative only.
const EXAMPLE_STATUSES: PreviewStatus[] = [
  "at-risk",
  "open",
  "open",
  "at-risk",
  "at-risk",
  "at-risk",
  "open",
  "at-risk",
];

const STATUS_LABEL: Record<PreviewStatus, string> = { open: "Open", "at-risk": "At risk" };
const STATUS_DOT: Record<PreviewStatus, string> = { open: "bg-clay-deep", "at-risk": "bg-clay-soft" };

/** Static, non-interactive sample of the "Your GrowthOS Map" report page. */
export default function AuditMapPreview({ map }: { map: GrowthosMap }) {
  return (
    <figure
      aria-label="Example report: a sample GrowthOS Map with illustrative stage statuses"
      className="mx-auto mt-10 max-w-3xl rounded-[22px] border border-sand bg-paper p-5 md:mt-12 md:p-8"
    >
      <figcaption className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-clay-wash px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-clay-ink">
          Example report
        </span>
        <span className="flex items-center gap-4 text-xs text-teal-deep/75">
          {(["open", "at-risk"] as PreviewStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[s]}`} />
              {STATUS_LABEL[s]}
            </span>
          ))}
        </span>
      </figcaption>
      <p className="mb-4 font-display text-2xl font-bold text-teal-deep">Your GrowthOS Map</p>
      <ol className="flex flex-col divide-y divide-sand">
        {map.stages.map((stage, i) => {
          const status = EXAMPLE_STATUSES[i] ?? "at-risk";
          return (
            <li key={stage.stage_key} className="grid grid-cols-[auto_1fr] gap-x-3 py-3 sm:grid-cols-[auto_1fr_auto]">
              <span aria-hidden="true" className={`mt-1.5 h-2.5 w-2.5 rounded-full ${STATUS_DOT[status]}`} />
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-teal-deep">
                  {stage.number}. {stage.name}
                  <span className="font-normal text-clay-ink"> · {stage.leaks[0]?.name}</span>
                </p>
                <p className="text-xs text-teal-deep/75">
                  {stage.features.slice(0, 2).map((f) => f.name).join(" · ")}
                </p>
              </div>
              <span className="col-start-2 text-xs font-semibold text-teal-deep/80 sm:col-start-3 sm:text-right">
                {STATUS_LABEL[status]}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
