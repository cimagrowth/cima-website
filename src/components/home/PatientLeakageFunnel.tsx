import { AlertTriangle } from "lucide-react";

type StageRow = {
  kind: "stage";
  label: string;
  value: number;
};

type LeakRow = {
  kind: "leak";
  id: 1 | 2;
  drop: number;
  title: string;
  body: string;
};

const rows: Array<StageRow | LeakRow> = [
  { kind: "stage", label: "Inquiry submitted", value: 100 },
  {
    kind: "leak",
    id: 1,
    drop: 35,
    title: "Leak #1 — No follow-up on the initial inquiry.",
    body: "35% of patients never hear back in time and book elsewhere.",
  },
  { kind: "stage", label: "Initial contact made by staff", value: 65 },
  {
    kind: "leak",
    id: 2,
    drop: 45,
    title:
      "Leak #2 — Patient engages briefly, then goes quiet. No one re-engages.",
    body: "This is the single biggest drop in the funnel — the average patient needs 7–12 touchpoints to book, and most clinics stop at 1 or 2.",
  },
  { kind: "stage", label: "Books consultation", value: 20 },
];

const PatientLeakageFunnel = () => {
  return (
    <section
      aria-labelledby="patient-leakage-funnel-heading"
      className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-card p-5 sm:p-6 lg:p-8"
    >
      <h2
        id="patient-leakage-funnel-heading"
        className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-1"
      >
        Patient Leakage Funnel
      </h2>
      <p className="text-sm text-muted-foreground mb-5 sm:mb-6">
        Where the average clinic loses patients — and where GrowthOS closes
        the gap.
      </p>

      <ol role="list" className="space-y-2.5 sm:space-y-3">
        {rows.map((row) =>
          row.kind === "stage" ? (
            <li key={`stage-${row.label}`}>
              <div className="text-[13px] sm:text-sm font-semibold text-foreground mb-1.5">
                {row.label}
              </div>
              <div
                role="img"
                aria-label={`${row.label}: ${row.value} percent of patients`}
                className="h-9 sm:h-10 rounded-md bg-gradient-to-r from-primary to-primary-light flex items-center justify-end pr-2.5 sm:pr-3 shadow-sm min-w-[3.25rem]"
                style={{ width: `${row.value}%` }}
              >
                <span className="text-[11px] sm:text-xs font-bold text-primary-foreground tabular-nums">
                  {row.value}%
                </span>
              </div>
            </li>
          ) : (
            <li
              key={`leak-${row.id}`}
              className="ml-3 sm:ml-5"
              aria-label={`Warning. ${row.title} ${row.body} Drop of ${row.drop} percent.`}
            >
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2">
                <AlertTriangle
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 mt-0.5 text-destructive"
                />
                <p className="text-[11.5px] sm:text-[12px] leading-snug">
                  <span className="sr-only">Warning. </span>
                  <span className="font-semibold text-destructive">
                    {row.title}
                  </span>{" "}
                  <span className="text-foreground/80">{row.body}</span>
                </p>
              </div>
            </li>
          )
        )}
      </ol>

      <p className="mt-5 sm:mt-6 text-[13px] sm:text-sm font-display font-semibold text-primary text-center italic">
        GrowthOS closes both gaps — instant response on every channel, and AI
        nurture that doesn&apos;t fade after day three.
      </p>
    </section>
  );
};

export default PatientLeakageFunnel;
