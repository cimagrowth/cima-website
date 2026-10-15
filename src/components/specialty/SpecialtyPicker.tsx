"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SPECIALTIES } from "@/content/specialty";
import { useSpecialty } from "@/contexts/SpecialtyContext";

const PILL =
  "inline-flex min-h-[44px] shrink-0 items-center rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep";
const PILL_OFF = "border-sand bg-paper text-teal-deep hover:border-teal/50";
const PILL_ON = "border-teal bg-teal text-paper";

/**
 * Lets a visitor view GrowthOS for their specialty. `pills` is the row of
 * buttons (home page, mobile menu); `menu` is the compact header dropdown.
 */
export default function SpecialtyPicker({
  variant,
  wrap = false,
  className = "",
}: {
  variant: "pills" | "menu";
  /** pills only: wrap onto more lines instead of scrolling sideways. */
  wrap?: boolean;
  className?: string;
}) {
  return variant === "menu" ? <PickerMenu className={className} /> : <PickerPills wrap={wrap} className={className} />;
}

function PickerPills({ wrap, className }: { wrap: boolean; className: string }) {
  const { specialty, setSpecialty } = useSpecialty();
  return (
    <div
      role="group"
      aria-label="Show GrowthOS for your specialty"
      className={`flex items-center gap-2 ${wrap ? "flex-wrap" : "-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"} ${className}`}
    >
      <span className="shrink-0 pr-1 text-sm font-semibold text-teal-deep/80">GrowthOS for</span>
      {SPECIALTIES.map((s) => {
        const active = s.key === specialty;
        return (
          <button
            key={s.key}
            type="button"
            aria-pressed={active}
            onClick={() => setSpecialty(s.key)}
            className={`${PILL} ${active ? PILL_ON : PILL_OFF}`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

function PickerMenu({ className }: { className: string }) {
  const { specialty, setSpecialty } = useSpecialty();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = SPECIALTIES.find((s) => s.key === specialty) ?? SPECIALTIES[0];

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Show GrowthOS for your specialty. Now showing: ${current.label}`}
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 items-center gap-1 rounded-btn px-2 font-ui text-sm font-medium text-teal-deep/75 transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-deep"
      >
        For: <span data-sv-region className="font-semibold text-teal-deep">{current.short}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full pt-3">
          <ul
            aria-label="Specialties"
            className="min-w-[230px] rounded-xl2 border border-sand bg-cream/95 p-2 shadow-card backdrop-blur-md"
          >
            {SPECIALTIES.map((s) => {
              const active = s.key === specialty;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSpecialty(s.key);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left font-ui text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay-deep ${
                      active ? "bg-sand/50 text-teal-deep" : "text-teal-deep/80 hover:bg-sand/40 hover:text-teal-deep"
                    }`}
                  >
                    {s.label}
                    {active && <Check aria-hidden="true" className="h-4 w-4 text-teal" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
