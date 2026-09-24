// Data layer for the GrowthOS Map and the live platform figures.
//
// Both come from public, anon-executable Supabase RPCs:
//   get_public_platform_map()   the same Map the product's Getting Started page uses
//   get_public_platform_stats() aggregate figures for live clinic accounts only
//
// Every read falls back to a committed snapshot (written only by
// scripts/snapshot-growthos-map.mjs) when the RPC errors, returns empty, or the
// Supabase env vars are missing, so a build never fails and no page renders blank.

import { unstable_cache } from "next/cache";
import mapSnapshot from "@/content/growthos-map.snapshot.json";
import statsSnapshot from "@/content/platform-stats.snapshot.json";

// ---------------------------------------------------------------------------
// Types (only what the site reads)
// ---------------------------------------------------------------------------

export type StageKey =
  | "get_found"
  | "first_response"
  | "nurture"
  | "book"
  | "commit"
  | "treatment"
  | "after_cycle"
  | "advocate";

export interface MapLeak {
  name: string;
  description: string;
}

export interface MapStat {
  label: string;
  value: string;
  source_key: string;
}

export interface MapFeature {
  name: string;
  description: string;
  addon_key: string | null;
  addon_name: string | null;
  status: string;
  module_key: string | null;
}

export interface MapStage {
  stage_key: StageKey;
  number: number;
  name: string;
  patient_says: string;
  ideal: string;
  leaks: MapLeak[];
  stats: MapStat[];
  nostat?: string | null;
  metrics?: string[];
  features: MapFeature[];
}

export interface MapSource {
  url: string | null;
  citation: string;
}

export interface MapFoundationItem {
  name: string;
  description: string;
}

export interface StageOrderItem {
  stage_key: string;
  name: string;
  short_name: string;
  in_journey: boolean;
}

export interface GrowthosMap {
  stages: MapStage[];
  sources: Record<string, MapSource>;
  foundation: MapFoundationItem[];
  stage_order: StageOrderItem[];
  totals: { stages: number; leaks: number; features: number; foundation: number };
  version: string;
  updated_at: string;
}

export interface PlatformStats {
  median_first_reply_seconds: number;
  pct_first_reply_under_60s: number;
  patient_conversations: number;
  clinics_active: number;
  clinics_with_conversations: number;
  countries: number;
  measured_first_replies: number;
  window_days: number;
  window_start: string;
  window_end: string;
  generated_at: string;
}

// ---------------------------------------------------------------------------
// Fetching
// ---------------------------------------------------------------------------

const MAP_SNAPSHOT = mapSnapshot as unknown as GrowthosMap;
const STATS_SNAPSHOT = statsSnapshot as unknown as PlatformStats;

async function callRpc(fn: string): Promise<unknown | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return null;
  }
  try {
    const { supabaseServer } = await import("@/integrations/supabase/server");
    // The generated Database types do not list these RPCs, so call untyped.
    const rpc = supabaseServer.rpc as unknown as (
      name: string,
    ) => Promise<{ data: unknown; error: unknown }>;
    const { data, error } = await rpc.call(supabaseServer, fn);
    if (error || data == null) return null;
    return data;
  } catch {
    return null;
  }
}

function isUsableMap(data: unknown): data is GrowthosMap {
  const m = data as GrowthosMap | null;
  return !!m && Array.isArray(m.stages) && m.stages.length > 0 && !!m.sources;
}

function isUsableStats(data: unknown): data is PlatformStats {
  const s = data as PlatformStats | null;
  return (
    !!s &&
    typeof s.median_first_reply_seconds === "number" &&
    typeof s.pct_first_reply_under_60s === "number" &&
    typeof s.patient_conversations === "number" &&
    s.patient_conversations > 0
  );
}

export const getGrowthosMap = unstable_cache(
  async (): Promise<GrowthosMap> => {
    const data = await callRpc("get_public_platform_map");
    return isUsableMap(data) ? data : MAP_SNAPSHOT;
  },
  ["growthos-map"],
  { revalidate: 3600 },
);

export const getPlatformStats = unstable_cache(
  async (): Promise<PlatformStats> => {
    const data = await callRpc("get_public_platform_stats");
    return isUsableStats(data) ? data : STATS_SNAPSHOT;
  },
  ["platform-stats"],
  { revalidate: 86400 },
);

// ---------------------------------------------------------------------------
// Stage slugs
// ---------------------------------------------------------------------------

export const STAGE_SLUGS: Record<StageKey, string> = {
  get_found: "get-found",
  first_response: "first-response",
  nurture: "nurture-and-qualify",
  book: "book-and-show-up",
  commit: "consult-to-commitment",
  treatment: "in-treatment",
  after_cycle: "after-the-cycle",
  advocate: "advocate-and-return",
};

export const stageSlug = (key: StageKey) => STAGE_SLUGS[key];

export const stageKeyFromSlug = (slug: string): StageKey | undefined =>
  (Object.keys(STAGE_SLUGS) as StageKey[]).find((k) => STAGE_SLUGS[k] === slug);

export const stageHref = (key: StageKey) => `/map/${STAGE_SLUGS[key]}`;

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

/** The internal playbook, not peer reviewed. Never shown on the public site. */
const INTERNAL_SOURCE_KEY = "leak";

export const publicStatsForStage = (stage: MapStage): MapStat[] =>
  stage.stats.filter((s) => s.source_key !== INTERNAL_SOURCE_KEY);

/** A stat as rendered, with its source resolved to a citation. */
export interface DisplayStat {
  value: string;
  label: string;
  subline?: string;
  sourceKey: string | null;
  sourceLabel: string;
}

export const PLATFORM_SOURCE_KEY = "platform";

/** Short in-card citations, keyed by `sources{}` key. Full citations come from the RPC. */
const SHORT_CITATIONS: Record<string, string> = {
  hasvold: "Hasvold and Wootton, J Telemed Telecare, 2011.",
  gameiro: "Gameiro et al., Hum Reprod Update, 2012.",
  christianson: "Christianson et al., F&S Reports, 2020.",
  lee: "Lee et al., Am J Obstet Gynecol, 2025.",
  lyerly: "Lyerly et al., Human Reproduction, 2011.",
};

export function shortCitation(map: GrowthosMap, key: string): string {
  if (SHORT_CITATIONS[key]) return SHORT_CITATIONS[key];
  const full = map.sources[key]?.citation ?? "";
  // Fall back to the author list and year from the full citation.
  const author = full.split(".")[0];
  const year = full.match(/(19|20)\d{2}/)?.[0];
  return [author, year].filter(Boolean).join(", ") + ".";
}

export function platformDisplayStat(stats: PlatformStats): DisplayStat {
  return {
    value: `${stats.median_first_reply_seconds} sec`,
    label: "median GrowthOS first reply to a patient message",
    subline: `About ${Math.floor(stats.pct_first_reply_under_60s)}% are answered in under a minute`,
    sourceKey: PLATFORM_SOURCE_KEY,
    sourceLabel: `Live GrowthOS data, active clinic accounts, last ${stats.window_days} days`,
  };
}

/** All public stats for a stage, in display form. First response uses live platform data. */
export function displayStatsForStage(
  map: GrowthosMap,
  stage: MapStage,
  stats: PlatformStats,
): DisplayStat[] {
  if (stage.stage_key === "first_response") return [platformDisplayStat(stats)];
  return publicStatsForStage(stage)
    .filter((s) => !!map.sources[s.source_key])
    .map((s) => ({
      value: s.value,
      label: s.label,
      sourceKey: s.source_key,
      sourceLabel: shortCitation(map, s.source_key),
    }));
}

/** The first stat a stage shows, or null when it has none. */
export const primaryStatForStage = (
  map: GrowthosMap,
  stage: MapStage,
  stats: PlatformStats,
): DisplayStat | null => displayStatsForStage(map, stage, stats)[0] ?? null;

export const findStage = (map: GrowthosMap, key: StageKey) =>
  map.stages.find((s) => s.stage_key === key);

/** Pick one public stat of a stage by its source key (used by the research cards). */
export function statFromStage(
  map: GrowthosMap,
  key: StageKey,
  sourceKey: string,
): DisplayStat | null {
  const stage = findStage(map, key);
  const stat = stage && publicStatsForStage(stage).find((s) => s.source_key === sourceKey);
  if (!stat || !map.sources[sourceKey]) return null;
  return {
    value: stat.value,
    label: stat.label,
    sourceKey,
    sourceLabel: shortCitation(map, sourceKey),
  };
}

// ---------------------------------------------------------------------------
// Number formatting
// ---------------------------------------------------------------------------

const fmt = new Intl.NumberFormat("en-US");

/** 16,915 displays as "16,900+". */
export const formatConversations = (n: number) => `${fmt.format(Math.floor(n / 100) * 100)}+`;

/** 92 displays as "90+". */
export const formatClinics = (n: number) => `${fmt.format(Math.floor(n / 10) * 10)}+`;

export const formatPct = (n: number) => `${Math.floor(n)}%`;

export const leakNames = (stage: MapStage) => stage.leaks.map((l) => l.name).join(" and ");

/** RPC source keys behind every stat the given stages display (platform figures excluded). */
export const sourceKeysForStages = (map: GrowthosMap, stages: MapStage[], stats: PlatformStats) =>
  stages
    .flatMap((s) => displayStatsForStage(map, s, stats))
    .map((d) => d.sourceKey)
    .filter((k): k is string => !!k && k !== PLATFORM_SOURCE_KEY);

/** The pre-footer and closing line: a measured first-reply figure, not a promise. */
export const firstReplyCommitment = (stats: PlatformStats) =>
  `Median first reply in ${stats.median_first_reply_seconds} seconds across every live clinic, measured, not promised. Your existing forms start sending leads in on day one.`;
