"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Row = { label: string; cost: string };

const rows: Row[] = [
  { label: "Marketing agency retainer", cost: "$3,000 \u2013 $8,000" },
  { label: "Paid ads management", cost: "$1,500 \u2013 $3,000" },
  { label: "CRM (HubSpot, Salesforce)", cost: "$300 \u2013 $800" },
  { label: "Chatbot platform", cost: "$200 \u2013 $500" },
  { label: "Email and SMS platform", cost: "$150 \u2013 $400" },
  { label: "Landing page builder", cost: "$100 \u2013 $300" },
  { label: "Review management tool", cost: "$100 \u2013 $300" },
];

const StackReplacement = () => {
  return (
    <section
      id="stack-replacement"
      className="bg-muted/40 py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            The Math
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Most clinics save $4,000&ndash;$12,000 per month in month one.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Here&apos;s what the average fertility, aesthetics, or wellness clinic
            pays for the stack GrowthOS replaces:
          </p>
        </div>

        {/* Desktop / tablet table */}
        <div className="hidden sm:block bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="text-left font-semibold text-foreground px-6 py-4"
                >
                  What clinics currently pay
                </th>
                <th
                  scope="col"
                  className="text-right font-semibold text-foreground px-6 py-4"
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
                      ? "border-b border-border/60"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-foreground">{row.label}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {row.cost}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border bg-muted/40">
                <td className="px-6 py-5 font-bold text-foreground">
                  Total monthly stack cost
                </td>
                <td className="px-6 py-5 text-right font-bold text-foreground">
                  $5,350 &ndash; $13,300
                </td>
              </tr>
              <tr className="bg-primary text-primary-foreground">
                <td className="px-6 py-5 font-bold text-lg md:text-xl">
                  GrowthOS (everything above, one platform)
                </td>
                <td className="px-6 py-5 text-right font-bold text-lg md:text-xl">
                  $999/mo
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile stacked card list */}
        <div className="sm:hidden space-y-3">
          <ul className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border/60">
            {rows.map((row) => (
              <li
                key={row.label}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                <span className="text-sm text-foreground">{row.label}</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {row.cost}
                </span>
              </li>
            ))}
            <li className="px-5 py-4 flex items-center justify-between gap-4 bg-muted/40">
              <span className="text-sm font-bold text-foreground">
                Total monthly stack cost
              </span>
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
                $5,350 &ndash; $13,300
              </span>
            </li>
          </ul>
          <div className="bg-primary text-primary-foreground rounded-2xl px-5 py-5 flex items-center justify-between gap-4">
            <span className="text-base font-bold leading-snug">
              GrowthOS (everything above, one platform)
            </span>
            <span className="text-lg font-bold whitespace-nowrap">$999/mo</span>
          </div>
        </div>

        {/* Below-table statement */}
        <div className="mt-12 text-center">
          <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
            You&apos;re not saving on tools. You&apos;re replacing a department.
          </p>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            That&apos;s before we count the agency you stop paying, the leads you
            stop losing, and the patients you stop missing at 9pm on a Saturday
            when your front desk is closed.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href="#pricing">
            <Button variant="hero-outline" size="lg" className="group">
              See the full feature breakdown
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StackReplacement;
