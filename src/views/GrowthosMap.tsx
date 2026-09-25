import Link from "next/link";
import {
  getGrowthosMap,
  getPlatformStats,
  sourceKeysForStages,
  stageHref,
} from "@/lib/growthos-map";
import { BTN_OUTLINE, BTN_PRIMARY, Eyebrow, H2, WRAP } from "@/components/map/ui";
import StageDetail from "@/components/map/StageDetail";
import SourcesList from "@/components/map/SourcesList";
import IntegrationsPanel from "@/components/map/IntegrationsPanel";
import { SetupSteps } from "@/components/home/SetupAndIntegrations";
import LeakMapCTA from "@/components/home/LeakMapCTA";

export default async function GrowthosMapView() {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const basics = map.stage_order.find((s) => s.stage_key === "basics");
  const measure = map.stage_order.find((s) => s.stage_key === "measure");
  const journey = map.stage_order
    .filter((o) => o.in_journey)
    .map((o) => map.stages.find((s) => s.stage_key === o.stage_key))
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      {/* Intro */}
      <section aria-labelledby="map-page-title" className="pb-12 pt-6 md:pb-16 md:pt-10">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow>The GrowthOS Map</Eyebrow>
            <h1
              id="map-page-title"
              className="font-display text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.03] tracking-[-0.025em] text-teal-deep"
            >
              The patient journey, and every place it leaks.
            </h1>
            <p className="text-lg leading-relaxed text-teal-deep/80 md:text-xl">
              Patient leakage rarely happens in one place. It happens in the gaps between stages: the
              search that never finds you, the inquiry nobody answers, the consult that never becomes a
              commitment, the embryos that stay in storage while the patient goes quiet. The GrowthOS Map
              names {map.totals.stages} stages and {map.totals.leaks} leaks, and the {map.totals.features}{" "}
              modules that close them. Your onboarding, your reports and your Leak Map all follow it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/growth" className={BTN_PRIMARY}>
                Get your free Leak Map
              </Link>
              <Link href="/demo" className={BTN_OUTLINE}>
                Book a demo
              </Link>
            </div>
          </div>
          <nav aria-label="Stages on this page" className="rounded-[22px] bg-teal-deep p-6 text-paper lg:col-span-5">
            <ol className="flex flex-col gap-1">
              {map.stage_order.map((o) => {
                const stage = map.stages.find((s) => s.stage_key === o.stage_key);
                return (
                  <li key={o.stage_key}>
                    <a
                      href={`#${o.stage_key === "basics" ? "basics" : o.stage_key === "measure" ? "measure" : `stage-${stage?.number}`}`}
                      className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 hover:bg-paper/10"
                    >
                      <span className="w-6 text-[13px] font-bold text-mist">{stage ? stage.number : "·"}</span>
                      <span className="flex-1 font-semibold">{stage ? stage.name : o.short_name}</span>
                      {stage && <span className="text-right text-[13px] text-clay-soft">{stage.leaks[0]?.name}</span>}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </section>

      {/* The Basics */}
      <section id="basics" aria-labelledby="basics-title" className="scroll-mt-24 border-t border-sand py-16 md:py-20">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
          <div className="flex flex-col gap-5 lg:col-span-6">
            <Eyebrow>Before the journey</Eyebrow>
            <H2 id="basics-title" className="text-teal-deep">{basics?.name ?? "Set up the basics"}</H2>
            <p className="text-[17px] leading-relaxed text-teal-deep/80">
              Domains, sending email, texting registration, integrations and your team are set up and
              verified against the live systems before any stage turns on. Your existing website forms
              start sending leads in on day one.
            </p>
            <SetupSteps />
          </div>
          <IntegrationsPanel className="lg:col-span-6" />
          <div className="flex flex-col gap-4 lg:col-span-12">
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-teal">What every stage stands on</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {map.foundation.map((f) => (
                <li key={f.name} className="flex flex-col gap-1.5 rounded-2xl border border-sand bg-paper p-5">
                  <h4 className="font-bold text-teal-deep">{f.name}</h4>
                  <p className="text-[15px] leading-normal text-teal-deep/80">{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The eight stages */}
      {journey.map((stage, i) => (
        <section
          key={stage.stage_key}
          id={`stage-${stage.number}`}
          aria-label={`Stage ${stage.number}: ${stage.name}`}
          className={`scroll-mt-24 py-16 md:py-20 ${i % 2 === 0 ? "border-t border-sand" : "bg-paper/60"}`}
        >
          <div className={WRAP}>
            <StageDetail map={map} stage={stage} stats={stats} />
          </div>
        </section>
      ))}

      {/* Measure */}
      <section id="measure" aria-labelledby="measure-title" className="scroll-mt-24 border-t border-sand py-16 md:py-20">
        <div className={`${WRAP} flex flex-col gap-8`}>
          <div className="flex max-w-3xl flex-col gap-4">
            <Eyebrow>Around the journey</Eyebrow>
            <H2 id="measure-title" className="text-teal-deep">{measure?.name ?? "Measure"}</H2>
            <p className="text-[17px] leading-relaxed text-teal-deep/80">
              Reports, funnel stages and goals time every stage of the Map, so you see where patients
              wait and where they leave. These are the numbers GrowthOS tracks for each stage.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((s) => (
              <li key={s.stage_key} className="flex flex-col gap-2 rounded-2xl border border-sand bg-paper p-5">
                <Link href={stageHref(s.stage_key)} className="text-sm font-bold text-teal hover:underline">
                  {s.number}. {s.name}
                </Link>
                <ul className="flex flex-col gap-1 text-[15px] text-teal-deep/80">
                  {(s.metrics ?? []).map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={`${WRAP} border-t border-sand pt-12`}>
        <SourcesList map={map} sourceKeys={sourceKeysForStages(map, journey, stats)} windowDays={stats.window_days} />
      </div>

      <div className="pb-20 md:pb-24">
        <LeakMapCTA />
      </div>
    </>
  );
}
