'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Zap,
  Target,
  MessageSquare,
  Repeat,
  Users,
  Gauge,
  Inbox,
  Workflow,
  CalendarCheck,
  Bot,
  Megaphone,
  Filter,
  TrendingUp,
  Heart,
  Sparkles,
  Phone,
  Mail,
  Layers,
  ShieldCheck,
  Star,
  Clock,
  BarChart3,
  UserPlus,
  Bell,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  target: Target,
  message: MessageSquare,
  repeat: Repeat,
  users: Users,
  gauge: Gauge,
  inbox: Inbox,
  workflow: Workflow,
  calendar: CalendarCheck,
  bot: Bot,
  megaphone: Megaphone,
  filter: Filter,
  trending: TrendingUp,
  heart: Heart,
  sparkles: Sparkles,
  phone: Phone,
  mail: Mail,
  layers: Layers,
  shield: ShieldCheck,
  star: Star,
  clock: Clock,
  chart: BarChart3,
  userplus: UserPlus,
  bell: Bell,
  mobile: Smartphone,
};

type Cta = { label: string; href: string };

type Feature = {
  icon: string;
  title: string;
  body: string;
};

type Segment = {
  title: string;
  body: string;
};

type Faq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export interface SolutionLandingProps {
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  subhead: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  problem: {
    eyebrow: string;
    heading: string;
    accent?: string;
    paragraphs: string[];
    points?: string[];
  };
  solution: {
    eyebrow: string;
    heading: string;
    intro: string;
    features: Feature[];
  };
  whyClinics: {
    eyebrow: string;
    heading: string;
    intro: string;
    segments: Segment[];
  };
  proofPoints: string[];
  faqs: Faq[];
  related?: {
    heading: string;
    intro?: string;
    links: RelatedLink[];
  };
  closing: {
    heading: string;
    body: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
  };
}

const SolutionLanding = ({
  eyebrow,
  h1Lead,
  h1Accent,
  subhead,
  primaryCta = { label: "Book a Demo", href: "/demo" },
  secondaryCta = { label: "See GrowthOS", href: "/product" },
  problem,
  solution,
  whyClinics,
  proofPoints,
  faqs,
  related,
  closing,
}: SolutionLandingProps) => {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl lg:max-w-5xl mx-auto text-center"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              {eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-[340] tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              {h1Lead} <span className="italic text-clay">{h1Accent}</span>
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              {subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={primaryCta.href}>
                <Button variant="hero" size="xl" className="group">
                  {primaryCta.label}
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={secondaryCta.href}>
                <Button variant="hero-outline" size="xl">
                  {secondaryCta.label}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The problem */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative pl-6 md:pl-10 border-l-2 border-accent-orange/70">
              <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
                {problem.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-6">
                {problem.heading}{" "}
                {problem.accent && (
                  <span className="italic text-clay">{problem.accent}</span>
                )}
              </h2>
              {problem.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-foreground leading-relaxed mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
              {problem.points && problem.points.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {problem.points.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-base md:text-lg text-foreground">
                      <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-clay" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How GrowthOS solves it */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              {solution.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-6">
              {solution.heading}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {solution.intro}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {solution.features.map((feature, index) => {
              const Icon = iconMap[feature.icon] ?? Sparkles;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
                  className="bg-paper rounded-xl2 border border-sand p-6 shadow-[var(--shadow-sm)] flex gap-4"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-ui text-base md:text-lg font-semibold text-foreground mb-1 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why specialty clinics */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              {whyClinics.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight mb-6">
              {whyClinics.heading}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {whyClinics.intro}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {whyClinics.segments.map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                className="card-elevated p-7 md:p-8"
              >
                <h3 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-2">
                  {segment.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {segment.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Proof / credibility band */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-12 md:mt-16 max-w-5xl mx-auto"
          >
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {proofPoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-paper px-4 py-2 text-sm md:text-base font-medium text-teal-deep shadow-[var(--shadow-sm)]"
                >
                  <Check className="w-4 h-4 text-clay" aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-tan relative overflow-hidden">
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
              Questions
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-paper rounded-xl2 border border-sand p-6 shadow-[var(--shadow-sm)]"
              >
                <h3 className="font-ui text-base md:text-lg font-semibold text-foreground mb-2">
                  {item.question}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      {related && related.links.length > 0 && (
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-12 max-w-3xl mx-auto"
            >
              <h2 className="font-display text-[clamp(24px,3.4vw,40px)] font-[340] tracking-tight text-foreground leading-tight mb-4">
                {related.heading}
              </h2>
              {related.intro && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {related.intro}
                </p>
              )}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {related.links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="group block h-full bg-paper rounded-xl2 border border-sand p-6 shadow-[var(--shadow-sm)] transition-all hover:border-clay/50"
                  >
                    <span className="font-ui text-base md:text-lg font-semibold text-foreground leading-snug inline-flex items-center gap-1.5">
                      {link.label}
                      <ArrowRight className="w-4 h-4 text-clay transition-transform group-hover:translate-x-1" />
                    </span>
                    {link.description && (
                      <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {link.description}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="section-padding bg-teal relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl lg:max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-paper mb-6 leading-tight">
              {closing.heading}
            </h2>
            <p className="text-base md:text-lg text-paper/80 mb-8 max-w-2xl mx-auto">
              {closing.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={closing.primaryCta.href}>
                <Button variant="hero" size="xl" className="group">
                  {closing.primaryCta.label}
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              {closing.secondaryCta && (
                <Link href={closing.secondaryCta.href}>
                  <Button
                    variant="hero-outline"
                    size="xl"
                    className="border border-paper/40 bg-transparent text-paper hover:bg-paper/10"
                  >
                    {closing.secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SolutionLanding;
