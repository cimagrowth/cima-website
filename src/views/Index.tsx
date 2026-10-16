import type { ReactNode } from "react";
import { getGrowthosMap, getPlatformStats, type GrowthosMap, type PlatformStats } from "@/lib/growthos-map";
import { specializeMap, stageCopyFor } from "@/lib/specialty-map";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { PERSON, SPECIALTIES, type Specialty } from "@/content/specialty";
import { buildExplorerStages, explorerSourceKeys } from "@/components/map/explorer-data";
import { WRAP } from "@/components/map/ui";
import SourcesList from "@/components/map/SourcesList";
import HeroMap from "@/components/home/HeroMap";
import PlatformProof from "@/components/home/PlatformProof";
import MapExplorer, { type ExplorerStage } from "@/components/home/MapExplorer";
import BeyondTheBooking, { beyondSourceKeys } from "@/components/home/BeyondTheBooking";
import ResearchSays, { RESEARCH_SOURCE_KEYS } from "@/components/home/ResearchSays";
import AITeamByStage from "@/components/home/AITeamByStage";
import SetupAndIntegrations from "@/components/home/SetupAndIntegrations";
import BuiltForHealthcare from "@/components/home/BuiltForHealthcare";
import OnePlan from "@/components/home/OnePlan";
import FounderLetter from "@/components/home/FounderLetter";
import LeakMapCTA from "@/components/home/LeakMapCTA";
import BySpecialty from "@/components/specialty/BySpecialty";
import SpecialtyPicker from "@/components/specialty/SpecialtyPicker";

/** The home page for one specialty, in today's section order. */
function HomeBody({
  specialty,
  map,
  stats,
  explorer,
  copy,
}: {
  specialty: Specialty;
  map: GrowthosMap;
  stats: PlatformStats;
  explorer: ExplorerStage[];
  copy: HomeCopy;
}) {
  const sourceKeys = [
    ...explorerSourceKeys(explorer),
    ...beyondSourceKeys(copy.beyond),
    ...(copy.research.show ? RESEARCH_SOURCE_KEYS : []),
  ];
  return (
    <>
      <HeroMap map={map} copy={copy.hero} />
      <PlatformProof stats={stats} copy={copy.proof} />
      <MapExplorer stages={explorer} defaultStage="after_cycle" title={copy.map.title} personOne={PERSON[specialty].one} />
      <BeyondTheBooking map={map} copy={copy.beyond} />
      {copy.research.show && <ResearchSays map={map} />}
      <AITeamByStage copy={copy.team} />
      <SetupAndIntegrations />
      <BuiltForHealthcare copy={copy.healthcare} />
      <OnePlan />
      <FounderLetter />
      <LeakMapCTA />
      <div className={`${WRAP} pb-20 pt-16 md:pb-24`}>
        <SourcesList map={map} sourceKeys={sourceKeys} windowDays={stats.window_days} />
      </div>
    </>
  );
}

const Index = async () => {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const variants = Object.fromEntries(
    SPECIALTIES.map(({ key }) => {
      const m = specializeMap(map, key);
      const explorer = buildExplorerStages(m, stats, {}, stageCopyFor(key));
      return [
        key,
        <HomeBody key={key} specialty={key} map={m} stats={stats} explorer={explorer} copy={HOME_COPY[key]} />,
      ];
    }),
  ) as Record<Specialty, ReactNode>;

  return (
    <>
      <div className={`${WRAP} pt-6 md:pt-8`}>
        <SpecialtyPicker variant="pills" />
      </div>
      <BySpecialty {...variants} />
    </>
  );
};

export default Index;
