import Link from "next/link";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { findStage, statFromStage, type GrowthosMap } from "@/lib/growthos-map";
import { SectionHead, WRAP } from "@/components/map/ui";
import StatCard from "@/components/map/StatCard";

/** Source keys of the three after_cycle stats, in display order. */
export const BEYOND_SOURCE_KEYS = ["christianson", "lee", "lyerly"];

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

/** Source keys BeyondTheBooking renders for a given copy. */
export const beyondSourceKeys = (copy: HomeCopy["beyond"] = FERTILITY_BEYOND) =>
  copy.showStats ? BEYOND_SOURCE_KEYS : [];

export default function BeyondTheBooking({
  map,
  copy = FERTILITY_BEYOND,
}: {
  map: GrowthosMap;
  copy?: HomeCopy["beyond"];
}) {
  const cards = copy.showStats
    ? BEYOND_SOURCE_KEYS.map((k) => statFromStage(map, "after_cycle", k)).filter(Boolean)
    : [];
  const leak = findStage(map, "after_cycle")?.leaks[0]?.name ?? "";
  return (
    <section aria-labelledby="beyond-title" className="mt-10 bg-teal-deep py-20 text-paper md:mt-20 md:py-28">
      <div className={`${WRAP} flex flex-col gap-14`}>
        <SectionHead
          dark
          eyebrow="Stages 4 to 8"
          titleId="beyond-title"
          title="Everyone else stops at the booking. That is where most of the value is."
          side={copy.side}
        />
        {cards.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((c) => (
              <StatCard key={c!.sourceKey} stat={c!} dark />
            ))}
          </div>
        )}

        <div className="grid items-center gap-8 rounded-[22px] bg-cream p-6 text-teal-deep md:p-11 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-[13px] font-bold tracking-[0.08em] text-clay-ink">
                NEW · STAGE 7 · {leak.toUpperCase()}
              </p>
              <p className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-teal">INCLUDED IN EVERY PLAN</p>
            </div>
            <h3 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.1]">
              {copy.keepTitle}
            </h3>
            <p className="text-[17px] leading-relaxed text-teal-deep/80">{copy.keepBody}</p>
            <Link href="/keep" className="self-start text-base font-semibold text-teal underline underline-offset-2">
              How Keep works
            </Link>
          </div>
          <div className="lg:col-span-6">
            <KeepRecordPanel caption={copy.panelCaption} tiles={copy.tiles} rows={copy.rows} />
          </div>
        </div>
      </div>
    </section>
  );
}
