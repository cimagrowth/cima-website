"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import type { DisplayStat } from "@/lib/growthos-map";
import { Eyebrow, SectionHead, WRAP } from "@/components/map/ui";

export interface ExplorerStage {
  key: string;
  number: number;
  name: string;
  slug: string;
  leakNames: string;
  leak: string;
  fix: string;
  modules: { name: string; addon: boolean }[];
  stat: DisplayStat | null;
  patientSays: string;
}

/**
 * The interactive GrowthOS Map: eight real ARIA tabs (Radix Tabs, arrow-key
 * navigation) and a detail panel per stage. Every panel is server-rendered so
 * the full Map is in the HTML; inactive panels are hidden.
 */
export default function MapExplorer({
  stages,
  defaultStage = "after_cycle",
  headingLevel = "h2",
}: {
  stages: ExplorerStage[];
  defaultStage?: string;
  headingLevel?: "h2" | "h3";
}) {
  const initial = stages.some((s) => s.key === defaultStage) ? defaultStage : stages[0]?.key;
  const listRef = useRef<HTMLDivElement>(null);

  // On narrow screens the rail scrolls sideways: bring the default stage into
  // view inside the rail without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (list && active && list.scrollWidth > list.clientWidth) {
      list.scrollLeft = active.offsetLeft - list.offsetLeft - 64;
    }
  }, []);

  return (
    <section id="map" aria-labelledby="map-title" className="scroll-mt-24 py-20 md:py-28">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          eyebrow="The GrowthOS Map"
          titleId="map-title"
          title="One map, from the first search to the last stored embryo."
          side="Every stage has a leak. Every leak has a module that closes it. Your onboarding, your reports and your audit all follow the same map."
        />

        <Tabs.Root defaultValue={initial} activationMode="automatic" className="flex flex-col gap-6">
          <Tabs.List
            ref={listRef}
            aria-label="Stages of the GrowthOS Map"
            className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:pb-0"
          >
            {stages.map((s) => (
              <Tabs.Trigger
                key={s.key}
                value={s.key}
                className="flex min-h-[44px] min-w-[148px] shrink-0 snap-start flex-col items-start gap-1.5 rounded-[14px] border-[1.5px] border-sand bg-paper px-3.5 py-3 text-left text-teal-deep transition-colors hover:border-teal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep data-[state=active]:border-teal data-[state=active]:bg-teal data-[state=active]:text-paper lg:min-h-[96px] lg:min-w-0 lg:py-4"
              >
                <span className="text-xs font-bold tracking-[0.06em]">STAGE {s.number}</span>
                <span className="text-base font-semibold leading-tight">{s.name}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {stages.map((s) => {
            const Heading = headingLevel;
            return (
              <Tabs.Content
                key={s.key}
                value={s.key}
                forceMount
                className="grid gap-8 rounded-3xl border border-sand bg-paper p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal data-[state=inactive]:hidden md:p-12 lg:min-h-[380px] lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex flex-col gap-5 lg:col-span-7">
                  <Heading className="text-sm font-bold uppercase tracking-[0.08em] text-teal">
                    <Link href={`/map/${s.slug}`} className="hover:underline">
                      Stage {s.number} · {s.name}
                    </Link>
                  </Heading>
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-clay-ink">
                      The leak · {s.leakNames}
                    </p>
                    <p className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-snug text-teal-deep">
                      {s.leak}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[13px] font-bold tracking-[0.06em] text-teal">HOW GROWTHOS CLOSES IT</p>
                    <p className="text-base leading-relaxed text-teal-deep/80 md:text-lg">{s.fix}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2" aria-label={`Modules for ${s.name}`}>
                    {s.modules.map((m) => (
                      <li
                        key={m.name}
                        className="flex items-center gap-2 rounded-full bg-mist px-3.5 py-2 text-sm font-semibold text-teal"
                      >
                        {m.name}
                        {m.addon && (
                          <span className="rounded-full bg-clay-wash px-2 py-0.5 text-[11px] font-bold text-clay-ink">
                            ADD-ON
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center gap-3.5 rounded-[18px] bg-teal-deep p-7 text-paper md:p-9 lg:col-span-5">
                  {s.stat ? (
                    <>
                      <p className="font-display text-[clamp(48px,6vw,64px)] font-semibold leading-none text-clay-soft">
                        {s.stat.value}
                      </p>
                      <p className="text-lg leading-normal">
                        {s.stat.label}.{s.stat.subline ? ` ${s.stat.subline}.` : ""}
                      </p>
                      <p className="text-[13px] leading-normal text-paper/70">{s.stat.sourceLabel}</p>
                    </>
                  ) : (
                    <>
                      <Eyebrow tone="soft" className="!text-[13px] !tracking-[0.08em]">
                        What the patient is thinking
                      </Eyebrow>
                      <p className="font-display text-[clamp(24px,2.8vw,32px)] leading-snug">
                        &ldquo;{s.patientSays}&rdquo;
                      </p>
                    </>
                  )}
                </div>
              </Tabs.Content>
            );
          })}
        </Tabs.Root>

        <p className="text-[15px] leading-relaxed text-teal-deep/75">
          Two layers sit around the journey: the Basics (domains, email, texting registration,
          integrations, team), set up and verified before anything else, and Measure (reports, funnel
          stages, goals), which times every stage.{" "}
          <Link href="/map#basics" className="font-semibold text-teal underline underline-offset-2">
            See how setup works
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
