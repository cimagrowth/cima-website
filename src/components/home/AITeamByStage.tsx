import { SectionHead, WRAP } from "@/components/map/ui";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";

const team = (copy: HomeCopy["team"]) => [
  { stage: "STAGE 1 · GET FOUND", name: "AI Ads Assistant", desc: "Drafts and optimizes campaigns in your clinic's own Google and Meta accounts, with healthcare-compliant copy your team approves." },
  { stage: "STAGE 2 · FIRST RESPONSE", name: "AI Front Desk", desc: "Answers every inquiry in seconds on every channel, qualifies, books and knows when to hand off." },
  { stage: "STAGE 3 · NURTURE", name: "AI Follow-up", desc: copy.nurture },
  { stage: "STAGE 4 · BOOK AND SHOW UP", name: "Consult Briefings", desc: "Reads the full history before a consult, a crisis or a hot lead. Consult Briefings give your team a written summary." },
  { stage: copy.keepStage, name: "Keep", desc: copy.keep },
  { stage: "STAGE 8 · ADVOCATE", name: "AI Reviews", desc: copy.reputation },
];

export default function AITeamByStage({ copy = HOME_COPY.fertility.team }: { copy?: HomeCopy["team"] }) {
  return (
    <section aria-labelledby="team-title" className="pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          eyebrow="Built-in AI agents"
          titleId="team-title"
          title="AI agents built into the software, supervised by your team."
          side="Every stage of GrowthOS has an AI agent. Your staff sets the rules, reviews what goes out, and can take over any conversation."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team(copy).map((t) => (
            <li key={t.name} className="flex flex-col gap-2.5 rounded-[18px] border border-sand bg-paper p-7">
              <p className="self-start rounded-full bg-mist px-2.5 py-1 text-xs font-bold tracking-[0.04em] text-teal">
                {t.stage}
              </p>
              <h3 className="text-[22px] font-bold text-teal-deep">{t.name}</h3>
              <p className="text-base leading-relaxed text-teal-deep/80">{t.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
