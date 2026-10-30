import { HOME_COPY } from "@/content/home-specialty";

// The illustrative Keep record, shown on /keep.
const FERTILITY_BEYOND = HOME_COPY.fertility.beyond;

export function KeepRecordPanel({
  caption = FERTILITY_BEYOND.panelCaption,
  tiles = FERTILITY_BEYOND.tiles,
  rows = FERTILITY_BEYOND.rows,
}: {
  caption?: string;
  tiles?: [string, string][];
  rows?: { label: string; value: string; warn: boolean }[];
} = {}) {
  const person = caption.split(" ")[0].toLowerCase();
  return (
    <figure
      aria-label={`Illustrative Keep ${person} record with placeholder values`}
      className="flex flex-col gap-3 rounded-2xl border border-sand bg-paper p-5 text-teal-deep md:p-6"
    >
      <figcaption className="text-[13px] font-bold tracking-[0.06em] text-teal-deep/75">
        {caption} <span className="font-medium">(illustrative)</span>
      </figcaption>
      <div className="grid grid-cols-3 gap-2.5">
        {tiles.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 rounded-xl bg-mist p-3 md:p-3.5">
            <span className="text-xs text-teal-deep/75">{k}</span>
            <span className="text-lg font-bold text-teal md:text-2xl">{v}</span>
          </div>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between gap-3 rounded-xl border border-sand px-4 py-3.5 text-[15px]"
        >
          <span>{r.label}</span>
          <span className={`font-semibold ${r.warn ? "text-clay-ink" : "text-teal"}`}>{r.value}</span>
        </div>
      ))}
    </figure>
  );
}
