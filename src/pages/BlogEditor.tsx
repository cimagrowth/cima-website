import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  usePostById,
  useCreatePost,
  useUpdatePost,
  useOptimizeSEO,
} from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Loader2,
  Eye,
  ImagePlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { data: existingPost, isLoading: postLoading } = usePostById(id || "");
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const optimizeSEO = useOptimizeSEO();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image_url: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
    meta_keywords: [] as string[],
    reading_time_minutes: 5,
  });
  const [keywordsInput, setKeywordsInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const isEditing = !!id;

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        slug: existingPost.slug,
        content: existingPost.content,
        excerpt: existingPost.excerpt || "",
        featured_image_url: existingPost.featured_image_url || "",
        status: existingPost.status,
        meta_title: existingPost.meta_title || "",
        meta_description: existingPost.meta_description || "",
        meta_keywords: existingPost.meta_keywords || [],
        reading_time_minutes: existingPost.reading_time_minutes || 5,
      });
      setKeywordsInput(existingPost.meta_keywords?.join(", ") || "");
    }
  }, [existingPost]);

  if (authLoading || (isEditing && postLoading)) {
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleOptimizeSEO = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Please add a title and content first");
      return;
    }

    try {
      const result = await optimizeSEO.mutateAsync({
        title: formData.title,
        content: formData.content,
      });

      setFormData((prev) => ({
        ...prev,
        meta_title: result.meta_title || prev.meta_title,
        meta_description: result.meta_description || prev.meta_description,
        meta_keywords: result.meta_keywords || prev.meta_keywords,
        excerpt: result.excerpt || prev.excerpt,
        reading_time_minutes:
          result.reading_time_minutes || prev.reading_time_minutes,
      }));
      setKeywordsInput(result.meta_keywords?.join(", ") || keywordsInput);

      toast.success("SEO optimized! Review the suggestions below.");
      
      if (result.suggested_image_prompt) {
        toast.info(`Image suggestion: ${result.suggested_image_prompt}`, {
          duration: 10000,
        });
      }
    } catch (err) {
      toast.error("Failed to optimize SEO");
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({
        ...prev,
        featured_image_url: data.publicUrl,
      }));

      toast.success("Image uploaded successfully");
      setImageFile(null);
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Title, slug, and content are required");
      return;
    }

    try {
      const postData = {
        ...formData,
        meta_keywords: keywordsInput
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      };

      if (isEditing && id) {
        await updatePost.mutateAsync({ id, ...postData });
        toast.success("Post updated successfully");
      } else {
        await createPost.mutateAsync(postData);
        toast.success("Post created successfully");
      }

      navigate("/admin/blog");
    } catch (err) {
      toast.error(isEditing ? "Failed to update post" : "Failed to create post");
    }
  };

  const isSaving = createPost.isPending || updatePost.isPending;

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => navigate("/admin/blog")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </button>

            <div className="flex items-center justify-between mb-8">
              <h1 className="text-heading-lg text-foreground">
                {isEditing ? "Edit Post" : "New Post"}
              </h1>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="hero-outline"
                  onClick={handleOptimizeSEO}
                  disabled={optimizeSEO.isPending}
                >
                  {optimizeSEO.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Optimize SEO
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="card-elevated p-6 space-y-5">
                    <div>
                      <label className="block text-body-sm font-medium text-foreground mb-2">
                        Title
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter post title..."
                        className="h-12 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-body-sm font-medium text-foreground mb-2">
                        Slug
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">/blog/</span>
                        <Input
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              slug: generateSlug(e.target.value),
                            }))
                          }
                          placeholder="post-slug"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-body-sm font-medium text-foreground mb-2">
                        Content
                      </label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        placeholder="Write your blog post content here... Use ## for headings, **bold**, *italic*"
                        rows={20}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publish Settings */}
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Publish
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-body-sm font-medium text-foreground mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {isEditing ? "Update Post" : "Save Post"}
                      </Button>

                      {isEditing && formData.status === "published" && (
                        <a
                          href={`/blog/${formData.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            type="button"
                            variant="hero-outline"
                            className="w-full"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Post
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Featured Image
                    </h3>
                    {formData.featured_image_url ? (
                      <div className="space-y-4">
                        <img
                          src={formData.featured_image_url}
                          alt="Featured"
                          className="w-full rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              featured_image_url: "",
                            }))
                          }
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                          }
                        />
                        {imageFile && (
                          <Button
                            type="button"
                            variant="secondary-blue"
                            size="sm"
                            onClick={handleImageUpload}
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                              <ImagePlus className="w-4 h-4 mr-2" />
                            )}
                            Upload
                          </Button>
                        )}
                        <p className="text-body-sm text-muted-foreground">
                          Or paste image URL:
                        </p>
                        <Input
                          value={formData.featured_image_url}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              featured_image_url: e.target.value,
                            }))
                          }
                          placeholder="https://..."
                        />
                      </div>
                    )}
                  </div>

                  {/* SEO Settings */}
                  <div className="card-elevated p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      SEO Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-body-sm font-medium text-foreground mb-2">
                          Meta Title{" "}
                          <span className="text-muted-foreground">
                            ({formData.meta_title.length}/60)
                          </span>
                        </label>
                        <Input
                          value={formData.meta_title}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              meta_title: e.target.value,
                            }))
                          }
                          placeholder="SEO title"
                          maxLength={60}
                        />
                      </div>

                      <div>
                        <label className="block text-body-sm font-medium text-foreground mb-2">
                          Meta Description{" "}
                          <span className="text-muted-foreground">
                            ({formData.meta_description.length}/160)
                          </span>
                        </label>
                        <Textarea
                          value={formData.meta_description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              meta_description: e.target.value,
                            }))
                          }
                          placeholder="SEO description"
                          rows={3}
                          maxLength={160}
                        />
                      </div>

                      <div>
                        <label className="block text-body-sm font-medium text-foreground mb-2">
                          Keywords
                        </label>
                        <Input
                          value={keywordsInput}
                          onChange={(e) => setKeywordsInput(e.target.value)}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>

                      <div>
                        <label className="block text-body-sm font-medium text-foreground mb-2">
                          Excerpt
                        </label>
                        <Textarea
                          value={formData.excerpt}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              excerpt: e.target.value,
                            }))
                          }
                          placeholder="Brief summary for listings..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogEditor;
