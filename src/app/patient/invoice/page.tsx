"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InvoiceView } from "@/components/billing/InvoiceView";

function InvoicePageContent() {
  const params = useSearchParams();
  const invoiceId = params.get("invoiceId");
  const mode = params.get("mode") === "patient" ? "patient" : "staff";

  if (!invoiceId) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center text-gray-500">
        Missing invoice ID.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <InvoiceView invoiceId={invoiceId} mode={mode} />
    </div>
  );
}

export default function PatientInvoicePage() {
  return (
    <Suspense>
      <InvoicePageContent />
    </Suspense>
  );
}
