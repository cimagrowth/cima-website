import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { usePostBySlug } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/schemas";
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePostBySlug(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <SEO
          title="Loading... | GrowthOS Blog"
          description="Loading blog post..."
          noindex
        />
        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/2 mb-8" />
              <div className="h-64 bg-muted rounded-xl mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <SEO
          title="Post Not Found | GrowthOS Blog"
          description="The blog post you're looking for doesn't exist or has been removed."
          noindex
        />
        <section className="section-padding bg-background">
          <div className="container-tight text-center">
            <h1 className="text-display text-foreground mb-4">Post Not Found</h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const postUrl = `https://growmyfertilityclinic.com/blog/${post.slug}`;
  
  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://growmyfertilityclinic.com" },
        { name: "Blog", url: "https://growmyfertilityclinic.com/blog" },
        { name: post.title, url: postUrl },
      ],
    }),
    generateArticleSchema({
      headline: post.title,
      description: post.meta_description || post.excerpt || "",
      image: post.featured_image_url || undefined,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at,
      url: postUrl,
      keywords: post.meta_keywords || [],
    }),
  ];

  return (
    <Layout>
      <SEO
        title={post.meta_title || `${post.title} | GrowthOS Blog`}
        description={post.meta_description || post.excerpt || `Read ${post.title} on the GrowthOS blog.`}
        keywords={post.meta_keywords || []}
        canonical={postUrl}
        ogType="article"
        ogImage={post.featured_image_url || undefined}
        article={{
          publishedTime: post.published_at || undefined,
          modifiedTime: post.updated_at,
          section: "Healthcare Technology",
          tags: post.meta_keywords || [],
        }}
      />
      <JsonLd schema={schemas} />

      <article className="section-padding bg-background">
        <div className="container-tight">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 text-body-sm text-muted-foreground mb-4">
              {post.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </span>
              )}
              {post.reading_time_minutes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_minutes} min read
                </span>
              )}
            </div>

            <h1 className="text-display-lg md:text-display-xl text-foreground mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-body-lg text-muted-foreground">
                {post.excerpt}
              </p>
            )}
          </motion.header>

          {/* Featured Image */}
          {post.featured_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full rounded-2xl shadow-elevated"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:my-3 prose-a:text-accent-orange prose-strong:text-foreground prose-headings:mt-8 prose-headings:mb-3"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Topic Tags */}
          {post.meta_keywords && post.meta_keywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-10"
            >
              {post.meta_keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs"
                >
                  {keyword}
                </span>
              ))}
            </motion.div>
          )}

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex items-center justify-between">
              <Link to="/blog">
                <Button variant="hero-outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Articles
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.share?.({
                    title: post.title,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

// Secure content formatting with XSS sanitization
function formatContent(content: string): string {
  const formatted = content
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/## (.*?)(?=<|$)/g, "</p><h2>$1</h2><p>")
    .replace(/### (.*?)(?=<|$)/g, "</p><h3>$1</h3><p>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/<p><\/p>/g, "");

  // Sanitize HTML to prevent XSS attacks
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img', 'hr'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

export default BlogPost;