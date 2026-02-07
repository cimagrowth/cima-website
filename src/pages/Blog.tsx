import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, PenSquare } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/components/seo/schemas";

const Blog = () => {
  const { data: posts, isLoading, error } = usePublishedPosts();
  const { isAdmin } = useAuth();

  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://cimagrowth.com" },
        { name: "Blog", url: "https://cimagrowth.com/blog" },
      ],
    }),
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "GrowthOS Blog – Insights for Clinic Growth",
      description: "Expert strategies, industry insights, and actionable advice for fertility clinics, med spas, wellness centers, and regenerative medicine clinics.",
      url: "https://cimagrowth.com/blog",
      publisher: {
        "@type": "Organization",
        name: "Cima Growth Solutions",
        url: "https://cimagrowth.com",
      },
    },
  ];

  return (
    <Layout>
      <SEO
        title="Blog – Insights for Clinic Growth | GrowthOS"
        description="Expert strategies, industry insights, and actionable advice for fertility clinics, med spas, wellness centers, and regenerative medicine clinics. Learn patient engagement best practices and clinic growth strategies."
        keywords={[
          "clinic growth strategies",
          "patient engagement tips",
          "fertility clinic marketing",
          "med spa growth",
          "healthcare marketing blog",
          "patient retention strategies",
          "medical practice growth",
          "wellness center marketing",
          "regenerative medicine marketing",
        ]}
        canonical="https://cimagrowth.com/blog"
      />
      <JsonLd schema={schemas} />

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
              <Link to="/admin/blog" className="inline-block mt-6">
                <Button variant="hero-outline" size="lg">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Manage Posts
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="card-premium p-6 animate-pulse"
                >
                  <div className="h-48 bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Unable to load blog posts. Please try again later.
              </p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="card-premium p-0 overflow-hidden block group"
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
                            {format(new Date(post.published_at), "MMM d, yyyy")}
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
                <Link to="/admin/blog/new">
                  <Button variant="hero">
                    Create First Post
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;