// The four onboarding steps, shown on /demo and /map.

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
