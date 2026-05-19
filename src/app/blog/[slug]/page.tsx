import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/views/BlogPost';
import {
  getAllPublishedSlugs,
  getPublishedPostBySlug,
  getRelatedPosts,
} from '@/lib/blog-data';
import { sanitizeBlogHtml } from '@/lib/sanitize-blog-html';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post not found – Cima Growth Solutions' };
  }

  const canonical = `https://www.cimagrowth.com/blog/${post.slug}`;
  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt ?? undefined;
  const images = post.featured_image_url ? [post.featured_image_url] : undefined;

  return {
    title,
    description,
    keywords: post.meta_keywords?.join(', '),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Cima Growth Solutions',
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      images,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) notFound();

  const [relatedPosts] = await Promise.all([
    getRelatedPosts(post.slug, 3),
  ]);

  const sanitizedContent = sanitizeBlogHtml(post.content ?? '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    image: post.featured_image_url ?? undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cimagrowth.com/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Brandon Hensinger',
      url: 'https://cimagrowth.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cima Growth Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cimagrowth.com/icon-512.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost
        post={post}
        relatedPosts={relatedPosts}
        sanitizedContent={sanitizedContent}
      />
    </>
  );
}
