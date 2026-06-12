'use client';

import Link from "next/link";
import type { BlogPost as BlogPostType } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: BlogPostType[];
  /** HTML body, pre-sanitized on the server. */
  sanitizedContent: string;
}

const BlogPost = ({ post, relatedPosts, sanitizedContent }: BlogPostProps) => {
  return (
    <>
      <article className="section-padding bg-background">
        <div className="container-tight">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <ol className="flex items-center gap-2 text-body-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-foreground line-clamp-1" aria-current="page">
                {post.title}
              </li>
            </ol>
          </motion.nav>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="font-display font-[340] tracking-tight text-display-lg md:text-display-xl text-foreground mb-4">
              {post.title}
            </h1>

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
            className="prose prose-lg max-w-2xl mx-auto prose-headings:font-display prose-headings:text-primary prose-headings:font-[340] prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/85 prose-p:text-lg prose-p:leading-relaxed prose-li:text-foreground/85 prose-a:text-primary prose-a:underline hover:prose-a:text-accent-orange prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Topic Tags */}
          {post.meta_keywords && post.meta_keywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-10 max-w-2xl mx-auto"
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

          {/* Share / Back */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <Link href="/blog">
                <Button variant="hero-outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Articles
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Read more */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 max-w-5xl mx-auto">
              <h2 className="text-heading text-foreground mb-8 text-center">
                Read more
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="card-premium p-0 overflow-hidden block group"
                  >
                    {rp.featured_image_url ? (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={rp.featured_image_url}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-5xl font-bold text-primary/20">
                          {rp.title[0]}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      {rp.published_at && (
                        <p className="text-body-sm text-muted-foreground mb-2">
                          {format(new Date(rp.published_at), "MMMM d, yyyy")}
                        </p>
                      )}
                      <h3 className="text-heading-sm text-foreground group-hover:text-accent-orange transition-colors mb-2 line-clamp-2">
                        {rp.title}
                      </h3>
                      <span className="text-accent-orange font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-body-sm">
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};

export default BlogPost;
