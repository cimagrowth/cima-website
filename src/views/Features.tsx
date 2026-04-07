'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  MessageSquare,
  Zap,
  Mail,
  Phone,
  Users,
  BarChart3,
  Settings,
  Globe,
  Calendar,
  FileText,
  Search,
  Megaphone,
  Target,
  TrendingUp,
  Shield,
  Database,
  CheckCircle,
  Star,
  Clock,
  Sparkles,
  Send,
  Inbox,
  LayoutDashboard,
  PenTool,
  Link as LinkIcon,
  Mic,
  Bot,
  CreditCard,
  Share2,
  RefreshCw,
  Bell,
  ChevronRight,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUPABASE_URL = "https://momssbzlofjodqodvvvk.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbXNzYnpsb2Zqb2Rxb2R2dnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzM0NDUsImV4cCI6MjA4NzM0OTQ0NX0.0fhNF9sTDBee9SOqM0OazVITv2wtfKkNsGz7GHPriTE";

// Lucide icon lookup by name string
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Brain,
  MessageSquare,
  Zap,
  Mail,
  Phone,
  Users,
  BarChart3,
  Settings,
  Globe,
  Calendar,
  FileText,
  Search,
  Megaphone,
  Target,
  TrendingUp,
  Shield,
  Database,
  CheckCircle,
  Star,
  Clock,
  Sparkles,
  Send,
  Inbox,
  LayoutDashboard,
  PenTool,
  Link: LinkIcon,
  Mic,
  Bot,
  CreditCard,
  Share2,
  RefreshCw,
  Bell,
  ChevronRight,
  Languages,
};

interface WebsiteFeature {
  id: string;
  name: string;
  headline: string;
  description: string;
  bullet_points: string[];
  icon: string;
  category: string;
  category_label: string;
  is_new: boolean;
  is_coming_soon: boolean;
  sort_order: number;
  is_visible: boolean;
}

interface GroupedCategory {
  label: string;
  features: WebsiteFeature[];
}

const CATEGORY_ORDER = [
  "ai_agent",
  "lead_management",
  "campaigns_outreach",
  "advertising",
  "landing_pages",
  "integrations",
];

// Static fallback data matching new spec copy
const FALLBACK_FEATURES: WebsiteFeature[] = [
  // AI Patient Agent
  {
    id: "ai-instant-response",
    name: "Instant Response Across 11 Channels",
    headline: "Under 3 seconds. Every channel. 24/7/365.",
    description:
      "Web chat, phone, SMS, email, WhatsApp, Instagram DM, TikTok DM, Facebook Messenger, Google My Business — all covered. Average response time: under 3 seconds.",
    bullet_points: [
      "11 channels covered simultaneously",
      "Under 3-second average response time",
      "24/7/365 availability",
      "No staffing required",
    ],
    icon: "Zap",
    category: "ai_agent",
    category_label: "AI Patient Agent",
    is_new: false,
    is_coming_soon: false,
    sort_order: 1,
    is_visible: true,
  },
  {
    id: "ai-emotional-intelligence",
    name: "Emotionally Intelligent Conversation",
    headline: "Not a script — a real conversation.",
    description:
      "The AI adapts tone based on specialty and patient context. A nervous fertility patient gets warmth and reassurance. A returning med spa client gets confidence and efficiency.",
    bullet_points: [
      "Adapts tone to patient sentiment",
      "Specialty-specific conversation frameworks",
      "Nurtures across days or weeks",
      "Never pushy, never robotic",
    ],
    icon: "Brain",
    category: "ai_agent",
    category_label: "AI Patient Agent",
    is_new: false,
    is_coming_soon: false,
    sort_order: 2,
    is_visible: true,
  },
  {
    id: "ai-clinic-trained",
    name: "Trained on Your Clinic",
    headline: "Your policies. Your voice. Your qualification criteria.",
    description:
      "Specialty-specific knowledge base (fertility, aesthetics, regenerative, wellness) fine-tuned with your policies, procedures, services, pricing, and qualification criteria.",
    bullet_points: [
      "Specialty-specific knowledge base",
      "Fine-tuned on your policies and procedures",
      "Multi-language support",
      "Per-org language configuration",
    ],
    icon: "Settings",
    category: "ai_agent",
    category_label: "AI Patient Agent",
    is_new: false,
    is_coming_soon: false,
    sort_order: 3,
    is_visible: true,
  },
  {
    id: "ai-human-handoff",
    name: "Seamless Human Handoff",
    headline: "The patient never repeats themselves.",
    description:
      "When a patient needs a human, the AI alerts your team on desktop or mobile with full conversation context. One click opens the complete history.",
    bullet_points: [
      "Real-time desktop and mobile alerts",
      "Full conversation context transferred",
      "One-click handoff",
      "Patient never starts over",
    ],
    icon: "Users",
    category: "ai_agent",
    category_label: "AI Patient Agent",
    is_new: false,
    is_coming_soon: false,
    sort_order: 4,
    is_visible: true,
  },
  // Lead Management & Scoring
  {
    id: "behavioral-lead-scoring",
    name: "Behavioral Lead Scoring",
    headline: "AI scores every lead in real time.",
    description:
      "AI scores every lead using hard qualification signals (service interest, insurance, timeline) plus behavioral signals (message frequency, channel engagement, response sentiment). Categorized as Hot, Warm, or Cold.",
    bullet_points: [
      "Hard + behavioral qualification signals",
      "Real-time Hot / Warm / Cold scoring",
      "Automatic score updates",
      "Priority alerts for hot leads",
    ],
    icon: "Target",
    category: "lead_management",
    category_label: "Lead Management & Scoring",
    is_new: false,
    is_coming_soon: false,
    sort_order: 5,
    is_visible: true,
  },
  {
    id: "visual-pipeline",
    name: "Visual Pipeline Management",
    headline: "See exactly where every lead stands.",
    description:
      "Drag-and-drop patient journey stages. See every lead from first inquiry to booked appointment to completed treatment. Automated stage transitions and reactivation triggers.",
    bullet_points: [
      "Drag-and-drop pipeline stages",
      "Automated stage transitions",
      "Reactivation triggers",
      "Revenue forecasting",
    ],
    icon: "LayoutDashboard",
    category: "lead_management",
    category_label: "Lead Management & Scoring",
    is_new: false,
    is_coming_soon: false,
    sort_order: 6,
    is_visible: true,
  },
  {
    id: "unified-inbox",
    name: "Unified Inbox",
    headline: "Every conversation. One screen.",
    description:
      "Every conversation (AI + staff) across every channel in one screen. Desktop and mobile app with real-time notifications.",
    bullet_points: [
      "All channels in one view",
      "AI + staff conversations together",
      "Desktop and mobile app",
      "Real-time notifications",
    ],
    icon: "Inbox",
    category: "lead_management",
    category_label: "Lead Management & Scoring",
    is_new: false,
    is_coming_soon: false,
    sort_order: 7,
    is_visible: true,
  },
  {
    id: "contact-management",
    name: "Contact Management",
    headline: "Full CRM with 15+ merge fields.",
    description:
      "Full CRM with companies, contacts, tags, notes, activity timeline, and merge fields. Import from CSV or add manually. Automatic UTM injection.",
    bullet_points: [
      "Companies, contacts, tags, notes",
      "Activity timeline per contact",
      "15+ merge fields",
      "Automatic UTM injection",
    ],
    icon: "Users",
    category: "lead_management",
    category_label: "Lead Management & Scoring",
    is_new: false,
    is_coming_soon: false,
    sort_order: 8,
    is_visible: true,
  },
  // Campaigns & Outreach
  {
    id: "ai-campaign-builder",
    name: "AI Campaign Builder",
    headline: "Complete campaigns in 2 minutes.",
    description:
      "Generate a complete campaign: landing page + email sequence + SMS drip + ad copy. AI uses your brand voice and conversion-optimized frameworks.",
    bullet_points: [
      "Landing page + email + SMS + ad copy",
      "Your brand voice",
      "Conversion-optimized frameworks",
      "2-minute launch time",
    ],
    icon: "Sparkles",
    category: "campaigns_outreach",
    category_label: "Campaigns & Outreach",
    is_new: true,
    is_coming_soon: false,
    sort_order: 9,
    is_visible: true,
  },
  {
    id: "ai-outreach-engine",
    name: "AI Outreach Engine",
    headline: "$0.07 per enriched prospect.",
    description:
      "Import a prospect list. AI scrapes and enriches every contact, identifies pain points, and writes a personalized 12-step cold email sequence in your voice.",
    bullet_points: [
      "AI prospect enrichment",
      "12-step personalized sequences",
      "$0.07 per prospect",
      "40% more replies vs generic outreach",
    ],
    icon: "Send",
    category: "campaigns_outreach",
    category_label: "Campaigns & Outreach",
    is_new: false,
    is_coming_soon: false,
    sort_order: 10,
    is_visible: true,
  },
  {
    id: "reactivation-campaigns",
    name: "Reactivation Campaigns",
    headline: "Bring cold leads and no-shows back.",
    description:
      "Scheduled SMS and email outreach to bring cold leads and no-shows back into motion. AI-powered timing and messaging.",
    bullet_points: [
      "Automated SMS and email sequences",
      "AI-powered timing",
      "No-show re-engagement",
      "Cold lead reactivation",
    ],
    icon: "RefreshCw",
    category: "campaigns_outreach",
    category_label: "Campaigns & Outreach",
    is_new: false,
    is_coming_soon: false,
    sort_order: 11,
    is_visible: true,
  },
  // Advertising
  {
    id: "google-ads",
    name: "Google Ads Integration",
    headline: "Healthcare compliance built in.",
    description:
      "AI generates headlines, keywords, and ad copy. Healthcare keyword compliance built in — automatic exemption handling for restricted medical terms. Performance Max and Search campaigns from one dashboard.",
    bullet_points: [
      "AI-generated headlines and keywords",
      "Healthcare keyword compliance",
      "Performance Max + Search campaigns",
      "Automatic exemption handling",
    ],
    icon: "Search",
    category: "advertising",
    category_label: "Advertising",
    is_new: false,
    is_coming_soon: false,
    sort_order: 12,
    is_visible: true,
  },
  {
    id: "facebook-instagram-ads",
    name: "Facebook & Instagram Ads",
    headline: "Create and manage from one place.",
    description:
      "Create and manage campaigns from one place. AI handles creative generation, audience targeting, and budget optimization.",
    bullet_points: [
      "AI creative generation",
      "Smart audience targeting",
      "Budget optimization",
      "Cross-platform management",
    ],
    icon: "Megaphone",
    category: "advertising",
    category_label: "Advertising",
    is_new: false,
    is_coming_soon: false,
    sort_order: 13,
    is_visible: true,
  },
  {
    id: "performance-dashboard",
    name: "Real-Time Performance Dashboard",
    headline: "No more digging through Ads Manager.",
    description:
      "Clicks, conversions, cost-per-lead, and ROI at a glance. AI-generated ad images powered by Imagen. Specialty-specific templates ready out of the box.",
    bullet_points: [
      "Clicks, conversions, cost-per-lead, ROI",
      "AI-generated creative (Imagen)",
      "Specialty-specific templates",
      "Real-time reporting",
    ],
    icon: "BarChart3",
    category: "advertising",
    category_label: "Advertising",
    is_new: false,
    is_coming_soon: false,
    sort_order: 14,
    is_visible: true,
  },
  // Landing Pages
  {
    id: "ai-landing-pages",
    name: "AI Landing Page Builder",
    headline: "37 evidence-based conversion rules.",
    description:
      "Built on 37 evidence-based conversion rules stored in the platform. Every page AI generates follows these principles automatically — not templates, science.",
    bullet_points: [
      "37 evidence-based conversion rules",
      "AI-generated pages",
      "Custom subdomain deployment",
      "SSL and DNS handled automatically",
    ],
    icon: "Globe",
    category: "landing_pages",
    category_label: "Landing Pages",
    is_new: false,
    is_coming_soon: false,
    sort_order: 15,
    is_visible: true,
  },
  {
    id: "conversion-tracking",
    name: "Conversion Tracking",
    headline: "Pixel tracking configured automatically.",
    description:
      "Pixel and conversion tracking configured automatically. Per-email click tracking on outreach sequences. Know exactly which channels drive booked appointments.",
    bullet_points: [
      "Automatic pixel setup",
      "Per-email click tracking",
      "Channel attribution",
      "Custom domain deployment",
    ],
    icon: "TrendingUp",
    category: "landing_pages",
    category_label: "Landing Pages",
    is_new: false,
    is_coming_soon: false,
    sort_order: 16,
    is_visible: true,
  },
  // Integrations & Infrastructure
  {
    id: "ehr-integration",
    name: "EHR Integration",
    headline: "ModMed, FertEHR, and HL7.",
    description:
      "Native connections to ModMed, FertEHR, and other systems via HL7 translation engine. Patient data flows both ways.",
    bullet_points: [
      "ModMed and FertEHR native",
      "HL7 translation engine",
      "Two-way data sync",
      "Custom webhook support",
    ],
    icon: "Database",
    category: "integrations",
    category_label: "Integrations & Infrastructure",
    is_new: false,
    is_coming_soon: false,
    sort_order: 17,
    is_visible: true,
  },
  {
    id: "crm-migration",
    name: "CRM Migration Support",
    headline: "We migrate you at your pace.",
    description:
      "Transitioning from HubSpot, Salesforce, Zoho, Keap, Tebra, or DearDoc? We migrate your data and run both systems in parallel until you're ready.",
    bullet_points: [
      "HubSpot, Salesforce, Zoho, Keap",
      "Tebra and DearDoc support",
      "Parallel system operation",
      "Data migration included",
    ],
    icon: "Share2",
    category: "integrations",
    category_label: "Integrations & Infrastructure",
    is_new: false,
    is_coming_soon: false,
    sort_order: 18,
    is_visible: true,
  },
  {
    id: "hipaa-compliance",
    name: "HIPAA Compliant",
    headline: "Built for healthcare from day one.",
    description:
      "All data encrypted in transit and at rest. BAA available. A2P 10DLC registered SMS sending so your texts actually get delivered. Full compliance setup handled during onboarding.",
    bullet_points: [
      "Encrypted in transit and at rest",
      "BAA available",
      "A2P 10DLC compliance",
      "Full onboarding compliance setup",
    ],
    icon: "Shield",
    category: "integrations",
    category_label: "Integrations & Infrastructure",
    is_new: false,
    is_coming_soon: false,
    sort_order: 19,
    is_visible: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FeatureCard = ({ feature }: { feature: WebsiteFeature }) => {
  const IconComponent = iconMap[feature.icon] ?? Zap;

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col gap-4"
    >
      {/* Badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {feature.is_new && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-orange text-white">
              NEW
            </span>
          )}
          {feature.is_coming_soon && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
          {feature.name}
        </h3>
        <p className="text-sm font-medium text-accent-orange mb-2">
          {feature.headline}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      {feature.bullet_points && feature.bullet_points.length > 0 && (
        <ul className="space-y-1.5 mt-auto">
          {feature.bullet_points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

const CategoryCTA = () => (
  <div className="mt-8 flex justify-center">
    <Link href="/demo">
      <Button variant="hero" size="default" className="group">
        Book a Demo — See Every Feature Live
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  </div>
);

const Features = () => {
  const [grouped, setGrouped] = useState<Record<string, GroupedCategory>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/website_features?is_visible=eq.true&order=sort_order`,
          { headers: { apikey: ANON_KEY } }
        );
        if (!res.ok) throw new Error("API error");
        const data: WebsiteFeature[] = await res.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error("No data");
        setGrouped(groupFeatures(data));
      } catch {
        setGrouped(groupFeatures(FALLBACK_FEATURES));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const groupFeatures = (features: WebsiteFeature[]) =>
    features.reduce<Record<string, GroupedCategory>>((acc, f) => {
      if (!acc[f.category]) {
        acc[f.category] = { label: f.category_label, features: [] };
      }
      acc[f.category].features.push(f);
      return acc;
    }, {});

  const orderedCategories = CATEGORY_ORDER.filter((cat) => grouped[cat]);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light opacity-90" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-wide relative z-10 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display font-bold text-white mb-6 max-w-4xl lg:max-w-5xl mx-auto leading-tight">
            Every Feature You Need to{" "}
            <span className="text-accent-orange">Acquire, Engage,</span> and{" "}
            <span className="text-accent-orange">Convert Patients.</span>{" "}
            Nothing You Don't.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            GrowthOS replaces your CRM, chatbot, phone system, email platform,
            landing page builder, ads manager, and marketing agency — powered by
            AI that actually does the work.
          </p>
          <Link href="/demo">
            <Button variant="hero" size="lg" className="text-base group">
              See It In Action — Book a Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Categories */}
      <div className="py-4">
        {loading ? (
          <div className="container-wide py-24 text-center">
            <div className="w-10 h-10 border-4 border-accent-orange/30 border-t-accent-orange rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading features...</p>
          </div>
        ) : (
          orderedCategories.map((categoryKey, catIndex) => {
            const category = grouped[categoryKey];
            const isAlt = catIndex % 2 === 1;
            return (
              <section
                key={categoryKey}
                className={cn("py-14 md:py-20", isAlt ? "bg-tan" : "bg-background")}
              >
                <div className="container-wide">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                  >
                    <motion.div variants={itemVariants} className="mb-8 md:mb-12">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        {category.label}
                      </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.features.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                      ))}
                    </div>

                    <CategoryCTA />
                  </motion.div>
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to see every feature live?
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10">
              Book a demo and see the full GrowthOS platform in action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                  Book a Demo — See Every Feature Live
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
