import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import mapSnapshot from "@/content/growthos-map.snapshot.json";
import { STAGE_COPY, STAGE_HERO } from "@/content/map-copy";
import { MAP_INTRO } from "@/content/specialty-map";
import { GENERAL_LINE_SWAPS } from "@/content/specialty-pages";
import { applySiteCopy, type GrowthosMap } from "@/lib/growthos-map";
import { specializeMap, stageCopyFor } from "@/lib/specialty-map";

const map = applySiteCopy(mapSnapshot as unknown as GrowthosMap);
const FERTILITY_WORDS = /IVF|embryo|egg|sperm|tank|cryo|cycle|transfer|fertility/i;
const OTHERS = ["aesthetics", "regenerative", "wellness"] as const;

// What a page renders from the map. `sources`, `totals` and the changelog are
// left as they are: SourcesList only prints the keys a page asks for.
// Identifiers (stage_key, route, page_key, module_key) are never shown.
const IDENTIFIERS = new Set(["stage_key", "route", "page_key", "module_key"]);
const rendered = (m: GrowthosMap) =>
  JSON.stringify({ stages: m.stages, foundation: m.foundation, stage_order: m.stage_order }, (k, v) =>
    IDENTIFIERS.has(k) ? undefined : v,
  );

describe("specializeMap", () => {
  it("returns fertility unchanged", () => {
    const before = JSON.parse(JSON.stringify(map));
    expect(specializeMap(map, "fertility")).toEqual(before);
    const keys = Object.keys(STAGE_COPY) as (keyof typeof STAGE_COPY)[];
    expect(stageCopyFor("fertility")).toEqual(
      Object.fromEntries(keys.map((k) => [k, { ...STAGE_COPY[k], ...STAGE_HERO[k] }])),
    );
  });

  it.each(OTHERS)("%s has no fertility wording and only general stats", (key) => {
    const m = specializeMap(map, key);
    const json = rendered(m);
    expect(json.match(FERTILITY_WORDS)).toBeNull();
    const sourceKeys = m.stages.flatMap((s) => s.stats.map((x) => x.source_key));
    expect(sourceKeys.every((k) => k === "hasvold")).toBe(true);
    expect(JSON.stringify(Object.values(stageCopyFor(key))).match(FERTILITY_WORDS)).toBeNull();
    expect(JSON.stringify(MAP_INTRO[key]).match(FERTILITY_WORDS)).toBeNull();
  });

  it("never mutates the cached map", () => {
    const before = JSON.stringify(map);
    OTHERS.forEach((k) => specializeMap(map, k));
    expect(JSON.stringify(map)).toBe(before);
  });

  it("uses client wording for aesthetics but keeps product names", () => {
    const m = specializeMap(map, "aesthetics");
    const after = m.stages.find((s) => s.stage_key === "after_cycle")!;
    expect(after.name).toBe("Between treatments");
    expect(m.stages.find((s) => s.stage_key === "treatment")!.features[0].name).toBe("Treatment Coordinator");
    const names = m.stages.flatMap((s) => s.features.map((f) => f.name));
    expect(names).toContain("Patient Waiting Room");
    const descriptions = m.stages.flatMap((s) => [s.ideal, s.nostat ?? "", ...s.features.map((f) => f.description)]);
    expect(descriptions.join(" ")).not.toMatch(/\bpatients?\b/i);
  });
});

describe("GENERAL_LINE_SWAPS", () => {
  const sources = ["Consent", "AIAgent", "AdsPage"]
    .map((v) => readFileSync(`src/views/${v}.tsx`, "utf8"))
    .join("\n");

  it.each(Object.entries(GENERAL_LINE_SWAPS))("%s", (original, swap) => {
    // The original must still be on the page, or the swap silently stops applying.
    expect(sources).toContain(original);
    expect(swap.match(FERTILITY_WORDS)).toBeNull();
  });
});
