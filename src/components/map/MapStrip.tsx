import Link from "next/link";
import { stageHref, type GrowthosMap, type StageKey } from "@/lib/growthos-map";
import { WRAP } from "./ui";

/** Compact strip of the Map's stage names, each linking to its /map page. */
export default function MapStrip({ map, exclude = [] }: { map: GrowthosMap; exclude?: StageKey[] }) {
  const stages = map.stages.filter((s) => !exclude.includes(s.stage_key));
  return (
    <nav aria-label="The GrowthOS Map" className="border-y border-sand bg-paper py-6">
      <div className={`${WRAP} flex flex-col gap-3 md:flex-row md:items-center md:gap-6`}>
        <Link href="/map" className="shrink-0 text-sm font-bold uppercase tracking-[0.1em] text-clay-ink hover:underline">
          The GrowthOS Map
        </Link>
        <ol className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <li key={s.stage_key}>
              <Link
                href={stageHref(s.stage_key)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sand bg-cream px-3.5 text-sm font-semibold text-teal-deep hover:border-teal"
              >
                <span className="text-xs font-bold text-teal">{s.number}</span>
                {s.name}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
