import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="Page Not Found | GrowthOS"
        description="The page you're looking for doesn't exist. Return to the GrowthOS homepage to explore our AI-powered patient engagement platform."
        noindex
      />
      
      <section className="section-padding bg-background relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-20 right-[20%] w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-float delay-300" />
        
        <div className="container-tight relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[8rem] md:text-[12rem] font-bold text-gradient-accent leading-none mb-4">
              404
            </div>
            <h1 className="text-heading-lg md:text-display text-foreground mb-4">
              Page not found
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="hero" size="lg" className="group">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
