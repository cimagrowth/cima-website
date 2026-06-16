type Stage = {
  pillar: "Drive" | "Capture" | "Grow";
  name: string;
  pct: number;
  width: string;
  leak: string;
  fix: string;
};

const stages: Stage[] = [
  {
    pillar: "Drive",
    name: "Demand",
    pct: 100,
    width: "100%",
    leak: "Ads unoptimized — right patients never find you",
    fix: "AI Media Buyer",
  },
  {
    pillar: "Capture",
    name: "Inquiry",
    pct: 65,
    width: "86%",
    leak: "35% never hear back in time → book elsewhere",
    fix: "AI Front Desk, instant",
  },
  {
    pillar: "Capture",
    name: "Nurture",
    pct: 40,
    width: "72%",
    leak: "Goes quiet — needs 7–12 touches, gets 1–2",
    fix: "AI Nurture Rep",
  },
  {
    pillar: "Grow",
    name: "Retention",
    pct: 20,
    width: "56%",
    leak: "Books once, never returns",
    fix: "Reactivation campaigns",
  },
  {
    pillar: "Grow",
    name: "Referral",
    pct: 12,
    width: "42%",
    leak: "Happy patients never asked for a review",
    fix: "AI Reputation Manager",
  },
];

const PatientLeakageFunnel = () => {
  return (
    <section
      aria-labelledby="patient-leak-heading"
      className="bg-paper rounded-[20px] border border-teal/15 pt-[26px] px-6 pb-[22px] shadow-[0_18px_50px_-24px_rgba(27,77,92,.35)]"
    >
      <h2
        id="patient-leak-heading"
        className="font-display font-bold text-[11px] tracking-[.14em] uppercase text-orange"
      >
        The 5-Stage Patient Leak
      </h2>
      <p className="text-[13px] text-[#6B7B80] mt-1 mb-[18px]">
        Where clinics lose patients — and where GrowthOS seals each gap.
      </p>

      <ol role="list" className="flex flex-col gap-3">
        {stages.map((stage, i) => {
          const showPillar =
            i === 0 || stages[i - 1].pillar !== stage.pillar;
          const isLast = i === stages.length - 1;
          return (
            <li key={stage.name} className="relative">
              {showPillar && (
                <div className="font-display text-[9px] font-bold tracking-[.12em] uppercase text-teal/60 mb-[5px]">
                  {stage.pillar}
                </div>
              )}

              <div
                role="img"
                aria-label={`${stage.name}: ${stage.pct} percent of patients`}
                className="h-[34px] rounded-[9px] mx-auto px-[14px] text-white flex items-center justify-between font-display"
                style={{
                  width: stage.width,
                  background: "linear-gradient(90deg,#1B4D5C,#2C6678)",
                }}
              >
                <span className="font-bold text-[14px]">{stage.name}</span>
                <span className="font-extrabold text-[13px] opacity-90 tabular-nums">
                  {stage.pct}%
                </span>
              </div>

              {!isLast && (
                <span
                  aria-hidden="true"
                  className="hero-drip absolute right-[6px] top-[32px] block w-2 h-2 bg-orange opacity-85"
                  style={{
                    borderRadius: "0 50% 50% 50%",
                    transform: "rotate(45deg)",
                  }}
                />
              )}

              <div className="flex gap-[14px] mt-[7px] text-[12px] leading-[1.3]">
                <div className="flex gap-[6px] flex-1 items-start">
                  <span
                    aria-hidden="true"
                    className="flex-none w-[15px] h-[15px] rounded-full grid place-items-center text-[10px] font-bold mt-px bg-orange/15 text-orange"
                  >
                    ✕
                  </span>
                  <span className="text-[#9A5B34]">
                    <span className="sr-only">Leak: </span>
                    {stage.leak}
                  </span>
                </div>
                <div className="flex gap-[6px] flex-1 items-start">
                  <span
                    aria-hidden="true"
                    className="flex-none w-[15px] h-[15px] rounded-full grid place-items-center text-[10px] font-bold mt-px bg-teal/12 text-teal"
                  >
                    ✓
                  </span>
                  <span className="text-teal font-medium">
                    <span className="sr-only">Fix: </span>
                    {stage.fix}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-[18px] pt-[14px] border-t border-dashed border-teal/20 font-display font-bold text-[13px] text-teal flex items-center gap-2">
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-orange shrink-0"
        />
        GrowthOS seals all five — patients stay in the funnel.
      </p>
    </section>
  );
};

export default PatientLeakageFunnel;
