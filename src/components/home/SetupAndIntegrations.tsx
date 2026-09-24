import { Eyebrow, H2, WRAP } from "@/components/map/ui";
import IntegrationsPanel from "@/components/map/IntegrationsPanel";

export const SETUP_STEPS = [
  "Connect the forms and campaigns you already run",
  "Verify domains, email and texting registration",
  "Train the AI on your clinic, services and voice",
  "Turn on each stage of the Map, in order",
];

export function SetupSteps() {
  return (
    <ol className="flex flex-col gap-2.5">
      {SETUP_STEPS.map((step, i) => (
        <li key={step} className="flex items-center gap-3 text-base text-teal-deep">
          <span
            aria-hidden="true"
            className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-white"
          >
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}

export default function SetupAndIntegrations() {
  return (
    <section id="integrations" aria-labelledby="setup-title" className="scroll-mt-24 pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
        <div className="flex flex-col gap-5 lg:col-span-6">
          <Eyebrow>The Basics · Setup</Eyebrow>
          <H2 id="setup-title" className="!text-[clamp(30px,3.6vw,44px)] text-teal-deep">
            We connect the plumbing first, and prove it works.
          </H2>
          <p className="text-[17px] leading-relaxed text-teal-deep/80">
            Your existing website forms start sending leads in on day one. Your domain, sending email,
            texting registration and EHR are checked against the live systems, not a checkbox. Then we
            walk your team through the Map, stage by stage.
          </p>
          <SetupSteps />
        </div>
        <IntegrationsPanel className="lg:col-span-6" />
      </div>
    </section>
  );
}
