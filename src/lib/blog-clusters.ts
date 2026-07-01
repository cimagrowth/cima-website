/**
 * Internal-linking config for the blog.
 *
 * Every published post is tagged with a `cluster` (stored on
 * `website_blog_posts.cluster`). The cluster drives three pieces of internal
 * linking rendered by the post template — with zero edits to post HTML:
 *
 *  1. A contextual hub + product callout (cluster → commercial pages).
 *  2. "Related posts" pulled from the same cluster.
 *  3. Demo CTAs (universal, cluster-independent).
 *
 * When a new post is created, set its `cluster` to one of the keys below and
 * the linking/CTAs render automatically.
 */

export type ClusterLink = { hub: string; product: string };

/** cluster -> { hub page, product page } */
export const CLUSTER_LINKS: Record<string, ClusterLink> = {
  'fertility-email': { hub: '/fertility-clinic-marketing', product: '/ai-agent' },
  'fertility-copywriting': { hub: '/fertility-clinic-marketing', product: '/ads' },
  'fertility-ads': { hub: '/fertility-clinic-marketing', product: '/ads' },
  'fertility-conversion': { hub: '/fertility-clinic-marketing', product: '/features' },
  'fertility-leakage': { hub: '/fertility-clinic-marketing', product: '/ai-agent' },
  'fertility-trust': { hub: '/fertility-clinic-marketing', product: '/features' },
  'fertility-channels': { hub: '/fertility-clinic-marketing', product: '/ai-agent' },
  'fertility-ops': { hub: '/fertility-clinic-marketing', product: '/product' },
  'healthcare-crm': { hub: '/healthcare-crm', product: '/product' },
  'med-spa': { hub: '/med-spa-marketing', product: '/ai-agent' },
  'medical-practice': { hub: '/medical-practice-marketing', product: '/product' },
  'patient-acquisition': { hub: '/patient-acquisition', product: '/ads' },
  'patient-engagement': { hub: '/patient-engagement-platform', product: '/ai-agent' },
};

/** Fallback used when a post has no cluster (or an unknown one). */
export const DEFAULT_CLUSTER_LINK: ClusterLink = {
  hub: '/patient-acquisition',
  product: '/product',
};

/** Human-readable label + short blurb for each commercial page we link to. */
export const PAGE_META: Record<string, { label: string; blurb: string }> = {
  '/fertility-clinic-marketing': {
    label: 'Fertility clinic marketing',
    blurb: 'See how GrowthOS turns inquiries into booked fertility consults.',
  },
  '/healthcare-crm': {
    label: 'Healthcare CRM',
    blurb: 'The CRM that acquires and retains patients — not just stores them.',
  },
  '/med-spa-marketing': {
    label: 'Med spa marketing',
    blurb: 'Fill the chair and keep aesthetic clients rebooking.',
  },
  '/medical-practice-marketing': {
    label: 'Medical practice marketing',
    blurb: 'One platform in place of the agency, ads manager, and chatbot.',
  },
  '/patient-acquisition': {
    label: 'Patient acquisition',
    blurb: 'The full system for turning inquiries into booked, returning patients.',
  },
  '/patient-engagement-platform': {
    label: 'Patient engagement platform',
    blurb: 'Engagement that converts and retains across every channel.',
  },
  '/ai-agent': {
    label: 'The AI patient agent',
    blurb: 'An AI front desk that answers inquiries in seconds, day or night.',
  },
  '/ads': {
    label: 'Done-for-you patient ads',
    blurb: 'Ad creative and targeting built to book high-intent patients.',
  },
  '/features': {
    label: 'The GrowthOS platform',
    blurb: 'Landing pages, forms, and trust signals that convert more visitors.',
  },
  '/product': {
    label: 'The GrowthOS platform',
    blurb: 'The all-in-one system that replaces your patchwork of clinic tools.',
  },
};

/** Resolve the hub + product callout targets for a post's cluster. */
export function getClusterLinks(cluster: string | null | undefined): ClusterLink {
  if (cluster && CLUSTER_LINKS[cluster]) return CLUSTER_LINKS[cluster];
  return DEFAULT_CLUSTER_LINK;
}

/**
 * Descriptive anchor phrase for the demo CTAs, tuned to the cluster's vertical
 * so it reads naturally in-context. Always points at `/demo`.
 */
export function getDemoCtaCopy(cluster: string | null | undefined): string {
  if (cluster === 'med-spa') {
    return 'See how GrowthOS fills your med spa calendar — book a demo';
  }
  if (cluster === 'healthcare-crm' || cluster === 'medical-practice') {
    return 'See how GrowthOS turns inquiries into booked patients — book a demo';
  }
  if (cluster && cluster.startsWith('fertility')) {
    return 'See how GrowthOS books fertility consults — book a demo';
  }
  return 'See how GrowthOS turns inquiries into booked patients — book a demo';
}
