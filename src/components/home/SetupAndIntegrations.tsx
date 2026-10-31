import { Eyebrow, H2, WRAP } from "@/components/map/ui";
import IntegrationsPanel from "@/components/map/IntegrationsPanel";

export default function SetupAndIntegrations() {
  return (
    <section id="integrations" aria-labelledby="setup-title" className="scroll-mt-24 pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
        <div className="flex flex-col gap-5 lg:col-span-6">
          <Eyebrow>The Basics · Setup</Eyebrow>
          <H2 id="setup-title" className="!text-[clamp(30px,3.6vw,44px)] text-teal-deep">
            Plugs into your EHR and CRM.
          </H2>
          <p className="text-[17px] leading-relaxed text-teal-deep/80">
            Your existing website forms connect from the first day, so every inquiry lands in one inbox. Your
            domain, sending email, texting registration and EHR are checked against the live systems, not
            a checkbox. Guided onboarding then walks your team through the Map, stage by stage.
          </p>
        </div>
        <IntegrationsPanel className="lg:col-span-6" />
      </div>
    </section>
  );
}
