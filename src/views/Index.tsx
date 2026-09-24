import { getGrowthosMap, getPlatformStats } from "@/lib/growthos-map";
import { buildExplorerStages, explorerSourceKeys } from "@/components/map/explorer-data";
import { WRAP } from "@/components/map/ui";
import SourcesList from "@/components/map/SourcesList";
import HeroMap from "@/components/home/HeroMap";
import PlatformProof from "@/components/home/PlatformProof";
import MapExplorer from "@/components/home/MapExplorer";
import BeyondTheBooking, { BEYOND_SOURCE_KEYS } from "@/components/home/BeyondTheBooking";
import ResearchSays, { RESEARCH_SOURCE_KEYS } from "@/components/home/ResearchSays";
import AITeamByStage from "@/components/home/AITeamByStage";
import SetupAndIntegrations from "@/components/home/SetupAndIntegrations";
import BuiltForHealthcare from "@/components/home/BuiltForHealthcare";
import OnePlan from "@/components/home/OnePlan";
import FounderLetter from "@/components/home/FounderLetter";
import LeakMapCTA from "@/components/home/LeakMapCTA";

const Index = async () => {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const explorerStages = buildExplorerStages(map, stats);
  const sourceKeys = [
    ...explorerSourceKeys(explorerStages),
    ...BEYOND_SOURCE_KEYS,
    ...RESEARCH_SOURCE_KEYS,
  ];

  return (
    <>
      <HeroMap map={map} />
      <PlatformProof stats={stats} />
      <MapExplorer stages={explorerStages} defaultStage="after_cycle" />
      <BeyondTheBooking map={map} />
      <ResearchSays map={map} />
      <AITeamByStage />
      <SetupAndIntegrations />
      <BuiltForHealthcare />
      <OnePlan />
      <FounderLetter />
      <LeakMapCTA />
      <div className={`${WRAP} pb-20 pt-16 md:pb-24`}>
        <SourcesList map={map} sourceKeys={sourceKeys} windowDays={stats.window_days} />
      </div>
    </>
  );
};

export default Index;
