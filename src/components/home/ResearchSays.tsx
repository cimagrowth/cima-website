import { statFromStage, type GrowthosMap } from "@/lib/growthos-map";
import { SectionHead, WRAP } from "@/components/map/ui";
import StatCard from "@/components/map/StatCard";

/** Stage and source of each research card, in display order. */
const CARDS = [
  { stage: "commit", source: "gameiro" },
  { stage: "treatment", source: "gameiro" },
  { stage: "book", source: "hasvold" },
] as const;

export const RESEARCH_SOURCE_KEYS = CARDS.map((c) => c.source);

export default function ResearchSays({ map }: { map: GrowthosMap }) {
  const stats = CARDS.map((c) => statFromStage(map, c.stage, c.source)).filter(Boolean);
  return (
    <section id="research" aria-labelledby="research-title" className="scroll-mt-24 pb-10 pt-20 md:pt-28">
      <div className={`${WRAP} flex flex-col gap-11`}>
        <SectionHead
          eyebrow="What the research says"
          titleId="research-title"
          title="Patients rarely leave because of the medicine. They leave in the gaps."
          side="Every number here comes from published research, cited in full. Your own numbers come in your Leak Map."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s!} />
          ))}
        </div>
      </div>
    </section>
  );
}
