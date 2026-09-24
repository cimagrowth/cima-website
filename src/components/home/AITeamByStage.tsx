import { SectionHead, WRAP } from "@/components/map/ui";

const TEAM = [
  { stage: "STAGE 1 · GET FOUND", name: "AI Media Buyer", desc: "Builds, launches and optimizes your Google and Meta ads with healthcare-compliant copy." },
  { stage: "STAGE 2 · FIRST RESPONSE", name: "AI Front Desk", desc: "Answers every inquiry in seconds on every channel, qualifies, books and knows when to hand off." },
  { stage: "STAGE 3 · NURTURE", name: "AI Nurture Rep", desc: "Follows up across days and weeks, adapting tone to where the patient is emotionally." },
  { stage: "STAGE 4 · BOOK AND SHOW UP", name: "AI Staff", desc: "Reads the full history before a consult, a crisis or a hot lead, and hands your team a written briefing." },
  { stage: "STAGE 7 · AFTER THE CYCLE", name: "Keep", desc: "Checks in with every patient who has eggs, embryos or samples in storage, for as long as they are stored." },
  { stage: "STAGE 8 · ADVOCATE", name: "AI Reputation Manager", desc: "Asks happy patients for reviews at the right moment and drafts your replies." },
];

export default function AITeamByStage() {
  return (
    <section aria-labelledby="team-title" className="pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} flex flex-col gap-10`}>
        <SectionHead
          eyebrow="Your AI team"
          titleId="team-title"
          title="You are not buying software to run. You are staffing every stage."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((t) => (
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
