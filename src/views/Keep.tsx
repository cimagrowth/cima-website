import Link from "next/link";
import { KEEP_COPY, STAGE_COPY } from "@/content/map-copy";
import {
  displayStatsForStage,
  findStage,
  getGrowthosMap,
  getPlatformStats,
  sourceKeysForStages,
  stageHref,
} from "@/lib/growthos-map";
import { BTN_OUTLINE, BTN_PRIMARY, Eyebrow, H2, SectionHead, WRAP } from "@/components/map/ui";
import StatCard from "@/components/map/StatCard";
import SourcesList from "@/components/map/SourcesList";
import { FeatureList } from "@/components/map/StageDetail";
import { KeepRecordPanel } from "@/components/home/BeyondTheBooking";

export default async function KeepView() {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const stage = findStage(map, "after_cycle");
  if (!stage) return null;
  const leak = stage.leaks[0];
  const statCards = displayStatsForStage(map, stage, stats);
  const outreach = stage.features.find((f) => /outreach/i.test(f.name));
  const research = stage.features.find((f) => /research/i.test(f.name));

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="keep-title" className="pb-14 pt-6 md:pb-20 md:pt-10">
        <div className={`${WRAP} grid items-center gap-10 lg:grid-cols-12`}>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Eyebrow as="span" className="!text-[13px]">
                <Link href={stageHref("after_cycle")} className="hover:underline">
                  Stage {stage.number} · {stage.name}
                </Link>{" "}
                · {leak?.name}
              </Eyebrow>
              <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-teal">INCLUDED IN EVERY PLAN</span>
            </div>
            <h1
              id="keep-title"
              className="font-display text-[clamp(38px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em] text-teal-deep"
            >
              Keep. For every egg, embryo and sample still in your tanks.
            </h1>
            <p className="text-lg leading-relaxed text-teal-deep/80">{KEEP_COPY.body}</p>
            <p className="text-base font-semibold text-teal-deep">
              Keep is included in every GrowthOS plan. It is not an add-on.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className={BTN_PRIMARY}>
                Book a demo
              </Link>
              <Link href="/map" className={BTN_OUTLINE}>
                See the whole Map
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <KeepRecordPanel />
          </div>
        </div>
      </section>

      {/* The leak */}
      <section aria-labelledby="keep-leak-title" className="bg-teal-deep py-20 text-paper md:py-24">
        <div className={`${WRAP} flex flex-col gap-12`}>
          <SectionHead
            dark
            eyebrow={`The leak · ${leak?.name ?? ""}`}
            titleId="keep-leak-title"
            title={STAGE_COPY.after_cycle.leak}
            side={`What good looks like: ${stage.ideal}`}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {statCards.map((s) => (
              <StatCard key={s.sourceKey} stat={s} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="keep-features-title" className="py-20 md:py-24">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <SectionHead
            eyebrow="How Keep works"
            titleId="keep-features-title"
            title="A ledger, a voice and a record for every stored specimen."
            side={STAGE_COPY.after_cycle.fix}
          />
          <FeatureList stage={stage} headingLevel="h3" />
        </div>
      </section>

      {/* Grief-aware pause */}
      <section aria-labelledby="keep-grief-title" className="border-t border-sand py-20 md:py-24">
        <div className={`${WRAP} grid gap-8 lg:grid-cols-12 lg:gap-10`}>
          <div className="flex flex-col gap-4 lg:col-span-6">
            <Eyebrow>Grief-aware by design</Eyebrow>
            <H2 id="keep-grief-title" className="text-teal-deep">It stops when it should.</H2>
          </div>
          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-teal-deep/80 lg:col-span-6">
            <p>
              Keep pauses automatically after a known loss. Anniversary messages and renewal nudges
              stop, and the conversation is handed to a person on your team when it matters.
            </p>
            {outreach && <p>{outreach.description}</p>}
          </div>
        </div>
      </section>

      {/* Research log */}
      <section aria-labelledby="keep-research-title" className="border-t border-sand py-20 md:py-24">
        <div className={`${WRAP} grid gap-8 lg:grid-cols-12 lg:gap-10`}>
          <div className="flex flex-col gap-4 lg:col-span-6">
            <Eyebrow>The research log</Eyebrow>
            <H2 id="keep-research-title" className="text-teal-deep">Every touch is logged, so you can measure who returns.</H2>
          </div>
          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-teal-deep/80 lg:col-span-6">
            {research && <p>{research.description}</p>}
            <p>What Keep measures:</p>
            <ul className="flex flex-wrap gap-2">
              {(stage.metrics ?? []).map((m) => (
                <li key={m} className="rounded-full bg-mist px-3.5 py-2 text-sm font-semibold text-teal">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className={`${WRAP} border-t border-sand pt-12`}>
        <SourcesList
          map={map}
          sourceKeys={sourceKeysForStages(map, [stage], stats)}
          platformNote={false}
        />
      </div>

      {/* CTA */}
      <section aria-labelledby="keep-cta-title" className="pb-20 pt-16 md:pb-24">
        <div className={WRAP}>
          <div className="flex flex-col items-start gap-5 rounded-[26px] bg-clay-wash p-7 md:p-14">
            <h2 id="keep-cta-title" className="font-display text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] text-teal-deep">
              See Keep on your own storage list.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-teal-deep/80">
              Keep is included in every plan. Book a demo and we will walk through how it syncs with your
              lab system and what your patients would see.
            </p>
            <Link href="/demo" className={BTN_PRIMARY}>
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
