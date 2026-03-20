import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  DollarSign,
  MessageSquare,
  Zap,
  Users,
  Rocket,
  Brain,
  Shield,
  Layers,
  CheckCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/components/seo/schemas";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HowItWorksPage = () => {
  const breadcrumb = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "https://cimagrowth.com" },
      { name: "How It Works" },
    ],
  });

  const comparisonRows = [
    { metric: "Lead response time", before: "4–24 hours", after: "Under 5 minutes" },
    { metric: "Follow-up rate", before: "60%", after: "100%" },
    { metric: "Patient leakage", before: "35–40%", after: "Under 5%" },
    { metric: "Campaign launch time", before: "2–4 weeks", after: "2 minutes" },
    { metric: "Cost per campaign", before: "$5,000+ (agency)", after: "$0.28 (AI)" },
    { metric: "Outreach cost per prospect", before: "$50+ (SDR)", after: "$0.07 (AI)" },
  ];

  return (
    <Layout>
      <SEO
        title="How GrowthOS Works – AI-Powered Patient Growth Engine"
        description="Clinics lose 30–40% of leads between first inquiry and booked appointment. GrowthOS closes that gap with AI-powered capture, nurture, convert, and grow — on autopilot."
        keywords={["patient leakage", "clinic growth platform", "AI patient engagement", "healthcare CRM", "GrowthOS"]}
        canonical="https://cimagrowth.com/how-it-works"
        ogImage="https://cimagrowth.com/og-product.png"
      />
      <JsonLd schema={[breadcrumb]} />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-light opacity-90" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-wide relative z-10 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            The front end of medicine is{" "}
            <span className="text-accent-orange">broken.</span> We fix it.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            Clinics lose 30–40% of leads between first inquiry and booked
            appointment. GrowthOS is the AI-powered platform that closes that
            gap — and fills your pipeline with new patients on autopilot.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/demo">
              <Button variant="hero" size="lg" className="text-base md:text-lg px-8 group">
                See It In Action
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1: The Problem */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="max-w-3xl mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                You're losing patients you've{" "}
                <span className="text-gradient-accent">already paid to attract.</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground">
                <p>
                  You spend thousands on Google Ads, SEO, and referral programs. Leads
                  come in — and then disappear. They fill out a form and never hear back.
                  They call and get voicemail. They email and wait 3 days for a response.
                </p>
                <p>
                  This is <strong className="text-foreground">patient leakage.</strong> And
                  it's costing the average clinic $500K+ per year in lost revenue.
                </p>
                <p>
                  The problem isn't your marketing. It's what happens after someone
                  raises their hand.
                </p>
              </div>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: Clock,
                  stat: "35%",
                  label: "of leads never get a follow-up within 24 hours",
                },
                {
                  icon: Zap,
                  stat: "5 minutes",
                  label: "— the window to respond before a lead goes cold",
                },
                {
                  icon: DollarSign,
                  stat: "$50K+",
                  label: "average revenue lost per month from leaked patients",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.stat}
                    variants={itemVariants}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-orange" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {item.stat}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">{item.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/demo">
                <Button variant="hero" size="lg" className="group">
                  Stop the Leak
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: How GrowthOS Fixes It */}
      <section className="py-16 md:py-24 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                One platform. Every touchpoint.{" "}
                <span className="text-gradient-accent">AI-powered.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                {
                  step: "Step 1",
                  title: "Capture",
                  icon: MessageSquare,
                  description:
                    "AI chatbot on your website qualifies leads 24/7, answers questions, and books appointments instantly. Forms capture leads from ads and landing pages. Every inquiry gets a response in seconds, not days.",
                },
                {
                  step: "Step 2",
                  title: "Nurture",
                  icon: Brain,
                  description:
                    "AI generates personalized email and SMS sequences for every lead. Multi-step campaigns fire automatically based on the patient's behavior. No lead falls through the cracks.",
                },
                {
                  step: "Step 3",
                  title: "Convert",
                  icon: Users,
                  description:
                    "Unified inbox lets your team respond from email, SMS, WhatsApp, and phone in one place. Pipeline management shows exactly where every lead stands. AI alerts you when a lead is about to go cold.",
                },
                {
                  step: "Step 4",
                  title: "Grow",
                  icon: Rocket,
                  description:
                    "AI Campaign Builder generates complete campaigns in 2 minutes — landing page, email drip, SMS sequence, and Google Ads copy. The Outreach Engine enriches cold prospects and writes personalized 12-step sequences.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    variants={itemVariants}
                    className="rounded-2xl bg-card border border-border p-6 md:p-8 shadow-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 shadow-card">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-accent-orange uppercase tracking-wider mb-1">
                          {item.step}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link to="/features">
                <Button variant="hero" size="lg" className="group">
                  See the Full Platform
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: What Makes GrowthOS Different */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                This isn't another CRM.{" "}
                <span className="text-gradient-accent">It's an AI growth engine.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                {
                  icon: Zap,
                  title: "AI Does the Work",
                  description:
                    "Other platforms give you tools and make you figure it out. GrowthOS generates campaigns, writes emails, enriches prospects, and monitors ads — autonomously. Your team focuses on patients, not marketing.",
                },
                {
                  icon: Shield,
                  title: "Built for Healthcare",
                  description:
                    "HIPAA-aware. EHR integration. Patient journey mapping. We understand that a fertility clinic's marketing needs are different from a SaaS company's. The AI is trained on healthcare-specific frameworks.",
                },
                {
                  icon: TrendingDown,
                  title: "Not an Agency, Not Just Software",
                  description:
                    "Agencies charge $10K/month and move slowly. DIY software overwhelms your team. GrowthOS gives you agency-level output at software pricing, powered by AI that learns your practice.",
                },
                {
                  icon: Layers,
                  title: "Everything Connects",
                  description:
                    "Your chatbot, inbox, pipeline, campaigns, ads, and EHR all share the same data. When a patient fills out a form, it creates a contact, adds them to a pipeline, enrolls them in a sequence, and notifies your team — automatically.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-orange" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link to="/demo">
                <Button variant="hero" size="lg" className="group">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: The Numbers */}
      <section className="py-16 md:py-24 bg-tan">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                What happens when you{" "}
                <span className="text-gradient-accent">close the gap.</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="overflow-x-auto rounded-2xl border border-border shadow-card mb-12">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 md:px-6 py-4 font-semibold rounded-tl-2xl">
                      Metric
                    </th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold">
                      Before GrowthOS
                    </th>
                    <th className="text-left px-4 md:px-6 py-4 font-semibold text-accent-orange rounded-tr-2xl">
                      After GrowthOS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.metric}
                      className={
                        i < comparisonRows.length - 1 ? "border-b border-border" : ""
                      }
                    >
                      <td className="px-4 md:px-6 py-4 font-medium text-foreground">
                        {row.metric}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-muted-foreground">
                        {row.before}
                      </td>
                      <td className="px-4 md:px-6 py-4 font-semibold text-accent-orange">
                        {row.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Link to="/demo">
                <Button variant="hero" size="lg" className="group">
                  Start Growing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: How to Get Started */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Three steps.{" "}
                <span className="text-gradient-accent">That's it.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {[
                {
                  number: "01",
                  title: "Book a Demo or Try the Interactive Demo",
                  description:
                    "See GrowthOS in action with your own eyes. Voice-guided tour, real features, sample data.",
                },
                {
                  number: "02",
                  title: "We Set Everything Up",
                  description:
                    "We build your brand profile, connect your EHR, import your data, and configure your AI. You're live in days, not months.",
                },
                {
                  number: "03",
                  title: "Patients Start Flowing",
                  description:
                    "AI campaigns launch, outreach sequences fire, your chatbot qualifies leads 24/7, and your pipeline fills up.",
                },
              ].map((item) => (
                <motion.div
                  key={item.number}
                  variants={itemVariants}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white text-xl font-bold mb-6 shadow-card">
                    {item.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/demo">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    Book a Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                    See the Full Platform
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorksPage;
