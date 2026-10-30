import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BTN_PRIMARY, H2, SectionHead, WRAP } from "@/components/map/ui";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { SITE_STATS } from "@/lib/site-stats";

/** The growth side of the platform, shown after the journey cards. */
const aroundItems = (person: string, people: string) => [
  {
    title: "Campaign builder",
    body: "Launch a full campaign (landing page, ad copy, follow-up) in one afternoon.",
  },
  {
    title: "Ads in your own accounts",
    body: "Run Google and Meta ads and see spend against booked consults, not clicks.",
  },
  {
    title: "Referral Partners",
    body: `Track referring physicians, log liaison visits and thank the doctors who send you ${people}.`,
  },
  {
    title: "Reviews",
    body: "Pull in Google reviews, draft replies and ask for new ones at the right moment.",
  },
  { title: "Staff training", body: "Train your team on your own SOPs inside the platform." },
  {
    title: "Reporting",
    body: `See where every ${person} is, how long each stage takes, and where they drop.`,
  },
];

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

      <section id="what-growthos-does" aria-labelledby="does-title" className="scroll-mt-24 pb-10 pt-20 md:pt-24">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <SectionHead titleId="does-title" title={does.title} side={does.lead} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {does.cards.map((c) => (
              <li key={c.title}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col gap-2.5 rounded-[18px] border border-sand bg-paper p-7 transition-colors hover:border-teal/50"
                >
                  <h3 className="text-[22px] font-bold text-teal-deep">{c.title}</h3>
                  <p className="text-base leading-relaxed text-teal-deep/80">{c.body}</p>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-auto h-5 w-5 text-teal transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-teal-deep">{does.ehr}</p>
            <Link href="/map" className="self-start text-base font-semibold text-teal underline underline-offset-2">
              See all eight stages on the GrowthOS Map
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="around-title" className="pb-10 pt-20 md:pt-24">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <SectionHead
            titleId="around-title"
            title={`Plus everything you need to bring ${people} in.`}
            side={`The same platform runs the growth side, so leads and ${people} live in one place.`}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aroundItems(person, people).map((item) => (
              <li key={item.title} className="flex flex-col gap-2 rounded-2xl border border-sand bg-paper p-6">
                <h3 className="text-[17px] font-bold text-teal-deep">{item.title}</h3>
                <p className="text-[15px] leading-normal text-teal-deep/80">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
