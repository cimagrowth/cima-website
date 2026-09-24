import type { DisplayStat } from "@/lib/growthos-map";

export default function StatCard({ stat, dark = false }: { stat: DisplayStat; dark?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-[18px] p-7 md:p-8 ${
        dark ? "bg-paper/[0.06] text-paper" : "border border-sand bg-paper text-teal-deep"
      }`}
    >
      <p
        className={`font-display text-[clamp(44px,5vw,58px)] font-bold leading-none ${
          dark ? "text-clay-soft" : "text-teal"
        }`}
      >
        {stat.value}
      </p>
      <p className="text-[17px] leading-normal">
        {stat.label}
        {stat.subline ? `. ${stat.subline}.` : "."}
      </p>
      <p className={`text-[13px] ${dark ? "text-paper/70" : "text-teal-deep/70"}`}>{stat.sourceLabel}</p>
    </div>
  );
}
