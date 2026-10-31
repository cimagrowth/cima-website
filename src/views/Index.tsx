import type { ReactNode } from "react";
import { getGrowthosMap, getPlatformStats, type GrowthosMap, type PlatformStats } from "@/lib/growthos-map";
import { specializeMap } from "@/lib/specialty-map";
import { HOME_COPY, type HomeCopy } from "@/content/home-specialty";
import { PERSON, SPECIALTIES, type Specialty } from "@/content/specialty";
import { WRAP } from "@/components/map/ui";
import SourcesList from "@/components/map/SourcesList";
import HeroMap from "@/components/home/HeroMap";
import PlatformProof from "@/components/home/PlatformProof";
import HomeStory from "@/components/home/HomeStory";
import SetupAndIntegrations from "@/components/home/SetupAndIntegrations";
import BuiltForHealthcare from "@/components/home/BuiltForHealthcare";
import OnePlan from "@/components/home/OnePlan";
import FounderLetter from "@/components/home/FounderLetter";
import LeakMapCTA from "@/components/home/LeakMapCTA";
import BySpecialty from "@/components/specialty/BySpecialty";
import SpecialtyPicker from "@/components/specialty/SpecialtyPicker";

/** The home page for one specialty: the problem, what GrowthOS does, then the result. */
function HomeBody({
  specialty,
  map,
  stats,
  copy,
}: {
  specialty: Specialty;
  map: GrowthosMap;
  stats: PlatformStats;
  copy: HomeCopy;
}) {
  return (
    <>
      <HeroMap map={map} copy={copy.hero} />
      <PlatformProof copy={copy.proof} />
      <HomeStory copy={copy.story} person={PERSON[specialty].one} people={PERSON[specialty].many} />
      <SetupAndIntegrations />
      <BuiltForHealthcare copy={copy.healthcare} />
      <FounderLetter />
      <OnePlan />
      <LeakMapCTA />
      <div className={`${WRAP} pb-20 pt-16 md:pb-24`}>
        <SourcesList map={map} sourceKeys={[]} windowDays={stats.window_days} />
      </div>
    </>
  );
}

const Index = async () => {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const variants = Object.fromEntries(
    SPECIALTIES.map(({ key }) => [
      key,
      <HomeBody key={key} specialty={key} map={specializeMap(map, key)} stats={stats} copy={HOME_COPY[key]} />,
    ]),
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
