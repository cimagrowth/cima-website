'use client';

import { useState } from "react";
import { Redirect } from "@/components/Redirect";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const { user, isAdmin, isLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <>
        <section className="section-padding bg-background">
          <div className="container-tight flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </section>
      </>
    );
  }

  if (user && isAdmin) {
    return <Redirect to="/admin/blog" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />

        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-6 shadow-card">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-heading-lg text-foreground mb-2">
                Admin Login
              </h1>
              <p className="text-body text-muted-foreground">
                Sign in to manage blog posts
              </p>
            </div>

            <div className="card-elevated p-8">
              {user && !isAdmin ? (
                <div className="text-center py-6">
                  <p className="text-body text-muted-foreground mb-4">
                    You're logged in as <strong>{user.email}</strong>, but you
                    don't have admin access.
                  </p>
                  <Link href="/">
                    <Button variant="hero-outline">Return Home</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                      placeholder="admin@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-body-sm font-medium text-foreground mb-2"
                    >
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12"
                      placeholder="••••••••"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
