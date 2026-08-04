"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Video,
  ClipboardCheck,
  ShieldCheck,
  FileSignature,
  Users,
  Workflow,
  Lock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CONSENT_FAQS } from "@/lib/consent-faqs";

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

const Consent = () => {
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
            <Eyebrow>Patient consent and education</Eyebrow>
            <h1 className="font-display text-4xl md:text-6xl font-[340] tracking-[-.02em] text-teal-deep mb-6 leading-tight">
              Consent that lives where{" "}
              <span className="italic text-clay">your patients do.</span>
            </h1>
            <p className="text-base md:text-xl text-teal-deep/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Branded video education and e-signature that runs inside your CRM.
              It fires off your pipeline, gates on comprehension, and lands on
              the patient record. Not another login for your staff to remember.
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
                "Audit trail on every signature",
                "Live in a day",
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
                Consent is the one part of the patient journey that still runs on
                PDFs, printers, and a coordinator chasing signatures by phone. It
                sits outside every other system you own, which is exactly why it
                goes stale.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. The differentiator */}
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
              Consent that knows where the patient is.
            </h2>
          </motion.div>

          {/* Three steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14 md:mb-16">
            {[
              {
                n: "01",
                title: "A patient moves to Protocol Assigned.",
                body: "Their consent packet sends automatically. No one remembers to do it.",
              },
              {
                n: "02",
                title: "Education gates the signature.",
                body: "Comprehension questions must be answered correctly before a document unlocks. A signature means something.",
              },
              {
                n: "03",
                title: "The stage will not advance until it is signed.",
                body: "Consent is not a reminder your team ignores. It is a condition of moving forward.",
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
            No standalone consent tool can do this, because no standalone consent
            tool owns your pipeline.
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
              Three things, done properly.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              {
                n: "01",
                icon: Video,
                title: "Your videos, your voice.",
                body: "Upload your own education modules and the portal carries your clinic's colours, logo, and domain. Patients watch your clinicians explain your protocols, not stock footage recorded for someone else. Cima stays invisible.",
              },
              {
                n: "02",
                icon: ClipboardCheck,
                title: "Comprehension, not just consent.",
                body: "Patients watch each module, then answer questions about it before a document unlocks. Wrong answers block progress and explain why. You get proof of understanding, not just a signature.",
              },
              {
                n: "03",
                icon: ShieldCheck,
                title: "Signatures you can defend.",
                body: "Every signature captures IP, timestamp, device, and signer identity, alongside how many education modules were watched, every comprehension answer including wrong attempts, and the exact document text that was signed with its hash. Partner and witness signing are built in, in the order you set.",
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
              A full consent library on day one.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            <LibraryCard
              title="Fertility"
              items={[
                "18 consent documents covering intake through embryo transfer",
                "Packet presets mapped to each stage: intake, financial, baseline, IVF cycle, retrieval, transfer",
                "Multi-party signing for partner and witness, in order",
                "Embryo disposition directive with all ten circumstances addressed",
              ]}
            />
            <LibraryCard
              title="Aesthetics and med spa"
              items={[
                "16 documents covering neurotoxin, filler, laser, peels, microneedling, and body contouring",
                "Photograph and media release with five separately granted permissions",
                "Off-label use disclosure and aftercare acknowledgment",
              ]}
            />
          </div>

          {/* Education framework, full width */}
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto mt-5 md:mt-6 bg-teal text-paper rounded-xl2 p-7 md:p-9"
          >
            <h3 className="font-ui text-lg md:text-xl font-semibold mb-5">
              Education framework, ready for your content
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "15 pre-built fertility education modules with topics, running order, and stage mapping already set",
                "A comprehension question per module, written and ready to edit",
                "Upload your own video to any module. Replace, reorder, or add your own topics.",
                "Watch time, acknowledgment, and every comprehension answer recorded against the signature",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="w-5 h-5 text-orange shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm md:text-base text-paper/90 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p
            {...fadeUp}
            className="max-w-5xl mx-auto mt-6 text-sm text-muted-foreground leading-relaxed"
          >
            OBGYN, wellness, regenerative, and physical therapy libraries are in
            development. Universal intake documents are available for every
            specialty today.
          </motion.p>

          <motion.p
            {...fadeUp}
            className="max-w-5xl mx-auto mt-4 text-base md:text-lg text-foreground leading-relaxed"
          >
            Every document is a complete draft built on standard clinical
            disclosure practice, ready for your counsel to review and adopt. You
            can also send us the consents you already use and we will digitise
            them.
          </motion.p>
        </div>
      </section>

      {/* 6. Audit trail */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-tight relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-10 md:mb-12 max-w-3xl mx-auto"
          >
            <Eyebrow>Audit trail</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              An audit trail that holds up.
            </h2>
          </motion.div>

          <AuditCard />

          <motion.p
            {...fadeUp}
            className="max-w-2xl mx-auto mt-8 text-base md:text-lg text-foreground leading-relaxed text-center"
          >
            Consent only matters when you can prove it. Every signature stores the
            exact text that was signed, hashed, so what a patient agreed to in
            2026 is still provable in 2031 even after the template changes.
          </motion.p>
        </div>
      </section>

      {/* 7. Pricing */}
      <section className="section-padding bg-paper relative overflow-hidden">
        <div className="container-wide relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              One plan. No per-seat games.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {/* Legacy tool */}
            <motion.div
              {...fadeUp}
              className="bg-white rounded-xl2 border border-sand p-7 md:p-9 flex flex-col"
            >
              <p className="font-ui text-lg font-semibold text-foreground">
                The legacy tool
              </p>
              <p className="font-ui text-sm font-medium text-muted-foreground mt-1 mb-6">
                EngagedMD-class pricing
              </p>
              <ul className="space-y-3">
                {[
                  "Video education and e-signature",
                  "Their brand on your patients' screens",
                  "Per-seat and per-volume add-ons",
                  "Enterprise sales cycle to get started",
                  "Lives outside your CRM",
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

            {/* Cima Consent */}
            <motion.div
              {...fadeUp}
              className="bg-teal text-paper rounded-xl2 p-7 md:p-9 flex flex-col shadow-[var(--shadow)] relative"
            >
              <span className="absolute top-5 right-5 font-ui text-[11px] font-semibold uppercase tracking-[.14em] text-teal bg-orange rounded-full px-3 py-1">
                Cima Consent
              </span>
              <p className="font-ui text-lg font-semibold">Cima Consent</p>
              <p className="font-ui text-sm font-medium text-paper/80 mt-1 mb-6">
                $297/mo or $2,997/yr
              </p>
              <ul className="space-y-3">
                {[
                  "Unlimited patients and signatures",
                  "Full consent library for your specialty",
                  "Education modules with your own videos, on your own domain",
                  "Complete audit trail and multi-party signing",
                  "Fires automatically from your pipeline",
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

          <motion.p
            {...fadeUp}
            className="max-w-5xl mx-auto mt-6 text-sm text-muted-foreground leading-relaxed text-center"
          >
            Already on GrowthOS? Consent is available as an add-on to your
            existing account.
          </motion.p>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-tight relative z-10">
          <motion.div
            {...fadeUp}
            className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          >
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-foreground leading-tight">
              Common questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-4">
              {CONSENT_FAQS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl2 border border-sand px-6 border-b"
                >
                  <AccordionTrigger className="font-ui text-base md:text-lg font-semibold text-foreground text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section className="section-padding bg-teal text-paper relative overflow-hidden">
        <div className="container-tight relative z-10 text-center">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="font-display font-[340] tracking-tight text-[clamp(28px,4vw,48px)] leading-[1.15] mb-5">
              Modernise the front desk of your practice.
            </h2>
            <p className="text-base md:text-lg text-paper/85 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a walkthrough and we will show you consent firing from a live
              pipeline.
            </p>
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
/* Library column card                                                    */
/* --------------------------------------------------------------------- */

const LibraryCard = ({
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
/* Three stage columns, a patient card sitting in the final stage, and a  */
/* consent badge in its signed state. No video, no heavy animation, and   */
/* it stacks cleanly on mobile.                                           */
/* --------------------------------------------------------------------- */

const PipelineVisual = () => {
  const stages = [
    { label: "New Inquiry", active: false },
    { label: "Protocol Assigned", active: false },
    { label: "Consent Signed", active: true },
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
                    <Users className="w-3.5 h-3.5 text-teal" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-ui text-xs font-semibold text-foreground">
                      Northlake Fertility
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Patient record
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 text-orange-600 px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-[.1em]">
                  <FileSignature className="w-3 h-3" />
                  Signed
                </span>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-sand bg-white/50 p-3 h-[74px] flex items-center justify-center">
                <span className="font-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground/60">
                  {stage.label === "Protocol Assigned"
                    ? "Packet sent"
                    : "Awaiting"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------------------------- */
/* Audit record card                                                      */
/* --------------------------------------------------------------------- */

const AuditCard = () => {
  const rows: Array<[string, React.ReactNode]> = [
    ["Signed by", "Emily Carter · Patient"],
    ["Document", "IVF Treatment Consent · v1.0"],
    ["Timestamp", "Mar 14, 2026 · 10:41 AM"],
    ["IP · device", "203.0.113.21 · Chrome / macOS"],
    ["Education", "15 of 15 modules acknowledged"],
    ["Comprehension", "15 of 15 answered correctly"],
    [
      "Witness",
      <span key="w" className="inline-flex items-center gap-1 text-teal">
        Signed <Check className="w-4 h-4" aria-hidden="true" />
      </span>,
    ],
    ["Document hash", "a3f9c2…8e41"],
  ];

  return (
    <motion.div
      {...fadeUp}
      className="max-w-2xl mx-auto bg-white rounded-xl2 border border-sand shadow-[var(--shadow)] overflow-hidden"
    >
      <div className="flex items-center justify-between bg-teal text-paper px-6 py-4">
        <span className="flex items-center gap-2 font-ui text-sm font-semibold">
          <Lock className="w-4 h-4" aria-hidden="true" />
          Signature record
        </span>
        <span className="font-ui text-[11px] font-medium uppercase tracking-[.14em] text-paper/70">
          Illustrative
        </span>
      </div>
      <dl className="divide-y divide-sand">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-3.5"
          >
            <dt className="font-ui text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground sm:w-40 shrink-0">
              {label}
            </dt>
            <dd className="font-body text-sm md:text-base text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
};

export default Consent;
