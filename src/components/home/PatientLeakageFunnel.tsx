import { Check } from "lucide-react";

type Stage = {
  group: "Drive" | "Capture" | "Grow";
  name: string;
  value: number;
  leak: string;
  seal: string;
};

const stages: Stage[] = [
  {
    group: "Drive",
    name: "Demand",
    value: 100,
    leak: "Ads aren't running, aren't compliant, or aren't optimized, so the right patients never find you.",
    seal: "AI Media Buyer builds, launches, and optimizes Google + Meta daily.",
  },
  {
    group: "Capture",
    name: "Inquiry",
    value: 65,
    leak: "35% of patients never hear back in time and book elsewhere.",
    seal: "AI Front Desk answers in seconds, on every channel, 24/7.",
  },
  {
    group: "Capture",
    name: "Nurture",
    value: 40,
    leak: "The patient engages once, then goes quiet. The biggest drop in the funnel — the average patient needs 7–12 touchpoints to book, and most clinics stop at 1–2.",
    seal: "AI Nurture Rep follows up 7–12 times and never fades.",
  },
  {
    group: "Grow",
    name: "Retention",
    value: 20,
    leak: "The patient books once and never comes back; no one re-engages dormant patients.",
    seal: "Reactivation campaigns + clinical-journey nurture bring them back.",
  },
  {
    group: "Grow",
    name: "Referral",
    value: 12,
    leak: "Happy patients leave without ever being asked for a review or referral.",
    seal: "AI Reputation Manager turns them into reviews and referrals automatically.",
  },
];

const PatientLeakageFunnel = () => {
  return (
    <section
      aria-labelledby="patient-leakage-funnel-heading"
      className="bg-paper rounded-xl2 border border-sand shadow-[var(--shadow)] p-5 sm:p-6 lg:p-8"
    >
      <h2
        id="patient-leakage-funnel-heading"
        className="font-ui text-xs font-semibold uppercase tracking-[.16em] text-clay mb-1"
      >
        The Leak Map
      </h2>
      <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
        Where clinics lose patients — and where GrowthOS seals each leak.
      </p>

      <ol role="list" className="space-y-4 sm:space-y-5">
        {stages.map((stage, i) => {
          const isGroupStart = i === 0 || stages[i - 1].group !== stage.group;
          return (
            <li key={stage.name}>
              {isGroupStart && (
                <div className="font-ui text-[11px] sm:text-xs font-bold uppercase tracking-[.18em] text-clay mb-2">
                  {stage.group}
                </div>
              )}

              <div className="font-ui text-[13px] sm:text-sm font-semibold text-teal-deep mb-1.5">
                {stage.name}
              </div>
              <div
                role="img"
                aria-label={`${stage.name}: ${stage.value} percent of patients`}
                className="h-9 sm:h-10 rounded-md bg-teal flex items-center justify-end pr-2.5 sm:pr-3 min-w-[3.25rem] mb-2"
                style={{ width: `${stage.value}%` }}
              >
                <span className="text-[11px] sm:text-xs font-bold text-paper tabular-nums">
                  {stage.value}%
                </span>
              </div>

              <div className="ml-3 sm:ml-5 space-y-1.5">
                <div
                  className="flex items-start gap-2 rounded-md border border-sand border-l-[3px] border-l-clay bg-cream px-3 py-2"
                  aria-label={`Leak. ${stage.leak}`}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 mt-1.5 rounded-full bg-clay"
                  />
                  <p className="text-[11.5px] sm:text-[12px] leading-snug">
                    <span className="sr-only">Leak. </span>
                    <span className="font-semibold text-clay">Leak — </span>
                    <span className="text-teal-deep/80">{stage.leak}</span>
                  </p>
                </div>

                <div
                  className="flex items-start gap-2 rounded-md border border-mist border-l-[3px] border-l-teal bg-mist/40 px-3 py-2"
                  aria-label={`Seal. ${stage.seal}`}
                >
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 mt-0.5 text-teal"
                  />
                  <p className="text-[11.5px] sm:text-[12px] leading-snug">
                    <span className="sr-only">Seal. </span>
                    <span className="font-semibold text-teal">Seal — </span>
                    <span className="text-teal-deep/80">{stage.seal}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 sm:mt-6 text-[13px] sm:text-sm font-ui font-semibold text-teal text-center italic">
        Five leaks, one platform. GrowthOS seals every stage — Drive, Capture,
        Grow.
      </p>
    </section>
  );
};

export default PatientLeakageFunnel;
