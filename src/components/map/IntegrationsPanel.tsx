import { ANY_EHR_LINE, EHR_SYSTEMS, OTHER_CRMS, PRIMARY_CRMS } from "@/content/integrations";

/** "Works with what you run today": CRM row and the public EHR list. */
export default function IntegrationsPanel({ showCrm = true, className = "" }: { showCrm?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-6 rounded-[22px] border border-sand bg-paper p-6 md:p-10 ${className}`}>
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-teal">Works with what you run today</p>
      {showCrm && (
        <div className="flex flex-col gap-2.5">
          <p className="text-[13px] font-bold text-teal-deep/75">CRM</p>
          <ul className="flex flex-wrap gap-2.5">
            {PRIMARY_CRMS.map((n) => (
              <li key={n} className="rounded-xl border-[1.5px] border-teal px-4 py-3 text-[17px] font-bold text-teal">
                {n}
              </li>
            ))}
            {OTHER_CRMS.map((n) => (
              <li key={n} className="rounded-xl border border-sand px-4 py-3 text-base font-semibold text-teal-deep/80">
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-2.5">
        <p className="text-[13px] font-bold text-teal-deep/75">EHR AND PRACTICE SYSTEMS</p>
        <ul className="flex flex-wrap gap-2">
          {EHR_SYSTEMS.map((n) => (
            <li key={n} className="rounded-xl border border-sand px-3.5 py-2.5 text-[15px] font-semibold text-teal-deep/80">
              {n}
            </li>
          ))}
        </ul>
        <p className="text-[15px] font-semibold text-teal">{ANY_EHR_LINE}</p>
      </div>
      {showCrm && (
        <p className="text-[15px] leading-relaxed text-teal-deep/80">
          Replace your CRM, migrate at your own pace, or run GrowthOS alongside it. The AI works inside
          Salesforce, HubSpot and GoHighLevel conversations either way.
        </p>
      )}
    </div>
  );
}
