import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { usePostBySlug } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePostBySlug(slug || "");

  // Update document title for SEO
  useEffect(() => {
    if (post) {
      document.title = post.meta_title || post.title;
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && post.meta_description) {
        metaDesc.setAttribute("content", post.meta_description);
      }
    }
  }, [post]);

  if (isLoading) {
    return (
      <Layout>
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

  return (
    <Layout>
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

            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-body-lg text-muted-foreground">
                {post.excerpt}
              </p>
            )}

            {post.meta_keywords && post.meta_keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.meta_keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-body-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
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
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent-orange prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

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

// Simple markdown-like content formatting
function formatContent(content: string): string {
  return content
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/## (.*?)(?=<|$)/g, "</p><h2>$1</h2><p>")
    .replace(/### (.*?)(?=<|$)/g, "</p><h3>$1</h3><p>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/<p><\/p>/g, "");
}

export default BlogPost;
