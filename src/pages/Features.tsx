import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema, generateSoftwareSchema } from "@/components/seo/schemas";
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
  "ai_engine",
  "communications",
  "marketing",
  "core",
  "analytics",
  "integrations",
];

// Static fallback data if API is unavailable
const FALLBACK_FEATURES: WebsiteFeature[] = [
  // AI Engine
  {
    id: "ai-campaign-builder",
    name: "AI Campaign Builder",
    headline: "Launch full campaigns in 2 minutes",
    description:
      "Generate landing pages, email drips, SMS sequences, and ad copy in one click. The AI understands your clinic's brand, specialty, and audience.",
    bullet_points: [
      "Auto-generates landing page, email, and SMS",
      "Google Ads copy included",
      "Trained on healthcare messaging frameworks",
      "One-click launch",
    ],
    icon: "Sparkles",
    category: "ai_engine",
    category_label: "AI Engine",
    is_new: true,
    is_coming_soon: false,
    sort_order: 1,
    is_visible: true,
  },
  {
    id: "ai-outreach-engine",
    name: "Outreach Engine",
    headline: "Personalized cold outreach at scale",
    description:
      "Import prospects, let AI enrich each contact with business data, then generate 12-step personalized email sequences. Cost: $0.07 per prospect.",
    bullet_points: [
      "AI prospect enrichment",
      "12-step personalized sequences",
      "$0.07 per prospect",
      "40% more replies vs generic outreach",
    ],
    icon: "Send",
    category: "ai_engine",
    category_label: "AI Engine",
    is_new: false,
    is_coming_soon: false,
    sort_order: 2,
    is_visible: true,
  },
  {
    id: "ai-chatbot",
    name: "AI Chat Widget",
    headline: "Qualifies and books leads 24/7",
    description:
      "An emotionally intelligent chatbot trained on your clinic's specialty and voice. Responds to inquiries in seconds, qualifies leads, and books appointments.",
    bullet_points: [
      "24/7 instant response",
      "Trained on your clinic voice",
      "Appointment booking built-in",
      "Multi-language support",
    ],
    icon: "Bot",
    category: "ai_engine",
    category_label: "AI Engine",
    is_new: false,
    is_coming_soon: false,
    sort_order: 3,
    is_visible: true,
  },
  // Communications
  {
    id: "unified-inbox",
    name: "Unified Inbox",
    headline: "Every channel. One place.",
    description:
      "Respond to email, SMS, WhatsApp, Instagram DMs, Facebook messages, and phone calls from a single inbox. Never miss a patient message.",
    bullet_points: [
      "Email, SMS, WhatsApp in one view",
      "Social DMs included",
      "Mobile app notifications",
      "Team assignment and handoff",
    ],
    icon: "Inbox",
    category: "communications",
    category_label: "Communications",
    is_new: false,
    is_coming_soon: false,
    sort_order: 4,
    is_visible: true,
  },
  {
    id: "call-recordings",
    name: "Call Recordings & Tracking",
    headline: "Never lose a phone conversation",
    description:
      "Record, transcribe, and analyze every inbound and outbound call. AI flags important moments and surfaces them in the patient timeline.",
    bullet_points: [
      "Auto-transcription",
      "AI call summary",
      "Linked to contact record",
      "Compliance-ready storage",
    ],
    icon: "Mic",
    category: "communications",
    category_label: "Communications",
    is_new: false,
    is_coming_soon: false,
    sort_order: 5,
    is_visible: true,
  },
  // Marketing
  {
    id: "email-builder",
    name: "Email Builder",
    headline: "Beautiful healthcare emails, fast",
    description:
      "Drag-and-drop email builder with HIPAA-aware templates. AI writes the copy. Schedule campaigns or trigger them from patient behavior.",
    bullet_points: [
      "HIPAA-aware templates",
      "AI copywriting",
      "Behavioral triggers",
      "A/B testing",
    ],
    icon: "Mail",
    category: "marketing",
    category_label: "Marketing",
    is_new: false,
    is_coming_soon: false,
    sort_order: 6,
    is_visible: true,
  },
  {
    id: "social-media",
    name: "Social Media Planner",
    headline: "Schedule content across every platform",
    description:
      "Plan, create, and publish content to Instagram, Facebook, Google My Business, and LinkedIn. AI suggests post ideas based on your clinic specialty.",
    bullet_points: [
      "Multi-platform publishing",
      "AI content suggestions",
      "Visual content calendar",
      "Performance analytics",
    ],
    icon: "Share2",
    category: "marketing",
    category_label: "Marketing",
    is_new: false,
    is_coming_soon: false,
    sort_order: 7,
    is_visible: true,
  },
  // Core CRM
  {
    id: "pipelines",
    name: "Pipelines & Opportunities",
    headline: "See every lead at a glance",
    description:
      "Visual Kanban-style pipeline tracks every patient from first inquiry to booked consult. AI alerts your team when a lead needs attention.",
    bullet_points: [
      "Visual Kanban pipeline",
      "AI cold-lead alerts",
      "Automated stage moves",
      "Revenue forecasting",
    ],
    icon: "LayoutDashboard",
    category: "core",
    category_label: "Core CRM",
    is_new: false,
    is_coming_soon: false,
    sort_order: 8,
    is_visible: true,
  },
  {
    id: "contacts",
    name: "Contacts & Patient Records",
    headline: "Complete patient history in one place",
    description:
      "Every interaction, form submission, call, and message is logged under a single patient record. Your team walks into every conversation with full context.",
    bullet_points: [
      "Full interaction timeline",
      "Custom fields",
      "Tag and segment patients",
      "Import from any CRM",
    ],
    icon: "Users",
    category: "core",
    category_label: "Core CRM",
    is_new: false,
    is_coming_soon: false,
    sort_order: 9,
    is_visible: true,
  },
  {
    id: "calendars",
    name: "Calendars & Scheduling",
    headline: "Bookings without the back-and-forth",
    description:
      "Embed booking links anywhere. Patients pick their time, confirm their details, and get automated reminders. Reduce no-shows by 40%.",
    bullet_points: [
      "Self-service booking links",
      "Automated SMS/email reminders",
      "Calendar sync (Google, Outlook)",
      "Multi-staff scheduling",
    ],
    icon: "Calendar",
    category: "core",
    category_label: "Core CRM",
    is_new: false,
    is_coming_soon: false,
    sort_order: 10,
    is_visible: true,
  },
  // Analytics
  {
    id: "reporting",
    name: "Reporting & Analytics",
    headline: "Know exactly what's working",
    description:
      "Track lead sources, conversion rates, campaign performance, and revenue attribution in one dashboard. AI surfaces insights you'd miss in a spreadsheet.",
    bullet_points: [
      "Lead source attribution",
      "Conversion funnel reporting",
      "Campaign ROI tracking",
      "AI-generated insights",
    ],
    icon: "BarChart3",
    category: "analytics",
    category_label: "Analytics",
    is_new: false,
    is_coming_soon: false,
    sort_order: 11,
    is_visible: true,
  },
  // Integrations
  {
    id: "integrations",
    name: "EHR & CRM Integrations",
    headline: "Connect your existing tech stack",
    description:
      "GrowthOS connects to your EHR (Epic, Athena, Jane App) and existing CRMs. Data flows both ways — no manual entry, no duplicate records.",
    bullet_points: [
      "Epic, Athena, Jane App",
      "Salesforce, HubSpot, Zoho",
      "Zapier / Webhook support",
      "Two-way data sync",
    ],
    icon: "LinkIcon",
    category: "integrations",
    category_label: "Integrations",
    is_new: false,
    is_coming_soon: false,
    sort_order: 12,
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
    <Link to="/demo">
      <Button variant="hero" size="default" className="group">
        Book a Demo
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

  const schemas = [
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://cimagrowth.com" },
        { name: "Features" },
      ],
    }),
    generateSoftwareSchema({
      name: "GrowthOS",
      description:
        "All-in-one AI-powered growth platform for healthcare clinics — patient acquisition, engagement, and conversion in one place.",
    }),
  ];

  return (
    <Layout>
      <SEO
        title="GrowthOS Features – AI-Powered Patient Acquisition & Growth"
        description="Every feature you need to acquire, engage, and convert patients. GrowthOS replaces your CRM, email platform, chatbot, phone system, and marketing agency — all powered by AI."
        keywords={[
          "GrowthOS features",
          "clinic CRM",
          "patient engagement AI",
          "healthcare automation",
          "AI campaign builder",
          "patient outreach",
        ]}
        canonical="https://cimagrowth.com/features"
        ogImage="https://cimagrowth.com/og-product.png"
      />
      <JsonLd schema={schemas} />

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Every feature you need to{" "}
            <span className="text-accent-orange">acquire, engage,</span> and{" "}
            <span className="text-accent-orange">convert patients.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            GrowthOS replaces your CRM, email platform, chatbot, phone system, landing page
            builder, and marketing agency — all powered by AI.
          </p>
          <Link to="/demo">
            <Button variant="hero" size="lg" className="text-base group">
              See It In Action
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
              Not sure where to start?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Start with the Outreach Engine for $49/mo, or unlock the full platform. Your
              data carries over seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/outreach#pricing">
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 group"
                >
                  See Outreach Pricing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
