import type { ReactNode } from "react";

// Shared layout primitives for the GrowthOS Map pages and the home page.

export const WRAP = "mx-auto w-full max-w-[1200px] px-4 sm:px-6";

const BTN_BASE =
  "inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

/** Filled button. White text needs clay-deep for AA contrast. */
export const BTN_PRIMARY = `${BTN_BASE} bg-clay-deep text-white hover:bg-orange-600`;
export const BTN_OUTLINE = `${BTN_BASE} border-[1.5px] border-teal text-teal hover:bg-teal/5`;
export const BTN_OUTLINE_DARK = `${BTN_BASE} border-[1.5px] border-paper/80 text-paper hover:bg-paper/10`;

export function Eyebrow({
  children,
  tone = "clay",
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  tone?: "clay" | "teal" | "soft";
  as?: "p" | "div" | "span";
  className?: string;
}) {
  const color = tone === "clay" ? "text-teal" : tone === "soft" ? "text-clay-soft" : "text-teal";
  return (
    <Tag className={`text-sm font-bold uppercase tracking-[0.1em] ${color} ${className}`}>{children}</Tag>
  );
}

export function H2({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2
      id={id}
      className={`font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Section heading row: eyebrow and H2 on the left, side copy on the right. */
export function SectionHead({
  eyebrow,
  title,
  side,
  dark = false,
  titleId,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  side?: ReactNode;
  dark?: boolean;
  titleId?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="flex flex-col gap-4 lg:col-span-7">
        {eyebrow && <Eyebrow tone={dark ? "soft" : "clay"}>{eyebrow}</Eyebrow>}
        <H2 id={titleId} className={dark ? "text-paper" : "text-teal-deep"}>
          {title}
        </H2>
      </div>
      {side && (
        <p
          className={`text-base leading-relaxed md:text-lg lg:col-span-5 ${
            dark ? "text-paper/80" : "text-teal-deep/80"
          }`}
        >
          {side}
        </p>
      )}
    </div>
  );
}
