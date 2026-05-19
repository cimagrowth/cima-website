'use client';

import Link from "next/link";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, PenSquare } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface BlogProps {
  posts: BlogPost[];
}

const Blog = ({ posts }: BlogProps) => {
  const { isAdmin } = useAuth();

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              Insights for{" "}
              <span className="text-gradient-accent">Clinic Growth</span>
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Expert strategies, industry insights, and actionable advice for
              fertility clinics, med spas, wellness centers, and regenerative medicine clinics.
            </p>

            {isAdmin && (
              <Link href="/admin/blog" className="inline-block mt-6">
                <Button variant="hero-outline" size="lg">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Manage Posts
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            // TODO: pagination at N>24
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-premium p-0 overflow-hidden block group h-full"
                  >
                    {post.featured_image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/20">
                          {post.title[0]}
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-body-sm text-muted-foreground mb-3">
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

                      <h2 className="text-heading-sm text-foreground mb-3 group-hover:text-accent-orange transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-body text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="text-accent-orange font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-6">
                <PenSquare className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-heading-sm text-foreground mb-2">
                No posts yet
              </h3>
              <p className="text-body text-muted-foreground mb-6">
                Blog posts will appear here once published.
              </p>
              {isAdmin && (
                <Link href="/admin/blog/new">
                  <Button variant="hero">
                    Create First Post
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <div className="container-wide relative z-10 mt-20">
          <div className="max-w-3xl mx-auto text-center bg-primary/5 border border-primary/10 rounded-2xl p-10">
            <h2 className="text-heading text-foreground mb-3">
              Every day without GrowthOS is revenue lost.
            </h2>
            <p className="text-body text-muted-foreground mb-6">
              See how Cima's agentic platform turns insights like these into booked
              consults for fertility clinics, med spas, and wellness centers.
            </p>
            <Link href="/demo">
              <Button variant="hero" size="lg">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
