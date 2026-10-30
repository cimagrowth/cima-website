import Link from "next/link";
import { BTN_PRIMARY, H2, WRAP } from "@/components/map/ui";
import { GrowthSide, JourneyCards } from "@/components/home/WhatGrowthOSDoes";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { SITE_STATS } from "@/lib/site-stats";

/** Home page story: the problem, what GrowthOS does, the growth side, and the result. */
export default function HomeStory({
  copy = HOME_COPY.fertility.story,
  person = "patient",
  people = "patients",
}: {
  copy?: HomeCopy["story"];
  person?: string;
  people?: string;
}) {
  const { problem, does, result } = copy;
  return (
    <>
      <section aria-labelledby="problem-title" className="pb-10 pt-20 md:pt-28">
        <div className={`${WRAP} flex flex-col gap-6`}>
          <H2 id="problem-title" className="max-w-[900px] text-teal-deep">
            {problem.title}
          </H2>
          <p className="max-w-[820px] text-[17px] leading-relaxed text-teal-deep/80 md:text-lg">{problem.body}</p>
        </div>
      </section>

      <JourneyCards does={does} />
      <GrowthSide person={person} people={people} />

      <section aria-labelledby="result-title" className="mt-10 bg-teal-deep py-20 text-paper md:mt-20 md:py-28">
        <div className={`${WRAP} flex flex-col gap-6`}>
          <H2 id="result-title" className="max-w-[900px] text-paper">
            {result.title}
          </H2>
          <p className="max-w-[820px] text-[17px] leading-relaxed text-paper/85 md:text-lg">
            {result.body}
            {result.showFertilityResult &&
              " At one multi-location fertility network on GrowthOS, the average time from first contact to paid treatment fell from 120 days to 32."}
          </p>
          {result.showFertilityResult && (
            <p className="max-w-[820px] text-[13px] leading-normal text-paper/70">
              {SITE_STATS.daysToPaidTreatment.source}
            </p>
          )}
          <Link href="/growth" className={`${BTN_PRIMARY} mt-2 self-start md:text-[17px]`}>
            See your numbers in a free Leak Map
          </Link>
        </div>
      </section>
    </>
  );
}
