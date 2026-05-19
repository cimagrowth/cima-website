import { supabaseServer } from '@/integrations/supabase/server';
import type { BlogPost } from '@/hooks/useBlogPosts';

const PUBLISHED_COLUMNS =
  'id,title,slug,excerpt,content,featured_image_url,author_id,status,meta_title,meta_description,meta_keywords,reading_time_minutes,published_at,created_at,updated_at';

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

export async function getRelatedPosts(excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabaseServer
    .from('website_blog_posts')
    .select(PUBLISHED_COLUMNS)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[blog-data] getRelatedPosts failed:', error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}
