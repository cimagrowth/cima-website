"use client";

import { useSearchParams } from "next/navigation";
import { CartView } from "@/components/billing/CartView";

export default function PatientCartPage() {
  const params = useSearchParams();
  const patientId = params.get("patientId");
  const mode = params.get("mode") === "patient" ? "patient" : "staff";

  if (!patientId) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center text-gray-500">
        Missing patient ID.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <CartView patientId={patientId} mode={mode} />
    </div>
  );
}
