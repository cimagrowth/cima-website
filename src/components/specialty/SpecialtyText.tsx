"use client";

import { GENERAL_LINE_SWAPS } from "@/content/specialty-pages";
import { useSpecialty } from "@/contexts/SpecialtyContext";

/**
 * A general line that reads differently outside fertility (see
 * GENERAL_LINE_SWAPS). Text without a swap renders as is.
 */
export default function SpecialtyText({ text }: { text: string }) {
  const { specialty } = useSpecialty();
  const swap = GENERAL_LINE_SWAPS[text];
  if (swap === undefined) return <>{text}</>;
  return <span data-sv-region>{specialty === "fertility" ? text : swap}</span>;
}
