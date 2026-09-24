import { STAGE_COPY } from "@/content/map-copy";
import {
  leakNames,
  primaryStatForStage,
  stageSlug,
  type GrowthosMap,
  type PlatformStats,
  type StageKey,
} from "@/lib/growthos-map";
import type { ExplorerStage } from "@/components/home/MapExplorer";

/** Serializable stage data for the client MapExplorer. */
export function buildExplorerStages(
  map: GrowthosMap,
  stats: PlatformStats,
  opts: { exclude?: StageKey[] } = {},
): ExplorerStage[] {
  return map.stages
    .filter((s) => !opts.exclude?.includes(s.stage_key))
    .map((s) => ({
      key: s.stage_key,
      number: s.number,
      name: s.name,
      slug: stageSlug(s.stage_key),
      leakNames: leakNames(s),
      leak: STAGE_COPY[s.stage_key]?.leak ?? s.leaks.map((l) => l.description).join(". "),
      fix: STAGE_COPY[s.stage_key]?.fix ?? s.ideal,
      modules: s.features.map((f) => ({ name: f.name, addon: !!f.addon_key })),
      stat: primaryStatForStage(map, s, stats),
      patientSays: s.patient_says,
    }));
}

/** Source keys the MapExplorer renders (one primary stat per stage). */
export const explorerSourceKeys = (stages: ExplorerStage[]) =>
  stages.map((s) => s.stat?.sourceKey).filter((k): k is string => !!k && k !== "platform");
