import Link from "next/link";
import { STAGE_CROSS_LINKS } from "@/content/map-copy";
import {
  getGrowthosMap,
  getPlatformStats,
  sourceKeysForStages,
  stageHref,
  type StageKey,
} from "@/lib/growthos-map";
import { WRAP } from "@/components/map/ui";
import StageDetail from "@/components/map/StageDetail";
import SourcesList from "@/components/map/SourcesList";
import LeakMapCTA from "@/components/home/LeakMapCTA";

export default async function MapStageView({ stageKey }: { stageKey: StageKey }) {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const index = map.stages.findIndex((s) => s.stage_key === stageKey);
  const stage = map.stages[index];
  if (!stage) return null;
  const prev = map.stages[index - 1];
  const next = map.stages[index + 1];
  const crossLinks = STAGE_CROSS_LINKS[stageKey] ?? [];

  return (
    <>
      <div className={`${WRAP} pt-8 md:pt-12`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2 text-sm text-teal-deep/75">
            <li>
              <Link href="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>
            </li>
            <li>
              <Link href="/map" className="hover:underline">The GrowthOS Map</Link> <span aria-hidden="true">/</span>
            </li>
            <li aria-current="page" className="font-semibold text-teal-deep">{stage.name}</li>
          </ol>
        </nav>
      </div>

      <section aria-label={`Stage ${stage.number}: ${stage.name}`} className="py-10 md:py-14">
        <div className={WRAP}>
          <StageDetail map={map} stage={stage} stats={stats} headingLevel="h1" linkToStagePage={false} />
        </div>
      </section>

      <section aria-labelledby="stage-measure-title" className="border-t border-sand py-12">
        <div className={`${WRAP} grid gap-8 md:grid-cols-2`}>
          <div className="flex flex-col gap-3">
            <h2 id="stage-measure-title" className="text-sm font-bold uppercase tracking-[0.08em] text-teal">
              What GrowthOS measures here
            </h2>
            <ul className="flex flex-wrap gap-2">
              {(stage.metrics ?? []).map((m) => (
                <li key={m} className="rounded-full bg-mist px-3.5 py-2 text-sm font-semibold text-teal">{m}</li>
              ))}
            </ul>
          </div>
          {crossLinks.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-teal">Go deeper</h2>
              <ul className="flex flex-wrap gap-3">
                {crossLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-[44px] items-center rounded-xl border-[1.5px] border-teal px-4 font-semibold text-teal hover:bg-teal/5">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <nav aria-label="Other stages" className="border-t border-sand py-8">
        <div className={`${WRAP} flex flex-col justify-between gap-4 sm:flex-row`}>
          {prev ? (
            <Link href={stageHref(prev.stage_key)} className="font-semibold text-teal hover:underline">
              <span aria-hidden="true">&larr; </span>Stage {prev.number}: {prev.name}
            </Link>
          ) : (
            <Link href="/map#basics" className="font-semibold text-teal hover:underline">
              <span aria-hidden="true">&larr; </span>The Basics
            </Link>
          )}
          <Link href="/map" className="font-semibold text-teal hover:underline">All {map.totals.stages} stages</Link>
          {next ? (
            <Link href={stageHref(next.stage_key)} className="font-semibold text-teal hover:underline">
              Stage {next.number}: {next.name}<span aria-hidden="true"> &rarr;</span>
            </Link>
          ) : (
            <Link href="/map#measure" className="font-semibold text-teal hover:underline">
              Measure<span aria-hidden="true"> &rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      <div className={`${WRAP} border-t border-sand pt-10`}>
        <SourcesList
          map={map}
          sourceKeys={sourceKeysForStages(map, [stage], stats)}
          platformNote={stageKey === "first_response"}
          windowDays={stats.window_days}
        />
      </div>

      <div className="pb-20 md:pb-24">
        <LeakMapCTA />
      </div>
    </>
  );
}
