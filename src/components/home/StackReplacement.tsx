"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const roles: string[] = [
  "Marketing coordinator / manager",
  "Marketing agency retainer",
  "Paid media buyer",
  "Patient coordinator doing follow-up",
  "Outreach / SDR",
  "Reputation / reviews management",
];

const StackReplacement = () => {
  return (
    <section
      id="stack-replacement"
      className="relative overflow-hidden section-padding text-paper bg-teal"
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
          <p className="font-ui text-xs md:text-sm font-semibold uppercase tracking-[.16em] text-sand mb-4">
            The Comparison
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-[340] tracking-tight text-paper mb-6 leading-tight">
            You&rsquo;re not replacing software.{" "}
            <span className="italic text-sand">You&rsquo;re replacing a department.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Here is the growth team you would otherwise hire and manage to do
            everything GrowthOS does. One platform covers all of it.
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
                  The growth department you&rsquo;d otherwise hire
                </th>
                <th
                  scope="col"
                  className="text-right font-semibold text-white/90 px-6 py-4"
                >
                  With GrowthOS
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, i) => (
                <tr
                  key={role}
                  className={
                    i < roles.length - 1
                      ? "border-b border-white/[0.06]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-white/90">{role}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center justify-end gap-2 text-sand font-semibold">
                      <Check className="w-4 h-4" />
                      Included
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-paper/10 ring-1 ring-sand/40">
                <td className="px-6 py-5 font-bold text-lg md:text-xl text-white">
                  GrowthOS (the whole team, one platform)
                </td>
                <td className="px-6 py-5 text-right font-bold text-lg md:text-xl text-sand">
                  One login
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
            {roles.map((role) => (
              <li
                key={role}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                <span className="text-sm text-white/90">{role}</span>
                <span className="flex items-center gap-1.5 text-sm text-sand font-semibold whitespace-nowrap">
                  <Check className="w-3.5 h-3.5" />
                  Included
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl px-5 py-5 flex items-center justify-between gap-4 bg-paper/10 ring-1 ring-sand/40">
            <span className="text-base font-bold leading-snug text-white">
              GrowthOS (the whole team, one platform)
            </span>
            <span className="text-lg font-bold whitespace-nowrap text-sand">
              One login
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
            go home at 5pm, which is exactly when patients fill out your form.
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="/demo">
            <Button
              variant="hero-outline"
              size="lg"
              className="group border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Book a Demo
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StackReplacement;
