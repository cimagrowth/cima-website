"use client";

import { useState } from "react";
import { useInvoice } from "@/hooks/useInvoice";
import { BundleLineItem } from "./BundleLineItem";
import type { InvoiceLineItem } from "@/types/billing";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents);
}

interface InvoiceViewProps {
  invoiceId: string;
  /** "staff" shows toggle; "patient" shows collapsed only */
  mode?: "staff" | "patient";
}

export function InvoiceView({ invoiceId, mode = "staff" }: InvoiceViewProps) {
  const { invoice, grouped, loading, error } = useInvoice(invoiceId);
  const [showItemizedPrint, setShowItemizedPrint] = useState(false);
  const isPatient = mode === "patient";

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-12 bg-gray-100 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
        Failed to load invoice: {error}
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Invoice not found.
      </div>
    );
  }

  const hasBundles = grouped.bundles.length > 0;
  const hasStandalone = grouped.standalone.length > 0;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Invoice</h3>
          <span className="text-xs text-gray-500">
            {invoice.invoice_number}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Print controls — staff only */}
          {!isPatient && (
            <>
              <label className="flex items-center gap-1.5 text-xs text-gray-600 print:hidden">
                <input
                  type="checkbox"
                  checked={showItemizedPrint}
                  onChange={(e) => setShowItemizedPrint(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Show Itemized
              </label>
              <button
                onClick={() => window.print()}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 print:hidden"
              >
                Print
              </button>
            </>
          )}
          <InvoiceStatusBadge status={invoice.status} />
        </div>
      </div>

      {/* Screen view: interactive bundles */}
      <div className="print:hidden">
        {grouped.bundles.map((bundle) => (
          <BundleLineItem
            key={bundle.packageId}
            bundle={bundle}
            patientMode={isPatient}
          />
        ))}

        {hasStandalone && (
          <div className="divide-y divide-gray-100">
            {grouped.standalone.map((item: InvoiceLineItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 px-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {item.item_name}
                  </span>
                  {item.cpt_code && (
                    <span className="text-xs text-gray-400 font-mono">
                      {item.cpt_code}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  {formatCurrency(item.total_price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print view: controlled by "Show Itemized" checkbox */}
      <div className="hidden print:block">
        {grouped.bundles.map((bundle) => (
          <BundleLineItem
            key={bundle.packageId}
            bundle={bundle}
            patientMode={!showItemizedPrint}
            printExpanded={showItemizedPrint}
          />
        ))}

        {hasStandalone && (
          <div className="divide-y divide-gray-100">
            {grouped.standalone.map((item: InvoiceLineItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 px-4"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {item.item_name}
                  </span>
                  {item.cpt_code && (
                    <span className="text-xs text-gray-400 font-mono">
                      {item.cpt_code}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  {formatCurrency(item.total_price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 space-y-1">
        {invoice.discount_percent != null && invoice.discount_percent > 0 && (
          <>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="tabular-nums">
                {formatCurrency(invoice.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount ({invoice.discount_percent}%)</span>
              <span className="tabular-nums">
                -{formatCurrency(invoice.discount_amount ?? 0)}
              </span>
            </div>
          </>
        )}
        <div className="flex justify-between pt-1">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-gray-900 tabular-nums text-lg">
            {formatCurrency(invoice.total)}
          </span>
        </div>
      </div>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-50 text-green-700",
    pending: "bg-yellow-50 text-yellow-700",
    overdue: "bg-red-50 text-red-700",
    draft: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        styles[status] ?? styles.draft
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
