import Link from "next/link";
import { STAGE_COPY } from "@/content/map-copy";
import {
  displayStatsForStage,
  stageHref,
  type GrowthosMap,
  type MapStage,
  type PlatformStats,
} from "@/lib/growthos-map";
import StatCard from "./StatCard";

/** Features of a stage, each with its RPC description and an add-on badge. */
export function FeatureList({
  stage,
  columns = 2,
  headingLevel = "h4",
}: {
  stage: MapStage;
  columns?: 2 | 3;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {stage.features.map((f) => (
        <li key={f.name} className="flex flex-col gap-1.5 rounded-2xl border border-sand bg-paper p-5">
          <Heading className="flex flex-wrap items-center gap-2 text-base font-bold text-teal-deep">
            {f.name}
            {f.addon_key && (
              <span className="rounded-full bg-clay-wash px-2 py-0.5 text-[11px] font-bold text-clay-ink">ADD-ON</span>
            )}
          </Heading>
          <p className="text-[15px] leading-normal text-teal-deep/80">{f.description}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * One stage of the Map as a long-form section: leak, patient voice, ideal,
 * public stats with citations, and every feature.
 */
export default function StageDetail({
  map,
  stage,
  stats,
  headingLevel = "h2",
  linkToStagePage = true,
}: {
  map: GrowthosMap;
  stage: MapStage;
  stats: PlatformStats;
  headingLevel?: "h1" | "h2";
  linkToStagePage?: boolean;
}) {
  const Heading = headingLevel;
  const SubHeading = headingLevel === "h1" ? "h2" : "h3";
  const display = displayStatsForStage(map, stage, stats);
  const copy = STAGE_COPY[stage.stage_key];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <p className="text-sm font-bold uppercase tracking-[0.1em] text-clay-ink">Stage {stage.number}</p>
          <Heading className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.06] tracking-[-0.02em] text-teal-deep">
            {stage.name}
          </Heading>
          <ul className="flex flex-col gap-1.5">
            {stage.leaks.map((l) => (
              <li key={l.name} className="text-base text-teal-deep">
                <span className="font-bold text-clay-ink">{l.name}.</span>{" "}
                {!copy?.leak.startsWith(l.description) && (
                  <span className="text-teal-deep/80">{l.description}.</span>
                )}
              </li>
            ))}
          </ul>
          {copy && <p className="font-display text-[clamp(20px,2.2vw,26px)] leading-snug text-teal-deep">{copy.leak}</p>}
        </div>
        <figure className="flex flex-col justify-center gap-3 rounded-[18px] bg-teal-deep p-7 text-paper lg:col-span-5">
          <figcaption className="text-[13px] font-bold tracking-[0.08em] text-clay-soft">WHAT THE PATIENT IS THINKING</figcaption>
          <blockquote className="font-display text-[clamp(22px,2.4vw,28px)] leading-snug">
            &ldquo;{stage.patient_says}&rdquo;
          </blockquote>
        </figure>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl bg-mist p-6">
          <p className="text-[13px] font-bold tracking-[0.06em] text-teal">WHAT GOOD LOOKS LIKE</p>
          <p className="text-base leading-relaxed text-teal-deep md:text-[17px]">{stage.ideal}</p>
        </div>
        {copy && (
          <div className="flex flex-col gap-2 rounded-2xl border border-sand bg-paper p-6">
            <p className="text-[13px] font-bold tracking-[0.06em] text-teal">HOW GROWTHOS CLOSES IT</p>
            <p className="text-base leading-relaxed text-teal-deep/85 md:text-[17px]">{copy.fix}</p>
          </div>
        )}
      </div>

      {display.length > 0 ? (
        <div className={`grid gap-4 ${display.length > 1 ? "md:grid-cols-3" : "md:max-w-md"}`}>
          {display.map((d) => (
            <StatCard key={`${d.sourceKey}-${d.value}`} stat={d} />
          ))}
        </div>
      ) : (
        stage.nostat && (
          <p className="rounded-2xl border border-dashed border-sand p-5 text-[15px] leading-relaxed text-teal-deep/80">
            {stage.nostat}
          </p>
        )
      )}

      <div className="flex flex-col gap-3">
        <SubHeading className="text-sm font-bold uppercase tracking-[0.08em] text-teal">
          Modules in this stage ({stage.features.length})
        </SubHeading>
        <FeatureList stage={stage} headingLevel={headingLevel === "h1" ? "h3" : "h4"} />
      </div>

      {linkToStagePage && (
        <Link href={stageHref(stage.stage_key)} className="self-start font-semibold text-teal underline underline-offset-2">
          More on {stage.name}
        </Link>
      )}
    </div>
  );
}
