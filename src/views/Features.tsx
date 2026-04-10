'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Zap,
  Phone,
  Mail,
  Users,
  BarChart3,
  Calendar,
  FileText,
  Search,
  Target,
  TrendingUp,
  Shield,
  Database,
  Star,
  Sparkles,
  Send,
  LayoutDashboard,
  CreditCard,
  Share2,
  RefreshCw,
  Globe,
  Building2,
  MapPin,
  Megaphone,
  Bell,
  Settings,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ──────────────────────────────────────────────
// Reusable primitives
// ──────────────────────────────────────────────

const SectionHeader = ({
  label,
  title,
  description,
  centered = false,
}: {
  label: string;
  title: React.ReactNode;
  description: string;
  centered?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}
  >
    <span className="text-body-sm font-semibold tracking-widest text-accent-orange uppercase mb-4 block">
      {label}
    </span>
    <h2 className={`text-heading-lg md:text-display text-foreground mb-4 ${centered ? "mx-auto" : ""} max-w-3xl ${centered ? "mx-auto" : ""}`}>
      {title}
    </h2>
    <p className={`text-body-lg text-muted-foreground max-w-2xl ${centered ? "mx-auto" : ""}`}>
      {description}
    </p>
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}) => (
  <motion.div variants={itemVariants} className="card-premium p-6 flex flex-col gap-4">
    <div className="w-11 h-11 rounded-xl bg-accent-orange/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-accent-orange" />
    </div>
    <div>
      <h3 className="text-heading-sm text-foreground mb-2">{title}</h3>
      <p className="text-body text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const Chip = ({ label, light = false }: { label: string; light?: boolean }) => (
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${
      light
        ? "bg-white/10 text-white/80 border-white/20"
        : "bg-accent-orange/10 text-accent-orange border-accent-orange/20"
    }`}
  >
    {label}
  </span>
);

// ──────────────────────────────────────────────
// Section data
// ──────────────────────────────────────────────

const aiEngagementCards = [
  {
    icon: Zap,
    title: "Instant Lead Response",
    description:
      "Every new inquiry gets a response in under 60 seconds. The AI engages, qualifies, and routes — so your team only handles patients who are ready.",
  },
  {
    icon: Bell,
    title: "Automated Follow-Up",
    description:
      "Leads get nurtured via text and email for up to 21 days. No one falls through the cracks, and your staff doesn't have to remember a thing.",
  },
  {
    icon: Users,
    title: "Staff Handoff with Context",
    description:
      "When it's time for a human, your team steps into the conversation with full history — no awkward 'can you repeat that?' moments.",
  },
];

const inboxChannels = [
  "Phone & VoIP",
  "SMS / MMS",
  "Email",
  "WhatsApp",
  "Instagram DM",
  "Facebook Messenger",
  "TikTok",
  "Google Business Chat",
  "Web Chat",
  "Web Forms",
];

const inboxCards = [
  {
    icon: MessageCircle,
    title: "Mobile App",
    description:
      "Reply to patients, check pipeline status, and see bookings from your phone. Full CRM functionality on iOS and Android.",
  },
  {
    icon: Phone,
    title: "Missed Call Text-Back",
    description:
      "Every missed call triggers an automatic text so you never lose a lead to voicemail.",
  },
];

const crmCards = [
  {
    icon: LayoutDashboard,
    title: "Visual Pipeline Stages",
    description:
      "Drag-and-drop pipeline boards customized to your workflow. Track leads from New Inquiry → Consult Scheduled → Treatment Started → Procedure Complete.",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Full patient profiles with conversation history, tags, custom fields, source tracking, and notes — all searchable and filterable.",
  },
  {
    icon: Target,
    title: "Smart Tags & Segments",
    description:
      "Auto-tag contacts by source, procedure interest, stage, and behavior. Build dynamic segments for targeted outreach.",
  },
  {
    icon: FileText,
    title: "Digital Forms & Intake",
    description:
      "Custom intake forms, consent documents, and surveys that feed directly into the CRM. No manual data entry.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Calendars",
    description:
      "Appointment booking with availability rules, buffer times, round-robin assignment, and automated confirmations and reminders.",
  },
  {
    icon: CreditCard,
    title: "Invoicing & Payments",
    description:
      "Send invoices, collect deposits, and process payments — all inside the platform. Text-to-pay and payment links included.",
  },
];

const marketingCards = [
  {
    icon: Mail,
    title: "Email Campaigns",
    description:
      "Drag-and-drop email builder with templates, scheduling, A/B testing, and detailed open/click tracking. Drip sequences for long-term nurture.",
  },
  {
    icon: MessageSquare,
    title: "SMS & MMS Campaigns",
    description:
      "Broadcast texts, automated drip sequences, and personalized one-off messages. Images, links, and compliance opt-in/out built in.",
  },
  {
    icon: Zap,
    title: "Workflow Automations",
    description:
      "Visual workflow builder — trigger actions on form submissions, pipeline changes, tags, dates, or custom events. 'If this, then that' for your entire clinic.",
  },
  {
    icon: Share2,
    title: "Social Media Automation",
    description:
      "Instagram and Facebook comment-to-DM automation, auto-replies on 'drop XYZ below' style posts, and social scheduling across platforms.",
  },
  {
    icon: RefreshCw,
    title: "Recall & Reactivation",
    description:
      "Automated campaigns to bring back dormant patients. Wellness memberships, annual check-ups, and follow-on treatment reminders.",
  },
  {
    icon: Target,
    title: "Retargeting Campaigns",
    description:
      "Re-engage website visitors and past inquiries with targeted ad and email/SMS sequences tied to their behavior and interests.",
  },
  {
    icon: Globe,
    title: "Landing Pages & Funnels",
    description:
      "Build high-converting landing pages, opt-in funnels, and microsites — no developer needed. Templates designed for healthcare conversions.",
  },
];

const outreachCards = [
  {
    icon: Search,
    title: "Prospect Enrichment",
    description:
      "AI researches every prospect — pulling clinic details, specialties, and context — so every outreach message is relevant and personal.",
  },
  {
    icon: Sparkles,
    title: "AI-Written Sequences",
    description:
      "Multi-step email and SMS sequences generated by AI, tailored to each recipient. Not templates — genuinely personalized messaging.",
  },
  {
    icon: BarChart3,
    title: "Campaign Analytics",
    description:
      "Track opens, replies, and conversions per sequence. See which messages resonate and let the system optimize over time.",
  },
];

const reputationCards = [
  {
    icon: Star,
    title: "Review Generation",
    description:
      "Automated review requests via text and email after appointments. Direct links to Google, Yelp, and Healthgrades make it effortless for patients.",
  },
  {
    icon: Globe,
    title: "Google Business Optimization",
    description:
      "Drive your Google Business Profile to the top of local search with review velocity, post scheduling, and listing accuracy tools.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Website Analytics",
    description:
      "Track keyword rankings, website traffic, and lead sources. Semrush and Google Analytics-level data — built right into your CRM.",
  },
];

const adsCards = [
  {
    icon: Megaphone,
    title: "Google & Meta Ads",
    description:
      "Launch and manage paid campaigns on Google and Facebook/Instagram directly from the platform. Budget control and bid management included.",
  },
  {
    icon: Target,
    title: "Full-Funnel Attribution",
    description:
      "Know exactly which ad, keyword, or campaign generated each consult and procedure. Real ROI — not vanity metrics.",
  },
];

const reportingCards = [
  {
    icon: Search,
    title: "Lead Source Tracking",
    description: "See where every lead came from and which sources convert best.",
  },
  {
    icon: BarChart3,
    title: "Revenue Reporting",
    description: "Track revenue by service, provider, source, and time period.",
  },
  {
    icon: Users,
    title: "Team Performance",
    description: "Response times, conversion rates, and workload per staff member.",
  },
  {
    icon: TrendingUp,
    title: "Funnel Analytics",
    description: "See exactly where patients drop off and optimize each stage.",
  },
];

const recordsCards = [
  {
    icon: Database,
    title: "ChartAI",
    description:
      "Request and receive medical records electronically. E-signature consent, automated retrieval, and secure PDF delivery — all inside the platform.",
  },
  {
    icon: Shield,
    title: "Digital Consent & Compliance",
    description:
      "HIPAA-compliant e-signature consent flow. Patients authorize record retrieval from their phone in under a minute.",
  },
];

const enterpriseCards = [
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Unlimited sub-accounts for satellite offices, multi-specialty practices, and franchise networks — each with independent data and settings.",
  },
  {
    icon: LayoutDashboard,
    title: "Roll-Up Reporting",
    description:
      "Aggregate dashboards across all locations, or drill into individual clinic performance. Corporate-level visibility with local autonomy.",
  },
  {
    icon: Settings,
    title: "API & Integrations",
    description:
      "Full API access for connecting to EMRs, billing systems, and existing tools. Runs alongside HubSpot, Salesforce, or Tebra during migration.",
  },
];

const hipaaTags = [
  "PHI Encryption",
  "BAA Included",
  "SOC 2 Infrastructure",
  "Role-Based Access",
  "Audit Logs",
];

const migrationCards = [
  {
    icon: Send,
    title: "HubSpot Migration",
    description:
      "Contacts, deals, workflows, and email templates — we move everything over and map it to GrowthOS pipelines.",
  },
  {
    icon: Database,
    title: "Salesforce Migration",
    description:
      "Full CRM data migration with field mapping, custom object support, and parallel-run capability during transition.",
  },
  {
    icon: Share2,
    title: "Tebra & Others",
    description:
      "We work with your existing stack — EMRs, billing platforms, phone systems — to ensure a smooth, complete transition.",
  },
];

const territoryTags = [
  "One clinic per territory",
  "Competitor lockout",
  "Market dominance",
];

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

const Features = () => {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light opacity-90" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-wide relative z-10 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/20 text-accent-orange text-body-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Platform Overview
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display font-bold text-white mb-6 max-w-4xl lg:max-w-5xl mx-auto leading-tight">
            One platform.{" "}
            <em className="not-italic text-gradient-accent">Everything</em>{" "}
            your clinic needs.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            GrowthOS replaces your CRM, marketing tools, phone system, chat platform,
            reputation manager, and analytics suite — all HIPAA-compliant, all in one place.
          </p>
          <Link href="/demo">
            <Button variant="hero" size="lg" className="text-base group shadow-glow">
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── SECTION 1: AI PATIENT ENGAGEMENT ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Core Engine"
            title="AI Patient Engagement"
            description="The AI Engine responds instantly to every inquiry — web form, phone call, text, DM, email — so no patient ever goes unanswered, even at 2 AM."
          />

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-elevated rounded-2xl p-7 md:p-10 mb-8 border-l-4 border-accent-orange"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-orange/20 to-secondary/20 flex items-center justify-center mb-6">
                  <Brain className="w-7 h-7 text-accent-orange" />
                </div>
                <h3 className="text-heading text-foreground mb-3">
                  Emotionally Intelligent AI Conversations
                </h3>
                <p className="text-body-lg text-muted-foreground max-w-2xl">
                  Not a chatbot that sounds like a robot. Trained on your specialty, your
                  clinic's voice, and the emotional nuances of healthcare. The AI answers
                  questions, qualifies leads, books consults, and follows up for days or
                  weeks — automatically.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[240px] md:justify-end">
                {["Specialty-trained", "Multilingual", "24/7 auto-response", "Smart handoff to staff", "21-day nurture"].map(
                  (tag) => <Chip key={tag} label={tag} />
                )}
              </div>
            </div>
          </motion.div>

          {/* 3-column cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aiEngagementCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: OMNICHANNEL INBOX ── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <SectionHeader
            label="Communication"
            title="Omnichannel Inbox"
            description="Every conversation — AI and human — in one unified inbox. No more switching between tabs, missing messages, or losing context."
          />

          {/* Channel chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {inboxChannels.map((ch) => (
              <Chip key={ch} label={ch} />
            ))}
          </motion.div>

          {/* 2-column cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {inboxCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: CRM & PIPELINE ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Patient Management"
            title="CRM & Pipeline"
            description="See exactly where every patient is — from first inquiry to procedure booked — with visual pipelines built for clinical workflows."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {crmCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: MARKETING AUTOMATION ── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <SectionHeader
            label="Marketing"
            title="Marketing Automation"
            description="From email drip campaigns to social media automation — run sophisticated marketing without a dedicated team."
          />

          {/* Top row: 2 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"
          >
            {marketingCards.slice(0, 4).map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>

          {/* Bottom row: 3 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {marketingCards.slice(4).map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: AI-POWERED OUTREACH ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Growth"
            title="AI-Powered Outreach"
            description="Proactively reach new patients and referral partners with AI-generated, personalized email and SMS outreach at scale."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {outreachCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: REPUTATION & SEO ── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <SectionHeader
            label="Visibility"
            title="Reputation & SEO"
            description="More five-star reviews, better search rankings, and a stronger online presence — all managed from one dashboard."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reputationCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: AD MANAGEMENT & ATTRIBUTION ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Paid Advertising"
            title="Ad Management & Attribution"
            description="Run Google and Meta ads, track every dollar, and see which campaigns are actually filling your schedule."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {adsCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 8: REPORTING & DASHBOARDS ── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <SectionHeader
            label="Intelligence"
            title="Reporting & Dashboards"
            description="Real-time visibility into every metric that matters — leads, conversions, revenue, team performance, and patient lifecycle."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reportingCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 9: MEDICAL RECORDS RETRIEVAL ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Records"
            title="Medical Records Retrieval"
            description="Pull patient medical records from any provider in the country — digitally, securely, and without the fax machine runaround."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {recordsCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 10: MULTI-LOCATION & ENTERPRISE ── */}
      <section className="section-padding bg-tan">
        <div className="container-wide">
          <SectionHeader
            label="Scale"
            title="Multi-Location & Enterprise"
            description="Whether you have 2 locations or 26, GrowthOS scales with you — unified reporting, location-level control, and enterprise-grade architecture."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {enterpriseCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HIPAA COMPLIANCE BANNER ── */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container-wide relative z-10 text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent-orange/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent-orange" />
          </div>
          <h2 className="text-heading-lg md:text-display text-white mb-5">
            HIPAA Compliant by Default
          </h2>
          <p className="text-body-lg text-white/80 mb-8">
            Every feature — from the AI conversations to the CRM to the payment processing
            — is built on a HIPAA-compliant foundation. PHI is encrypted at rest and in
            transit. BAAs included. Your patients' data is safe, and your clinic stays
            compliant.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {hipaaTags.map((tag) => (
              <Chip key={tag} label={tag} light />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 11: MIGRATION SUPPORT ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Migration"
            title="Already Using Something Else?"
            description="Stuck in HubSpot, Salesforce, or Tebra? We migrate your data and workflows at your pace — no downtime, no disruption."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {migrationCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TERRITORY EXCLUSIVITY ── */}
      <section className="section-padding-sm bg-tan">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-elevated rounded-2xl p-8 md:p-12 border-l-4 border-accent-orange max-w-4xl lg:max-w-5xl mx-auto"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-accent-orange/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-accent-orange" />
              </div>
              <div>
                <h2 className="text-heading text-foreground mb-3">
                  Territory Exclusivity
                </h2>
                <p className="text-body-lg text-muted-foreground mb-6">
                  We only partner with one clinic per market. Once you claim your territory,
                  we decline all competitors in your area. This isn't a sales tactic — it's
                  how we ensure every client dominates their local market.
                </p>
                <div className="flex flex-wrap gap-2">
                  {territoryTags.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-heading-lg md:text-display text-white mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-body-lg text-white/70 mb-10">
              Book a 15-minute demo and we'll show you exactly how GrowthOS works for your
              specialty.
            </p>
            <Link href="/demo">
              <Button variant="hero" size="lg" className="group shadow-glow text-base">
                Schedule a Demo →
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
