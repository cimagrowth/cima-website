"use client";

import type { ReactNode } from "react";
import { useSpecialty } from "@/contexts/SpecialtyContext";

// Renders the node for the active specialty. Server components pass server-rendered JSX as props.
// `other` is the shared non-fertility fallback. fertility is required.
// Only the fertility node is in the server HTML; the others travel in the RSC
// payload and render after hydration.
export default function BySpecialty(props: {
  fertility: ReactNode;
  aesthetics?: ReactNode;
  regenerative?: ReactNode;
  wellness?: ReactNode;
  other?: ReactNode;
}) {
  const { specialty } = useSpecialty();
  const node = specialty === "fertility" ? props.fertility : props[specialty] ?? props.other ?? props.fertility;
  return (
    <div data-sv-region style={{ display: "contents" }}>
      {node}
    </div>
  );
}
