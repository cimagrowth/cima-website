import type { GrowthosMap } from "@/lib/growthos-map";

/**
 * Full citations, each with its DOI link, for the RPC sources a page renders,
 * plus the note on live platform figures.
 */
export default function SourcesList({
  map,
  sourceKeys,
  platformNote = true,
  windowDays = 90,
  dark = false,
  id = "sources",
}: {
  map: GrowthosMap;
  sourceKeys: string[];
  platformNote?: boolean;
  windowDays?: number;
  dark?: boolean;
  id?: string;
}) {
  const keys = Array.from(new Set(sourceKeys)).filter((k) => k !== "leak" && map.sources[k]);
  if (keys.length === 0 && !platformNote) return null;
  const text = dark ? "text-paper/75" : "text-teal-deep/75";
  const link = dark ? "text-clay-soft underline-offset-2 hover:underline" : "text-teal underline underline-offset-2";
  return (
    <section aria-labelledby={`${id}-title`} id={id} className="flex flex-col gap-3">
      <h2 id={`${id}-title`} className={`text-sm font-bold ${dark ? "text-paper" : "text-teal-deep"}`}>
        Sources
      </h2>
      <ol className={`flex flex-col gap-2 text-[13px] leading-relaxed ${text}`}>
        {keys.map((k) => {
          const s = map.sources[k];
          return (
            <li key={k}>
              {s.citation}{" "}
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener" className={link}>
                  {s.url.replace("https://doi.org/", "doi:")}
                </a>
              )}
            </li>
          );
        })}
        {platformNote && (
          <li>
            Platform figures: live GrowthOS data for active clinic accounts, last {windowDays} days,
            refreshed daily.
          </li>
        )}
      </ol>
    </section>
  );
}
