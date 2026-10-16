import { STAGE_COPY } from "@/content/map-copy";
import { GENERAL_SOURCE_KEYS, type Specialty } from "@/content/specialty";
import { FOUNDATION_OVERRIDES, STAGE_OVERRIDES } from "@/content/specialty-map";
import type { GrowthosMap, MapStage, StageKey } from "@/lib/growthos-map";

/** patient/patients/Patient/Patients to client/clients/Client/Clients. Names are never passed through this. */
const toClient = (text: string) =>
  text.replace(/\b(P|p)atient(s?)\b/g, (_, p: string, s: string) => `${p === "P" ? "C" : "c"}lient${s}`);

/**
 * The GrowthOS Map as a given specialty sees it. Fertility gets the map
 * unchanged; the others get Appendix B overrides, only general research stats,
 * and (aesthetics) "client" wording. Always returns a new object: the cached
 * map is never mutated.
 */
export function specializeMap(map: GrowthosMap, specialty: Specialty): GrowthosMap {
  if (specialty === "fertility") return map;
  const overrides = STAGE_OVERRIDES[specialty];
  const foundation = FOUNDATION_OVERRIDES[specialty];
  const words = specialty === "aesthetics" ? toClient : (t: string) => t;

  const stages: MapStage[] = map.stages.map((stage) => {
    const o = overrides[stage.stage_key] ?? {};
    return {
      ...stage,
      name: o.name ?? stage.name,
      leaks: o.leaks ? o.leaks.map((l) => ({ ...l })) : stage.leaks.map((l) => ({ ...l })),
      patient_says: o.patient_says ?? stage.patient_says,
      ideal: o.ideal ?? words(stage.ideal),
      metrics: o.metrics ? [...o.metrics] : stage.metrics ? [...stage.metrics] : stage.metrics,
      nostat: o.nostat ?? (stage.nostat ? words(stage.nostat) : stage.nostat),
      stats: stage.stats.filter((s) => GENERAL_SOURCE_KEYS.includes(s.source_key)).map((s) => ({ ...s })),
      features: stage.features.map((f) => {
        const fo = o.features?.[f.name];
        return {
          ...f,
          name: fo?.name ?? f.name,
          description: fo?.description ?? words(f.description),
        };
      }),
    };
  });

  return {
    ...map,
    stages,
    stage_order: map.stage_order.map((o) => {
      const name = overrides[o.stage_key as StageKey]?.name;
      return name ? { ...o, name, short_name: name } : { ...o };
    }),
    foundation: map.foundation.map((f) => ({
      ...f,
      description: foundation[f.name]?.description ?? words(f.description),
    })),
  };
}

/** STAGE_COPY with a specialty's leak and fix overrides merged in. */
export function stageCopyFor(specialty: Specialty): Record<StageKey, { leak: string; fix: string }> {
  if (specialty === "fertility") return STAGE_COPY;
  const overrides = STAGE_OVERRIDES[specialty];
  return Object.fromEntries(
    (Object.keys(STAGE_COPY) as StageKey[]).map((k) => [
      k,
      { leak: overrides[k]?.leak ?? STAGE_COPY[k].leak, fix: overrides[k]?.fix ?? STAGE_COPY[k].fix },
    ]),
  ) as Record<StageKey, { leak: string; fix: string }>;
}
