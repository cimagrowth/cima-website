import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { VisitorProvider } from "@/contexts/VisitorContext";
import ScrollToTopOnNavigate from "@/components/layout/ScrollToTopOnNavigate";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Features from "./pages/Features";
import HowItWorksPage from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import Demo from "./pages/Demo";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminBlog from "./pages/AdminBlog";
import BlogEditor from "./pages/BlogEditor";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import Outreach from "./pages/Outreach";
import AdsAccess from "./pages/AdsAccess";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import AIAgent from "./pages/AIAgent";
import AdsPage from "./pages/AdsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <VisitorProvider>
          <AuthProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTopOnNavigate />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/features" element={<Features />} />
                <Route path="/sign-up" element={<Pricing />} />
                <Route path="/sign-up/register" element={<Register />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/blog/new" element={<BlogEditor />} />
                <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
                <Route path="/outreach" element={<Outreach />} />
                <Route path="/success" element={<SubscriptionSuccess />} />
                <Route path="/ai-agent" element={<AIAgent />} />
                <Route path="/ads-access" element={<AdsAccess />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/ads" element={<AdsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </VisitorProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
