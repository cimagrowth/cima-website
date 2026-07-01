import { supabaseServer } from '@/integrations/supabase/server';
import type { BlogPost } from '@/hooks/useBlogPosts';

const PUBLISHED_COLUMNS =
  'id,title,slug,excerpt,content,featured_image_url,author_id,status,meta_title,meta_description,meta_keywords,reading_time_minutes,published_at,created_at,updated_at,cluster';

export async function getPublishedPosts(limit = 24): Promise<BlogPost[]> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select(PUBLISHED_COLUMNS)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[blog-data] getPublishedPosts failed:', error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select('slug,published_at')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString());

  if (error) {
    console.error('[blog-data] getAllPublishedSlugs failed:', error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}

export async function getAllPublishedSlugsWithDates(): Promise<
  Array<{ slug: string; published_at: string | null }>
> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select('slug,published_at')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[blog-data] getAllPublishedSlugsWithDates failed:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select(PUBLISHED_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('[blog-data] getPublishedPostBySlug failed:', error.message);
    return null;
  }
  return (data as BlogPost) ?? null;
}

/**
 * Related posts, preferring the same topic cluster.
 *
 * Same-cluster posts come first (most recent first). If a cluster has fewer
 * than `limit` other posts, the remainder is backfilled with the most recent
 * posts from other clusters so the "Read more" grid is never sparse.
 */
export async function getRelatedPosts(
  excludeSlug: string,
  cluster: string | null,
  limit = 3,
): Promise<BlogPost[]> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select(PUBLISHED_COLUMNS)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[blog-data] getRelatedPosts failed:', error.message);
    return [];
  }

  const posts = (data ?? []) as BlogPost[];
  if (!cluster) return posts.slice(0, limit);

  const sameCluster = posts.filter((p) => p.cluster === cluster);
  if (sameCluster.length >= limit) return sameCluster.slice(0, limit);

  // Backfill with recent posts from other clusters.
  const seen = new Set(sameCluster.map((p) => p.slug));
  const fillers = posts.filter((p) => !seen.has(p.slug));
  return [...sameCluster, ...fillers].slice(0, limit);
}
