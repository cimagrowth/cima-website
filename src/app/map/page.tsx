import type { Metadata } from 'next';
import GrowthosMapView from '@/views/GrowthosMap';
import { getGrowthosMap, stageHref } from '@/lib/growthos-map';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

const TITLE = 'The GrowthOS Map: the patient journey and where clinics leak patients';
const DESCRIPTION =
  'The patient journey in eight stages, from the first search to years after treatment. Where patient leakage happens at each stage, what the research says, and the GrowthOS modules that close each leak.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['patient journey', 'patient leakage', 'patient journey map', 'fertility patient journey', 'clinic patient retention'],
  alternates: { canonical: '/map' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cimagrowth.com/map',
    siteName: 'Cima Growth Solutions',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default async function MapPage() {
  const map = await getGrowthosMap();
  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: 'Home', url: 'https://cimagrowth.com' },
        { name: 'The GrowthOS Map', url: 'https://cimagrowth.com/map' },
      ],
    }),
    generateItemListSchema({
      name: 'The GrowthOS Map: stages of the patient journey',
      items: map.stages.map((s) => ({ name: s.name, url: stageHref(s.stage_key) })),
    }),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <GrowthosMapView />
    </>
  );
}
