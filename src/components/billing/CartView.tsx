"use client";

import { usePatientCart } from "@/hooks/usePatientCart";
import { BundleLineItem } from "./BundleLineItem";
import type { PatientCartItem } from "@/types/billing";

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents);
}

interface CartViewProps {
  patientId: string;
  /** "staff" shows toggle; "patient" shows collapsed only */
  mode?: "staff" | "patient";
}

export function CartView({ patientId, mode = "staff" }: CartViewProps) {
  const { grouped, loading, error } = usePatientCart(patientId);
  const isPatient = mode === "patient";

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-12 bg-gray-100 rounded" />
        <div className="h-12 bg-gray-100 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
        Failed to load cart: {error}
      </div>
    );
  }

  const hasBundles = grouped.bundles.length > 0;
  const hasStandalone = grouped.standalone.length > 0;

  if (!hasBundles && !hasStandalone) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        No items in cart.
      </div>
    );
  }

  // Calculate totals
  const bundleTotal = grouped.bundles.reduce((s, b) => s + b.finalPrice, 0);
  const standaloneTotal = grouped.standalone.reduce(
    (s, item) => s + item.total_price,
    0
  );
  const grandTotal = bundleTotal + standaloneTotal;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 text-sm">Shopping Cart</h3>
      </div>

      {/* Bundle rows */}
      {grouped.bundles.map((bundle) => (
        <BundleLineItem
          key={bundle.packageId}
          bundle={bundle}
          patientMode={isPatient}
        />
      ))}

      {/* Standalone (non-bundled) items */}
      {hasStandalone && (
        <div className="divide-y divide-gray-100">
          {grouped.standalone.map((item: PatientCartItem) => (
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

      {/* Total */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="font-bold text-gray-900 tabular-nums text-lg">
          {formatCurrency(grandTotal)}
        </span>
      </div>
    </div>
  );
}
