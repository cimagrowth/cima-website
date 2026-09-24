import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MapStageView from '@/views/MapStage';
import { STAGE_COPY } from '@/content/map-copy';
import { getGrowthosMap, STAGE_SLUGS, stageKeyFromSlug } from '@/lib/growthos-map';
import { generateBreadcrumbSchema } from '@/components/seo/schemas';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(STAGE_SLUGS).map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: { params: { stage: string } }): Promise<Metadata> {
  const key = stageKeyFromSlug(params.stage);
  const map = await getGrowthosMap();
  const stage = key && map.stages.find((s) => s.stage_key === key);
  if (!key || !stage) return {};
  const title = `${stage.name}: ${stage.leaks[0]?.name ?? 'the leak'} | GrowthOS Map`;
  const description = `Stage ${stage.number} of the patient journey. ${STAGE_COPY[key].leak} ${stage.ideal}`;
  const url = `https://cimagrowth.com/map/${params.stage}`;
  return {
    title,
    description,
    alternates: { canonical: `/map/${params.stage}` },
    openGraph: { title, description, url, siteName: 'Cima Growth Solutions', type: 'article', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function MapStagePage({ params }: { params: { stage: string } }) {
  const key = stageKeyFromSlug(params.stage);
  if (!key) notFound();
  const map = await getGrowthosMap();
  const stage = map.stages.find((s) => s.stage_key === key);
  if (!stage) notFound();
  const schema = generateBreadcrumbSchema({
    items: [
      { name: 'Home', url: 'https://cimagrowth.com' },
      { name: 'The GrowthOS Map', url: 'https://cimagrowth.com/map' },
      { name: stage.name, url: `https://cimagrowth.com/map/${params.stage}` },
    ],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MapStageView stageKey={key} />
    </>
  );
}
