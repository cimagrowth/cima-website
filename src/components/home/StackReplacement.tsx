"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Row = { label: string; cost: string };

const rows: Row[] = [
  { label: "Marketing coordinator / manager", cost: "$4,000 – $6,000" },
  { label: "Marketing agency retainer", cost: "$3,000 – $8,000" },
  { label: "Paid media buyer", cost: "$2,000 – $5,000" },
  { label: "Patient coordinator doing follow-up", cost: "$3,000 – $4,000" },
  { label: "Outreach / SDR", cost: "$4,000 – $6,000" },
  { label: "Reputation / reviews management", cost: "$500 – $1,500" },
];

const TOTAL = "$16,500 – $30,500";

const StackReplacement = () => {
  return (
    <section
      id="stack-replacement"
      className="relative overflow-hidden py-20 md:py-28 text-white bg-[#122434] bg-gradient-to-br from-[#122434] to-[#0e1c29]"
    >
      {/* Topographic contour texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M -50 ${80 + i * 60} C 200 ${30 + i * 55}, 500 ${130 + i * 65}, 800 ${60 + i * 58} S 1300 ${110 + i * 62}, 1300 ${110 + i * 62}`}
          />
        ))}
      </svg>

      {/* Faint summit silhouette anchor */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] max-w-none opacity-[0.10]"
        viewBox="0 0 1200 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 240 L220 130 L340 175 L520 70 L640 130 L820 50 L940 140 L1080 95 L1200 170 L1200 240 Z"
          fill="white"
        />
      </svg>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#E95931] mb-4">
            The Math
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            You&rsquo;re not replacing software.{" "}
            <span className="text-[#E95931]">You&rsquo;re replacing a department.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Here&rsquo;s what it costs to do everything GrowthOS does the old
            way &mdash; with people and an agency:
          </p>
        </motion.div>

        {/* Desktop / tablet table — frosted glass */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden sm:block rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-elevated overflow-hidden"
        >
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-white/10">
                <th
                  scope="col"
                  className="text-left font-semibold text-white/90 px-6 py-4"
                >
                  The growth department you&rsquo;d otherwise pay for
                </th>
                <th
                  scope="col"
                  className="text-right font-semibold text-white/90 px-6 py-4"
                >
                  Typical monthly cost
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i < rows.length - 1
                      ? "border-b border-white/[0.06]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-white/90">{row.label}</td>
                  <td className="px-6 py-4 text-right text-white/70">
                    {row.cost}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-white/15 bg-white/[0.06]">
                <td className="px-6 py-5 font-bold text-white">
                  Total monthly cost of the department
                </td>
                <td className="px-6 py-5 text-right font-bold text-white">
                  {TOTAL}
                </td>
              </tr>
              <tr className="bg-[#E95931]/15 ring-1 ring-[#E95931]/40 shadow-[0_0_40px_-5px_rgba(233,89,49,0.45)]">
                <td className="px-6 py-5 font-bold text-lg md:text-xl text-white">
                  GrowthOS (the whole team, one platform)
                </td>
                <td className="px-6 py-5 text-right font-bold text-lg md:text-xl text-[#FFB89A]">
                  $999/mo
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Mobile stacked card list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="sm:hidden space-y-3"
        >
          <ul className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-elevated divide-y divide-white/[0.06]">
            {rows.map((row) => (
              <li
                key={row.label}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                <span className="text-sm text-white/90">{row.label}</span>
                <span className="text-sm text-white/70 whitespace-nowrap">
                  {row.cost}
                </span>
              </li>
            ))}
            <li className="px-5 py-4 flex items-center justify-between gap-4 bg-white/[0.06]">
              <span className="text-sm font-bold text-white">
                Total monthly cost of the department
              </span>
              <span className="text-sm font-bold text-white whitespace-nowrap">
                {TOTAL}
              </span>
            </li>
          </ul>
          <div className="rounded-2xl px-5 py-5 flex items-center justify-between gap-4 bg-[#E95931]/15 ring-1 ring-[#E95931]/40 shadow-[0_0_40px_-5px_rgba(233,89,49,0.45)]">
            <span className="text-base font-bold leading-snug text-white">
              GrowthOS (the whole team, one platform)
            </span>
            <span className="text-lg font-bold whitespace-nowrap text-[#FFB89A]">
              $999/mo
            </span>
          </div>
        </motion.div>

        {/* Below-table closer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            And unlike a department, the AI team doesn&rsquo;t call in sick,
            doesn&rsquo;t quit and take the playbook with it, and doesn&rsquo;t
            go home at 5pm &mdash; which is exactly when patients fill out
            your form.
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="#pricing">
            <Button
              variant="hero-outline"
              size="lg"
              className="group border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              See pricing
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StackReplacement;
