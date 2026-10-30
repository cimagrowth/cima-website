'use client';

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Phone,
  Mail,
  MessageSquare,
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
  LayoutDashboard,
  CreditCard,
  Share2,
  RefreshCw,
  Globe,
  Building2,
  Megaphone,
  Bell,
  Settings,
  MessageCircle,
} from "lucide-react";

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
    <h2 className={`font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground mb-4 ${centered ? "mx-auto" : ""} max-w-3xl ${centered ? "mx-auto" : ""}`}>
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
      "Every new inquiry gets a response in seconds. The AI engages, qualifies, and routes, so your team only handles patients who are ready.",
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
      "When it's time for a human, your team steps into the conversation with full history. No awkward 'can you repeat that?' moments.",
  },
];

const inboxChannels = [
  "Calls: click-to-call and call logging on your clinic's own lines",
  "SMS / MMS",
  "Email",
  "WhatsApp",
  "Instagram DM",
  "Facebook Messenger",
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
      "Full patient profiles with conversation history, tags, custom fields, source tracking, and notes. All searchable and filterable.",
  },
  {
    icon: Target,
    title: "Smart Tags & Segments",
    description:
      "Auto-tag contacts by source, procedure interest, stage, and behavior. Build dynamic segments for targeted follow-up.",
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
      "Send invoices, collect deposits, and process payments. All inside the platform. Text-to-pay and payment links included.",
  },
];

const marketingCards = [
  {
    icon: Mail,
    title: "Patient Email",
    description:
      "Drag-and-drop email builder with templates, scheduling, A/B testing, and open/click tracking, sent to opted-in patients with unsubscribe enforced.",
  },
  {
    icon: MessageSquare,
    title: "Patient Messaging",
    description:
      "Appointment reminders and follow-up to patients who opted in, with opt-in and opt-out built in.",
  },
  {
    icon: Zap,
    title: "Workflow Automations",
    description:
      "Visual workflow builder: trigger actions on form submissions, pipeline changes, tags, dates, or custom events. 'If this, then that' for your entire clinic.",
  },
  {
    icon: Share2,
    title: "Social Inbox",
    description:
      "Reply to Instagram and Facebook messages patients send your clinic, from one inbox.",
  },
  {
    icon: RefreshCw,
    title: "Recall Reminders",
    description:
      "Notify your existing patients when a follow-up visit is due.",
  },
  {
    icon: Target,
    title: "Inquiry Follow-up",
    description:
      "Follow up with people who inquired at your clinic and consented to contact.",
  },
  {
    icon: Sparkles,
    title: "AI-Drafted Follow-up",
    description:
      "Follow-up messages drafted by AI for your team to review, sent only to people who contacted your clinic.",
  },
  {
    icon: Globe,
    title: "Landing Pages & Funnels",
    description:
      "Build high-converting landing pages, opt-in funnels, and microsites. No developer needed. Templates designed for healthcare conversions.",
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
      "Review velocity, post scheduling, and listing accuracy tools for your Google Business Profile.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Website Analytics",
    description:
      "Track keyword rankings, website traffic, and lead sources, built right into your CRM.",
  },
];

const adsCards = [
  {
    icon: Megaphone,
    title: "Google & Meta Ads",
    description:
      "Connect your clinic's own Google and Meta ad accounts and manage them from one dashboard. Budget and bid changes stay under your team's control.",
  },
  {
    icon: Target,
    title: "Full-Funnel Attribution",
    description:
      "Know exactly which ad, keyword, or campaign generated each consult and procedure. Real ROI, not vanity metrics.",
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
      "Request and receive medical records electronically. E-signature consent, automated retrieval, and secure PDF delivery. All inside the platform.",
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
      "Unlimited sub-accounts for satellite offices, multi-specialty practices, and franchise networks. Each with independent data and settings.",
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


// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

/** Every GrowthOS feature, shown at the end of /product under #features. */
const ProductFeatures = () => {
  return (
    <div id="features" className="scroll-mt-24">
      <section className="pt-[clamp(64px,8vw,120px)] bg-background">
        <div className="container-wide text-center">
          <h2 className="font-display font-semibold tracking-tight text-heading-lg md:text-display text-foreground">
            Everything in GrowthOS
          </h2>
        </div>
      </section>
      {/* ── SECTION 1: AI PATIENT ENGAGEMENT ── */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            label="Core Engine"
            title="AI Patient Engagement"
            description="The AI assistant replies instantly to web forms, chats, texts and inbound calls patients send your clinic. So no patient ever goes unanswered, even at 2 AM."
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
                  clinic's tone and wording, and the emotional nuances of healthcare. The AI answers
                  questions, qualifies leads, books consults, and follows up for days or
                  weeks. Automatically.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[240px] md:justify-end">
                {["Specialty-trained", "Multilingual", "24/7 auto-response", "Smart handoff to staff", "nurture sequence"].map(
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
            description="Every conversation, AI and human, in one unified inbox. No more switching between tabs, missing messages, or losing context."
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
            description="See exactly where every patient is, from first inquiry to procedure booked, with visual pipelines built for clinical workflows."
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
            title="Follow-up Automation"
            description="Automate follow-up with patients who contacted your clinic, run by your own staff."
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {marketingCards.slice(4).map((card) => (
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
            description="More five-star reviews, better search rankings, and a stronger online presence. All managed from one dashboard."
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
            description="Connect your clinic's own Google and Meta ad accounts, track every dollar, and see which campaigns are actually filling your schedule."
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
            description="Real-time visibility into every metric that matters: leads, conversions, revenue, team performance, and patient lifecycle."
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
            description="Pull patient medical records from previous providers. Digitally, securely, and without the fax machine runaround."
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
            description="Whether you have 2 locations or 26, GrowthOS scales with you: unified reporting, location-level control, and enterprise-grade architecture."
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
            Every feature, from the AI conversations to the CRM to the payment processing,
            is built on a HIPAA-compliant foundation. PHI is encrypted at rest and in
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

    </div>
  );
};

export default ProductFeatures;
