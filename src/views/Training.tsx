"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Video,
  ClipboardCheck,
  Award,
  Building2,
  Workflow,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_ROUTE = "/demo";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-clay mb-4">
    {children}
  </p>
);

const Training = () => {
  return (
    <>
      {/* 1. Hero */}
      <section className="section-padding bg-paper relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl lg:max-w-5xl mx-auto text-center"
          >
            <Eyebrow>Training and certification</Eyebrow>
            <h1 className="font-display text-4xl md:text-6xl font-[340] tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              Your customers need training.{" "}
              <span className="italic text-clay">
                You built a folder of videos.
              </span>
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Onboarding, training, and certification for the companies you sell
              to. It runs off your pipeline, tracks who finished, and issues
              certificates they can prove. Not another platform for your
              customers to log into and forget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href={DEMO_ROUTE}>
                <Button variant="hero" size="xl" className="group">
                  Book a walkthrough
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how">
                <Button variant="hero-outline" size="xl">
                  See how it works
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base text-teal-deep/75">
              {[
                "Your videos, your brand",
                "Certificates that verify",
                "Enrol a whole company at once",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check
                    className="w-4 h-4 text-orange shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="section-padding-sm bg-cream relative overflow-hidden">
        <div className="container-tight relative z-10">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <div className="relative pl-6 md:pl-10 border-l-2 border-orange/70">
              <p className="font-display text-[clamp(22px,3vw,34px)] font-[340] tracking-tight text-teal leading-snug">
                Every B2B company that sells into clinics ends up running a
                training operation it never meant to build. Recorded calls, a
                shared drive, a spreadsheet of who watched what, and a customer
                success manager who becomes the person who chases people. It is
                the least automated part of a business that automates everything
                else.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. How it works */}
      <section
        id="how"
        className="section-padding bg-paper relative overflow-hidden scroll-mt-24"
      >
        <div className="container-wide relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              Training that knows where the customer is.
            </h2>
          </motion.div>

          {/* Three steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14 md:mb-16">
            {[
              {
                n: "01",
                title: "A deal reaches Onboarding.",
                body: "Every named contact at that company is enrolled automatically. Nobody remembers to do it.",
              },
              {
                n: "02",
                title: "Knowledge checks gate completion.",
                body: "Questions must be answered before a module counts. Assignments go to a real person on your team to review and grade.",
              },
              {
                n: "03",
                title: "The stage will not advance until they are trained.",
                body: "Training stops being a task your CSM nags about. It becomes a condition of going live.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                className="bg-white rounded-xl2 border border-sand p-7 shadow-[var(--shadow-sm)]"
              >
                <span className="font-ui text-sm font-bold text-orange">
                  {step.n}
                </span>
                <h3 className="font-ui text-lg font-semibold text-foreground mt-3 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CSS-only pipeline visual */}
          <PipelineVisual />

          <motion.p
            {...fadeUp}
            className="font-display text-[clamp(20px,2.6vw,30px)] font-[340] tracking-tight text-teal-deep leading-snug text-center max-w-3xl mx-auto mt-14"
          >
            No standalone LMS can do this, because no standalone LMS owns your
            pipeline.
          </motion.p>
        </div>
      </section>

      {/* 4. What it does */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>What it does</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              Four things, done properly.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              {
                n: "01",
                icon: Video,
                title: "Your videos, or ones you have not filmed yet.",
                body: "Upload the training you already have, or type a script and generate a presenter video from it. Most companies never make the training they know they need because filming it is a project. Here it is a paragraph and a few minutes.",
              },
              {
                n: "02",
                icon: ClipboardCheck,
                title: "Proof they understood, not proof they logged in.",
                body: "Every module carries a knowledge check. Written assignments route to whoever on your team should read them, who grades, gives feedback, or sends the work back for another attempt.",
              },
              {
                n: "03",
                icon: Award,
                title: "Certificates you can defend.",
                body: "Finish a program and a certificate issues automatically, carrying your logo and the signature of whoever in your company signs off. Anyone can verify it from a public link. A certificate issued in 2026 still proves what it proved after you redesign the template, because the signature is captured at the moment it was issued.",
              },
              {
                n: "04",
                icon: Building2,
                title: "Enrol a company, not a person.",
                body: "Your customer is an organisation. Enrol all of them in one action, exclude anyone who does not need it, and read completion by seat. When your customer asks you to prove their staff are trained, you export the list.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="bg-white rounded-xl2 border border-sand p-7 shadow-[var(--shadow-sm)] flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-teal" aria-hidden="true" />
                    </span>
                    <span className="font-ui text-sm font-bold text-orange">
                      {card.n}
                    </span>
                  </div>
                  <h3 className="font-ui text-lg font-semibold text-foreground mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. What is included */}
      <section className="section-padding bg-paper relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>What is included</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              Everything the training operation needs, on day one.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            <IncludedCard
              title="Build"
              items={[
                "Unlimited tracks, one per product line or audience",
                "Modules from your own video, or generated from a script",
                "Knowledge checks with explanations on wrong answers",
                "Written, file, and link assignments with attempt limits",
              ]}
            />
            <IncludedCard
              title="Run"
              items={[
                "Enrol a contact or an entire company in one action",
                "Automatic enrolment when a deal reaches a stage you choose",
                "Kickoff, reminder, and overdue messages that send themselves",
                "Every message editable in your own words",
              ]}
            />
            <IncludedCard
              title="Prove"
              items={[
                "Designed certificates with your logo and a locked signature",
                "Public verification link on every certificate",
                "Recertification on a schedule you set",
                "Completion by person, by company, and by program",
              ]}
            />
          </div>

          <motion.p
            {...fadeUp}
            className="max-w-6xl mx-auto mt-6 text-sm text-muted-foreground leading-relaxed"
          >
            Learners never create an account or set a password. They receive a
            private link, and they can pick up where they left off from any
            device. If you connect your own domain, they never see ours.
          </motion.p>
        </div>
      </section>

      {/* 6. Pricing */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              One price. Everyone you train.
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="max-w-3xl mx-auto mb-12 md:mb-14 text-center"
          >
            <p className="font-display text-[clamp(24px,3.2vw,38px)] font-[340] tracking-tight text-teal-deep leading-snug mb-4">
              $299 per month, or $2,999 per year.
            </p>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
              Not per seat, not per learner, not per course. Video generation is
              billed by the minute of finished video, and your first year
              includes a credit to get started. Uploading video you already have
              costs nothing per minute.
            </p>
          </motion.div>

          {/* Comparison, two stacking cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {/* Standalone LMS */}
            <motion.div
              {...fadeUp}
              className="bg-white rounded-xl2 border border-sand p-7 md:p-9 flex flex-col"
            >
              <p className="font-ui text-lg font-semibold text-foreground mb-6">
                The standalone LMS
              </p>
              <ul className="space-y-3">
                {[
                  "Priced per seat, so training your biggest customer costs the most",
                  "Their brand on your customers' screens",
                  "A separate system your CSM has to remember to update",
                  "Reporting that lives away from the account record",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm md:text-base text-muted-foreground"
                  >
                    <span
                      className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Training in Cima */}
            <motion.div
              {...fadeUp}
              className="bg-teal text-paper rounded-xl2 p-7 md:p-9 flex flex-col shadow-[var(--shadow)] relative"
            >
              <span className="absolute top-5 right-5 font-ui text-[11px] font-semibold uppercase tracking-[.14em] text-teal bg-orange rounded-full px-3 py-1">
                Cima
              </span>
              <p className="font-ui text-lg font-semibold mb-6">
                Training in Cima
              </p>
              <ul className="space-y-3">
                {[
                  "One price, every learner",
                  "Your brand, your domain",
                  "Fires off the pipeline you already run",
                  "Completion on the company record",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm md:text-base">
                    <Check
                      className="w-5 h-5 text-orange shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-paper/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={DEMO_ROUTE}>
                  <Button variant="hero" size="lg" className="group w-full">
                    Book a walkthrough
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Closing CTA */}
      <section className="section-padding bg-teal text-paper relative overflow-hidden">
        <div className="container-tight relative z-10 text-center">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="font-display font-[340] tracking-tight text-[clamp(28px,4vw,48px)] leading-[1.15] mb-10">
              Stop being the person who chases people to watch videos.
            </h2>
            <Link href={DEMO_ROUTE}>
              <Button variant="hero" size="xl" className="group">
                Book a walkthrough
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* --------------------------------------------------------------------- */
/* Included column card                                                   */
/* --------------------------------------------------------------------- */

const IncludedCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <motion.div
    {...fadeUp}
    className="bg-white rounded-xl2 border border-sand p-7 md:p-8"
  >
    <h3 className="font-ui text-lg font-semibold text-teal mb-5">{title}</h3>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check
            className="w-5 h-5 text-clay shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="text-sm md:text-base text-foreground leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </motion.div>
);

/* --------------------------------------------------------------------- */
/* CSS-only pipeline visual                                               */
/* Three stage columns, a company record sitting in the final stage, and  */
/* a seat-completion readout. No video, no heavy animation, and it stacks */
/* cleanly on mobile.                                                     */
/* --------------------------------------------------------------------- */

const PipelineVisual = () => {
  const stages = [
    { label: "Closed Won", active: false },
    { label: "Onboarding", active: false },
    { label: "Certified", active: true },
  ];

  return (
    <motion.div
      {...fadeUp}
      aria-hidden="true"
      className="max-w-4xl mx-auto bg-white rounded-xl2 border border-sand p-5 md:p-7 shadow-[var(--shadow-sm)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div
            key={stage.label}
            className={`rounded-xl border p-4 ${
              stage.active
                ? "border-teal bg-teal/[0.04]"
                : "border-sand bg-cream/40"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[.12em] text-muted-foreground">
                {stage.label}
              </span>
              <Workflow className="w-3.5 h-3.5 text-muted-foreground/60" />
            </div>

            {stage.active ? (
              <div className="rounded-lg border border-sand bg-white p-3 shadow-[var(--shadow-sm)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-teal" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-ui text-xs font-semibold text-foreground">
                      Meridian Labs
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Company record
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 text-orange-600 px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-[.1em]">
                  <BadgeCheck className="w-3 h-3" />
                  8 of 12 seats complete
                </span>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-sand bg-white/50 p-3 h-[74px] flex items-center justify-center">
                <span className="font-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground/60">
                  {stage.label === "Onboarding" ? "Program sent" : "Won"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Training;
