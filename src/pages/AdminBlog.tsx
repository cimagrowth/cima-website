import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useAllPosts, useDeletePost } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, Loader2, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";

const AdminBlog = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { data: posts, isLoading, error } = useAllPosts();
  const deletePost = useDeletePost();

  if (authLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deletePost.mutateAsync(id);
      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-heading-lg text-foreground">Manage Blog</h1>
              <p className="text-body text-muted-foreground">
                Create and manage blog posts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
              <Link to="/admin/blog/new">
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Unable to load posts. Please try again.
              </p>
            </div>
          ) : posts && posts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="card-elevated overflow-hidden"
            >
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">
                      Title
                    </th>
                    <th className="text-left p-4 font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-semibold text-foreground">
                      Date
                    </th>
                    <th className="text-right p-4 font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-t border-border hover:bg-accent/30 transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-medium text-foreground">
                          {post.title}
                        </span>
                        <br />
                        <span className="text-body-sm text-muted-foreground">
                          /blog/{post.slug}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-body-sm font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {post.status === "published" && (
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          )}
                          <Link to={`/admin/blog/edit/${post.id}`}>
                            <Button variant="ghost" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id, post.title)}
                            disabled={deletePost.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 card-elevated"
            >
              <h3 className="text-heading-sm text-foreground mb-2">
                No posts yet
              </h3>
              <p className="text-body text-muted-foreground mb-6">
                Create your first blog post to get started.
              </p>
              <Link to="/admin/blog/new">
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminBlog;
