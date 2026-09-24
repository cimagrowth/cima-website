import { H2, WRAP } from "@/components/map/ui";

const PILLARS = [
  { title: "HIPAA and BAA", body: "Patient data handled to clinical standard, with a signed BAA." },
  { title: "Consent built in", body: "Texting registration and consent language designed for clinics." },
  { title: "Clinical guardrails", body: "The AI knows what your specialty must never say." },
  { title: "Grief-aware", body: "Outreach pauses after a loss, and tone follows the patient." },
  { title: "Research-grade data", body: "Every stage change is timestamped, so you can measure and publish." },
];

export default function BuiltForHealthcare() {
  return (
    <section aria-labelledby="healthcare-title" className="pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} flex flex-col gap-9`}>
        <H2 id="healthcare-title" className="max-w-[900px] !text-[clamp(30px,3.6vw,44px)] text-teal-deep">
          Built for healthcare from day one, not a generic tool in a lab coat.
        </H2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((p) => (
            <li key={p.title} className="flex flex-col gap-2 rounded-2xl border border-sand bg-paper p-6">
              <h3 className="text-[17px] font-bold text-teal-deep">{p.title}</h3>
              <p className="text-[15px] leading-normal text-teal-deep/80">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
